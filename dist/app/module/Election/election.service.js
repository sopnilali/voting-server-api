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
exports.ElectionService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createElectionIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.election.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            isActive: true
        }
    });
    return result;
});
const getAllElections = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.election.findMany({
        include: {
            candidates: true
        }
    });
});
exports.ElectionService = {
    createElectionIntoDB,
    getAllElections
};
