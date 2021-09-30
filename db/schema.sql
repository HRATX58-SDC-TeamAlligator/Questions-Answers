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

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  photo_url TEXT NULL,
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(answer_id)
);
