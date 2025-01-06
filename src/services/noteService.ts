// src/services/noteService.ts
import { db } from '../db';
import { notes } from '../db/schema';
import type { Note } from '../db/schema';
import { eq } from 'drizzle-orm';

export const noteService = {
    async getAllNotes(relationId: string): Promise<Note[]> {
        try {
            return await db
                .select()
                .from(notes)
                .where(eq(notes.relationId, relationId))
                .orderBy(notes.createdAt);
        } catch (error) {
            console.error('Error in getAllNotes:', error);
            throw new Error('Failed to fetch notes');
        }
    }
};