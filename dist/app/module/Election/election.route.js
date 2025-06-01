"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectionRoutes = void 0;
const express_1 = require("express");
const election_controller_1 = require("./election.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(client_1.UserRole.ADMIN), election_controller_1.ElectionController.createElection);
router.get("/", election_controller_1.ElectionController.getAllElections);
exports.ElectionRoutes = router;
