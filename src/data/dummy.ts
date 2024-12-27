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
    {
        id: '3',
        shortName: 'Or Venenatis Ltd',
        telephone: '8837203478',
        street: 'Ante St.',
        houseNumber: '179',
        postcode: '16282',
        place: 'Pinetown',
        land: 'United Kingdom',
        email: 'arcu.et@yahoo.net'
    },
    {
        id: '4',
        shortName: 'Cras Company',
        telephone: '0492556483',
        street: 'Vestibulum Av.',
        houseNumber: '23',
        postcode: '78252',
        place: 'Eisenstadt',
        land: 'Vietnam',
        email: 'penatibus@protonmail.org'
    },
    {
        id: '5',
        shortName: 'Tempus I',
        telephone: '8802034562',
        street: 'Live Street',
        houseNumber: '89',
        postcode: '0705 EC',
        place: 'Belfast',
        land: 'Norway',
        email: 'imperdiet.leo@aol.org'
    },
    {
        id: '6',
        shortName: 'Cras Company',
        telephone: '0492556483',
        street: 'Vestibulum Av.',
        houseNumber: '23',
        postcode: '78252',
        place: 'Eisenstadt',
        land: 'Vietnam',
        email: 'penatibus@protonmail.org'
    },
    {
        id: '7',
        shortName: 'Any body',
        telephone: '0492556483',
        street: 'Mourning Rd.',
        houseNumber: '164',
        postcode: '26751',
        place: 'Galway',
        land: 'Australia',
        email: 'sit.amet.diam@google.net'
    },
    {
        id: '8',
        shortName: 'Lake Varius',
        telephone: '0909983527',
        street: 'Maurice Rd.',
        houseNumber: '70',
        postcode: '356958',
        place: 'Scarborough',
        land: 'Spain',
        email: 'proin.eget.odio@yahoo.edu'
    }
];