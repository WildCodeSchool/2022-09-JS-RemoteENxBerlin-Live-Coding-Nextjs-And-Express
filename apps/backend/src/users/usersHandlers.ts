import { Request, Response } from "express";
import argon2 from "argon2";
import database from "../database";
import { RowDataPacket } from "mysql2";

export const getAllUsers = (req: Request, res: Response) => {
  database.query("SELECT * FROM users").then((result) => {
    res.json(result[0]);
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  const hashedPassword = await argon2.hash(password, {
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1
  });

  console.log(hashedPassword);

  database
    .query(
      "INSERT INTO users (email, hashedPassword) VALUES (?, ?)",
      [email, hashedPassword]
    )
    .then((result) => {
    //   if (result[0].affectedRows! === 0) {
    //     res.status(400).send("Movie could not be created.");
    //   } else {
      // const rowData : RowDataPacket[] | { insertId : number} = result[0];
      //   const newUserID = rowData.insertId;
        // res.location(result[0].insertId).sendStatus(201);
        res.sendStatus(201);
      // }
    })
    // .catch((err) => {
    //   console.error(err);
    //   res.status(500).send("Internal Server Error");
    // });

};

export const getUserById = (req: Request, res: Response) => {};

export const changeUser = (req: Request, res: Response) => {};

export const deleteUser = (req: Request, res: Response) => {};
