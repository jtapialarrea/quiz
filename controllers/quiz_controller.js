var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId));}
    }
  ).catch(function(error) { next(error);});
};

//GET /quizes
exports.index = function(req, res) {
  //Texto no introducido o acceso a índice completo
  if (req.query.search === undefined || req.query.search === '') {
    models.Quiz.findAll().then(
      function(quizes) {
        res.render('quizes/index', { quizes: quizes });
      }
    ).catch(function(error) { next(error); })
  } else { //Texto a buscar
    models.Quiz.findAll({where: ["pregunta like ?", "%" + req.query.search.trim().replace(/\s/g, "%") + "%"]}).then(
      function(quizes) {
        res.render('quizes/index', { quizes: quizes });
      }
    )
  }
};

//GET quizes/:id
exports.show = function (req, res) {
  res.render('quizes/show', { quiz: req.quiz });
};

//GET quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Su respuesta es: Incorrecta';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Su respuesta es: Correcta';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//GET /quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build( //crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function (req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  // guarda en BD los campos pregunta y respuesta de quiz
  quiz.save( {fields: ["pregunta", "respuesta"]} ).then(function() {
      res.redirect('/quizes');
  }) // Redireccion HTTP (URL relativo) lista de preguntas
};
