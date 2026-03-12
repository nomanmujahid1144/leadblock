'use client';

import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import AddLeadPhaseButton from './AddLeadPhaseButton';
import AddLeadPhaseModal from './AddLeadPhaseModal';

interface Column {
  id: string;
  title: string;
  count: number;
  color: string;
  isVertical: boolean;
  cards: any[];
}

// Import initial data
import { leadsColumns as initialColumns } from '@/data/leads/mockData';

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPhase = (name: string, colorHex: string) => {
    const newColumn: Column = {
      id: `custom-${Date.now()}`,
      title: name,
      count: 0,
      color: `bg-[${colorHex}]`,
      isVertical: true,
      cards: []
    };

    setColumns([...columns, newColumn]);
  };

  return (
    <>
      <div className="relative">
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex gap-1 min-w-full">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                title={column.title}
                count={column.count}
                color={column.color}
                cards={column.cards}
                isVertical={column.isVertical}
              />
            ))}
            
            {/* Spacer to push button to the right */}
            {/* <div className="flex-1 min-w-4" /> */}
            
            {/* Add New Phase Button - Sticky to right */}
            {/* <div className="sticky right-0">
            </div> */}
              <AddLeadPhaseButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* Add Lead Phase Modal */}
      <AddLeadPhaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPhase}
      />
    </>
  );
};

export default KanbanBoard;