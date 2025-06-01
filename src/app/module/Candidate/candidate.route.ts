import { Router } from "express";
import { CandidateController } from "./candidate.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/register", auth(UserRole.ADMIN), CandidateController.createCandidate);
router.get("/", CandidateController.getAllCandidates);
router.get("/list/:electionId", CandidateController.getCandidateByElectionId);

export const CandidateRoutes = router;



