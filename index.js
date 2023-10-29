const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
const uri = "mongodb+srv://diamondfrancisdesign:grp0w6OKPqPdf54N@cluster0.vf3ygbf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect('mongodb://localhost:27017/bblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

// Set EJS as view engine
app.set('view engine', 'ejs');

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});