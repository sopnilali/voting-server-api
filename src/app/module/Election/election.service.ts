import prisma from "../../utils/prisma";

const createElectionIntoDB = async (req: any) => {
    const result = await prisma.election.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            isActive: true
        }
    })
    return result;
}

const getAllElections = async () => {
    const result = await prisma.election.findMany({
        include: {
            candidates: true
        }
    })
}

export const ElectionService = {
    createElectionIntoDB,
    getAllElections
}
