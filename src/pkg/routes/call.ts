import { Router } from "express";
import { addCall, updateCaller } from "../controllers/call.controller";

export const callsEntityRouter: Router = Router();

callsEntityRouter.route("/add").post(addCall);

callsEntityRouter.route("/update").put(updateCaller);
