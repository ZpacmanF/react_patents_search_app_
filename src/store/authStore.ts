import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  token: string | null;
  user: any | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('token') 
    ? jwtDecode(localStorage.getItem('token') || '') 
    : null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      set({ token, user: jwtDecode(token) });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));