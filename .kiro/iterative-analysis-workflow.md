# Iterative Analysis Workflow

This steering file defines a standard workflow for any multi-step analysis task that requires:
- Processing multiple files/items
- Maintaining context across memory compactions
- Accumulating insights iteratively

## When to Use This Workflow

Apply this pattern when:
- Analyzing multiple documents, transcripts, or files
- Extracting patterns, insights, or data across sources
- Working on tasks that may exceed a single context window
- Building cumulative knowledge that must survive memory compaction

## Required Memory Files

Before starting any iterative analysis, create these three files in `.kiro/` or a project-specific location:

### 1. `<task>-context.md`
Contains:
- Goal of the analysis (what you're trying to achieve)
- Success criteria (what "done" looks like)
- Scope (what's included/excluded)
- Key definitions or extraction criteria
- Any constraints or rules

### 2. `<task>-todo.md`
Contains:
- Full list of items to process (files, transcripts, etc.)
- Checkbox for each item: `- [ ]` pending, `- [x]` complete
- Notes on what was found per item (brief)
- Current status and next item to process

### 3. `<task>-insights.md`
Contains:
- Accumulated findings, updated after each item
- Patterns emerging across items
- Key quotes, phrases, or data points extracted
- Summary sections that grow as analysis progresses

## Workflow Rules

### Before Starting
1. Create all three memory files
2. Populate context with goal and criteria
3. List all items in todo with unchecked boxes
4. Initialize insights with empty sections

### While Working
1. Process one item at a time
2. After each item:
   - Update insights with new findings
   - Check off the item in todo
   - Add brief notes to todo entry
3. **Critical:** Update files BEFORE memory compaction risk

### After Memory Compaction
1. **First action:** Read context file to restore goal
2. **Second action:** Read todo file to find current position
3. **Third action:** Read insights to restore accumulated knowledge
4. Continue from where you left off

### Completion
1. All items checked in todo
2. Insights contains complete analysis
3. Summary section in insights with key findings

## Template: Analysis Task Setup

```markdown
# [Task Name] - Context

## Goal
[What you're trying to achieve]

## Success Criteria
[What "done" looks like]

## Extraction Criteria
For each item, extract:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

## Scope
- Include: [what's in scope]
- Exclude: [what's out of scope]

## Rules
- [Any specific rules or constraints]
```

```markdown
# [Task Name] - TODO

## Status
- Total items: X
- Completed: Y
- Current: [item name]

## Items
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3
...
```

```markdown
# [Task Name] - Insights

## Summary (update as you go)
[High-level findings]

## Patterns
[Recurring themes across items]

## Key Extractions
### [Category 1]
- [Finding]
- [Finding]

### [Category 2]
- [Finding]
- [Finding]

## Raw Notes
### Item 1
[Notes from processing]

### Item 2
[Notes from processing]
```

## Example: Customer Pain Point Analysis

**Context goal:** Extract customer pain points in their own words for future content creation

**Extraction criteria:**
- Exact phrases used to describe problems or pain points
- Questions asked
- Concerns or hesitations mentioned

**Todo:** List of transcript files to analyze

**Insights:** Accumulated pain points, questions, and concerns with exact quotes

## Integration with Existing Memory Files

For the ralph-evolution project, we already have:
- `ralph-evolution-context.md` - Project context
- `ralph-evolution-todo.md` - Task tracking
- `ralph-evolution-insights.md` - Accumulated learnings

This pattern is already in use. Apply the same structure to any new analysis task.
