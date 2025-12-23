import { z } from "zod";

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
});

// Admin validation schemas
export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Admin password must be at least 8 characters"),
  secret: z.string().min(1, "Admin secret is required"),
});

export const adminSignupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Admin password must be at least 8 characters"),
  secret: z.string().min(1, "Admin secret is required"),
});

// Item validation schemas
export const itemSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name must be at least 2 characters")
    .max(100, "Item name must be less than 100 characters")
    .regex(
      /^[A-Za-z0-9\s\-\.,]{2,100}$/,
      "Item name contains invalid characters"
    ),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z.enum([
    "Electronics",
    "Books",
    "Documents",
    "Accessories",
    "Clothing",
    "Other",
  ]),
  itemImage: z
    .string()
    .regex(
      /^data:image\/(png|jpeg|jpg);base64,/,
      "Invalid image format. Only PNG and JPG are allowed"
    )
    .optional()
    .nullable(),
});

export const lostItemSchema = itemSchema.extend({
  lostAt: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location must be less than 200 characters")
    .regex(
      /^[A-Za-z0-9\s\,\-\#]{3,200}$/,
      "Location contains invalid characters"
    ),
});

export const foundItemSchema = itemSchema.extend({
  foundAt: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location must be less than 200 characters")
    .regex(
      /^[A-Za-z0-9\s\,\-\#]{3,200}$/,
      "Location contains invalid characters"
    ),
});

export const userActionSchema = z.object({
  action: z.enum(["warn", "block"], {
    errorMap: () => ({ message: "Invalid action" }),
  }),
});
