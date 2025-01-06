// src/services/documentService.ts
import { db } from '../db';
import { documents } from '../db/schema';
import type { Document } from '../db/schema';
import { eq } from 'drizzle-orm';

export const documentService = {
    async getAllDocuments(relationId: string): Promise<Document[]> {
        try {
            return await db
                .select()
                .from(documents)
                .where(eq(documents.relationId, relationId))
                .orderBy(documents.createdAt);
        } catch (error) {
            console.error('Error in getAllDocuments:', error);
            throw new Error('Failed to fetch documents');
        }
    }
};