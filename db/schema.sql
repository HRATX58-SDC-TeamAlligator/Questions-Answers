DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body TEXT NULL,
  epoch BIGINT DEFAULT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOL DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  date_written TIMESTAMP NULL DEFAULT NULL
);

\COPY questions (question_id, product_id, body, epoch, asker_name, asker_email, reported, helpful) FROM '/Users/kristingadgil/Repos/questions-answers/csv_original/questions.csv' DELIMITER ',' CSV HEADER;


DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  body TEXT NULL,
  epoch BIGINT DEFAULT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOL DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  date_written TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(question_id)
);

\COPY answers (answer_id, question_id, body, epoch, answerer_name, answerer_email, reported, helpful) FROM '/Users/kristingadgil/Repos/questions-answers/csv_original/answers.csv' DELIMITER ',' CSV HEADER;


DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  photo_url TEXT NULL,
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(answer_id)
);

\COPY answers_photos (photo_id, answer_id, photo_url) FROM '/Users/kristingadgil/Repos/questions-answers/csv_original/answers_photos.csv' DELIMITER ',' CSV HEADER;



UPDATE questions SET date_written = to_timestamp(floor(epoch/1000));

UPDATE answers SET date_written = to_timestamp(floor(epoch/1000));

ALTER TABLE questions DROP COLUMN epoch;

ALTER TABLE answers DROP COLUMN epoch;

SELECT setval('questions_question_id_seq', max(question_id)) from questions;

SELECT setval('answers_answer_id_seq', max(answer_id)) from answers;

SELECT setval('answers_photos_photo_id_seq', max(photo_id)) from answers_photos;

CREATE INDEX ON questions (product_id);

CREATE INDEX ON answers (question_id);

CREATE INDEX ON answers_photos (answer_id);
