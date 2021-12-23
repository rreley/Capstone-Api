export interface User {
  user_id: string;
  access_level: string;
  pending_request: boolean;
  created_at: Date;
  updated_at: Date;
}
