'use client';

import { useState } from 'react';
import LeadsTopBar from '@/components/leads/LeadsTopBar';
import ListView from '@/components/leads/ListView';
import AddLeadPhaseModal from '@/components/leads/AddLeadPhaseModal';
import dynamic from 'next/dynamic';
import { leadsColumns as initialLeadsColumns } from '@/data/leads/mockData';
import LeadProfileModal from '@/components/leads/LeadProfileModal';

// Define Column type to match KanbanBoard
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

const KanbanBoard = dynamic(() => import('@/components/leads/KanbanBoard'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-neutral-400">Loading...</div>
    </div>
  ),
});

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('none');
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [columns, setColumns] = useState<Column[]>(initialLeadsColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Handle add new phase (shared between both views)
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

  // Add handler
  const handleLeadClick = (lead: any) => {
    setSelectedLead({
      ...lead,
      email: `${lead.name.split(' ')[0].toLowerCase()}@${lead.company.toLowerCase().replace(' ', '')}.com`,
      phone: '(+31) 610887057',
      crmStatus: 'Not yet'
    });
  };

  return (
    <div className="min-h-screen px-4 md:px-6 lg:px-8 py-6">
      <LeadsTopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === 'grid' ? (
        <KanbanBoard
          searchQuery={searchQuery}
          selectedSort={selectedSort}
          columns={columns}
          setColumns={setColumns}
          onAddPhaseClick={() => setIsModalOpen(true)}
        />
      ) : (
        <ListView
          columns={columns}
          searchQuery={searchQuery}
          selectedSort={selectedSort}
          onAddPhaseClick={() => setIsModalOpen(true)}
          onLeadClick={handleLeadClick}
        />
      )}

      {/* Shared Modal */}
      <AddLeadPhaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPhase}
      />

      {/* Add LeadProfileModal at the end: */}
      <LeadProfileModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
}