import React, { useEffect, useState } from "react";

const Donor = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const translations = {
    en: {
      org_name: "Visions Global Empowerment – India",
      tagline: "Empowering Youth. Transforming Communities.",
      our_mission: "Our Mission:",
      mission_text:
        "Visions India empowers youth and communities to be change agents through education, leadership, and innovative solutions. Since 2016, we've been creating sustainable impact across India.",
      donation_title: "Make a Secure Donation",
      donation_description:
        "Your contribution directly supports youth empowerment programs, community development initiatives, and educational opportunities across India",
      select_amount: "Select Donation Amount",
      amount_500_desc: "Provides educational materials for 2 children",
      amount_1000_desc: "Supports a youth leadership workshop",
      amount_2500_desc: "Funds community development project",
      amount_5000_desc: "Establishes a youth empowerment center",
      custom: "Custom",
      custom_desc: "Enter your own amount",
      enter_amount: "Enter Amount (INR)",
      your_information: "Your Information",
      first_name: "First Name *",
      last_name: "Last Name *",
      email: "Email Address *",
      phone: "Phone Number",
      country: "Country *",
      select_country: "Select Country",
      address: "Address",
      street_address: "Street Address",
      city: "City",
      state: "State/Province",
      zip_code: "ZIP/Postal Code",
      payment_method: "Payment Method",
      credit_debit_card: "Credit/Debit Card",
      card_desc: "Visa, Mastercard, American Express",
      paypal: "PayPal",
      paypal_desc: "Pay with your PayPal account",
      bank_transfer: "Bank Transfer",
      bank_desc: "Direct bank transfer",
      complete_donation: "Complete Donation",
      processing_fee: "Processing Fee:",
      total: "Total:",
      donation_amount: "Donation Amount:",
      your_impact: "Your Impact",
      children_empowered: "Children & Youth Empowered",
      communities_served: "Communities Served",
      grassroots_engagement: "Grassroots Engagement",
      why_trust_us: "Why Trust Us?",
      registered_transparent:
        "Registered & Transparent: Officially registered under Indian Trust Act (Reg. No. 65/16)",
      proven_impact:
        "Proven Impact: Transforming thousands of lives since 2016",
      community_driven:
        "Community-Driven: Programs designed with and for local communities",
      youth_empowerment:
        "Youth Empowerment: Focused on leadership, education, and technology for youth",
    },
    ta: {
      org_name: "விஷன்ஸ் குளோபல் எம்பவர்மென்ட் – இந்தியா",
      tagline: "இளைஞர்களை மேம்படுத்துதல். சமூகங்களை மாற்றுதல்.",
      our_mission: "எங்கள் நோக்கம்:",
      mission_text:
        "விஷன்ஸ் இந்தியா கல்வி, தலைமைத்துவம் மற்றும் புதுமையான தீர்வுகளின் மூலம் இளைஞர்கள் மற்றும் சமூகங்களை மாற்ற முகவர்களாக மேம்படுத்துகிறது. 2016 முதல், நாங்கள் இந்தியா முழுவதும் நிலையான தாக்கத்தை உருவாக்கி வருகிறோம்.",
      donation_title: "பாதுகாப்பான நன்கொடை வழங்கவும்",
      donation_description:
        "உங்கள் பங்களிப்பு நேரடியாக இளைஞர் மேம்பாட்டு திட்டங்கள், சமூக மேம்பாட்டு முயற்சிகள் மற்றும் இந்தியா முழுவதும் கல்வி வாய்ப்புகளை ஆதரிக்கிறது",
      select_amount: "நன்கொடை தொகையைத் தேர்ந்தெடுக்கவும்",
      amount_500_desc: "2 குழந்தைகளுக்கு கல்விப் பொருட்களை வழங்குகிறது",
      amount_1000_desc: "இளைஞர் தலைமைத்துவ பட்டறையை ஆதரிக்கிறது",
      amount_2500_desc: "சமூக மேம்பாட்டு திட்டத்திற்கு நிதியளிக்கிறது",
      amount_5000_desc: "இளைஞர் மேம்பாட்டு மையத்தை நிறுவுகிறது",
      custom: "தனிப்பயன்",
      custom_desc: "உங்கள் சொந்த தொகையை உள்ளிடவும்",
      enter_amount: "தொகையை உள்ளிடவும் (INR)",
      your_information: "உங்கள் தகவல்",
      first_name: "முதல் பெயர் *",
      last_name: "கடைசி பெயர் *",
      email: "மின்னஞ்சல் முகவரி *",
      phone: "தொலைபேசி எண்",
      country: "நாடு *",
      select_country: "நாட்டைத் தேர்ந்தெடுக்கவும்",
      address: "முகவரி",
      street_address: "தெரு முகவரி",
      city: "நகரம்",
      state: "மாநிலம்/மாகாணம்",
      zip_code: "ZIP/அஞ்சல் குறியீடு",
      payment_method: "பணம் செலுத்தும் முறை",
      credit_debit_card: "கிரெடிட்/டெபிட் கார்டு",
      card_desc: "விசா, மாஸ்டர்கார்டு, அமெரிக்கன் எக்ஸ்பிரஸ்",
      paypal: "பேபால்",
      paypal_desc: "உங்கள் பேபால் கணக்கில் பணம் செலுத்தவும்",
      bank_transfer: "வங்கி பரிமாற்றம்",
      bank_desc: "நேரடி வங்கி பரிமாற்றம்",
      complete_donation: "நன்கொடையை முடிக்கவும்",
      processing_fee: "செயலாக்க கட்டணம்:",
      total: "மொத்தம்:",
      donation_amount: "நன்கொடை தொகை:",
      your_impact: "உங்கள் தாக்கம்",
      children_empowered: "குழந்தைகள் & இளைஞர்கள் மேம்படுத்தப்பட்டுள்ளனர்",
      communities_served: "சமூகங்கள் சேவை செய்யப்பட்டன",
      grassroots_engagement: "அடிமட்ட ஈடுபாடு",
      why_trust_us: "எங்களை ஏன் நம்ப வேண்டும்?",
      registered_transparent:
        "பதிவு செய்யப்பட்ட மற்றும் வெளிப்படையான: இந்திய அறக்கட்டளை சட்டத்தின் கீழ் அதிகாரப்பூர்வமாக பதிவு செய்யப்பட்டது (பதிவு எண். 65/16)",
      proven_impact:
        "நிரூபிக்கப்பட்ட தாக்கம்: 2016 முதல் ஆயிரக்கணக்கான வாழ்க்கைகளை மாற்றுகிறது",
      community_driven:
        "சமூக-உந்துதல்: உள்ளூர் சமூகங்களுடன் மற்றும் அவர்களுக்காக வடிவமைக்கப்பட்ட திட்டங்கள்",
      youth_empowerment:
        "இளைஞர் மேம்பாடு: இளைஞர்களுக்கான தலைமைத்துவம், கல்வி மற்றும் தொழில்நுட்பத்தில் கவனம் செலுத்துகிறது",
    },
  };

  const t = (key) => translations[currentLanguage][key] || key;

  const calculateTotal = () => {
    const amount = selectedAmount || parseFloat(customAmount) || 0;
    const fee = amount * 0.025;
    return {
      amount: amount,
      fee: fee,
      total: amount + fee,
    };
  };

  const handleAmountSelect = (amount) => {
    if (amount === "custom") {
      setShowCustomInput(true);
      setSelectedAmount(0);
    } else {
      setShowCustomInput(false);
      setSelectedAmount(amount);
      setCustomAmount("");
    }
  };

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
    setShowDropdown(false);
    localStorage.setItem("preferredLanguage", lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const { amount, fee, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 to-gray-600 text-white py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <div className="logo-section">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">{t("org_name")}</span>
            </div>
            <p className="text-sm opacity-80 mt-1">{t("tagline")}</p>
          </div>

          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-white/20 border-2 border-white/40 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              🌐{" "}
              <span className="font-semibold">
                {currentLanguage.toUpperCase()}
              </span>{" "}
              ▼
            </button>

            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[150px] z-50">
                <div
                  onClick={() => switchLanguage("en")}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                    currentLanguage === "en"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </div>
                <div
                  onClick={() => switchLanguage("ta")}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                    currentLanguage === "ta"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  <span>🇮🇳</span>
                  <span>தமிழ்</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-8">
          {/* Mission Summary */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <p className="text-gray-700">
              <strong className="text-blue-700">{t("our_mission")}</strong>{" "}
              {t("mission_text")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 text-center">
                  <h1 className="text-3xl font-semibold mb-2">
                    {t("donation_title")}
                  </h1>
                  <p className="opacity-90">{t("donation_description")}</p>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  {/* Amount Selection */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      {t("select_amount")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {[
                        { amount: 500, desc: t("amount_500_desc") },
                        { amount: 1000, desc: t("amount_1000_desc") },
                        { amount: 2500, desc: t("amount_2500_desc") },
                        { amount: 5000, desc: t("amount_5000_desc") },
                      ].map((option) => (
                        <div
                          key={option.amount}
                          onClick={() => handleAmountSelect(option.amount)}
                          className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
                            selectedAmount === option.amount
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          <div className="text-2xl font-bold text-gray-800 mb-2">
                            ₹{option.amount.toLocaleString("en-IN")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {option.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      onClick={() => handleAmountSelect("custom")}
                      className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
                        showCustomInput
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        {t("custom")}
                      </div>
                      <div className="text-sm text-gray-600">
                        {t("custom_desc")}
                      </div>
                    </div>

                    {showCustomInput && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("enter_amount")}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Your Information */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      {t("your_information")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("first_name")}
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("last_name")}
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("email")}
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("phone")}
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("country")}
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">{t("select_country")}</option>
                          <option value="IN">India</option>
                          <option value="US">United States</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      {t("payment_method")}
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          method: "card",
                          icon: "💳",
                          name: t("credit_debit_card"),
                          desc: t("card_desc"),
                        },
                        {
                          method: "paypal",
                          icon: "🅿️",
                          name: t("paypal"),
                          desc: t("paypal_desc"),
                        },
                        {
                          method: "bank",
                          icon: "🏦",
                          name: t("bank_transfer"),
                          desc: t("bank_desc"),
                        },
                      ].map((payment) => (
                        <div
                          key={payment.method}
                          onClick={() =>
                            setSelectedPaymentMethod(payment.method)
                          }
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            selectedPaymentMethod === payment.method
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{payment.icon}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                {payment.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {payment.desc}
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                selectedPaymentMethod === payment.method
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedPaymentMethod === payment.method && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                      <div className="text-green-600">🛡️</div>
                      <span>
                        Your donation is protected by SSL encryption and secure
                        payment processing
                      </span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      ❤️ {t("complete_donation")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Summary & Info */}
            <div className="space-y-6">
              {/* Donation Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Donation Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("donation_amount")}
                    </span>
                    <span className="font-semibold">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("processing_fee")}</span>
                    <span className="font-semibold">
                      ₹
                      {fee.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t("total")}</span>
                      <span>
                        ₹
                        {total.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t("your_impact")}
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      10,000+
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("children_empowered")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">50+</div>
                    <div className="text-sm text-gray-600">
                      {t("communities_served")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-gray-600">
                      {t("grassroots_engagement")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t("why_trust_us")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1">📜</div>
                    <span className="text-sm text-gray-600">
                      {t("registered_transparent")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1">📈</div>
                    <span className="text-sm text-gray-600">
                      {t("proven_impact")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1">👥</div>
                    <span className="text-sm text-gray-600">
                      {t("community_driven")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1">🌟</div>
                    <span className="text-sm text-gray-600">
                      {t("youth_empowerment")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donor;
