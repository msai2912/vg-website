const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

let donations = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/donations", (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      address,
      city,
      state,
      zipCode,
      amount,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      cardName,
      recurring,
      anonymous,
      newsletter,
      message,
    } = req.body;

    if (!firstName || !lastName || !email || !country || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid amount",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all card details",
        });
      }

      const cleanCardNumber = cardNumber.replace(/\s/g, "");
      if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid card number",
        });
      }

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
        return res.status(400).json({
          success: false,
          message: "Please enter a valid expiry date",
        });
      }

      if (cvv.length < 3 || cvv.length > 4) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid CVV",
        });
      }
    }

    const donation = {
      id: generateTransactionId(),
      donor: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone || "",
        address: address || "",
        city: city || "",
        state: state || "",
        zipCode: zipCode || "",
        country: country,
      },
      payment: {
        method: paymentMethod,
        amount: parseFloat(amount),
        processingFee: parseFloat(amount) * 0.025,
        total: parseFloat(amount) * 1.025,
        currency: "INR",
      },
      options: {
        recurring: recurring || false,
        anonymous: anonymous || false,
        newsletter: newsletter || false,
      },
      message: message || "",
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    simulatePaymentProcessing(donation)
      .then(() => {
        donations.push(donation);

        donation.status = "completed";
        donation.transactionId = generateTransactionId();

        res.json({
          success: true,
          message: "Donation processed successfully!",
          donation: donation,
        });
      })
      .catch((error) => {
        console.error("Payment processing error:", error);
        res.status(500).json({
          success: false,
          message: "Payment processing failed. Please try again.",
        });
      });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.get("/api/donations", (req, res) => {
  res.json({
    success: true,
    donations: donations,
  });
});

app.get("/api/donations/:id", (req, res) => {
  const donation = donations.find((d) => d.id === req.params.id);
  if (!donation) {
    return res.status(404).json({
      success: false,
      message: "Donation not found",
    });
  }
  res.json({
    success: true,
    donation: donation,
  });
});

app.get("/api/statistics", (req, res) => {
  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, d) => sum + d.payment.amount, 0);
  const averageAmount = totalDonations > 0 ? totalAmount / totalDonations : 0;
  const recurringDonations = donations.filter(
    (d) => d.options.recurring
  ).length;

  res.json({
    success: true,
    statistics: {
      totalDonations,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      averageAmount: parseFloat(averageAmount.toFixed(2)),
      recurringDonations,
      recentDonations: donations.slice(-5).reverse(),
      currency: "INR",
    },
  });
});

function generateTransactionId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN${timestamp}${random}`;
}

async function simulatePaymentProcessing(donation) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.05) {
        resolve();
      } else {
        reject(new Error("Payment declined"));
      }
    }, 2000);
  });
}

app.listen(PORT, () => {
  console.log(
    `🚀 Global Hope Foundation donation server is running on http://localhost:${PORT}`
  );
  console.log(`💳 Donation page available at http://localhost:${PORT}`);
  console.log(`💰 Currency: Indian Rupees (INR)`);
  console.log(`📊 API endpoints:`);
  console.log(`   - POST /api/donations - Submit donation`);
  console.log(`   - GET /api/donations - Get all donations`);
  console.log(`   - GET /api/donations/:id - Get specific donation`);
  console.log(`   - GET /api/statistics - Get donation statistics`);
});
