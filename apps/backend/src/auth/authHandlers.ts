import { Request, RequestHandler } from "express";
import { RowDataPacket } from "mysql2";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import database from "../database";
import type { UserModel } from "types/src/dbModel/user";

type UserMySQLResult = UserModel & RowDataPacket;

export const loginUser: RequestHandler = (
  req: Request<
    {},
    {},
    {
      email: string;
      password: string;
    }
  >,
  res
) => {
  if (req.body.email == null || req.body.password == null) {
    res.status(400).json({
      error: "email and password are required fields.",
    });
    return;
  }

  database
    .query<UserMySQLResult[]>("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ])
    .then(async ([result]) => {
      if (result.length === 0) {
        res.sendStatus(404);
        return;
      } else if (result.length > 1) {
        res.sendStatus(500);
        return;
      }
      const user = result[0];
      console.log("User trying to log in:", user.email);
      const hashedPassword = user.hashedPassword;
      if (hashedPassword == null) {
        res.status(422).json({
          error: "Please finish user setup.",
        });
        return;
      }
      const userIsAuthorized = await argon2.verify(hashedPassword, req.body.password);
      if (!userIsAuthorized) {
        res.status(401).json({
          error: "Wrong credentials.",
        });
        return;
      }
      const jsonWebToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res.status(200).json({
        token: jsonWebToken,
      });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
