import { tryLogin } from "../setTokens.js";
import { validate } from "graphql";

export default {
  Query: {
    users: (parent, args, { models }, info) => models.User.findAll(),
    user: (parent, { id }, { models }, info) =>
      models.User.findOne({
        include: ["lists", { model: models.Meal }],
        where: { id: id }
      })
  },
  Mutation: {
    registerUser: async (parent, args, { models }) => {
      try {
        function zeroedArgs() {
          let unfilledArgs = [];

          for (var key in args) {
            if (args[key] == "") {
              unfilledArgs.push(key);
            }
          }

          return unfilledArgs;
        }

        // VALUES OF USERS EMPTY ARGS
        const emptyUserArgs = zeroedArgs();

        if (zeroedArgs !== 4) {
          await models.User.create({ ...args });
          return { ok: true };
        } else {
          return {
            ok: false,
            error: `Looks like you're still missing a few things: ${emptyUserArgs}`
          };
        }
      } catch (err) {
        return { ok: false };
      }
    },
    login: (_, { email, password }, { models, res }) =>
      tryLogin(email, password, models, res)
  }
};
