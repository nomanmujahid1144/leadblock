'use client';

import React, { useState, useMemo } from 'react';
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

interface KanbanBoardProps {
  searchQuery: string;
  selectedSort: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ searchQuery, selectedSort }) => {
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

  // Filter and sort columns
  const filteredColumns = useMemo(() => {
    return columns.map(column => {
      // Filter cards based on search query
      const filteredCards = column.cards.filter(card => {
        const searchLower = searchQuery.toLowerCase();
        return (
          card.name.toLowerCase().includes(searchLower) ||
          card.company.toLowerCase().includes(searchLower) ||
          card.title.toLowerCase().includes(searchLower)
        );
      });

      // Sort cards based on selectedSort
      const sortedCards = [...filteredCards].sort((a, b) => {
        switch (selectedSort) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'company':
            return a.company.localeCompare(b.company);
          case 'sentiment':
            return a.sentiment.localeCompare(b.sentiment);
          case 'date':
            // Sort by chatterDate or internalDate (newest first)
            const dateA = new Date(a.chatterDate || a.internalDate || 0);
            const dateB = new Date(b.chatterDate || b.internalDate || 0);
            return dateB.getTime() - dateA.getTime();
          default:
            return 0;
        }
      });

      return {
        ...column,
        cards: sortedCards,
        count: sortedCards.length
      };
    });
  }, [columns, searchQuery, selectedSort]);

  return (
    <>
      <div className="relative">
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex gap-1 min-w-full">
            {filteredColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                title={column.title}
                count={column.count}
                color={column.color}
                cards={column.cards}
                isVertical={column.isVertical}
              />
            ))}
            
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