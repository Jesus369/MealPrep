module.exports = (sequelize, DataTypes) => {
  const Groceries = sequelize.define("groceries", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    sugar: DataTypes.INTEGER
  });

  Groceries.associate = models => {
    Groceries.belongsToMany(models.List, {
      through: models.ListGroceries,
      foreignKey: {
        name: "itemId",
        field: "item_id"
      }
    });
  };

  return Groceries;
};
