var models = require('../models/models.js');

//GET /quizes/:quizId/new
exports.new = function (req, res) {
//res.render('comments/new', {quizId: req.params.quizId, errors: [] });
  res.render('comments/new', {quiz: req.quiz, errors: [] });
};

//POST /quizes/:quizId/comments
exports.create = function (req, res) {
  var comment = models.Comment.build(
    {
      texto: req.body.comment.texto,
      QuizId: req.params.quizId
    }
  );
  comment
  .validate()
  .then(
    function(err) {
      if (err) {
      //res.render('comments/new', {comment: comment, quizId: req.params.quizId, errors: err.errors});
        res.render('comments/new', {comment: comment, quiz: req.quiz, errors: err.errors});
      } else {
        comment
        .save()
        .then(
          function() {
            res.redirect('/quizes/'+ req.params.quizId)
          }
        )
      }
    }
  ).catch( function(error) { next(error) });
};
