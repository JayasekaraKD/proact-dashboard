import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

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
    languageCorrespondence: text('language_correspondence'),
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
    // Additional fields
    customerActivity: text('customer_activity'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type Relation = typeof relations.$inferSelect;
export type NewRelation = typeof relations.$inferInsert;