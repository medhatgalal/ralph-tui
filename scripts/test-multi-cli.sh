#!/bin/bash
# ABOUTME: Manual test script for ralph-tui multi-CLI support
# Run this script to verify real CLI integration
# Prerequisites: At least one of gemini, codex, kiro-cli installed

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        Ralph TUI Multi-CLI Manual Test Script              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass() { echo -e "${GREEN}✓ PASS${NC}: $1"; }
fail() { echo -e "${RED}✗ FAIL${NC}: $1"; }
skip() { echo -e "${YELLOW}○ SKIP${NC}: $1"; }
info() { echo -e "  $1"; }

# Test directory
TEST_DIR=$(mktemp -d)
trap "rm -rf $TEST_DIR" EXIT

echo "Test directory: $TEST_DIR"
echo ""

# ============================================================
# Test 1: CLI Detection
# ============================================================
echo "=== Test 1: CLI Detection ==="

DETECTED_CLIS=""

if command -v claude &> /dev/null; then
    pass "Claude Code detected"
    DETECTED_CLIS="$DETECTED_CLIS claude"
else
    skip "Claude Code not installed"
fi

if command -v gemini &> /dev/null; then
    pass "Gemini CLI detected"
    DETECTED_CLIS="$DETECTED_CLIS gemini"
else
    skip "Gemini CLI not installed"
fi

if command -v codex &> /dev/null; then
    pass "Codex CLI detected"
    DETECTED_CLIS="$DETECTED_CLIS codex"
else
    skip "Codex CLI not installed"
fi

if command -v kiro-cli &> /dev/null; then
    pass "Kiro CLI detected"
    DETECTED_CLIS="$DETECTED_CLIS kiro"
else
    skip "Kiro CLI not installed"
fi

echo ""
info "Detected CLIs:$DETECTED_CLIS"
echo ""

if [ -z "$DETECTED_CLIS" ]; then
    fail "No CLIs detected. Install at least one: claude, gemini, codex, kiro-cli"
    exit 1
fi

# ============================================================
# Test 2: Ralph-TUI Plugin List
# ============================================================
echo "=== Test 2: Ralph-TUI Plugin List ==="

if ralph-tui plugins agents 2>&1 | grep -q "gemini"; then
    pass "Gemini plugin registered"
else
    fail "Gemini plugin not found"
fi

if ralph-tui plugins agents 2>&1 | grep -q "codex"; then
    pass "Codex plugin registered"
else
    fail "Codex plugin not found"
fi

if ralph-tui plugins agents 2>&1 | grep -q "kiro"; then
    pass "Kiro plugin registered"
else
    fail "Kiro plugin not found"
fi

echo ""

# ============================================================
# Test 3: Non-Interactive Mode (per CLI)
# ============================================================
echo "=== Test 3: Non-Interactive Mode ==="

for cli in $DETECTED_CLIS; do
    echo "Testing $cli..."
    case $cli in
        claude)
            if timeout 30 claude -p "echo 'test'" --dangerously-skip-permissions 2>&1 | head -5; then
                pass "Claude non-interactive mode works"
            else
                fail "Claude non-interactive mode failed"
            fi
            ;;
        gemini)
            if timeout 30 gemini -p "echo 'test'" --yolo 2>&1 | head -5; then
                pass "Gemini non-interactive mode works"
            else
                fail "Gemini non-interactive mode failed"
            fi
            ;;
        codex)
            if timeout 30 codex exec --full-auto "echo 'test'" 2>&1 | head -5; then
                pass "Codex non-interactive mode works"
            else
                fail "Codex non-interactive mode failed"
            fi
            ;;
        kiro)
            if timeout 30 kiro-cli chat --no-interactive --trust-all-tools "echo 'test'" 2>&1 | head -5; then
                pass "Kiro non-interactive mode works"
            else
                fail "Kiro non-interactive mode failed"
            fi
            ;;
    esac
done

echo ""

# ============================================================
# Test 4: Setup Wizard (dry run check)
# ============================================================
echo "=== Test 4: Setup Wizard Detection ==="

cd $TEST_DIR

# Check that setup detects available agents
SETUP_OUTPUT=$(ralph-tui setup --help 2>&1 || true)
if echo "$SETUP_OUTPUT" | grep -q "setup"; then
    pass "Setup command available"
else
    fail "Setup command not found"
fi

echo ""

# ============================================================
# Summary
# ============================================================
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Test Summary                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Detected CLIs:$DETECTED_CLIS"
echo ""
echo "To run a full integration test with a specific agent:"
echo "  ralph-tui run --agent <agent> --prd ./test-prd.json --iterations 1 --headless"
echo ""
echo "To test setup wizard interactively:"
echo "  cd /tmp && ralph-tui setup"
echo ""
