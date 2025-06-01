"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_1 = require("http-status");
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.createUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User created successfully",
        statusCode: http_status_1.status.CREATED,
        data: result
    });
}));
const getAllUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getUserFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Users fetched successfully",
        statusCode: http_status_1.status.OK,
        data: result
    });
}));
exports.UserController = {
    createUser,
    getAllUser
};
