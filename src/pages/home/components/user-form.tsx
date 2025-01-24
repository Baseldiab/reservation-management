import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";

// hook form imports
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// zod imports
import { zodResolver } from "@hookform/resolvers/zod";

// ui imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// api imports
import { UserUpdateDto } from "@/api/types/UserUpdateDto";
import { UserDto } from "@/api/types/UserDto";
import { User } from "@/api/types/user";
import { userSchema } from "@/components/rules/rules";
import { createUser, updateUser } from "@/api/routes/user";
import { Loader2 } from "lucide-react";

export default function UserForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: item } = useQuery<User | null>({
    queryKey: ["user-item"],
  });

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: item?.name ?? "",
      phone: item?.phone ?? "",
      email: item?.email ?? "",
    },
  });

  useEffect(() => {
    if (item) {
      form.setValue("name", item.name);
      form.setValue("phone", item.phone);
      form.setValue("email", item.email);
    }
  }, [item, form]);

  // Add User mutation
  const addUserMutation = useMutation({
    mutationFn: (data: UserDto) => createUser(data),
    onSuccess: (data: User) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (oldData) {
          return [...oldData, data];
        }
        return [data];
      });
      form.reset();
      resetItem();
      toast({
        title: "User added successfully",
        description: "The user has been added to the database",
        variant: "success",
      });
    },
    onError: (error: string) => {
      toast({
        title: "Error adding user",
        description: error ?? "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Update User mutation
  const updateUserMutation = useMutation({
    mutationFn: (data: UserUpdateDto) => updateUser(data.id, data),
    onSuccess: (data: User) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (oldData) {
          return oldData.map((user) =>
            user.id === data.id ? { ...user, ...data } : user
          );
        }
        return [data];
      });
      form.reset();
      resetItem();
      toast({
        title: "User updated successfully",
        variant: "success",
      });
    },
    onError: (error: string) => {
      toast({
        title: "Error updating user",
        description: error ?? "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: UserDto) => {
    if (item) {
      const payload: UserUpdateDto = {
        id: item?.id,
      };
      if (data.name !== item.name) payload.name = data.name;
      if (data.phone !== item.phone) payload.phone = data.phone;
      if (data.email !== item.email) payload.email = data.email;

      if (Object.keys(payload).length > 1) {
        updateUserMutation.mutate(payload);
      }
    } else {
      addUserMutation.mutate(data);
    }
  };

  const onCancel = () => {
    form.reset();
    resetItem();
  };

  const resetItem = () => {
    queryClient.setQueryData(["user-item"], null);
  };

  return (
    <section className="w-full bg-transparent  md:p-6 py-2 flex flex-col gap-6 container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-lg:flex-col gap-4"
        >
          <div className="flex-grow my-5 grid sm:grid-cols-2 grid-cols-1 gap-4 mb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex max-sm:flex-col lg:flex-col justify-center gap-4 max-sm:w-full">
            <Button
              type="submit"
              disabled={
                addUserMutation.isPending || updateUserMutation.isPending
              }
              className="!h-[44px] lg:w-[170px] bg-blue-500 hover:bg-blue-600 dark:bg-white dark:hover:bg-white/50 w-full flex items-center justify-center"
            >
              Save
              {(addUserMutation.isPending || updateUserMutation.isPending) && (
                <Loader2 className="size-4 animate-spin" />
              )}
            </Button>
            <Button
              type="button"
              disabled={
                addUserMutation.isPending || updateUserMutation.isPending
              }
              variant="outline"
              onClick={onCancel}
              className="lg:w-[170px] !h-[44px] w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
