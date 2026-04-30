'use client';

import React from 'react';
import { DotsVerticleViewMoreIcon, LinkedinBoldIcon } from '../Icons';
import AddLeadPhaseButton from './AddLeadPhaseButton';

interface Card {
    id: string;
    name: string;
    title: string;
    company: string;
    chatterDate?: string;
    internalDate?: string;
    sentiment: string;
    avatars?: string[];
    phase?: string;
    phaseColor?: string;
}

interface Column {
    id: string;
    title: string;
    color: string;
    cards: Card[];
}

interface ListViewProps {
    columns: Column[];
    searchQuery: string;
    selectedSort: string;
    onAddPhaseClick: () => void;
    onLeadClick: (lead: any) => void;
}

// Helper function to get initials from name
const getInitials = (name: string): string => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

// Helper function to extract hex color from Tailwind bg class or return hex directly
const getHexColor = (color: string): string => {
    if (color.startsWith('#')) return color;
    const match = color.match(/bg-\[([#A-Fa-f0-9]+)\]/);
    if (match) return match[1];

    const colorMap: { [key: string]: string } = {
        'bg-yellow-100': '#FFECB6',
        'bg-blue-100': '#D5E6FF',
        'bg-neutral-100': '#F3F4F6',
        'bg-green-100': '#DCFFD2',
        'bg-purple-100': '#ECE1FF',
        'bg-pink-100': '#FFD9EC',
    };

    return colorMap[color] || '#F3F4F6';
};

// Helper to get sentiment color classes based on sentiment text
const getSentimentColor = (sentiment: string) => {
    if (sentiment.startsWith('POS')) {
        return 'bg-sentiment-positive text-sentiment-positive-dark';
    } else if (sentiment.startsWith('NEG')) {
        return 'bg-sentiment-negative text-sentiment-negative-dark';
    } else {
        return 'bg-sentiment-neutral text-sentiment-neutral-dark';
    }
};

const ListView: React.FC<ListViewProps> = ({ columns, searchQuery, selectedSort, onAddPhaseClick, onLeadClick }) => {
    // Flatten all cards from all columns
    const allCards = columns.flatMap(column =>
        column.cards.map(card => ({
            ...card,
            phase: column.title,
            phaseColor: column.color
        }))
    );

    // Filter cards
    const filteredCards = allCards.filter(card => {
        if (!searchQuery) return true;
        const search = searchQuery.toLowerCase();
        return (
            card.name.toLowerCase().includes(search) ||
            card.company.toLowerCase().includes(search) ||
            card.title.toLowerCase().includes(search)
        );
    });

    // Sort cards
    const sortedCards = [...filteredCards].sort((a, b) => {
        switch (selectedSort) {
            case 'name': return a.name.localeCompare(b.name);
            case 'company': return a.company.localeCompare(b.company);
            case 'sentiment': return a.sentiment.localeCompare(b.sentiment);
            case 'date':
                const dateA = new Date(a.chatterDate || a.internalDate || 0).getTime();
                const dateB = new Date(b.chatterDate || b.internalDate || 0).getTime();
                return dateB - dateA;
            default: return 0;
        }
    });

    return (
        <div className="overflow-hidden">
            {/* Desktop Table View - Hidden on Mobile */}
            <div className="hidden md:block">
                {/* Table Header */}
                <div className="grid grid-cols-12 justify-center items-center gap-4 px-6 py-3 bg-neutral-50 border-b border-stroke text-xs font-semibold text-neutral-600 uppercase">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-2">Company</div>
                    <div className="col-span-2 flex items-center gap-2">
                        <span>Lead Phase</span>
                        <AddLeadPhaseButton onClick={onAddPhaseClick} variant="light" />
                    </div>
                    <div className="col-span-2">Dates</div>
                    <div className="col-span-2">Sentiment</div>
                    <div className="col-span-1"></div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-stroke">
                    {sortedCards.length > 0 ? (
                        sortedCards.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => onLeadClick(card)}
                                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors cursor-pointer"
                            >
                                {/* Name Column */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-semibold text-neutral-600">
                                            {getInitials(card.name)}
                                        </span>
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold text-icon-linkedin truncate">
                                                {card.name}
                                            </span>
                                            <LinkedinBoldIcon size={12} className="flex-shrink-0 text-calendar-picker" />
                                        </div>
                                        <p className="text-xs text-neutral-500 truncate">{card.title}</p>
                                    </div>
                                </div>

                                {/* Company Column */}
                                <div className="col-span-2 flex items-center">
                                    <span className="text-sm text-text-heading truncate">{card.company}</span>
                                </div>

                                {/* Lead Phase Column */}
                                <div className="col-span-2 flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: getHexColor(card.phaseColor || '') }}
                                    />
                                    <span className="text-sm text-text-heading truncate">
                                        {card.phase}
                                    </span>
                                </div>

                                {/* Dates Column */}
                                <div className="col-span-2 flex flex-col justify-center text-xs text-neutral-600">
                                    {card.chatterDate && (
                                        <p className="truncate">Chat: {card.chatterDate}</p>
                                    )}
                                    {card.internalDate && (
                                        <p className="truncate">Internal: {card.internalDate}</p>
                                    )}
                                    {!card.chatterDate && !card.internalDate && (
                                        <p className="text-neutral-400">N/A</p>
                                    )}
                                </div>

                                {/* Sentiment Column */}
                                <div className="col-span-2 flex items-center">
                                    <span className="px-2 py-1 bg-info-bg text-info-text text-xs font-medium rounded-full truncate">
                                        {card.sentiment}
                                    </span>
                                </div>

                                {/* Actions Column - 3 Dots */}
                                <div className="col-span-1 flex items-center justify-end">
                                    <button
                                        className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: Open dropdown menu
                                        }}
                                    >
                                        <DotsVerticleViewMoreIcon size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-neutral-400">No leads found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Card View - Visible only on Mobile */}
            <div className="md:hidden space-y-3 py-4">
                {sortedCards.length > 0 ? (
                    sortedCards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => onLeadClick(card)}
                            className="bg-white border-b border-stroke cursor-pointer active:bg-neutral-50 transition-colors"
                        >
                            {/* Top Row: Avatar + Name + 3 Dots */}
                            <div className="flex items-start gap-3 mb-3">
                                {/* Avatar with Initials */}
                                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-semibold text-neutral-600">
                                        {getInitials(card.name)}
                                    </span>
                                </div>

                                {/* Name + Title */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <span className="text-sm font-semibold text-text-heading truncate max-w-[15ch]">
                                            {card.name}
                                        </span>
                                        <LinkedinBoldIcon size={12} className="flex-shrink-0 text-calendar-picker" />
                                    </div>
                                    <p className="text-2xs text-neutral-500 truncate">
                                        {card.title} · {card.company}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${card.phaseColor}`}></span>
                                        <span className="text-2xs text-neutral-500 truncate max-w-[25ch]">
                                            {card.phase || 'Lead needs to be reviewed'}
                                        </span>
                                    </div>
                                </div>

                                {/* 3 Dots Menu */}
                                <div className='flex justify-between gap-px items-center'>
                                    <div className="flex items-center">
                                        <span className={`px-2 py-1 text-2xs font-normal rounded-full truncate max-w-[15ch] ${getSentimentColor(card.sentiment)}`}>
                                            {card.sentiment}
                                        </span>
                                    </div>
                                    <button
                                        className="p-1 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: Open dropdown menu
                                        }}
                                    >
                                        <DotsVerticleViewMoreIcon size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-400">No leads found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListView;