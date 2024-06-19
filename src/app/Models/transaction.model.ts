export interface Transaction {
  transaction_Id?: number;
  product_Id: number;
  transactionType: string;
  quantity: number;
  transactionDate: Date;
}
