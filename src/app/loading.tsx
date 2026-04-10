"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[88px] pb-24 md:pb-0">
        <section className="epp-container py-6 space-y-4">
          <Skeleton className="w-full h-48 md:h-72" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3 fade-in-up">
                <Skeleton className="w-full aspect-[3/4]" />
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-32 h-3" />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
