export type CreateUserParams = {
  userName: string;
  password: string;
  email: string;
  securityQuestions: [{ question: number; answer: string }];
};

export type CreateUserSucess = {
  statusCode: 201;
  message: 'User created successfully.';
  description: {
    id: string;
    userName: string;
    email: string;
  };
};
