export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  tag: string;
};

export type Cart = Record<number, number>;

export type User = {
  _id: string;
  username: string;
  email: string;
};