'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownIcon } from '../Icons';

interface SentimentDropdownProps {
    currentSentiment: string;
    onSentimentChange: (newSentiment: string) => void;
}

const SENTIMENTS = [
    'Other DMU',
    'NEG not interested',
    'Neutral',
    'POS interested in follow-up',
    'POS interested later',
    'POS maybe interested',
];

const SentimentDropdown: React.FC<SentimentDropdownProps> = ({
    currentSentiment,
    onSentimentChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSentimentSelect = (sentiment: string) => {
        onSentimentChange(sentiment);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1.5 border border-phase-green-dark/20 bg-phase-green-dark/20 text-phase-green-dark/50 text-xs font-medium rounded-full flex items-center gap-2 hover:bg-green-200 transition-colors cursor-pointer"
            >
                Sentiment: <span className='text-phase-green-dark'>{currentSentiment}</span>
                <ArrowDownIcon size={9} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-stroke rounded-xl shadow-lg z-50 animate-fade-in py-2">
                    {SENTIMENTS.map((sentiment) => (
                        <button
                            key={sentiment}
                            onClick={() => handleSentimentSelect(sentiment)}
                            className={`w-full px-4 py-2 text-xs text-left transition-colors cursor-pointer ${
                                sentiment === currentSentiment
                                    ? 'font-medium'
                                    : ''
                            }`}
                        >
                            {sentiment}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SentimentDropdown;