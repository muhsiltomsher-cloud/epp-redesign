"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCart, clearCart, CartItem } from "@/lib/cart";
import { products } from "@/lib/data";
import { getUser, isLoggedIn } from "@/lib/auth";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<(CartItem & { product: typeof products[0] })[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Dubai",
    country: "United Arab Emirates",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  useEffect(() => {
    const cart = getCart();
    const items = cart
      .map(ci => {
        const product = products.find(p => p.id === ci.productId);
        return product ? { ...ci, product } : null;
      })
      .filter((item): item is CartItem & { product: typeof products[0] } => item !== null);
    setCartItems(items);

    // Pre-fill from logged-in user
    if (isLoggedIn()) {
      const user = getUser();
      if (user) {
        setForm(prev => ({
          ...prev,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        }));
      }
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : 50;
  const total = subtotal + shipping;

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateShipping = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.cardNumber.trim()) newErrors.cardNumber = "Required";
    if (!form.cardExpiry.trim()) newErrors.cardExpiry = "Required";
    if (!form.cardCvc.trim()) newErrors.cardCvc = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep("payment");
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = () => {
    if (!validatePayment()) return;
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      // Clear cart
      clearCart();
      router.push("/order-success");
    }, 1500);
  };

  const inputClass = (field: keyof CheckoutForm) =>
    `w-full border-b ${errors[field] ? "border-red-400" : "border-black/20"} focus:border-[#c9a96e] bg-transparent py-3 text-[12px] text-black placeholder:text-black/30 outline-none transition-colors`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] md:pt-[106px]">
        <div className="epp-container py-8 md:py-16">
          {/* Breadcrumb */}
          <Link href="/collection">
            <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors cursor-pointer mb-6 md:mb-10 block">
              <ChevronLeft size={12} /> Continue Shopping
            </span>
          </Link>

          <div className="text-center mb-8 md:mb-14">
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-3 text-black">Checkout</h1>
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className={`text-[9px] tracking-[0.2em] uppercase font-medium ${step === "shipping" ? "text-[#c9a96e]" : "text-black/40"}`}>
                1. Shipping
              </span>
              <span className="w-6 h-[1px] bg-black/20" />
              <span className={`text-[9px] tracking-[0.2em] uppercase font-medium ${step === "payment" ? "text-[#c9a96e]" : "text-black/40"}`}>
                2. Payment
              </span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-serif text-black mb-4">Your cart is empty</p>
              <Link href="/collection">
                <span className="creed-button inline-block cursor-pointer">Shop Now</span>
              </Link>
            </div>
          ) : (
            <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Form */}
              <div className="flex-1">
                {step === "shipping" && (
                  <div className="flex flex-col gap-5">
                    <h2 className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium mb-2">Shipping Information</h2>
                    
                    {!isLoggedIn() && (
                      <div className="bg-[#faf9f7] border border-black/5 p-4 mb-2">
                        <p className="text-[10px] text-black/60">
                          Already have an account?{" "}
                          <Link href="/login">
                            <span className="text-[#c9a96e] hover:text-[#8a6d3b] cursor-pointer transition-colors font-medium">Sign in</span>
                          </Link>{" "}
                          for a faster checkout.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">First Name</label>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          className={inputClass("firstName")}
                          placeholder="First name"
                        />
                        {errors.firstName && <span className="text-[9px] text-red-500 mt-1">{errors.firstName}</span>}
                      </div>
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Last Name</label>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          className={inputClass("lastName")}
                          placeholder="Last name"
                        />
                        {errors.lastName && <span className="text-[9px] text-red-500 mt-1">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={inputClass("email")}
                        placeholder="your@email.com"
                      />
                      {errors.email && <span className="text-[9px] text-red-500 mt-1">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={inputClass("phone")}
                        placeholder="+971 50 123 4567"
                      />
                      {errors.phone && <span className="text-[9px] text-red-500 mt-1">{errors.phone}</span>}
                    </div>

                    <div>
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Address</label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        className={inputClass("address")}
                        placeholder="Street address"
                      />
                      {errors.address && <span className="text-[9px] text-red-500 mt-1">{errors.address}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">City</label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className={inputClass("city")}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Country</label>
                        <input
                          type="text"
                          value={form.country}
                          onChange={(e) => updateField("country", e.target.value)}
                          className={inputClass("country")}
                          placeholder="Country"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={form.postalCode}
                          onChange={(e) => updateField("postalCode", e.target.value)}
                          className={inputClass("postalCode")}
                          placeholder="00000"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleContinueToPayment}
                      className="creed-button w-full mt-4"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {step === "payment" && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium">Payment Details</h2>
                      <button
                        onClick={() => setStep("shipping")}
                        className="text-[10px] tracking-wide text-black/50 hover:text-black transition-colors"
                      >
                        Edit Shipping
                      </button>
                    </div>

                    <div className="bg-[#faf9f7] border border-black/5 p-4 mb-2">
                      <p className="text-[9px] tracking-[0.15em] uppercase text-black/40 mb-1">Shipping to</p>
                      <p className="text-[11px] text-black">
                        {form.firstName} {form.lastName}, {form.address}, {form.city}
                      </p>
                    </div>

                    {/* Sample Card Info */}
                    <div className="bg-[#faf9f7] border border-black/5 p-4 mb-2">
                      <p className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] font-medium mb-2">Sample Card</p>
                      <div className="text-[10px] text-black/60 leading-relaxed space-y-1 mb-3">
                        <p><span className="text-black/40 text-[9px] uppercase tracking-wider">Card:</span> 4242 4242 4242 4242</p>
                        <p><span className="text-black/40 text-[9px] uppercase tracking-wider">Expiry:</span> 12/28</p>
                        <p><span className="text-black/40 text-[9px] uppercase tracking-wider">CVC:</span> 123</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { updateField("cardNumber", "4242 4242 4242 4242"); updateField("cardExpiry", "12/28"); updateField("cardCvc", "123"); }}
                        className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#8a6d3b] transition-colors font-medium border border-[#c9a96e]/30 px-3 py-1.5 hover:bg-[#c9a96e]/5"
                      >
                        Auto-fill Card Details
                      </button>
                    </div>

                    <div>
                      <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={(e) => updateField("cardNumber", e.target.value)}
                        className={inputClass("cardNumber")}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                      {errors.cardNumber && <span className="text-[9px] text-red-500 mt-1">{errors.cardNumber}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={form.cardExpiry}
                          onChange={(e) => updateField("cardExpiry", e.target.value)}
                          className={inputClass("cardExpiry")}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.cardExpiry && <span className="text-[9px] text-red-500 mt-1">{errors.cardExpiry}</span>}
                      </div>
                      <div>
                        <label className="text-[8px] tracking-[0.2em] uppercase text-black font-medium block mb-1">CVC</label>
                        <input
                          type="text"
                          value={form.cardCvc}
                          onChange={(e) => updateField("cardCvc", e.target.value)}
                          className={inputClass("cardCvc")}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cardCvc && <span className="text-[9px] text-red-500 mt-1">{errors.cardCvc}</span>}
                      </div>
                    </div>

                    <div className="bg-[#faf9f7] border border-black/5 p-4 mt-2">
                      <p className="text-[9px] tracking-wide text-black/50">
                        This is a demo checkout. No real payment will be processed. Enter any card details to test.
                      </p>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="creed-button w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing Order..." : `Place Order — AED ${total}`}
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:w-[360px] flex-shrink-0">
                <div className="bg-[#faf9f7] border border-black/5 p-5 md:p-6 sticky top-[130px]">
                  <h2 className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium mb-5">Order Summary</h2>
                  
                  <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-black/10">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-white flex-shrink-0 overflow-hidden border border-black/5">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-serif text-black truncate">{item.product.name}</p>
                          <p className="text-[9px] text-black/50">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-[11px] font-medium text-black flex-shrink-0">AED {item.product.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-black/10">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-black/60">Subtotal</span>
                      <span className="text-black">AED {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-black/60">Shipping</span>
                      <span className="text-black">{shipping === 0 ? "Free" : `AED ${shipping}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-black">Total</span>
                    <span className="text-base font-medium text-black">AED {total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
