// lib imports
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { secureStorage } from "@/utils/secure-storage";

// api imports
import { login } from "@/api/routes/user";

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
import { useTheme } from "@/components/provideres/theme-provider";

// rules import
import { loginSchema } from "@/components/rules/rules";

// login components
import LoginFooter from "@/pages/login/components/login-footer";

type LoginFormValues = z.infer<typeof loginSchema>;

const SignUpPage = () => {
  const { theme } = useTheme();
  // Remove useState hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add form hook
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormValues) =>
      login({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data) => {
      secureStorage.set(data[0]);
      toast({
        description: "successfully logged in",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Your Email or password is incorrect",
        description: error.message,
      });
    },
  });

  // Update handle login
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-theme-background-secondary">
      <div className="flex w-[448px] max-w-md px-[32px] flex-col items-start gap-8 pt-8 pb-[32px] rounded-2xl bg-theme-background-main dark:bg-theme-background-dark border border-theme-border-main dark:border-theme-border-dark">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          {/* <img src={Logo} alt="logo" className="size-14" /> */}

          {theme === "light" ? (
            <MainLogoIcon fill="#000" className="md:w-48 w-40" />
          ) : (
            <MainLogoIcon fill="#fff" className="md:w-48 w-40" />
          )}
          <div className="flex flex-col gap-2 items-center justify-center">
            <h2 className="text-2xl lg:text-[32px] font-bold text-theme-text-title">
              Login
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

              {/* Login Button */}
              <Button
                disabled={loginMutation.isPending}
                type="submit"
                className="w-full h-[56px] font-medium text-base flex items-center gap-2"
                variant="default"
              >
                Login
                {loginMutation.isPending && (
                  <Loader2 className="size-4 animate-spin -mb-1" />
                )}
              </Button>
            </form>
          </Form>

          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
