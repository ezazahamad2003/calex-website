"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Make sure WaitlistModal.tsx exists in the same folder or update the path accordingly
import WaitlistModal from "./WaitlistModal";

const AnimatedText = () => {
  const words = [
    { text: "Fast", color: "text-accent", description: "⚡" },
    { text: "Secure", color: "text-green-400", description: "🔒" },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-block relative min-w-[200px] text-left">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            key={currentIndex}
            className={`${words[currentIndex].color} inline-flex items-center gap-2`}
            initial={{ y: 30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="relative">
              {words[currentIndex].text}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-current"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
            <motion.span
              className="text-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {words[currentIndex].description}
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-20 blur-sm -z-10"
        style={{
          background: `radial-gradient(ellipse, ${
            currentIndex === 0 ? '#3b82f6' : '#22c55e'
          }, transparent 70%)`,
        }}
        animate={{
          scale: isVisible ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </span>
  );
};

const MobileAppMockup = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const screens = [
    {
      title: "Building Permit Query",
      content: (
        <div className="space-y-4 h-full flex flex-col">
          {/* User Question */}
          <div className="flex justify-end">
            <div className="bg-accent text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
              <p className="text-sm">Can I build a 3-story office building on lot 42A in downtown district?</p>
            </div>
          </div>
          
          {/* AI Response */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              AI
            </div>
            <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-md px-4 py-3 flex-1">
              <p className="text-sm mb-2">Based on zoning code 15.2.3, downtown district allows up to 4 stories for commercial use. However, lot 42A requires a special use permit due to proximity to historic district (within 200ft).</p>
              <div className="text-xs text-gray-600 mt-2">
                <em>Source: Municipal Code 15.2.3, Historic Preservation Ordinance 8.1.2</em>
              </div>
            </div>
          </div>
          
          {/* Follow-up Question */}
          <div className="flex justify-end">
            <div className="bg-accent text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
              <p className="text-sm">What documents do I need for the permit?</p>
            </div>
          </div>
          
          {/* Typing indicator */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              AI
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Document Requirements",
      content: (
        <div className="space-y-4">
          {/* AI Response with documents */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              AI
            </div>
            <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-md px-4 py-3 flex-1">
              <p className="text-sm mb-3">For a special use permit, you'll need:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Site plan & architectural drawings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Environmental impact study</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Historic district compatibility review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Traffic impact assessment</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="bg-accent text-white rounded-lg py-2 px-3 text-xs font-medium">
              Start Application
            </button>
            <button className="bg-gray-200 text-gray-800 rounded-lg py-2 px-3 text-xs font-medium">
              Find Architect
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Application Status",
      content: (
        <div className="space-y-4">
          {/* Status Header */}
          <div className="text-center py-2">
            <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xl">
              ✓
            </div>
            <h3 className="font-semibold text-primary text-sm">Application Submitted</h3>
            <p className="text-xs text-muted mt-1">Permit #BP-2025-42A</p>
          </div>
          
          {/* Progress Steps */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-primary">Initial Review</div>
                <div className="text-xs text-green-600">Completed - Oct 14</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs">2</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-primary">Historic Review</div>
                <div className="text-xs text-accent">In Progress - 3 days remaining</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">3</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600">Final Approval</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
          </div>
          
          {/* Estimated completion */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <div className="text-xs text-blue-800 font-medium">Estimated Completion</div>
            <div className="text-sm text-blue-900">October 25, 2025</div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteracting) {
        setActiveScreen((prev) => (prev + 1) % screens.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isInteracting, screens.length]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <motion.div
        className="relative mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onHoverStart={() => setIsInteracting(true)}
        onHoverEnd={() => setIsInteracting(false)}
      >
        {/* Phone Shadow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-56 h-12 bg-black/20 rounded-full blur-2xl" />
        
        {/* Phone Body */}
        <div className="relative w-72 h-[580px] bg-white rounded-[2.5rem] p-1 shadow-2xl border-2 border-black">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative border border-gray-100">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-4 bg-white">
              <div className="text-sm font-medium text-gray-900">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <svg className="w-6 h-4 ml-2" viewBox="0 0 24 16" fill="none">
                  <rect x="2" y="4" width="4" height="8" rx="1" fill="currentColor"/>
                  <rect x="8" y="2" width="4" height="12" rx="1" fill="currentColor"/>
                  <rect x="14" y="6" width="4" height="6" rx="1" fill="currentColor"/>
                  <rect x="20" y="1" width="2" height="14" rx="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="px-4 py-2 h-full bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {screens[activeScreen].content}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Bottom Navigation */}
            <div className="absolute bottom-6 left-0 right-0 bg-white p-4">
              <div className="flex justify-center space-x-3">
                {screens.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeScreen ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setActiveScreen(index);
                      setIsInteracting(true);
                      setTimeout(() => setIsInteracting(false), 2000);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gray-900 rounded-full" />
          </div>
        </div>
        
        {/* Floating Action Hint */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Click to interact →
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const [showFounderModal, setShowFounderModal] = useState(false);
  const [showLawyerModal, setShowLawyerModal] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16 lg:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-light to-slate-900 opacity-80" />
      
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Get Your NDAs Done —{" "}
              <AnimatedText /> and Reviewed by{" "}
              <span className="text-accent">Real Lawyers.</span>
            </h1>
            
            <p className="text-xl text-primary-dark mb-8 max-w-2xl mx-auto lg:mx-0">
              Calex connects startups with law firms to draft, review, and approve NDAs 
              instantly using AI-assisted workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => setShowFounderModal(true)}
                className="px-8 py-4 bg-accent text-white rounded-2xl font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-30"
              >
                Join Waitlist – Founders / Clients
              </button>
              
              <button
                onClick={() => setShowLawyerModal(true)}
                className="px-8 py-4 bg-background-light text-primary border-2 border-border rounded-2xl font-semibold hover:border-accent hover:text-accent transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-30"
              >
                Join Waitlist – Lawyers
              </button>
            </div>

            <div className="text-sm text-muted">
              <span className="font-semibold text-accent">🚀 120+ on the waitlist already!</span>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MobileAppMockup />
          </motion.div>
        </div>
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