'use client';

import React from 'react';
import { ArrowDownIcon, GridViewIcon, ListViewIcon, SearchIcon } from '../Icons';
import SortByDropdown from './dropdowns/SortByDropdown';
import FilterDropdown from './dropdowns/FilterDropdown';

interface FilterState {
    lastMessageFrom: string;
    lastMessageTo: string;
    internalTaskFrom: string;
    internalTaskTo: string;
    company: string;
    role: string;
    leadPhases: string[];
    sentiments: string[];
}

interface LeadsTopBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedSort: string;
    onSortChange: (sort: string) => void;
    viewMode?: 'grid' | 'list';
    onViewModeChange?: (mode: 'grid' | 'list') => void;
    onFilterChange: (filters: FilterState) => void;
}

const LeadsTopBar: React.FC<LeadsTopBarProps> = ({
    searchQuery,
    onSearchChange,
    selectedSort,
    onSortChange,
    viewMode = 'grid',
    onViewModeChange,
    onFilterChange
}) => {
    return (
        <>
            {/* Mobile Layout */}
            <div className="md:hidden mb-6">
                {/* Filter Buttons Row - Full Width */}
                <div className="grid grid-cols-4 gap-2 mb-2">
                    {/* Leads Button */}
                    <button className="text-sm text-text-breadcrumb">
                        Leads
                    </button>

                    {/* Sort Dropdown */}
                    <div className="w-full">
                        <SortByDropdown
                            selectedSort={selectedSort}
                            onSortChange={onSortChange}
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="w-full">
                        <FilterDropdown onFilterApply={onFilterChange} />
                    </div>

                    {/* Status Dropdown */}
                    <button className="flex items-center justify-center gap-1 px-2 py-2 text-sm text-text-breadcrumb border border-stroke rounded-lg bg-white whitespace-nowrap">
                        <span>Status</span>
                        <ArrowDownIcon size={12} />
                    </button>
                </div>

                {/* Search Input + View Toggle */}
                <div className="grid grid-cols-12 gap-2 mb-4">
                    {/* Search Input - 10 columns */}
                    <div className="relative col-span-10">
                        <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search by company name, lead name or URL"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm text-text-heading border border-stroke rounded-lg pl-10 pr-4 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-button/20"
                        />
                    </div>

                    {/* View Toggle - 2 columns */}
                    {onViewModeChange && (
                        <div className="col-span-2 flex items-center justify-center">
                            <div className="flex items-center border border-stroke rounded-lg h-full">
                                {/* List View Button */}
                                <button
                                    onClick={() => onViewModeChange('list')}
                                    className={`flex items-center justify-center h-full px-1.5 rounded-l-lg transition-colors ${
                                        viewMode === 'list'
                                            ? 'bg-stroke'
                                            : 'hover:bg-neutral-50'
                                    }`}
                                >
                                    <ListViewIcon size={18} className={viewMode === 'list' ? 'text-black' : 'text-text-heading'} />
                                </button>

                                {/* Grid View Button */}
                                <button
                                    onClick={() => onViewModeChange('grid')}
                                    className={`flex items-center justify-center h-full px-1.5 rounded-r-lg transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-stroke'
                                            : 'hover:bg-neutral-50'
                                    }`}
                                >
                                    <GridViewIcon size={18} className={viewMode === 'grid' ? 'text-black' : 'text-text-heading'} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-center md:justify-between gap-4 mb-6 animate-fade-in">
                {/* Left: Title + Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-sm text-text-breadcrumb">Leads</h1>

                    {/* Sort Dropdown */}
                    <SortByDropdown
                        selectedSort={selectedSort}
                        onSortChange={onSortChange}
                    />

                    {/* Filter Dropdown */}
                    <FilterDropdown onFilterApply={onFilterChange} />

                    {/* Status Dropdown */}
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-text-breadcrumb border border-stroke rounded-lg hover:bg-neutral-50 hover:border-stroke/85 transition-all">
                        <span>Status</span>
                        <ArrowDownIcon size={12} />
                    </button>

                    {/* Search Input */}
                    <div className="w-96">
                        <div className="relative">
                            <SearchIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search by company name, lead name or URL"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full px-3 py-2 text-sm text-text-heading border border-stroke rounded-lg pl-10 pr-4 placeholder:text-neutral-400 hover:bg-neutral-50 hover:border-stroke/85 transition-all focus:outline-none focus:ring-2 focus:ring-primary-button/20"
                            />
                        </div>
                    </div>
                </div>

                {/* View Toggle */}
                {onViewModeChange && (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stroke rounded-lg">
                            {/* List View Button */}
                            <button
                                onClick={() => onViewModeChange('list')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'list'
                                        ? 'bg-stroke text-primary'
                                        : 'hover:bg-neutral-50 text-text-heading hover:text-neutral-600'
                                }`}
                            >
                                <ListViewIcon size={22} className={viewMode === 'list' ? 'text-black' : ''} />
                            </button>

                            {/* Grid View Button */}
                            <button
                                onClick={() => onViewModeChange('grid')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'grid'
                                        ? 'bg-stroke text-primary'
                                        : 'hover:bg-neutral-50 text-text-heading hover:text-neutral-600'
                                }`}
                            >
                                <GridViewIcon size={22} className={viewMode === 'grid' ? 'text-black' : ''} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeadsTopBar;