'use client';

import React from 'react';
import { PlusIcon } from '../Icons';

interface AddLeadPhaseButtonProps {
    onClick: () => void;
}

const AddLeadPhaseButton: React.FC<AddLeadPhaseButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="h-6 w-6 shrink-0 flex items-center justify-center border-2 border-dashed border-stroke/50 rounded-full hover:bg-primary/5 transition-all group"
            aria-label="Add new lead phase"
        >
            <PlusIcon 
                size={12} 
                className="text-stroke stroke-2"
            />
        </button>
    );
};

export default AddLeadPhaseButton;