"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeToast } from "@/store/slices/uiSlice";

export default function ToastContainer() {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => dispatch(removeToast(toast.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: { id: number; message: string; type: string };
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const colors = {
    success: "border-green-500/50 bg-green-500/10",
    error: "border-red-500/50 bg-red-500/10",
    info: "border-primary/50 bg-primary/10",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-xl px-5 py-3 border ${
        colors[toast.type as keyof typeof colors] || colors.info
      } flex items-center gap-3 min-w-[280px] max-w-[400px] shadow-lg`}
    >
      <span className="text-lg font-bold">
        {icons[toast.type as keyof typeof icons] || icons.info}
      </span>
      <p className="text-sm text-foreground flex-1">{toast.message}</p>
      <button
        onClick={onDismiss}
        className="text-muted hover:text-foreground transition-colors text-sm"
      >
        ✕
      </button>
    </motion.div>
  );
}
