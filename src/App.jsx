'use client';

import React from 'react';

// You can move the CSS to a global stylesheet or use a <style jsx global> block if using Next.js
// For demonstration, we use a <style jsx global> block below.

export default function HomePage() {
  return (
    <>
         <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        .text-gradient {
          background: linear-gradient(to right, #6366f1, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bg-gradient {
          background: linear-gradient(to right, #6366f1, #06b6d4);
        }
        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0) 70%);
          z-index: 0;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        .animated-bg span {
          position: absolute;
          display: block;
          width: 20px;
          height: 20px;
          background: rgba(99, 102, 241, 0.1);
          animation: animate 25s linear infinite;
          bottom: -150px;
          border-radius: 50%;
        }
        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
        .animated-bg span:nth-child(1) {
          left: 25%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
          animation-duration: 20s;
          background: rgba(6, 182, 212, 0.1);
        }
        .animated-bg span:nth-child(2) {
          left: 10%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 25s;
        }
        .animated-bg span:nth-child(3) {
          left: 70%;
          width: 30px;
          height: 30px;
          animation-delay: 4s;
          animation-duration: 18s;
          background: rgba(6, 182, 212, 0.1);
        }
        .animated-bg span:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 15s;
        }
        .animated-bg span:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
          animation-duration: 12s;
          background: rgba(6, 182, 212, 0.1);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .floating-slow {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
     
      <div className="bg-gray-50 text-gray-800">
    {/* Animated Background */}
    <div className="animated-bg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    {/* Navigation */}
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl font-bold">🚀</span>
                        </div>
                        <span className="ml-3 text-xl font-bold text-gray-800">MyLaunch</span>
                        <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-md">BETA</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">Features</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">How It Works</a>
                    <a href="#pricing" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">Pricing</a>
                    <a href="#testimonials" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">Testimonials</a>
                    <a href="#faq" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">FAQ</a>
                </div>
                <div className="flex items-center">
                    <button className="hidden md:block bg-gradient hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all mr-3 shadow-sm border border-gray-200">
                        Login
                    </button>
                    <button className="bg-gradient text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg">
                        Get Started Free
                    </button>
                </div>
                <div className="flex items-center md:hidden">
                    <button id="mobile-menu-button" className="text-gray-600 hover:text-indigo-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden bg-white shadow-lg absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">Features</a>
                <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">How It Works</a>
                <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">Pricing</a>
                <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">Testimonials</a>
                <a href="#faq" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">FAQ</a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">Login</a>
            </div>
        </div>
</nav>
{/* Hero Section */}
<section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
    <div className="hero-glow top-20 left-1/4 opacity-70"></div>
    <div className="hero-glow bottom-20 right-1/4 opacity-70" style={{background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0) 70%)"}}></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-6">
                    <span className="animate-pulse h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm font-medium text-gray-700">Revolutionizing Startup Creation</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    <span>Turn Your Idea Into a</span>
                    <br />
                    <span className="text-gradient">Billion-Dollar Startup</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                    MyLaunch uses advanced AI to transform your one-line business idea into a complete startup ecosystem — from branding to websites, marketing plans to legal docs, all in minutes.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                    <button className="bg-gradient text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center">
                        <span>Start Building Free</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                    <button className="bg-gradient text-gray-800 border border-gray-300 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center shadow-lg hover:shadow-xl">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Watch Demo
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%236366f1'/%3E%3Ctext x='50' y='50' font-size='50' text-anchor='middle' dominant-baseline='middle' font-family='Arial' fill='white'%3EA%3C/text%3E%3C/svg%3E" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2306b6d4'/%3E%3Ctext x='50' y='50' font-size='50' text-anchor='middle' dominant-baseline='middle' font-family='Arial' fill='white'%3EB%3C/text%3E%3C/svg%3E" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23a5b4fc'/%3E%3Ctext x='50' y='50' font-size='50' text-anchor='middle' dominant-baseline='middle' font-family='Arial' fill='white'%3EC%3C/text%3E%3C/svg%3E" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2367e8f9'/%3E%3Ctext x='50' y='50' font-size='50' text-anchor='middle' dominant-baseline='middle' font-family='Arial' fill='white'%3ED%3C/text%3E%3C/svg%3E" alt="User" />
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium text-xs">+5K</div>
                    </div>
                    <div className="ml-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600 font-medium">from <span className="font-bold">5,000+</span> founders</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-2xl blur-2xl transform rotate-6 scale-105"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="flex items-center px-4 py-3 bg-gray-800">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="mx-auto text-gray-300 text-sm font-medium">MyLaunch AI Builder</div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center text-white text-xl shadow-lg">
                                    🤖
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-medium text-lg">MyLaunch AI</div>
                                    <div className="text-gray-400 text-sm">Ready to build your billion-dollar startup</div>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-6">
                                <p className="text-gray-300 font-medium">Tell me your business idea in one line:</p>
                                <div className="mt-3 flex">
                                    <input type="text" className="bg-gray-700 text-white rounded-l-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600" value="A subscription box for exotic cooking ingredients" readOnly />
                                    <button className="bg-gradient text-white px-4 py-3 rounded-r-lg transition-all">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-gray-300">Analyzing market opportunity...</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-gray-300">Generating business name: <span className="text-white font-medium">SpiceVoyage</span></div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-gray-300">Creating brand identity...</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white animate-pulse shadow-md">
                                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-gray-300">Building landing page...</div>
                                </div>
                                <div className="flex items-center opacity-60">
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-gray-400">Preparing marketing plan...</div>
                                </div>
                                <div className="flex items-center opacity-60">
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-gray-400">Generating legal documents...</div>
                                </div>
                            </div>
                            <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="text-gray-300 text-sm">Estimated completion: <span className="text-white font-medium">3 minutes</span></span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-gradient h-2.5 rounded-full" style={{width: "45%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    {/* Features Section */}
    <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Launch Your Startup</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">MyLaunch provides all the essential tools and resources to transform your idea into a fully operational business in record time.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="feature-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">AI-Powered Idea Validation</h3>
                    <p className="text-gray-600 mb-4">Our advanced AI analyzes your business idea against market trends, competition, and potential profitability to validate its viability.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Market opportunity analysis</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Competitor research</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Revenue potential estimates</span>
                        </li>
                    </ul>
                </div>
                
                {/* Feature 2 */}
                <div className="feature-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center mb-6">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Complete Brand Identity</h3>
                    <p className="text-gray-600 mb-4">Generate a professional brand identity package including name suggestions, logo designs, color schemes, and brand guidelines.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Business name generation</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Logo design options</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Brand style guide</span>
                        </li>
                    </ul>
                </div>
                
                {/* Feature 3 */}
                <div className="feature-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Professional Website</h3>
                    <p className="text-gray-600 mb-4">Launch a stunning, conversion-optimized website with custom domain, hosting, and all essential pages for your business.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Responsive design</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">SEO optimization</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Analytics integration</span>
                        </li>
                    </ul>
                </div>
                
                {/* Feature 4 */}
                <div className="feature-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-6">
                        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Marketing Strategy</h3>
                    <p className="text-gray-600 mb-4">Get a comprehensive marketing plan with audience targeting, content strategy, and advertising recommendations.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Social media strategy</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Content calendar</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Ad campaign blueprints</span>
                        </li>
                    </ul>
                </div>
                
                {/* Feature 5 */}
                <div className="feature-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Legal Documentation</h3>
                    <p className="text-gray-600 mb-4">Generate essential legal documents tailored to your business type and jurisdiction to ensure compliance.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Terms of service</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Privacy policy</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Business registration guides</span>
                        </li>
                    </ul>
                </div>
                
                {/* Feature 6 */}
                <div className="feature-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Financial Planning</h3>
                    <p className="text-gray-600 mb-4">Create detailed financial projections, pricing strategies, and funding options tailored to your business model.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Revenue forecasting</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Expense planning</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Break-even analysis</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/* How It Works Section */}
    <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How MyLaunch Works</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">From idea to launch in just four simple steps. Our AI-powered platform handles the complex work so you can focus on growing your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Step 1 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
                    <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">1</div>
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Share Your Idea</h3>
                    <p className="text-gray-600 text-center">Describe your business idea in a single sentence. Our AI will understand the concept and start building your startup ecosystem.</p>
                </div>
                
                {/* Step 2 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
                    <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
                    <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mb-6 mx-auto">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">AI Analysis</h3>
                    <p className="text-gray-600 text-center">Our AI analyzes market potential, competition, and business viability to create a tailored startup plan for your specific idea.</p>
                </div>
                
                {/* Step 3 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
                    <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Customize & Refine</h3>
                    <p className="text-gray-600 text-center">Review AI-generated assets and make adjustments to perfectly align with your vision and preferences.</p>
                </div>
                
                {/* Step 4 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative">
                    <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">4</div>
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Launch & Grow</h3>
                    <p className="text-gray-600 text-center">Deploy your complete startup ecosystem with one click and start acquiring customers and growing your business.</p>
                </div>
            </div>
        </div>
    </section>

    {/* Pricing Section */}
    <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that fits your needs. All plans include our core AI-powered startup creation tools.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Starter Plan */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                    <h3 className="text-xl font-bold mb-4">Starter</h3>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">$29</span>
                        <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">Perfect for solo entrepreneurs just getting started.</p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">1 Business Idea</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Basic Brand Identity</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Simple Landing Page</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Basic Marketing Plan</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Standard Legal Documents</span>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span>Financial Projections</span>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span>Investor Pitch Deck</span>
                        </li>
                    </ul>
                    <button className="w-full bg-gradient hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all">
                        Get Started
                    </button>
                </div>
                
                {/* Pro Plan */}
                <div className="bg-gradient to-r from-indigo-500 to-cyan-500 rounded-xl p-1 shadow-xl transform scale-105">
                    <div className="bg-white rounded-lg p-8 h-full">
                        <div className="absolute -top-5 right-8 bg-gradient text-white px-4 py-1 rounded-full font-medium text-sm">MOST POPULAR</div>
                        <h3 className="text-xl font-bold mb-4">Pro</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$79</span>
                            <span className="text-gray-600">/month</span>
                        </div>
                        <p className="text-gray-600 mb-6">Ideal for serious entrepreneurs ready to scale.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">3 Business Ideas</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">Premium Brand Package</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">Multi-page Website</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">Comprehensive Marketing</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">Advanced Legal Package</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">Financial Projections</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                <span>Investor Pitch Deck</span>
                            </li>
                        </ul>
                        <button className="w-full bg-gradient text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl">
                            Get Started
                        </button>
                    </div>
                </div>
                
                {/* Enterprise Plan */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                    <h3 className="text-xl font-bold mb-4">Enterprise</h3>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">$199</span>
                        <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">For businesses seeking investment and rapid growth.</p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Unlimited Business Ideas</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Enterprise Brand Package</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Custom Website & App</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Enterprise Marketing Suite</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Complete Legal Framework</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">5-Year Financial Model</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Investor Pitch Deck</span>
                        </li>
                    </ul>
                    <button className="w-full bg-gradient hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Turn Your Idea Into Reality?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of entrepreneurs who have successfully launched their startups with MyLaunch. Start building your dream business today.</p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                Get Started Free - No Credit Card Required
            </button>
        </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl font-bold">🚀</span>
                        </div>
                        <span className="ml-3 text-xl font-bold">MyLaunch</span>
                    </div>
                    <p className="text-gray-400 mb-4">Transforming ideas into successful startups with the power of AI.</p>
                                        <div className="flex space-x-4">
                                            <a href="#" className="text-gray-400 hover:text-white">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    {/* You can add more footer columns here if needed */}
                                </div>
                            </div>
                        </footer>
                        </div>
                        </>
                      );
                    }