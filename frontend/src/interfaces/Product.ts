import Currency from "./Currency";

export default interface Product {
  name: string;
  imageUrl?: string;
  productCode: string;
  decription?: string;
  brand: string;
  stock: number;
  price: number;
  currency: Currency;
}
