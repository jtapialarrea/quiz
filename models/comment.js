//Definición del modelo Comment con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca el comentario"},
        }
      }
    }
  );
}
