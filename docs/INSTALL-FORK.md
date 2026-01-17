# Installing Ralph TUI Fork (Multi-CLI Support)

This fork adds support for Gemini CLI, Codex, and Kiro CLI alongside the original Claude Code support.

## Quick Install

```bash
# Install from the fork
bun install -g github:medhatgalal/ralph-tui#feature/port-ralphtui-ai
```

Or with npm:
```bash
npm install -g github:medhatgalal/ralph-tui#feature/port-ralphtui-ai
```

## Verify Installation

```bash
# Check version
ralph-tui --version

# List available agents (should show 6)
ralph-tui plugins agents
```

Expected output:
```
Available Agent Plugins:
  claude (built-in)
  opencode (built-in)
  droid (built-in)
  gemini (built-in)    # NEW
  codex (built-in)     # NEW
  kiro (built-in)      # NEW

Total: 6 plugin(s)
```

## Setup in Your Project

```bash
cd your-project
ralph-tui setup
```

The setup wizard will:
1. Detect which CLIs you have installed (gemini, codex, kiro-cli, claude, etc.)
2. Let you choose your default agent
3. Optionally install skills for all detected CLIs

## Running with Different Agents

```bash
# Use Gemini CLI
ralph-tui run --agent gemini --prd ./prd.json

# Use Codex
ralph-tui run --agent codex --prd ./prd.json

# Use Kiro CLI
ralph-tui run --agent kiro --prd ./prd.json

# Use Claude (original)
ralph-tui run --agent claude --prd ./prd.json
```

## Configuration

You can set your default agent in `.ralph-tui/config.toml`:

```toml
# Set default agent
defaultAgent = "gemini"

# Or use map-style config for per-agent settings
[agents.gemini]
plugin = "gemini"
default_flags = ["--yolo"]

[agents.kiro]
plugin = "kiro"
default_flags = ["--trust-all-tools"]

[agents.codex]
plugin = "codex"
default_flags = ["--full-auto"]
```

## CLI Requirements

Make sure you have at least one of these CLIs installed:

| CLI | Install Command | Docs |
|-----|-----------------|------|
| Gemini CLI | `npm install -g @anthropic-ai/gemini-cli` | [geminicli.com](https://geminicli.com) |
| Codex | `npm install -g @openai/codex` | [openai.com/codex](https://openai.com/codex) |
| Kiro CLI | `npm install -g @anthropic-ai/kiro-cli` | [kiro.dev](https://kiro.dev) |
| Claude Code | `npm install -g @anthropic-ai/claude-code` | [claude.ai](https://claude.ai) |

## Switching Back to Upstream

If you want to switch back to the original ralph-tui:

```bash
bun install -g ralph-tui
```

## Fork Repository

- Fork: https://github.com/medhatgalal/ralph-tui
- Branch: `feature/port-ralphtui-ai`
- Upstream: https://github.com/subsy/ralph-tui
