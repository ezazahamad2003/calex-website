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

const LaptopMockup = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const screens = [
    {
      title: "Building Permit Query",
      content: (
        <div className="h-full flex flex-col bg-white p-3">
          {/* Chat Interface - Full Screen */}
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
            {/* Header */}
            <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                CA
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-xs">Calex AI Assistant</div>
                <div className="text-xs text-green-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  Online • Responds instantly
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              {/* User Question */}
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-accent text-white rounded-lg rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm">
                  <p className="text-xs font-medium">Can I build a 3-story office building on lot 42A in downtown district?</p>
                  <div className="text-xs opacity-75 mt-1">2:34 PM</div>
                </div>
              </motion.div>
              
              {/* AI Response */}
              <motion.div 
                className="flex items-start space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  AI
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg rounded-tl-sm px-3 py-2 flex-1 shadow-sm">
                  <p className="text-xs text-gray-900 mb-2">Based on zoning code 15.2.3, downtown district allows up to 4 stories for commercial use. However, lot 42A requires a special use permit due to proximity to historic district (within 200ft).</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1">
                      <span className="text-xs text-blue-700 font-medium">📋 Municipal Code 15.2.3</span>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded px-2 py-1">
                      <span className="text-xs text-purple-700 font-medium">🏛️ Historic Preservation 8.1.2</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">2:34 PM • Verified by legal database</div>
                </div>
              </motion.div>
              
              {/* Follow-up Question */}
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-accent text-white rounded-lg rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm">
                  <p className="text-xs font-medium">What documents do I need for the permit?</p>
                  <div className="text-xs opacity-75 mt-1">2:35 PM</div>
                </div>
              </motion.div>
              
              {/* Additional Context Question */}
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="bg-accent text-white rounded-lg rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm">
                  <p className="text-xs font-medium">How long will the approval process take?</p>
                  <div className="text-xs opacity-75 mt-1">2:35 PM</div>
                </div>
              </motion.div>
              
              {/* Typing indicator */}
              <motion.div 
                className="flex items-start space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  AI
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg rounded-tl-sm px-3 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">AI is preparing comprehensive guidance</span>
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 pt-2">
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Ask about permits, zoning, or regulations..."
                  className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-500 focus:outline-none"
                  readOnly
                />
                <motion.button
                  className="bg-accent text-white rounded px-3 py-1 text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Document Requirements",
      content: (
        <div className="h-full flex flex-col bg-white p-3">
          {/* Header */}
          <div className="flex items-center space-x-3 pb-2 border-b border-gray-200 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-xs">Document Requirements</div>
              <div className="text-xs text-gray-500">Special Use Permit - Lot 42A</div>
            </div>
          </div>
          
          {/* Document List */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="font-semibold text-blue-900 mb-2 text-xs">Required Documents:</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-800">Site plan & architectural drawings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-800">Environmental impact study</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-800">Historic district compatibility review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-800">Traffic impact assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-800">Parking & accessibility compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-800">Fire safety & egress plans</span>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h3 className="font-semibold text-yellow-900 mb-2 text-xs">Processing Timeline:</h3>
              <div className="text-xs text-yellow-800 space-y-1">
                <p>• Document preparation: 2-3 weeks</p>
                <p>• Initial review: 1-2 weeks</p>
                <p>• Public hearing: 3-4 weeks</p>
                <p>• Final approval: 1-2 weeks</p>
                <p className="font-semibold pt-1 border-t border-yellow-200">Total time: 7-11 weeks</p>
              </div>
            </div>

            {/* Cost Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h3 className="font-semibold text-green-900 mb-2 text-xs">Fee Structure:</h3>
              <div className="text-xs text-green-800 space-y-1">
                <div className="flex justify-between">
                  <span>Application fee:</span>
                  <span className="font-medium">$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Review fee:</span>
                  <span className="font-medium">$1,800</span>
                </div>
                <div className="flex justify-between">
                  <span>Public notice:</span>
                  <span className="font-medium">$350</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-green-200 font-semibold">
                  <span>Total:</span>
                  <span>$4,650</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <motion.button 
              className="bg-accent text-white rounded-lg py-2 px-3 text-xs font-medium shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Application
            </motion.button>
            <motion.button 
              className="bg-gray-100 text-gray-800 rounded-lg py-2 px-3 text-xs font-medium border border-gray-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Find Consultant
            </motion.button>
          </div>
        </div>
      )
    },
    {
      title: "Application Status",
      content: (
        <div className="h-full flex flex-col bg-white p-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-xs">Application Status</div>
                <div className="text-xs text-gray-500">Permit #BP-2025-42A</div>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Active
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-green-900">Initial Review</div>
                  <div className="text-xs text-green-700">Completed Oct 14, 2025</div>
                </div>
                <div className="text-xs text-green-600 font-medium">DONE</div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-blue-900">Historic Review</div>
                  <div className="text-xs text-blue-700">In progress - 3 days left</div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                    <motion.div 
                      className="bg-blue-500 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div className="text-xs text-blue-600 font-medium">60%</div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-yellow-900">Public Hearing</div>
                  <div className="text-xs text-yellow-700">Scheduled Oct 22, 2025</div>
                </div>
                <div className="text-xs text-yellow-600 font-medium">PENDING</div>
              </div>

              <div className="flex items-center space-x-3 p-2 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">4</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-600">Final Approval</div>
                  <div className="text-xs text-gray-500">Awaiting hearing results</div>
                </div>
                <div className="text-xs text-gray-500 font-medium">QUEUE</div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
                <div className="text-xs font-semibold text-purple-900 mb-1">Current Phase</div>
                <div className="text-xs text-purple-800">Historic District Review</div>
                <div className="text-xs text-purple-600 mt-1">Reviewer: Sarah Chen</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                <div className="text-xs font-semibold text-orange-900 mb-1">Next Action</div>
                <div className="text-xs text-orange-800">Public Notice Filing</div>
                <div className="text-xs text-orange-600 mt-1">Due: Oct 18, 2025</div>
              </div>
            </div>
          </div>
          
          {/* Footer Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-2 mt-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-900">Est. Completion</div>
                <div className="text-sm font-bold text-blue-800">Oct 25, 2025</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-700">Next Update</div>
                <div className="text-xs font-medium text-blue-800">Oct 18, 2025</div>
              </div>
            </div>
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
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Laptop Frame */}
      <motion.div
        className="relative mx-auto perspective-1000"
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        onHoverStart={() => setIsInteracting(true)}
        onHoverEnd={() => setIsInteracting(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Laptop Shadow */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[600px] h-16 bg-black/30 rounded-full blur-3xl" />
        
        {/* Laptop Screen */}
        <div className="relative transform-gpu">
          {/* Screen Bezel */}
          <motion.div 
            className="bg-gray-900 rounded-t-3xl p-3 shadow-2xl border-4 border-gray-800"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            {/* Screen */}
            <div className="w-[500px] h-[320px] bg-black rounded-2xl overflow-hidden relative shadow-inner border-2 border-gray-700">
              {/* Screen Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              
              {/* Screen Content - Properly aligned with padding for bezel */}
              <div className="absolute inset-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, scale: 0.95, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.05, x: -30 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-full w-full"
                  >
                    {screens[activeScreen].content}
                  </motion.div>
                </AnimatePresence>
                
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-xl" />
              </div>
            </div>
            
            {/* Webcam */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full border border-gray-500">
              <div className="w-1 h-1 bg-gray-400 rounded-full m-0.5"></div>
            </div>
          </motion.div>
          
          {/* Laptop Base */}
          <div className="relative">
            {/* Laptop Body */}
            <motion.div 
              className="bg-gray-800 rounded-b-3xl h-12 shadow-xl border-4 border-gray-800 border-t-0"
              whileHover={{ boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.4)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-b-3xl">
                {/* Keyboard Area */}
                <div className="absolute top-2 left-8 right-8 h-6 bg-gray-700 rounded-lg shadow-inner">
                  {/* Keyboard Keys */}
                  <div className="grid grid-cols-12 gap-1 p-1 h-full">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gray-600 rounded-sm border border-gray-500"
                        whileHover={{ backgroundColor: "#4B5563" }}
                        animate={{ 
                          backgroundColor: isInteracting ? ["#6B7280", "#4B5563", "#6B7280"] : "#6B7280"
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: i * 0.05,
                          repeat: isInteracting ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Trackpad */}
                <motion.div 
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-600 rounded-lg border border-gray-500 cursor-pointer"
                  whileHover={{ backgroundColor: "#6B7280", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveScreen((prev) => (prev + 1) % screens.length);
                    setIsInteracting(true);
                    setTimeout(() => setIsInteracting(false), 1000);
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-inner"></div>
                </motion.div>
                
                {/* Brand Logo */}
                <div className="absolute top-1 right-4 text-xs text-gray-500 font-bold">CALEX</div>
              </div>
            </motion.div>
            
            {/* Laptop Stand */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-gray-700 rounded-b-2xl shadow-lg"></div>
          </div>
        </div>
        
        {/* Interactive Elements */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
          {/* Navigation Dots */}
          <div className="flex justify-center space-x-4">
            {screens.map((_, index) => (
              <motion.button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  index === activeScreen 
                    ? 'bg-accent border-accent shadow-lg shadow-accent/50' 
                    : 'bg-gray-400 border-gray-400 hover:bg-gray-300'
                }`}
                onClick={() => {
                  setActiveScreen(index);
                  setIsInteracting(true);
                  setTimeout(() => setIsInteracting(false), 2000);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={index === activeScreen ? { 
                  boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.7)", "0 0 0 10px rgba(59, 130, 246, 0)"]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
          
          {/* Screen Labels */}
          <motion.div
            className="text-sm text-gray-600 font-medium text-center"
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {screens[activeScreen].title}
          </motion.div>
        </div>
        
        {/* Floating Action Hint */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center space-x-2">
            <span>👆 Click trackpad or dots to interact</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>
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
            <LaptopMockup />
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