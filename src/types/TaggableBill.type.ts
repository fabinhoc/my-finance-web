import { BillType } from './Bill.type';
import { TagType } from './Tag.type';

export interface TaggableBillType {
  id: number;
  name: string;
  description?: string | null;
  price: string;
  is_paid: boolean;
  total_paid?: string;
  due_date: string;
  tag_id: number | null;
  color?: string | null;
  user_id?: number;
  tag?: TagType;
  bills?: BillType[];
  created_at?: Date;
  updated_at?: Date;
}
