'use client';

import React, { useState } from 'react';
import Modal from '../Modal';
import { AtRateIcon, CalendarIcon } from '../Icons';
import { toast } from '@/lib/toast';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: { title: string; note: string; dueDate: string; assignTo: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignTo, setAssignTo] = useState('');

    const handleSubmit = () => {
        if (title.trim()) {
            onSubmit({ title, note, dueDate, assignTo });
            
            // Show success toast
            toast.success('Task created successfully');
            
            // Reset form
            setTitle('');
            setNote('');
            setDueDate('');
            setAssignTo('');
            onClose();
        }
    };

    const handleCancel = () => {
        // Reset form
        setTitle('');
        setNote('');
        setDueDate('');
        setAssignTo('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCancel}
            title="Add Task"
            maxWidth="md"
            showCloseButton={true}
            zIndex={9999}
        >
            {/* Title Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text-heading mb-2">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="Task description..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm text-text-heading placeholder:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-button"
                />
            </div>

            {/* Note Input (Optional) */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text-heading mb-2">
                    Note (optional)
                </label>
                <textarea
                    placeholder="Additional notes..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm text-text-heading placeholder:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-button resize-none"
                />
            </div>

            {/* Due Date Picker */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text-heading mb-2">
                    Due date
                </label>
                <div className="relative">
                    <CalendarIcon
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10"
                    />
                    <input
                        type="text"
                        placeholder="Pick a date"
                        value={dueDate}
                        onFocus={(e) => {
                            e.target.type = 'date';
                        }}
                        onBlur={(e) => {
                            if (!e.target.value) {
                                e.target.type = 'text';
                            }
                        }}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-neutral-200 rounded-lg text-sm text-neutral-400 placeholder:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-button"
                    />
                </div>
            </div>

            {/* Assign to Chatter or Internal Task */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-text-heading mb-2">
                    Assign to chatter or internal task
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Name chatter"
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-neutral-200 rounded-lg text-sm text-text-heading placeholder:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-button"
                    />
                    <AtRateIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none' size={16} />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
                <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!title.trim()}
                    className="px-6 py-2.5 bg-primary-button text-white text-sm font-medium rounded-lg hover:enabled:bg-primary-button/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Create Task
                </button>
            </div>
        </Modal>
    );
};

export default AddTaskModal;