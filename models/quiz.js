//Definición del modelo Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca la pregunta"},
          notIn: [['Pregunta', 'pregunta']]
        }
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca la respuesta"},
          notIn: [['Respuesta', 'respuesta']]
        }
      }
    }
  );
}
