"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WaitlistModal from "./WaitlistModal";

export default function CTA() {
  const [showFounderModal, setShowFounderModal] = useState(false);
  const [showLawyerModal, setShowLawyerModal] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-accent to-blue-600" id="cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Be the first to access Calex.
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Join thousands of founders and lawyers who are revolutionizing how NDAs are created, reviewed, and signed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setShowFounderModal(true)}
              className="px-8 py-4 bg-white text-background rounded-2xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            >
              I'm a Founder / Client
            </button>
            
            <button
              onClick={() => setShowLawyerModal(true)}
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-2xl font-semibold hover:bg-white hover:text-accent transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            >
              I'm a Lawyer / Law Firm
            </button>
          </div>

          <motion.div
            className="inline-flex items-center space-x-2 text-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-lg">🚀</span>
            <span className="font-semibold text-blue-200">120+ on the waitlist already!</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <WaitlistModal
        isOpen={showFounderModal}
        onClose={() => setShowFounderModal(false)}
        role="founder"
      />
      
      <WaitlistModal
        isOpen={showLawyerModal}
        onClose={() => setShowLawyerModal(false)}
        role="lawyer"
      />
    </section>
  );
}