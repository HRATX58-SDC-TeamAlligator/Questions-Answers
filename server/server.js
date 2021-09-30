const express = require('express');
const cors = require('cors');
const queries = require('../db/queries.js');

const app = express();

app.use(cors());


const PORT = 3004;

app.listen(PORT, () => {
  console.info(`listening on ${PORT}...`);
});