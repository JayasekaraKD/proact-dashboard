import React, { useState, useEffect } from 'react';
import type { Relation } from '../../db/schema';
import * as Tabs from '@radix-ui/react-tabs';
import { Edit2, Save, X } from 'lucide-react';
import RelationshipSecondaryTabs from './RelationshipSecondaryTabs';

interface RelationshipModalTabsProps {
    relation: Relation;
    onUpdate: (id: string, data: Partial<Relation>) => Promise<void>;
    isEditMode: boolean;
    isUpdating: boolean;
}

const RelationshipModalTabs: React.FC<RelationshipModalTabsProps> = ({
    relation,
    onUpdate,
    isEditMode,
    isUpdating
}) => {
    const [isEditing, setIsEditing] = useState(isEditMode);
    const [formData, setFormData] = useState<Relation>(relation);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsEditing(isEditMode);
    }, [isEditMode]);

    useEffect(() => {
        setFormData(relation);
    }, [relation]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSave = async () => {
        try {
            await onUpdate(relation.id, formData);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update relationship');
        }
    };

    const handleCancel = () => {
        setFormData(relation);
        setIsEditing(false);
        setError(null);
    };

    return (
        <>
            {/* Organization Information Tab */}
            <Tabs.Content value="organization" className="space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md">
                        {error}
                    </div>
                )}

                {/* Edit Controls */}
                <div className="flex justify-end gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                disabled={isUpdating}
                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="flex items-center gap-2 px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                            <Edit2 size={16} />
                            Edit
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Short name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="shortName"
                                value={formData.shortName || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.shortName}</div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.name}</div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.email}</div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Telephone:</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.telephone}</div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Website:</label>
                        {isEditing ? (
                            <input
                                type="url"
                                name="website"
                                value={formData.website || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.website}</div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">KVK Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="kvkNumber"
                                value={formData.kvkNumber || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.kvkNumber}</div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Type:</label>
                        <div className="mt-1 flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="isCustomer"
                                    checked={!!formData.isCustomer}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="mr-2"
                                />
                                Customer
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="isSupplier"
                                    checked={!!formData.isSupplier}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="mr-2"
                                />
                                Supplier
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">VAT Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="vatNumber"
                                value={formData.vatNumber || ''}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <div className="mt-1 font-medium">{relation.vatNumber}</div>
                        )}
                    </div>
                </div>

                {/* Customer Activity */}
                <div>
                    <label className="text-sm text-gray-600">Customer activity:</label>
                    <textarea
                        className="mt-1 w-full p-2 border rounded-md h-24 bg-gray-50"
                        placeholder="Describe customer activity..."
                        defaultValue="Leading technology solutions provider specializing in software development and IT consulting."
                    />
                </div>
            </Tabs.Content>

            {/* Address Details Tab */}
            <Tabs.Content value="address" className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                    {/* Regular Address */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Address</h3>
                        <div>
                            <label className="text-sm text-gray-600">Street:</label>
                            <div className="mt-1">{relation.street}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">House number:</label>
                            <div className="mt-1">{relation.houseNumber}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Postcode:</label>
                            <div className="mt-1">{relation.postcode}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Place:</label>
                            <div className="mt-1">{relation.place}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Land:</label>
                            <div className="mt-1">{relation.land}</div>
                        </div>
                    </div>

                    {/* Visiting Address */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Visiting address</h3>
                        <div>
                            <label className="text-sm text-gray-600">Street:</label>
                            <div className="mt-1">{relation.visitingStreet || relation.street}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">House number:</label>
                            <div className="mt-1">{relation.visitingHouseNumber}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Postcode:</label>
                            <div className="mt-1">{relation.visitingPostcode}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Place:</label>
                            <div className="mt-1">{relation.visitingPlace}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Land:</label>
                            <div className="mt-1">{relation.visitingLand}</div>
                        </div>                    </div>

                    {/* Postal Address */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Postal address</h3>
                        <div>
                            <label className="text-sm text-gray-600">Street:</label>
                            <div className="mt-1">{relation.mailingStreet || relation.street}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">House number:</label>
                            <div className="mt-1">{relation.mailingHouseNumber}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Postcode:</label>
                            <div className="mt-1">{relation.mailingPostcode}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Place:</label>
                            <div className="mt-1">{relation.mailingPlace}</div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Land:</label>
                            <div className="mt-1">{relation.mailingLand}</div>
                        </div>
                    </div>
                </div>
            </Tabs.Content>

            {/* Financial Data Tab */}
            <Tabs.Content value="financial" className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Bank account:</label>
                        <div className="mt-1 font-medium">{relation.bankAccount}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Payment term:</label>
                        <div className="mt-1 font-medium">{relation.paymentTerm}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Credit limit:</label>
                        <div className="mt-1 font-medium">{relation.creditLimit}</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Invoice method:</label>
                        <div className="mt-1 font-medium">{relation.invoiceMethod}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Currency:</label>
                        <div className="mt-1 font-medium">{relation.currency}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Language:</label>
                        <div className="mt-1 font-medium">{relation.languageCorrespondence}</div>
                    </div>
                </div>

                <div>
                    <label className="text-sm text-gray-600">Financial notes:</label>
                    <textarea
                        className="mt-1 w-full p-2 border rounded-md h-24 bg-gray-50"
                        placeholder="Add financial notes..."
                    />
                </div>
            </Tabs.Content>
            <RelationshipSecondaryTabs relation={relation} />

        </>
    );
};

export default RelationshipModalTabs;