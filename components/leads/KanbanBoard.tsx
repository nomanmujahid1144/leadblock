'use client';

import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import AddLeadPhaseButton from './AddLeadPhaseButton';
import AddLeadPhaseModal from './AddLeadPhaseModal';
import LeadCard from './LeadCard';

interface Card {
  id: string;
  name: string;
  title: string;
  company: string;
  chatterDate?: string;
  internalDate?: string;
  sentiment: string;
  avatars?: string[];
}

interface Column {
  id: string;
  title: string;
  count: number;
  color: string;
  isVertical: boolean;
  cards: Card[];
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
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required to start drag
      },
    })
  );

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

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardId = active.id as string;

    // Find the card being dragged
    const sourceColumn = columns.find(col => 
      col.cards.some(card => card.id === cardId)
    );
    
    if (sourceColumn) {
      const card = sourceColumn.cards.find(c => c.id === cardId);
      if (card) {
        setActiveCard(card);
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const targetColumnId = over.id as string;

    // Find source column
    const sourceColumn = columns.find(col => 
      col.cards.some(card => card.id === cardId)
    );

    // Find target column
    const targetColumn = columns.find(col => col.id === targetColumnId);

    if (!sourceColumn || !targetColumn) return;

    // If dropped in the same column, do nothing
    if (sourceColumn.id === targetColumn.id) return;

    // Find the card
    const card = sourceColumn.cards.find(c => c.id === cardId);
    if (!card) return;

    // Create new columns array with updated cards
    const newColumns = columns.map(col => {
      // Remove card from source column
      if (col.id === sourceColumn.id) {
        return {
          ...col,
          cards: col.cards.filter(c => c.id !== cardId),
          count: col.cards.filter(c => c.id !== cardId).length
        };
      }
      
      // Add card to target column
      if (col.id === targetColumn.id) {
        return {
          ...col,
          cards: [...col.cards, card],
          count: col.cards.length + 1
        };
      }
      
      return col;
    });

    setColumns(newColumns);
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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex gap-1 min-w-full">
              {filteredColumns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
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

        {/* Drag Overlay - Shows card being dragged */}
        <DragOverlay>
          {activeCard ? (
            <div className="opacity-80 rotate-3 scale-105">
              <LeadCard {...activeCard} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

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