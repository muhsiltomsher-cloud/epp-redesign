"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">
        <div className="epp-container py-4 border-b border-gray-100">
          <Skeleton className="w-40 h-3" />
        </div>
        <div className="epp-container py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-3 fade-in-up">
              <Skeleton className="w-full aspect-[3/4]" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-16 aspect-square" />
                ))}
              </div>
            </div>
            <div className="space-y-4 fade-in-up">
              <Skeleton className="w-24 h-3" />
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-12" />
              <div className="flex gap-3">
                <Skeleton className="w-24 h-12" />
                <Skeleton className="w-12 h-12" />
              </div>
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-24" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
