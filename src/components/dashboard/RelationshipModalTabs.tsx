// RelationshipModalTabs.tsx
import React from 'react';
import type { Relation } from '../../db/schema';
import * as Tabs from '@radix-ui/react-tabs';
import RelationshipSecondaryTabs from './RelationshipSecondaryTabs';

interface RelationshipModalTabsProps {
    relation: Relation;
}

const RelationshipModalTabs: React.FC<RelationshipModalTabsProps> = ({ relation }) => {
    return (
        <>
            {/* Organization Information Tab */}
            <Tabs.Content value="organization" className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Basic Info */}
                    <div>
                        <label className="text-sm text-gray-600">Relationship number:</label>
                        <div className="mt-1 font-medium">REL-2024-{relation.id.slice(0, 4)}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Type:</label>
                        <div className="mt-1 flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" checked className="mr-2" /> Customer
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="mr-2" /> Supplier
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Short name:</label>
                        <div className="mt-1 font-medium">{relation.shortName}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Name:</label>
                        <div className="mt-1 font-medium">{relation.name}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Email:</label>
                        <div className="mt-1 font-medium">{relation.email}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Telephone:</label>
                        <div className="mt-1 font-medium">{relation.telephone}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Website:</label>
                        <div className="mt-1 font-medium">{relation.website}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">KVK Number:</label>
                        <div className="mt-1 font-medium">{relation.kvkNumber}</div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">VAT Number:</label>
                        <div className="mt-1 font-medium">{relation.vatNumber}</div>
                    </div>
                </div>

                {/* Transport Types */}
                <div>
                    <label className="text-sm text-gray-600">Transport types:</label>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="mr-2" /> Intermodal
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="mr-2" /> International
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="mr-2" /> City distribution
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="mr-2" /> Regional
                            </label>
                        </div>
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