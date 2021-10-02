const express = require('express');
const cors = require('cors');
const queries = require('../db/queries.js');
const PORT = 3004;
const app = express();

app.use(cors());

app.get(`/qa/:id`, (req, res) => {
  const product_id = req.params.id;
  queries.getQAs(product_id, (err, response) => {
  if (err) {
    res.status(400).send('Questions request unsuccessful');
  } else {
    res.send(response.rows);
  }
  });
})

app.get(`/qa/questions/:id/answers`, (req, res) => {
  const question_id = req.params.id;
  queries.getSpecificAnswers(question_id, (err, response) => {
    if (err) {
      res.status(400).send('Answers request unsuccessful');
    } else {
      res.send(response.rows);
    }
  });
})

app.post(`/qa/:id`, (req, res) => {
  const product_id = req.params.id;
  const body = req.query.body;
  const asker_name = req.query.name;
  const asker_email = req.query.email;
  queries.askQuestion(product_id, body, asker_name, asker_email, (err, response) => {
    if (err) {
      res.status(400).send('Question post unsuccessful');
    } else {
      res.status(201).send('Question posted');
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