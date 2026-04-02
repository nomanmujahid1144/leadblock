'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardCounterIcon, LinkedinIcon, PencilEditIcon, SidebarLeftIcon, TimeLineListIcon } from '../Icons';
import Image from 'next/image';
import MoveToDropdown from './MoveToDropdown';

interface LeadCardProps {
    id: string;
    name: string;
    title: string;
    company: string;
    chatterDate?: string;
    internalDate?: string;
    sentiment: string;
    avatars?: string[];
    index?: number;
    currentColumnId?: string;
    allColumns?: { id: string; title: string }[];
    onMove?: (cardId: string, targetColumnId: string) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({
    id,
    name,
    title,
    company,
    chatterDate,
    internalDate,
    sentiment,
    avatars = [],
    index = 0,
    currentColumnId,
    allColumns = [],
    onMove
}) => {
    // Make this card sortable
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        animationDelay: `${index * 50}ms`,
    };

    const handleMove = (targetColumnId: string) => {
        if (onMove) {
            onMove(id, targetColumnId);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-card-bg rounded-lg border-none transition-all duration-200 hover:shadow-md animate-fade-in touch-none select-none"
        >
            {/* Header: Name + LinkedIn */}
            <div className='px-5 pt-6'>
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h4 className="flex items-center text-sm font-semibold text-icon-linkedin gap-1 transition-colors">
                            {name}
                            <LinkedinIcon size={12} />
                        </h4>
                        <div className='mt-1.5 text-xs text-text w-3/4'>
                            <p>{title} at <span className="font-medium">{company}</span></p>
                        </div>
                    </div>
                </div>
                {/* Dates */}
                {(chatterDate || internalDate) && (
                    <div className="space-y-1 text-xs text-text pt-3.5 py-2.5">
                        {chatterDate && (
                            <p>
                                Chatter task date: <span>{chatterDate}</span>
                            </p>
                        )}
                        {internalDate && (
                            <p>
                                Internal task date: <span>{internalDate}</span>
                            </p>
                        )}
                    </div>
                )}

                {/* Sentiment Badge */}
                <div className='pb-10'>
                    <span className="px-2 py-0.5 bg-info-bg text-info-text text-xs font-medium rounded-full">
                        Chat sentiment: {sentiment}
                    </span>
                </div>
            </div>

            {/* Footer: Avatars + Action Icons */}
            <div className="flex items-center justify-between px-5 py-2.5 pt-3 border-t border-stroke">
                {/* Avatars */}
                <div className="flex -space-x-2">
                    {avatars.length > 0 ? (
                        avatars.map((avatar, idx) => (
                            <div
                                key={idx}
                                className="w-8 h-8 rounded-full overflow-hidden border border-card-bg"
                            >
                                <Image
                                    src={avatar}
                                    alt={`Avatar ${idx + 1}`}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                    priority={idx === 0}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-7 h-7 rounded-full border-2 border-white"></div>
                    )}
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-1.5">
                    {/* Move to dropdown - Mobile only */}
                    {currentColumnId && allColumns.length > 0 && onMove && (
                        <MoveToDropdown
                            currentColumnId={currentColumnId}
                            allColumns={allColumns}
                            onMove={handleMove}
                        />
                    )}

                    {/* Desktop action buttons */}
                    <button 
                        className='cursor-pointer text-icon-linkedin hidden md:block' 
                        title="View details"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SidebarLeftIcon size={20} />
                    </button>
                    <button 
                        className='cursor-pointer text-icon-linkedin hidden md:block' 
                        title="Edit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PencilEditIcon size={20} />
                    </button>
                    <button 
                        className='cursor-pointer text-icon-linkedin hidden md:block' 
                        title="Message"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CardCounterIcon size={20} />
                    </button>
                    <button 
                        className='cursor-pointer text-icon-linkedin hidden md:block' 
                        title="Notes"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <TimeLineListIcon size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadCard;