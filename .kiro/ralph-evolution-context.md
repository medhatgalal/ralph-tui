# Ralph Evolution - Project Context

**Project:** Extend ralph-tui with multi-CLI support + EngOS integration
**Philosophy:** Rich Hickey's "Simple Made Easy" - decomplect, favor simplicity, data over abstractions
**Started:** 2026-01-16
**Status:** Theme 1 Complete - Ready for Testing & PR

---

## Goals

### Theme 1: Multi-CLI Support ✅ COMPLETE
Extend ralph-tui to support Gemini CLI, Kiro CLI, and Codex CLI alongside existing Claude Code support.

**Spec Location:** `.kiro/specs/theme1-multi-cli-support.md`
**Install Docs:** `docs/INSTALL-FORK.md`

### Theme 2: EngOS Skill (DEFERRED)
Build a self-evolving, self-evaluating AI skill integrated with ralph-tui.
Uses EngOS for Humans v4.4 guide: `temp/EngOS_Guide_for_Humans_v4.4.md`

---

## Key Decisions (FINALIZED)

| Decision | Choice | Notes |
|----------|--------|-------|
| Approval mode | **Hybrid** | Unified `approval` setting + `default_flags` override |
| Kiro tracing | **Activity indicator** | Spinner + elapsed time + safe activity capture (no fragile parsing) |
| Skills scope | **All detected CLIs** | Install for each CLI found during setup |
| Default agent | **Config + fallback** | User selects at setup, Kiro as fallback default |
| Skills format | **Single source + converter** | One canonical skill, generate CLI-specific formats |
| Steering files | **AGENTS.md unified** | All CLIs read AGENTS.md, CLI-specific files import it |
| Config changes | **Edit TOML or re-run setup --force** | No new command needed |

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
