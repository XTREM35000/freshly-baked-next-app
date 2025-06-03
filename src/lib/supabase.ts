
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gezrcuwrspltcjdeswcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlenJjdXdyc3BsdGNqZGVzd2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxOTQwMzMsImV4cCI6MjA0ODc3MDAzM30.PH8HTMgGzz5K0uDQZDHoE56xb4cqO2U_LmOsOqhkWio';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'agent' | 'user';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: UserRole;
  status: string;
  avatar_url?: string;
  permissions: string[];
}

export function getFullName(user: User): string {
  return `${user.first_name} ${user.last_name}`.trim();
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add +225 prefix if not present for Ivory Coast numbers
  if (cleaned.length === 10 && !cleaned.startsWith('225')) {
    return `+225${cleaned}`;
  } else if (cleaned.length === 13 && cleaned.startsWith('225')) {
    return `+${cleaned}`;
  }
  
  return phone;
}

export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check for valid Ivory Coast phone number formats
  return (
    (cleaned.length === 10) || 
    (cleaned.length === 13 && cleaned.startsWith('225'))
  );
}

export async function uploadAvatar(file: File, userId: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
}
