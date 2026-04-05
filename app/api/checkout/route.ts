const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  payment_method_types: ["card"],
  line_items: [
    {
      price: priceId,
      quantity: 1,
    },
  ],
  metadata: {
    priceId, // 🔥 THIS IS CRITICAL
  },
  success_url: "http://localhost:3000/dashboard",
  cancel_url: "http://localhost:3000/pricing",
})