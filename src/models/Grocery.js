const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Grocery = sequelize.define('Grocery', {
    name: DataTypes.STRING,
    checked: DataTypes.BOOLEAN
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
    // Grocery.hasMany(models.Item, {
    //   foreignKey: 'itemId',
    //   as: 'items',
    // });
  };
  return Grocery;
};