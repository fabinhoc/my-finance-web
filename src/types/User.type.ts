export interface UserType {
  id: number;
  name: string;
  email: string;
  remember_me_token?: string | null;
  created_at: Date;
  updated_at: Date;
  token: string;
}
