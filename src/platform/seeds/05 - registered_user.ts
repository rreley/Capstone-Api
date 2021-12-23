import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("registered_user").del();

  // Inserts seed entries
  await knex("registered_user").insert([
    {
      user_id: "6178e96fcac37f00684f2b46",
      access_level: "admin",
      pending_request: false,
    },
    {
      user_id: "6178ec31c69eb2007055030d",
      access_level: "caller",
      pending_request: false,
    },
    {
      user_id: "104728895309966051846",
      access_level: "root",
      pending_request: false,
    },
  ]);
}
