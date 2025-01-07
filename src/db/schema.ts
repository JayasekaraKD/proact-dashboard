// src/db/schema.ts
import { pgTable, text, timestamp, uuid, boolean, integer, decimal, jsonb } from 'drizzle-orm/pg-core';

export const relations = pgTable('relations', {
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
    vatNumber: text('vat_number'), // Added VAT number
    languageCorrespondence: text('language'),
    isCustomer: boolean('is_customer'),
    isSupplier: boolean('is_supplier'),

    // Transport types
    isIntermodal: boolean('is_intermodal'),
    isInternational: boolean('is_international'),
    isCityDistribution: boolean('is_city_distribution'),
    isRegionalDistribution: boolean('is_regional_distribution'),

    // Addresses
    visitingStreet: text('visiting_street'),
    visitingHouseNumber: text('visiting_house_number'),
    visitingPostcode: text('visiting_postcode'),
    visitingPlace: text('visiting_place'),
    visitingLand: text('visiting_land'),

    // Mailing address
    mailingStreet: text('mailing_street'),
    mailingHouseNumber: text('mailing_house_number'),
    mailingPostcode: text('mailing_postcode'),
    mailingPlace: text('mailing_place'),
    mailingLand: text('mailing_land'),

    // Financial information
    bankAccount: text('bank_account'),
    paymentTerm: integer('payment_term'),
    creditLimit: decimal('credit_limit', { precision: 10, scale: 2 }),
    invoiceMethod: text('invoice_method'),
    currency: text('currency').default('EUR'),
    financialNotes: text('financial_notes'),

    // Business information
    industry: text('industry'),
    companySize: text('company_size'),
    customerActivity: text('customer_activity'),
    status: text('status').default('active'),
    tags: jsonb('tags').default([]),

    // Timestamps
    lastActivityAt: timestamp('last_activity_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Contact Persons Table
export const contactPersons = pgTable('contact_persons', {
    id: uuid('id').primaryKey(),
    relationId: uuid('relation_id').notNull().references(() => relations.id),
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    position: text('position'),  // Changed from 'function' to 'position'
    isMainContact: boolean('is_main_contact').default(false),
    department: text('department'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Documents Table
export const documents = pgTable('documents', {
    id: uuid('id').primaryKey(),
    relationId: uuid('relation_id').notNull().references(() => relations.id),
    name: text('name').notNull(),
    type: text('type').notNull(),
    path: text('path').notNull(),
    size: integer('size'),
    mimeType: text('mime_type'),
    description: text('description'),
    uploadedBy: uuid('uploaded_by'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Notes Table
export const notes = pgTable('notes', {
    id: uuid('id').primaryKey(),
    relationId: uuid('relation_id').notNull().references(() => relations.id),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdBy: uuid('created_by'),
    isPrivate: boolean('is_private').default(false),
    category: text('category'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type Relation = typeof relations.$inferSelect;
export type NewRelation = typeof relations.$inferInsert;

export type ContactPerson = typeof contactPersons.$inferSelect;
export type NewContactPerson = typeof contactPersons.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;