const { Pool, Client } = require('pg');
require('dotenv').config();
const q = require('./dbqueries.js');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // idleTimeoutMillis: 1
  // uncomment above for testing
});


// async/await - check out a client
const getQAs = (product_id, callback) => {
  ; (async() => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.getQuestions, [product_id]);
      callback(null, res);
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const getSpecificAnswers = (question_id, callback) => {
  ; (async() => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.getAnswers, [question_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const askQuestion = (product_id, body, asker_name, asker_email, callback) => {
  ; (async() => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.askQuestion, [product_id, body, asker_name, asker_email]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const answerQuestion = (question_id, body, answerer_name, answerer_email, photos, callback) => {
  ; (async() => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.answerQuestion, [question_id, body, answerer_name, answerer_email]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const addPhoto = (answer_id, url, callback) => {
  ; (async() => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.addPhoto, [answer_id, url]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const markQAsHelpful = (question_id, callback) => {
  ; (async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.markQAsHelpful, [question_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const markAnsAsHelpful = (answer_id, callback) => {
  ; (async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.markAnsAsHelpful, [answer_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

const reportQuestion = (question_id, callback) => {
   ; (async () => {
     const client = await pool.connect()
     try {
       const res = await client.query(q.reportQuestion, [question_id]);
       callback(null, res);
     } finally {
       client.release();
     }
   })().catch(err => console.error(err.stack))
};

const reportAns = (answer_id, callback) => {
  ; (async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(q.reportAnswer, [answer_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.error(err.stack))
};

module.exports = {
  getQAs,
  getSpecificAnswers,
  askQuestion,
  answerQuestion,
  addPhoto,
  markQAsHelpful,
  markAnsAsHelpful,
  reportQuestion,
  reportAns,
};