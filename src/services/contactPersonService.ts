// services/contactPersonService.ts
import { db } from '../db';
import { contactPersons } from '../db/schema';
import type { ContactPerson, NewContactPerson } from '../db/schema';
import { eq } from 'drizzle-orm';

export const contactPersonService = {
    async getAllContactPersons(relationId: string): Promise<ContactPerson[]> {
        try {
            return await db
                .select()
                .from(contactPersons)
                .where(eq(contactPersons.relationId, relationId));
        } catch (error) {
            console.error('Error fetching contact persons:', error);
            throw error;
        }
    },

    async getContactPersonById(id: string): Promise<ContactPerson | null> {
        try {
            const result = await db
                .select()
                .from(contactPersons)
                .where(eq(contactPersons.id, id))
                .limit(1);
            return result[0] || null;
        } catch (error) {
            console.error('Error fetching contact person:', error);
            throw error;
        }
    },

    async createContactPerson(contactPerson: NewContactPerson): Promise<ContactPerson> {
        try {
            const result = await db
                .insert(contactPersons)
                .values(contactPerson)
                .returning();
            return result[0];
        } catch (error) {
            console.error('Error creating contact person:', error);
            throw error;
        }
    },

    async updateContactPerson(id: string, contactPerson: Partial<NewContactPerson>): Promise<ContactPerson> {
        try {
            const result = await db
                .update(contactPersons)
                .set(contactPerson)
                .where(eq(contactPersons.id, id))
                .returning();
            return result[0];
        } catch (error) {
            console.error('Error updating contact person:', error);
            throw error;
        }
    },

    async deleteContactPerson(id: string): Promise<void> {
        try {
            await db
                .delete(contactPersons)
                .where(eq(contactPersons.id, id));
        } catch (error) {
            console.error('Error deleting contact person:', error);
            throw error;
        }
    }
};
