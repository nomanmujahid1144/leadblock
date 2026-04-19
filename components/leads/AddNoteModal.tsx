'use client';

import React, { useState } from 'react';
import Modal from '../Modal';

interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (note: string) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        if (note.trim()) {
            onSubmit(note);
            setNote('');
            onClose();
        }
    };

    const handleCancel = () => {
        setNote('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCancel}
            title="Add Note"
            maxWidth="md"
            showCloseButton={true}
            zIndex={9999}
        >
            {/* Note Label */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-text-heading mb-2">
                    Note
                </label>
                <textarea
                    placeholder="Write your note here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm text-text-heading placeholder:text-neutral-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-button resize-none"
                />
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
                    disabled={!note.trim()}
                    className="px-6 py-2.5 bg-primary-button text-white text-sm font-medium rounded-lg hover:enabled:bg-primary-button/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Note
                </button>
            </div>
        </Modal>
    );
};

export default AddNoteModal;