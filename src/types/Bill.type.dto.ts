export interface BillTypeDto {
  name: string;
  description?: string;
  price: string;
  isPaid: boolean;
  totalPaid?: string;
  dueDate: string;
  tagId?: number;
  notebookId: number;
  userId: number;
}
