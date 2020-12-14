import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import {
  setTokens,
  validateAccessToken,
  validateRefreshToken
} from "./setTokens";

import cookieParser from "cookie-parser";

import path from "path";
import cors from "cors";

import models from "./models";
require("dotenv").config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const graphqlEndpoint = "/graphql";

const corsConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      origin: "http://localhost:8081/graphql",
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"]
    };
  } else {
    return {
      origin: "http://Grocer.com",
      credentials: true
    };
  }
};

const app = express();
app.use(cors("*"));
app.use(cookieParser());

// const idUser = async (req, res, next) => {
//   console.log("cookies");
//   console.log(req.headers);
//   return next();
// };

// app.use(idUser);
// export default idUser;

const server = new ApolloServer({
  schema,
  context({ res }) {
    return {
      res,
      models
    };
  },
  introspection: true,
  cors: false,
  playground: {
    endpoint: graphqlEndpoint,
    settings: {
      "editor.theme": "dark"
    }
  }
});

// Validate Tokens Middleware
const validateTokensMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies["refresh"];
  const accessToken = req.cookies["access"];

  if (!accessToken && !refreshToken) return next();

  // Validating refreshToken
  const decodeRefreshToken = validateRefreshToken(accessToken);
  // Logic is decodeRefreshToken == True
  if (decodeRefreshToken && decodeRefreshToken.user) {
    const user = await models.User.get({
      where: { id: decodeRefreshToken.user.Id }
    });

    if (!user.data) {
      // Remove stored cookies
      res.clearCookie("access");
      res.clearCookie("refresh");
      return next();
    }

    const userTokens = setTokens(user.data);
    req.user = decodeRefreshToken.user;

    // Update cookes with new cookies
    const cookies = tokenCookies(userTokens);
    res.cookie(...cookies.access);
    res.cookie(...cookies.refresh);
    return next();
  }
  next();
};

app.use(bodyParser.json());
app.use(validateTokensMiddleware);

server.applyMiddleware({ app, path: graphqlEndpoint, cors: false });

models.sequelize.sync().then(() => {
  app.listen(8082);
});
