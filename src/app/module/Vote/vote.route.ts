import { Router } from "express";
import { VoteController } from "./vote.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/submit", auth(UserRole.USER), VoteController.submitVote);
router.get("/count", auth(UserRole.ADMIN), VoteController.getVoteCount);
router.get("/list/:candidateId", auth(UserRole.USER), VoteController.getVoteByCandidateId);
router.get("/stats", auth(UserRole.USER, UserRole.ADMIN), VoteController.getVotingStats);

export const VoteRoutes = router;

