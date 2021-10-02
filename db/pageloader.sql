\c qa;

\COPY questions (question_id, product_id, body, epoch, asker_name, asker_email, reported, helpful) FROM '/Users/kristingadgil/Repos/questions-answers/csv_original/questions.csv' DELIMITER ',' CSV HEADER;

UPDATE questions SET date_written = to_timestamp(floor(epoch/1000));

ALTER TABLE questions DROP COLUMN epoch;

SELECT setval('questions_question_id_seq', max(question_id)) from questions;

\COPY answers (answer_id, question_id, body, epoch, answerer_name, answerer_email, reported, helpful) FROM '/Users/kristingadgil/Repos/questions-answers/csv_original/answers.csv' DELIMITER ',' CSV HEADER;

UPDATE answers SET date_written = to_timestamp(floor(epoch/1000));

ALTER TABLE answers DROP COLUMN epoch;

SELECT setval('answers_answer_id_seq', max(answer_id)) from answers;

\COPY answers_photos (photo_id, answer_id, photo_url) FROM '/Users/kristingadgil/Repos/questions-answers/csv_original/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('answers_photos_photo_id_seq', max(photo_id)) from answers_photos;