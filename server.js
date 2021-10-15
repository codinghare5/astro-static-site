if (process.env.NODE !== 'production') {
    require('dotenv').config()
}
const nodemailer = require('nodemailer')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
const fs = require('fs')

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

app.get('/store', function(req, res) {
    fs.readFile('items.json', function(error, data) {
        if (error) {
            res.status(500).end()
        } else {
            res.send({items: JSON.parse(data)})
        }
    })
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

app.listen(3001)
