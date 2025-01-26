// lib imports
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { secureStorage } from "@/utils/secure-storage";
import { useNavigate } from "react-router-dom";

// api imports
import { updateUser } from "@/api/routes/user";

// ui imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/extend/password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// assets import
import { Loader2 } from "lucide-react";

// hooks import

// rules import
import { EditProfileSchema } from "@/components/rules/rules";

// login components
import SignUpFooter from "@/pages/signUp/components/signup-footer";
import React, { useState } from "react";

// Add import for PhoneInput
import { PhoneInput } from "@/components/ui/extend/phone-number";

// constants import
import { COUNTRIES } from "@/lib/constants/countries";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Gender } from "@/api/enums/enums";
import { User, UserUpdateDto } from "@/api/types/user";

type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

const EditProfile = () => {
  // Remove useState hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedCode, setSelectedCode] = useState<string>("+20");

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
  });

  // Add form hook
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      phone_number: user?.phone_number || "",
      address_city: user?.address_city || "",
      address_country: user?.address_country || "",
      gender: user?.gender || Gender.MALE,
    },
  });

  const editProfileMutation = useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: (data: UserUpdateDto) => updateUser(user?.id || "", data),
    onSuccess: (data) => {
      secureStorage.set(data);
      toast({
        description: "Profile updated successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });

      navigate("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title:
          "Something went wrong please try again or check your internet connection",
        description: error.message,
      });
    },
  });

  // Update handle login
  const onSubmit = (data: EditProfileFormValues) => {
    const payload: UserUpdateDto = {};

    if (data.name !== user?.name && data.name !== "") payload.name = data.name;
    if (data.email !== user?.email && data.email !== "")
      payload.email = data.email;
    if (data.phone_number !== user?.phone_number && data.phone_number !== "")
      payload.phone_number = `${selectedCode}${data.phone_number}`;
    if (data.address_city !== user?.address_city && data.address_city !== "")
      payload.address_city = data.address_city;
    if (
      data.address_country !== user?.address_country &&
      data.address_country !== ""
    )
      payload.address_country = data.address_country;
    if (data.gender !== user?.gender) payload.gender = data.gender;
    if (data.password !== user?.password && data.password !== "")
      payload.password = data.password;

    if (Object.keys(payload).length > 0) {
      editProfileMutation.mutate(payload);
    }
  };

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: "",
        phone_number: user.phone_number,
        address_city: user.address_city,
        address_country: user.address_country,
        gender: user.gender,
      });
    }
  }, [user, form]);

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-theme-background-secondary dark:bg-theme-background-dark py-5">
      <div className="flex sm:w-[90%] w-[95%] max-w-[800px] px-[32px] flex-col items-start gap-8 pt-8 pb-[32px] rounded-2xl bg-theme-background-main dark:bg-theme-background-dark border border-theme-border-main dark:border-theme-border-dark">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          {/* <img src={Logo} alt="logo" className="size-14" /> */}

          <div className="flex flex-col gap-2 items-center justify-center">
            <h2 className="text-2xl lg:text-[32px] font-bold text-theme-text-title dark:text-theme-text-dark">
              Profile
            </h2>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6 items-start mt-4"
            >
              <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label
                        htmlFor="name"
                        className="text-theme-inputField-label"
                      >
                        Name
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <Input
                          id="name"
                          className="form-input rtl:pl-16"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label
                        htmlFor="email"
                        className="text-theme-inputField-label"
                      >
                        Email
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          className="form-input rtl:pl-16"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                {/* phone number */}
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label
                        htmlFor="phone_number"
                        className="text-theme-inputField-label"
                      >
                        Phone number
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <PhoneInput
                          field={field}
                          onCodeChange={(value) => {
                            const country = COUNTRIES.find(
                              (c) => c.code === value
                            );
                            setSelectedCode(country?.dial || "+20");
                          }}
                          defaultCountry="EG"
                          placeholder="Enter your Phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label
                        htmlFor="password"
                        className="text-theme-inputField-label"
                      >
                        Password
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <Password
                          id="password"
                          className="form-input"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex max-md:flex-col gap-4 items-center justify-start w-full">
                {/* gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full md:basis-1/2">
                      <Label
                        htmlFor="gender"
                        className="text-theme-inputField-label"
                      >
                        Gender
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                            <SelectItem value={Gender.FEMALE}>
                              Female
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                {/* address city */}
                <FormField
                  control={form.control}
                  name="address_city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label
                        htmlFor="address_city"
                        className="text-theme-inputField-label"
                      >
                        Address city
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <Input
                          id="address_city"
                          className="form-input rtl:pl-16"
                          placeholder="Enter your address city"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* address country */}
                <FormField
                  control={form.control}
                  name="address_country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label
                        htmlFor="address_country"
                        className="text-theme-inputField-label"
                      >
                        Address country
                        <span className="text-theme-inputField-error mx-1">
                          *
                        </span>
                      </Label>
                      <FormControl>
                        <Input
                          id="address_country"
                          className="form-input rtl:pl-16"
                          placeholder="Enter your address country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sign Up Button */}
              <Button
                disabled={editProfileMutation.isPending}
                type="submit"
                className="w-full h-[56px] font-medium text-base flex items-center gap-2"
                variant="default"
              >
                Save
                {editProfileMutation.isPending && (
                  <Loader2 className="size-4 animate-spin -mb-1" />
                )}
              </Button>
            </form>
          </Form>

          <SignUpFooter />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
