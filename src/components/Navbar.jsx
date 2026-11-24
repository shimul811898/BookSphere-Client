"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.08)] font-bangla">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">

        <Link href="/" className="flex items-center gap-3 group">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Book<span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">Sphere</span>
          </h2>
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-semibold text-slate-700">
          <li className="group relative py-2">
            <Link href="/" className="hover:text-purple-600 transition duration-300">
              Home
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </li>
          <li className="group relative py-2">
            <Link href="/all" className="hover:text-purple-600 transition duration-300">
              Books Item
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </li>
          <li className="group relative py-2">
            <Link href="/dashboard" className="hover:text-purple-600 transition duration-300">
              Dashboard
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="text-xs text-slate-400 font-medium">Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 group hover:opacity-90 transition cursor-pointer"
                title="Go to Dashboard"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={38}
                    height={38}
                    unoptimized
                    className="rounded-full border border-purple-200 object-cover group-hover:ring-2 group-hover:ring-purple-400 transition"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm border border-purple-200 group-hover:ring-2 group-hover:ring-purple-400 transition">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-sm transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl font-bold text-slate-700 hover:text-purple-600 hover:bg-white/40 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white font-bold shadow-[0_4px_15px_rgba(147,51,234,0.3)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white/40 text-purple-700 hover:bg-white/60 transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <ul className="flex flex-col gap-4 font-semibold text-slate-700">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-purple-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/all" onClick={() => setIsOpen(false)} className="block py-2 hover:text-purple-600 transition">
                Books Item
              </Link>
            </li>
            <li>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 hover:text-purple-600 transition">
                Dashboard
              </Link>
            </li>
          </ul>

          <div className="w-full h-px bg-white/30 my-2" />

          <div className="flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-50/70 hover:bg-purple-100/70 transition cursor-pointer"
                  title="Go to Dashboard"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={38}
                      height={38}
                      unoptimized
                      className="rounded-full border border-purple-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm border border-purple-200">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                    <span className="text-xs text-purple-600 font-medium">View Dashboard &rarr;</span>
                  </div>
                </Link>
                <button
                  onClick={async () => {
                    setIsOpen(false);
                    await handleLogout();
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-50 text-purple-700 font-bold text-center hover:bg-purple-100 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-xl font-bold text-center text-purple-700 bg-white/40 hover:bg-white/60 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white font-bold text-center shadow-md active:scale-[0.98] transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
