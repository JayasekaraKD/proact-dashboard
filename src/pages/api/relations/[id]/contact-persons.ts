// src/pages/api/relations/[id]/contact-persons.ts
import type { APIRoute } from 'astro';
import { contactPersonService } from '../../../../services/contactPersonService';

export const GET: APIRoute = async ({ params, request }) => {
    console.log('Contact persons API called with params:', params);

    try {
        const { id } = params;
        if (!id) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Relation ID is required'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        const contactPersons = await contactPersonService.getAllContactPersons(id);

        return new Response(
            JSON.stringify({
                success: true,
                data: contactPersons
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        );
    } catch (error) {
        console.error('Error in contact-persons API:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            params
        });

        return new Response(
            JSON.stringify({
                success: false,
                error: 'Failed to fetch contact persons',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
};