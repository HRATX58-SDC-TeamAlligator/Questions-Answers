const queries = require('./queries.js');


// GET QAS TESTS =======================================================
test('getQAs should pass back an object', done => {
  let callback = (err, data) => {
    try {
      expect(typeof data).toBe('object');
      expect(err).toBe(null);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getQAs(38323, callback);
});

test('getQAs should pass back the correct question ids', done => {
  let callback = (err, data) => {
    try {
      expect(data.rows[0].question_id).toBe(134603);
      expect(err).toBe(null);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getQAs(38323, callback);
});


// GET SPECIFIC ANSWERS TESTS ==========================================
test('getSpecificAnswers should pass back an array of objects', done => {
  let callback = (err, data) => {
    try{
      expect(Array.isArray(data.rows)).toBe(true);
      expect(err).toBe(null);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getSpecificAnswers(3518966, callback);
});

test('getSpecificAnswers should pass back the correct answer ids', done => {
  let callback = (err, data) => {
    try{
      expect(data.rows[0].answer_id).toBe(6879307);
      expect(err).toBe(null);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getSpecificAnswers(3518966, callback);
});
//write some more tests that test whether the specific data is correct

