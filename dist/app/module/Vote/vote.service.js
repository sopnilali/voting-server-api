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
exports.VoteService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const submitVote = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // First get the voter profile using userId
    const voterProfile = yield prisma_1.default.voterProfile.findFirst({
        where: {
            userId: req.body.voterId
        }
    });
    if (!voterProfile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Voter profile not found");
    }
    const isCandidateExist = yield prisma_1.default.candidate.findUnique({
        where: {
            id: req.body.candidateId
        }
    });
    if (!isCandidateExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate not found");
    }
    const isElectionExist = yield prisma_1.default.election.findUnique({
        where: {
            status: {
                not: client_1.ElectionStatus.COMPLETED
            },
            id: req.body.electionId
        }
    });
    if (!isElectionExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Election not found or already completed");
    }
    const now = new Date();
    if (now < isElectionExist.startDate || now > isElectionExist.endDate) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Voting is not open for this election");
    }
    const existingVote = yield prisma_1.default.vote.findUnique({
        where: {
            voterId_electionId: {
                voterId: voterProfile.id,
                electionId: req.body.electionId
            }
        },
    });
    if (existingVote) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You have already voted in this election");
    }
    const vote = yield prisma_1.default.vote.create({
        data: {
            voter: { connect: { id: voterProfile.id } },
            candidate: { connect: { id: req.body.candidateId } },
            election: { connect: { id: req.body.electionId } },
        },
    });
    return vote;
});
const getVoteCount = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const voteCount = yield prisma_1.default.vote.groupBy({
        by: ["candidateId", "electionId"],
        _count: true
    });
    // Get election details
    const electionDetails = yield prisma_1.default.election.findMany({
        where: {
            id: {
                in: voteCount.map(vote => vote.electionId)
            }
        },
        select: {
            id: true,
            title: true
        }
    });
    // Combine vote counts with election names
    const result = voteCount.map(vote => {
        var _a;
        return (Object.assign(Object.assign({}, vote), { electionName: (_a = electionDetails.find(election => election.id === vote.electionId)) === null || _a === void 0 ? void 0 : _a.title }));
    });
    return result;
});
const getVoteBycandidateId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const vote = yield prisma_1.default.vote.findMany({
        where: {
            candidateId: req.params.candidateId
        },
        include: {
            voter: {
                select: {
                    user: {
                        select: {
                            voterProfile: true
                        }
                    }
                }
            },
            candidate: true,
            election: true
        }
    });
    return vote;
});
const getVotingStats = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all elections with their status
    const elections = yield prisma_1.default.election.findMany({
        select: {
            id: true,
            title: true,
            status: true,
            startDate: true,
            endDate: true
        }
    });
    // Get total number of registered voters
    const totalVoters = yield prisma_1.default.voterProfile.count({
        where: {
            isRegistered: true
        }
    });
    // Get vote counts for each election
    const electionStats = yield Promise.all(elections.map((election) => __awaiter(void 0, void 0, void 0, function* () {
        const votesCast = yield prisma_1.default.vote.count({
            where: {
                electionId: election.id
            }
        });
        const participationRate = totalVoters > 0 ? (votesCast / totalVoters) * 100 : 0;
        return {
            electionId: election.id,
            electionTitle: election.title,
            totalVoters,
            votesCast,
            participationRate: Math.round(participationRate * 100) / 100,
            status: election.status,
            startDate: election.startDate,
            endDate: election.endDate
        };
    })));
    // Get overall statistics
    const totalVotes = yield prisma_1.default.vote.count();
    const overallParticipationRate = totalVoters > 0 ? (totalVotes / totalVoters) * 100 : 0;
    return {
        overall: {
            totalVoters,
            totalVotesCast: totalVotes,
            participationRate: Math.round(overallParticipationRate * 100) / 100,
            remainingVoters: totalVoters - totalVotes
        },
        byElection: electionStats
    };
});
exports.VoteService = {
    submitVote,
    getVoteCount,
    getVoteBycandidateId,
    getVotingStats
};
