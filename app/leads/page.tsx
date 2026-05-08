'use client';

import { useState } from 'react';
import LeadsTopBar from '@/components/leads/LeadsTopBar';
import ListView from '@/components/leads/ListView';
import AddLeadPhaseModal from '@/components/leads/AddLeadPhaseModal';
import dynamic from 'next/dynamic';
import { leadsColumns as initialLeadsColumns } from '@/data/leads/mockData';
import LeadProfileModal from '@/components/leads/LeadProfileModal';

// Define types...
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

// Add FilterState interface
interface FilterState {
  lastMessageFrom: string;
  lastMessageTo: string;
  internalTaskFrom: string;
  internalTaskTo: string;
  company: string;
  role: string;
  leadPhases: string[];
  sentiments: string[];
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
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [columns, setColumns] = useState<Column[]>(initialLeadsColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Add active filters state
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    lastMessageFrom: '',
    lastMessageTo: '',
    internalTaskFrom: '',
    internalTaskTo: '',
    company: '',
    role: '',
    leadPhases: [],
    sentiments: []
  });

  // Handle add new phase...
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

  const handleLeadClick = (lead: any) => {
    setSelectedLead({
      ...lead,
      email: `${lead.name.split(' ')[0].toLowerCase()}@${lead.company.toLowerCase().replace(' ', '')}.com`,
      phone: '(+31) 610887057',
      crmStatus: 'Not yet'
    });
  };

  const handlePhaseChange = (leadId: string, newPhase: string, newPhaseColor: string) => {
    let sourceColumnId = '';
    let targetColumnId = '';
    let leadToMove: Card | null = null;

    for (const column of columns) {
      const lead = column.cards.find(card => card.id === leadId);
      if (lead) {
        sourceColumnId = column.id;
        leadToMove = lead;
        break;
      }
    }

    const targetColumn = columns.find(col => col.title === newPhase);
    if (targetColumn) {
      targetColumnId = targetColumn.id;
    }

    if (!leadToMove || !sourceColumnId || !targetColumnId) return;

    if (sourceColumnId === targetColumnId) {
      if (selectedLead) {
        setSelectedLead({
          ...selectedLead,
          phase: newPhase,
          phaseColor: newPhaseColor
        });
      }
      return;
    }

    setColumns(columns.map(col => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== leadId),
          count: col.cards.length - 1
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          cards: [...col.cards, leadToMove],
          count: col.cards.length + 1
        };
      }
      return col;
    }));

    if (selectedLead) {
      setSelectedLead({
        ...selectedLead,
        phase: newPhase,
        phaseColor: newPhaseColor
      });
    }
  };

  const handleSentimentChange = (leadId: string, newSentiment: string) => {
    setColumns(columns.map(col => ({
      ...col,
      cards: col.cards.map(card => 
        card.id === leadId 
          ? { ...card, sentiment: newSentiment }
          : card
      )
    })));

    if (selectedLead) {
      setSelectedLead({
        ...selectedLead,
        sentiment: newSentiment
      });
    }
  };

  // Handler for applying filters
  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
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
        onFilterChange={handleFilterChange}
      />

      {viewMode === 'grid' ? (
        <KanbanBoard
          searchQuery={searchQuery}
          selectedSort={selectedSort}
          activeFilters={activeFilters}
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
          activeFilters={activeFilters}
          onAddPhaseClick={() => setIsModalOpen(true)}
          onLeadClick={handleLeadClick}
        />
      )}

      <AddLeadPhaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPhase}
      />

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
          setSelectedLead(null);
          setIsModalOpen(true);
        }}
        onPhaseChange={handlePhaseChange}
        onSentimentChange={handleSentimentChange}
      />
    </div>
  );
}