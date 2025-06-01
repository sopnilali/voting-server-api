"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.getAllUser);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.updateUser);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
