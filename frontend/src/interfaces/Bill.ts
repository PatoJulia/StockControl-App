import Client from "./Client";
import Currency from "./Currency";
import Product from "./Product";

export interface Bill {
  description: string;
  discount: number;
  total: number;
  dateOfIssue: Date;
  //currency: Currency;
  clientName: string;
  productListNames: string[];
  products: { name: string; quantity: number }[];
}

export interface BillResponse {
  _id: string;
  description: string;
  discount: number;
  total: number;
  dateOfIssue: Date;
  //currency: Currency;
  client: Client;
  products: Product[];
}
