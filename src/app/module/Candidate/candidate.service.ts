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
export const CandidateService = {
    createCandidateIntoDB,
    getAllCandidates,
    getCandidateByElectionId
}

