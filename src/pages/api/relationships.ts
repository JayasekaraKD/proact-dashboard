// src/pages/api/relationships.ts
import type { APIRoute } from 'astro';
import { relationService } from '../../services/relationService';
import { v4 as uuidv4 } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        console.log('Received data:', data);

        const newRelationData = {
            id: uuidv4(),
            ...data,
            status: 'active',
            relationshipNumber: `REL-${Date.now().toString().slice(-4)}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const newRelation = await relationService.createRelation(newRelationData);

        return new Response(
            JSON.stringify({ success: true, data: newRelation }),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
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

export const PUT: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        console.log('Received update data:', data);

        if (!data.id) {
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

        const { id, ...updateData } = data;
        const updatedRelation = await relationService.updateRelation(id, updateData);

        return new Response(
            JSON.stringify({
                success: true,
                data: updatedRelation
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
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