import { Gender, UserType } from "@/api/enums/enums"

export interface UsersParams {
  page?: number;
  limit?: number;
  gender?: Gender;
  address_city?: string;
  address_country?: string;
  user_type?: UserType;
  email?: string;
  phone_number?: string;
}


export interface User {
  created_at: string;
  name: string;
  avatar: string;
  gender: Gender;
  address_city: string;
  address_country: string;
  user_type: UserType;
  email: string;
  phone_number: string;
  password: string;
  id: string;
}


export interface GetProfileSchema {
  password: string;
  email: string;
}




export type UserDto = {
    created_at: string,   
    name: string,
    avatar: string,
    gender: Gender,                            // male or female
    address_city: string,
    address_country: string,
    user_type: UserType,                           // admin or user
    email: string,
    phone_number: string,
    password: string
  }
  
  export type UserUpdateDto = {
    id: number | string,
  created_at?: string,   
  name?: string,
  avatar?: string,
  gender?: Gender,                            // male or female
  address_city?: string,
  address_country?: string,
  user_type?: UserType,                           // admin or user
  email?: string,
  phone_number?: string,
  password?: string
}
