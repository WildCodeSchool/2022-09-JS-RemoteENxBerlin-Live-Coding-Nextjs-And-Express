import { Router } from "express";
import { getAllUsers } from "./usersHandlers";

const UsersRouter = Router();

UsersRouter.get("/", getAllUsers);

export default UsersRouter;