import React, { useState } from 'react';
import type { Relation } from '../../db/schema';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { Loader2, X } from 'lucide-react';
import RelationshipModalTabs from './RelationshipModalTabs';

interface RelationshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    relation: Relation | null;
    isEditMode: boolean;
}

const RelationshipModal: React.FC<RelationshipModalProps> = ({
    isOpen,
    onClose,
    relation,
    isEditMode
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!relation) return null;

    const handleUpdate = async (id: string, data: Partial<Relation>) => {
        setIsUpdating(true);
        setError(null);
        try {
            const response = await fetch(`/api/relationships/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.error ||
                    (responseData.details && JSON.stringify(responseData.details)) ||
                    'Failed to update relationship'
                );
            }

            // Refresh the page to show updated data
            window.location.reload();
        } catch (error) {
            console.error('Error updating relationship:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-xl">
                    <div className="flex flex-col h-full max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <Dialog.Title className="text-xl font-semibold flex items-center gap-3">
                                {relation.name}
                                {isUpdating && (
                                    <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                                )}
                                {error && (
                                    <span className="text-sm text-red-500">
                                        {error}
                                    </span>
                                )}
                            </Dialog.Title>
                            <Dialog.Close className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </Dialog.Close>
                        </div>

                        {/* Tabs */}
                        <Tabs.Root defaultValue="organization" className="flex-1 flex flex-col min-h-0">
                            <Tabs.List className="flex gap-1 px-4 border-b bg-white">
                                <Tabs.Trigger
                                    value="organization"
                                    className="px-4 py-2 text-sm text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 hover:text-gray-800"
                                >
                                    Organization
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="address"
                                    className="px-4 py-2 text-sm text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 hover:text-gray-800"
                                >
                                    Address
                                </Tabs.Trigger>
                                {/* Add other tab triggers as needed */}
                            </Tabs.List>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <RelationshipModalTabs
                                    relation={relation}
                                    onUpdate={handleUpdate}
                                    isEditMode={isEditMode}
                                    isUpdating={isUpdating}
                                />
                            </div>
                        </Tabs.Root>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default RelationshipModal;