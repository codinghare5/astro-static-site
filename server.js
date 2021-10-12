if (process.env.NODE !== 'production') {
    require('dotenv').load()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
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
