
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gezrcuwrspltcjdeswcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlenJjdXdyc3BsdGNqZGVzd2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxOTQwMzMsImV4cCI6MjA0ODc3MDAzM30.PH8HTMgGzz5K0uDQZDHoE56xb4cqO2U_LmOsOqhkWio';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
