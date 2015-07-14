var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var title = 'Quiz';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: title });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', function(req, res) {
  res.render('author');
});

module.exports = router;
