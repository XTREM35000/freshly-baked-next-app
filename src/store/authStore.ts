
import { create } from 'zustand';
import { User } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  initialized: false,
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  setInitialized: (initialized) => set({ initialized }),
  fetchUser: async () => {
    try {
      set({ isLoading: true });
      // This would typically fetch user data from Supabase
      // For now, we'll just set loading to false
      set({ isLoading: false, initialized: true });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ isLoading: false, initialized: true });
    }
  },
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    isLoading: false 
  }),
}));
