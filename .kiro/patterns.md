# Ralph TUI - Code Patterns

## File Header Convention

Every file MUST start with a JSDoc comment prefixed with "ABOUTME:":

```typescript
/**
 * ABOUTME: Brief description of file's purpose and responsibility.
 * Additional context if needed.
 */
```

## OpenTUI/React Patterns

### Component Structure

```typescript
import { Box, Text } from "@opentui/react";
import type { FC } from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <Box flexDirection="column">
      <Text>{title}</Text>
    </Box>
  );
};
```

### State Management in TUI

```typescript
import { useState, useEffect } from "react";

// Use React hooks for local state
const [state, setState] = useState<StateType>(initialState);

// Use useEffect for side effects
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### Keyboard Input Handling

```typescript
import { useInput } from "@opentui/react";

useInput((input, key) => {
  if (key.return) {
    // Handle enter
  }
  if (input === "q") {
    // Handle 'q' key
  }
});
```

## Plugin Patterns

### Agent Plugin Structure

```typescript
import type { AgentPlugin, AgentExecutionResult } from "../types.js";

export const myAgent: AgentPlugin = {
  name: "my-agent",
  displayName: "My Agent",
  
  async execute(prompt: string, options): Promise<AgentExecutionResult> {
    // Implementation
    return {
      success: true,
      output: "...",
      error: undefined,
    };
  },
  
  async isAvailable(): Promise<boolean> {
    // Check if agent is available
    return true;
  },
};
```

### Tracker Plugin Structure

```typescript
import type { TrackerPlugin, Task } from "../types.js";

export const myTracker: TrackerPlugin = {
  name: "my-tracker",
  displayName: "My Tracker",
  
  async initialize(config): Promise<void> {
    // Setup
  },
  
  async getTasks(): Promise<Task[]> {
    // Fetch tasks
    return [];
  },
  
  async updateTask(taskId: string, updates): Promise<void> {
    // Update task
  },
};
```

## Configuration Patterns

### Zod Schema Definition

```typescript
import { z } from "zod";

export const MyConfigSchema = z.object({
  field: z.string().default("default-value"),
  optional: z.number().optional(),
  nested: z.object({
    subfield: z.boolean(),
  }),
});

export type MyConfig = z.infer<typeof MyConfigSchema>;
```

### Config Loading

```typescript
import { loadConfig } from "../config/loader.js";
import { MyConfigSchema } from "./schema.js";

const config = await loadConfig(MyConfigSchema, "my-config.toml");
```

## Template Patterns

### Handlebars Template

```handlebars
{{!-- templates/my-template.hbs --}}
# Task: {{task.title}}

## Context
{{#if context}}
{{context}}
{{/if}}

## Instructions
{{#each instructions}}
- {{this}}
{{/each}}
```

### Template Rendering

```typescript
import Handlebars from "handlebars";
import { readFile } from "fs/promises";

const templateSource = await readFile("templates/my-template.hbs", "utf-8");
const template = Handlebars.compile(templateSource);
const output = template({ task, context, instructions });
```

## Error Handling Patterns

### Result Type Pattern

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function doSomething(): Promise<Result<string>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

### Error Propagation

```typescript
// Prefer explicit error handling over throwing
if (!isValid) {
  return { success: false, error: new Error("Validation failed") };
}

// Only throw for truly exceptional cases
if (criticalSystemFailure) {
  throw new Error("Critical failure");
}
```

## Testing Patterns

### Test File Structure

```typescript
import { describe, it, expect, beforeEach } from "bun:test";
import { myFunction } from "../src/my-module.js";

describe("myFunction", () => {
  beforeEach(() => {
    // Setup
  });

  it("should handle normal case", () => {
    const result = myFunction("input");
    expect(result).toBe("expected");
  });

  it("should handle edge case", () => {
    const result = myFunction("");
    expect(result).toBe("");
  });
});
```

### Factory Pattern for Test Data

```typescript
// tests/factories/task-factory.ts
export function createTask(overrides?: Partial<Task>): Task {
  return {
    id: "test-task-1",
    title: "Test Task",
    status: "pending",
    ...overrides,
  };
}
```

### Mocking

```typescript
import { mock } from "bun:test";

const mockAgent = {
  execute: mock(async () => ({ success: true, output: "mocked" })),
  isAvailable: mock(async () => true),
};
```

## Import Patterns

### Always use .js extensions

```typescript
// Correct
import { myFunction } from "./utils.js";
import type { MyType } from "../types.js";

// Wrong
import { myFunction } from "./utils";
```

### Type-only imports

```typescript
// Use type imports when only importing types
import type { FC } from "react";
import type { Task, TrackerPlugin } from "../types.js";
```

## Async Patterns

### Prefer async/await over promises

```typescript
// Good
async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Avoid
function fetchData() {
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}
```

### Parallel async operations

```typescript
// Use Promise.all for parallel operations
const [tasks, config, status] = await Promise.all([
  tracker.getTasks(),
  loadConfig(),
  checkStatus(),
]);
```

## Comments

- Make comments evergreen (no temporal context like "currently" or "for now")
- Preserve existing comments unless provably false
- Use JSDoc for public APIs
- Inline comments for complex logic only
