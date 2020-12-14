import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      tokencount: DataTypes.STRING
    },
    {
      hooks: {
        afterValidate: async user => {
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  );

  User.associate = models => {
    User.hasMany(models.List, {
      as: "lists"
    });

    User.belongsToMany(models.Meal, {
      through: models.UserMeals,
      foreignKey: {
        name: "userId",
        field: "user_id"
      }
    });
  };
  return User;
};
