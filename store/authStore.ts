import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { shuffleArray } from '../utils/shuffle';
import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    const data = shuffleArray(response.data)
    set({ allUsers: data });
  },
  
});

const useAuthStore = create((
  persist(authStore, {
    name: 'auth',
  })
));

export default useAuthStore;