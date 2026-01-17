/**
 * ABOUTME: Skill installation utility for ralph-tui.
 * Provides functions to install skills to CLI-specific skills directories.
 * Supports Claude, Gemini, Codex, and Kiro CLIs.
 * Skills are bundled with ralph-tui and can be installed during setup.
 */

import { readFile, writeFile, mkdir, access, constants, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

/**
 * Supported CLI types for skill installation.
 */
export type CliType = 'claude' | 'gemini' | 'codex' | 'kiro';

/**
 * Result of a skill installation attempt.
 */
export interface SkillInstallResult {
  /** Whether the installation was successful */
  success: boolean;

  /** Path where the skill was installed */
  path?: string;

  /** Error message if installation failed */
  error?: string;

  /** Whether the skill already existed and was skipped */
  skipped?: boolean;

  /** Which CLI the skill was installed for */
  cli?: CliType;
}

/**
 * Information about an available skill.
 */
export interface SkillInfo {
  /** Skill name/ID */
  name: string;

  /** Skill description */
  description: string;

  /** Path to the skill in the ralph-tui package */
  sourcePath: string;
}

/**
 * Get the skills directory for a specific CLI.
 * @param cli The CLI type
 * @param cwd Current working directory (for project-level skills like Kiro)
 */
export function getSkillsDir(cli: CliType, cwd: string = process.cwd()): string {
  switch (cli) {
    case 'claude':
      return join(homedir(), '.claude', 'skills');
    case 'gemini':
      return join(homedir(), '.gemini', 'skills');
    case 'codex':
      return join(homedir(), '.codex', 'skills');
    case 'kiro':
      // Kiro uses project-level powers in .kiro/
      return join(cwd, '.kiro');
    default:
      throw new Error(`Unknown CLI type: ${cli}`);
  }
}

/**
 * Get the skill filename for a specific CLI.
 * Different CLIs use different naming conventions.
 */
export function getSkillFilename(cli: CliType): string {
  switch (cli) {
    case 'claude':
    case 'gemini':
      return 'SKILL.md';
    case 'codex':
      return 'skill.md'; // lowercase
    case 'kiro':
      return 'POWER.md';
    default:
      return 'SKILL.md';
  }
}

/**
 * Get the path to the user's Claude Code skills directory.
 * @deprecated Use getSkillsDir('claude') instead
 */
export function getClaudeSkillsDir(): string {
  return getSkillsDir('claude');
}

/**
 * Compute the skills path based on the current directory.
 * This is extracted as a pure function to enable testing.
 *
 * @param currentDir - The directory where the code is running from
 * @returns The computed path to the skills directory
 */
export function computeSkillsPath(currentDir: string): string {
  // When bundled by bun, all code is in dist/cli.js (single file bundle).
  // In that case, skills/ is a sibling directory at dist/skills/.
  // In development, this file is at src/setup/skill-installer.ts,
  // and skills/ is at the project root (up 2 levels).

  const bundledPath = join(currentDir, 'skills');
  const devPath = join(currentDir, '..', '..', 'skills');

  // Return the bundled path if we're in dist/
  // Use endsWith('dist') for exact match at end, or includes('/dist/') for dist as path segment
  // This avoids false matches like '/distribution/' or '/my-dist/'
  if (currentDir.endsWith('dist') || currentDir.includes('/dist/')) {
    return bundledPath;
  }

  return devPath;
}

/**
 * Get the path to the bundled skills in the ralph-tui package.
 * This function handles both development (running from src/) and production
 * (running from bundled dist/) environments.
 */
export function getBundledSkillsDir(): string {
  // In ESM, we need to derive the path from import.meta.url
  const currentDir = dirname(fileURLToPath(import.meta.url));
  return computeSkillsPath(currentDir);
}

/**
 * List all bundled skills available for installation.
 */
export async function listBundledSkills(): Promise<SkillInfo[]> {
  const skillsDir = getBundledSkillsDir();
  const skills: SkillInfo[] = [];

  try {
    const entries = await readdir(skillsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillPath = join(skillsDir, entry.name);
        const skillMdPath = join(skillPath, 'SKILL.md');

        try {
          await access(skillMdPath, constants.F_OK);
          const content = await readFile(skillMdPath, 'utf-8');

          // Extract description from YAML frontmatter
          const descMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
          const description = descMatch?.[1] || 'No description available';

          skills.push({
            name: entry.name,
            description,
            sourcePath: skillPath,
          });
        } catch {
          // SKILL.md doesn't exist, skip this directory
        }
      }
    }
  } catch {
    // Skills directory doesn't exist or is inaccessible
  }

  return skills;
}

/**
 * Check if a skill is already installed for a specific CLI.
 * @param skillName The skill name
 * @param cli The CLI type (defaults to 'claude' for backward compatibility)
 * @param cwd Current working directory (for project-level skills)
 */
export async function isSkillInstalled(
  skillName: string,
  cli: CliType = 'claude',
  cwd: string = process.cwd()
): Promise<boolean> {
  const skillsDir = getSkillsDir(cli, cwd);
  const targetPath = join(skillsDir, skillName);

  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Install a bundled skill to a specific CLI's skills directory.
 * @param skillName The skill name to install
 * @param cli The CLI type to install for
 * @param options Installation options
 */
export async function installSkill(
  skillName: string,
  options: {
    force?: boolean;
    cli?: CliType;
    cwd?: string;
  } = {}
): Promise<SkillInstallResult> {
  const cli = options.cli ?? 'claude';
  const cwd = options.cwd ?? process.cwd();
  const sourcePath = join(getBundledSkillsDir(), skillName);
  const skillsDir = getSkillsDir(cli, cwd);
  const targetPath = join(skillsDir, skillName);
  const targetFilename = getSkillFilename(cli);

  try {
    // Check if source exists
    const sourceSkillMd = join(sourcePath, 'SKILL.md');
    try {
      await access(sourceSkillMd, constants.F_OK);
    } catch {
      return {
        success: false,
        error: `Skill '${skillName}' not found in bundled skills`,
        cli,
      };
    }

    // Check if already installed
    if (!options.force && (await isSkillInstalled(skillName, cli, cwd))) {
      return {
        success: true,
        path: targetPath,
        skipped: true,
        cli,
      };
    }

    // Ensure target directory exists
    await mkdir(targetPath, { recursive: true });

    // Read source SKILL.md
    let skillContent = await readFile(sourceSkillMd, 'utf-8');

    // For Kiro, convert SKILL.md format to POWER.md format if needed
    if (cli === 'kiro') {
      skillContent = convertSkillToPower(skillContent, skillName);
    }

    // Write to target with appropriate filename
    const targetSkillMd = join(targetPath, targetFilename);
    await writeFile(targetSkillMd, skillContent, 'utf-8');

    return {
      success: true,
      path: targetPath,
      cli,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      cli,
    };
  }
}

/**
 * Convert a SKILL.md format to Kiro POWER.md format.
 * Adds keywords field if not present.
 */
function convertSkillToPower(content: string, skillName: string): string {
  // Check if keywords already exist in frontmatter
  if (content.includes('keywords:')) {
    return content;
  }

  // Add keywords based on skill name
  const keywords = skillName.split('-').filter(k => k !== 'ralph' && k !== 'tui');
  const keywordsLine = `keywords:\n  - ${keywords.join('\n  - ')}`;

  // Insert keywords after description in frontmatter
  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd > 0) {
    const beforeEnd = content.slice(0, frontmatterEnd);
    const afterEnd = content.slice(frontmatterEnd);
    return `${beforeEnd}${keywordsLine}\n${afterEnd}`;
  }

  return content;
}

/**
 * Install a skill to all detected CLIs.
 * @param skillName The skill name to install
 * @param detectedClis Array of detected CLI IDs
 * @param options Installation options
 */
export async function installSkillToAllClis(
  skillName: string,
  detectedClis: string[],
  options: {
    force?: boolean;
    cwd?: string;
  } = {}
): Promise<Map<CliType, SkillInstallResult>> {
  const results = new Map<CliType, SkillInstallResult>();
  const supportedClis: CliType[] = ['claude', 'gemini', 'codex', 'kiro'];

  for (const cli of supportedClis) {
    // Only install for detected CLIs
    if (detectedClis.includes(cli)) {
      const result = await installSkill(skillName, { ...options, cli });
      results.set(cli, result);
    }
  }

  return results;
}

/**
 * Install the ralph-tui-prd skill specifically.
 * @deprecated Use installSkill('ralph-tui-prd', { cli }) instead
 */
export async function installRalphTuiPrdSkill(
  options: {
    force?: boolean;
  } = {}
): Promise<SkillInstallResult> {
  return installSkill('ralph-tui-prd', options);
}

/**
 * Install all bundled skills to a specific CLI.
 * @param cli The CLI type to install for
 * @param options Installation options
 */
export async function installAllSkills(
  options: {
    force?: boolean;
    cli?: CliType;
    cwd?: string;
  } = {}
): Promise<Map<string, SkillInstallResult>> {
  const results = new Map<string, SkillInstallResult>();
  const skills = await listBundledSkills();
  const cli = options.cli ?? 'claude';

  for (const skill of skills) {
    const result = await installSkill(skill.name, { ...options, cli });
    results.set(skill.name, result);
  }

  return results;
}

/**
 * Install all bundled skills to all detected CLIs.
 * @param detectedClis Array of detected CLI IDs
 * @param options Installation options
 */
export async function installAllSkillsToAllClis(
  detectedClis: string[],
  options: {
    force?: boolean;
    cwd?: string;
  } = {}
): Promise<Map<string, Map<CliType, SkillInstallResult>>> {
  const results = new Map<string, Map<CliType, SkillInstallResult>>();
  const skills = await listBundledSkills();

  for (const skill of skills) {
    const skillResults = await installSkillToAllClis(skill.name, detectedClis, options);
    results.set(skill.name, skillResults);
  }

  return results;
}
