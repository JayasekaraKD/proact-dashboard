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

    async getRelationById(id: string): Promise<Relation | null> {
        try {
            const result = await db
                .select()
                .from(relations)
                .where(eq(relations.id, id))
                .limit(1);
            return result[0] || null;
        } catch (error) {
            console.error('Error fetching relation:', error);
            throw error;
        }
    },

    async createRelation(relation: NewRelation): Promise<Relation> {
        try {
            const result = await db
                .insert(relations)
                .values(relation)
                .returning();
            return result[0];
        } catch (error) {
            console.error('Error creating relation:', error);
            throw error;
        }
    },

    async updateRelation(id: string, relation: Partial<NewRelation>): Promise<Relation> {
        try {
            const result = await db
                .update(relations)
                .set(relation)
                .where(eq(relations.id, id))
                .returning();
            return result[0];
        } catch (error) {
            console.error('Error updating relation:', error);
            throw error;
        }
    },

    async deleteRelation(id: string): Promise<void> {
        try {
            await db
                .delete(relations)
                .where(eq(relations.id, id));
        } catch (error) {
            console.error('Error deleting relation:', error);
            throw error;
        }
    }
};