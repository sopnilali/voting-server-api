import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import status from "http-status";

const createCandidateIntoDB = async (req: any) => {

    const election = await prisma.election.findUnique({ where: { id: req.body.electionId } });
    if (!election) {
        throw new AppError(status.NOT_FOUND, "Election not found");
    }

    const result = await prisma.candidate.create({
        data: {
            name: req.body.name,
            party: req.body.party,
            age: req.body.age,
            gender: req.body.gender,
            education: req.body.education,
            election: {connect: {id: req.body.electionId}}
        }
    })
    return result;
}

const getAllCandidates = async () => {
    const result = await prisma.candidate.findMany({
        include: {
            election: true
        }
    })
    return result;
}

const getCandidateByElectionId = async (electionId: string) => {
    const result = await prisma.candidate.findMany({
        where: {
            electionId
        }
    })
    return result;
}

const updateCandidateIntoDB = async (req: any) => {
    const result = await prisma.candidate.update({
        where: { id: req.params.id },
        data: req.body
    })
    return result;
}

const deleteCandidate = async (req: any) => {
    const candidateId = req.params.id;

    // First check if candidate exists
    const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId }
    });

    if (!candidate) {
        throw new AppError(status.NOT_FOUND, "Candidate not found");
    }

    // Use transaction to handle all deletions
    const result = await prisma.$transaction(async (tx) => {
        // First delete all votes associated with this candidate
        await tx.vote.deleteMany({
            where: {
                candidateId: candidateId
            }
        });

        // Then delete the candidate
        return await tx.candidate.delete({
            where: { id: candidateId }
        });
    });

    return result;
}

export const CandidateService = {
    createCandidateIntoDB,
    getAllCandidates,
    getCandidateByElectionId,
    updateCandidateIntoDB,
    deleteCandidate
}

