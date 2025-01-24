import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Password(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center w-full max-w-sm">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder || "Enter your password"}
        value={props.value}
        onChange={props.onChange}
        className=" form-input ltr:!pr-10 rtl:!pl-10  "
        aria-label="Password"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute  ltr:right-0 rtl:left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
