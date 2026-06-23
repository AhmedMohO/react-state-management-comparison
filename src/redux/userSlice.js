import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Sarah Connor',
  email: 'sarah.connor@sky-net.io',
  role: 'Resistance Commander',
  theme: 'dark',
  notifications: 5,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { name, email, role } = action.payload;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (role !== undefined) state.role = role;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    incrementNotifications: (state) => {
      state.notifications += 1;
    },
    decrementNotifications: (state) => {
      if (state.notifications > 0) {
        state.notifications -= 1;
      }
    },
    clearNotifications: (state) => {
      state.notifications = 0;
    },
  },
});

export const {
  updateProfile,
  toggleTheme,
  incrementNotifications,
  decrementNotifications,
  clearNotifications,
} = userSlice.actions;

export default userSlice.reducer;
