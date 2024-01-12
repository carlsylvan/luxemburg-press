export interface IProduct {
  _id: string;
  title: string;
  author: string;
  year: number;
  price: number;
  ISBN: number;
  publisher: string;
  category: string;
  language: string;
  pageCount: number;
  // images: { [key: string]: string };
  description: string;
  imgUrl: string;
}
