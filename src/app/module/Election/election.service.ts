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
            candidates: true,
            votes: true
        }
    })
    return result;
}

const updateElectionIntoDB = async (req: any) => {
    const result = await prisma.election.update({
        where: { id: req.params.id },
        data: req.body
    })
    return result;
}

const deleteElectionIntoDB = async (req: any) => {
    const result = await prisma.election.delete({
        where: { id: req.params.id }
    })
    return result;
}
export const ElectionService = {
    createElectionIntoDB,
    getAllElections,
    updateElectionIntoDB,
    deleteElectionIntoDB
}
