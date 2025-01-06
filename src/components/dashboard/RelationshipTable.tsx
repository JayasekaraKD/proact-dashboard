// src/components/dashboard/RelationshipTable.tsx
import React, { useState } from 'react';
import type { Relation } from '../../db/schema';
import RelationshipModal from './RelationshipModal';
import { Eye, Edit } from 'lucide-react';

interface Props {
    data: Relation[];
}

export default function RelationshipTable({ data }: Props) {
    const [selectedRelation, setSelectedRelation] = useState<Relation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

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

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedRelation(null);
        setIsEditMode(false);
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <RelationshipModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                relation={selectedRelation}
                isEditMode={isEditMode}
            />
        </div>
    );
}