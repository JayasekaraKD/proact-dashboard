import React from 'react';
import { useStore } from '@nanostores/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import type { CreateRelationshipFormProps, RelationshipFormData } from '../../types/relationship';
import { formState, formErrors, validateForm, resetForm } from '../../store/formStore';

const FORM_TABS = [
    { id: 'basic', label: 'Basic Information' },
    { id: 'address', label: 'Address' },
    { id: 'additional', label: 'Additional Info' }
] as const;

const CreateRelationshipForm: React.FC<CreateRelationshipFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    error,
    isSubmitting
}) => {
    const form = useStore(formState);
    const errors = useStore(formErrors);

    // First, let's update the handleChange function to ensure type safety:
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const fieldName = name as keyof RelationshipFormData;  // Type assertion here is safe because we control the field names

        formState.setKey(fieldName, type === 'checkbox' ? (e.target as HTMLInputElement).checked : value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await onSubmit(formState.get());
            resetForm();
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    };

    const renderFormFields = (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Short Name *
                    {errors.shortName && (
                        <span className="text-red-500 ml-1">{errors.shortName}</span>
                    )}
                </label>
                <input
                    type="text"
                    name="shortName"
                    required
                    value={form.shortName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Full Name *
                    {errors.name && (
                        <span className="text-red-500 ml-1">{errors.name}</span>
                    )}
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
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
                    value={form.telephone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                    {errors.email && (
                        <span className="text-red-500 ml-1">{errors.email}</span>
                    )}
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div className="col-span-2">
                <div className="flex gap-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="isCustomer"
                            checked={form.isCustomer}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Customer
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="isSupplier"
                            checked={form.isSupplier}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Supplier
                    </label>
                </div>
            </div>
        </div>
    );

    const renderAddressFields = (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">House Number</label>
                <input
                    type="text"
                    name="houseNumber"
                    value={form.houseNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <input
                    type="text"
                    name="postcode"
                    value={form.postcode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Land</label>
                <input
                    type="text"
                    name="land"
                    value={form.land}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
        </div>
    );

    const renderAdditionalFields = (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                        type="url"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        KVK Number
                        {errors.kvkNumber && (
                            <span className="text-red-500 ml-1">{errors.kvkNumber}</span>
                        )}
                    </label>
                    <input
                        type="text"
                        name="kvkNumber"
                        value={form.kvkNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">VAT Number</label>
                    <input
                        type="text"
                        name="vatNumber"
                        value={form.vatNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Customer Activity</label>
                <textarea
                    name="customerActivity"
                    value={form.customerActivity}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>
        </div>
    );

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-xl">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="px-6 py-4 bg-red-50 border-b border-red-100">
                                <p className="text-red-600 font-medium">Error</p>
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            </div>
                        )}

                        <div className="flex flex-col h-full max-h-[90vh]">
                            <div className="flex items-center justify-between px-6 py-4 border-b">
                                <Dialog.Title className="text-xl font-semibold">
                                    Create New Relationship
                                </Dialog.Title>
                                <Dialog.Close className="text-gray-500 hover:text-gray-700">
                                    <span className="material-icons">close</span>
                                </Dialog.Close>
                            </div>

                            <Tabs.Root defaultValue="basic" className="flex-1 flex flex-col min-h-0">
                                <Tabs.List className="flex gap-1 px-4 border-b bg-white">
                                    {FORM_TABS.map(tab => (
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
                                        {renderFormFields}
                                    </Tabs.Content>

                                    <Tabs.Content value="address" className="space-y-6">
                                        {renderAddressFields}
                                    </Tabs.Content>

                                    <Tabs.Content value="additional" className="space-y-6">
                                        {renderAdditionalFields}
                                    </Tabs.Content>
                                </div>
                            </Tabs.Root>

                            <div className="flex justify-end gap-3 px-6 py-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        onClose();
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-icons animate-spin">refresh</span>
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Relationship'
                                    )}
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