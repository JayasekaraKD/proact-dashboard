// src/pages/api/relations/[id]/contact-persons.ts
import type { APIRoute } from 'astro';
import { contactPersonService } from '../../../../services/contactPersonService';

export const GET: APIRoute = async ({ params }) => {
    try {
        const { id } = params;
        if (!id) {
            return new Response(
                JSON.stringify({
                    error: 'Relation ID is required'
                }),
                { status: 400 }
            );
        }

        const contactPersons = await contactPersonService.getAllContactPersons(id);

        return new Response(
            JSON.stringify({ data: contactPersons }),
            { status: 200 }
        );
    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'An error occurred'
            }),
            { status: 500 }
        );
    }
};