require("dotenv").config({
  path: "./.env"
});
import Sequelize from "sequelize";
import { Storage, Bucket } from "@google-cloud/storage";

// Accessing your Google Cloud Storage storage bucket
const storage = new Storage({
  keyFilename: "resolvers/serviceAccount.json",
  projectId: process.env.GOOGLE_CLOUD_PROJECT
});

const mealsBucketName = "meals";
async function createBucket() {
  // Creating a bucket
  await storage.createBucket(mealsBucketName);
  console.log(`Bucket ${mealsBucketName} create`);
}
// createBucket().catch(console.error);

// Accessing a storage bucket
const mealsBucket = storage.bucket("meals");
// Uploading a file
// mealsBucket.upload("./../photos/sub.jpg", function(err, file, apiRes) {
//   console.log(file);
// });
export default {
  Query: {
    meals: async (parent, args, { models }) => await models.Meal.findAll(),
    getMeal: async (parent, args, { models }) => {
      return await models.Meal.findOne({
        include: [{ model: models.Groceries }],
        where: { id: args.id }
      });
    },
    randomMeals: async (parent, args, { models }) => {
      return await models.Meal.findAll({
        order: Sequelize.literal("random()"),
        limit: 5
      });
    }
  },
  Mutation: {
    createMeal: async (parent, args, { models }) => {
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
    },
    createCustomMeal: async (parent, args, { models }) => {
      try {
        const newMeal = await models.Meal.create({ ...args });
        await models.UserMeals.create({
          userId: args.userId,
          mealId: newMeal.dataValues.id
        });
        return {
          ok: true
        };
      } catch (err) {
        return { ok: false };
      }
    }
  }
};
