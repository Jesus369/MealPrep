// import userId from "../index.js";

module.exports = {
  Query: {
    grocery: async (parent, args, { models }) => {
      // userId();
      return await models.Groceries.findOne({ where: { id: args.id } });
    },
    groceries: async (parent, args, { models }) =>
      await models.Groceries.findAll({ order: ["category"] }),

    groceriesCat: async (parent, { category }, { models }) =>
      await models.Groceries.findAll({ where: { category: category } }),

    inlist: async (parent, args, { models }) => await models.Groceries.findAll()
  },

  Mutation: {
    addedGrocery: async (parent, args, { models }) => {
      try {
        const usersPrmryLst = await models.User.findOne({
          include: {
            model: models.List,
            as: "lists",
            where: { name: "Vegan" },
            required: true
          },
          where: { id: args.userId },
          required: false
        });

        console.log(usersPrmryLst);

        if (usersPrmryLst) {
          const usersPrmryLstId = usersPrmryLst.lists[0].dataValues.id;
          console.log("Adding grocery to list");
          await models.ListGroceries.create({
            listId: usersPrmryLstId,
            itemId: args.itemId
          });
        } else {
          console.log("Creating list");
          const newList = await models.List.create({
            name: "Vegan",
            userId: args.userId
          });
        }

        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false
        };
      }
    },
    createGrocery: async (parent, args, { models }) => {
      try {
        await models.Groceries.create(args);
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false
        };
      }
    }
  }
};
