// src/services/contactPersonService.ts
import { db, supabase, handleSupabaseResponse } from '../db';
import { contactPersons } from '../db/schema';
import type { ContactPerson, NewContactPerson } from '../db/schema';
import { eq } from 'drizzle-orm';

export const contactPersonService = {
    async getAllContactPersons(relationId: string): Promise<ContactPerson[]> {
        try {
            // Using Drizzle for complex queries
            return await db
                .select()
                .from(contactPersons)
                .where(eq(contactPersons.relationId, relationId))
                .orderBy(contactPersons.createdAt);
        } catch (error) {
            console.error('Error fetching contact persons:', error);
            throw error;
        }
    },

    async getContactPersonById(id: string): Promise<ContactPerson | null> {
        try {
            // Using Supabase for simple queries
            const response = await supabase
                .from('contact_persons')
                .select('*')
                .eq('id', id)
                .single();

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error fetching contact person:', error);
            throw error;
        }
    },

    async createContactPerson(contactPerson: NewContactPerson): Promise<ContactPerson> {
        try {
            const response = await supabase
                .from('contact_persons')
                .insert(contactPerson)
                .select()
                .single();

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error creating contact person:', error);
            throw error;
        }
    },

    async updateContactPerson(
        id: string,
        updates: Partial<ContactPerson>
    ): Promise<ContactPerson> {
        try {
            const response = await supabase
                .from('contact_persons')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error updating contact person:', error);
            throw error;
        }
    },

    async deleteContactPerson(id: string): Promise<void> {
        try {
            const response = await supabase
                .from('contact_persons')
                .delete()
                .eq('id', id);

            handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error deleting contact person:', error);
            throw error;
        }
    },

    // Real-time subscription
    subscribeToContactPersons(
        relationId: string,
        callback: (payload: any) => void
    ) {
        return supabase
            .channel('contact_persons_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'contact_persons',
                    filter: `relation_id=eq.${relationId}`
                },
                callback
            )
            .subscribe();
    }
};