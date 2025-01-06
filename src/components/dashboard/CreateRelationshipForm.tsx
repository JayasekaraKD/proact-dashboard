import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';

interface CreateRelationshipFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const CreateRelationshipForm: React.FC<CreateRelationshipFormProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [formData, setFormData] = useState({
        shortName: '',
        name: '',
        telephone: '',
        email: '',
        website: '',
        kvkNumber: '',
        vatNumber: '',
        street: '',
        houseNumber: '',
        postcode: '',
        place: '',
        land: '',
        isCustomer: false,
        isSupplier: false,
        customerActivity: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const tabs = [
        { id: 'basic', label: 'Basic Information' },
        { id: 'address', label: 'Address' },
        { id: 'additional', label: 'Additional Info' }
    ];

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col h-full max-h-[90vh]">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b">
                                <Dialog.Title className="text-xl font-semibold">
                                    Create New Relationship
                                </Dialog.Title>
                                <Dialog.Close className="text-gray-500 hover:text-gray-700">
                                    <span className="material-icons">close</span>
                                </Dialog.Close>
                            </div>

                            {/* Content */}
                            <Tabs.Root defaultValue="basic" className="flex-1 flex flex-col min-h-0">
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

                                <div className="flex-1 overflow-y-auto p-6">
                                    <Tabs.Content value="basic" className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Short Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shortName"
                                                    required
                                                    value={formData.shortName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Telephone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="telephone"
                                                    value={formData.telephone}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex gap-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="isCustomer"
                                                        checked={formData.isCustomer}
                                                        onChange={handleChange}
                                                        className="mr-2"
                                                    />
                                                    Customer
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="isSupplier"
                                                        checked={formData.isSupplier}
                                                        onChange={handleChange}
                                                        className="mr-2"
                                                    />
                                                    Supplier
                                                </label>
                                            </div>
                                        </div>
                                    </Tabs.Content>

                                    <Tabs.Content value="address" className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Street
                                                </label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    House Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="houseNumber"
                                                    value={formData.houseNumber}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Postcode
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postcode"
                                                    value={formData.postcode}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Place
                                                </label>
                                                <input
                                                    type="text"
                                                    name="place"
                                                    value={formData.place}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Land
                                                </label>
                                                <input
                                                    type="text"
                                                    name="land"
                                                    value={formData.land}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                        </div>
                                    </Tabs.Content>

                                    <Tabs.Content value="additional" className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Website
                                                </label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    KVK Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="kvkNumber"
                                                    value={formData.kvkNumber}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    VAT Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="vatNumber"
                                                    value={formData.vatNumber}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Customer Activity
                                            </label>
                                            <textarea
                                                name="customerActivity"
                                                value={formData.customerActivity}
                                                onChange={handleChange}
                                                rows={4}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                    </Tabs.Content>
                                </div>
                            </Tabs.Root>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                >
                                    Create Relationship
                                </button>
                            </div>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreateRelationshipForm;