var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var title = 'Quiz';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: title });
});

//Autoload de comandos con: quizId
router.param('quizId', quizController.load); //autolad :quizId

/* Definición de rutas /quizes */
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', function(req, res) {
  res.render('author');
});

module.exports = router;
