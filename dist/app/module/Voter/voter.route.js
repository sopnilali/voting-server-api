"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoterRoutes = void 0;
const express_1 = require("express");
const voter_controller_1 = require("./voter.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const voter_validation_1 = require("./voter.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = (0, express_1.Router)();
router.post("/register", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(voter_validation_1.VoterValidation.createVoterZodSchema), voter_controller_1.VoterController.createVoterIntoDB);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), voter_controller_1.VoterController.getAllVoters);
exports.VoterRoutes = router;
