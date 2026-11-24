"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photo || undefined,
        callbackURL: "/",
      });

      if (error) {
        setMessage({ type: "error", text: error.message || "Registration failed. Please try again." });
        setIsLoading(false);
        return;
      }

      setMessage({ type: "success", text: "Account created successfully! Redirecting..." });
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Please check your connection." });
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setMessage(null);
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google signup error:", err);
      setMessage({
        type: "error",
        text: "Google sign-up failed. Please try again.",
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/80 px-4 py-12">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-purple-100 rounded-3xl w-full max-w-md p-8 sm:p-10 space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Book
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                Sphere
              </span>
            </h1>
          </Link>
          <p className="text-sm text-slate-500 font-medium">
            Create your account
          </p>
        </div>

        {message && (
          <div
            className={`p-3.5 rounded-xl text-sm font-medium text-center ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-slate-800 text-sm placeholder:text-slate-400"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-slate-800 text-sm placeholder:text-slate-400"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Profile Photo URL <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-slate-800 text-sm placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-slate-800 text-sm pr-11 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition"
                aria-label="Toggle password visibility"
              >
                {isShowPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 hover:opacity-95 shadow-md shadow-purple-500/25 active:scale-[0.99] transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-slate-200" />
          <span className="text-xs font-medium text-slate-400">or</span>
          <hr className="flex-1 border-slate-200" />
        </div>

        <button
          type="button"
          disabled={isGoogleLoading}
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] shadow-sm transition font-medium text-slate-700 text-sm disabled:opacity-50 cursor-pointer"
        >
          <FcGoogle className="w-5 h-5" />
          <span>{isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
        </button>

        <div className="text-center pt-2">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-purple-600 hover:text-purple-700 hover:underline transition"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
