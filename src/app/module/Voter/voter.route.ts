
import { Router } from "express";
import { VoterController } from "./voter.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";
import { VoterValidation } from "./voter.validation";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post("/register", auth(UserRole.USER, UserRole.ADMIN), validateRequest(VoterValidation.createVoterZodSchema), VoterController.createVoterIntoDB);
router.get("/", auth(UserRole.ADMIN), VoterController.getAllVoters);
router.patch("/:id", auth(UserRole.ADMIN), VoterController.updateVoterStatus);

export const VoterRoutes = router;
