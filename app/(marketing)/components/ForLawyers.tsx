"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, DollarSign, Handshake, TrendingUp } from "lucide-react";
import WaitlistModal from "./WaitlistModal";

const features = [
  {
    icon: FolderOpen,
    title: "Upload and showcase your firm's templates",
  },
  {
    icon: DollarSign,
    title: "Set your fixed fee per NDA",
  },
  {
    icon: Handshake,
    title: "Approve client drafts instantly",
  },
  {
    icon: TrendingUp,
    title: "Gain visibility via Calex's client marketplace",
  },
];

export default function ForLawyers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-24 bg-background-light" id="for-lawyers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left visual */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Background cards */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-slate-800 rounded-3xl transform -rotate-3 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-background-light to-purple-900/30 rounded-3xl transform rotate-1" />
              
              {/* Main content */}
              <div className="relative bg-background-light rounded-3xl shadow-2xl p-8 border border-border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">
                      Law Firm Portal
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Premium
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background-lighter rounded-2xl">
                      <div className="text-2xl font-bold text-primary mb-1">47</div>
                      <div className="text-xs text-secondary">NDAs Processed</div>
                    </div>
                    <div className="p-4 bg-green-900/30 rounded-2xl">
                      <div className="text-2xl font-bold text-green-400 mb-1">$14k</div>
                      <div className="text-xs text-secondary">Revenue This Month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-900/30 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-accent-light">
                          New Client Request
                        </span>
                        <button className="px-3 py-1 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition-colors">
                          Review
                        </button>
                      </div>
                      <div className="text-xs text-accent">
                        TechCorp needs Series A NDA template
                      </div>
                    </div>
                    
                    <div className="p-4 bg-background-lighter rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary-dark">
                          Template Performance
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-xs text-secondary">
                        Standard NDA: 95% approval rate
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted mb-2">AVERAGE TURNAROUND</div>
                    <div className="text-2xl font-bold text-primary">12 mins</div>
                    <div className="text-sm text-secondary">vs. 3-5 days traditional</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              For Lawyers & Legal Teams
            </h2>
            <p className="text-xl text-primary-dark mb-8">
              Expand your client base and automate routine drafting.
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
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-purple-600" />
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
                className="px-8 py-4 bg-accent text-white rounded-2xl font-semibold hover:bg-accent-light transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-30"
              >
                Join the Lawyer Waitlist
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <WaitlistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        role="lawyer"
      />
    </section>
  );
}