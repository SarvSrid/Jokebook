const jokeModel = require('../models/joke.model');

exports.getCategories = (req, res) => {
  console.log("Received request to fetch categories");
  jokeModel.getCategories((err, rows) => {
    if (err) {
      console.error("Error fetching categories:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ categories: rows });
  });
};

exports.getJokesByCategory = (req, res) => {
  const category = req.params.category;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  jokeModel.getJokesByCategory(category, limit, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ jokes: rows });
  });
};

exports.addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;
  jokeModel.addJoke(category, setup, delivery, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Joke added successfully' });
  });
};

exports.RandomJoke = (req, res) => {
  jokeModel.getRandomJoke((err, joke) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ joke });
  });
};
