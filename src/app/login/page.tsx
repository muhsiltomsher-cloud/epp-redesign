"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { login, isLoggedIn } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoggedIn()) {
    router.push("/account");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        router.push("/account");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] md:pt-[106px] flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-8 md:mb-12">
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-3 md:mb-4 text-black">Welcome Back</h1>
            <p className="text-[11px] md:text-xs text-black/60 font-light tracking-wide">
              Sign in to your Emirates Pride account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-[11px] tracking-wide">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-black font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border-b border-black/20 focus:border-[#c9a96e] bg-transparent py-3 text-[12px] md:text-sm text-black placeholder:text-black/30 outline-none transition-colors"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-black font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-b border-black/20 focus:border-[#c9a96e] bg-transparent py-3 text-[12px] md:text-sm text-black placeholder:text-black/30 outline-none transition-colors pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1} /> : <Eye size={16} strokeWidth={1} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-[#c9a96e]" />
                <span className="text-[10px] tracking-wide text-black/60">Remember me</span>
              </label>
              <button type="button" className="text-[10px] tracking-wide text-[#c9a96e] hover:text-[#8a6d3b] transition-colors">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="creed-button w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[9px] tracking-[0.15em] uppercase text-black/40">Or</span>
              </div>
            </div>

            <button
              type="button"
              className="creed-button-outline w-full"
            >
              Create an Account
            </button>
          </form>

          <div className="mt-8 md:mt-10 p-4 bg-[#faf9f7] border border-black/5">
            <p className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] font-medium mb-2">Demo Credentials</p>
            <div className="text-[10px] text-black/60 leading-relaxed space-y-1 mb-3">
              <p><span className="text-black/40 text-[9px] uppercase tracking-wider">Email:</span> customer@emiratespride.com</p>
              <p><span className="text-black/40 text-[9px] uppercase tracking-wider">Password:</span> demo1234</p>
            </div>
            <button
              type="button"
              onClick={() => { setEmail("customer@emiratespride.com"); setPassword("demo1234"); }}
              className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#8a6d3b] transition-colors font-medium border border-[#c9a96e]/30 px-3 py-1.5 hover:bg-[#c9a96e]/5"
            >
              Auto-fill Demo Credentials
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
