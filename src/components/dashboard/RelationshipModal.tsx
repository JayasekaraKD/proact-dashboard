// RelationshipModal.tsx
import React, { useEffect, useState } from 'react';
import type { Relation, ContactPerson, Document, Note } from '../../db/schema';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import RelationshipModalTabs from './RelationshipModalTabs';

interface RelationshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    relation: Relation | null;
}

const RelationshipModal: React.FC<RelationshipModalProps> = ({
    isOpen,
    onClose,
    relation
}) => {
    if (!relation) return null;

    const tabs = [
        { id: 'organization', label: 'Organization information' },
        { id: 'address', label: 'Address details' },
        { id: 'financial', label: 'Financial data' },
        { id: 'contacts', label: 'Contact persons' },
        { id: 'documents', label: 'Documents' },
        { id: 'notes', label: 'Notes' }
    ];

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-xl">
                    <div className="flex flex-col h-full max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <Dialog.Title className="text-xl font-semibold">
                                {relation.name}
                            </Dialog.Title>
                            <Dialog.Close className="text-gray-500 hover:text-gray-700">
                                <span className="material-icons">close</span>
                            </Dialog.Close>
                        </div>

                        {/* Tabs */}
                        <Tabs.Root defaultValue="organization" className="flex-1 flex flex-col min-h-0">
                            <Tabs.List className="flex gap-1 px-4 border-b bg-white">
                                {tabs.map(tab => (
                                    <Tabs.Trigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="px-4 py-2 text-sm text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 hover:text-gray-800"
                                    >
                                        {tab.label}
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            {/* Scrollable Content Area */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <RelationshipModalTabs relation={relation} />
                            </div>
                        </Tabs.Root>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default RelationshipModal;