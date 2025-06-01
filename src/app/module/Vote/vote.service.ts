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
            id: req.body.electionId
        }
    })

    if (!isElectionExist) {
        throw new AppError(status.NOT_FOUND, "Election not found");
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
        by: ["electionId"],
        
        _count: true,
    })
    return voteCount;
}

const getVoteByElectionId = async (req: any) => {
    const vote = await prisma.vote.findMany({
        where: {
            electionId: req.params.electionId
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
    getVoteByElectionId
}

