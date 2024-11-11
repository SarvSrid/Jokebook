"use strict";
const db = require("./db-conn");

const jokeModel = {

  getCategories(callback) {
    try {
      const rows = db.all(`SELECT name FROM Categories`);
      console.log("Categories retrieved:", rows);
      callback(null, rows);
    } catch (error) {
      console.error("Error in getCategories:", error.message);
      callback(error, null);
    }
  },

  getJokesByCategory(category, limit, callback) {
    const query = `
      SELECT Jokes.setup, Jokes.delivery 
      FROM Jokes 
      JOIN Categories ON Jokes.category_id = Categories.id 
      WHERE Categories.name = ?
      ${limit ? `LIMIT ?` : ''}`;
    const params = limit ? [category, limit] : [category];

    try {
      const rows = db.all(query, params);
      console.log(`Jokes in category "${category}":`, rows);
      callback(null, rows);
    } catch (error) {
      console.error("Error in getJokesByCategory:", error.message);
      callback(error, null);
    }
  },


  addJoke(category, setup, delivery, callback) {
    try {
      const row = db.get(`SELECT id FROM Categories WHERE name = ?`, [category]);
      if (row) {

        const result = db.run(
          `INSERT INTO Jokes (category_id, setup, delivery) VALUES (?, ?, ?)`,
          [row.id, setup, delivery]
        );
        console.log("New joke added:", { setup, delivery });
        callback(null, result);
      } else {

        console.error("Category does not exist");
        callback(new Error("Category does not exist"), null);
      }
    } catch (error) {
      console.error("Error in addJoke:", error.message);
      callback(error, null);
    }
  },

  getRandomJoke(callback) {
    try {
      const query = `
        SELECT setup, delivery
        FROM Jokes
        WHERE category_id IN (
          SELECT id
          FROM Categories
          WHERE name IN ('funnyJoke', 'lameJoke')
        )
        ORDER BY RANDOM() LIMIT 1;
      `;
      
      const joke = db.prepare(query).get();
      
      callback(null, joke);
    } catch (error) {
      console.error("Error fetching random joke:", error.message);
      callback(error, null);
    }
  }
};


module.exports = jokeModel;
