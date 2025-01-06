// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';
import type { Database } from './types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const connectionString = import.meta.env.DATABASE_URL;

if (!supabaseUrl || !supabaseKey || !connectionString) {
    throw new Error('Missing environment variables for database configuration');
}

// Create a Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});

// Create a Postgres client for Drizzle
const client = postgres(connectionString);
export const db = drizzle(client);

// Helper to handle Supabase responses
export const handleSupabaseResponse = <T>(
    response: { data: T; error: any }
): Promise<T> => {
    if (response.error) {
        console.error('Supabase error:', response.error);
        throw new Error(response.error.message || 'An error occurred');
    }
    return Promise.resolve(response.data);
};