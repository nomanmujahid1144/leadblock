'use client';

import React, { useRef, useEffect } from 'react';

interface DropdownWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    triggerRef?: React.RefObject<HTMLElement | null>;
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ 
    isOpen, 
    onClose, 
    children,
    triggerRef 
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                triggerRef?.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    return (
        <div 
            ref={dropdownRef}
            className="absolute top-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 animate-fade-in"
            style={{ animationDuration: '200ms' }}
        >
            {children}
        </div>
    );
};

export default DropdownWrapper;