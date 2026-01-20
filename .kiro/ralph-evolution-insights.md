# Ralph Evolution - Insights

**Purpose:** Capture learnings, improvements, facts, and intelligence beyond the context file.
**Last Updated:** 2026-01-20

---

## Testing Results & Learnings (2026-01-20)

### Calc Platform Test Project

**Execution:** 12 user stories, 40 minutes autonomous with Kiro CLI

**Results:**
| Component | Status | Notes |
|-----------|--------|-------|
| Core calculator | ✅ | 26/26 unit tests pass |
| CLI interface | ✅ | Works correctly |
| TUI interface | ✅ | Works correctly |
| Web UI | ❌ | Browser import bug - fixed manually |
| API tests | ⚠️ | Need running server |

**Root Cause of Web UI Failure:**
```javascript
// ❌ Browser can't resolve Node.js imports
import{calc}from'../dist/index.js';

// ✅ Fixed: Embedded browser-compatible calculator
function calc(expr) { /* browser-safe implementation */ }
```

### Why Ralph-TUI Didn't Catch It
1. No browser testing capability
2. Trusted agent's "COMPLETE" signal without verification
3. Unit tests passed; integration didn't
4. PRD lacked specific testable criteria

---

## PRD Best Practices (Critical)

### Quality Gates Section (Required)
```markdown
## Quality Gates
These commands must pass for EVERY story:
- `npm run typecheck` - Zero TypeScript errors
- `npm test` - All tests pass (0 failures)
```

### Testable Acceptance Criteria
**Bad:**
```
- Works in browser
```

**Good:**
```
- [ ] `npm run serve` starts server on port 3000
- [ ] Browser console shows no errors on page load
- [ ] Entering "2+2" and clicking Calculate displays "4"
```

### Smaller Stories
Instead of "US-004: Web UI" (massive), break into:
- US-004a: Static HTML form
- US-004b: Browser-compatible calc function
- US-004c: Form submission with result display

---

## Amending PRDs After Issues

### Add Fix Stories
```json
{
  "id": "US-013",
  "title": "Fix Web UI Browser Compatibility",
  "acceptanceCriteria": [
    "public/index.html must NOT import from ../dist/*.js",
    "npm run serve and entering 2+2 shows 4"
  ],
  "passes": false
}
```

### Re-run Failed Stories
Set `"passes": false` on any story to re-run it.

### Ralph-TUI Picks Up
- Any story with `passes: false`
- New stories added to the array

---

## Design Insights

### Simple Made Easy (Rich Hickey) - Applied Principles

1. **Complect** = to interleave, braid together
   - Avoid complecting: state + identity, syntax + semantics, what + how
   - Ralph-tui already decomplects: agents vs trackers vs TUI vs config

2. **Simple ≠ Easy**
   - Simple: one fold, one braid, one concept
   - Easy: near at hand, familiar
   - We want simple (sustainable) not just easy (convenient)

3. **Artifacts of Complexity to Avoid**
   - State everywhere
   - Objects with hidden state
   - Inheritance hierarchies
   - Conditionals scattered throughout
   - Inconsistency

4. **Simplicity Toolkit**
   - Values (immutable data)
   - Functions (pure when possible)
   - Namespaces (not inheritance)
   - Data (not classes)
   - Polymorphism à la carte (not baked in)

---

## Ralph-TUI Capabilities to Preserve

Based on ralph-tui docs review, our multi-CLI support must maintain:

### Setup (`ralph-tui setup`)
- Detect installed agents
- Create `.ralph-tui/config.toml`
- Install bundled skills
- Detect existing trackers

### Skills System
- Skills installed to CLI-specific locations
- Skills usable directly inside each CLI (e.g., `/ralph-tui-prd`)
- Three bundled skills: ralph-tui-prd, ralph-tui-create-json, ralph-tui-create-beads

### Prompt Templates
- Handlebars templates (`.hbs`)
- Template resolution: CLI flag → project file → user config → built-in
- `ralph-tui template init` creates customizable template
- `ralph-tui template show` displays current template
- Cross-iteration progress via `{{recentProgress}}`
- Custom templates via `prompt_template` config or `--prompt` flag

### Configuration Layers
1. Global: `~/.config/ralph-tui/config.toml`
2. Project: `.ralph-tui/config.toml`
3. CLI flags: Override everything

### Key Config Options
- `agent` - Default agent
- `tracker` - Task source (json, beads, beads-bv)
- `maxIterations` - Iteration limit
- `prompt_template` - Custom template path
- `fallbackAgents` - Rate limit fallback chain
- `[agentOptions]` - Agent-specific settings
- `[errorHandling]` - Retry strategy

### Commands to Support
- `ralph-tui run --agent <name>` - Run with specific agent
- `ralph-tui run --prd <file>` - Run with PRD file
- `ralph-tui run --prompt <template>` - Custom prompt template
- `ralph-tui config show` - Show merged config
- `ralph-tui config set <key> <value>` - Change config (NEW)
- `ralph-tui template init` - Initialize custom template
- `ralph-tui template show` - Show current template

---

## CLI Research Notes (COMPLETED - Documentation Verified)

### Kiro CLI (AWS)
**Source:** AWS Documentation, kiro.dev
- **Command:** `kiro-cli chat`
- **Config Location:** `.kiro/settings/`, `~/.kiro/settings/`
- **Steering Files:** `.kiro/*.md` (context.md, patterns.md, workflows.md)
- **Prompts:** `.kiro/prompts/*.md`
- **Powers (Skills):** `POWER.md` format with optional `mcp.json` and `steering/` directory
  - Install via IDE Powers panel or local path
  - Supports MCP server integration
  - Keyword-based activation
- **Approval Mode:** `--trust-all-tools`, `--trust-tools <list>`
- **MCP Support:** Yes, via `mcp.json` in powers or `~/.kiro/settings/mcp.json`
- **Execution:** Interactive or `--no-interactive`
- **Key Feature:** Spec-driven development, Powers system with curated partners

### Gemini CLI (Google)
**Source:** geminicli.com
- **Command:** `gemini`
- **Config Location:** `~/.gemini/settings.json`
- **Steering Files:** `GEMINI.md` (hierarchical - global, project, subdirs)
- **Skills:** `SKILL.md` format (YAML frontmatter + Markdown)
  - Locations: `.gemini/skills/` (workspace), `~/.gemini/skills/` (user), extensions
  - Commands: `gemini skills install/list/enable/disable`
  - Experimental feature via `experimental.skills` setting
- **Extensions:** `~/.gemini/extensions/` (npm-like plugin system)
- **Approval Mode:** `--yolo`, `--approval-mode default|auto_edit|yolo`
- **Sandbox:** Yes - macOS Seatbelt or Docker/Podman
- **MCP Support:** Yes (`mcpServers` in settings.json)
- **Execution:** Interactive or headless with `-p`
- **Output:** `--output-format text|json|stream-json`

### Codex CLI (OpenAI)
**Source:** developers.openai.com/codex
- **Command:** `codex`
- **Config Location:** `~/.codex/config.toml`
- **Steering Files:** `AGENTS.md` (project-level), Rules dir
- **Skills:** `~/.codex/skills/<name>/skill.md` (YAML frontmatter + markdown)
- **Prompts:** `~/.codex/prompts/`
- **Rules:** `~/.codex/rules/`
- **Approval Modes:** `-a untrusted|on-failure|on-request|never`, `--full-auto`
- **Sandbox Modes:** `-s read-only|workspace-write|danger-full-access`
- **MCP Support:** Yes (`[mcp_servers]` in config.toml)
- **Execution:** Interactive or `codex exec` for non-interactive
- **Output:** `--json` for JSONL streaming

### Claude Code (Existing in Ralph)
- **Command:** `claude`
- **Config Location:** `~/.claude/`
- **Steering Files:** `CLAUDE.md` (project-level)
- **Skills:** `~/.claude/skills/<name>/SKILL.md`
- **Approval Mode:** `--dangerously-skip-permissions`
- **MCP Support:** Yes
- **Execution:** Interactive, streaming, JSONL subagent tracing

---

## Skills/Powers Comparison (Updated)

| CLI | Term | File Format | Location | Install Method |
|-----|------|-------------|----------|----------------|
| Claude | Skills | `SKILL.md` | `~/.claude/skills/<name>/` | Manual |
| Gemini | Skills | `SKILL.md` | `~/.gemini/skills/<name>/` or `.gemini/skills/<name>/` | `gemini skills install` |
| Codex | Skills | `skill.md` (lowercase) | `~/.codex/skills/<name>/` | Manual |
| Kiro | Powers | `POWER.md` + `mcp.json` + `steering/` | `.kiro/<name>/` (project-level) | IDE panel, GitHub URL, or local path |

**Key Insight:** All four CLIs now have similar skill systems with YAML frontmatter + Markdown format. Gemini and Kiro have more sophisticated install/management commands.

**Implementation Note:** ralph-tui skill-installer now supports all 4 CLIs:
- `getSkillsDir(cli, cwd)` - Returns appropriate directory for each CLI
- `getSkillFilename(cli)` - Returns SKILL.md, skill.md, or POWER.md
- `installSkillToAllClis()` - Installs to all detected CLIs
- `convertSkillToPower()` - Converts SKILL.md format to Kiro POWER.md (adds keywords)

---

## CLI Comparison Matrix (Documentation-Verified)

| Feature | Claude Code | Gemini CLI | Codex CLI | Kiro CLI |
|---------|-------------|------------|-----------|----------|
| **Config Format** | Various | JSON | TOML | JSON |
| **Config Location** | `~/.claude/` | `~/.gemini/` | `~/.codex/` | `.kiro/` |
| **Project Steering** | `CLAUDE.md` | `GEMINI.md` | `AGENTS.md` + Rules | `.kiro/*.md` |
| **Skills Format** | `SKILL.md` | Extensions | `skill.md` (YAML+MD) | Built-in |
| **MCP Support** | ✅ | ✅ | ✅ | ✅ |
| **Approval Modes** | 1 (skip) | 3 modes + yolo | 4 modes + full-auto | Agent-controlled |
| **Sandbox** | ❌ | ✅ (Seatbelt/Docker) | ✅ (3 modes) | ❌ |
| **Session Resume** | ✅ | ✅ `/resume` | ✅ `resume` | ❌ |
| **Non-Interactive** | ✅ `-p` | ✅ headless | ✅ `exec` | ❌ |
| **Streaming Output** | ✅ JSONL | ✅ JSON/text | ✅ | ✅ |
| **Subagent Tracing** | ✅ JSONL | ❓ Unknown | ❓ Unknown | ✅ (tool-based) |
| **Hooks/Events** | ❌ | ✅ | ❌ | ✅ |
| **Code Review** | ❌ | ✅ extension | ✅ built-in | ❌ |
| **Web Search** | ❌ | ✅ | ✅ | ✅ |
| **Image Input** | ❌ | ✅ | ✅ | ❓ |

---

## Approval Mode Mapping (Proposed Unified Abstraction)

Based on documentation research, here's a proposed unified approval mode:

| Ralph Mode | Claude | Gemini | Codex | Description |
|------------|--------|--------|-------|-------------|
| `suggest` | default | `default` | `untrusted` | Ask before most actions |
| `auto-edit` | N/A | `auto_edit` | `on-failure` | Auto-approve edits, ask for commands |
| `auto` | skip | `yolo` | `on-request` | Model decides when to ask |
| `full-auto` | skip | `yolo` + sandbox | `--full-auto` | Auto-approve with safety |
| `yolo` | skip | `yolo` | `never` | No approvals (dangerous) |

**Simplest approach for ralph-tui:** Pass through CLI-specific flags via `defaultFlags` in agent config, with optional unified abstraction layer.

---

## Key Insights from Documentation

### Execution Models (Critical for Ralph Loop)

1. **Claude Code:** Interactive with JSONL streaming - ralph-tui already handles this
2. **Gemini CLI:** 
   - Interactive: `gemini` 
   - One-shot: `gemini "prompt"`
   - Headless: `gemini --output-format json` for automation
3. **Codex CLI:**
   - Interactive: `codex`
   - Non-interactive: `codex exec "prompt"` - returns when done
   - Cloud: `codex cloud exec` for cloud-based tasks
4. **Kiro CLI:**
   - Interactive only: `kiro-cli chat`
   - No documented non-interactive mode

## Non-Interactive Mode (Critical for Ralph Loop) - VERIFIED

All three CLIs support non-interactive execution:

### Codex CLI
**Source:** developers.openai.com/codex/noninteractive
- **Command:** `codex exec "prompt"`
- **Output:** Streams progress to stderr, final message to stdout
- **JSON Output:** `codex exec --json "prompt"` - JSONL stream with events
- **Permissions:** 
  - Default: read-only sandbox
  - `--full-auto` - allow edits
  - `--sandbox danger-full-access` - full access
- **Resume:** `codex exec resume --last "follow-up prompt"`
- **Structured Output:** `--output-schema ./schema.json` for JSON schema conformance
- **Event Types:** `thread.started`, `turn.started`, `turn.completed`, `item.*`, `error`

### Gemini CLI
**Source:** geminicli.com/docs/cli/headless/
- **Command:** `gemini --prompt "query"` or `gemini -p "query"`
- **Stdin:** `echo "prompt" | gemini`
- **Output Formats:**
  - `--output-format text` (default)
  - `--output-format json` - structured with response + stats
  - `--output-format stream-json` - JSONL streaming events
- **Auto-approve:** `--yolo` or `-y` or `--approval-mode auto_edit`
- **Event Types (stream-json):** `init`, `message`, `tool_use`, `tool_result`, `error`, `result`

### Kiro CLI
**Source:** kiro.dev/docs/cli/reference/cli-commands/
- **Command:** `kiro-cli chat --no-interactive "prompt"` or `kiro-cli chat --no-interactive INPUT`
- **Trust Tools:** 
  - `--trust-all-tools` - allow any tool without confirmation
  - `--trust-tools tool1,tool2` - trust specific tools
- **Resume:** `kiro-cli chat --resume` or `--resume-picker`
- **Session Management:** `--list-sessions`, `--delete-session <ID>`
- **Agent Selection:** `--agent my-agent`

---

## Execution Command Summary for Ralph-TUI

| CLI | Non-Interactive Command | Auto-Approve Flag | Output Format |
|-----|------------------------|-------------------|---------------|
| Claude | `claude -p "prompt"` | `--dangerously-skip-permissions` | JSONL |
| Gemini | `gemini -p "prompt"` | `--yolo` | `--output-format json` |
| Codex | `codex exec "prompt"` | `--full-auto` | `--json` |
| Kiro | `kiro-cli chat --no-interactive "prompt"` | `--trust-all-tools` | Text (default) |

---

## Streaming/Event Formats Comparison

| CLI | Format | Key Events |
|-----|--------|------------|
| Claude | JSONL | Subagent tracing events |
| Gemini | JSONL (`stream-json`) | `init`, `message`, `tool_use`, `tool_result`, `result` |
| Codex | JSONL (`--json`) | `thread.started`, `turn.*`, `item.*` |
| Kiro | Text | No documented streaming format |

**Insight:** Gemini and Codex have similar JSONL streaming formats. Ralph-tui's existing JSONL parser for Claude may be adaptable.

---

## EngOS Skill Design Insights

### Self-Evolving System Principles
1. **Knowledge Base** - Must be queryable and updateable
2. **Self-Assessment** - Needs clear metrics and criteria
3. **Human-in-Loop** - All changes require approval
4. **Grounded Evaluation** - Use established frameworks

### Evaluation Frameworks to Consider
- **SWOT** - Strengths, Weaknesses, Opportunities, Threats
- **Systems Thinking** - Feedback loops, emergence, boundaries
- **Decision Matrix** - Weighted criteria scoring
- **OODA Loop** - Observe, Orient, Decide, Act
- **Cynefin** - Simple, Complicated, Complex, Chaotic domains

### Cognitive Load Reduction Strategies
- Automate repetitive decisions
- Surface only actionable information
- Progressive disclosure of complexity
- Sensible defaults with override capability

---

## Process Insights

### Upstream Sync Strategy (Emerging)
- Keep fork changes isolated to new files when possible
- Extend, don't modify existing code
- Use feature flags for new functionality
- Document all changes for PR clarity

### Testing Strategy (Emerging)
- Each CLI needs mock/stub for testing
- Integration tests need real CLI availability detection
- Snapshot testing for config generation
- E2E tests for full ralph loop per CLI

---

## Questions to Resolve

1. **How do gemini-cli and codex handle long-running agent sessions?**
2. **Do they support streaming output like Claude Code?**
3. **What's the subagent/tool-use model for each?**
4. **How do they handle approval/confirmation prompts?**
5. **Can they be run headless (non-interactive)?**

---

## Ideas for Simplification

1. **Unified Agent Interface** - Abstract CLI differences behind common interface
2. **Config Adapters** - Transform ralph config to CLI-specific format
3. **Detection Module** - Single place to detect available CLIs
4. **Capability Flags** - Each agent declares what it supports

---

## External References

- [Simple Made Easy - Rich Hickey](https://www.infoq.com/presentations/Simple-Made-Easy/)
- [Ralph-TUI Documentation](https://ralph-tui.com)
- [Original Ralph Concept - Geoffrey Huntley](https://ghuntley.com/ralph/)

---

## Session Notes

### 2026-01-16 Session
- Initialized project structure
- Created memory system for continuity
- User wants iterative partnership approach
- Next: CLI capability research


---

## Lessons Learned (2026-01-16)

### Additive vs Breaking Changes

**Key Principle:** When extending existing software, changes should be ADDITIVE, not modify default behaviors.

**What we got right:**
- Adding new agent plugins (gemini, codex, kiro) - purely additive
- Adding config normalization for map-style syntax - backward compatible
- Adding multi-CLI skill installer functions - available but not forced

**What we initially got wrong:**
- Changed default skill installation from "selected agent only" to "all detected CLIs"
- This was a behavior change, not an additive feature

**Correction:**
- Reverted to original behavior: install skills to selected agent only
- Added OPTIONAL prompt: "Also install skills for other detected CLIs?" (default: false)
- This preserves backward compatibility while enabling new functionality

### Design Principle for Theme 1

> "Make ralph-tui work just as well with Gemini, Codex, and Kiro as it does with Claude"

This means:
1. Add support for new CLIs (additive)
2. Don't assume Claude is installed - show only available agents
3. Give users clear choices when multiple CLIs are detected
4. Reserve breaking changes for Theme 2 (EngOS integration)

### Agent Selection Behavior (Final)

**Problem:** Original code showed ALL registered agents (even unavailable ones) and defaulted to Claude.
This breaks for users who don't have Claude installed.

**Solution:**
1. Only show AVAILABLE (detected) agents in selection menu
2. If no agents detected, fail with helpful error listing supported agents
3. When multiple CLIs detected, offer menu: "selected only" / "all" / "skip"
4. When single CLI detected, use simple yes/no per skill (original UX)


### Upstream Merge (2026-01-16)

**Merged upstream/main into feature/port-ralphtui-ai**

Upstream additions:
- Sandbox support for agent execution (`src/sandbox/`)
- Clipboard utilities (`src/utils/clipboard.ts`)
- Output formatting improvements
- Bug fixes and test improvements
- 1057 tests now pass (up from 873)

Our additions preserved (verified):
- `src/plugins/agents/builtin/gemini.ts` ✅
- `src/plugins/agents/builtin/codex.ts` ✅
- `src/plugins/agents/builtin/kiro.ts` ✅
- `src/plugins/agents/builtin/index.ts` (registers all 6 agents) ✅
- `src/config/schema.ts` (map-style config) ✅
- `src/config/index.ts` (normalizeConfig) ✅
- `src/setup/skill-installer.ts` (multi-CLI) ✅
- `src/setup/wizard.ts` (available agents, menu) ✅

No conflicts during merge.

---

## Final Implementation Summary

### Files Created
| File | Purpose |
|------|---------|
| `src/plugins/agents/builtin/gemini.ts` | Gemini CLI agent |
| `src/plugins/agents/builtin/codex.ts` | Codex CLI agent |
| `src/plugins/agents/builtin/kiro.ts` | Kiro CLI agent |
| `tests/plugins/gemini-agent.test.ts` | 17 tests |
| `tests/plugins/codex-agent.test.ts` | 17 tests |
| `tests/plugins/kiro-agent.test.ts` | 14 tests |
| `scripts/test-multi-cli.sh` | Manual test script |
| `scripts/test-prd.json` | Test PRD |
| `docs/INSTALL-FORK.md` | Installation instructions |

### Files Modified
| File | Changes |
|------|---------|
| `src/plugins/agents/builtin/index.ts` | Register 3 new agents |
| `src/config/schema.ts` | Map-style agents config |
| `src/config/index.ts` | normalizeConfig function |
| `src/setup/skill-installer.ts` | Multi-CLI support |
| `src/setup/wizard.ts` | Available agents only, skills menu |
| `README.md` | List all 6 agents |
| `CONTRIBUTING.md` | List all agents |

### Installation
```bash
bun install -g github:medhatgalal/ralph-tui#feature/port-ralphtui-ai
```

### Usage
```bash
ralph-tui setup                              # Detects available CLIs
ralph-tui run --agent gemini --prd ./prd.json
ralph-tui run --agent kiro --prd ./prd.json
ralph-tui run --agent codex --prd ./prd.json
```
