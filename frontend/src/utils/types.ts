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
