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
exports.VoterService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const createVoterIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: req.user.id
        }
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isVoterExist = yield prisma_1.default.voterProfile.findFirst({
        where: {
            nationalId: req.body.nationalId
        }
    });
    if (isVoterExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Voter already exists");
    }
    const result = yield prisma_1.default.voterProfile.create({
        data: {
            user: { connect: { id: req.user.id } },
            dateOfBirth: new Date(req.body.dateOfBirth),
            nationalId: req.body.nationalId,
            isRegistered: false
        }
    });
    return result;
});
const getAllVoters = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.voterProfile.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
    return result;
});
const updateVoterStatus = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.voterProfile.update({
        where: {
            id: req.params.id
        },
        data: {
            isRegistered: true
        }
    });
    return result;
});
const deleteVoter = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.voterProfile.delete({
        where: { id: req.params.id }
    });
    return result;
});
exports.VoterService = {
    createVoterIntoDB,
    getAllVoters,
    updateVoterStatus,
    deleteVoter
};
