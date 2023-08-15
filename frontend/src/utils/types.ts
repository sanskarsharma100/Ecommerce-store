export type User = {
  avatar: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type signUpTypes = {
  name: string;
  email: string;
  password: string;
  avatar: string | ArrayBuffer | null;
};

export type StringObject = {
  [key: string]: string;
};

export type ImageType = {
  public_id: string;
  url: string;
  _id: string;
};

export type productType = {
  name: string;
  category: string;
  description: string;
  numOfReviews: number;
  price: number;
  ratings: number;
  stock: number;
  _id: string;
  images: [ImageType];
};

export type allProductResp = {
  success: boolean;
  productCount: number;
  products: [productType];
};
