# Ralph TUI - Project Context

## What is Ralph TUI?

Ralph TUI is an **AI Agent Loop Orchestrator** - a terminal UI that orchestrates AI coding agents (Claude Code, OpenCode, Factory Droid) to work through task lists autonomously.

### Core Concept: The Ralph Loop

```
SELECT TASK → BUILD PROMPT → EXECUTE AGENT → DETECT COMPLETION → NEXT TASK
```

Ralph selects highest-priority tasks, builds prompts with context, executes AI agents, detects completion, and repeats until all tasks are done.

## Architecture Overview

### Key Components

1. **Engine** (`src/engine/`) - Core execution loop and event system
2. **Plugins** (`src/plugins/`) - Extensible agent and tracker implementations
3. **TUI** (`src/tui/`) - Terminal UI using OpenTUI/React
4. **Session** (`src/session/`) - Persistence and state management
5. **Templates** (`src/templates/`) - Handlebars prompt templates
6. **Config** (`src/config/`) - Zod-based configuration validation

### Plugin Architecture

**Agents** (`src/plugins/agents/`):
- `claude` - Claude Code integration
- `opencode` - OpenCode integration
- Subagent tracing parser for nested agent calls

**Trackers** (`src/plugins/trackers/`):
- `json` - Simple prd.json format
- `beads` - Git-backed with dependencies
- `beads-bv` - Beads with bv triage integration

### Key Technologies

- **Runtime**: Bun (not Node.js)
- **UI**: OpenTUI/React (terminal-based React)
- **Templating**: Handlebars
- **Validation**: Zod schemas
- **Config**: TOML format
- **Testing**: Bun test runner

## Domain Concepts

### PRD (Product Requirements Document)
- Structured task lists with skills and context
- Can be converted to tracker formats (JSON, Beads)
- Created via chat mode or skills

### Skills
- Reusable capabilities/instructions for agents
- Stored in `~/.claude/skills/` or custom `skills_dir`
- Used in PRDs and directly in agents

### Session Persistence
- Survives crashes and interruptions
- Lock management prevents concurrent runs
- Iteration logs stored in `.ralph-tui/logs/`

### Subagent Tracing
- Real-time visibility into nested agent calls
- Parsed from agent output streams
- Displayed in TUI with indentation

## File Structure Conventions

```
src/
├── cli.tsx              # CLI entry point (Ink/React)
├── commands/            # CLI command implementations
├── config/              # Zod schemas + config loading
├── engine/              # Execution loop + events
├── plugins/
│   ├── agents/          # Agent implementations
│   └── trackers/        # Tracker implementations
├── session/             # State persistence
├── templates/           # Handlebars templates
├── tui/                 # Terminal UI components
│   └── components/      # React components
└── utils/               # Shared utilities

tests/                   # Mirror src/ structure
skills/                  # Bundled skills
website/                 # Next.js documentation site
```

## Configuration Hierarchy

1. Project: `.ralph-tui/config.toml`
2. User: `~/.config/ralph-tui/config.toml`
3. Defaults: Built-in

Merged with project overriding user overriding defaults.

## Important Constraints

- **Bun-only**: Uses Bun APIs, not compatible with Node.js
- **Terminal UI**: OpenTUI/React, not web React
- **Strict TypeScript**: All compiler strict flags enabled
- **No tests by default**: Only add tests when explicitly requested
- **Minimal changes**: Smallest reasonable change to achieve goal
