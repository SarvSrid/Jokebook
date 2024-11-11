"use strict";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const jokeRoutes = require('./routes/joke.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', jokeRoutes);

app.use(express.static(path.join(__dirname, 'views')));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
