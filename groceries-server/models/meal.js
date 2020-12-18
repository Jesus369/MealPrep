module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define("meal", {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    protien: DataTypes.INTEGER
  });

  Meal.associate = models => {
    Meal.belongsToMany(models.User, {
      through: models.UserMeals,
      foreignKey: {
        name: "mealId",
        field: "meal_id"
      }
    });
    Meal.belongsToMany(models.Groceries, {
      through: models.MealItems,
      foreignKey: {
        name: "mealId",
        field: "meal_id"
      }
    });
  };

  return Meal;
};
