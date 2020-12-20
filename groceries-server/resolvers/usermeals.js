export default {
  Query: {},
  Mutation: {
    addMealtoUser: async (parent, args, { models }) => {
      try {
        models.UserMeals.create({ userId: args.user_id, mealId: args.meal_id });
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
