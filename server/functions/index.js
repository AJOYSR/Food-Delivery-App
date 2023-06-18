const functions = require("firebase-functions");
const admin = require("firebase-admin");

require("dotenv").config();

// eslint-disable-next-line no-unused-vars
const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// Body parser

app.use(express.json());

// cors origin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//firebase credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://food-delivery-app-e855f-default-rtdb.firebaseio.com",
});


app.get("/", (req, res) =>{
    res.send("Hello World!");
})

const userRoute = require('./routes/user');

app.use('/api/users',userRoute);

exports.app = functions.https.onRequest(app);
