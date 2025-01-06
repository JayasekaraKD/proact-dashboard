// RelationshipSecondaryTabs.tsx
import React, { useEffect, useState } from 'react';
import type { Relation, ContactPerson, Document, Note } from '../../db/schema';
import * as Tabs from '@radix-ui/react-tabs';

interface RelationshipSecondaryTabsProps {
    relation: Relation;
}

interface RelatedData {
    contactPersons: ContactPerson[];
    documents: Document[];
    notes: Note[];
    loading: {
        contacts: boolean;
        documents: boolean;
        notes: boolean;
    };
    error: {
        contacts: string | null;
        documents: string | null;
        notes: string | null;
    };
}

const RelationshipSecondaryTabs: React.FC<RelationshipSecondaryTabsProps> = ({ relation }) => {
    const [data, setData] = useState<RelatedData>({
        contactPersons: [],
        documents: [],
        notes: [],
        loading: {
            contacts: true,
            documents: true,
            notes: true
        },
        error: {
            contacts: null,
            documents: null,
            notes: null
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!relation.id) return;

            try {
                // Fetch contact persons
                const contactsRes = await fetch(`/api/relations/${relation.id}/contact-persons`);
                const contactsData = await contactsRes.json();

                if (!contactsRes.ok) throw new Error(contactsData.error || 'Failed to fetch contacts');

                // Fetch documents
                const documentsRes = await fetch(`/api/relations/${relation.id}/documents`);
                const documentsData = await documentsRes.json();

                if (!documentsRes.ok) throw new Error(documentsData.error || 'Failed to fetch documents');

                // Fetch notes
                const notesRes = await fetch(`/api/relations/${relation.id}/notes`);
                const notesData = await notesRes.json();

                if (!notesRes.ok) throw new Error(notesData.error || 'Failed to fetch notes');

                setData({
                    contactPersons: contactsData.data,
                    documents: documentsData.data,
                    notes: notesData.data,
                    loading: {
                        contacts: false,
                        documents: false,
                        notes: false
                    },
                    error: {
                        contacts: null,
                        documents: null,
                        notes: null
                    }
                });
            } catch (error) {
                console.error('Error fetching related data:', error);
                setData(prev => ({
                    ...prev,
                    loading: {
                        contacts: false,
                        documents: false,
                        notes: false
                    },
                    error: {
                        contacts: error instanceof Error ? error.message : 'Failed to load data',
                        documents: error instanceof Error ? error.message : 'Failed to load data',
                        notes: error instanceof Error ? error.message : 'Failed to load data'
                    }
                }));
            }
        };

        fetchData();
    }, [relation.id]);

    return (
        <>
            {/* Contact Persons Tab */}
            <Tabs.Content value="contacts" className="space-y-6">
                {data.loading.contacts ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="material-icons animate-spin mr-2">refresh</span>
                        Loading contacts...
                    </div>
                ) : data.error.contacts ? (
                    <div className="text-red-500 py-4">{data.error.contacts}</div>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Contact Persons</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                + Add Contact Person
                            </button>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th> */}
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.contactPersons.map(person => (
                                        <tr key={person.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{person.position}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{person.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{person.phone}</td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap">{person.department}</td> */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <span className="material-icons">edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </Tabs.Content>
            {/* Documents Tab */}
            <Tabs.Content value="documents" className="space-y-6">
                {/* Similar structure to contacts tab, but for documents */}
                {data.loading.documents ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="material-icons animate-spin mr-2">refresh</span>
                        Loading documents...
                    </div>
                ) : data.error.documents ? (
                    <div className="text-red-500 py-4">{data.error.documents}</div>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Documents</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                + Upload Document
                            </button>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* Keep your existing table structure */}
                                <thead className="bg-gray-50">
                                    {/* ... your existing header ... */}
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.documents.map(doc => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{doc.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{doc.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(doc.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {doc.size ? `${Math.round(doc.size / 1024)} KB` : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-blue-600 hover:text-blue-800 mr-2">
                                                    <span className="material-icons">download</span>
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <span className="material-icons">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </Tabs.Content>

            {/* Notes Tab */}
            <Tabs.Content value="notes" className="space-y-6">
                {data.loading.notes ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="material-icons animate-spin mr-2">refresh</span>
                        Loading notes...
                    </div>
                ) : data.error.notes ? (
                    <div className="text-red-500 py-4">{data.error.notes}</div>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Notes</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                + Add Note
                            </button>
                        </div>
                        <div className="space-y-4">
                            {data.notes.map(note => (
                                <div key={note.id} className="border rounded-lg p-4 bg-white">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium">{note.title}</h4>
                                            <p className="text-sm text-gray-500">
                                                {new Date(note.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <span className="material-icons">more_vert</span>
                                        </button>
                                    </div>
                                    <p className="text-gray-600">{note.content}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Tabs.Content>
        </>
    );
};

export default RelationshipSecondaryTabs;