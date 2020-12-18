module.exports = {
  Mutation: {
    mergeMealandItems: async (parent, args, { models }) => {
      try {
        const newCreation = await models.MealItems.create({
          mealId: args.mealId,
          itemId: args.itemId
        });
        console.log(newCreation);
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
