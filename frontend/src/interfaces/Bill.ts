import Client from "./Client";
import Currency from "./Currency";
import Product from "./Product";

export interface Bill {
  _id: string;
  description: string;
  discount: number;
  total: number;
  dateOfIssue: Date;
  currency: Currency;
  client: Client;
  productList: Product[];
}
