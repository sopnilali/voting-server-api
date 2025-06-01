"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRoutes = void 0;
const express_1 = require("express");
const vote_controller_1 = require("./vote.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/submit", (0, auth_1.default)(client_1.UserRole.USER), vote_controller_1.VoteController.submitVote);
router.get("/count", (0, auth_1.default)(client_1.UserRole.ADMIN), vote_controller_1.VoteController.getVoteCount);
router.get("/list/:electionId", (0, auth_1.default)(client_1.UserRole.USER), vote_controller_1.VoteController.getVoteByElectionId);
exports.VoteRoutes = router;
