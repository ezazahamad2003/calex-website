"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Calex saved us days during investor onboarding.",
    author: "Founder, YC-backed startup",
    avatar: "👤",
  },
  {
    quote: "It's the new standard for contract automation.",
    author: "Managing Partner, LawFirm X",
    avatar: "⚖️",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Trusted by founders and lawyers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-background-light rounded-3xl p-8 shadow-lg border border-border relative">
                <Quote className="w-8 h-8 text-accent mb-6 opacity-60" />
                
                <blockquote className="text-lg text-primary-dark mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-primary">
                      {testimonial.author}
                    </div>
                  </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-accent/10 to-blue-600/10 rounded-full -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}