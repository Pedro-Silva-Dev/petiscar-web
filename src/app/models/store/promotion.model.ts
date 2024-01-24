import { Product } from "./product.model"

export interface Promotion {
  id: number
  name: string
  description: string
  discount: number
  percentageDiscount: boolean
  active: boolean
  dhi: string
  dhf: string
  products: Product[];
}
