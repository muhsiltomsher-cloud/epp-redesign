"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, MapPin, LogOut, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getUser, isLoggedIn, logout, updateProfile, UserProfile } from "@/lib/auth";

const SAMPLE_ORDERS = [
  {
    id: "EPP-20260315-001",
    date: "March 15, 2026",
    status: "Delivered",
    total: 1490,
    items: [
      { name: "Future Bakhoor", qty: 1, price: 695, image: "https://emiratespride.com/wp-content/uploads/2026/01/future-bakhoor.jpg" },
      { name: "Future Oud", qty: 1, price: 795, image: "https://emiratespride.com/wp-content/uploads/2026/01/future-oud.jpg" },
    ],
  },
  {
    id: "EPP-20260228-002",
    date: "February 28, 2026",
    status: "Delivered",
    total: 895,
    items: [
      { name: "Al Emarat", qty: 1, price: 895, image: "https://emiratespride.com/ae/wp-content/uploads/2024/05/al-emarat.jpg" },
    ],
  },
];

const SAMPLE_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    name: "Ahmed Al Maktoum",
    line1: "Villa 42, Al Wasl Road",
    line2: "Jumeirah 2",
    city: "Dubai",
    country: "United Arab Emirates",
    phone: "+971 50 123 4567",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Ahmed Al Maktoum",
    line1: "Office 1205, DIFC Gate Building",
    line2: "Sheikh Zayed Road",
    city: "Dubai",
    country: "United Arab Emirates",
    phone: "+971 50 123 4567",
    isDefault: false,
  },
];

type Tab = "profile" | "orders" | "addresses";

export default function Account() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "" });

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    const u = getUser();
    setUser(u);
    if (u) {
      setFormData({ firstName: u.firstName, lastName: u.lastName, phone: u.phone });
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateProfile(formData);
    if (updated) {
      setUser(updated);
      setEditMode(false);
    }
  };

  if (!user) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User size={16} strokeWidth={1} /> },
    { key: "orders", label: "Orders", icon: <Package size={16} strokeWidth={1} /> },
    { key: "addresses", label: "Addresses", icon: <MapPin size={16} strokeWidth={1} /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[80px] md:pt-[116px]">
        <div className="px-4 md:px-10 lg:px-20 xl:px-28 py-8 md:py-16">
          {/* Header */}
          <div className="text-center mb-8 md:mb-14">
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2 text-black">My Account</h1>
            <p className="text-[11px] md:text-xs text-black/50 font-light tracking-wide">
              Welcome back, {user.firstName}
            </p>
          </div>

          <div className="max-w-[900px] mx-auto">
            {/* Tab Navigation */}
            <div className="flex border-b border-black/10 mb-8 md:mb-12 overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium transition-colors whitespace-nowrap border-b-2 -mb-[1px] ${
                    activeTab === tab.key
                      ? "border-[#c9a96e] text-[#c9a96e]"
                      : "border-transparent text-black/50 hover:text-black"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium text-black/50 hover:text-red-600 transition-colors whitespace-nowrap border-b-2 -mb-[1px] border-transparent ml-auto"
              >
                <LogOut size={16} strokeWidth={1} />
                Sign Out
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="max-w-[500px]">
                {!editMode ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e]">
                        <span className="text-xl md:text-2xl font-serif">{user.firstName[0]}{user.lastName[0]}</span>
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-serif text-black">{user.firstName} {user.lastName}</h2>
                        <p className="text-[11px] text-black/50 tracking-wide">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="border-b border-black/5 pb-3">
                        <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block mb-1">First Name</span>
                        <span className="text-[12px] text-black">{user.firstName}</span>
                      </div>
                      <div className="border-b border-black/5 pb-3">
                        <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block mb-1">Last Name</span>
                        <span className="text-[12px] text-black">{user.lastName}</span>
                      </div>
                      <div className="border-b border-black/5 pb-3">
                        <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block mb-1">Email</span>
                        <span className="text-[12px] text-black">{user.email}</span>
                      </div>
                      <div className="border-b border-black/5 pb-3">
                        <span className="text-[8px] tracking-[0.2em] uppercase text-black/40 block mb-1">Phone</span>
                        <span className="text-[12px] text-black">{user.phone}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditMode(true)}
                      className="creed-button-outline self-start mt-2"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full border-b border-black/20 focus:border-[#c9a96e] bg-transparent py-3 text-[12px] text-black outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full border-b border-black/20 focus:border-[#c9a96e] bg-transparent py-3 text-[12px] text-black outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border-b border-black/20 focus:border-[#c9a96e] bg-transparent py-3 text-[12px] text-black outline-none transition-colors"
                      />
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button type="submit" className="creed-button">Save Changes</button>
                      <button type="button" onClick={() => setEditMode(false)} className="creed-button-outline">Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="flex flex-col gap-6">
                {SAMPLE_ORDERS.map((order) => (
                  <div key={order.id} className="border border-black/10 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-black/5 gap-2">
                      <div>
                        <span className="text-[9px] tracking-[0.2em] uppercase text-black/40">Order</span>
                        <p className="text-[12px] font-medium text-black">{order.id}</p>
                      </div>
                      <div className="flex items-center gap-4 md:gap-6">
                        <div>
                          <span className="text-[9px] tracking-[0.2em] uppercase text-black/40">Date</span>
                          <p className="text-[11px] text-black">{order.date}</p>
                        </div>
                        <div>
                          <span className="text-[9px] tracking-[0.2em] uppercase text-black/40">Status</span>
                          <p className="text-[11px] text-green-600 font-medium">{order.status}</p>
                        </div>
                        <div>
                          <span className="text-[9px] tracking-[0.2em] uppercase text-black/40">Total</span>
                          <p className="text-[11px] font-medium text-black">AED {order.total}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f5f5f5] flex-shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-serif text-black">{item.name}</p>
                            <p className="text-[10px] text-black/50">Qty: {item.qty}</p>
                          </div>
                          <p className="text-[12px] font-medium text-black">AED {item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {SAMPLE_ADDRESSES.map((addr) => (
                  <div key={addr.id} className="border border-black/10 p-4 md:p-6 relative">
                    {addr.isDefault && (
                      <span className="absolute top-3 right-3 text-[7px] tracking-[0.15em] uppercase px-2 py-0.5 bg-[#c9a96e] text-white font-medium">
                        Default
                      </span>
                    )}
                    <h3 className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium mb-3">{addr.label}</h3>
                    <p className="text-[12px] text-black font-medium mb-1">{addr.name}</p>
                    <p className="text-[11px] text-black/60 leading-relaxed">
                      {addr.line1}<br />
                      {addr.line2}<br />
                      {addr.city}, {addr.country}
                    </p>
                    <p className="text-[11px] text-black/60 mt-2">{addr.phone}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            <div className="mt-12 md:mt-16 text-center">
              <Link href="/collection">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#8a6d3b] transition-colors cursor-pointer">
                  Continue Shopping <ChevronRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
