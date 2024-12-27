// src/components/dashboard/RelationshipTable.tsx
import React from 'react';
import type { Relationship } from '../../data/dummy';

interface Props {
    data: Relationship[];
}

export default function RelationshipTable({ data }: Props) {
    return (
        <div className="bg-white">


            {/* Table */}
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
                            <th className="py-4 px-4 text-left text-sm font-semibold text-[#1e518b] uppercase">
                                Preview
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
                                    <button className="text-[#1e518b] group-hover:text-white">
                                        <span className="material-icons">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}