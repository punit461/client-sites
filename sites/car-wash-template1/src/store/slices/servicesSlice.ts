import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "@/types";
import { services } from "@/data/services";

interface ServicesState {
  items: Service[];
  activeFilter: string;
}

const initialState: ServicesState = {
  items: services,
  activeFilter: "all",
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.activeFilter = action.payload;
    },
  },
});

export const { setFilter } = servicesSlice.actions;
export default servicesSlice.reducer;
