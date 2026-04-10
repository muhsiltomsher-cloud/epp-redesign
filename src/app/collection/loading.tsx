"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[72px] pb-24 md:pb-0">
        <div className="border-b border-gray-100 py-6 text-center epp-container">
          <Skeleton className="mx-auto w-24 h-3 mb-2" />
          <Skeleton className="mx-auto w-40 h-4" />
        </div>

        <div className="epp-container py-8 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3 fade-in-up">
                <Skeleton className="w-full aspect-[3/4]" />
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-20 h-3" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
