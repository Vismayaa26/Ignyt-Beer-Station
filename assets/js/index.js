const express = require('express');
const mongoose = require('mongoose');
const Subscriber = require('./subscriberModel');
const Booking = require('./messageModel.js');

const app = express();
const port = 3000;

// MongoDB connection URL and database name
const mongoUrl = 'mongodb://localhost:27017/'; // Replace with your MongoDB connection URL
const dbName = 'emails'; // Replace with your database name

mongoose.connect('mongodb://localhost:27017/emails', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/s";

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500/index.html'
}));


app.post('/subscribers', async (req, res) => {
    const { email_address } = req.body;

    if (!email_address) {
        return res.status(400).send('Email is required');
    }

    const subscriber = { email_address };  // Creating a subscriber document

    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db("emails");
        const result = await db.collection("subscribers").insertOne(subscriber);
        
        console.log("1 document inserted");
        client.close();
        
        // res.status(200).send('Subscription successful');
    } catch (err) {
        console.error('Error inserting data into MongoDB:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/bookings', async (req, res) => {
  const { message } = req.body;
  const { name1} = req.body;
  const { phone } = req.body;
  const { person } = req.body;
  const { time } = req.body;
  const { reservationdate } = req.body;
  console.log(req.body);


  const booking = { name1, phone, person, time, reservationdate, message};  // Creating a subscriber document

  try {
      const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db("book");
      const result = await db.collection("bookings").insertOne(booking);
      
      console.log("1 document inserted");
      client.close();
      
      // res.status(200).send('Subscription successful');
  } catch (err) {
      console.error('Error inserting data into MongoDB:', err.message);
      res.status(500).send('Internal Server Error');
  }
});


app.get('/subscribers', async (req, res) => {
    try {
      const subscribers = await Subscriber.find();
      res.json(subscribers);
      console.log("abc");
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error.message);
      res.status(500).send('Internal Server Error');
    }
    
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});