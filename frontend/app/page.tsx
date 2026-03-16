'use client';

import Link from 'next/link';
import { ArrowRight, TrendingDown, Bell, LineChart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  const mockupContainerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const mockupItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "backOut" as const } }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-[20%] left-0 -z-10 w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-50 transform -translate-x-1/2"></div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-lg border-b border-gray-100/50"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-indigo-600">
            <ShoppingBag className="w-6 h-6" />
            SmartCart
          </div>
          <div className="space-x-6 flex items-center">
            <Link href="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">Log in</Link>
            <Link href="/register" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 transform">
              Start Tracking
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative pt-20 pb-20 sm:pt-32 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Now supporting Amazon & Flipkart
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]"
            >
              Buy it at the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">perfect price.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-xl text-gray-500 mb-12 leading-relaxed"
            >
              Drop a link. We’ll watch it day and night. Get an instant alert the second your item goes on sale, so you never overpay again.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex justify-center flex-col sm:flex-row gap-4"
            >
              <Link href="/register" className="group flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)] hover:bg-indigo-500">
                Track for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#how-it-works" className="flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all hover:border-gray-300">
                See how it works
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Dashboard Preview Image (Mockup) */}
        <motion.div 
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            variants={mockupContainerVariants}
            animate={floatingAnimation}
            className="rounded-[2rem] p-2 bg-gray-900/5 shadow-2xl ring-1 ring-gray-900/10 backdrop-blur-3xl"
          >
            <div className="rounded-[1.5rem] overflow-hidden bg-white border border-gray-100 flex shadow-sm">
                <div className="w-full aspect-[16/9] bg-gray-50 relative flex flex-col">
                  {/* Mock Dash header */}
                  <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  {/* Mock Dash Content */}
                  <div className="p-8 flex gap-6 h-full items-center justify-center bg-gray-50/50">
                    <motion.div variants={mockupItemVariants} className="w-1/3 h-full max-h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                       <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                       <motion.div 
                         initial={{ width: "0%" }}
                         whileInView={{ width: "50%" }}
                         transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                         className="h-8 bg-indigo-100 rounded mt-4"
                       />
                       <div className="w-full h-32 bg-gray-50 rounded mt-6 border border-gray-100 flex items-end p-2 gap-1 overflow-hidden">
                          {[40, 70, 45, 90, 60, 30].map((h, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              transition={{ duration: 0.6, delay: 0.5 + (i * 0.1), ease: "backOut" }}
                              className="flex-1 bg-indigo-500 rounded-t" 
                            />
                          ))}
                       </div>
                    </motion.div>
                    <motion.div variants={mockupItemVariants} className="w-1/3 h-full max-h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between opacity-50 scale-95 transform">
                       <div className="w-full h-32 bg-gray-100 rounded mb-4 flex items-center justify-center">
                         <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin"></div>
                       </div>
                       <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/3 h-6 bg-gray-200 rounded mt-2"></div>
                     </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Minimal effort. Maximum savings.</h2>
            <p className="mt-4 text-lg text-gray-500">We handle the constant refreshing and checking, so you only need to act when the time is right.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <TrendingDown className="w-6 h-6 text-indigo-600" />,
                title: "Automated Tracking",
                description: "Paste a URL and let us do the rest. We check prices multiple times a day."
              },
              {
                icon: <Bell className="w-6 h-6 text-violet-600" />,
                title: "Instant Notifications",
                description: "The moment the price drops below your tracked amount, an email hits your inbox."
              },
              {
                icon: <LineChart className="w-6 h-6 text-blue-600" />,
                title: "Price History",
                description: "Analyze price trends over time with beautiful, interactive charts."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300 text-indigo-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight">
             <ShoppingBag className="w-5 h-5 text-indigo-600" />
             SmartCart
          </div>
          <p className="text-sm text-gray-500">© 2026 SmartCart Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
