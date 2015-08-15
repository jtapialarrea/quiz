var models = require('../models/models.js');

//GET /quizes/statistics
exports.index = function(req, res) {

  var statistics = {
    tot_preguntas:   0,
    tot_comentarios: 0,
    med_comentarios: 0,
    sin_Comentarios: 0,
    con_Comentarios: 0
  };

  models.Quiz.count()
  .then(
    function(count) {
      statistics.tot_preguntas = count;
      return models.Comment.count();
    })
  .then(
    function(count) {
      statistics.tot_comentarios = count;
      return models.Quiz.count({
        distinct: true,
        include: [{ model: models.Comment, required: true }]
      })
    })
  .then(
    function(count) {
      statistics.con_comentarios = count;
      statistics.sin_comentarios= statistics.tot_preguntas - statistics.con_comentarios;
        if (statistics.tot_comentarios > 0) {
        statistics.med_comentarios = (statistics.tot_comentarios / statistics.tot_preguntas).toFixed(2);
      };

      res.render( 'statistics/index', { statistics: statistics, errors: [] } );
    })
  .catch( function( error ){
    console.error("Error statistics_controller.js: " + error );
  })
};
