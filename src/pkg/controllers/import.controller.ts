import { Request, Response } from "express";
import { Buffer } from "buffer";
import dbClient from "../../platform/db";
import { Prospect } from "../models/prospect.model";
import * as fast_csv from "fast-csv";
import { UploadedFile } from "express-fileupload";

export const postImportData = async (request: Request, response: Response) => {
  console.log("=== POST /api/import");

  const fileData: UploadedFile = request.files!.file as UploadedFile;

  const fileBuff = fileData.data;
  // console.log(fileBuff);

  const csv = Buffer.from(fileBuff).toString("ascii");

  // console.log(csv);

  fast_csv
    .parseString(csv, {
      headers: true,
      ignoreEmpty: true,
      discardUnmappedColumns: true,
    })
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      // console.log(row);

      await dbClient<Prospect>("prospect")
        .insert(row)
        .catch((e) => {
          console.log("\n*****There was an error!***** \n", e);
          // return response.json({
          //   message: "There was an error with identifier naming conventions.",
          // });
        });

      // TODO:
      // If row fails to insert return
      // a description of why it failed.
      // ie. Key already in db, data not in correct form, ...
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};
