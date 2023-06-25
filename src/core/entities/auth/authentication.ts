export type AuthenticationParams = {
  email: string;
  password: string;
};

export type AuthenticationSucess = {
  access_token: string;
  refresh_token: string;
  email: string;
  userName: string;
  id: string;
};

export type AuthenticationError = {
  statusCode: number;
  message: string;
};
