"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required"
        }),
        email: zod_1.z.string({
            required_error: "Email is required"
        }),
        role: zod_1.z.enum(["ADMIN", "USER"], {
            required_error: "Role is required"
        }).optional(),
        password: zod_1.z.string({
            required_error: "Password is required"
        }),
        passportNumber: zod_1.z.string({
            required_error: "Passport Number is required"
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required"
        }),
        homePhoneNumber: zod_1.z.string({
            required_error: "Home Phone Number is required"
        }),
        code: zod_1.z.string({
            required_error: "Code is required"
        }),
    })
});
exports.UserValidation = {
    createUserZodSchema
};
