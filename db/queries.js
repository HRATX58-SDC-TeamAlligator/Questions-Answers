const { Pool, Client } = require('pg');
require('dotenv').config();
const q = require('./dbqueries.js');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const getQAs = (product_id, callback) => {

};

const getSpecificAnswers = (question_id, callback) => {

};

const askQuestion = (product_id, text, name, email, callback) => {

};

const answerQuestion = (question_id, text, name, email, photos, callback) => {

};

const markQAsHelpful = (question_id, callback) => {

};

const markAnsAsHelpful = (answer_id, callback) => {

};

const reportQuestion = (question_id, callback) => {

};

const reportAns = (answer_id, callback) => {

};

module.exports = {
  getQAs,
  getSpecificAnswers,
  askQuestion,
  answerQuestion,
  markQAsHelpful,
  markAnsAsHelpful,
  reportQuestion,
  reportAns,
};