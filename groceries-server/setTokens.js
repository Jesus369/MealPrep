import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import Sequelize from "sequelize";

export const setTokens = user => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMin = 60 * 15 * 1000;

  const accessUser = {
    id: user.id,
    email: user.email,
    firstname: user.firstname
  };
  const accessToken = sign({ access: accessUser }, "S3CR3TK3Y369", {
    expiresIn: fifteenMin
  });

  const refreshUser = {
    id: user.id
  };

  const refreshToken = sign({ user: refreshUser }, "S3CR3TK3Y369", {
    expiresIn: sevenDays
  });

  return { accessToken, refreshToken };
};

export const validateAccessToken = token => {
  try {
    return verify(token, "S3CR3TK3Y369");
  } catch (err) {
    return null;
  }
};

export const validateRefreshToken = token => {
  try {
    verify(token, "S3CR3TK3Y369");
  } catch (err) {
    return null;
  }
};

export const tokenCookies = ({ accessToken, refreshToken }) => {
  const cookiesOptions = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  };
  return {
    access: ["access", accessToken, cookiesOptions],
    refresh: ["refresh", refreshToken, cookiesOptions]
  };
};

export const tryLogin = async (email, password, models, res) => {
  try {
    // Running a search if the entered email exists. Boolean will return
    const foundUser = await models.sequelize
      .query(
        `
        select (exists (select * from "users" "u" where "u"."email" = '${email}'))
        `,
        { type: Sequelize.QueryTypes.SELECT }
      )
      .spread(u => u);

    // Throw No User Found Error
    if (foundUser.exists == false) {
      return {
        ok: false,
        error: "No user associated with this email was found"
      };
    }

    // If Email Exists
    if (foundUser) {
      // Find User. Get Datavalues.
      const user = await models.sequelize
        .query(`select * from "users" "u" where "u"."email" = '${email}'`, {
          type: Sequelize.QueryTypes.SELECT
        })
        .spread(data => data);

      const validatePassword = await bcrypt.compare(password, user.password);

      // Throw Incorrect Password Error
      if (user && !validatePassword) {
        return {
          ok: false,
          error: "Incorrect password. Please try again ツ"
        };
      }

      // Successfull Login
      if (user && validatePassword) {
        const tokens = await setTokens(user);
        const cookies = await tokenCookies(tokens);

        res.cookie(...cookies.access);
        res.cookie(...cookies.refresh);

        const token = tokens.accessToken;
        const refreshToken = tokens.refreshToken;
        return {
          ok: true,
          token,
          refreshToken,
          error: "No Error!"
        };
      }
    }
  } catch (err) {
    return {
      ok: false,
      error: "There was an error"
    };
  }
};
