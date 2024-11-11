const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/joke.controller');

//http://localhost:3000/api/jokebook/categories
router.get('/jokebook/categories', jokeController.getCategories);

//http://localhost:3000/api/jokebook/joke/funnyJoke
//http://localhost:3000/api/jokebook/joke/lameJoke
router.get('/jokebook/joke/:category', jokeController.getJokesByCategory);

//http://localhost:3000/api/jokebook/joke/new
router.post('/jokebook/joke/new', jokeController.addJoke);

//http://localhost:3000/api/jokebook/joke/random
router.get('/api/jokebook/joke/random', jokeController.RandomJoke);

module.exports = router;
