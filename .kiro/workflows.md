# Ralph TUI - Development Workflows

## Starting Development

```bash
# Fresh clone
git clone <repo>
cd ralph-tui
bun install

# Verify setup
bun run typecheck
bun run build
```

## Making Changes

### 1. Before Starting

```bash
# Check for available work
bd ready

# Or use bv for intelligent triage
bv --robot-triage | jq '.recommendations[0]'

# Claim work
bd update <id> --status in_progress
```

### 2. Development Loop

```bash
# Run in dev mode (watches for changes)
bun run dev

# In another terminal, run type checking
bun run typecheck --watch
```

### 3. Quality Gates

```bash
# Before committing
bun run typecheck
bun run lint
bun run build

# If tests exist
bun test
```

### 4. Commit and Push

```bash
# Commit changes
git add .
git commit -m "feat: description"

# Update issue status
bd update <id> --status done
bd close <id>

# Sync and push
git pull --rebase
bd sync
git push
```

## Common Tasks

### Adding a New Agent Plugin

1. Create `src/plugins/agents/my-agent.ts`
2. Implement `AgentPlugin` interface
3. Export from `src/plugins/agents/index.ts`
4. Add to agent registry
5. Update documentation

### Adding a New Tracker Plugin

1. Create `src/plugins/trackers/my-tracker.ts`
2. Implement `TrackerPlugin` interface
3. Export from `src/plugins/trackers/index.ts`
4. Add to tracker registry
5. Update documentation

### Adding a New CLI Command

1. Create `src/commands/my-command.ts`
2. Implement command logic
3. Add to CLI router in `src/cli.tsx`
4. Update help text
5. Add to documentation

### Adding a New TUI Component

1. Create `src/tui/components/MyComponent.tsx`
2. Use OpenTUI/React components
3. Export from `src/tui/components/index.ts`
4. Import and use in parent component

### Modifying Prompt Templates

1. Edit `src/templates/*.hbs`
2. Test with `ralph-tui run --dry-run`
3. Verify output format
4. Update template tests if they exist

### Adding Configuration Options

1. Update Zod schema in `src/config/schema.ts`
2. Add default value
3. Update config loading logic
4. Document in README and website
5. Add migration if needed

## Testing Workflows

### Running Tests

```bash
# All tests
bun test

# Watch mode
bun test --watch

# Coverage
bun test --coverage

# Specific file
bun test tests/my-test.test.ts
```

### Writing Tests (Only When Requested)

1. Create test file mirroring src structure: `tests/path/to/file.test.ts`
2. Use factories for test data: `tests/factories/`
3. Mock external dependencies
4. Test happy path and edge cases
5. Run tests before committing

## Debugging

### TUI Debugging

```bash
# Run with debug output
DEBUG=* bun run dev

# Run headless to see raw output
ralph-tui run --headless
```

### Agent Debugging

```bash
# Check agent availability
ralph-tui plugins agents

# Test agent execution
ralph-tui run --agent claude --iterations 1 --headless
```

### Session Debugging

```bash
# Check session status
ralph-tui status

# View logs
ralph-tui logs

# Clear session (if stuck)
rm -rf .ralph-tui/session.json
```

## Release Workflow

```bash
# Update version
bun version patch|minor|major

# Build and verify
bun run clean
bun run build
bun run typecheck

# Test installation
bun link
ralph-tui --version

# Publish (maintainers only)
npm publish
```

## Documentation Updates

### Website Development

```bash
cd website
bun install
bun run dev  # http://localhost:3000
```

### Updating Docs

1. Edit markdown in `website/content/docs/`
2. Preview locally
3. Commit with docs changes
4. Deploy automatically on merge to main

## Custom Prompts

### Available Prompts

**Export Thread** (`.kiro/prompts/export-thread.md`)
- Export conversation transcript to markdown file
- Usage: `export-thread` or `export-thread help`

**SuperCharge** (`.kiro/prompts/supercharge.md`)
- Advanced prompt engineering and context reconstruction
- Usage: `supercharge help` for full guide
- Commands: `/ult`, `/catchup`, `/stop-ult`

### Using Custom Prompts

Prompts in `.kiro/prompts/` are automatically included in context.

Invoke by typing the trigger phrase:
```
export-thread help
supercharge /ult create a prompt for: <task>
supercharge /catchup
```

## Troubleshooting

### "Module not found" errors
- Check `.js` extensions in imports
- Verify file exists
- Check tsconfig paths

### Type errors after changes
- Run `bun run typecheck`
- Check Zod schema changes
- Verify interface implementations

### TUI not rendering correctly
- Check OpenTUI component usage
- Verify terminal size
- Test in different terminals

### Build failures
- Clear dist: `bun run clean`
- Reinstall: `rm -rf node_modules && bun install`
- Check Bun version: `bun --version`
