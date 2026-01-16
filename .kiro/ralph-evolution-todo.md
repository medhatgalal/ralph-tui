# Ralph Evolution - TODO Checklist

## Current Status
**Phase:** 3 - Implementation ✅ COMPLETE
**Focus:** Theme 1 - Multi-CLI Support
**Branch:** feature/port-ralphtui-ai
**Next:** Phase 4 Documentation & PR

---

## Phase 1: Research & Discovery ✅ COMPLETE

### 1.1 CLI Research ✅
- [x] Claude Code - non-interactive mode, skills format
- [x] Gemini CLI - non-interactive mode, skills format  
- [x] Codex CLI - non-interactive mode, skills format
- [x] Kiro CLI - non-interactive mode, powers format

### 1.2 Ralph-TUI Analysis ✅
- [x] Plugin architecture (src/plugins/agents/)
- [x] AgentPlugin interface
- [x] Setup wizard flow
- [x] Configuration system
- [x] Skills installation
- [x] Setup re-run behavior (--force flag overwrites)

---

## Phase 2: Architecture Design ✅ COMPLETE

### 2.1 Design Decisions ✅
- [x] Approval mode: Hybrid (unified + default_flags)
- [x] Kiro tracing: Activity indicator + elapsed time + safe capture
- [x] Skills scope: All detected CLIs
- [x] Default agent: Config + fallback (Kiro default)
- [x] Skills format: Single source + converter
- [x] Steering files: AGENTS.md unified
- [x] Config changes: TOML edit or setup --force

### 2.2 Specification ✅
- [x] Create `.kiro/specs/theme1-multi-cli-support.md`
- [x] Document all requirements (1a-1j)
- [x] Define success criteria
- [x] Add real CLI test section
- [x] Add update strategy section

---

## Phase 3: Implementation 🔄 IN PROGRESS

### 3.1 Agent Plugins ✅
- [x] Create `src/plugins/agents/builtin/gemini.ts` plugin
- [x] Create `src/plugins/agents/builtin/kiro.ts` plugin
- [x] Create `src/plugins/agents/builtin/codex.ts` plugin
- [x] Update agent registry (via builtin/index.ts)

### 3.2 Configuration ✅
- [x] Add new agent configs to schema (map-style support)
- [x] Add `default_flags` per agent (already existed)
- [x] Add `default_agent` setting (already existed)
- [x] Update config validation and types
- [x] Add snake_case normalization
- [x] Add tests for map-style config

### 3.3 Setup Wizard ✅
- [x] Add detection for new CLIs (already worked via registry)
- [x] Add skill installation for new CLIs
- [x] Add multi-CLI skills directory support
- [x] Convert SKILL.md to POWER.md for Kiro
- [x] Test re-run with --force (already worked)

### 3.4 Skills ✅
- [x] Create skill converter utility (in skill-installer.ts)
- [x] Generate CLI-specific skill formats (convertSkillToPower)
- [x] Support different filenames (SKILL.md, skill.md, POWER.md)
- [ ] Test skills in each CLI (manual - user task)

### 3.5 Testing ✅
- [x] Unit tests for new plugins (gemini, codex, kiro)
- [x] Integration tests (existing tests pass)
- [ ] Manual CLI tests (user-executed)

---

## Phase 4: Documentation & PR

- [ ] Update README.md
- [ ] Update CONTRIBUTING.md
- [ ] Create PR to upstream
- [ ] Address review feedback

---

## Notes

- **Spec location:** `.kiro/specs/theme1-multi-cli-support.md`
- **Context file:** `.kiro/ralph-evolution-context.md`
- **Insights file:** `.kiro/ralph-evolution-insights.md`
