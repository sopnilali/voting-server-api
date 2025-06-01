import { Router } from "express";
import { VoteController } from "./vote.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/submit", auth(UserRole.USER), VoteController.submitVote);
router.get("/count", auth(UserRole.ADMIN), VoteController.getVoteCount);
router.get("/list/:electionId", auth(UserRole.USER), VoteController.getVoteByElectionId);

export const VoteRoutes = router;

