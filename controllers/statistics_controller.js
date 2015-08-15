var models = require('../models/models.js');
var Promise = require('bluebird');

function isGreaterZero(element) {
  return element > 0;
}

//GET /quizes/statistics
exports.index = function(req, res) {

  var statistics = {
    tot_preguntas:   0,
    tot_comentarios: 0,
    med_comentarios: 0,
    sin_Comentarios: 0,
    con_Comentarios: 0
  };
  //Almacena total de comentarios por cada pregunta
  var comments = [];

  models.Quiz.findAll()
  .then(
    function(quizes) {
      statistics.tot_preguntas = quizes.length;
      //Se itera con cada pregunta para obtener el núm. de comentarios
      quizes.forEach(function(item) {
        var filter_comment = {};
        filter_comment.where = ["QuizId = ?", item.id];
        comments.push(
          //Uso de Promise para asegurar la ejecución de todas las queries
          Promise.all([
            models.Comment.count(filter_comment)
          ])
        )
      })
      return Promise.all(comments);
    })
  .then(
    function(comments) {
      statistics.tot_comentarios = comments.reduce(function(a, b) {
        return parseInt(a) + parseInt(b)  ;
      });
      statistics.con_comentarios = comments.filter(isGreaterZero).length;
      statistics.sin_comentarios= statistics.tot_preguntas - statistics.con_comentarios;
      if (statistics.tot_comentarios > 0) {
        statistics.med_comentarios = (statistics.tot_preguntas / statistics.tot_comentarios).toFixed(2);
      };

      res.render( 'statistics/index', { statistics: statistics, errors: [] } );
    })
  .catch( function( error ){
    console.error("Error statistics_controller.js: " + error );
  })
};
