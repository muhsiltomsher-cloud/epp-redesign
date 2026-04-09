"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrderSuccess() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setOrderNumber(`EPP-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] md:pt-[106px] flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-[520px] text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
            <CheckCircle size={40} strokeWidth={1} className="text-[#c9a96e]" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">Emirates Pride</p>
          <h1 className="text-2xl md:text-3xl font-serif mb-3 md:mb-4">Thank You</h1>
          <p className="text-[11px] md:text-xs text-black/40 font-light tracking-wide mb-8 md:mb-10 leading-relaxed max-w-[360px] mx-auto">
            Your order has been placed successfully. We are preparing your exquisite fragrance for delivery.
          </p>

          {/* Order Details Card */}
          <div className="bg-[#faf9f7] border border-black/5 p-6 md:p-8 mb-8 md:mb-10 text-left">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-black/10">
              <Package size={18} strokeWidth={1} className="text-[#c9a96e]" />
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block">Order Number</span>
                <span className="text-[13px] font-medium text-black tracking-wide">{orderNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block mb-1">Status</span>
                <span className="text-[11px] text-[#c9a96e] font-medium">Confirmed</span>
              </div>
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block mb-1">Estimated Delivery</span>
                <span className="text-[11px] text-black">3-5 Business Days</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-center gap-0 mb-8 md:mb-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
              <span className="text-[8px] tracking-wider uppercase mt-2 text-[#c9a96e] font-medium">Confirmed</span>
            </div>
            <div className="w-12 md:w-16 h-[1px] bg-black/15 mx-1" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black/20" />
              </div>
              <span className="text-[8px] tracking-wider uppercase mt-2 text-black/40">Processing</span>
            </div>
            <div className="w-12 md:w-16 h-[1px] bg-black/15 mx-1" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black/20" />
              </div>
              <span className="text-[8px] tracking-wider uppercase mt-2 text-black/40">Shipped</span>
            </div>
            <div className="w-12 md:w-16 h-[1px] bg-black/15 mx-1" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black/20" />
              </div>
              <span className="text-[8px] tracking-wider uppercase mt-2 text-black/40">Delivered</span>
            </div>
          </div>

          <p className="text-[10px] text-black/40 mb-6 md:mb-8 font-light">
            A confirmation email has been sent to your email address.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/collection">
              <span className="creed-button inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto">
                Continue Shopping <ArrowRight size={14} strokeWidth={1.5} />
              </span>
            </Link>
            <Link href="/account">
              <span className="creed-button-outline inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto">
                View My Orders
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
