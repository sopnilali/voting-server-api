import { Router } from "express";
import { ElectionController } from "./election.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";

const router = Router();

router.post("/create", auth(UserRole.ADMIN), ElectionController.createElection);
router.get("/", ElectionController.getAllElections);
router.put("/:id", auth(UserRole.ADMIN), ElectionController.updateElection);
router.delete("/:id", auth(UserRole.ADMIN), ElectionController.deleteElection);


export const ElectionRoutes = router;
