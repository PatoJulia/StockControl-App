import Currency from "./Currency";

export default interface Product {
  _id: string;
  name: string;
  imageUrl?: string;
  productCode: string;
  description?: string;
  brand: string;
  stock: number;
  price: number;
}
