import { TagType } from './Tag.type';

export interface BillType {
  id: number;
  notebook_id: number;
  name: string;
  description: string | null;
  price: string;
  is_paid: boolean;
  total_paid: string;
  due_date: string;
  tag_id: number | null;
  user_id: number;
  tag?: TagType;
  created_at: Date;
  updated_at: Date;
}
