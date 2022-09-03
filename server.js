const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
// do the CORS part with the 'cors' package
// npm i cors
// const cors = require('cors')

const app = express();

// array to store our data
const PRODUCTS = [];

app.use(bodyParser.json());
// app.use('cors');

// Setup CORS Headers
// 1. Do it using the module 'cors'
// 2. Do it manually
// we are doing it manually
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Let's create our Endpoints

// 1. GET - get all the products
app.get('/products', (req, res, next) => {
    res.status(200).json({ products: PRODUCTS });
});

// 2. POST - create a new product
app.post('/product', (req, res, next) => {
    // 2.1. Get the new product details from the request body
    // 2.2. Create a new product with a uuid 
    // 2.3. Store the newly created product
    // 2.4. Return the newly created product details
    // 2.5. Put some validation on the data

    // 2.1
    const {title, price} = req.body;

    // 2.5
    if (
        !title || !title.trim().length === 0 ||
        !price || price <= 0
    ) {
        res.status(422).json({
            message: 'Invalid input, please enter a valid name and/or price'
        });
    }

    // 2.2
    const newProduct = {
        id: uuid.v4(), //v4 of uuid is created using random numbers
        title,
        price
    };

    // 2.3
    PRODUCTS.push(newProduct);

    // 2.4
    res.status(200)
        .json({
            message: 'product created successfully',
            product: newProduct
        });
});

app.listen(5000);
console.log('backend listening on http://localhost:5000/\n');