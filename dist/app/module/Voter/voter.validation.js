"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoterValidation = void 0;
const zod_1 = require("zod");
const createVoterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        nationalId: zod_1.z.string(),
        dateOfBirth: zod_1.z.string(),
    })
});
exports.VoterValidation = {
    createVoterZodSchema
};
