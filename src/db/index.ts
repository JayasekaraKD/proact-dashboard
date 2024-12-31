import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';

interface ImportMetaEnv {
    readonly PUBLIC_SUPABASE_URL: string;
    readonly PUBLIC_SUPABASE_ANON_KEY: string;
    readonly DATABASE_URL: string;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const connectionString = import.meta.env.DATABASE_URL;

if (!supabaseUrl || !supabaseKey || !connectionString) {
    throw new Error('Missing environment variables');
}

// Create a new supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Create a new postgres client
const client = postgres(connectionString);

// Create a new drizzle client
export const db = drizzle(client);