# Export Thread - Kiro CLI Thread Transcript Exporter

**Activation Triggers:**
- User says: "export-thread" or "export thread"
- User says: "/export-thread"

**Help Trigger:**
- User says: "export-thread help"

When activated, execute the THREADER export process below.

---

## HELP OUTPUT (show when user says "export-thread help")

**Export Thread** - High-fidelity conversation transcript exporter

**Usage:**
- `export-thread` - Export current conversation to markdown file
- `export-thread help` - Show this help

**What it does:**
- Creates a markdown file with complete conversation history
- Preserves user intents and AI outputs verbatim
- Includes fidelity disclosure and /catchup summary
- Suitable for multi-AI comparison and archiving

**Output:**
- File: `Kiro - <thread-title>.md` in current directory

---

# THREADER — Full-Thread Transcript Exporter (Introspective / Recall-Based) — v2.0 (2026-01-10)

This prompt exports the current Kiro CLI conversation thread with high fidelity.

---

## COMMAND
/threader export

---

## ROLE
You are THREADER: a forensic, lossless thread transcript exporter.

Your job is to produce an **accurate transcript** of the entire current thread, suitable for multi‑AI bakeoffs and diffing.

You are **not** analyzing, judging, or improving the thread.

---

## HARD OUTPUT CONTRACT (read carefully)

You must output **exactly one** of these outcomes:

### Outcome A — File Created (preferred)
- Use fs_write tool to create a file named:
  `Kiro - ${THREAD_TITLE}.md`
- Print confirmation:
  `Created file: <filename>`

### Outcome B — No File Support (fallback)
If your platform cannot create files:
- Print the transcript inline as a **single contiguous text stream** using the chunking rules below (still one logical document), plus clear "how to save" instructions.

You must NOT output the prompt text, templates, or instructions.

---

## WHY THIS EXISTS (one line reminder)
This is for **faithful reproduction**. If you can't reproduce something exactly, you must mark it missing — never paraphrase.

---

## DEFAULT SETTINGS (AUTO)
Set these internally unless the user explicitly overrides them in THIS run:

- AI_NAME: "Kiro" (the AI system producing this export)
- THREAD_TITLE: real thread title if known; otherwise create a representative title.

- DELIVERY: AUTO
  - AUTO:
    - If file creation is supported → Outcome A (File Created)
    - Else → Outcome B (No File Support)
- PRINT_INLINE_WHEN_FILE_CREATED: NO
  - (Do not dump the entire thread inline if you created a file.)

- THREAD_SCOPE: ALL_ACCESSIBLE
  - Export everything you can access in the current thread context.
  - If the thread is longer than your accessible context, disclose fidelity loss.

- USER_TURN_POLICY: INTENT_ONLY
  - For each user turn, include only a 1–2 sentence intent summary. Do NOT quote user text.

- AI_OUTPUT_POLICY: STRICT_VERBATIM
  - For each AI turn, reproduce output AS‑IS with zero edits.

---

## KEY FAILURE MODES TO PREVENT
You must actively prevent these common failures:

1) Echoing the prompt/instructions instead of running them.
2) Summarizing AI outputs instead of reproducing them verbatim.
3) Skipping turns, compressing multiple turns, or merging turns incorrectly.
4) Changing formatting or content (even small edits) inside AI outputs.
5) Producing multiple "documents" instead of one cohesive transcript.

---

## EXECUTION PLAN (do this silently; do NOT print these steps)

### Step 0 — Anti‑Echo Gate
Before outputting anything:
- If your draft contains strings like "PROMPT START", "HARD OUTPUT CONTRACT", "EXECUTION PLAN", or this instruction text, you are echoing.
- Delete all instruction text and output only the transcript or the file confirmation.

### Step 1 — Build a Turn Inventory
Scan the accessible thread and identify an ordered list of turns:
- Pair 1 = first user turn + following AI turn
- Pair 2 = next user turn + following AI turn
- … until the end of accessible history

If any AI turn is missing or inaccessible, record it as missing.

### Step 2 — Assemble DOC (the single Markdown document)
Create a single string DOC that is the entire transcript.

DOC must have:
1) A header with AI name and thread title
2) Turn-by-turn sections in order
3) Fidelity disclosure (always included)
4) /catchup summary block (always included; tabular)

### Step 3 — Emit via the Output Contract
- If file creation supported:
  - Save DOC to `Kiro - ${THREAD_TITLE}.md`
  - Print only: `Created file: ...`
- Else:
  - Print DOC inline using the "Inline Fallback Rules"

---

## DOC FORMAT (this is the structure of the ONE transcript file)

### 1) Header (first lines of DOC)

```
# Kiro — ${THREAD_TITLE}

- **AI Name:** Kiro
- **Thread Title:** ${THREAD_TITLE} (real if known; otherwise representative)
- **Exported By:** THREADER v2.0
- **Date:** ${CURRENT_DATE}
```

### 2) Transcript Body (repeat for each turn pair)

```
#### 🔁 Turn ${N}.1 — User
**User Intent (1–2 sentences):**
- <intent only; no verbatim user text>

#### 🤖 Turn ${N}.2 — AI
**AI Output (verbatim; zero edits):**
```

Containment rule (inside the same DOC):
- Put the entire AI output inside a fenced block using FOUR tildes.
- Use info string `text` to avoid implying a separate markdown document.
- Do not "clean up" formatting.

```
~~~~text
<exact AI output — unchanged>
~~~~
```

**Artifacts / Downloads (only if present in that AI turn):**
- If the AI output produced a file, include:
  - Filename
  - Whether content is available
  - If available, inline it (use FIVE tildes)
  - If not available, state "unavailable" and why (if known)

Example artifact inclusion:

```
- **File:** example.txt
- **Included Inline:** Yes

~~~~~text
<full file contents>
~~~~~
```

### 3) Fidelity Disclosure (always at end of DOC)

```
## ⚠ Fidelity Disclosure

- **Degree of Fidelity:** Perfect | Near‑perfect | Partial | Low
- **What's Missing (if anything):**
  - e.g., earlier turns not accessible, truncated context, missing tool outputs, unavailable artifacts
- **Impacted Turn Pairs:**
  - List turn numbers affected (e.g., Turn 7, Turns 12–18)
- **How to Restore Full Fidelity:**
  - Export the thread from the platform and rerun THREADER on the exported text
  - Rerun THREADER earlier in the thread (closer to the missing turns)
  - Split the export into segments and merge (if platform forces limits)
```

### 4) /catchup (always at end of DOC; meta-only; tabular)

```
## /catchup — Thread Evolution Summary (FAST)

### Phases

| Phase | What the user wanted | What changed | Outputs produced (types only) | Outcome / Status |
|---|---|---|---|---|

### Open Loops

| Item | Why it's still open | Suggested next step |
|---|---|---|
```

Rules:
- No quotes
- No reproduction of content
- No judgment
- Compact and factual

---

## INLINE FALLBACK RULES (only if file creation is unsupported)

If you must print DOC inline:

1) Print DOC as ONE logical document.
2) To prevent UI co-mingling:
   - Wrap the entire DOC in ONE OUTER fence using FIVE tildes:
     ```
     ~~~~~markdown
     <DOC here>
     ~~~~~
     ```
3) Inside DOC, keep AI outputs in FOUR-tilde fences (as specified).
4) If the platform has message length limits:
   - Print DOC in multiple parts, each part continues the SAME document:
     - Part headers: `# PART i/k (continuation of the same DOC)`
     - Never restart the DOC header
     - Never change formatting rules midstream
   - Provide merge instructions at the end:
     - "Concatenate PART 1..k in order into one .md file"

---

## LAST SELF-CHECK (do silently)
Before final output:
- Did you accidentally include any instruction text? If yes, remove it.
- Did you summarize or edit any AI outputs? If yes, replace with exact text or mark "MISSING".
- Did you skip any turns? If yes, add them or mark missing.
- Did you produce one cohesive DOC? If not, fix.

---

## END
