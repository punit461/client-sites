"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  updateCustomerDetails,
  submitBooking,
  setShowSuccessModal,
  resetBooking,
} from "@/store/slices/bookingSlice";
import { services } from "@/data/services";

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  service: string;
  date: string;
  time: string;
  additionalNotes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  vehicleType?: string;
  service?: string;
  date?: string;
  time?: string;
}

const vehicleTypes = ["Sedan", "SUV", "Hatchback", "MPV", "Coupe", "Truck"];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white text-text-primary";

export default function Booking() {
  const dispatch = useAppDispatch();
  const { bookingStatus, showSuccessModal, bookingReference } = useAppSelector(
    (state) => state.booking
  );

  const [form, setForm] = useState<FormValues>({
    fullName: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleModel: "",
    service: "",
    date: "",
    time: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.vehicleType) {
      newErrors.vehicleType = "Vehicle type is required";
    }

    if (!form.service) {
      newErrors.service = "Please select a service";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    }

    if (!form.time) {
      newErrors.time = "Time is required";
    }

    return newErrors;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateCustomerDetails(form));
      dispatch(submitBooking(form));
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleBookAnother() {
    dispatch(resetBooking());
    dispatch(setShowSuccessModal(false));
    setForm({
      fullName: "",
      phone: "",
      email: "",
      vehicleType: "",
      vehicleModel: "",
      service: "",
      date: "",
      time: "",
      additionalNotes: "",
    });
    setErrors({});
  }

  return (
    <>
      <section id="booking" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-wider text-primary">
              Book Now
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              Schedule Your{" "}
              <span className="text-gradient-orange">Appointment</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-medium text-text-primary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClasses}
                  />
                  {errors.fullName && (
                    <span className="text-sm text-red-500">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-primary">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={inputClasses}
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-medium text-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={inputClasses}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Vehicle Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-primary">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={form.vehicleType}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <span className="text-sm text-red-500">
                      {errors.vehicleType}
                    </span>
                  )}
                </div>

                {/* Vehicle Model */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-primary">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={form.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. Toyota Camry"
                    className={inputClasses}
                  />
                </div>

                {/* Service */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-medium text-text-primary">
                    Service
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="text-sm text-red-500">
                      {errors.service}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-primary">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  {errors.date && (
                    <span className="text-sm text-red-500">
                      {errors.date}
                    </span>
                  )}
                </div>

                {/* Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-primary">
                    Time
                  </label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <span className="text-sm text-red-500">
                      {errors.time}
                    </span>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-medium text-text-primary">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={form.additionalNotes}
                    onChange={handleChange}
                    placeholder="Any special requests or instructions..."
                    className={`${inputClasses} min-h-[100px] resize-y`}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={bookingStatus === "loading"}
                  className="gradient-orange text-white rounded-full px-8 py-4 font-semibold w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {bookingStatus === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    "Book a Wash"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              {/* Green Check Icon */}
              <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-text-secondary mb-6">
                Your appointment has been successfully scheduled.
              </p>

              {bookingReference && (
                <div className="bg-primary-light rounded-xl px-4 py-3 text-primary font-mono font-semibold text-lg mb-8">
                  {bookingReference}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    dispatch(setShowSuccessModal(false))
                  }
                  className="gradient-orange text-white rounded-full px-6 py-3 font-semibold flex-1 transition"
                >
                  View Booking
                </button>
                <button
                  onClick={handleBookAnother}
                  className="border border-primary text-primary rounded-full px-6 py-3 font-semibold flex-1 transition hover:bg-primary-light"
                >
                  Book Another
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
