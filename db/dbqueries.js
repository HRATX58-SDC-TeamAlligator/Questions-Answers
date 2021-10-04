module.exports = {

// GET requests ================================================================
  getQuestions: `
    SELECT
      question_id,
      product_id,
      body,
      asker_name,
      asker_email,
      helpful,
      date_written
    FROM questions
    WHERE product_id=$1 AND reported=false;
    `,
  // left outer join because there will not be photos for every answer, all records from the answers table and matching records from the right table (not joining as many records), inner join only gave me records that had photos
  getAnswers: `
    SELECT
      answers.answer_id,
      answers.question_id,
      answers.body,
      answers.answerer_name,
      answers.helpful,
      answers.date_written,
      array_agg(answers_photos.photo_url) photos
    FROM answers
    LEFT OUTER JOIN answers_photos
    ON answers.answer_id=answers_photos.answer_id
    WHERE answers.question_id=$1 AND answers.reported=false
    GROUP BY answers.answer_id;
    `,

// POST REQUESTS ===============================================================
  askQuestion: `
    INSERT INTO questions (
      product_id,
      body,
      asker_name,
      asker_email,
      reported,
      helpful,
      date_written
    )
    VALUES ($1, $2, $3, $4, false, 0, CURRENT_TIMESTAMP)
    RETURNING *;
    `,
  answerQuestion: `
    INSERT INTO answers (
      question_id,
      body,
      answerer_name,
      answerer_email,
      reported,
      helpful,
      date_written
    )
    VALUES ($1, $2, $3, $4, false, 0, CURRENT_TIMESTAMP)
    RETURNING *;
    `,
  addPhoto: `
    INSERT INTO answers_photos (
      answer_id,
      photo_url
    )
    VALUES ($1, $2)
    RETURNING *;
    `,

// UPDATE REQUESTS ==============================================================
  markQAsHelpful: `
    UPDATE questions
    SET helpful=helpful+1
    WHERE question_id=$1
    RETURNING helpful;
    `,
  markAnsAsHelpful: `
    UPDATE answers
    SET helpful=helpful+1
    WHERE answer_id=$1
    RETURNING helpful;
    `,
  reportQuestion:
    `UPDATE questions
    SET reported=NOT reported
    WHERE question_id=$1
    RETURNING reported;
    `,
  reportAnswer:
    `UPDATE answers
    SET reported=NOT reported
    WHERE answer_id=$1
    RETURNING reported
    `
}
