import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Password = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center w-full">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder || "Enter your password"}
        value={props.value}
        onChange={props.onChange}
        className="form-input ltr:!pr-10 rtl:!pl-10"
        aria-label="Password"
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute end-0 top-0 h-full px-3 py-2 !w-fit hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff
            className="!w-4 !h-4 text-theme-text-main dark:text-theme-text-dark"
            aria-hidden="true"
          />
        ) : (
          <Eye
            className="!w-4 !h-4 text-theme-text-main dark:text-theme-text-dark"
            aria-hidden="true"
          />
        )}
      </Button>
    </div>
  );
});

Password.displayName = "Password";
