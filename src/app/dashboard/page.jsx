"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  HiOutlineUser,
  HiOutlinePencilAlt,
  HiOutlineX,
  HiOutlineLogout,
} from "react-icons/hi";
import { FaBookReader } from "react-icons/fa";

const DashboardPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);


  const handleOpenEdit = () => {
    setEditName(user?.name || "");
    setEditImage(user?.image || "");
    setStatusMsg(null);
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setStatusMsg(null);

    try {
      if (typeof authClient.updateUser === "function") {
        await authClient.updateUser({
          name: editName,
          image: editImage,
        });
      }
      setStatusMsg({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => {
        setIsEditModalOpen(false);
        window.location.reload();
      }, 700);
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Failed to update profile. Please try again." });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            <p className="text-slate-500 font-medium text-sm">Loading your dashboard...</p>
          </div>
        ) : !user ? (
          <div className="max-w-md mx-auto my-16 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 text-center space-y-5">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <HiOutlineUser />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-800">Sign in Required</h2>
              <p className="text-slate-500 text-sm">
                Please sign in to access your BookSphere dashboard and personalized reading stats.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white font-bold shadow-md hover:opacity-95 transition cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                Go Home
              </Link>
            </div>
          </div>
        ) : (
         
          <>
          
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-900/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User Avatar"}
                      width={90}
                      height={90}
                      unoptimized
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white/40 shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md text-white font-extrabold text-3xl flex items-center justify-center border-2 border-white/40 shadow-lg">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        {user.name}
                      </h1>
                      <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-yellow-200">
                        Scholar Member
                      </span>
                    </div>
                    <p className="text-purple-100 text-sm">{user.email}</p>
                    <p className="text-purple-200 text-xs pt-1 flex items-center justify-center sm:justify-start gap-1">
                      <FaBookReader className="inline" /> Welcome back to your reading sanctuary!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleOpenEdit}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-purple-700 font-bold text-sm shadow hover:bg-purple-50 transition active:scale-95 cursor-pointer"
                  >
                    <HiOutlinePencilAlt className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-sm backdrop-blur-md transition cursor-pointer"
                    title="Logout"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>

              </div>
            </div>

           
          
          </>
        )}

      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Update Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

        

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-slate-800"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white font-bold text-sm shadow hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
