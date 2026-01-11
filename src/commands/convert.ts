/**
 * ABOUTME: Convert command for ralph-tui.
 * Converts PRD markdown files to prd.json format for the JSON tracker.
 */

import { readFile, writeFile, access, constants, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import {
  parsePrdMarkdown,
  parsedPrdToGeneratedPrd,
  convertToPrdJson,
} from '../prd/index.js';
import {
  promptText,
  promptBoolean,
  printSection,
  printSuccess,
  printError,
  printInfo,
} from '../setup/prompts.js';

/**
 * Supported conversion target formats.
 */
export type ConvertFormat = 'json';

/**
 * Command-line arguments for the convert command.
 */
export interface ConvertArgs {
  /** Target format */
  to: ConvertFormat;

  /** Input file path */
  input: string;

  /** Output file path (optional) */
  output?: string;

  /** Branch name (optional, will prompt if not provided) */
  branch?: string;

  /** Skip confirmation prompts */
  force?: boolean;

  /** Show verbose output */
  verbose?: boolean;
}

/**
 * Parse convert command arguments.
 */
export function parseConvertArgs(args: string[]): ConvertArgs | null {
  let to: ConvertFormat | undefined;
  let input: string | undefined;
  let output: string | undefined;
  let branch: string | undefined;
  let force = false;
  let verbose = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--to' || arg === '-t') {
      const format = args[++i];
      if (format === 'json') {
        to = format;
      } else {
        console.error(`Unsupported format: ${format}`);
        console.log('Supported formats: json');
        return null;
      }
    } else if (arg === '--output' || arg === '-o') {
      output = args[++i];
    } else if (arg === '--branch' || arg === '-b') {
      branch = args[++i];
    } else if (arg === '--force' || arg === '-f') {
      force = true;
    } else if (arg === '--verbose' || arg === '-v') {
      verbose = true;
    } else if (arg === '--help' || arg === '-h') {
      printConvertHelp();
      process.exit(0);
    } else if (!arg?.startsWith('-')) {
      // Positional argument is the input file
      input = arg;
    }
  }

  // Validate required arguments
  if (!to) {
    console.error('Error: --to <format> is required');
    console.log('Use --help for usage information');
    return null;
  }

  if (!input) {
    console.error('Error: Input file path is required');
    console.log('Usage: ralph-tui convert --to json ./tasks/prd-feature.md');
    return null;
  }

  return { to, input, output, branch, force, verbose };
}

/**
 * Print help for the convert command.
 */
export function printConvertHelp(): void {
  console.log(`
ralph-tui convert - Convert PRD markdown to JSON format

Usage: ralph-tui convert --to <format> <input-file> [options]

Arguments:
  <input-file>           Path to the PRD markdown file to convert

Options:
  --to, -t <format>      Target format (required): json
  --output, -o <path>    Output file path (default: ./prd.json)
  --branch, -b <name>    Git branch name (prompts if not provided)
  --force, -f            Overwrite existing files without prompting
  --verbose, -v          Show detailed parsing output
  --help, -h             Show this help message

Description:
  The convert command parses a PRD markdown file and extracts:

  - User stories from ### US-XXX: Title sections
  - Acceptance criteria from checklist items (- [ ] item)
  - Priority from **Priority:** P1-P4 lines
  - Dependencies from **Depends on:** lines

  The output prd.json file can be used with \`ralph-tui run --prd ./prd.json\`

Examples:
  ralph-tui convert --to json ./tasks/prd-feature.md
  ralph-tui convert --to json ./docs/requirements.md -o ./custom.json
  ralph-tui convert --to json ./prd.md --branch feature/my-feature --force
`);
}

/**
 * Check if a file exists.
 */
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Execute the convert command.
 */
export async function executeConvertCommand(args: string[]): Promise<void> {
  const parsedArgs = parseConvertArgs(args);

  if (!parsedArgs) {
    process.exit(1);
  }

  const { input, output, branch, force, verbose } = parsedArgs;

  // Resolve input path
  const inputPath = resolve(input);

  // Check input file exists
  if (!(await fileExists(inputPath))) {
    printError(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  printSection('PRD to JSON Conversion');

  // Read input file
  printInfo(`Reading: ${inputPath}`);
  let markdown: string;
  try {
    markdown = await readFile(inputPath, 'utf-8');
  } catch (err) {
    printError(`Failed to read input file: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }

  // Parse the markdown
  printInfo('Parsing user stories from markdown...');
  const parsed = parsePrdMarkdown(markdown);

  // Show warnings
  if (parsed.warnings.length > 0 && verbose) {
    console.log();
    console.log('Parsing warnings:');
    for (const warning of parsed.warnings) {
      console.log(`  - ${warning}`);
    }
  }

  // Show parsed info
  console.log();
  printSuccess(`Found ${parsed.userStories.length} user stories`);

  if (verbose) {
    console.log();
    console.log('User stories:');
    for (const story of parsed.userStories) {
      console.log(`  ${story.id}: ${story.title} (P${story.priority})`);
      if (story.acceptanceCriteria.length > 0) {
        console.log(`    - ${story.acceptanceCriteria.length} acceptance criteria`);
      }
      if (story.dependsOn && story.dependsOn.length > 0) {
        console.log(`    - Depends on: ${story.dependsOn.join(', ')}`);
      }
    }
  }

  if (parsed.userStories.length === 0) {
    printError('No user stories found in the PRD');
    printInfo('Make sure your PRD has sections like: ### US-001: Title');
    process.exit(1);
  }

  // Prompt for branch name if not provided
  let branchName = branch || parsed.branchName;

  if (!branchName) {
    console.log();
    const featureSlug = parsed.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const defaultBranch = `feature/${featureSlug}`;

    branchName = await promptText('Git branch name for this work:', {
      default: defaultBranch,
      required: true,
      help: 'The git branch that will be used when running ralph-tui',
    });
  }

  // Determine output path
  const outputPath = output ? resolve(output) : resolve('./prd.json');

  // Check if output file exists
  if (await fileExists(outputPath)) {
    if (!force) {
      console.log();
      const overwrite = await promptBoolean(`Output file exists: ${outputPath}. Overwrite?`, {
        default: false,
      });

      if (!overwrite) {
        printInfo('Conversion cancelled');
        process.exit(0);
      }
    }
  }

  // Convert to GeneratedPrd format
  const generatedPrd = parsedPrdToGeneratedPrd(parsed, branchName);

  // Convert to prd.json format
  const prdJson = convertToPrdJson(generatedPrd);

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  try {
    await mkdir(outputDir, { recursive: true });
  } catch {
    // Directory may already exist
  }

  // Write output file
  console.log();
  printInfo(`Writing: ${outputPath}`);
  try {
    await writeFile(outputPath, JSON.stringify(prdJson, null, 2), 'utf-8');
  } catch (err) {
    printError(`Failed to write output file: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }

  // Summary
  console.log();
  printSuccess('Conversion complete!');
  console.log();
  console.log('Summary:');
  console.log(`  PRD: ${parsed.name}`);
  console.log(`  Stories: ${parsed.userStories.length}`);
  console.log(`  Branch: ${branchName}`);
  console.log(`  Output: ${outputPath}`);
  console.log();
  printInfo(`Run with: ralph-tui run --prd ${outputPath}`);
}
