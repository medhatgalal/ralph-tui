/**
 * ABOUTME: Conflict resolution overlay for parallel execution merge conflicts.
 * Displays conflicting files with AI resolution status and provides keyboard
 * controls for retry, skip, or abort when resolution fails.
 * Follows the same overlay pattern as HelpOverlay.
 */

import type { ReactNode } from 'react';
import { memo } from 'react';
import { createTextAttributes } from '@opentui/core';
import { colors, statusIndicators } from '../theme.js';
import type { FileConflict, ConflictResolutionResult } from '../../parallel/types.js';

const boldAttr = createTextAttributes({ bold: true });

export interface ConflictResolutionPanelProps {
  /** Whether the overlay is visible */
  visible: boolean;
  /** List of file conflicts in the current merge */
  conflicts: FileConflict[];
  /** Resolution results for files that have been resolved */
  resolutions: ConflictResolutionResult[];
  /** Task ID whose merge is conflicting */
  taskId: string;
  /** Task title for display */
  taskTitle: string;
  /** Whether AI resolution is currently running */
  aiResolving: boolean;
  /** Index of the file currently selected */
  selectedIndex: number;
  /** Callback when user requests retry (r key) */
  onRetry?: () => void;
  /** Callback when user requests skip (s key) */
  onSkip?: () => void;
}

/**
 * Resolution state for determining which controls to show.
 */
type ResolutionState = 'in-progress' | 'all-resolved' | 'has-failures' | 'waiting';

/**
 * Determine the overall resolution state.
 */
function getResolutionState(
  conflicts: FileConflict[],
  resolutions: ConflictResolutionResult[],
  aiResolving: boolean,
): ResolutionState {
  if (aiResolving) {
    return 'in-progress';
  }

  if (resolutions.length === 0) {
    return 'waiting';
  }

  const hasFailures = resolutions.some((r) => !r.success);
  if (hasFailures) {
    return 'has-failures';
  }

  const allResolved = conflicts.every((c) =>
    resolutions.some((r) => r.filePath === c.filePath && r.success)
  );
  if (allResolved) {
    return 'all-resolved';
  }

  return 'waiting';
}

/**
 * Get resolution status for a specific file.
 */
function getFileStatus(
  filePath: string,
  resolutions: ConflictResolutionResult[],
  aiResolving: boolean,
): { indicator: string; color: string; label: string } {
  const resolution = resolutions.find((r) => r.filePath === filePath);
  if (resolution) {
    if (resolution.success) {
      return {
        indicator: statusIndicators.merged,
        color: colors.status.success,
        label: `Resolved (${resolution.method})`,
      };
    }
    return {
      indicator: statusIndicators.error,
      color: colors.status.error,
      label: resolution.error ?? 'Resolution failed',
    };
  }
  if (aiResolving) {
    return {
      indicator: statusIndicators.merging,
      color: colors.status.info,
      label: 'AI resolving...',
    };
  }
  return {
    indicator: statusIndicators.conflicted,
    color: colors.status.warning,
    label: 'Unresolved',
  };
}

/**
 * Conflict resolution panel overlay.
 */
export const ConflictResolutionPanel = memo(function ConflictResolutionPanel({
  visible,
  conflicts,
  resolutions,
  taskId,
  taskTitle,
  aiResolving,
  selectedIndex,
  onRetry,
  onSkip,
}: ConflictResolutionPanelProps): ReactNode {
  if (!visible) {
    return null;
  }

  const resolvedCount = resolutions.filter((r) => r.success).length;
  const failedCount = resolutions.filter((r) => !r.success).length;
  const state = getResolutionState(conflicts, resolutions, aiResolving);

  return (
    <box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000B3',
      }}
    >
      <box
        style={{
          flexDirection: 'column',
          padding: 2,
          backgroundColor: colors.bg.secondary,
          borderColor: state === 'has-failures' ? colors.status.error : colors.status.warning,
          minWidth: 60,
          maxWidth: 80,
        }}
        border
      >
        {/* Header */}
        <box style={{ marginBottom: 1, justifyContent: 'center' }}>
          <text>
            {state === 'has-failures' ? (
              <span fg={colors.status.error} attributes={boldAttr}>
                {statusIndicators.error} Conflict Resolution Failed
              </span>
            ) : (
              <span fg={colors.status.warning} attributes={boldAttr}>
                {statusIndicators.conflicted} Merge Conflict Resolution
              </span>
            )}
          </text>
        </box>

        {/* Task info */}
        <text>
          <span fg={colors.fg.muted}>Task: </span>
          <span fg={colors.fg.secondary}>{taskId}</span>
          <span fg={colors.fg.dim}> — </span>
          <span fg={colors.fg.primary}>{taskTitle}</span>
        </text>

        {/* Summary */}
        <text>
          <span fg={colors.fg.muted}>Files: </span>
          <span fg={colors.fg.primary}>{conflicts.length} conflicted</span>
          {resolvedCount > 0 && <span fg={colors.status.success}>, {resolvedCount} resolved</span>}
          {failedCount > 0 && <span fg={colors.status.error}>, {failedCount} failed</span>}
        </text>

        {/* State-specific status message */}
        {state === 'in-progress' && (
          <text fg={colors.status.info}>
            {statusIndicators.merging} AI conflict resolution in progress...
          </text>
        )}
        {state === 'has-failures' && (
          <box style={{ marginTop: 1, marginBottom: 1 }}>
            <text fg={colors.status.error}>
              AI was unable to resolve all conflicts. Choose an action:
            </text>
          </box>
        )}

        {/* Separator */}
        <text fg={colors.border.muted}>{'─'.repeat(56)}</text>

        {/* Conflicted files list */}
        {conflicts.map((conflict, i) => {
          const { indicator, color, label } = getFileStatus(conflict.filePath, resolutions, aiResolving);
          const isSelected = i === selectedIndex;
          const prefix = isSelected ? '▸ ' : '  ';

          return (
            <box key={conflict.filePath} style={{ flexDirection: 'column' }}>
              <text>
                <span fg={isSelected ? colors.fg.primary : colors.fg.dim}>{prefix}</span>
                <span fg={color}>{indicator} </span>
                <span fg={isSelected ? colors.fg.primary : colors.fg.secondary}>{conflict.filePath}</span>
              </text>
              <text>
                <span fg={colors.fg.dim}>    </span>
                <span fg={color}>{label}</span>
              </text>
            </box>
          );
        })}

        {/* Footer with keyboard shortcuts - varies by state */}
        <box style={{ marginTop: 1 }}>
          <text fg={colors.border.muted}>{'─'.repeat(56)}</text>
        </box>

        {state === 'has-failures' ? (
          <>
            {/* Failure state - show retry/skip/abort options */}
            <text>
              <span fg={colors.accent.tertiary}>r</span>
              <span fg={colors.fg.muted}> Retry AI  </span>
              <span fg={colors.accent.tertiary}>s</span>
              <span fg={colors.fg.muted}> Skip Task  </span>
              <span fg={colors.accent.tertiary}>Esc</span>
              <span fg={colors.fg.muted}> Abort Session</span>
            </text>
            <text fg={colors.fg.dim}>
              Retry: re-attempt AI resolution. Skip: abandon this task's merge.
            </text>
            {!onRetry && !onSkip && (
              <text fg={colors.fg.dim}>
                Manual resolution: git merge {`<worktree-branch>`} in project dir
              </text>
            )}
          </>
        ) : (
          <>
            {/* Normal state - navigation only */}
            <text>
              <span fg={colors.accent.tertiary}>j/↓</span>
              <span fg={colors.fg.muted}> Down  </span>
              <span fg={colors.accent.tertiary}>k/↑</span>
              <span fg={colors.fg.muted}> Up  </span>
              <span fg={colors.accent.tertiary}>Esc</span>
              <span fg={colors.fg.muted}> Close Panel</span>
            </text>
            <text fg={colors.fg.dim}>
              AI resolution runs automatically. Merge completes when all files resolve.
            </text>
          </>
        )}
      </box>
    </box>
  );
});
