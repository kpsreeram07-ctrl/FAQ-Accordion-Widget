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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 pb-4 border-b border-slate-800/80 text-xs text-slate-400">
      {/* Counter */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-300">
          Showing <span className="font-mono tabular-nums font-semibold text-white">{visibleCount}</span> of{' '}
          <span className="font-mono tabular-nums text-white">{totalCount}</span> questions
        </span>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors ml-2 cursor-pointer"
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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer ${
            isMultiExpand
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
              : 'bg-slate-800/50 backdrop-blur-md border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-600'
          }`}
          title="Toggle whether multiple questions can remain expanded simultaneously"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{isMultiExpand ? 'Multi-Expand: ON' : 'Single Item Mode'}</span>
        </button>

        {/* Expand All */}
        <button
          onClick={onExpandAll}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-600 transition-colors cursor-pointer"
          title="Expand all visible questions"
        >
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Expand All</span>
        </button>

        {/* Collapse All */}
        <button
          onClick={onCollapseAll}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-600 transition-colors cursor-pointer"
          title="Collapse all questions"
        >
          <ChevronsDownUp className="w-3.5 h-3.5 text-slate-400" />
          <span>Collapse All</span>
        </button>
      </div>
    </div>
  );
};
