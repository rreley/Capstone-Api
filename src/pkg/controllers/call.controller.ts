import { Request, Response } from "express";
import dbClient from "../../platform/db";
import { Call } from "../models/call.model";

export const addCall = async (request: Request, response: Response) => {
  console.log("=== POST /api/calls/add");

  try {
    const values = request.body;
    console.log(values);

    // const calculated_number_times_called = await dbClient<Call>("call_tracking")
    //   .where({
    //     prospect_id: values.prospect_id,
    //     caller_id: values.caller_id,
    //     campaign_id: values.campaign_id,
    //   })
    //   .groupBy("call_id", "created_at")
    //   .select("number_times_called")
    //   .orderBy("number_times_called", "desc")
    //   .first();

    // console.log("calculated_number_times_called ");
    // console.log(calculated_number_times_called);

    // const increment_calculated_number_times_called =
    //   calculated_number_times_called.number_times_called + 1;

    var result = await dbClient<Call>("call_tracking").insert({
      prospect_id: values.prospect_id,
      caller_id: values.caller_id,
      campaign_id: values.campaign_id,
      number_times_called: values.numTimesCalled,
      call_disposition: values.disposition,
      call_notes: values.callNotes,
      was_emailed: values.checked,
      email_text: values.emailText,
    });

    response.json({
      message: "Helen API: /api/calls/add - POST add new call",
      result: result,
    });
  } catch (error) {
    console.log("There was an error: ", error);
  }
};

export const updateCaller = async (request: Request, response: Response) => {
  console.log("=== PUT /api/calls/update");

  try {
    const result = await dbClient<Call>("call_tracking")
      .from("call_tracking")
      .whereRaw(
        `
        call_id = (
          select call_id
          from call_tracking
          order by call_id desc
          limit 1)
      `
      )
      .increment("number_times_called", 1);

    response.json({
      message: "Helen API: PUT /api/calls/update",
      result: result,
    });
  } catch (error) {
    console.log("There was an error: ", error);
  }
};
