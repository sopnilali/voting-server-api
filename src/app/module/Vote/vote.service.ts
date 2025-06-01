import { ElectionStatus } from "@prisma/client";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import status from "http-status";


const submitVote = async (req: any) => {
    // First get the voter profile using userId
    const voterProfile = await prisma.voterProfile.findFirst({
        where: {
            userId: req.body.voterId
        }
    });

    if (!voterProfile) {
        throw new AppError(status.NOT_FOUND, "Voter profile not found");
    }

    const isCandidateExist = await prisma.candidate.findUnique({
        where: {
            id: req.body.candidateId
        }
    });

    if (!isCandidateExist) {
        throw new AppError(status.NOT_FOUND, "Candidate not found");
    }

    const isElectionExist = await prisma.election.findUnique({
        where: {
            status: {
                not: ElectionStatus.COMPLETED
            },
            id: req.body.electionId
        }
    });

    if (!isElectionExist) {
        throw new AppError(status.NOT_FOUND, "Election not found or already completed");
    }

    const now = new Date();

    if (now < isElectionExist.startDate || now > isElectionExist.endDate) {
        throw new AppError(status.FORBIDDEN, "Voting is not open for this election");
    }

    const existingVote = await prisma.vote.findUnique({
        where: { 
            voterId_electionId: { 
                voterId: voterProfile.id, 
                electionId: req.body.electionId 
            } 
        },
    });

    if (existingVote) {
        throw new AppError(status.BAD_REQUEST, "You have already voted in this election");
    }

    const vote = await prisma.vote.create({
        data: {
            voter: { connect: { id: voterProfile.id } },
            candidate: { connect: { id: req.body.candidateId } },
            election: { connect: { id: req.body.electionId } },
        },
    });

    return vote;
}

const getVoteCount = async (req: any) => {
    const voteCount = await prisma.vote.groupBy({
        by: ["candidateId", "electionId"],
        _count: true
    });

    // Get election details
    const electionDetails = await prisma.election.findMany({
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
    const result = voteCount.map(vote => ({
        ...vote,
        electionName: electionDetails.find(election => election.id === vote.electionId)?.title
    }));

    return result;
}

const getVoteBycandidateId = async (req: any) => {
    const vote = await prisma.vote.findMany({
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
    })
    return vote;
}

const getVotingStats = async (req: any) => {
    // Get all elections with their status
    const elections = await prisma.election.findMany({
        select: {
            id: true,
            title: true,
            status: true,
            startDate: true,
            endDate: true
        }
    });

    // Get total number of registered voters
    const totalVoters = await prisma.voterProfile.count({
        where: {
            isRegistered: true
        }
    });

    // Get vote counts for each election
    const electionStats = await Promise.all(elections.map(async (election) => {
        const votesCast = await prisma.vote.count({
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
    }));

    // Get overall statistics
    const totalVotes = await prisma.vote.count();
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
}

export const VoteService = {
    submitVote,
    getVoteCount,
    getVoteBycandidateId,
    getVotingStats
}

