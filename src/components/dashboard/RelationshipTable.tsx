// src/components/dashboard/RelationshipTable.tsx
import React from 'react';
import type { Relationship } from '../../data/dummy';

interface Props {
    data: Relationship[];
}

export default function RelationshipTable({ data }: Props) {
    return (
        <div className="bg-white rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Short Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Telephone
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Street
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            House No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Postcode
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Place
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Land
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            E-mail
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">{item.shortName}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.telephone}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.street}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.houseNumber}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.postcode}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.place}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.land}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{item.email}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-right space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">View</button>
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-50 border-t">
                <span className="text-sm text-gray-700">
                    Showing {data.length} of {data.length} relationships
                </span>
            </div>
        </div>
    );
}