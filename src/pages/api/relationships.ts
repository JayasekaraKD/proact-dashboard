// src/pages/api/relationships.ts
import type { APIRoute } from 'astro';
import { relationService } from '../../services/relationService';
import { insertRelationSchema } from '../../db/schema';
import { ZodError } from 'zod';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = insertRelationSchema.parse(body);

        // Create the relation
        const created = await relationService.createRelation(validatedData);

        return new Response(
            JSON.stringify({
                success: true,
                data: created
            }),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error creating relationship:', error);

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