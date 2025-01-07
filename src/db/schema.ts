// src/db/schema.ts
import { pgTable, text, timestamp, uuid, boolean, integer, decimal, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Renamed from 'relations' to 'relationTable' to avoid conflict
export const relationTable = pgTable('relations', {
    id: uuid('id').primaryKey(),
    shortName: text('short_name'),
    relationshipNumber: text('relationship_number'),
    name: text('name'),
    telephone: text('telephone'),
    street: text('street'),
    houseNumber: text('house_number'),
    postcode: text('postcode'),
    place: text('place'),
    land: text('land'),
    email: text('email'),
    website: text('website'),
    kvkNumber: text('kvk_number'),
    vatNumber: text('vat_number'),
    languageCorrespondence: text('language'),
    isCustomer: boolean('is_customer'),
    isSupplier: boolean('is_supplier'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    // ... other fields remain the same
});

export const contactPersons = pgTable('contact_persons', {
    id: uuid('id').primaryKey(),
    relationId: uuid('relation_id').notNull().references(() => relationTable.id),
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    position: text('position'),
    isMainContact: boolean('is_main_contact').default(false),
    department: text('department'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const documents = pgTable('documents', {
    id: uuid('id').primaryKey(),
    relationId: uuid('relation_id').notNull().references(() => relationTable.id),
    name: text('name').notNull(),
    type: text('type').notNull(),
    path: text('path').notNull(),
    size: integer('size'),
    mimeType: text('mime_type'),
    description: text('description'),
    uploadedBy: uuid('uploaded_by'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const notes = pgTable('notes', {
    id: uuid('id').primaryKey(),
    relationId: uuid('relation_id').notNull().references(() => relationTable.id),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdBy: uuid('created_by'),
    isPrivate: boolean('is_private').default(false),
    category: text('category'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Define relations between tables - using the renamed table
export const relationRelations = relations(relationTable, ({ many }) => ({
    contactPersons: many(contactPersons),
    documents: many(documents),
    notes: many(notes),
}));

export const contactPersonRelations = relations(contactPersons, ({ one }) => ({
    relation: one(relationTable, {
        fields: [contactPersons.relationId],
        references: [relationTable.id],
    }),
}));

export const documentRelations = relations(documents, ({ one }) => ({
    relation: one(relationTable, {
        fields: [documents.relationId],
        references: [relationTable.id],
    }),
}));

export const noteRelations = relations(notes, ({ one }) => ({
    relation: one(relationTable, {
        fields: [notes.relationId],
        references: [relationTable.id],
    }),
}));

// Create Zod schemas for validation
export const insertRelationSchema = createInsertSchema(relationTable).extend({
    email: z.string().email().optional(),
    website: z.string().url().optional(),
    kvkNumber: z.string().min(8).max(8).optional(),
    vatNumber: z.string().regex(/^[A-Z]{2}[0-9A-Z]+$/).optional(),
});

export const selectRelationSchema = createSelectSchema(relationTable);

// Types
export type Relation = typeof relationTable.$inferSelect;
export type NewRelation = typeof relationTable.$inferInsert;
export type ContactPerson = typeof contactPersons.$inferSelect;
export type NewContactPerson = typeof contactPersons.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;