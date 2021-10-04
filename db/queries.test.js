const queries = require('./queries.js');


// GET QAS TESTS =======================================================
test('getQAs should pass back an object', done => {
  let callback = (data) => {
    try {
      expect(typeof data).toBe('object');
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getQAs(38323, callback);
  done();
});

test('getQAs should pass back the correct question ids', done => {
  let callback = (data) => {
    try {
      expect(data.rows[0].question_id).toBe(134603);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getQAs(38323, callback);
  done();
});


// GET SPECIFIC ANSWERS TESTS ==========================================
test('getSpecificAnswers should pass back an array of objects', done => {
  let callback = (data) => {
    try{
      expect(Array.isArray(data)).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getSpecificAnswers(3518966, callback);
  done();
});

test('getSpecificAnswers should pass back the correct answer ids', done => {
  let callback = (data) => {
    try{
      expect(data.rows[0].answer_id).toBe(6879307);
      done();
    } catch (error) {
      done(error);
    }
  }
  queries.getSpecificAnswers(3518966, callback);
  done();
});
//write some more tests that test whether the specific data is correct

