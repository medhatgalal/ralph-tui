# Theme 1: Multi-CLI Support Specification

**Version:** 1.0 (Final)  
**Status:** Ready for Implementation  
**Last Updated:** 2026-01-16

## Overview

Extend ralph-tui to support Gemini CLI, Kiro CLI, and Codex CLI alongside existing Claude Code support, enabling the ralph loop to work with any supported AI coding agent.

## Requirements Summary

| ID | Requirement | Priority |
|----|-------------|----------|
| 1a | Full soup-to-nuts support for any/all CLIs | Must |
| 1b | Non-breaking changes, clean merges, backup strategy | Must |
| 1c | Easy upstream sync from main ralph-tui | Must |
| 1d | Minimal architectural changes | Must |
| 1e | Clean PR path to upstream | Should |
| 1f | Extensibility for future CLI improvements | Should |
| 1g | CLI capability research (complete) | Done |
| 1h | Automated setup-test-verify pipeline | Must |
| 1i | Same installation process, fork option | Should |
| 1j | Main/fork co-existence option | Nice |

---

## 1. Architecture Design

### Current State

Ralph-tui has a well-designed plugin architecture:

```
src/plugins/agents/
├── base.ts          # Base agent implementation
├── types.ts         # AgentPlugin interface
├── registry.ts      # Agent registration/discovery
├── index.ts         # Exports
├── builtin/         # Built-in agents (claude, opencode)
└── tracing/         # Subagent tracing parser
```

**Key Interface:** `AgentPlugin` in `types.ts`
- `detect()` - Check if CLI is available
- `execute()` - Run with prompt, return handle
- `meta` - Plugin metadata (supports streaming, tracing, etc.)

### Proposed Changes

**Minimal extension approach:**

1. **Add new agent plugins** in `src/plugins/agents/builtin/`:
   - `gemini.ts` - Gemini CLI agent
   - `kiro.ts` - Kiro CLI agent  
   - `codex.ts` - Codex CLI agent

2. **Register in existing registry** - No registry changes needed

3. **Extend types only if necessary** - Prefer using existing `AgentPluginConfig.options` for CLI-specific settings

**Files to add:**
```
src/plugins/agents/builtin/
├── claude.ts      # (existing)
├── opencode.ts    # (existing)
├── gemini.ts      # NEW
├── kiro.ts        # NEW
└── codex.ts       # NEW
```

**Files to modify:**
```
src/plugins/agents/builtin/index.ts  # Export new agents
src/plugins/agents/registry.ts       # Register new agents (if not auto-discovered)
```

### Design Principle

> **Extend, don't modify.** New agents follow existing patterns. No changes to core interfaces unless absolutely necessary.

---

## 2. Agent Plugin Specifications

### 2.1 Gemini CLI Agent

**Detection:**
```typescript
// Check for gemini in PATH
const result = await exec('which gemini');
// Verify version
const version = await exec('gemini --version');
```

**Execution Command:**
```bash
gemini -p "<prompt>" --yolo --output-format stream-json
```

**Flags Mapping:**

| Ralph Config | Gemini Flag |
|--------------|-------------|
| `approval: auto` | `--yolo` |
| `approval: suggest` | `--approval-mode default` |
| `approval: auto-edit` | `--approval-mode auto_edit` |
| `model: <model>` | `-m <model>` |
| `timeout: <ms>` | N/A (handle in ralph) |

**Output Parsing:**
- Format: JSONL (`stream-json`)
- Events: `init`, `message`, `tool_use`, `tool_result`, `result`
- Completion detection: `result` event with `status: success`

**Subagent Tracing:**
- Parse `tool_use` and `tool_result` events
- Map to ralph-tui's tracing format

**Config Location:** `~/.gemini/settings.json`

**Project Steering:** `GEMINI.md` (hierarchical)

---

### 2.2 Kiro CLI Agent

**Detection:**
```typescript
const result = await exec('which kiro-cli');
const version = await exec('kiro-cli version');
```

**Execution Command:**
```bash
kiro-cli chat --no-interactive --trust-all-tools "<prompt>"
```

**Flags Mapping:**

| Ralph Config | Kiro Flag |
|--------------|-----------|
| `approval: auto` | `--trust-all-tools` |
| `approval: suggest` | (default) |
| `approval: partial` | `--trust-tools tool1,tool2` |
| `agent: <name>` | `--agent <name>` |

**Output Parsing:**
- Format: Text (no structured JSON)
- Completion detection: Process exit code 0 = success
- Strategy: Capture stdout as agent output, stderr for errors
- No JSONL parsing needed - simpler than other CLIs

**Subagent Tracing:**
- Skip detailed tracing (text output not reliably parseable)
- Show activity indicator: spinner + elapsed time
- Capture safe activity info from stdout if available

**Config Location:** `.kiro/settings/`

**Project Steering:** `.kiro/*.md` files

---

### 2.3 Codex CLI Agent

**Detection:**
```typescript
const result = await exec('which codex');
const version = await exec('codex --version');
```

**Execution Command:**
```bash
codex exec --full-auto --json "<prompt>"
```

**Flags Mapping:**

| Ralph Config | Codex Flag |
|--------------|------------|
| `approval: auto` | `--full-auto` |
| `approval: suggest` | `-a untrusted` |
| `approval: on-failure` | `-a on-failure` |
| `sandbox: read-only` | `-s read-only` |
| `sandbox: workspace` | `-s workspace-write` |
| `model: <model>` | `--model <model>` |

**Output Parsing:**
- Format: JSONL (`--json`)
- Events: `thread.started`, `turn.started`, `turn.completed`, `item.*`
- Completion detection: `turn.completed` event

**Subagent Tracing:**
- Parse `item.*` events for tool calls
- Map to ralph-tui's tracing format

**Config Location:** `~/.codex/config.toml`

**Project Steering:** `AGENTS.md`, `~/.codex/rules/`

---

## 3. Setup Flow

### Current Setup

`ralph-tui setup` runs an interactive wizard that:
1. Detects available agents
2. Configures selected agent
3. Installs skills to `~/.claude/skills/`
4. Creates project config

### Proposed Changes

**Multi-CLI Detection:**
```
Detecting available AI agents...
  ✓ Gemini CLI (gemini) - v2.0.1
  ✓ Kiro CLI (kiro-cli) - v1.5.0

Detected 2 agent(s): Gemini CLI, Kiro CLI

Select default agent: [gemini/kiro]
```

Note: Only AVAILABLE agents are shown. If no agents are detected, setup fails with:
```
No AI coding agents detected on your system.
Ralph TUI supports: Claude Code, Gemini CLI, Codex, Kiro CLI, OpenCode, Factory Droid
Please install at least one supported agent and try again.
```

**Per-Agent Setup:**
- Each agent plugin implements `getSetupQuestions()`
- Setup wizard calls this for selected agent
- Agent-specific config stored in `options` field

**Skills Installation:**

All CLIs support skills/powers with similar formats:

| CLI | Skills Location | Format | Install Command |
|-----|-----------------|--------|-----------------|
| Claude | `~/.claude/skills/<name>/SKILL.md` | YAML frontmatter + Markdown | Manual copy |
| Gemini | `~/.gemini/skills/<name>/SKILL.md` or `.gemini/skills/<name>/` | YAML frontmatter + Markdown | `gemini skills install` |
| Kiro | Powers | `POWER.md` + `mcp.json` + `steering/` | `.kiro/<name>/` (project-level) | IDE panel, GitHub URL, or local path |
| Codex | `~/.codex/skills/<name>/skill.md` | YAML frontmatter + Markdown | Manual copy |

**Key Discovery:**
- Gemini has a full skills system (experimental) with `gemini skills install/list/enable/disable`
- Kiro calls them "Powers" with `POWER.md` format, supports MCP servers and steering files
- All four CLIs use similar YAML frontmatter + Markdown format
- Skills can be workspace-level or user-level

---

## 4. Configuration Strategy

### Config File Structure

```toml
# .ralph-tui/config.toml

# Default agent (can be overridden with --agent)
default_agent = "gemini"

# Agent-specific configurations
[agents.claude]
plugin = "claude"
default_flags = ["--dangerously-skip-permissions"]

[agents.gemini]
plugin = "gemini"
default_flags = ["--yolo"]
options = { output_format = "stream-json" }

[agents.kiro]
plugin = "kiro"
default_flags = ["--trust-all-tools"]

[agents.codex]
plugin = "codex"
default_flags = ["--full-auto"]
options = { sandbox = "workspace-write" }

# Fallback chain (if primary hits rate limit)
[agents.gemini]
fallback_agents = ["kiro", "claude", "codex"]
```

### Backup Strategy (Requirement 1b)

**Before modifying any file:**
1. Check if file exists
2. If exists, create backup: `<filename>.backup.<timestamp>`
3. Log backup location
4. Proceed with modification

**Implementation:**
```typescript
async function safeWriteConfig(path: string, content: string) {
  if (await exists(path)) {
    const backup = `${path}.backup.${Date.now()}`;
    await copy(path, backup);
    console.log(`Backed up ${path} to ${backup}`);
  }
  await writeFile(path, content);
}
```

### Merge Strategy

**For existing configs:**
1. Read existing config
2. Deep merge with new settings (existing takes precedence for conflicts)
3. Add new agent configs without removing existing
4. Preserve user customizations

---

## 5. Upstream Sync Strategy

### Branch Structure

```
main (upstream: subsy/ralph-tui)
├── feature/multi-cli-base      # Core plugin additions
├── feature/agent-gemini        # Gemini agent
├── feature/agent-kiro          # Kiro agent
└── feature/agent-codex         # Codex agent
```

### Sync Workflow

```bash
# Add upstream remote (one-time)
git remote add upstream https://github.com/subsy/ralph-tui.git

# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Rebase feature branches
git checkout feature/multi-cli-base
git rebase main
```

### PR Strategy (Requirement 1e)

**For upstream contribution:**

1. **Separate PRs per agent** - Easier to review and merge
2. **Base PR first** - Any shared infrastructure changes
3. **Agent PRs reference base** - Clear dependency chain

**PR Checklist:**
- [ ] No breaking changes to existing functionality
- [ ] Tests pass for existing agents
- [ ] New agent has tests
- [ ] Documentation updated
- [ ] Config schema backward compatible

### Keeping Fork Updated (Requirement 1c)

```bash
# Script: scripts/sync-upstream.sh
#!/bin/bash
git fetch upstream
git checkout main
git merge upstream/main --no-edit
git push origin main

# Rebase feature branches
for branch in feature/agent-*; do
  git checkout $branch
  git rebase main
  git push origin $branch --force-with-lease
done
```

---

## 5.1 Update Strategy (Requirements 1c, 1f)

### Updating Fork from Upstream Ralph-TUI

**When:** After upstream releases new features or fixes

```bash
# scripts/update-from-upstream.sh
#!/bin/bash
set -e

echo "=== Updating fork from upstream ralph-tui ==="

# Fetch latest from upstream
git fetch upstream

# Check for conflicts before merging
echo "Checking for potential conflicts..."
git merge-tree $(git merge-base HEAD upstream/main) HEAD upstream/main

# Merge upstream into main
git checkout main
git merge upstream/main --no-edit

# Run tests to verify merge didn't break anything
echo "Running verification..."
bun install
bun run typecheck
bun run build
bun test

# If all passes, push
git push origin main

echo "=== Fork updated successfully ==="
```

### Updating for CLI Improvements (Requirement 1f)

**When:** A CLI (Gemini, Kiro, Codex) releases new features we want to leverage

**Process:**
1. Check CLI changelog/release notes
2. Update agent plugin to use new flags/features
3. Update tests
4. Document in CHANGELOG.md

**Example: Gemini adds new output format**
```typescript
// src/plugins/agents/builtin/gemini.ts

// Before
const args = ['-p', prompt, '--yolo', '--output-format', 'stream-json'];

// After (if Gemini adds better format)
const args = ['-p', prompt, '--yolo', '--output-format', 'enhanced-json'];
```

**Tracking CLI Updates:**
- Subscribe to CLI release channels
- Periodic review (monthly) of CLI changelogs
- Document CLI version compatibility in README

### Version Compatibility Matrix

Track which ralph-tui version works with which CLI versions:

```markdown
# docs/compatibility.md

| ralph-tui | Claude | Gemini | Codex | Kiro |
|-----------|--------|--------|-------|------|
| 0.2.0     | 1.x+   | 2.x+   | 0.9+  | 1.5+ |
| 0.3.0     | 1.x+   | 2.5+   | 1.0+  | 1.6+ |
```

---

## 6. Testing Strategy

### Test Categories

1. **Unit Tests** - Per-agent plugin tests
2. **Integration Tests** - Agent detection and execution
3. **E2E Tests** - Full ralph loop with each agent
4. **Compatibility Tests** - Upstream merge verification

### Test Structure

```
tests/
├── plugins/
│   └── agents/
│       ├── gemini.test.ts
│       ├── kiro.test.ts
│       └── codex.test.ts
├── integration/
│   ├── agent-detection.test.ts
│   └── multi-agent-setup.test.ts
└── e2e/
    └── ralph-loop.test.ts
```

### Automated Verification (Requirement 1h)

**CI Pipeline:**
```yaml
# .github/workflows/multi-cli-test.yml
name: Multi-CLI Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Type check
        run: bun run typecheck
      
      - name: Unit tests
        run: bun test
      
      - name: Lint
        run: bun run lint

  upstream-compat:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Fetch upstream
        run: |
          git remote add upstream https://github.com/subsy/ralph-tui.git
          git fetch upstream
      
      - name: Test merge
        run: git merge upstream/main --no-commit --no-ff
      
      - name: Verify build after merge
        run: |
          bun install
          bun run typecheck
          bun run build
```

### Mock Strategy

```typescript
// tests/mocks/cli-mocks.ts
export const mockGeminiCli = {
  detect: () => ({ available: true, version: '2.0.1' }),
  execute: (prompt: string) => mockJsonlStream([
    { type: 'init', session_id: 'test' },
    { type: 'message', role: 'assistant', content: 'Done' },
    { type: 'result', status: 'success' }
  ])
};
```

### Real CLI Tests (User-Executed)

For tests that require actual CLI execution (which may be difficult to automate due to CLI-within-CLI limitations):

```bash
# scripts/test-real-cli.sh
#!/bin/bash
# User executes this manually to verify real CLI integration

echo "=== Real CLI Integration Tests ==="
echo "Prerequisites: All CLIs installed and authenticated"
echo ""

# Test 1: Detection
echo "Test 1: CLI Detection"
ralph-tui plugins agents
echo ""

# Test 2: Gemini execution
echo "Test 2: Gemini non-interactive"
gemini -p "echo hello" --yolo --output-format json
echo ""

# Test 3: Codex execution  
echo "Test 3: Codex non-interactive"
codex exec --full-auto "echo hello"
echo ""

# Test 4: Kiro execution
echo "Test 4: Kiro non-interactive"
kiro-cli chat --no-interactive --trust-all-tools "echo hello"
echo ""

# Test 5: Ralph loop with each agent
echo "Test 5: Ralph loop (1 iteration each)"
ralph-tui run --agent gemini --iterations 1 --headless --prd ./test-prd.json
ralph-tui run --agent codex --iterations 1 --headless --prd ./test-prd.json
ralph-tui run --agent kiro --iterations 1 --headless --prd ./test-prd.json
```

**Test Verification Checklist:**
- [ ] All CLIs detected correctly
- [ ] Non-interactive mode works for each CLI
- [ ] Ralph loop completes one iteration per agent
- [ ] Output captured and displayed in TUI
- [ ] No permission/approval prompts block execution

---

## 7. Installation Options

### Standard Installation (Bun)

```bash
# Install from npm (main ralph-tui)
bun install -g ralph-tui

# Install from fork
bun install -g github:medhatgalal/ralph-tui
```

### Fork Installation Script

```bash
# scripts/install-fork.sh
#!/bin/bash
bun install -g github:medhatgalal/ralph-tui#feature/port-ralphtui-ai
```

### Co-existence (Requirement 1j)

**Option A: Different binary names**
```bash
# Main ralph-tui
bun install -g ralph-tui

# Fork as ralph-tui-multi
bun install -g github:medhatgalal/ralph-tui --name ralph-tui-multi
```

**Option B: Use bun link for development**
```bash
# In fork directory
bun link

# Creates global 'ralph-tui' pointing to fork
# To switch back:
bun unlink
bun install -g ralph-tui
```

**Recommendation:** Option B for development, Option A if both needed simultaneously.

---

## 8. Implementation Order

### Phase 1: Foundation
1. [ ] Create agent plugin base structure
2. [ ] Implement Gemini agent (most similar to Claude)
3. [ ] Add detection to setup wizard
4. [ ] Write unit tests for Gemini agent

### Phase 2: Additional Agents
5. [ ] Implement Codex agent
6. [ ] Implement Kiro agent
7. [ ] Write tests for each

### Phase 3: Integration
8. [ ] Multi-agent setup flow
9. [ ] Config merge/backup logic
10. [ ] Integration tests

### Phase 4: Polish
11. [ ] Documentation updates
12. [ ] Upstream sync scripts
13. [ ] CI pipeline
14. [ ] E2E tests

---

## 9. Open Questions (RESOLVED)

| Question | Decision | Notes |
|----------|----------|-------|
| Unified approval mode abstraction? | **C) Hybrid** | Unified `approval` setting + `default_flags` override |
| Subagent tracing for Kiro? | **B) Skip** + activity indicator | Show "working..." status, no detailed tracing |
| Skills installation scope? | **Selected agent (default)** | Install for selected agent; option to install for all detected CLIs |
| Default agent selection? | **C) Config + fallback** | User chooses at setup, can change later via config or `--agent` flag |

---

## 10. Additional Requirements (From User Feedback)

### 10.1 Skills Installation Strategy

**Agent Selection (updated):**
- Only AVAILABLE (detected) agents are shown in the selection menu
- If no agents are detected, setup fails with helpful error message
- User cannot select an unavailable agent

**Skills Installation Options:**
When multiple CLIs are detected, user chooses from:
1. **Selected agent only** (default) - Install skills for the chosen agent
2. **All detected CLIs** - Install skills for all available agents
3. **Skip** - Don't install skills (can be done later)

When only one CLI is detected:
- Simple yes/no prompt per skill (original behavior)

**Skills per CLI:**

| CLI | Skills Location | Skills to Install |
|-----|-----------------|-------------------|
| Claude | `~/.claude/skills/<name>/SKILL.md` | ralph-tui-prd, ralph-tui-create-json, ralph-tui-create-beads |
| Gemini | `~/.gemini/skills/<name>/SKILL.md` | ralph-tui-prd, ralph-tui-create-json, ralph-tui-create-beads |
| Kiro | `.kiro/<name>/POWER.md` | ralph-tui-prd, ralph-tui-create-json, ralph-tui-create-beads |
| Codex | `~/.codex/skills/<name>/skill.md` | ralph-tui-prd, ralph-tui-create-json, ralph-tui-create-beads |

### 10.2 Agent Selection Flexibility

**At Setup:**
- Detect all available CLIs
- User selects default agent
- Install skills for selected agent (default)
- Optionally install skills for other detected CLIs

**At Runtime:**
- `ralph-tui run` - Uses default from config
- `ralph-tui run --agent gemini` - Override for this run
- `ralph-tui config set agent kiro` - Change default permanently

**Fallback Order:**
If no default configured: Kiro → Claude → Gemini → Codex (Kiro preferred as standard)

```toml
# Example: If using Gemini as default with fallbacks
[agents.gemini]
fallback_agents = ["kiro", "claude", "codex"]
```

### 10.3 Using Skills Directly in Each CLI

Users should be able to use ralph-tui skills directly inside their preferred CLI:

**Claude Code:**
```bash
/ralph-tui-prd           # Create PRD with file references
/ralph-tui-create-json   # Convert to prd.json
```

**Gemini CLI:**
```bash
# After skills installed to ~/.gemini/skills/
# Skills auto-activate based on keywords
"Create a PRD for this feature"  # Activates ralph-tui-prd skill
```

**Kiro CLI:**
```bash
# Powers installed to .kiro/<name>/
# Activate via Powers panel or keywords
"Help me create a PRD"  # Activates ralph-tui-prd power
```

**Codex CLI:**
```bash
# Skills in ~/.codex/skills/
/ralph-tui-prd  # If slash commands supported
```

### 10.4 Prompt Templates

Ralph-tui uses Handlebars templates for prompts. Our multi-CLI support must:

1. **Preserve template system** - Same templates work across all agents
2. **Support custom templates** - `.ralph-tui-prompt.hbs` or config path
3. **Template init command** - `ralph-tui template init` creates customizable template
4. **Cross-iteration progress** - `{{recentProgress}}` variable works for all agents

### 10.5 Configuration Layers

Maintain ralph-tui's layered config system:

1. **Global:** `~/.config/ralph-tui/config.toml`
2. **Project:** `.ralph-tui/config.toml`
3. **CLI flags:** Override everything

**New config options for multi-CLI:**
```toml
# Default agent (user selects at setup)
agent = "kiro"

# All detected agents with their configs
[agents.claude]
plugin = "claude"
default_flags = ["--dangerously-skip-permissions"]

[agents.gemini]
plugin = "gemini"
default_flags = ["--yolo"]
approval = "auto"

[agents.kiro]
plugin = "kiro"
default_flags = ["--trust-all-tools"]

[agents.codex]
plugin = "codex"
default_flags = ["--full-auto"]

# Fallback chain for rate limits
fallbackAgents = ["claude", "gemini", "codex"]
```

### 10.6 Changing Default Agent

**Via CLI:**
```bash
ralph-tui config set agent gemini
```

**Via config file:**
```toml
agent = "gemini"
```

**Via runtime flag:**
```bash
ralph-tui run --agent codex --prd ./prd.json
```

---

## 11. Success Criteria

- [ ] `ralph-tui setup` detects and configures all available CLIs
- [ ] `ralph-tui setup` asks user to select default agent
- [ ] `ralph-tui setup` installs skills/powers for ALL detected CLIs
- [ ] `ralph-tui run --agent gemini` executes ralph loop with Gemini
- [ ] `ralph-tui run --agent kiro` executes ralph loop with Kiro
- [ ] `ralph-tui run --agent codex` executes ralph loop with Codex
- [ ] `ralph-tui run` uses default agent from config
- [ ] `ralph-tui config set agent <name>` changes default
- [ ] Existing Claude functionality unchanged
- [ ] Skills work directly inside each CLI (e.g., `/ralph-tui-prd` in Claude)
- [ ] Prompt templates work identically across all agents
- [ ] `ralph-tui template init` works for all agents
- [ ] Cross-iteration progress (`{{recentProgress}}`) works for all agents
- [ ] Upstream merge produces no conflicts in core files
- [ ] All tests pass after upstream sync
- [ ] Config backup created before any modification
- [ ] Kiro shows "working..." activity indicator (no detailed tracing)

---

## Appendix: CLI Command Reference

### Gemini CLI
```bash
# Non-interactive with JSON streaming
gemini -p "prompt" --yolo --output-format stream-json

# With model selection
gemini -p "prompt" -m gemini-2.5-pro --yolo
```

### Kiro CLI
```bash
# Non-interactive with auto-approve
kiro-cli chat --no-interactive --trust-all-tools "prompt"

# With specific agent
kiro-cli chat --no-interactive --agent my-agent "prompt"
```

### Codex CLI
```bash
# Non-interactive with JSON output
codex exec --full-auto --json "prompt"

# With sandbox mode
codex exec --full-auto --sandbox workspace-write "prompt"
```

### Claude Code (existing)
```bash
# Non-interactive
claude -p "prompt" --dangerously-skip-permissions
```
