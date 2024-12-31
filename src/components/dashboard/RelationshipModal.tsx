import React from 'react';
import type { Relation } from '../../db/schema';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';

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
        { id: 'contacts', label: 'Contacts' },
        { id: 'discounts', label: 'Discounts' }
    ];

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="border-b p-4 flex justify-between items-center">
                        <Dialog.Title className="text-xl font-semibold">
                            {relation.name}
                        </Dialog.Title>
                        <Dialog.Close className="text-gray-500 hover:text-gray-700 text-2xl">
                            ×
                        </Dialog.Close>
                    </div>

                    <Tabs.Root defaultValue="organization">
                        <Tabs.List className="border-b flex gap-1 px-2">
                            {tabs.map(tab => (
                                <Tabs.Trigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-600 hover:text-gray-800"
                                >
                                    {tab.label}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>

                        {/* Content */}
                        <div className="p-6">
                            {/* Organization Information Tab */}
                            <Tabs.Content value="organization" className="space-y-6">
                                {/* Relationship Number and Type */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Relationship number:</div>
                                        <div>{relation.relationshipNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Type:</div>
                                        <div className="flex gap-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={relation.isCustomer}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                Customer
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={relation.isSupplier}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                Supplier
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Name and Short Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Name:</div>
                                        <div>{relation.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Short name:</div>
                                        <div>{relation.shortName}</div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Email:</div>
                                        <div>{relation.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Telephone:</div>
                                        <div>{relation.telephone}</div>
                                    </div>
                                </div>

                                {/* Website and KVK */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Website:</div>
                                        <div>{relation.website}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">KVK Number:</div>
                                        <div>{relation.kvkNumber}</div>
                                    </div>
                                </div>

                                {/* Transport Types */}
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Transport types:</div>
                                    <div className="grid grid-cols-2 gap-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={relation.isIntermodal}
                                                readOnly
                                                className="mr-2"
                                            />
                                            Intermodal
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={relation.isInternational}
                                                readOnly
                                                className="mr-2"
                                            />
                                            International
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={relation.isCityDistribution}
                                                readOnly
                                                className="mr-2"
                                            />
                                            City distribution
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={relation.isRegionalDistribution}
                                                readOnly
                                                className="mr-2"
                                            />
                                            Regional Distribution
                                        </label>
                                    </div>
                                </div>

                                {/* Customer Activity */}
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Customer activity:</div>
                                    <textarea
                                        readOnly
                                        value={relation.customerActivity || ''}
                                        className="w-full h-24 p-2 border rounded bg-gray-50"
                                    />
                                </div>
                            </Tabs.Content>

                            {/* Address Details Tab */}
                            <Tabs.Content value="address" className="grid grid-cols-3 gap-6">
                                {/* Regular Address */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Address</h3>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Street:</div>
                                        <div>{relation.street}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">House number:</div>
                                        <div>{relation.houseNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Postcode:</div>
                                        <div>{relation.postcode}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Place:</div>
                                        <div>{relation.place}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Land:</div>
                                        <div>{relation.land}</div>
                                    </div>
                                </div>

                                {/* Visiting Address */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Visiting address</h3>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Street:</div>
                                        <div>{relation.visitingStreet}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">House number:</div>
                                        <div>{relation.visitingHouseNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Postcode:</div>
                                        <div>{relation.visitingPostcode}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Place:</div>
                                        <div>{relation.visitingPlace}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Land:</div>
                                        <div>{relation.visitingLand}</div>
                                    </div>
                                </div>

                                {/* Mailing Address */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Mailing address</h3>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Street:</div>
                                        <div>{relation.mailingStreet}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">House number:</div>
                                        <div>{relation.mailingHouseNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Postcode:</div>
                                        <div>{relation.mailingPostcode}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Place:</div>
                                        <div>{relation.mailingPlace}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Land:</div>
                                        <div>{relation.mailingLand}</div>
                                    </div>
                                </div>
                            </Tabs.Content>

                            {/* Financial Data Tab */}
                            <Tabs.Content value="financial">
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-4">Financial Information</h3>
                                    <div className="text-center text-gray-500">
                                        Financial data content will be implemented here
                                    </div>
                                </div>
                            </Tabs.Content>

                            {/* Contacts Tab */}
                            <Tabs.Content value="contacts">
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                                    <div className="text-center text-gray-500">
                                        Contacts content will be implemented here
                                    </div>
                                </div>
                            </Tabs.Content>

                            {/* Discounts Tab */}
                            <Tabs.Content value="discounts">
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-4">Discount Information</h3>
                                    <div className="text-center text-gray-500">
                                        Discounts content will be implemented here
                                    </div>
                                </div>
                            </Tabs.Content>
                        </div>
                    </Tabs.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default RelationshipModal;