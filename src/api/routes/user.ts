import { UserDto } from "@/api/types/UserDto";
import { request } from "@/api/request";
import { User, UsersParams } from "@/api/types/user";
import { UserUpdateDto } from "../types/UserUpdateDto";

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

// POST create user
export const createUser = async (
    data: UserDto
  ): Promise<User> => {
    return request({
      url: "users",
      method: "post",
      data,
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