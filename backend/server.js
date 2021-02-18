const express = require('express'); // lightweight web framework based on node.js
const cors = require('cors'); // cors makes it easier to interact with things outside of server
const mongoose = require('mongoose'); // mongoose allows connection to mongodb database

require('dotenv').config(); // allows environment variables to be stored in dotenv file

const app = express(); // creates an express application
const port = process.env.PORT || 5000; // server will run on port 5000

app.use(cors()); // app runs cors middleware
app.use(express.json()); // app parses json file

const uri = process.env.ATLAS_URI; // uri for mongodb database, stored in dotenv file
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); // connect to mongoddb 
const connection = mongoose.connection; // constant for mongoose connection
// print out message to verify that the server is running
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// require and use router files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// run server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});