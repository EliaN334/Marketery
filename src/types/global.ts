export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserProvider {
  GITHUB = 'GITHUB',
  DEFAULT = 'DEFAULT',
}

export type RequestBodyData = {
  products: {
    price_id: string;
    quantity: number;
  }[];
  account_id: string;
};
