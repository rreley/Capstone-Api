import { Request, Response } from "express";
// import ProspectService from "../services/prospects.service"; // do we need the service?
import dbClient from "../../platform/db";
import { Prospect } from "../models/prospect.model";

export const getAllProspects = async (request: Request, response: Response) => {
  console.log("=== GET /api/prospects");

  try {
    var dataArr: Prospect[] = [];
    var result = await dbClient<Prospect>("prospect")
      .select("*")
      .from("prospect")
      .then(function (result) {
        result.forEach(function (value: Prospect) {
          dataArr.push(value);
        });
        return dataArr;
      });

    response.json({
      message: "Helen API: /api/prospects - GET all prospects",
      result: result,
    });
  } catch (error) {
    console.log("There was an error: ", error);
  }
};

export const getNextProspect = async (request: Request, response: Response) => {
  console.log("=== GET /api/prospects/next");

  try {
    const result = await dbClient<Prospect>("prospect")
      // Find latest "activated" prospect with highest id
      .from("prospect")
      .where("activated", false)
      .groupBy("prospect_id")
      .select("*")
      .orderBy("prospect_id")
      .first()

      // Find primary dept and prog name
      .join("program as primary_program", {
        "primary_program.program_id": "prospect.primary_program_id",
      })
      .join("department as primary_department", {
        "primary_department.department_id": "primary_program.department_id",
      })
      .groupBy(
        "primary_program.program_id",
        "primary_department.department_name",
        "primary_department.department_id"
      )
      .select(
        "primary_department.department_name as primary_department_name",
        "primary_program.program_name as primary_program_name"
      )

      // Find secondary dept and prog name
      .join("program as secondary_program", {
        "secondary_program.program_id": "prospect.secondary_program_id",
      })
      .join("department as secondary_department", {
        "secondary_department.department_id": "secondary_program.department_id",
      })
      .groupBy(
        "secondary_program.program_id",
        "secondary_department.department_name",
        "secondary_department.department_id"
      )
      .select(
        "secondary_department.department_name as secondary_department_name",
        "secondary_program.program_name as secondary_program_name"
      )

      .then(function (result) {
        return result;
      });

    response.json({
      message: "Helen API: /api/prospects/next - GET next prospect",
      result: result,
    });
  } catch (error) {
    console.error("There was an error", error);
  }
};

export const activateNextProspect = async (
  request: Request,
  response: Response
) => {
  console.log("=== PUT activation /api/prospects/update");

  try {
    const result = await dbClient<Prospect>("prospect")
      .from("prospect")
      .whereRaw(
        `
      prospect_id = (
        select prospect_id 
        from prospect 
        where activated = false 
        order by prospect_id 
        limit 1)
    `
      )
      .update("activated", true);

    response.json({
      message: "Helen API: /api/prospects/update - PUT activate next prospect",
      result: result,
    });
  } catch (error) {
    console.log("There was an error: ", error);
  }
};
