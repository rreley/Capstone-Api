import { Router } from "express";
import {
  getAllProspects,
  getNextProspect,
  activateNextProspect,
} from "../controllers/prospect.controller";

export const prospectEntityRouter: Router = Router();

prospectEntityRouter.route("/").get(getAllProspects);

prospectEntityRouter.route("/next").get(getNextProspect);

prospectEntityRouter.route("/update").put(activateNextProspect);
