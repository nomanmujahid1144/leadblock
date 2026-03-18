'use client';

import React, { useState, useRef } from 'react';
import DropdownWrapper from './DropdownWrapper';
import { SortIcon, TickCorrectIcon } from '@/components/Icons';

interface SortOption {
    id: string;
    label: string;
}

const SORT_OPTIONS: SortOption[] = [
    { id: 'name', label: 'Name' },
    { id: 'company', label: 'Company' },
    { id: 'status', label: 'Status' },
    { id: 'date', label: 'Date' },
    { id: 'sentiment', label: 'Sentiment' },
];

interface SortByDropdownProps {
    selectedSort: string;
    onSortChange: (sortId: string) => void;
}

const SortByDropdown: React.FC<SortByDropdownProps> = ({ selectedSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleSelect = (sortId: string) => {
        onSortChange(sortId);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-breadcrumb border border-stroke rounded-lg hover:bg-neutral-50 hover:border-stroke/85 transition-all"
            >
                <span>Sort</span>
                <SortIcon size={12} />
            </button>

            {/* Dropdown */}
            <DropdownWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef}>
                <div className="w-48 py-2">
                    {/* Header */}
                    <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">SORT BY</p>
                    </div>

                    {/* Options */}
                    <div className="py-1">
                        {SORT_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-text-heading hover:bg-neutral-50 transition-colors"
                            >
                                <span>{option.label}</span>
                                
                                {/* Checkmark + Down Arrow */}
                                <div className="flex items-center gap-2">
                                    {selectedSort === option.id && (
                                        <TickCorrectIcon size={14} />
                                    )}
                                    
                                    {/* {selectedSort === option.id && (
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-400">
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )} */}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </DropdownWrapper>
        </div>
    );
};

export default SortByDropdown;