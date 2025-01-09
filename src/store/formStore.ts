// src/store/formStore.ts
import { map } from 'nanostores';
import type { RelationshipFormData } from '../types/relationship';

export const formState = map<RelationshipFormData>({
    shortName: '',
    name: '',
    telephone: '',
    email: '',
    website: '',
    kvkNumber: '',
    vatNumber: '',
    street: '',
    houseNumber: '',
    postcode: '',
    place: '',
    land: '',
    isCustomer: false,
    isSupplier: false,
    customerActivity: ''
});

export const formErrors = map<Record<string, string>>({});

export const resetForm = () => {
    formState.set({
        shortName: '',
        name: '',
        telephone: '',
        email: '',
        website: '',
        kvkNumber: '',
        vatNumber: '',
        street: '',
        houseNumber: '',
        postcode: '',
        place: '',
        land: '',
        isCustomer: false,
        isSupplier: false,
        customerActivity: ''
    });
    formErrors.set({});
};

export const validateForm = () => {
    const data = formState.get();
    const errors: Record<string, string> = {};

    if (!data.shortName) {
        errors.shortName = 'Short name is required';
    }
    if (!data.name) {
        errors.name = 'Full name is required';
    }
    if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
        errors.email = 'Invalid email address';
    }
    if (data.kvkNumber && !/^\d{8}$/.test(data.kvkNumber)) {
        errors.kvkNumber = 'KVK number must be 8 digits';
    }

    formErrors.set(errors);
    return Object.keys(errors).length === 0;
};