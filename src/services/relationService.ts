// src/services/relationService.ts
import { db } from '../db';
import { relations } from '../db/schema';
import type { Relation, NewRelation } from '../db/schema';
import { eq } from 'drizzle-orm';

export const relationService = {
    async getAllRelations(): Promise<Relation[]> {
        try {
            return await db.select().from(relations);
        } catch (error) {
            console.error('Error fetching relations:', error);
            throw error;
        }
    },

    async createRelation(relation: NewRelation): Promise<Relation> {
        try {
            console.log('Creating relation with data:', relation);
            const result = await db
                .insert(relations)
                .values(relation)
                .returning();

            console.log('Creation result:', result);

            if (!result || result.length === 0) {
                throw new Error('No relation was created');
            }

            return result[0];
        } catch (error) {
            console.error('Error creating relation:', error);
            throw error;
        }
    }
};