export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  images: string[];
  videoUrl?: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export enum PageView {
  HOME = 'HOME',
  PRODUCT = 'PRODUCT',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export type Language = 'EN' | 'FR' | 'ES' | 'AR';