'use client';

import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import LeadCard from './LeadCard';
import { DoubleArrowIcon, ViewMoreIcon } from '../Icons';

interface KanbanColumnProps {
    id: string;
    title: string;
    count: number;
    color?: string;
    cards?: any[];
    isVertical?: boolean;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
    id,
    title,
    count,
    color = 'bg-neutral-100',
    cards = [],
    isVertical = false
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Make this column a drop zone
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    // Helper function to truncate title for vertical display
    const getTruncatedTitle = (text: string, maxLength: number = 20) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Vertical column layout (In Progress, Meeting Planned, Archived)
    if (isVertical) {
        // Collapsed vertical state
        if (isCollapsed) {
            return (
                <div className="w-16 shrink-0 flex flex-col items-center justify-between bg-card-bg h-64 transition-all duration-500 ease-in-out">
                    {/* Top: Count Badge + Vertical Text */}
                    <div className="flex flex-col items-center gap-3 pt-4">
                        <span className={`px-2 py-1 ${color} text-neutral-700 text-xs font-semibold rounded-full`}>
                            {count}
                        </span>
                        <h3
                            className="text-sm font-medium text-text-heading whitespace-nowrap"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'mixed'
                            }}
                            title={title}
                        >
                            {getTruncatedTitle(title, 15)}
                        </h3>
                    </div>

                    {/* Bottom: Expand Icon */}
                    <div className="pb-4">
                        <button
                            onClick={() => setIsCollapsed(false)}
                            className="cursor-pointer rotate-90 hover:scale-110 transition-transform"
                            aria-label="Expand column"
                        >
                            <DoubleArrowIcon size={22} isCollapsed={false} />
                        </button>
                    </div>
                </div>
            );
        }

        // Expanded vertical state
        return (
            <div className="w-80 shrink-0 p-2 transition-all duration-700 ease-out animate-slide-in-right">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 ${color} text-neutral-700 text-xs font-semibold rounded-full`}>
                            {count}
                        </span>
                        <h3 className="text-md font-medium text-text-heading">{title}</h3>
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Collapse Button */}
                        <button
                            onClick={() => setIsCollapsed(true)}
                            className="cursor-pointer hover:bg-neutral-100 p-1 rounded-lg transition-all"
                            aria-label="Collapse column"
                        >
                            <DoubleArrowIcon size={22} isCollapsed={false} />
                        </button>

                        {/* Menu Button */}
                        <button className="cursor-pointer hover:bg-neutral-100 p-1 rounded-lg transition-all">
                            <ViewMoreIcon size={22} />
                        </button>
                    </div>
                </div>

                {/* Column Content - DROPPABLE */}
                <div
                    ref={setNodeRef}
                    className={`space-y-3 overflow-y-auto min-h-[300px] animate-fade-in transition-colors rounded-lg p-2 ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
                        }`}
                    style={{ animationDuration: '500ms', animationDelay: '200ms' }}
                >
                    {cards.length > 0 ? (
                        cards.map((card, index) => (
                            <LeadCard key={card.id} {...card} index={index} />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-card-bg rounded-lg border-none">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3 text-neutral-200">
                                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                <path d="M16 20H32M16 28H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <p className="text-sm text-neutral-400 font-medium">No leads</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Horizontal column - COLLAPSED STATE
    if (isCollapsed) {
        return (
            <div className="w-16 shrink-0 flex flex-col items-center justify-between bg-card-bg h-64 transition-all duration-500 ease-in-out overflow-hidden">
                {/* Top: Count Badge + Vertical Text */}
                <div className="flex flex-col items-center gap-3 pt-4 animate-fade-in">
                    <span className={`px-2 py-1 ${color} text-neutral-700 text-xs font-semibold rounded-full`}>
                        {count}
                    </span>
                    <h3
                        className="text-sm font-medium text-text-heading whitespace-nowrap"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed'
                        }}
                        title={title}
                    >
                        {getTruncatedTitle(title, 15)}
                    </h3>
                </div>

                {/* Bottom: Expand Icon */}
                <div className="pb-4">
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="cursor-pointer rotate-90 hover:scale-110 transition-transform"
                        aria-label="Expand column"
                    >
                        <DoubleArrowIcon size={22} isCollapsed={false} />
                    </button>
                </div>
            </div>
        );
    }

    // Horizontal column - EXPANDED STATE
    return (
        <div className="w-80 shrink-0 p-1 transition-all duration-700 ease-out animate-slide-in-right">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 ${color} text-neutral-700 text-xs font-semibold rounded-full`}>
                        {count}
                    </span>
                    <h3 className="text-md font-medium text-text-heading">{title}</h3>
                </div>

                <div className="flex items-center gap-1">
                    {/* Collapse Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsCollapsed(true);
                        }}
                        className="cursor-pointer hover:bg-neutral-100 p-1 rounded-lg transition-all"
                        aria-label="Collapse column"
                    >
                        <DoubleArrowIcon size={22} isCollapsed={false} />
                    </button>

                    {/* Menu Button */}
                    <button
                        className="cursor-pointer hover:bg-neutral-100 p-1 rounded-lg transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ViewMoreIcon size={22} />
                    </button>
                </div>
            </div>

            {/* Column Content - DROPPABLE with staggered fade in */}
            <div
                ref={setNodeRef}
                className={`space-y-3 overflow-y-auto min-h-[300px] animate-fade-in transition-colors rounded-lg p-2 ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
                    }`}
                style={{ animationDuration: '500ms', animationDelay: '200ms' }}
            >
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <LeadCard key={card.id} {...card} index={index} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-card-bg">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3 text-neutral-200">
                            <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                            <path d="M16 20H32M16 28H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <p className="text-sm text-neutral-400 font-medium">No leads</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;