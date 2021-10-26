if (process.env.NODE !== 'production') {
    require('dotenv').config()
}
const nodemailer = require('nodemailer')
const stripe = require('stripe')('sk_test_51JbpHHHpeW5ReVH5TlE2N2PrGiec0amMLZ2kpabUOSkUQt4hw7gAsZQ83o84oJBPjBeDBSkeZwz0KCUEMqNmpG9O00nK7HQEjT');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const fs = require('fs')
fs.readFile('items.json', async function(error, data) {
    if(!global.prices || global.prices == null){
        global.prices = await JSON.parse(data)
    }
})

const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aspieform@gmail.com',
        pass: 'twbhhxxxcikbnkhj'
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.get('/store', async function(req, res) {
    try {
        await res.send({items: prices})
    }
    catch (error){
        await res.status(500).end()
    }
})

app.get('/profiler-form', function(req, res) {
    fs.readFile('autism-profiler-questions-adult.json', function(error, data) {
        if (error) {
            res.status(500).end()
        } else {
            res.send({questions: JSON.parse(data)})
        }
    })
})

app.post('/purchase', function(req, res) {
    fs.readFile('items.json', function(error, data) {
        if (error) {
            res.status(500).end()
        } else {
            res.send({items: JSON.parse(data)})
        }
    })
})

app.post('/text-email', function(req, res) {
    const {to, data} = req.body
    const content = data.map(entry => {
        return `<h3>${entry[0]}</h3><p>${entry[1]}</p>`
    })
    var mailOptions = {
        from: 'aspieform@gmail.com',
        to: 'aspieform@gmail.com',
        // cc: 'aspieform@gmail.com',
        subject: `Jhon Doe - Autism Profiler answers`,
        text: 'Answers attached in html version.',
        html: `<h2>Autisn Profiler</h2>${content}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            res.status(200).send({ message: "Mail send. Thank you for the submission!", message_id: info.messageId })
        }
    });
})

const YOUR_DOMAIN = 'http://localhost:3000';
app.post('/create-checkout-session', async (req, res) => {
    const {priceId} = req.body;
    const match = Object.values(prices).find(val => val === priceId)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // TODO: replace this with the `price` of the product you want to sell
                price: match ? priceId : 'price_1JbqVUHpeW5ReVH54HQpLlI3',
                quantity: 1,
            },
        ],
        payment_method_types: [
            'card',
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/autism-profiler.html`,
    });
    res.status(200).send({url: session.url})
});

app.listen(3001)
