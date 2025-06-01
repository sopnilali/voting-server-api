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
exports.CandidateController = void 0;
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const candidate_service_1 = require("./candidate.service");
const http_status_1 = __importDefault(require("http-status"));
const createCandidate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield candidate_service_1.CandidateService.createCandidateIntoDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Candidate created successfully",
        data: result
    });
}));
const getAllCandidates = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield candidate_service_1.CandidateService.getAllCandidates();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Candidates fetched successfully",
        data: result
    });
}));
const getCandidateByElectionId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { electionId } = req.params;
    const result = yield candidate_service_1.CandidateService.getCandidateByElectionId(electionId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Candidates fetched successfully",
        data: result
    });
}));
exports.CandidateController = {
    createCandidate,
    getAllCandidates,
    getCandidateByElectionId
};
