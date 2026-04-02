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
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import AddLeadPhaseButton from './AddLeadPhaseButton';
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

interface KanbanBoardProps {
  searchQuery: string;
  selectedSort: string;
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  onAddPhaseClick: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  searchQuery, 
  selectedSort, 
  columns, 
  setColumns,
  onAddPhaseClick 
}) => {
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  // Setup sensors - DESKTOP ONLY (no touch for mobile)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardId = active.id as string;

    // Find the card being dragged
    for (const column of columns) {
      const card = column.cards.find(c => c.id === cardId);
      if (card) {
        setActiveCard(card);
        break;
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const overId = over.id as string;

    // Find source column
    let sourceColumn: Column | undefined;
    let sourceCard: Card | undefined;

    for (const col of columns) {
      const card = col.cards.find(c => c.id === cardId);
      if (card) {
        sourceColumn = col;
        sourceCard = card;
        break;
      }
    }

    if (!sourceColumn || !sourceCard) return;

    // Determine target
    const targetColumn = columns.find(col => col.id === overId) || 
                        columns.find(col => col.cards.some(c => c.id === overId));
    
    if (!targetColumn) return;

    // Same column - reorder
    if (sourceColumn.id === targetColumn.id) {
      const oldIndex = sourceColumn.cards.findIndex(c => c.id === cardId);
      const newIndex = targetColumn.cards.findIndex(c => c.id === overId);

      if (oldIndex === newIndex) return;

      setColumns(columns.map(col => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            cards: arrayMove(col.cards, oldIndex, newIndex >= 0 ? newIndex : col.cards.length)
          };
        }
        return col;
      }));
    } else {
      // Different column - move
      const targetIndex = targetColumn.cards.findIndex(c => c.id === overId);

      setColumns(columns.map(col => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            cards: col.cards.filter(c => c.id !== cardId),
            count: col.cards.length - 1
          };
        }
        if (col.id === targetColumn.id) {
          const newCards = [...col.cards];
          newCards.splice(targetIndex >= 0 ? targetIndex : newCards.length, 0, sourceCard);
          return {
            ...col,
            cards: newCards,
            count: newCards.length
          };
        }
        return col;
      }));
    }
  };

  // Handle move from dropdown (mobile)
  const handleMoveCard = (cardId: string, targetColumnId: string) => {
    let sourceColumn: Column | undefined;
    let card: Card | undefined;

    for (const col of columns) {
      const foundCard = col.cards.find(c => c.id === cardId);
      if (foundCard) {
        sourceColumn = col;
        card = foundCard;
        break;
      }
    }

    if (!sourceColumn || !card) return;

    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (!targetColumn || sourceColumn.id === targetColumn.id) return;

    setColumns(columns.map(col => {
      if (col.id === sourceColumn.id) {
        return {
          ...col,
          cards: col.cards.filter(c => c.id !== cardId),
          count: col.cards.length - 1
        };
      }
      if (col.id === targetColumn.id) {
        return {
          ...col,
          cards: [...col.cards, card],
          count: col.cards.length + 1
        };
      }
      return col;
    }));
  };

  // Filter and sort
  const processedColumns = useMemo(() => {
    return columns.map(column => {
      let cards = column.cards.filter(card => {
        if (!searchQuery) return true;
        const search = searchQuery.toLowerCase();
        return (
          card.name.toLowerCase().includes(search) ||
          card.company.toLowerCase().includes(search) ||
          card.title.toLowerCase().includes(search)
        );
      });

      if (selectedSort && selectedSort !== 'none') {
        cards = [...cards].sort((a, b) => {
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
      }

      return { ...column, cards, count: cards.length };
    });
  }, [columns, searchQuery, selectedSort]);

  const columnsForDropdown = columns.map(col => ({ id: col.id, title: col.title }));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative">
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex gap-1 min-w-full">
            {processedColumns.map((column) => (
              <SortableContext
                key={column.id}
                items={column.cards.map(card => card.id)}
                strategy={verticalListSortingStrategy}
              >
                <KanbanColumn
                  id={column.id}
                  title={column.title}
                  count={column.count}
                  color={column.color}
                  cards={column.cards}
                  isVertical={column.isVertical}
                  allColumns={columnsForDropdown}
                  onMoveCard={handleMoveCard}
                />
              </SortableContext>
            ))}
            
            <AddLeadPhaseButton onClick={onAddPhaseClick} />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="opacity-90 rotate-2 scale-105 cursor-grabbing shadow-2xl">
            <LeadCard {...activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;