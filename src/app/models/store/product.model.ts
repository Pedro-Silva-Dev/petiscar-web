export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean; 
  categoryId?: number; 
  productAdded?: boolean;
}