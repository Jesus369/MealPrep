import Sequelize from "sequelize";

const sequelize = new Sequelize("groceries", "postgres", "postgres", {
  dialect: "postgres",
  define: {
    underscored: true,
    query: { raw: true }
  }
});

const models = {
  User: sequelize.import("./user"),
  Groceries: sequelize.import("./groceries"),
  List: sequelize.import("./list"),
  ListGroceries: sequelize.import("./listgroceries"),
  Meal: sequelize.import("./meal"),
  UserMeals: sequelize.import("./usermeals")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = sequelize;

export default models;
