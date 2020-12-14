export default {
  Query: {
    allLists: async (parent, args, { models }) => await models.List.findAll(),
    usersGrcryLst: async (parent, { listId }, { models }) =>
      await models.List.findOne({
        include: [{ model: models.Groceries }],
        where: { id: listId }
      })
  },

  Mutation: {
    newList: async (parent, args, { models }) => {
      try {
        await models.List.create(args);
        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    }
  }
};
