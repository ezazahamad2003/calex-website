"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, Brain } from "lucide-react";
import WaitlistModal from "./WaitlistModal";

const features = [
  {
    icon: CheckCircle,
    title: "Instant NDA generation from law firm templates",
  },
  {
    icon: Zap,
    title: "Transparent fixed pricing",
  },
  {
    icon: Shield,
    title: "Secure document sharing & approval",
  },
  {
    icon: Brain,
    title: "AI-assisted clause suggestions",
  },
];

export default function ForFounders() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-24 bg-background" id="for-founders">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              For Startups & Founders
            </h2>
            <p className="text-xl text-primary-dark mb-8">
              Save hours on legal work — generate and sign NDAs securely in minutes.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-primary-dark font-medium">{feature.title}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-accent text-white rounded-2xl font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-30"
              >
                Join the Client Waitlist
              </button>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Background cards */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl transform rotate-3 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-background-light to-slate-800 rounded-3xl transform -rotate-1" />
              
              {/* Main content */}
              <div className="relative bg-background-light rounded-3xl shadow-2xl p-8 border border-border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">
                      Your NDA Dashboard
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-background-lighter rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary-dark">
                          Tech Startup NDA
                        </span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="text-xs text-muted">
                        Generated in 2 mins • Reviewed by Smith & Associates
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-900/30 rounded-2xl border-2 border-accent/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-accent-light">
                          Investment NDA
                        </span>
                        <div className="w-5 h-5 border-2 border-accent rounded-full animate-spin border-t-transparent" />
                      </div>
                      <div className="text-xs text-accent">
                        Being reviewed by legal team...
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted mb-2">SAVINGS THIS MONTH</div>
                    <div className="text-2xl font-bold text-primary">47 hours</div>
                    <div className="text-sm text-secondary">vs. traditional legal process</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <WaitlistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        role="founder"
      />
    </section>
  );
}