export type LoginType = {
  email: string;
  password: string;
};

export const InitialLoginValues: LoginType = {
  email: '',
  password: ''
};

export enum SecurityQuestionsEnum {
  'What is your favorite color?' = 1,
  'What is your favorite food?' = 2,
  'What is your favorite movie?' = 3,
  'What is your favorite song?' = 4,
  'What is your favorite sport?' = 5,
  'What is your favorite book?' = 6,
  'What is your favorite TV show?' = 7,
  'What is your favorite vacation spot?' = 8,
  'What is your favorite animal?' = 9,
  'What is your favorite game?' = 10,
  'What is your favorite hobby?' = 11,
  'What is your favorite restaurant?' = 12
}

export type UserSecurityQuestion = {
  question: SecurityQuestionsEnum;
  answer: string;
};

export type SignUpType = {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
  question: SecurityQuestionsEnum;
  answer: string;
};

export const InitialSignUpValues: SignUpType = {
  userName: '',
  email: '',
  password: '',
  repeatPassword: '',
  answer: '',
  question: 1
};

export type PostSignUpType = {
  userName: string;
  email: string;
  password: string;
  securityQuestion: UserSecurityQuestion;
};

export const InitialUserSecurityQuestions: UserSecurityQuestion[] = [
  {
    question: SecurityQuestionsEnum['What is your favorite color?'],
    answer: ''
  }
];

export const QuestionsSelectData: [string, number][] = [
  ['What is your favorite color?', 1],
  ['What is your favorite food?', 2],
  ['What is your favorite movie?', 3],
  ['What is your favorite song?', 4],
  ['What is your favorite sport?', 5],
  ['What is your favorite book?', 6],
  ['What is your favorite TV show?', 7],
  ['What is your favorite vacation spot?', 8],
  ['What is your favorite animal?', 9],
  ['What is your favorite game?', 10],
  ['What is your favorite hobby?', 11],
  ['What is your favorite restaurant?', 12]
];
