import { Router } from "express";
import { postImportData } from "../controllers/import.controller";

export const importEntityRouter: Router = Router();

importEntityRouter.route("/").post(postImportData);
