// src/db/types.ts
import type { relations, contactPersons, documents, notes } from './schema';

export type Relations = typeof relations.$inferSelect;
export type NewRelation = typeof relations.$inferInsert;

export type ContactPersons = typeof contactPersons.$inferSelect;
export type NewContactPerson = typeof contactPersons.$inferInsert;

export type Documents = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type Notes = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;

export interface Database {
    public: {
        Tables: {
            relations: {
                Row: Relations
                Insert: NewRelation
                Update: Partial<NewRelation>
            }
            contact_persons: {
                Row: ContactPersons
                Insert: NewContactPerson
                Update: Partial<NewContactPerson>
            }
            documents: {
                Row: Documents
                Insert: NewDocument
                Update: Partial<NewDocument>
            }
            notes: {
                Row: Notes
                Insert: NewNote
                Update: Partial<NewNote>
            }
        }
        Views: {
            // Add any views here if you have them in Supabase
        }
        Functions: {
            // Add any stored procedures/functions here if you have them in Supabase
        }
        Enums: {
            // Add any custom enums here if you have them in Supabase
        }
    }
}