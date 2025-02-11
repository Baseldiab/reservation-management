import { request } from "@/api/request";

// types imports
import { GetProfileSchema, User, UserDto, UsersParams, UserUpdateDto } from "@/api/types/user";

// enums imports
import { UserType } from "@/api/enums/enums";

// lib imports
import { formatDate } from "@/lib/utils";

// POST create user
export const getAllUsers = async (
    params?: UsersParams
  ): Promise< User[] > => {
    return request({
      url: "users",
      method: "get",
      params,
    });
  };

export const login = async (
    params: GetProfileSchema
  ): Promise< User[] > => {
    return request({
      url: "users",
      method: "get",
      params,
    });
  };

export const getCurrentProfile = async (
    params: GetProfileSchema
  ): Promise< User[] > => {
    return request({
      url: "users",
      method: "get",
      params,
    });
  };
export const getUserById = async (
    id: number | string,
  ): Promise< User> => {
    return request({
      url: `users/${id}`,
      method: "get",
    });
  };

// POST create user
export const signUp = async (
    data: UserDto
  ): Promise<User> => {
    return request({
      url: "users",
      method: "post",
      data: {
        ...data,
        created_at: formatDate(new Date().toISOString()),
        user_type: UserType.USER
      },
    });
  };

// PUT update user
export const updateUser = async (
    id: number | string,
    data: UserUpdateDto
  ): Promise<User> => {
    return request({
      url: `users/${id}`,
      method: "put",
      data,
    });
  };

// delete user
export const deleteUser = async (
    id: number | string,
  ): Promise<void> => {
    return request({
      url: `users/${id}`,
      method: "delete",
    });
  };