import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingDetails, BookingState } from "@/types";

const initialState: BookingState = {
  details: {
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleModel: "",
    serviceId: "",
    date: "",
    time: "",
    notes: "",
  },
  status: "idle",
  reference: null,
  selectedService: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateDetails(
      state,
      action: PayloadAction<Partial<BookingDetails>>
    ) {
      state.details = { ...state.details, ...action.payload };
    },
    setSelectedService(state, action: PayloadAction<string>) {
      state.selectedService = action.payload;
      state.details.serviceId = action.payload;
    },
    setStatus(
      state,
      action: PayloadAction<BookingState["status"]>
    ) {
      state.status = action.payload;
    },
    setReference(state, action: PayloadAction<string>) {
      state.reference = action.payload;
    },
    resetBooking(state) {
      state.details = { ...initialState.details };
      state.status = "idle";
      state.reference = null;
    },
  },
});

export const {
  updateDetails,
  setSelectedService,
  setStatus,
  setReference,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
