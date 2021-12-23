import { Request, Response } from "express";
import dbClient from "../../platform/db";
import { User } from "../models/user.model";

export const getAllUsers = async (request: Request, response: Response) => {
  console.log("=== GET /api/users/getall");

  try {
    var dataArr: User[] = [];
    var result = await dbClient<User>("registered_user")
      .select("*")
      .from("registered_user")
      .then(function (result) {
        result.forEach(function (value: User) {
          dataArr.push(value);
        });
        return dataArr;
      });

    response.json({
      message: "Helen API: /api/users/getall - GET all users",
      result: result,
    });
  } catch (error) {
    console.log("There was an error: ", error);
  }
};

export const getUserById = async (request: Request, response: Response) => {
  console.log("=== GET /api/user/<id>");

  try {
    const user_id = request.params.id;
    console.log(user_id);
    var result = await dbClient<User>("registered_user")
      .select("*")
      .from("registered_user")
      .where({ user_id });

    response.json({
      message: "Helen API: /api/users/<id> - GET user by id",
      result: result,
    });
  } catch (error) {
    console.log("There was an error: ", error);
  }
};
