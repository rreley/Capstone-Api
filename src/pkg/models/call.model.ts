export interface Call {
  call_id: number;
  prospect_id: number;
  caller_id: string;
  campaign_id: number;
  number_times_called: number;
  call_disposition: string;
  call_notes: string;
  was_emailed: boolean;
  email_text: string;
  created_at: Date;
  updated_at: Date;
}
