import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <div className="flex items-center space-x-2 mb-10">
          <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow">
            🚀
          </div>
          <h2 className="text-xl font-bold text-gray-800">MyLaunch</h2>
        </div>
        <nav className="space-y-4">
          <Link to="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Dashboard</Link>
          <Link to="#" className="block text-gray-700 hover:text-indigo-600 font-medium">My Ideas</Link>
          <Link to="#" className="block text-gray-700 hover:text-indigo-600 font-medium">AI Assistant</Link>
          <Link to="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Settings</Link>
          <Link to="/" className="block text-red-600 hover:text-red-800 font-medium mt-8">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, David 👋</h1>
          <p className="text-gray-500 mt-1">Here’s what’s happening with your startup ideas today.</p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-2">🚀 Start a New Idea</h3>
            <p className="text-gray-500">Begin a new AI-powered startup idea in seconds.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-2">📊 View Analytics</h3>
            <p className="text-gray-500">Track how your startup ideas are performing.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-2">🧠 Use AI Assistant</h3>
            <p className="text-gray-500">Let AI help you improve and scale your ideas.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
