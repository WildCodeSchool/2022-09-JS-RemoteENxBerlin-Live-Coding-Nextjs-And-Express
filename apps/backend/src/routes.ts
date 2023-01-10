import { Router } from "express";
import AuthRouter from "./auth/authRoutes";
import UsersRouter from "./users/usersRoutes";

const MainRouter = Router();

MainRouter.use("/users", UsersRouter);
MainRouter.use("/auth", AuthRouter);

export default MainRouter;