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
  description?: string;
  isApproved: boolean;
}

export interface UserAdministrator {
  id: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
  isApproved: boolean;
}

export interface Band {
  id: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
  description: string;
  isApproved: boolean;
}

export interface signUpDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
}

export interface signUpBandDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
  description: string;
  isApproved: boolean;
  
}

export interface signUpAdministratorDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  type: string;
  isApproved: boolean;
}

export interface loginDTO{
  email: string;
  password: string;
  type: string;
  
}