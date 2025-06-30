import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white px-4 relative">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 right-6 text-sm font-medium text-indigo-600 hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to MyLaunch</h2>
        <form
            className="space-y-5"
            onSubmit={(e) => {
                e.preventDefault(); // prevent page reload
                navigate("/dashboard"); // redirect after "login"
            }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
