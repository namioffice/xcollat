import { create } from 'zustand';
import axios from 'axios';

interface UserAccount {
  balance: number;
  name: string
  loading: boolean;
  fetchUserAccount: () => Promise<void>;
}

export const useStore = create<UserAccount>((set) => ({
  balance: 0,
  loading: false,
  name: '',

  fetchUserAccount: async () => {
    set({ loading: true });
    const userId = localStorage.getItem("userId")
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/${userId}`);
      set({
        balance: res.data.balance,
        name: res.data.firstName
      });
    } catch (error) {
      console.error("Failed to fetch user account summary:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
