"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRoutes = void 0;
const express_1 = require("express");
const candidate_controller_1 = require("./candidate.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/register", (0, auth_1.default)(client_1.UserRole.ADMIN), candidate_controller_1.CandidateController.createCandidate);
router.get("/", candidate_controller_1.CandidateController.getAllCandidates);
router.get("/list/:electionId", candidate_controller_1.CandidateController.getCandidateByElectionId);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), candidate_controller_1.CandidateController.updateCandidate);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), candidate_controller_1.CandidateController.deleteCandidate);
exports.CandidateRoutes = router;
