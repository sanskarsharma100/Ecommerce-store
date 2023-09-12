export type Button = {
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  to?: string;
  href?: string;
};

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
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: [ImageType];
  category: string;
  stock: number;
  numOfReviews: number;
  user: string;
  reviews: [];
  createdAt: string;
};

export type allProductResp = {
  success: boolean;
  pages: number;
  products: [productType];
};

export type productDetailsResp = {
  success: boolean;
  product: productType;
};

export type sortOptions = "increasing" | "decreasing" | "ratings" | "relevance";

export type getProductPara = {
  keyword: string;
  currentPage: number;
  price: Array<number>;
  category: string;
  ratings: number;
  sort: sortOptions;
};

export type categories = {
  _id: string;
  name: string;
};

export type getCategoryResp = {
  success: boolean;
  categoryCount: number;
  categories: [categories];
};

export type addToCartResp = {
  success: boolean;
  cart: Cart;
  product: productType;
};

export type Cart = {
  _id: string;
  products: [
    {
      productId: string;
      quantity: number;
      totalPrice: number;
      _id: string;
    }
  ];
  cartPrice: number;
  user: string;
};

export type getCartResp = {
  success: boolean;
  cart: Cart;
};
