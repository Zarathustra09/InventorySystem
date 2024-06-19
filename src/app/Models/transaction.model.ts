export interface Transaction {
  transaction_Id?: number;
  product_Id: number;
  transaction_Type: string; // Use the same casing as in the backend
  quantity: number;
  transaction_Date: Date;   // Use the same casing as in the backend
}
