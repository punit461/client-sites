import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingDetails } from "@/types";

interface BookingState {
  selectedService: string;
  selectedDate: string;
  selectedTime: string;
  customerDetails: BookingDetails;
  bookingStatus: "idle" | "loading" | "success" | "error";
  bookingReference: string | null;
  showSuccessModal: boolean;
}

const initialState: BookingState = {
  selectedService: "",
  selectedDate: "",
  selectedTime: "",
  customerDetails: {
    fullName: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleModel: "",
    service: "",
    date: "",
    time: "",
    additionalNotes: "",
  },
  bookingStatus: "idle",
  bookingReference: null,
  showSuccessModal: false,
};

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (details: BookingDetails) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const ref = `CW-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    return { reference: ref, details };
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedService(state, action: PayloadAction<string>) {
      state.selectedService = action.payload;
      state.customerDetails.service = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      state.customerDetails.date = action.payload;
    },
    setSelectedTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
      state.customerDetails.time = action.payload;
    },
    updateCustomerDetails(
      state,
      action: PayloadAction<Partial<BookingDetails>>
    ) {
      state.customerDetails = {
        ...state.customerDetails,
        ...action.payload,
      };
    },
    resetBooking() {
      return initialState;
    },
    setShowSuccessModal(state, action: PayloadAction<boolean>) {
      state.showSuccessModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.bookingStatus = "loading";
      })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.bookingStatus = "success";
        state.bookingReference = action.payload.reference;
        state.showSuccessModal = true;
      })
      .addCase(submitBooking.rejected, (state) => {
        state.bookingStatus = "error";
      });
  },
});

export const {
  setSelectedService,
  setSelectedDate,
  setSelectedTime,
  updateCustomerDetails,
  resetBooking,
  setShowSuccessModal,
} = bookingSlice.actions;

export default bookingSlice.reducer;
