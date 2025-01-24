import { User } from '@/api/types/user';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'auth_token';
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-fallback-secret-key';

export const secureStorage = {
  set: (value: User) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
    localStorage.setItem(STORAGE_KEY, encrypted);
  },
  
  get: (): User | null => {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return null;
    
    try {
      const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch {
      return null;
    }
  },
  
  remove: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
}; 