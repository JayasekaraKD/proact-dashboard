// src/services/relationService.ts
import { db, supabase, handleSupabaseResponse } from '../db';
import { relations } from '../db/schema';
import type { Relation, NewRelation } from '../db/schema';
import { eq } from 'drizzle-orm';

export const relationService = {
    async getAllRelations(): Promise<Relation[]> {
        try {
            // Using Drizzle for complex queries
            return await db
                .select()
                .from(relations)
                .orderBy(relations.createdAt);
        } catch (error) {
            console.error('Error fetching relations:', error);
            throw error;
        }
    },

    async getRelationById(id: string): Promise<Relation | null> {
        try {
            // Using Supabase for simple queries with RLS
            const response = await supabase
                .from('relations')
                .select('*')
                .eq('id', id)
                .single();

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error fetching relation:', error);
            throw error;
        }
    },

    async createRelation(relation: NewRelation): Promise<Relation> {
        try {
            // Using Drizzle for inserts
            const result = await db
                .insert(relations)
                .values(relation)
                .returning();

            if (!result || result.length === 0) {
                throw new Error('No relation was created');
            }

            return result[0];
        } catch (error) {
            console.error('Error creating relation:', error);
            throw error;
        }
    },

    async updateRelation(id: string, updates: Partial<Relation>): Promise<Relation> {
        try {
            // Using Supabase for updates with RLS
            const response = await supabase
                .from('relations')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error updating relation:', error);
            throw error;
        }
    },

    async deleteRelation(id: string): Promise<void> {
        try {
            // Using Supabase for deletes with RLS
            const response = await supabase
                .from('relations')
                .delete()
                .eq('id', id);

            handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error deleting relation:', error);
            throw error;
        }
    },

    // Real-time subscription setup
    subscribeToRelations(callback: (payload: any) => void) {
        return supabase
            .channel('relations_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'relations'
                },
                callback
            )
            .subscribe();
    }
};