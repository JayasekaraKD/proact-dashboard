// src/components/dashboard/RelationshipModal.tsx
import React, { useState } from 'react';
import type { Relation } from '../../db/schema';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { Loader2 } from 'lucide-react';
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
            // Only include fields that exist in your database schema
            const updateFields = {
                short_name: data.shortName,
                customer_activity: data.customerActivity,
                name: data.name,
                telephone: data.telephone,
                email: data.email,
                street: data.street,
                house_number: data.houseNumber,
                postcode: data.postcode,
                place: data.place,
                land: data.land,
                website: data.website,
                kvk_number: data.kvkNumber,
                vat_number: data.vatNumber,
                is_customer: data.isCustomer,
                is_supplier: data.isSupplier
            };

            // Filter out undefined values
            const cleanedData = Object.fromEntries(
                Object.entries(updateFields).filter(([_, v]) => v !== undefined)
            );

            console.log('Sending update with filtered data:', { id, ...cleanedData });

            const response = await fetch('/api/relationships', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    ...cleanedData
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update relationship');
            }

            if (result.success) {
                window.location.reload();
            } else {
                throw new Error(result.error || 'Failed to update relationship');
            }
        } catch (error) {
            console.error('Error updating relationship:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

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