# Ralph Evolution - TODO Checklist

## Current Status
**Phase:** Theme 1 ✅ COMPLETE + TESTED
**Focus:** Multi-CLI Support
**Branch:** feature/port-ralphtui-ai
**Version:** v0.2.1 (merged from upstream)

---

## Theme 1: Multi-CLI Support ✅ COMPLETE

### Implementation ✅
- [x] Agent plugins (gemini, codex, kiro)
- [x] Config schema (map-style support)
- [x] Setup wizard (available agents only, skills menu)
- [x] Skill installer (multi-CLI support)
- [x] Unit tests (48 new tests)
- [x] Upstream merge v0.2.0 and v0.2.1

### Testing ✅
- [x] Calc Platform test project (12 stories, 40 mins)
- [x] CLI works ✅
- [x] TUI works ✅
- [x] Web UI fixed manually (browser import bug)
- [x] Documented PRD best practices

### Remaining
- [ ] Run US-013 (Web UI fix) through ralph-tui to verify amendment flow
- [ ] Create PR to upstream (optional)

---

## Learnings Captured

### PRD Best Practices
1. Quality Gates section with commands that must pass
2. Testable acceptance criteria with exact expected output
3. Smaller stories that are independently verifiable
4. Amend stories by setting `passes: false` or adding new stories

### Ralph-TUI Limitations
- No browser testing
- Trusts agent's COMPLETE signal
- Needs quality gates in PRD for verification

---

## Theme 2: EngOS Skill (DEFERRED)

- [ ] Design skill structure
- [ ] Implement self-knowledge system
- [ ] Implement evaluation framework
- [ ] Integrate with ralph-tui

---

## Next Steps

1. **Optional:** Run `ralph-tui run --prd ./prd.json --agent kiro` in calc project to test US-013 fix story
2. **Optional:** Create PR to upstream ralph-tui with multi-CLI support
3. **Future:** Theme 2 - EngOS Skill integration
