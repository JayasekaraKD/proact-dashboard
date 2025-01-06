// src/components/dashboard/CreateRelationshipButton.tsx
import React, { useState } from 'react';
import CreateRelationshipForm from './CreateRelationshipForm';

const CreateRelationshipButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: any) => {
        try {
            console.log('Submitting data:', data);

            const response = await fetch('/api/relationships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseText = await response.text();
            console.log('Raw response:', responseText);

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response:', responseText);
                throw new Error('Invalid server response');
            }

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to create relationship');
            }

            console.log('Success:', responseData);
            window.location.reload();
        } catch (error) {
            console.error('Error details:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
            alert(`Failed to create relationship: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            />
        </>
    );
};

export default CreateRelationshipButton;