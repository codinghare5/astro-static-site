if (process.env.NODE !== 'production') {
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
const fs = require('fs')

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

app.listen(3001)
