"use client";

import { motion } from "framer-motion";
import { FileText, AlertTriangle, Globe, Database } from "lucide-react";

const agents = [
  {
    icon: FileText,
    title: "Boilerplate Agent",
    description: "Extracts standard clauses from firm templates",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: AlertTriangle,
    title: "Nuance Agent",
    description: "Scans for red flags and industry-specific risks",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Globe,
    title: "Web Agent",
    description: "References latest legal norms and case laws",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Database,
    title: "RAG Agent",
    description: "Pulls from stored precedents to improve accuracy",
    color: "from-purple-500 to-purple-600",
  },
];

export default function Agents() {
  return (
    <section className="py-24 bg-background" id="agents">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Powered by Calex Agents
          </h2>
          <p className="text-xl text-primary-dark max-w-3xl mx-auto">
            Our multi-agent pipeline ensures every NDA is both compliant and contextually correct.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-background-light rounded-3xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${agent.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <agent.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-4">
                  {agent.title}
                </h3>
                
                <p className="text-secondary leading-relaxed">
                  {agent.description}
                </p>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-background-light rounded-full shadow-lg border border-border">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-dark">
              All agents working 24/7 to ensure accuracy and compliance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}