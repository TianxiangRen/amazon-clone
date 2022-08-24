
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")('sk_test_51LZMbOCeP2bX1fgGrvynzHkO8CIS8nCHaWR6IH9Vmfkf2BHDhB9bhQb7Z0wpRH4L3HRrCh6iPVA1doUrUpwKKYdf002G4HoYv6')

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());


// - API routes
app.get("/", (request, response) => (response.status(200).send("Hello world!")))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "cad",
    })

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen command
exports.api = functions.https.onRequest(app)

//http://localhost:5001/clone-cca72/us-central1/api