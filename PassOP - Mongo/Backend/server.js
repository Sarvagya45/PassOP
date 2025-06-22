const express = require("express");
require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

// Connection URL
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

client.connect().then(() => {
    console.log("connected to Mongodb ");
    const db = client.db(dbName);
    const collection = db.collection('passwords');



    //to get all password
    app.get("/", async (req, resp) => {
        const findResult = await collection.find({}).toArray();
        resp.json(findResult);
    })

    //Save a password 
    app.post("/", async (req, resp) => {
        const password = req.body;
        const findResult = await collection.insertOne(password);
        resp.send({ success: true, result: findResult });
    })

    //delete a password
    app.delete("/", async (req, resp) => {
        const password = req.body;
        const findResult = await collection.deleteOne(password);
        resp.send({ success: true, result: findResult });
    })

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})