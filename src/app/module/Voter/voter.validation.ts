import { z } from "zod";

const createVoterZodSchema = z.object({
    body: z.object({
        nationalId: z.string(),
        dateOfBirth: z.string(),
    })
})

export const VoterValidation = {
    createVoterZodSchema
}
