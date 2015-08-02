//Definición del modelo Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca la pregunta"}
        }
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca la respuesta"}
        }
      },
      tema: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "Por favor, elija el tema de la pregunta"}
        }
      }
    }
  );
}
