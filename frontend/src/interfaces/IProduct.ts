export interface IProduct {
  _id: string;
  title: string;
  author: string;
  year: number;
  price: number;
  ISBN: string;
  publisher: string;
  category: string;
  language: string;
  pageCount: number;
  description: string;
  mainImage: string;
  images: string[];
}
