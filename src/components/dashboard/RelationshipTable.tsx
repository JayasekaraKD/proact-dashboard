import React, { useState } from 'react';
import type { Relation } from '../../db/schema';
import RelationshipModal from './RelationshipModal';
import { Eye, Edit, Trash2, Loader2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface Props {
    data: Relation[];
}

export default function RelationshipTable({ data }: Props) {
    const [selectedRelation, setSelectedRelation] = useState<Relation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleView = (relation: Relation) => {
        setSelectedRelation(relation);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (relation: Relation) => {
        setSelectedRelation(relation);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (relation: Relation) => {
        setSelectedRelation(relation);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedRelation) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            const response = await fetch(`/api/relationships`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedRelation.id })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete relationship');
            }

            // Refresh the page to show updated data
            window.location.reload();
        } catch (error) {
            console.error('Error deleting relationship:', error);
            setDeleteError(error instanceof Error ? error.message : 'Failed to delete relationship');
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
        }
    };
    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-white border-b">
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Short Name
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Telephone
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Street
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                House Number
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Postcode
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Place
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Land
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                E-Mail
                            </th>
                            <th className="py-4 px-4 text-right text-sm font-semibold text-[#1e518b] uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`${index % 2 === 0 ? 'bg-[#f8f9fa]' : 'bg-white'
                                    } hover:bg-[#00c07f] hover:text-white group`}
                            >
                                <td className="px-4 py-3.5 text-sm text-[#1e518b] group-hover:text-white">
                                    {item.shortName}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-gray-900 group-hover:text-white">
                                    {item.telephone}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-[#1e518b] group-hover:text-white">
                                    {item.street}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-gray-900 group-hover:text-white">
                                    {item.houseNumber}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-gray-900 group-hover:text-white">
                                    {item.postcode}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-[#1e518b] group-hover:text-white">
                                    {item.place}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-[#1e518b] group-hover:text-white">
                                    {item.land}
                                </td>
                                <td className="px-4 py-3.5 text-sm text-[#1e518b] group-hover:text-white">
                                    {item.email}
                                </td>
                                <td className="px-4 py-3.5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="text-[#1e518b] group-hover:text-white p-1 rounded-full hover:bg-[#1e518b]/10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleView(item);
                                            }}
                                            title="View details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-[#1e518b] group-hover:text-white p-1 rounded-full hover:bg-[#1e518b]/10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(item);
                                            }}
                                            title="Edit relationship"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-red-600 group-hover:text-white p-1 rounded-full hover:bg-red-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(item);
                                            }}
                                            title="Delete relationship"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog.Root open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                        <Dialog.Title className="text-xl font-semibold mb-4">
                            Delete Relationship
                        </Dialog.Title>
                        <div className="mb-6">
                            Are you sure you want to delete the relationship with {selectedRelation?.name}?
                            This action cannot be undone.
                        </div>
                        {deleteError && (
                            <div className="text-red-600 text-sm mb-4">
                                {deleteError}
                            </div>
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteDialogOpen(false)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                            >
                                {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Relationship Modal */}
            <RelationshipModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedRelation(null);
                    setIsEditMode(false);
                }}
                relation={selectedRelation}
                isEditMode={isEditMode}
            />
        </div>
    );
}