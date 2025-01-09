// src/utils/validation.ts
import { z } from 'zod';

// Common validation patterns
const patterns = {
    phone: /^\+?[1-9]\d{1,14}$/, // E.164 format
    kvk: /^\d{8}$/, // 8 digits
    vat: /^[A-Z]{2}[0-9A-Z]+$/, // Country code + numbers
    postcode: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, // Dutch postcode format
};

// Base schemas for reuse
export const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    houseNumber: z.string().min(1, "House number is required"),
    postcode: z.string().regex(patterns.postcode, "Invalid postcode format"),
    place: z.string().min(1, "Place is required"),
    land: z.string().min(1, "Country is required"),
});

export const contactSchema = z.object({
    telephone: z.string().regex(patterns.phone, "Invalid phone format").optional(),
    email: z.string().email("Invalid email format").optional(),
    website: z.string().url("Invalid website URL").optional(),
});

// Form validation utilities
export function validateField(value: string, type: 'email' | 'phone' | 'kvk' | 'vat' | 'postcode'): boolean {
    switch (type) {
        case 'email':
            return z.string().email().safeParse(value).success;
        case 'phone':
            return patterns.phone.test(value);
        case 'kvk':
            return patterns.kvk.test(value);
        case 'vat':
            return patterns.vat.test(value);
        case 'postcode':
            return patterns.postcode.test(value);
        default:
            return true;
    }
}

// Relationship form specific validation
export const relationshipValidation = {
    isValidShortName: (value: string) => value.length >= 2 && value.length <= 50,
    isValidName: (value: string) => value.length >= 2 && value.length <= 100,
    isValidEmail: (value: string) => validateField(value, 'email'),
    isValidPhone: (value: string) => validateField(value, 'phone'),
    isValidKvk: (value: string) => validateField(value, 'kvk'),
    isValidVat: (value: string) => validateField(value, 'vat'),
    isValidPostcode: (value: string) => validateField(value, 'postcode'),

    validateForm: (data: any) => {
        const errors: Record<string, string> = {};

        if (!data.shortName || !relationshipValidation.isValidShortName(data.shortName)) {
            errors.shortName = 'Short name must be between 2 and 50 characters';
        }

        if (!data.name || !relationshipValidation.isValidName(data.name)) {
            errors.name = 'Name must be between 2 and 100 characters';
        }

        if (data.email && !relationshipValidation.isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }

        if (data.telephone && !relationshipValidation.isValidPhone(data.telephone)) {
            errors.telephone = 'Invalid phone format';
        }

        if (data.kvkNumber && !relationshipValidation.isValidKvk(data.kvkNumber)) {
            errors.kvkNumber = 'KVK number must be 8 digits';
        }

        if (data.vatNumber && !relationshipValidation.isValidVat(data.vatNumber)) {
            errors.vatNumber = 'Invalid VAT number format';
        }

        if (data.postcode && !relationshipValidation.isValidPostcode(data.postcode)) {
            errors.postcode = 'Invalid postcode format';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};