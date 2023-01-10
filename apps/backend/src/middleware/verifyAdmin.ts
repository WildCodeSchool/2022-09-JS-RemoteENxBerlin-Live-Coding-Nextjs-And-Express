import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import { UserModel } from "types/src/dbModel/user";
import database from "../database";

export const verifyAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader == null) {
    res.status(401).json("No authentication.");
    return;
  }

  console.log(authHeader);

  const token = authHeader.split(" ")[1];

  console.log(token);

  const userId = jwt.verify(token, process.env.JWT_SECRET!).sub;
  console.log(userId);

  database
    .query<
      ({
        isAdmin: boolean;
      } & RowDataPacket)[]
    >("SELECT isAdmin FROM users WHERE id = ?", [userId])
    .then(([result]) => {
      if (result[0].isAdmin == true) {
        next();
        return;
      }
      res.status(401).json({
        error: "User not an admin.",
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
