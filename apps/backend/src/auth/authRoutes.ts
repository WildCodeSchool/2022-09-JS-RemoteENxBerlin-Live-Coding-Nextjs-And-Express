import { Router } from "express";
import { loginUser } from "./authHandlers";

const AuthRouter = Router();

AuthRouter.post("/login", loginUser);

export default AuthRouter;
