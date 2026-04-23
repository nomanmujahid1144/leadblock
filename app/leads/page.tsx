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

  // Handler to update lead phase
  const handlePhaseChange = (leadId: string, newPhase: string, newPhaseColor: string) => {
    // Find which column the lead is currently in
    let sourceColumnId = '';
    let targetColumnId = '';
    let leadToMove: Card | null = null;

    // Find source column and lead
    for (const column of columns) {
      const lead = column.cards.find(card => card.id === leadId);
      if (lead) {
        sourceColumnId = column.id;
        leadToMove = lead;
        break;
      }
    }

    // Find target column by phase name
    const targetColumn = columns.find(col => col.title === newPhase);
    if (targetColumn) {
      targetColumnId = targetColumn.id;
    }

    if (!leadToMove || !sourceColumnId || !targetColumnId) return;

    // If phase is the same, no need to move
    if (sourceColumnId === targetColumnId) {
      // Just update selectedLead to reflect new data
      if (selectedLead) {
        setSelectedLead({
          ...selectedLead,
          phase: newPhase,
          phaseColor: newPhaseColor
        });
      }
      return;
    }

    // Move the lead between columns
    setColumns(columns.map(col => {
      if (col.id === sourceColumnId) {
        // Remove from source
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== leadId),
          count: col.cards.length - 1
        };
      }
      if (col.id === targetColumnId) {
        // Add to target
        return {
          ...col,
          cards: [...col.cards, leadToMove],
          count: col.cards.length + 1
        };
      }
      return col;
    }));

    // Update selectedLead to reflect new phase
    if (selectedLead) {
      setSelectedLead({
        ...selectedLead,
        phase: newPhase,
        phaseColor: newPhaseColor
      });
    }
  };

  // Handler to update lead sentiment
  const handleSentimentChange = (leadId: string, newSentiment: string) => {
    // Update the lead's sentiment in columns
    setColumns(columns.map(col => ({
      ...col,
      cards: col.cards.map(card => 
        card.id === leadId 
          ? { ...card, sentiment: newSentiment }
          : card
      )
    })));

    // Update selectedLead to reflect new sentiment
    if (selectedLead) {
      setSelectedLead({
        ...selectedLead,
        sentiment: newSentiment
      });
    }
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
          onLeadClick={handleLeadClick}
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
        allPhases={columns.map(col => ({
          id: col.id,
          title: col.title,
          color: col.color
        }))}
        onAddPhaseClick={() => {
          setSelectedLead(null); // Close lead profile
          setIsModalOpen(true); // Open add phase modal
        }}
        onPhaseChange={handlePhaseChange}
        onSentimentChange={handleSentimentChange}
      />
    </div>
  );
}