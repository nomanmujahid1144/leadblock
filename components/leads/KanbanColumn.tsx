'use client';

import React, { useState } from 'react';
import LeadCard from './LeadCard';
import { DoubleArrowIcon, ViewMoreIcon } from '../Icons';

interface KanbanColumnProps {
    title: string;
    count: number;
    color?: string;
    cards?: any[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, count, color = 'bg-neutral-100', cards = [] }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="w-80 shrink-0 p-2">
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
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="cursor-pointer"
                        aria-label={isCollapsed ? 'Expand column' : 'Collapse column'}
                    >
                        <DoubleArrowIcon size={22} />
                    </button>

                    {/* Menu Button */}
                    <button className="cursor-pointer">
                        <ViewMoreIcon size={22} />
                    </button>
                </div>
            </div>

            {/* Column Content */}
            {!isCollapsed && (
                // max-h-[calc(100vh-300px)]
                <div className="space-y-3  overflow-y-auto">
                    {cards.length > 0 ? (
                        cards.map((card, index) => (
                            <LeadCard key={card.id} {...card} index={index} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3 text-neutral-200">
                                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                <path d="M16 20H32M16 28H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <p className="text-sm text-neutral-400 font-medium">No leads</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default KanbanColumn;