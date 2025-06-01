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
exports.CandidateService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const createCandidateIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const election = yield prisma_1.default.election.findUnique({ where: { id: req.body.electionId } });
    if (!election) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Election not found");
    }
    const result = yield prisma_1.default.candidate.create({
        data: {
            name: req.body.name,
            party: req.body.party,
            age: req.body.age,
            gender: req.body.gender,
            education: req.body.education,
            election: { connect: { id: req.body.electionId } }
        }
    });
    return result;
});
const getAllCandidates = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.candidate.findMany({
        include: {
            election: true
        }
    });
    return result;
});
const getCandidateByElectionId = (electionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.candidate.findMany({
        where: {
            electionId
        }
    });
    return result;
});
const updateCandidateIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.candidate.update({
        where: { id: req.params.id },
        data: req.body
    });
    return result;
});
const deleteCandidate = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateId = req.params.id;
    // First check if candidate exists
    const candidate = yield prisma_1.default.candidate.findUnique({
        where: { id: candidateId }
    });
    if (!candidate) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate not found");
    }
    // Use transaction to handle all deletions
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // First delete all votes associated with this candidate
        yield tx.vote.deleteMany({
            where: {
                candidateId: candidateId
            }
        });
        // Then delete the candidate
        return yield tx.candidate.delete({
            where: { id: candidateId }
        });
    }));
    return result;
});
exports.CandidateService = {
    createCandidateIntoDB,
    getAllCandidates,
    getCandidateByElectionId,
    updateCandidateIntoDB,
    deleteCandidate
};
