'use client';

import React from 'react';
import KanbanColumn from './KanbanColumn';
import { leadsColumns } from '@/data/leads/mockData';

const KanbanBoard = () => {
  return (
    <div className="relative">
      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-1 min-w-full">
          {leadsColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              count={column.count}
              color={column.color}
              cards={column.cards}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;