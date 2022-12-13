import { Router } from "express";
import UsersRouter from "./users/usersRoutes";

const MainRouter = Router();

MainRouter.use("/users", UsersRouter);

export default MainRouter;