// lib imports
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { secureStorage } from "@/utils/secure-storage";

// api imports
import { signUp } from "@/api/routes/user";

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
import MainLogoIcon from "@/components/icons/MainLogoIcon";

// hooks import
import { useTheme } from "@/components/provideres/theme-provider";

// rules import
import { signUpSchema } from "@/components/rules/rules";

// login components
import SignUpFooter from "@/pages/signUp/components/signup-footer";
import { useState } from "react";

// Add import for PhoneInput
import { PhoneInput } from "@/components/ui/extend/phone-number";

// constants import
import { COUNTRIES } from "@/lib/constants/countries";

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const { theme } = useTheme();
  // Remove useState hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedCode, setSelectedCode] = useState<string>("+20");

  // Add form hook
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpMutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: SignUpFormValues) =>
      signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        phone_number: `${selectedCode}${data.phone_number}`,
        address_city: data.address_city,
        address_country: data.address_country,
      }),
    onSuccess: (data) => {
      secureStorage.set(data);
      toast({
        description: "successfully signed up",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
  const onSubmit = (data: SignUpFormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-theme-background-secondary">
      <div className="flex sm:w-[90%] w-[95%] max-w-[800px] px-[32px] flex-col items-start gap-8 pt-8 pb-[32px] rounded-2xl bg-theme-background-main dark:bg-theme-background-dark border border-theme-border-main dark:border-theme-border-dark">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          {/* <img src={Logo} alt="logo" className="size-14" /> */}

          {theme === "light" ? (
            <MainLogoIcon fill="#000" className="md:w-48 w-40" />
          ) : (
            <MainLogoIcon fill="#fff" className="md:w-48 w-40" />
          )}
          <div className="flex flex-col gap-2 items-center justify-center">
            <h2 className="text-2xl lg:text-[32px] font-bold text-theme-text-title">
              Sign up
            </h2>
            <p className="text-theme-text-subtitle text-center">
              Please enter your details to get started
            </p>
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

              {/* Sign Up Button */}
              <Button
                disabled={signUpMutation.isPending}
                type="submit"
                className="w-full h-[56px] font-medium text-base flex items-center gap-2"
                variant="default"
              >
                Sign Up
                {signUpMutation.isPending && (
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

export default SignUpPage;
