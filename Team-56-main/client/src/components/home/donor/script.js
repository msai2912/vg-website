const donationForm = document.getElementById("donationForm");
const successModal = document.getElementById("successModal");
const loadingSpinner = document.getElementById("loadingSpinner");
const donationDetails = document.getElementById("donationDetails");

const languageToggle = document.getElementById("languageToggle");
const languageDropdown = document.getElementById("languageDropdown");
const currentLangSpan = document.getElementById("currentLang");

let selectedAmount = 0;
let selectedPaymentMethod = "card";
let currentLanguage = "en";

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
  },
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded, initializing language system...");

  const debugIndicator = document.getElementById("debugIndicator");
  if (debugIndicator) {
    debugIndicator.textContent = "Page loaded! Looking for language button...";
    debugIndicator.style.background = "orange";
  }

  if (languageToggle) {
    console.log("Language toggle button found!");
    if (debugIndicator) {
      debugIndicator.textContent =
        "✅ Language button found! Check top-right corner.";
      debugIndicator.style.background = "green";
      setTimeout(() => {
        debugIndicator.style.display = "none";
      }, 5000);
    }
  } else {
    console.error("Language toggle button NOT found!");
    if (debugIndicator) {
      debugIndicator.textContent =
        "❌ Language button NOT found! Check console for errors.";
      debugIndicator.style.background = "red";
    }
  }

  setupLanguageToggle();
  setupAmountSelection();
  setupPaymentMethods();
  setupFormValidation();
  setupCardFormatting();
  updateSummary();
  loadLanguagePreference();
});

function setupLanguageToggle() {
  console.log("Setting up language toggle...");

  if (!languageToggle) {
    console.error("Language toggle button not found!");
    return;
  }

  languageToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log("Language button clicked!");

    if (
      languageDropdown.style.display === "none" ||
      languageDropdown.style.display === ""
    ) {
      languageDropdown.style.display = "block";
      console.log("Dropdown opened");
    } else {
      languageDropdown.style.display = "none";
      console.log("Dropdown closed");
    }
  });

  const languageOptions = document.querySelectorAll(".language-option");
  console.log("Found", languageOptions.length, "language options");

  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedLang = this.dataset.lang;
      console.log("Language selected:", selectedLang);
      switchLanguage(selectedLang);
      languageDropdown.style.display = "none";
    });

    option.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
    });

    option.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "transparent";
    });
  });

  document.addEventListener("click", function () {
    languageDropdown.style.display = "none";
  });
}

function switchLanguage(lang) {
  currentLanguage = lang;

  currentLangSpan.textContent = lang.toUpperCase();

  const languageOptions = document.querySelectorAll(".language-option");
  languageOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === lang);
  });

  applyTranslations();

  localStorage.setItem("preferredLanguage", lang);
}

function applyTranslations() {
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  const placeholderElements = document.querySelectorAll(
    "[data-translate-placeholder]"
  );

  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  placeholderElements.forEach((element) => {
    const key = element.getAttribute("data-translate-placeholder");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });
}

function loadLanguagePreference() {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage && translations[savedLanguage]) {
    switchLanguage(savedLanguage);
  } else {
    switchLanguage("en");
  }
}

function setupAmountSelection() {
  const amountOptions = document.querySelectorAll(".amount-option");
  const customAmountInput = document.querySelector(".custom-amount-input");
  const customAmountField = document.getElementById("customAmount");

  amountOptions.forEach((option) => {
    option.addEventListener("click", function () {
      amountOptions.forEach((opt) => opt.classList.remove("selected"));

      this.classList.add("selected");

      const amount = this.dataset.amount;

      if (amount === "custom") {
        customAmountInput.style.display = "block";
        customAmountField.focus();
        selectedAmount = 0;
      } else {
        customAmountInput.style.display = "none";
        selectedAmount = parseFloat(amount);
        updateSummary();
      }
    });
  });

  customAmountField.addEventListener("input", function () {
    selectedAmount = parseFloat(this.value) || 0;
    updateSummary();
  });
}

function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll(".payment-method");
  const paymentForms = document.querySelectorAll(".payment-form");

  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("active"));
      paymentForms.forEach((form) => form.classList.remove("active"));

      this.classList.add("active");
      selectedPaymentMethod = this.dataset.method;

      const formId = this.dataset.method + "Form";
      const form = document.getElementById(formId);
      if (form) {
        form.classList.add("active");
      }
    });
  });
}

function setupCardFormatting() {
  const cardNumber = document.getElementById("cardNumber");
  const expiryDate = document.getElementById("expiryDate");
  const cvv = document.getElementById("cvv");

  cardNumber.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    e.target.value = formattedValue;
  });

  expiryDate.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    e.target.value = value;
  });

  cvv.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "");
  });
}

function updateSummary() {
  const summaryAmount = document.getElementById("summaryAmount");
  const summaryFee = document.getElementById("summaryFee");
  const summaryTotal = document.getElementById("summaryTotal");

  const fee = selectedAmount * 0.025;
  const total = selectedAmount + fee;

  summaryAmount.textContent = `₹${selectedAmount.toLocaleString("en-IN")}`;
  summaryFee.textContent = `₹${fee.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
  summaryTotal.textContent = `₹${total.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

function setupFormValidation() {
  const inputs = donationForm.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      this.classList.remove("valid", "invalid");
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;

  field.classList.remove("valid", "invalid");

  if (!field.hasAttribute("required") && value === "") {
    return;
  }

  let isValid = true;

  if (field.hasAttribute("required") && value === "") {
    isValid = false;
  }

  if (fieldName === "email" && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
    }
  }

  if (fieldName === "cardNumber" && value !== "") {
    const cardNumber = value.replace(/\s/g, "");
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      isValid = false;
    }
  }

  if (fieldName === "expiryDate" && value !== "") {
    const [month, year] = value.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      isValid = false;
    }
  }

  if (fieldName === "cvv" && value !== "") {
    if (value.length < 3 || value.length > 4) {
      isValid = false;
    }
  }

  if (isValid && value !== "") {
    field.classList.add("valid");
  } else if (!isValid) {
    field.classList.add("invalid");
  }
}

donationForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  showLoading();

  try {
    const formData = new FormData(donationForm);
    const donationData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      amount: selectedAmount,
      paymentMethod: selectedPaymentMethod,
      cardNumber: formData.get("cardNumber"),
      expiryDate: formData.get("expiryDate"),
      cvv: formData.get("cvv"),
      cardName: formData.get("cardName"),
      recurring: formData.get("recurring") === "on",
      anonymous: formData.get("anonymous") === "on",
      newsletter: formData.get("newsletter") === "on",
      message: formData.get("message"),
    };

    console.log("Submitting donation data:", donationData);

    const response = await fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Server response:", result);

    hideLoading();

    if (result.success) {
      showSuccessModal(result.donation);
      donationForm.reset();
      resetAmountSelection();
    } else {
      showError(result.message || "Donation failed");
    }
  } catch (error) {
    hideLoading();
    console.error("Error submitting donation:", error);

    if (error.message.includes("Failed to fetch")) {
      showError(
        "Cannot connect to server. Please make sure the server is running on http://localhost:3000"
      );
    } else if (error.message.includes("Server error")) {
      showError("Server error: " + error.message);
    } else {
      showError(
        "An error occurred while processing your donation. Please try again."
      );
    }
  }
});

function validateForm() {
  const requiredFields = ["firstName", "lastName", "email", "country"];

  if (selectedAmount <= 0) {
    showError("Please select a donation amount.");
    return false;
  }

  for (let fieldName of requiredFields) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field.value.trim()) {
      showError(
        `Please fill in the ${fieldName
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} field.`
      );
      field.focus();
      return false;
    }
  }

  const email = document.querySelector('[name="email"]').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("Please enter a valid email address.");
    return false;
  }

  if (selectedPaymentMethod === "card") {
    const cardFields = ["cardNumber", "expiryDate", "cvv", "cardName"];
    for (let fieldName of cardFields) {
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (!field.value.trim()) {
        showError(
          `Please fill in the ${fieldName
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        field.focus();
        return false;
      }
    }

    const cardNumber = document
      .querySelector('[name="cardNumber"]')
      .value.replace(/\s/g, "");
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      showError("Please enter a valid card number.");
      return false;
    }

    const expiryDate = document.querySelector('[name="expiryDate"]').value;
    const [month, year] = expiryDate.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      showError("Please enter a valid expiry date.");
      return false;
    }

    const cvv = document.querySelector('[name="cvv"]').value;
    if (cvv.length < 3 || cvv.length > 4) {
      showError("Please enter a valid CVV.");
      return false;
    }
  }

  return true;
}

function resetAmountSelection() {
  const amountOptions = document.querySelectorAll(".amount-option");
  const customAmountInput = document.querySelector(".custom-amount-input");

  amountOptions.forEach((opt) => opt.classList.remove("selected"));
  customAmountInput.style.display = "none";
  selectedAmount = 0;
  updateSummary();
}

function showSuccessModal(donation) {
  const amount =
    donation.amount !== undefined && donation.amount !== null
      ? donation.amount
      : donation.payment?.amount ?? 0;
  const fee =
    donation.payment?.processingFee !== undefined &&
    donation.payment?.processingFee !== null
      ? donation.payment.processingFee
      : amount * 0.025;
  const total =
    donation.payment?.total !== undefined && donation.payment?.total !== null
      ? donation.payment.total
      : amount + fee;

  const detailsHTML = `
        <h4>Donation Details</h4>
        <p><strong>Transaction ID:</strong> ${donation.id}</p>
        <p><strong>Donation Amount:</strong> ₹${amount.toLocaleString(
          "en-IN"
        )}</p>
        <p><strong>Processing Fee:</strong> ₹${fee.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}</p>
        <p><strong>Total Amount:</strong> ₹${total.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}</p>
        <p><strong>Donor:</strong> ${donation.donor?.firstName || ""} ${
    donation.donor?.lastName || ""
  }</p>
        <p><strong>Email:</strong> ${donation.donor?.email || ""}</p>
        <p><strong>Payment Method:</strong> ${selectedPaymentMethod.toUpperCase()}</p>
        <p><strong>Date:</strong> ${new Date(
          donation.timestamp
        ).toLocaleDateString()}</p>
        ${
          donation.message
            ? `<p><strong>Message:</strong> ${donation.message}</p>`
            : ""
        }
    `;

  donationDetails.innerHTML = detailsHTML;
  successModal.style.display = "block";

  document.body.classList.add("success-animation");
  setTimeout(() => {
    document.body.classList.remove("success-animation");
  }, 600);
}

function closeModal() {
  successModal.style.display = "none";
}

function showLoading() {
  loadingSpinner.style.display = "flex";
}

function hideLoading() {
  loadingSpinner.style.display = "none";
}

function showError(message) {
  showMessage(message, "error");
}

function showSuccess(message) {
  showMessage(message, "success");
}

function showInfo(message) {
  showMessage(message, "info");
}

function showMessage(message, type = "info") {
  const existingMessage = document.querySelector(".message-toast");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageElement = document.createElement("div");
  messageElement.className = `message-toast message-${type}`;
  messageElement.innerHTML = `
        <div class="message-content">
            <i class="fas ${getMessageIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="message-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

  messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getMessageColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

  document.body.appendChild(messageElement);

  setTimeout(() => {
    if (messageElement.parentElement) {
      messageElement.remove();
    }
  }, 5000);
}

function getMessageIcon(type) {
  switch (type) {
    case "error":
      return "fa-exclamation-circle";
    case "success":
      return "fa-check-circle";
    case "info":
      return "fa-info-circle";
    default:
      return "fa-info-circle";
  }
}

function getMessageColor(type) {
  switch (type) {
    case "error":
      return "#f56565";
    case "success":
      return "#48bb78";
    case "info":
      return "#4299e1";
    default:
      return "#4299e1";
  }
}

window.addEventListener("click", function (e) {
  if (e.target === successModal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && successModal.style.display === "block") {
    closeModal();
  }
});

const messageStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .message-toast .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .message-toast .message-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .message-toast .message-close:hover {
        opacity: 1;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = messageStyles;
document.head.appendChild(styleSheet);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    if (input) {
      input.addEventListener("focus", function () {
        group.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        group.classList.remove("focused");
      });
    }
  });
});
