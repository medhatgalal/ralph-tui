# Ralph Evolution - TODO Checklist

## Current Status
**Phase:** 2 - Architecture Design ✅ COMPLETE
**Focus:** Theme 1 - Multi-CLI Support
**Branch:** feature/port-ralphtui-ai
**Next:** Phase 3 Implementation

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

### 3.2 Configuration
- [ ] Add new agent configs to schema
- [ ] Add `default_flags` per agent
- [ ] Add `default_agent` setting
- [ ] Update config validation

### 3.3 Setup Wizard
- [ ] Add detection for new CLIs
- [ ] Add skill installation for new CLIs
- [ ] Add default agent selection prompt
- [ ] Test re-run with --force

### 3.4 Skills
- [ ] Create skill converter utility
- [ ] Generate CLI-specific skill formats
- [ ] Test skills in each CLI

### 3.5 Testing
- [ ] Unit tests for new plugins
- [ ] Integration tests
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
