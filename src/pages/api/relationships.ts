// src/pages/api/relationships.ts
import type { APIRoute } from 'astro';
import { relationService } from '../../services/relationService';
import { insertRelationSchema } from '../../db/schema';

export const GET: APIRoute = async () => {
    try {
        const relations = await relationService.getAllRelations();
        return new Response(
            JSON.stringify({ data: relations }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'Internal server error'
            }),
            { status: 500 }
        );
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Validate request body
        const validData = insertRelationSchema.parse(body);

        const created = await relationService.createRelation(validData);

        return new Response(
            JSON.stringify({ data: created }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'Internal server error'
            }),
            { status: 500 }
        );
    }
};