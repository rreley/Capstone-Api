import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("call_tracking").del();

  // Inserts seed entries
  await knex("call_tracking").insert([
    {
      prospect_id: 1,
      caller_id: "6178e96fcac37f00684f2b46",
      campaign_id: 1,
      number_times_called: 1,
      call_disposition: null,
      call_notes: null,
      was_emailed: false,
      email_text: null,
    },
    {
      prospect_id: 3,
      caller_id: "6178ec31c69eb2007055030d",
      campaign_id: 1,
      number_times_called: 1,
      call_disposition: null,
      call_notes: null,
      was_emailed: false,
      email_text: null,
    },
    {
      prospect_id: 3,
      caller_id: "6178ec31c69eb2007055030d",
      campaign_id: 1,
      number_times_called: 2,
      call_disposition: null,
      call_notes: null,
      was_emailed: false,
      email_text: null,
    },
  ]);
}
