import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "@/types";

const initialState: UIState = {
  activeSection: "home",
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    addToast(
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) {
      state.toasts.push({
        ...action.payload,
        id: Date.now(),
      });
    },
    removeToast(state, action: PayloadAction<number>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setActiveSection, addToast, removeToast } = uiSlice.actions;
export default uiSlice.reducer;
