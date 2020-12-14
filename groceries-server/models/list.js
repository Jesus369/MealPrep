module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("list", {
    name: DataTypes.STRING
  });

  List.associate = models => {
    List.belongsToMany(models.Groceries, {
      through: models.ListGroceries,
      foreignKey: {
        name: "listId",
        field: "list_id"
      }
    });

    List.belongsTo(models.User, {
      foreignKey: {
        name: " userId",
        field: "user_id"
      },
      as: "user"
    });
  };

  return List;
};
