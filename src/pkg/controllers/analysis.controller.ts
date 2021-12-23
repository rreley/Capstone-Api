import { Request, Response } from "express";
import dbClient from "../../platform/db";

export const getAnalysisData = async (request: Request, response: Response) => {
  console.log("=== GET /api/analysis");

  try {
    const dataQuery = await dbClient("call_tracking")
      .from("call_tracking AS o")
      .groupByRaw(`o.created_at`)
      .select(
        dbClient.raw(
          `to_char(o.created_at, 'dd.mm.YYYY') as date, sum(o.number_times_called) as calls`
        )
      )
      .join("campaign AS i", {
        "o.campaign_id": "i.campaign_id",
      })
      .orderByRaw(`o.created_at`);

    return response.status(200).send({
      message: "Helen API: /api/analysis - GET analysis data.",
      result: dataQuery,
    });
  } catch (error) {
    console.log("there was an error: ", error);
  }
};
