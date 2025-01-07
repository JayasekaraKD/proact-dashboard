// src/pages/api/relationships/[id].ts
import type { APIRoute } from 'astro';
import { relationService } from '../../../services/relationService';
import { insertRelationSchema } from '../../../db/schema';
import { ZodError } from 'astro/zod';

export const GET: APIRoute = async ({ params }) => {
    try {
        const { id } = params;
        if (!id) {
            return new Response(
                JSON.stringify({ error: 'Relationship ID is required' }),
                { status: 400 }
            );
        }

        const relation = await relationService.getRelationById(id);
        if (!relation) {
            return new Response(
                JSON.stringify({ error: 'Relationship not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ data: relation }),
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

export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        if (!id) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Relationship ID is required'
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        const body = await request.json();

        // Validate the update data using the partial schema
        // This allows partial updates while still enforcing field-level validation
        const validatedData = insertRelationSchema.partial().parse(body);

        // Update the relation
        const updated = await relationService.updateRelation(id, validatedData);

        return new Response(
            JSON.stringify({
                success: true,
                data: updated
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error updating relationship:', error);

        if (error instanceof ZodError) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Validation failed',
                    details: error.errors
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error'
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

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const { id } = params;
        if (!id) {
            return new Response(
                JSON.stringify({ error: 'Relationship ID is required' }),
                { status: 400 }
            );
        }

        await relationService.deleteRelation(id);
        return new Response(
            JSON.stringify({ success: true }),
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