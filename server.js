// import client from "../dbConnection.js";

const express = require("express");
const app = express();
const bycrypt = require("bcrypt");
const passport = require("passport");

const { MongoClient } = require("mongodb");
// const initializePassport = require("./passport-config");
// initializePassport(passport);

// Connection URL and Database Name
const url = "mongodb://localhost:27017"; // Default MongoDB port is 27017
const dbName = "testing";     

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected to MongoDB successfully");

  // Now you can use the `client` object to interact with the database

  // Don't forget to close the connection when you're done
  // client.close();
});
console.log("I am heetee ");

const db = client.db(dbName);
const collection = db.collection("Users");
// export default client;

// Example: Insert a document
// await collection.insertOne({ name: 'John Doe', age: 30 });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "muqeet" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bycrypt.hash(req.body.password, 10);
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    await collection.insertOne(data);

    console.log("data : ", data);
    const result = await collection.find({ name: req.body.name });
    console.log("Query result:", result);
    res.redirect("/login");
  } catch (err) {
    console.log("Error : ", err);
  }
});

app.listen(3004, () => console.log("Server Started"));
