'use client';

import React from 'react';
import { ArrowDownIcon, GridViewIcon, ListViewIcon, SearchIcon } from '../Icons';
import SortByDropdown from './dropdowns/SortByDropdown';
import FilterDropdown from './dropdowns/FilterDropdown';

interface LeadsTopBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedSort: string;
    onSortChange: (sort: string) => void;
    viewMode?: 'grid' | 'list';
    onViewModeChange?: (mode: 'grid' | 'list') => void;
}

const LeadsTopBar: React.FC<LeadsTopBarProps> = ({
    searchQuery,
    onSearchChange,
    selectedSort,
    onSortChange,
    viewMode = 'grid',
    onViewModeChange
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 animate-fade-in">
            {/* Left: Title + Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-lg md:text-sm text-text-breadcrumb">Leads</h1>

                {/* Sort Dropdown */}
                <SortByDropdown 
                    selectedSort={selectedSort} 
                    onSortChange={onSortChange} 
                />

                {/* Filter Dropdown */}
                <FilterDropdown />

                {/* Status Dropdown */}
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-text-breadcrumb border border-stroke rounded-lg hover:bg-neutral-50 hover:border-stroke/85 transition-all">
                    <span>Status</span>
                    <ArrowDownIcon size={12} />
                </button>

                {/* Search Input */}
                <div className="flex-1 md:flex-none md:w-96">
                    <div className="relative">
                        <SearchIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by company name, lead name or URL"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-text-breadcrumb border border-stroke rounded-lg hover:bg-neutral-50 hover:border-stroke/85 transition-all w-full pl-10 pr-4 placeholder:text-neutral-400"
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
    );
};

export default LeadsTopBar;