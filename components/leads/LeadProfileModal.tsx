'use client';

import React, { useState } from 'react';
import Modal from '../Modal';
import { AddNoteIcon, AddTaskIcon, ArrowDownIcon, ArrowRightDirectionIcon, ArrowRightIcon, CalendarIcon, CancelIcon, FileIcon, LinkedinBoldIcon, ListIcon, MailBoxIcon, OpenIcon, PhaseChangeIcon, PhoneIcon, PlusIcon, ReplyIcon, SendCRMIcon, SinglePersonIcon, TickCorrectBoxIcon, ViewConversationIcon } from '../Icons';
import LeadPhaseTimelineHeader from './components/LeadPhaseTimelineHeader';
import ActionsDropdown from '../ActionsDropdown';
import AddNoteModal from './AddNoteModal';
import AddTaskModal from './AddTaskModal';
import { toast } from '@/lib/toast';

interface LeadProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: {
        id: string;
        name: string;
        title: string;
        company: string;
        email?: string;
        phone?: string;
        chatterDate?: string;
        internalDate?: string;
        phase: string;
        phaseColor: string;
        sentiment: string;
        crmStatus?: string;
    } | null;
}

// Mock timeline data - will be replaced with real data later
const mockTimelineData = [
    {
        id: '1',
        type: 'linkedin-sent',
        date: '13 Mar 2025 - 10:55',
        message: 'Dag Ivo, Wij helpen bedrijven zoals jullie om structureel meer kwalitatieve leads te genereren via een doordachte leadgeneratie strategie die echt aansluit bij jullie doelgroep en salesproces.'
    },
    {
        id: '2',
        type: 'linkedin-received',
        date: '13 Mar 2025 - 10:02',
        message: 'Anna, bedankt. Wat kan je voor ons betekenen qua lead generatie? Wij zijn een importeur en distributeur van Huawei solar products and solutions. Gr. Ivo'
    },
    {
        id: '3',
        type: 'phase-change',
        date: '13 Mar 2025 - 10:02',
        oldPhase: 'New Lead',
        newPhase: 'Lead needs to be reviewed',
        newPhaseColor: '#FFECB6'
    },
    {
        id: '4',
        type: 'task-chatter',
        date: '13 Mar 2025 - 10:02',
        title: 'Task chatter submitted',
        description: 'Research their B2B focus and target segments before follow-up.',
        dueDate: '15 Mar 2025',
        status: 'open'
    },
    {
        id: '5',
        type: 'note',
        date: '13 Mar 2025 - 10:02',
        author: 'Anna',
        content: 'Lead seems interested in B2B lead generation. Good fit for our enterprise solution.'
    }
];

const LeadProfileModal: React.FC<LeadProfileModalProps> = ({ isOpen, onClose, lead }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    if (!lead) return null;

    // Helper function to get initials
    const getInitials = (name: string): string => {
        const words = name.trim().split(' ');
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    const tabs = ['All', 'Notes', 'LinkedIn Messages', 'Chatter Tasks', 'Internal Tasks'];

    // Filter timeline based on active tab
    const filteredTimeline = mockTimelineData.filter(item => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Notes' && item.type === 'note') return true;
        if (activeTab === 'LinkedIn Messages' && (item.type === 'linkedin-sent' || item.type === 'linkedin-received')) return true;
        if (activeTab === 'Chatter Tasks' && item.type === 'task-chatter') return true;
        return false;
    });

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                maxWidth="3xl"
                showCloseButton={true}
                zIndex={50}
            >
                {/* Lead Header */}
                <div className="mb-6 -mt-4 border border-stroke rounded-xl p-5">
                    {/* Avatar + Name + Title + Company */}
                    <div className="flex items-start gap-4 mb-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-primary-button/10 border-2 border-stroke/50 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-semibold text-primary-button">
                                {getInitials(lead.name)}
                            </span>
                        </div>

                        {/* Name, Title, Company */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold text-text-heading">{lead.name}</h3>
                                <LinkedinBoldIcon className='text-calendar-picker' size={16} />
                            </div>
                            <p className="text-sm text-neutral-600">
                                {lead.title} at <span className="font-medium">{lead.company}</span>
                            </p>
                            {/* Contact Info */}
                            <div className="flex items-center gap-6 text-sm text-neutral-600 mt-3">
                                {lead.phone && (
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon size={14} />
                                        <span>{lead.phone}</span>
                                    </div>
                                )}
                                {lead.email && (
                                    <div className="flex items-center gap-2">
                                        <MailBoxIcon size={14} />
                                        <span>{lead.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-6 text-xs text-neutral-600">
                        {lead.chatterDate && (
                            <div className="flex items-center gap-1 border border-stroke py-1.5 px-2.5 rounded-full">
                                <TickCorrectBoxIcon size={12} />
                                <span>Chatter: {lead.chatterDate}</span>
                            </div>
                        )}
                        {lead.internalDate && (
                            <div className="flex items-center gap-1 border border-stroke py-1.5 px-2.5 rounded-full">
                                <TickCorrectBoxIcon size={12} />
                                <span>Internal: {lead.internalDate}</span>
                            </div>
                        )}
                    </div>

                    <hr className='w-full my-4 text-stroke' />

                    {/* Dropdowns - Lead Phase, Sentiment, CRM */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Lead Phase Dropdown */}
                        <button className="px-3 py-1.5 border border-primary-button/20 bg-primary-button/20 text-primary-button/50 text-xs font-medium rounded-full flex items-center gap-2 hover:bg-blue-200 transition-colors cursor-pointer">
                            Leadphase: <span className='text-primary-button'>{lead.phase}</span>
                            <ArrowDownIcon size={9} />
                        </button>

                        {/* Sentiment Dropdown */}
                        <button className="px-3 py-1.5 border border-phase-green-dark/20 bg-phase-green-dark/20 text-phase-green-dark/50 text-xs font-medium rounded-full flex items-center gap-2 hover:bg-green-200 transition-colors cursor-pointer">
                            Sentiment: <span className='text-phase-green-dark'>{lead.sentiment}</span>
                            <ArrowDownIcon size={9} />
                        </button>

                        {/* CRM Status */}
                        <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full cursor-pointer">
                            CRM: {lead.crmStatus || 'Not yet'}
                        </span>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="border-t border-stroke pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-text/80 uppercase tracking-wide">
                            Activity Timeline
                        </h4>
                        <ActionsDropdown
                            trigger={
                                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-stroke bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition-colors">
                                    <PlusIcon size={14} />
                                </button>
                            }
                            actions={[
                                {
                                    id: 'add-note',
                                    label: 'Add a note',
                                    icon: <AddNoteIcon size={18} />,
                                    onClick: () => {
                                        setIsAddNoteModalOpen(true);
                                    }
                                },
                                {
                                    id: 'add-task',
                                    label: 'Add a task',
                                    icon: <AddTaskIcon size={18} />,
                                    onClick: () => {
                                        setIsAddTaskModalOpen(true);
                                    }
                                },
                                {
                                    id: 'send-to-crm',
                                    label: 'Send to CRM',
                                    icon: <SendCRMIcon size={18} />,
                                    onClick: () => {
                                        toast.success('Lead sent to CRM');
                                    }
                                }
                            ]}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${activeTab === tab
                                    ? 'bg-icon-linkedin text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Timeline Content */}
                    <div className="space-y-6 pr-2">
                        {filteredTimeline.length > 0 ? (
                            filteredTimeline.map((item, index) => (
                                <div key={item.id} className="flex gap-4 relative">
                                    {/* Vertical Line - connects icons */}
                                    {index !== filteredTimeline.length - 1 && (
                                        <div className="absolute left-4 top-9 bottom-0 w-0.5 bg-stroke -mb-6" />
                                    )}

                                    {/* Icon */}
                                    <div className="flex-shrink-0 relative z-10">
                                        {item.type === 'linkedin-sent' || item.type === 'linkedin-received' ? (
                                            <div className="w-9 h-9 rounded-full border-2 border-white/90 bg-icon-linkedin flex items-center justify-center">
                                                <LinkedinBoldIcon size={16} className="text-white" />
                                            </div>
                                        ) : item.type === 'phase-change' ? (
                                            <div className="w-9 h-9 rounded-full border-2 border-white/90 bg-icon-linkedin flex items-center justify-center">
                                                <PhaseChangeIcon size={16} className="text-white" />
                                            </div>
                                        ) : item.type === 'task-chatter' ? (
                                            <div className="w-9 h-9 rounded-full border-2 border-white/90 bg-icon-linkedin flex items-center justify-center">
                                                <TickCorrectBoxIcon size={16} className="text-white" />
                                            </div>
                                        ) : (
                                            <div className="w-9 h-9 rounded-full border-2 border-white/90 bg-icon-linkedin flex items-center justify-center">
                                                <FileIcon size={16} className="text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        {/* Date */}
                                        <p className="text-xs font-medium text-text mb-2">{item.date}</p>

                                        {/* LinkedIn Message Sent */}
                                        {item.type === 'linkedin-sent' && (
                                            <LeadPhaseTimelineHeader title="LinkedIn Message Sent">
                                                <div className='px-4 pb-4'>
                                                    <div className="flex justify-end">
                                                        <div className="bg-primary-button w-11/12 text-white rounded-2xl rounded-br-md p-4 mb-2">
                                                            <p className="text-sm">{item.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6 text-sm font-medium pt-3">
                                                        <button className="flex items-center gap-2 text-primary-button cursor-pointer">
                                                            <ReplyIcon size={16} />
                                                            Reply to LinkedIn
                                                        </button>
                                                        <button className="flex items-center gap-2 text-neutral-600 hover:underline">
                                                            <ViewConversationIcon size={16} />
                                                            View conversation
                                                        </button>
                                                    </div>
                                                </div>
                                            </LeadPhaseTimelineHeader>
                                        )}

                                        {/* LinkedIn Message Received */}
                                        {item.type === 'linkedin-received' && (
                                            <LeadPhaseTimelineHeader title="LinkedIn Message Received">
                                                <div className='px-4 pb-4'>
                                                    <div className="flex justify-start">
                                                        <div className="bg-neutral-100 w-11/12 text-text-heading rounded-2xl rounded-bl-md p-4 mb-2">
                                                            <p className="text-sm">{item.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6 text-sm font-medium pt-3">
                                                        <button className="flex items-center gap-2 text-primary-button cursor-pointer">
                                                            <ReplyIcon size={16} />
                                                            Reply to LinkedIn
                                                        </button>
                                                        <button className="flex items-center gap-2 text-neutral-600 hover:underline">
                                                            <ViewConversationIcon size={16} />
                                                            View conversation
                                                        </button>
                                                    </div>
                                                </div>
                                            </LeadPhaseTimelineHeader>
                                        )}

                                        {/* Phase Change */}
                                        {item.type === 'phase-change' && (
                                            <LeadPhaseTimelineHeader title="Phase Change">
                                                <div className='px-4 pb-4'>
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-3 py-1.5 text-text border border-stroke text-xs font-medium rounded-full">
                                                            {item.oldPhase}
                                                        </span>
                                                        <ArrowRightDirectionIcon className='text-neutral-700' size={10} />
                                                        {/* Sentiment Dropdown */}
                                                        <button className="px-3 py-1.5 border border-phase-green-dark/20 bg-phase-green-dark/20 text-phase-green-dark/50 text-xs font-medium rounded-full flex items-center gap-2 hover:bg-green-200 transition-colors cursor-pointer">
                                                            <span className='text-phase-green-dark'>{item.newPhase}</span>
                                                            <ArrowDownIcon size={9} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </LeadPhaseTimelineHeader>
                                        )}

                                        {/* Task Chatter */}
                                        {item.type === 'task-chatter' && (
                                            <LeadPhaseTimelineHeader
                                                title={item.title || ''}
                                                headerActions={
                                                    <>
                                                        <button className="text-xs text-neutral-500 hover:text-neutral-700 flex items-center gap-1 cursor-pointer">
                                                            <CancelIcon size={14} />
                                                            Cancel chatter task
                                                        </button>
                                                        <button className="text-xs text-neutral-500 hover:text-neutral-700 flex items-center gap-1 cursor-pointer">
                                                            <OpenIcon size={14} />
                                                            Open
                                                        </button>
                                                    </>
                                                }
                                            >
                                                <div className='px-4 pb-4'>
                                                    <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full">
                                                        <CalendarIcon size={12} className='text-red-600' />
                                                        due: {item.dueDate}
                                                    </span>
                                                </div>
                                            </LeadPhaseTimelineHeader>
                                        )}

                                        {/* Note */}
                                        {item.type === 'note' && (
                                            <LeadPhaseTimelineHeader
                                                title={'Note'}
                                                headerActions={
                                                    <>
                                                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                                                            <SinglePersonIcon size={14} />
                                                            {item.author}
                                                        </span>
                                                    </>
                                                }
                                            >
                                                <div className='px-4 pb-4'>
                                                    <p className="text-sm text-neutral-600 mb-2">{item.content}</p>
                                                </div>
                                            </LeadPhaseTimelineHeader>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-neutral-400 text-center py-8">
                                No {activeTab.toLowerCase()} found
                            </p>
                        )}
                    </div>
                </div>



            </Modal>
            {/* Add Note Modal */}
            <AddNoteModal
                isOpen={isAddNoteModalOpen}
                onClose={() => setIsAddNoteModalOpen(false)}
                onSubmit={(note) => {
                    console.log('Note submitted:', note);
                    // TODO: Add note to timeline
                    // For now, just log it
                }}
            />

            {/* Add Task Modal */}
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                onSubmit={(task) => {
                    console.log('Task submitted:', task);
                    // TODO: Add task to timeline
                }}
            />

        </>
    );
};

export default LeadProfileModal;