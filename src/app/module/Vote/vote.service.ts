import { ElectionStatus } from "@prisma/client";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import status from "http-status";


const submitVote = async (req: any) => {

    const isVoterExist = await prisma.voterProfile.findUnique({
        where: {
            id: req.body.voterId
        }
    })

    if (!isVoterExist) {
        throw new AppError(status.NOT_FOUND, "Voter not found");
    }

    const isCandidateExist = await prisma.candidate.findUnique({
        where: {
            id: req.body.candidateId
        }
    })

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
    })

    if (!isElectionExist) {
        throw new AppError(status.NOT_FOUND, "Election not found or already completed");
    }
    const now = new Date();

    if (now < isElectionExist.startDate || now > isElectionExist.endDate) {
        throw new AppError(status.FORBIDDEN, "Voting is not open for this election");
    }

    const existingVote = await prisma.vote.findUnique({
        where: { voterId_electionId: { voterId: req.body.voterId, electionId: req.body.electionId } },
    });

    if (existingVote) {
        throw new AppError(status.BAD_REQUEST, "You have already voted in this election");
    }

    const vote = await prisma.vote.create({
        data: {
            voter: { connect: { id: req.body.voterId } },
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
export const VoteService = {
    submitVote,
    getVoteCount,
    getVoteBycandidateId
}

