const express = require('express');
const cors = require('cors');
const compression = require('compression');
const queries = require('../db/queries.js');
const redis = require('redis');
const PORT = 3004;
const app = express();

const loader = require('loaderio-e393ee15f83c85f3428d7ed8adfcbddc.txt');
// require('newrelic');

const client = redis.createClient();
app.use(cors());
app.use(compression());

app.get(`/loaderio-bbb7b646b318c928672c6087937a878b/`, (req, res) => {
  if (err) {
    res.status(400).send('loader connection unsuccessful');
  } else {
    res.send(loader);
  }
});
client.on('connect', ()=> {
  console.info('Redis connection established');
})

app.get('/qa/:id', (req, res) => {
  const product_id = req.params.id;
  try {
    client.get(`questions:${product_id}`, (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        console.log('questions retrieved from cache');
        res.send(JSON.parse(data));
      } else {
        console.log('questions retrieved from db');
        queries.getQAs(product_id, (err, response) => {
          if (err) {
            res.status(400).send('questions request unsuccessful');
          } else {
            res.send(response.rows);
            client.set(
              `questions:${product_id}`,
              JSON.stringify(response.rows),
              'EX',
              //2 days
              172800
            );
          }
        });
      }
    });
  } catch (err) {
    res.status(400).send('did not retrieve questions');
  }
});

app.get(`/qa/questions/:id/answers`, (req, res) => {
  const question_id = req.params.id;
  try {
    client.get(`answers:${question_id}`, (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        console.log('answers retrieved from cache');
        res.send(JSON.parse(data));
      } else {
        console.log('answers retrieved from db');
        queries.getSpecificAnswers(question_id, (err, response) => {
          if (err) {
            res.status(400).send('answers request unsuccessful')
          } else {
            res.send(response.rows);
            client.set(
              `answers:${question_id}`,
              JSON.stringify(response.rows),
              'EX',
              172800
            );
          }
        });
      }
    });
  } catch (err) {
    res.status(400).send('did not retrieve answers')
  }
});


app.post(`/qa/:id`, (req, res) => {
  const product_id = req.params.id;
  const body = req.query.body;
  const asker_name = req.query.name;
  const asker_email = req.query.email;
  queries.askQuestion(product_id, body, asker_name, asker_email, (err, response) => {
    if (err) {
      res.status(400).send('question post unsuccessful');
    } else {
      client.del(JSON.stringify(product_id));
      res.status(201).send('question posted');
    }
  });
});

app.post(`/qa/answers/:id`, (req, res) => {
  const question_id = req.params.id;
  const body = req.query.body;
  const answerer_name = req.query.name;
  const answerer_email = req.query.email;
  const photos = req.query.photos || [];
  queries.answerQuestion(question_id, body, answerer_name, answerer_email, photos, (err, response) => {
    if (err) {
      res.status(400).send('Answer post unsuccessful');
    } else {
      client.del(JSON.stringify(question_id));
      if (!photos.length) {
        res.status(201).send('Answer posted');
      } else {
        const answer_id = response.rows[0].answer_id;
        photos.forEach(photo => queries.addPhoto(answer_id, photo, (err, response) => {
          if (err) {
            res.status(400).send('Photo post unsuccessful');
          }
        }));
        res.status(201).send('Photo posted');
      }
    }
  });
});

app.put(`/qa/questions/:id/helpful`, (req, res) => {
  const question_id = req.params.id;
  queries.markQAsHelpful(question_id, (err, response) => {
    if (err) {
      res.status(400).send('Helpfulness update unsuccessful');
    } else {
      res.send('Helpfulness update successful');
    }
  });
});

app.put(`/qa/answers/:id/helpful`, (req, res) => {
  const answer_id = req.params.id;
  queries.markAnsAsHelpful(answer_id, (err, response) => {
    if (err) {
      res.status(400).send('Helpfulness update unsuccessful');
    } else {
      res.send('Helpfulness update successful');
    }
  });
});

app.put(`/qa/questions/:id/report`, (req, res) => {
  const question_id = req.params.id;
  queries.reportQuestion(question_id, (err, response) => {
    if (err) {
      res.status(400).send('Report unsuccessful');
    } else {
      res.send('Question reported');
    }
  });
});

app.put(`/qa/answers/:id/report`, (req, res) => {
  const answer_id = req.params.id;
  queries.reportAns(answer_id, (err, response) => {
    if (err) {
      res.status(400).send('Report unsuccessful');
    } else {
      res.send('Answer reported');
    }
  });
});


app.listen(PORT, () => {
  console.info(`listening on ${PORT}...`);
});