// src/services/documentService.ts
import { db, supabase, handleSupabaseResponse } from '../db';
import { documents } from '../db/schema';
import type { Document, NewDocument } from '../db/schema';
import { eq } from 'drizzle-orm';

export const documentService = {
    async getAllDocuments(relationId: string): Promise<Document[]> {
        try {
            const response = await supabase
                .from('documents')
                .select('*')
                .eq('relation_id', relationId)
                .order('created_at', { ascending: false });

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    },

    async uploadDocument(
        file: File,
        documentData: Omit<NewDocument, 'path'>
    ): Promise<Document> {
        try {
            // 1. Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const filePath = `documents/${documentData.relationId}/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase
                .storage
                .from('documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Create document record
            const newDocument: NewDocument = {
                ...documentData,
                path: filePath,
                size: file.size,
                mimeType: file.type
            };

            const response = await supabase
                .from('documents')
                .insert(newDocument)
                .select()
                .single();

            return handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error uploading document:', error);
            throw error;
        }
    },

    async deleteDocument(id: string): Promise<void> {
        try {
            // 1. Get document to find storage path
            const { data: document } = await supabase
                .from('documents')
                .select('path')
                .eq('id', id)
                .single();

            if (!document) throw new Error('Document not found');

            // 2. Delete from storage
            const { error: storageError } = await supabase
                .storage
                .from('documents')
                .remove([document.path]);

            if (storageError) throw storageError;

            // 3. Delete record
            const response = await supabase
                .from('documents')
                .delete()
                .eq('id', id);

            handleSupabaseResponse(response);
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    },

    // Get download URL
    async getDocumentUrl(path: string): Promise<string> {
        const { data } = await supabase
            .storage
            .from('documents')
            .createSignedUrl(path, 3600); // 1 hour expiry

        if (!data?.signedUrl) {
            throw new Error('Could not generate download URL');
        }

        return data.signedUrl;
    },

    // Real-time subscription
    subscribeToDocuments(
        relationId: string,
        callback: (payload: any) => void
    ) {
        return supabase
            .channel('documents_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'documents',
                    filter: `relation_id=eq.${relationId}`
                },
                callback
            )
            .subscribe();
    }
};