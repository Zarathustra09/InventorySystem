export interface Product {
  product_Id?: number;
  product_Name: string;
  description: string;
  price: number;
  quantity: number;
  created_At?: Date;
  updated_At?: Date;
}
