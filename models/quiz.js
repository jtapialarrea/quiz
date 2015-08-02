//Definición del modelo Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca la pregunta"},
          notIn: {
            args: [["Pregunta"]],
            msg: "-> Falta Pregunta"
          }
        }
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "-> Por favor, introduzca la respuesta"},
          notIn: {
            args: [["Respuesta"]],
            msg: "-> Falta Respuesta"
          }
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
