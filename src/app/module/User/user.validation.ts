import { z } from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        email: z.string({
            required_error: "Email is required"
        }),
        role: z.enum(["ADMIN", "USER"], {
            required_error: "Role is required"
        }).optional(),
        password: z.string({
            required_error: "Password is required"
        }),
        passportNumber: z.string({
            required_error: "Passport Number is required"
        }),
        phoneNumber: z.string({
            required_error: "Phone Number is required"
        }),
        homePhoneNumber: z.string({
            required_error: "Home Phone Number is required"
        }),
        code: z.string({
            required_error: "Code is required"
        }),

    })
})

export const UserValidation = {
    createUserZodSchema
}
