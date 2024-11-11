"use strict";

const Database = require("better-sqlite3");

let db;
try {
  db = new Database("./models/jokebook.db", { fileMustExist: true });
  // Test query to check connection
  db.prepare("SELECT 1").get();
  console.log("Database connection established successfully.");
} catch (error) {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
}

function all(sql, params = []) {
  return db.prepare(sql).all(...params);
}

function get(sql, params = []) {
  return db.prepare(sql).get(...params);
}

function run(sql, params = []) {
  return db.prepare(sql).run(...params);
}

function exec(sql) {
  return db.exec(sql);
}

function db_close() {
  console.log("...Closing database connection.")
  db.close();
}

module.exports = {
  all,
  get,
  run,
  exec,
  db_close
};