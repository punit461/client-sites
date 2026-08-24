"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/slices/uiSlice";

const contactInfo = [
  {
    icon: "📞",
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "hello@shinepro.in",
    href: "mailto:hello@shinepro.in",
  },
  {
    icon: "📍",
    label: "Address",
    value: "123 Auto Lane, Mumbai, MH 400001",
    href: "#",
  },
  {
    icon: "🕐",
    label: "Working Hours",
    value: "Mon - Sun: 8:00 AM - 8:00 PM",
    href: "#",
  },
];

export default function ContactSection() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    dispatch(addToast({ message: "Message sent successfully!", type: "success" }));
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const inputClass = (field: string) =>
    `w-full bg-surface border ${
      errors[field] ? "border-red-500/60" : "border-border"
    } rounded-xl px-4 py-3 text-secondary text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`;

  return (
    <section id="contact" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Contact Us"
          title="Get in Touch"
          description="Have a question or want to book a service? We'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 glass-card rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <span className="text-2xl mt-0.5">{info.icon}</span>
                <div>
                  <p className="text-muted text-sm mb-0.5">{info.label}</p>
                  <p className="text-secondary font-medium group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Map placeholder */}
            <div className="glass-card rounded-xl overflow-hidden h-48">
              <div className="w-full h-full bg-card flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p className="text-muted text-sm">Google Maps Integration</p>
                  <p className="text-muted/50 text-xs">
                    Replace with actual map component
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 md:p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass("phone")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClass("message")} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="w-full btn-primary text-base font-bold py-3.5 disabled:opacity-60"
              >
                {submitted ? "Message Sent! ✓" : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
