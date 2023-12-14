export interface BillTypeDto {
  name: string;
  description?: string;
  price: string;
  is_paid: boolean;
  total_paid?: string;
  due_date: string;
  tag_id?: number;
  notebook_id: number;
  user_id: number;
}
