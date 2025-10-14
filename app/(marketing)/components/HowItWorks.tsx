"use client";

import { motion } from "framer-motion";
import { FileText, Search, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Select Template",
    description: "Choose NDA type & law firm.",
  },
  {
    icon: Search,
    title: "Generate & Review",
    description: "AI agents draft the document.",
  },
  {
    icon: CheckCircle,
    title: "Approve & Pay",
    description: "Lawyer reviews and finalizes.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background-light" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-primary-dark max-w-3xl mx-auto">
            From template to signature in minutes, not days
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop flow */}
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className="flex flex-col items-center text-center max-w-xs"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-secondary">
                    {step.description}
                  </p>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    className="mx-8 flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  >
                    <ArrowRight className="w-8 h-8 text-accent" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}