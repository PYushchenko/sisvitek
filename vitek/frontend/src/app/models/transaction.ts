import {Place} from "./place";
import {Tag} from "./tag";
import {Category} from "./category";

export interface Transaction {
  id: number
  place_to: Place
  place_from: Place
  tags: Tag[]
  category: Category
  date: string
  amount_from_currency: string
  amount_from: string
  amount_to_currency: string
  amount_to: string
  description: string
  deleted: boolean
  created_at: string
  updated_at: string
  created_by: number
}
