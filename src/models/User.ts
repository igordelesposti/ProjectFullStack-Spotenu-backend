export enum UserType {
  USER_FREE = "user_free",
  USER_PREMIUM = "user_premium",
  BAND = "band",
  ADMIN = "admin",
}

export interface User {
  id: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
}

export interface signUpDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
}

export interface loginDTO{
  email: string;
  password: string;
}