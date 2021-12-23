import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller";

export const userEntityRouter: Router = Router();

userEntityRouter.route("/getall").get(getAllUsers);
userEntityRouter.route("/:id").get(getUserById);
