const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Grocery = sequelize.define('Grocery', {
    name: DataTypes.STRING,
    isChecked: DataTypes.BOOLEAN
  }, {freezeTableName: true});
  Grocery.associate = function(models) {
    // associations can be defined here
    // Grocery.hasMany(models.Item, {
    //   foreignKey: 'itemId',
    //   as: 'items',
    // });
  };
  return Grocery;
};