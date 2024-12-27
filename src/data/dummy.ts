// src/data/dummy.ts
export interface Relationship {
    id: string;
    shortName: string;
    telephone: string;
    street: string;
    houseNumber: string;
    postcode: string;
    place: string;
    land: string;
    email: string;
}

export const relationships: Relationship[] = [
    {
        id: '1',
        shortName: 'Distillery BV',
        telephone: '0492556483',
        street: 'The Huufkes',
        houseNumber: '16',
        postcode: '3574 TL',
        place: 'Nuenen',
        land: 'The Netherlands',
        email: 'info@destil.nl'
    },
    {
        id: '2',
        shortName: 'Cras Company',
        telephone: '0492556483',
        street: 'Vestibulum Av.',
        houseNumber: '23',
        postcode: '78252',
        place: 'Eisenstadt',
        land: 'Vietnam',
        email: 'penatibus@protonmail.org'
    },
    // Add more dummy data as needed
];
