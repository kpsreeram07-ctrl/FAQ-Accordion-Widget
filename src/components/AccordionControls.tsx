import React from 'react';
import { ChevronsDownUp, ChevronsUpDown, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface AccordionControlsProps {
  visibleCount: number;
  totalCount: number;
  isMultiExpand: boolean;
  onToggleMultiExpand: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const AccordionControls: React.FC<AccordionControlsProps> = ({
  visibleCount,
  totalCount,
  isMultiExpand,
  onToggleMultiExpand,
  onExpandAll,
  onCollapseAll,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 pb-4 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
      {/* Counter */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-neutral-900 dark:text-neutral-200">
          Showing <span className="font-mono tabular-nums font-semibold">{visibleCount}</span> of{' '}
          <span className="font-mono tabular-nums">{totalCount}</span> questions
        </span>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline transition-colors ml-2"
            title="Reset filters and search"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Multi-expand mode toggle */}
        <button
          onClick={onToggleMultiExpand}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
            isMultiExpand
              ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
              : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'
          }`}
          title="Toggle whether multiple questions can remain expanded simultaneously"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{isMultiExpand ? 'Multi-Expand: ON' : 'Single Item Mode'}</span>
        </button>

        {/* Expand All */}
        <button
          onClick={onExpandAll}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          title="Expand all visible questions"
        >
          <ChevronsUpDown className="w-3.5 h-3.5 text-neutral-500" />
          <span>Expand All</span>
        </button>

        {/* Collapse All */}
        <button
          onClick={onCollapseAll}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          title="Collapse all questions"
        >
          <ChevronsDownUp className="w-3.5 h-3.5 text-neutral-500" />
          <span>Collapse All</span>
        </button>
      </div>
    </div>
  );
};
