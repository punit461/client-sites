"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/slices/uiSlice";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Basic Car Wash",
  "Premium Wash",
  "Interior Deep Clean",
  "Full Detailing",
  "Ceramic Coating",
  "Paint Protection",
];

export default function Footer() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch(addToast({ message: "Enter a valid email address", type: "error" }));
      return;
    }
    setSubscribed(true);
    dispatch(addToast({ message: "Subscribed to newsletter!", type: "success" }));
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/30 pt-16 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-background font-black text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-secondary">
                Shine<span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Premium car wash and detailing services. We treat every vehicle
              with the care it deserves.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "f"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all text-sm font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-secondary font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-secondary font-bold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-muted text-sm hover:text-primary transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-secondary font-bold mb-4">Newsletter</h4>
            <p className="text-muted text-sm mb-4">
              Get updates on offers, tips, and more.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-secondary text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-primary text-sm px-4 py-2.5"
              >
                {subscribed ? "✓" : "→"}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} ShinePro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted text-sm hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted text-sm hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
