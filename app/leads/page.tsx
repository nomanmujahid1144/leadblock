'use client';

import { useState } from 'react';
import LeadsTopBar from '@/components/leads/LeadsTopBar';
import KanbanBoard from '@/components/leads/KanbanBoard';

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('name');

  return (
    <div className="min-h-screen px-4 md:px-6 lg:px-8 py-6">
      <LeadsTopBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
      <KanbanBoard 
        searchQuery={searchQuery}
        selectedSort={selectedSort}
      />
    </div>
  );
}