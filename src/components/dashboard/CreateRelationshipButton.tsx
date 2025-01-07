// src/components/dashboard/CreateRelationshipButton.tsx
import React, { useState } from 'react';
import CreateRelationshipForm from './CreateRelationshipForm';
import type { RelationshipFormData } from '../../types/relationship';

const CreateRelationshipButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: RelationshipFormData) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const response = await fetch('/api/relationships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shortName: data.shortName,
                    name: data.name,
                    telephone: data.telephone || null,
                    email: data.email || null,
                    website: data.website || null,
                    kvkNumber: data.kvkNumber || null,
                    vatNumber: data.vatNumber || null,
                    street: data.street || null,
                    houseNumber: data.houseNumber || null,
                    postcode: data.postcode || null,
                    place: data.place || null,
                    land: data.land || null,
                    isCustomer: data.isCustomer,
                    isSupplier: data.isSupplier,
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.error ||
                    (responseData.details && JSON.stringify(responseData.details)) ||
                    'Failed to create relationship'
                );
            }

            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error creating relationship:', error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => {
                    setError(null);
                    setIsOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
                + CREATE NEW RELATIONSHIP
            </button>
            <CreateRelationshipForm
                isOpen={isOpen}
                onClose={() => {
                    setError(null);
                    setIsOpen(false);
                }}
                onSubmit={handleSubmit}
                error={error}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default CreateRelationshipButton;