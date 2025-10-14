"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Building, Mail, Loader2 } from "lucide-react";
import { z } from "zod";
import toast from "react-hot-toast";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: "founder" | "lawyer";
}

const founderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  role: z.literal("founder"),
});

const lawyerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  firm: z.string().min(2, "Firm name must be at least 2 characters"),
  role: z.literal("lawyer"),
});

export default function WaitlistModal({ isOpen, onClose, role }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    firm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or role changes
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", company: "", firm: "" });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, role]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate based on role
      const schema = role === "founder" ? founderSchema : lawyerSchema;
      const validatedData = schema.parse({
        ...formData,
        role,
      });

      // Submit to API
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      // Success
      toast.success("You're on the list! 🎉");
      onClose();
      
      // Optional: Track analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "waitlist_signup", {
          event_category: "engagement",
          event_label: role,
        });
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle other errors
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalTitle = role === "founder" 
    ? "Join as Founder/Client" 
    : "Join as Lawyer/Law Firm";

  const modalDescription = role === "founder"
    ? "Get early access to streamlined NDA creation and save hours of legal work."
    : "Expand your client base and automate routine NDA drafting with AI assistance.";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-background-light rounded-3xl shadow-2xl border border-border"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">
                  {modalTitle}
                </h3>
                <p className="text-sm text-secondary">
                  {modalDescription}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-lighter transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name field */}
              <div>
                <label htmlFor={`${role}-name`} className="block text-sm font-medium text-primary mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id={`${role}-name`}
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:border-accent transition-colors ${
                      errors.name ? "border-red-400" : "border-border hover:border-border-light"
                    }`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label htmlFor={`${role}-email`} className="block text-sm font-medium text-primary mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id={`${role}-email`}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:border-accent transition-colors ${
                      errors.email ? "border-red-400" : "border-border hover:border-border-light"
                    }`}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Company/Firm field */}
              <div>
                <label 
                  htmlFor={`${role}-${role === "founder" ? "company" : "firm"}`} 
                  className="block text-sm font-medium text-primary mb-2"
                >
                  {role === "founder" ? "Company Name *" : "Law Firm Name *"}
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id={`${role}-${role === "founder" ? "company" : "firm"}`}
                    type="text"
                    value={role === "founder" ? formData.company : formData.firm}
                    onChange={(e) => handleInputChange(role === "founder" ? "company" : "firm", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:border-accent transition-colors ${
                      errors[role === "founder" ? "company" : "firm"] ? "border-red-400" : "border-border hover:border-border-light"
                    }`}
                    placeholder={role === "founder" ? "Enter your company name" : "Enter your law firm name"}
                    disabled={isSubmitting}
                  />
                </div>
                {errors[role === "founder" ? "company" : "firm"] && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors[role === "founder" ? "company" : "firm"]}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Join Waitlist</span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-6 pb-6">
              <p className="text-xs text-muted text-center">
                By joining, you agree to receive updates about Calex. 
                We'll never spam you or share your information.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}