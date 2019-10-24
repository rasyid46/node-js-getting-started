'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dateActivity: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};