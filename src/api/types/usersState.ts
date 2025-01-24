
import { UserDto } from "@/api/types/UserDto";
import { User } from "@/api/types/user";
import { UserUpdateDto } from "@/api/types/UserUpdateDto";

export type UserState = {
    usersList: User[];
    item: User | null;
    sendAddNewUser: (v: UserDto) => void;
    sendGetItem: (v: User) => void;
    resetItem: () => void;
    sendUpdateUser: (v: UserUpdateDto) => void;
    sendDeleteItem: (id: string) => void;
    resetAllUsers: () => void;
 
  }