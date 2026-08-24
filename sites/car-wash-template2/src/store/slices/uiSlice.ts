import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeSection: string;
  mobileMenuOpen: boolean;
  scrolled: boolean;
}

const initialState: UIState = {
  activeSection: "home",
  mobileMenuOpen: false,
  scrolled: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setScrolled(state, action: PayloadAction<boolean>) {
      state.scrolled = action.payload;
    },
  },
});

export const {
  setActiveSection,
  setMobileMenuOpen,
  toggleMobileMenu,
  setScrolled,
} = uiSlice.actions;

export default uiSlice.reducer;
