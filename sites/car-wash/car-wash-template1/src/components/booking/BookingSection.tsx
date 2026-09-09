"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  updateDetails,
  setStatus,
  setReference,
  resetBooking,
} from "@/store/slices/bookingSlice";
import { addToast } from "@/store/slices/uiSlice";
import { services } from "@/data/services";

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

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "SP-";
  for (let i = 0; i < 6; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export default function BookingSection() {
  const dispatch = useAppDispatch();
  const { details, status, reference, selectedService } = useAppSelector(
    (state) => state.booking
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedService) {
      dispatch(updateDetails({ serviceId: selectedService }));
    }
  }, [selectedService, dispatch]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!details.name.trim()) errs.name = "Name is required";
    if (!details.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(details.phone))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!details.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
      errs.email = "Enter a valid email address";
    if (!details.vehicleType) errs.vehicleType = "Select vehicle type";
    if (!details.vehicleModel.trim()) errs.vehicleModel = "Enter vehicle model";
    if (!details.serviceId) errs.serviceId = "Select a service";
    if (!details.date) errs.date = "Select a date";
    if (!details.time) errs.time = "Select a time";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(setStatus("submitting"));
    setTimeout(() => {
      const ref = generateRef();
      dispatch(setReference(ref));
      dispatch(setStatus("success"));
      dispatch(
        addToast({
          message: "Booking confirmed! Check your details.",
          type: "success",
        })
      );
    }, 1500);
  };

  const handleClose = () => {
    dispatch(resetBooking());
    setErrors({});
  };

  const inputClass = (field: string) =>
    `w-full bg-surface border ${
      errors[field] ? "border-red-500/60" : "border-border"
    } rounded-xl px-4 py-3 text-secondary text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`;

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Book Now"
          title="Schedule Your Car Wash"
          description="Fill in the details below and we'll take care of the rest."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={details.name}
                  onChange={(e) =>
                    dispatch(updateDetails({ name: e.target.value }))
                  }
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={details.phone}
                  onChange={(e) =>
                    dispatch(updateDetails({ phone: e.target.value }))
                  }
                  className={inputClass("phone")}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={details.email}
                  onChange={(e) =>
                    dispatch(updateDetails({ email: e.target.value }))
                  }
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Vehicle Type *
                </label>
                <select
                  value={details.vehicleType}
                  onChange={(e) =>
                    dispatch(updateDetails({ vehicleType: e.target.value }))
                  }
                  className={inputClass("vehicleType")}
                >
                  <option value="">Select type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="compact-suv">Compact SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="sports">Sports Car</option>
                </select>
                {errors.vehicleType && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.vehicleType}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Vehicle Model *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Honda City"
                  value={details.vehicleModel}
                  onChange={(e) =>
                    dispatch(updateDetails({ vehicleModel: e.target.value }))
                  }
                  className={inputClass("vehicleModel")}
                />
                {errors.vehicleModel && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.vehicleModel}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Select Service *
                </label>
                <select
                  value={details.serviceId}
                  onChange={(e) =>
                    dispatch(updateDetails({ serviceId: e.target.value }))
                  }
                  className={inputClass("serviceId")}
                >
                  <option value="">Choose a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — ₹{s.price} ({s.duration})
                    </option>
                  ))}
                </select>
                {errors.serviceId && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.serviceId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  min={today}
                  value={details.date}
                  onChange={(e) =>
                    dispatch(updateDetails({ date: e.target.value }))
                  }
                  className={inputClass("date")}
                />
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Preferred Time *
                </label>
                <select
                  value={details.time}
                  onChange={(e) =>
                    dispatch(updateDetails({ time: e.target.value }))
                  }
                  className={inputClass("time")}
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-400 text-xs mt-1">{errors.time}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special requests or instructions..."
                  value={details.notes}
                  onChange={(e) =>
                    dispatch(updateDetails({ notes: e.target.value }))
                  }
                  className={`${inputClass("notes")} resize-none`}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "submitting"}
              className="w-full btn-primary text-base font-bold py-4 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
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
                  Processing...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </motion.button>
          </form>
        </motion.div>
      </Container>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={handleClose}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative glass-card rounded-2xl p-8 md:p-10 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.1 }}
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-4xl">✓</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-secondary mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-muted mb-4">
                Your car wash appointment has been successfully scheduled.
              </p>
              <div className="glass-card rounded-xl p-4 mb-6">
                <p className="text-xs text-muted mb-1">Booking Reference</p>
                <p className="text-xl font-bold text-primary tracking-wider">
                  {reference}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="btn-primary font-semibold px-8"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
