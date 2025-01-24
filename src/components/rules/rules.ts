import { z } from "zod";

export const paySchema = z.object({
    firstName: z.string().min(3, "First Name must be more than 3 characters"),
    lastName: z.string().min(3, "Last Name must be more than 3 characters"),
    address: z.string().min(3, "Address must be more than 3 characters"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code format"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number format"),
    governorate: z.string().min(1, "Governorate is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    paymentMethod: z.enum(["paypal", "amazon", "venmo", "cash", "credit"]).refine((val) => val, {
        message: "Payment method is required",
      })
});
  

export const loginSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be more than 3 characters",
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        "Password must be at least 8 characters long and include a letter, a number, and a special character"
      ),
  });

  export const userSchema = z.object({
    name: z.string().min(3, "Name is required"),
    phone: z.string().regex(/^\d{11}$/, "Invalid phone number format"),
    email: z.string().email("Invalid email address"),
   
  });
  
  export type UserModel = z.infer<typeof userSchema>;