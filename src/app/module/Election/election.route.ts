import { Router } from "express";
import { ElectionController } from "./election.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";

const router = Router();

router.post("/create", auth(UserRole.ADMIN), ElectionController.createElection);
router.get("/", ElectionController.getAllElections);

export const ElectionRoutes = router;
