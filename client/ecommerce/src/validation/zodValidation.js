import z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
})

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .string()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
        .string()
        .min(6, "Confirm password is required"),

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });


export const productSchema = z.object({
    name: z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .max(250, "Product name cannot exceed 250 characters"),

    price: z
        .string()
        .min(1, "Price is required")
        .refine(
            (value) => /^\d+(\.\d{1,2})?$/.test(value),
            {
                message: "Price must be a valid decimal number"
            }
        ),

    stock: z
        .string()
        .min(1, "Stock is required")
        .refine(
            (value) => Number.isInteger(Number(value)) && Number(value) >= 0,
            {
                message: "Stock must be a positive integer"
            }
        ),

    categoryId: z
        .string()
        .uuid("UUID is invalid"),

    description: z
        .string()
        .min(2, "Description must be at least 2 characters")
        .max(500, "Description cannot exceed 500 characters"),

    images: z
        .array(z.any())
        .optional()
});


export const checkoutSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    phone: z
        .string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .regex(/^[0-9]+$/, "Phone number must contain only numbers"),

    address: z
        .string()
        .min(5, "Address is required"),

    city: z
        .string()
        .min(2, "City is required"),

    state: z
        .string()
        .min(2, "State is required"),

    postalCode: z
        .string()
        .min(4, "ZIP Code is required"),

    country: z
        .string()
        .min(2, "Country is required"),

    paymentMethod: z.enum(
        [
            "Credit / Debit Card",
            "UPI Payment",
            "Cash on Delivery"
        ],
        {
            errorMap: () => ({
                message: "Please select a payment method"
            })
        }
    )
});