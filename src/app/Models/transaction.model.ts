export interface Transaction {
  transaction_Id?: number;
  product_Id: number;
  product_Name?: string; // Add product_Name property
  transaction_Type: string;
  quantity: number;
  transaction_Date: Date;
}
