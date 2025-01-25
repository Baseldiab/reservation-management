import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { COUNTRIES } from "@/lib/constants/countries";

interface PhoneInputProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  onCodeChange: (value: string) => void;
  defaultCountry?: string;
  placeholder?: string;
}

export function PhoneInput<T extends FieldValues>({
  field,
  onCodeChange,
  defaultCountry = "EG",
  placeholder = "Enter your Phone number",
}: PhoneInputProps<T>) {
  return (
    <div className="w-full relative">
      <Input
        {...field}
        id="phone_number"
        className="form-input ps-24"
        placeholder={placeholder}
      />

      <div className="absolute flex items-center gap-2 top-[7px] start-3">
        <Select
          defaultValue={defaultCountry}
          onValueChange={(value) => onCodeChange(value)}
        >
          <SelectTrigger className="border-0 p-0 focus:ring-0 shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-theme-text-title" dir="ltr">
                  {country.code}
                </span>
                <span className="text-theme-text-title" dir="ltr">
                  {country.dial}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-[1px] h-[25px] bg-theme-separating-separator" />
      </div>
    </div>
  );
}
