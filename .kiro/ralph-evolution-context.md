# Ralph Evolution - Project Context

**Project:** Extend ralph-tui with multi-CLI support + EngOS integration
**Philosophy:** Rich Hickey's "Simple Made Easy" - decomplect, favor simplicity, data over abstractions
**Started:** 2026-01-16
**Status:** Theme 1 Complete - v0.2.1 tested with Kiro

---

## Current Version

**ralph-tui v0.2.1** with multi-CLI support:
- 6 agents: claude, opencode, droid, gemini, codex, kiro
- Multi-agent skill installation via skillsPaths
- All fixes from upstream v0.2.0 and v0.2.1

---

## Testing Completed

### Calc Platform Test Project (`~/Desktop/ralph-test-calc`)
- **12 user stories** executed autonomously with Kiro (40 mins)
- **Results:** CLI ✅, TUI ✅, Core calc ✅, Web UI ❌ (browser import bug)
- **Lesson:** PRDs need quality gates and testable acceptance criteria

### Quality Assessment
| Component | Status |
|-----------|--------|
| TypeScript compilation | ✅ Pass |
| Unit tests (core) | ✅ 26/26 pass |
| CLI interface | ✅ Works |
| TUI interface | ✅ Works |
| Web UI | ❌ Fixed manually (browser import issue) |
| API tests | ⚠️ Need running server |

---

## Goals

### Theme 1: Multi-CLI Support ✅ COMPLETE
Extend ralph-tui to support Gemini CLI, Kiro CLI, and Codex CLI alongside existing Claude Code support.

### Theme 2: EngOS Skill (DEFERRED)
Build a self-evolving, self-evaluating AI skill integrated with ralph-tui.

---

## Key Learnings: Effective Ralph-TUI Usage

### PRD Best Practices
1. **Quality Gates section** - Commands that must pass for every story
2. **Testable acceptance criteria** - Exact commands with expected output
3. **Smaller stories** - Each independently verifiable
4. **Amend stories** - Set `passes: false` to re-run, add new stories for fixes

### Amending PRDs
```bash
# Ralph picks up any story with passes: false
# Add fix stories with specific acceptance criteria
# Run: ralph-tui run --prd ./prd.json --agent kiro
```

---

## Repository Info

- **Fork:** https://github.com/medhatgalal/ralph-tui.git
- **Branch:** feature/port-ralphtui-ai
- **Upstream:** https://github.com/subsy/ralph-tui.git

---

## Ralph-TUI Capabilities to Preserve

### Setup
- `ralph-tui setup` - Interactive wizard
- `ralph-tui setup --force` - Overwrite existing config
- Detects agents, creates config, installs skills

### Configuration
- Global: `~/.config/ralph-tui/config.toml`
- Project: `.ralph-tui/config.toml`
- CLI flags override everything

### Skills
- Installed to CLI-specific locations
- Usable directly inside each CLI
- Three bundled: ralph-tui-prd, ralph-tui-create-json, ralph-tui-create-beads

### Templates
- Handlebars `.hbs` format
- `ralph-tui template init` / `ralph-tui template show`
- `{{recentProgress}}` for cross-iteration context

### Runtime
- `ralph-tui run --agent <name>` - Override agent
- `ralph-tui run --prd <file>` - Specify PRD
- `ralph-tui run --prompt <template>` - Custom template

---

## CLI Capabilities Summary

| CLI | Non-Interactive | Auto-Approve | Skills Location |
|-----|-----------------|--------------|-----------------|
| Claude | `claude -p "prompt"` | `--dangerously-skip-permissions` | `~/.claude/skills/<name>/SKILL.md` |
| Gemini | `gemini -p "prompt"` | `--yolo` | `~/.gemini/skills/<name>/SKILL.md` |
| Codex | `codex exec "prompt"` | `--full-auto` | `~/.codex/skills/<name>/skill.md` |
| Kiro | `kiro-cli chat --no-interactive "prompt"` | `--trust-all-tools` | `.kiro/<name>/POWER.md` |

---

## Memory Compaction Protocol

**After any memory compaction, ALWAYS:**
1. Read this file first (ralph-evolution-context.md)
2. Read ralph-evolution-todo.md for current task
3. Read ralph-evolution-insights.md for technical details
4. Read `.kiro/specs/theme1-multi-cli-support.md` for full spec
5. Continue from where you left off

---

## Files Created This Session

- `.kiro/context.md` - Project steering
- `.kiro/patterns.md` - Code patterns
- `.kiro/workflows.md` - Dev workflows
- `.kiro/prompts/supercharge.md` - Power prompt
- `.kiro/prompts/export-thread.md` - Thread export
- `.kiro/iterative-analysis-workflow.md` - Analysis pattern
- `.kiro/specs/theme1-multi-cli-support.md` - Theme 1 spec
- `.kiro/ralph-evolution-context.md` - This file
- `.kiro/ralph-evolution-todo.md` - Task tracking
- `.kiro/ralph-evolution-insights.md` - Technical insights
