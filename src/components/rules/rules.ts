import { Gender, ReservationStatus, RoomType } from "@/api/enums/enums";
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
  


    // userId: string;
    // hotel?: string;
    // check_in?: string;
    // check_out?: string;
    // reservation_status?: ReservationStatus;
    // room_type?: RoomType;
    // guests?: number;
// name?: string;   // user name
    

export const AddNewReservationSchemaForAdmin = z.object({
  userId: z.string().min(1, "User ID is required"),
  hotel_name: z.string().min(1, "Hotel name is required"),
  check_in: z.string()
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkInDate = new Date(date);
        return checkInDate > today;
      },
      { message: "Check in date must be in the future" }
    ),
  check_out: z.string()
    .refine(
      (date) => {
        return Boolean(date); // Ensures the date is not empty
      },
      { message: "Check out date is required" }
    ),
  reservation_status: z.nativeEnum(ReservationStatus),
  room_type: z.nativeEnum(RoomType),
  guests: z.number().min(1, "At least one guest is required").max(10, "Maximum 10 guests allowed"),
  name: z.string().min(3, "Guest name must be at least 3 characters"),
}).refine(
  (data) => {
    const checkIn = new Date(data.check_in);
    const checkOut = new Date(data.check_out);
    return checkOut > new Date(checkIn.getTime() + 24 * 60 * 60 * 1000);
  },
  {
    message: "Check-out must be at least one day after check-in",
    path: ["check_out"], 
  }
);
export const AddNewReservationSchemaForUser = z.object({
  userId: z.string().min(1, "User ID is required"),
  hotel_name: z.string().min(1, "Hotel name is required"),
  check_in: z.string()
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkInDate = new Date(date);
        return checkInDate > today;
      },
      { message: "Check in date must be in the future" }
    ),
  check_out: z.string()
    .refine(
      (date) => {
        return Boolean(date); // Ensures the date is not empty
      },
      { message: "Check out date is required" }
    ),
  reservation_status: z.nativeEnum(ReservationStatus),
  room_type: z.nativeEnum(RoomType),
  guests: z.number().min(1, "At least one guest is required").max(10, "Maximum 10 guests allowed"),
  name: z.string().min(3, "Guest name must be at least 3 characters"),
}).refine(
  (data) => {
    const checkIn = new Date(data.check_in);
    const checkOut = new Date(data.check_out);
    return checkOut > new Date(checkIn.getTime() + 24 * 60 * 60 * 1000);
  },
  {
    message: "Check-out must be at least one day after check-in",
    path: ["check_out"], 
  }
);


  export type UserModel = z.infer<typeof userSchema>;