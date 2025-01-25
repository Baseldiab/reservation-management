import { Gender } from "@/api/enums/enums";
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
  

  export const userSchema = z.object({
    name: z.string().min(3, "Name is required"),
    phone: z.string().regex(/^\d{11}$/, "Invalid phone number format"),
    email: z.string().email("Invalid email address"),
   
  });


  export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(
        /[A-Za-z\u0600-\u06FF]/,
        "Password must contain at least one letter"
      )
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@&'"*%$]/,
        "Password must contain at least one special character like @&'\"*%$"
      ),
  });

  // name?: string,
  // avatar?: string,
  //                            // male or female
  // address_city?: string,
  // address_country?: string,
  // user_type?: UserType,                           // admin or user
  // email?: string,
  // phone_number?: string,
  // password?: string

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be more than 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  address_city: z.string().min(3, "First Name must be more than 3 characters"),
  address_country: z.string().min(3, "First Name must be more than 3 characters"),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
  phone_number: z.string().regex(/^\d{11}$/, "Invalid phone number format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(
        /[A-Za-z\u0600-\u06FF]/,
        "Password must contain at least one letter"
      )
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@&'"*%$]/,
        "Password must contain at least one special character like @&'\"*%$"
      ),
  });

  export type UserModel = z.infer<typeof userSchema>;