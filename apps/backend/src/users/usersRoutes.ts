import { Router } from "express";
import { verifyAdmin } from "../middleware/verifyAdmin";
import {
  getAllUsers,
  createUser,
  getUserById,
  changeUser,
  deleteUser,
} from "./usersHandlers";

const UsersRouter = Router();

UsersRouter.use(verifyAdmin);

UsersRouter.get("/", getAllUsers);
UsersRouter.post("/", createUser);
UsersRouter.get("/:userId", getUserById);
UsersRouter.put("/:userId", changeUser);
UsersRouter.delete("/:userId", deleteUser);

export default UsersRouter;
