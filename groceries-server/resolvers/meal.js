import cloudinary from "cloudinary";
require("dotenv").config();

const cloud = cloudinary.v2;
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

export default {
  Query: {
    meals: async (parent, args, { models }) => await models.Meal.findAll(),
    getMeal: async (parent, args, { models }) => {
      return await models.Meal.findOne({
        include: [{ model: models.Groceries }],
        where: { id: args.id }
      });
    }
  },
  Mutation: {
    addMeal: async (parent, args, { models }) => {
      try {
        await models.Meal.create({
          ...args
        });
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
