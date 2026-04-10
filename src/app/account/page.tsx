"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, MapPin, LogOut, ChevronRight, Heart, Settings, HelpCircle, Bell, Shield, CreditCard, Edit3, Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getUser, isLoggedIn, logout, updateProfile, UserProfile } from "@/lib/auth";
import { getWishlist } from "@/lib/wishlist";
import { products } from "@/lib/data";

const SAMPLE_ORDERS = [
  {
    id: "EPP-20260315-001",
    date: "March 15, 2026",
    status: "Delivered",
    statusColor: "text-green-600 bg-green-50",
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
    statusColor: "text-green-600 bg-green-50",
    total: 895,
    items: [
      { name: "Al Emarat", qty: 1, price: 895, image: "https://emiratespride.com/ae/wp-content/uploads/2024/05/al-emarat.jpg" },
    ],
  },
  {
    id: "EPP-20260110-003",
    date: "January 10, 2026",
    status: "Processing",
    statusColor: "text-[#c9a96e] bg-[#c9a96e]/10",
    total: 1170,
    items: [
      { name: "Hidden Leather", qty: 1, price: 465, image: "https://emiratespride.com/wp-content/uploads/2021/03/HIDDEN-LEATHER-01.webp" },
      { name: "Future Bakhoor", qty: 1, price: 695, image: "https://emiratespride.com/wp-content/uploads/2026/01/future-bakhoor.jpg" },
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

type Section = "overview" | "orders" | "addresses" | "wishlist" | "settings";

export default function Account() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "" });
  const [wishlistCount, setWishlistCount] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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
    setWishlistCount(getWishlist().length);

    const onWishlistUpdate = () => setWishlistCount(getWishlist().length);
    window.addEventListener("wishlist-updated", onWishlistUpdate);
    return () => window.removeEventListener("wishlist-updated", onWishlistUpdate);
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

  const wishlistProducts = products.filter((p) => getWishlist().includes(p.id));

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] md:pt-[106px] pb-20 md:pb-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-black/5">
          <div className="px-5 pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8a6d3b] flex items-center justify-center text-white shadow-lg">
                <span className="text-lg font-serif">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-[17px] font-serif text-black truncate">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-[11px] text-black/40 truncate">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-black/30 hover:text-red-500 transition-colors">
                <LogOut size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-3 border-t border-black/5">
            <button onClick={() => setActiveSection("orders")} className="flex flex-col items-center py-3 border-r border-black/5">
              <span className="text-[15px] font-serif text-[#c9a96e]">{SAMPLE_ORDERS.length}</span>
              <span className="text-[8px] tracking-[0.15em] uppercase text-black/40 mt-0.5">Orders</span>
            </button>
            <button onClick={() => setActiveSection("wishlist")} className="flex flex-col items-center py-3 border-r border-black/5">
              <span className="text-[15px] font-serif text-[#c9a96e]">{wishlistCount}</span>
              <span className="text-[8px] tracking-[0.15em] uppercase text-black/40 mt-0.5">Wishlist</span>
            </button>
            <button onClick={() => setActiveSection("addresses")} className="flex flex-col items-center py-3">
              <span className="text-[15px] font-serif text-[#c9a96e]">{SAMPLE_ADDRESSES.length}</span>
              <span className="text-[8px] tracking-[0.15em] uppercase text-black/40 mt-0.5">Addresses</span>
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block bg-white border-b border-gray-100">
          <div className="epp-container py-8 md:py-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">Emirates Pride</p>
            <h1 className="text-2xl md:text-3xl font-serif">My Account</h1>
          </div>
        </div>

        <div className="md:flex epp-container md:py-8 md:gap-8">
          {/* Mobile Navigation Menu */}
          {activeSection === "overview" && (
            <div className="md:hidden">
              <div className="px-5 pt-5 pb-2">
                <span className="text-[9px] tracking-[0.2em] uppercase text-black/30 font-medium">Account</span>
              </div>
              <div className="bg-white border-y border-black/5">
                <button onClick={() => setActiveSection("orders")} className="w-full flex items-center gap-4 px-5 py-4 border-b border-black/5 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                    <Package size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">My Orders</span>
                    <span className="text-[10px] text-black/40">{SAMPLE_ORDERS.length} orders</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
                <button onClick={() => setActiveSection("wishlist")} className="w-full flex items-center gap-4 px-5 py-4 border-b border-black/5 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                    <Heart size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">Wishlist</span>
                    <span className="text-[10px] text-black/40">{wishlistCount} items</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
                <button onClick={() => setActiveSection("addresses")} className="w-full flex items-center gap-4 px-5 py-4 border-b border-black/5 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                    <MapPin size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">Addresses</span>
                    <span className="text-[10px] text-black/40">{SAMPLE_ADDRESSES.length} saved</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
                <button onClick={() => setActiveSection("settings")} className="w-full flex items-center gap-4 px-5 py-4 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                    <Settings size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">Profile & Settings</span>
                    <span className="text-[10px] text-black/40">Edit your details</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
              </div>
              <div className="px-5 pt-6 pb-2">
                <span className="text-[9px] tracking-[0.2em] uppercase text-black/30 font-medium">Support</span>
              </div>
              <div className="bg-white border-y border-black/5">
                <button className="w-full flex items-center gap-4 px-5 py-4 border-b border-black/5 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/[0.03] flex items-center justify-center">
                    <HelpCircle size={18} strokeWidth={1.2} className="text-black/40" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">Help & Support</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
                <button className="w-full flex items-center gap-4 px-5 py-4 border-b border-black/5 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/[0.03] flex items-center justify-center">
                    <Bell size={18} strokeWidth={1.2} className="text-black/40" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">Notifications</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
                <button className="w-full flex items-center gap-4 px-5 py-4 active:bg-black/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/[0.03] flex items-center justify-center">
                    <Shield size={18} strokeWidth={1.2} className="text-black/40" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[13px] text-black block">Privacy & Security</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-black/20" />
                </button>
              </div>
              <div className="px-5 pt-8 pb-4">
                <Link href="/collection">
                  <span className="creed-button w-full block text-center cursor-pointer">Continue Shopping</span>
                </Link>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-[240px] flex-shrink-0">
            <div className="bg-white border border-black/5 sticky top-[130px]">
              <nav className="flex flex-col">
                {(
                  [
                    { key: "overview", label: "Overview", icon: <User size={16} strokeWidth={1.2} /> },
                    { key: "orders", label: "My Orders", icon: <Package size={16} strokeWidth={1.2} /> },
                    { key: "wishlist", label: "Wishlist", icon: <Heart size={16} strokeWidth={1.2} /> },
                    { key: "addresses", label: "Addresses", icon: <MapPin size={16} strokeWidth={1.2} /> },
                    { key: "settings", label: "Settings", icon: <Settings size={16} strokeWidth={1.2} /> },
                  ] as { key: Section; label: string; icon: React.ReactNode }[]
                ).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={`flex items-center gap-3 px-5 py-3.5 text-[11px] tracking-[0.1em] uppercase transition-colors border-l-2 ${
                      activeSection === item.key
                        ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5"
                        : "border-transparent text-black/50 hover:text-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-light)]/10"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-black/5 mt-2">
                  <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3.5 text-[11px] tracking-[0.1em] uppercase text-black/40 hover:text-red-500 transition-colors w-full">
                    <LogOut size={16} strokeWidth={1.2} /> Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {activeSection !== "overview" && (
              <button onClick={() => setActiveSection("overview")} className="md:hidden flex items-center gap-2 px-5 py-4 text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] font-medium">
                <ChevronRight size={14} className="rotate-180" /> Back
              </button>
            )}

            {/* Overview (Desktop) */}
            {activeSection === "overview" && (
              <div className="hidden md:block">
                <h2 className="text-xl font-serif text-black mb-6">Account Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-black/5 p-6 hover:border-[#c9a96e]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <Package size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-black">Recent Orders</span>
                    </div>
                    <p className="text-2xl font-serif text-black">{SAMPLE_ORDERS.length}</p>
                    <p className="text-[10px] text-black/40 mt-1">Total orders placed</p>
                    <button onClick={() => setActiveSection("orders")} className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] mt-4 flex items-center gap-1 hover:text-[#8a6d3b] transition-colors">
                      View All <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="bg-white border border-black/5 p-6 hover:border-[#c9a96e]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-black">Wishlist</span>
                    </div>
                    <p className="text-2xl font-serif text-black">{wishlistCount}</p>
                    <p className="text-[10px] text-black/40 mt-1">Saved items</p>
                    <button onClick={() => setActiveSection("wishlist")} className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] mt-4 flex items-center gap-1 hover:text-[#8a6d3b] transition-colors">
                      View All <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="bg-white border border-black/5 p-6 hover:border-[#c9a96e]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-black">Addresses</span>
                    </div>
                    <p className="text-2xl font-serif text-black">{SAMPLE_ADDRESSES.length}</p>
                    <p className="text-[10px] text-black/40 mt-1">Saved addresses</p>
                    <button onClick={() => setActiveSection("addresses")} className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] mt-4 flex items-center gap-1 hover:text-[#8a6d3b] transition-colors">
                      Manage <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="bg-white border border-black/5 p-6 hover:border-[#c9a96e]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-black">Profile</span>
                    </div>
                    <p className="text-[12px] text-black">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[10px] text-black/40 mt-1">{user.phone}</p>
                    <button onClick={() => setActiveSection("settings")} className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] mt-4 flex items-center gap-1 hover:text-[#8a6d3b] transition-colors">
                      Edit Profile <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders */}
            {activeSection === "orders" && (
              <div className="px-5 md:px-0">
                <h2 className="text-lg md:text-xl font-serif text-black mb-5 md:mb-6">My Orders</h2>
                <div className="flex flex-col gap-3 md:gap-4">
                  {SAMPLE_ORDERS.map((order) => (
                    <div key={order.id} className="bg-white border border-black/5 overflow-hidden">
                      <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="w-full flex items-center justify-between p-4 md:p-5">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f5f5f5] flex-shrink-0 overflow-hidden">
                            <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-left">
                            <p className="text-[11px] md:text-[12px] font-medium text-black">{order.id}</p>
                            <p className="text-[10px] text-black/40 mt-0.5">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[8px] tracking-[0.1em] uppercase font-medium px-2 py-1 ${order.statusColor}`}>{order.status}</span>
                          <ChevronRight size={14} className={`text-black/20 transition-transform ${expandedOrder === order.id ? "rotate-90" : ""}`} />
                        </div>
                      </button>
                      {expandedOrder === order.id && (
                        <div className="border-t border-black/5 p-4 md:p-5 bg-[#fafaf8]">
                          <div className="flex flex-col gap-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-[#f5f5f5] flex-shrink-0 overflow-hidden">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] font-serif text-black">{item.name}</p>
                                  <p className="text-[10px] text-black/40">Qty: {item.qty}</p>
                                </div>
                                <p className="text-[12px] font-medium text-black">AED {item.price}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-black/5">
                            <span className="text-[10px] tracking-[0.15em] uppercase text-black/40">Total</span>
                            <span className="text-[14px] font-serif font-medium text-black">AED {order.total}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeSection === "wishlist" && (
              <div className="px-5 md:px-0">
                <h2 className="text-lg md:text-xl font-serif text-black mb-5 md:mb-6">My Wishlist</h2>
                {wishlistProducts.length === 0 ? (
                  <div className="bg-white border border-black/5 p-8 md:p-12 text-center">
                    <Heart size={32} strokeWidth={1} className="text-black/10 mx-auto mb-4" />
                    <p className="font-serif text-lg text-black mb-2">Your wishlist is empty</p>
                    <p className="text-[11px] text-black/40 mb-6 max-w-[240px] mx-auto">
                      Save your favorite fragrances to your wishlist and find them here.
                    </p>
                    <Link href="/collection">
                      <span className="creed-button inline-block cursor-pointer">Explore Collection</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {wishlistProducts.map((product) => (
                      <Link key={product.id} href={`/product/${product.id}`}>
                        <div className="bg-white border border-black/5 group cursor-pointer overflow-hidden">
                          <div className="aspect-[3/4] overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          </div>
                          <div className="p-3 md:p-4">
                            <p className="text-[11px] md:text-[12px] font-serif text-black group-hover:text-[#c9a96e] transition-colors truncate">{product.name}</p>
                            <p className="text-[10px] text-black/40 mt-0.5">{product.collection}</p>
                            <p className="text-[12px] font-medium text-black mt-1">{product.currency} {product.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeSection === "addresses" && (
              <div className="px-5 md:px-0">
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <h2 className="text-lg md:text-xl font-serif text-black">My Addresses</h2>
                  <button className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] font-medium flex items-center gap-1">Add New</button>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">
                  {SAMPLE_ADDRESSES.map((addr) => (
                    <div key={addr.id} className="bg-white border border-black/5 p-4 md:p-5 relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[10px] tracking-[0.15em] uppercase text-[#c9a96e] font-medium">{addr.label}</h3>
                          {addr.isDefault && (
                            <span className="text-[7px] tracking-[0.1em] uppercase px-1.5 py-0.5 bg-[#c9a96e] text-white font-medium">Default</span>
                          )}
                        </div>
                        <button className="text-black/20 hover:text-[#c9a96e] transition-colors">
                          <Edit3 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-[12px] text-black font-medium mb-1">{addr.name}</p>
                      <p className="text-[11px] text-black/50 leading-relaxed">
                        {addr.line1}, {addr.line2}
                        <br />
                        {addr.city}, {addr.country}
                      </p>
                      <p className="text-[11px] text-black/50 mt-2">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings / Profile Edit */}
            {activeSection === "settings" && (
              <div className="px-5 md:px-0">
                <h2 className="text-lg md:text-xl font-serif text-black mb-5 md:mb-6">Profile & Settings</h2>
                <div className="bg-white border border-black/5 p-5 md:p-6">
                  {!editMode ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-medium">Personal Information</span>
                        <button onClick={() => setEditMode(true)} className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] font-medium hover:text-[#8a6d3b] transition-colors">
                          <Edit3 size={12} /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <span className="text-[8px] tracking-[0.2em] uppercase text-black/30 block mb-1.5">First Name</span>
                          <span className="text-[13px] text-black">{user.firstName}</span>
                        </div>
                        <div>
                          <span className="text-[8px] tracking-[0.2em] uppercase text-black/30 block mb-1.5">Last Name</span>
                          <span className="text-[13px] text-black">{user.lastName}</span>
                        </div>
                        <div>
                          <span className="text-[8px] tracking-[0.2em] uppercase text-black/30 block mb-1.5">Email</span>
                          <span className="text-[13px] text-black">{user.email}</span>
                        </div>
                        <div>
                          <span className="text-[8px] tracking-[0.2em] uppercase text-black/30 block mb-1.5">Phone</span>
                          <span className="text-[13px] text-black">{user.phone}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProfile}>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-medium">Edit Profile</span>
                        <button type="button" onClick={() => setEditMode(false)} className="text-black/20 hover:text-[var(--color-brand-gold)] transition-colors">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[8px] tracking-[0.2em] uppercase text-black/40 font-medium">First Name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full border border-black/10 focus:border-[#c9a96e] bg-transparent px-3 py-3 text-[13px] text-black outline-none transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[8px] tracking-[0.2em] uppercase text-black/40 font-medium">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full border border-black/10 focus:border-[#c9a96e] bg-transparent px-3 py-3 text-[13px] text-black outline-none transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[8px] tracking-[0.2em] uppercase text-black/40 font-medium">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border border-black/10 focus:border-[#c9a96e] bg-transparent px-3 py-3 text-[13px] text-black outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button type="submit" className="flex items-center gap-2 bg-[#1a1308] text-white px-6 py-3 text-[10px] tracking-[0.15em] uppercase font-medium hover:bg-[#c9a96e] transition-colors">
                          <Check size={14} /> Save Changes
                        </button>
                        <button type="button" onClick={() => setEditMode(false)} className="px-6 py-3 text-[10px] tracking-[0.15em] uppercase font-medium text-black/40 hover:text-[var(--color-brand-gold)] border border-black/10 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
