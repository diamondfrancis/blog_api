const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Set EJS as view engine
app.set('view engine', 'ejs');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});