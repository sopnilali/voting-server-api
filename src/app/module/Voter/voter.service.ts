import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma"
import { IVoter } from "./voter.interface"
import status from "http-status";

const createVoterIntoDB = async (req: any) => {

    const isUserExist = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, "User not found", );
    }


    const isVoterExist = await prisma.voterProfile.findFirst({
        where: {
            nationalId: req.body.nationalId
        }
    })

    if (isVoterExist) {
        throw new AppError(status.BAD_REQUEST,"Voter already exists");
    }

    const result = await prisma.voterProfile.create({
        data: {
            user: {connect: {id: req.user.id}},
            dateOfBirth: new Date(req.body.dateOfBirth),
            nationalId: req.body.nationalId,
            isRegistered: false
        }
    })
    return result;
}

const getAllVoters = async () => {
    const result = await prisma.voterProfile.findMany({
        include: {
            user: {
                select: {
                    voterProfile: true
                }
            }
        }
    })
    return result;
}

const updateVoterStatus = async (req: any) => {
    const result = await prisma.voterProfile.update({
        where: {
            id: req.params.id
        },
        data: {
            isRegistered: true
        }
    })
    return result;
}


export const VoterService = {
    createVoterIntoDB,
    getAllVoters,
    updateVoterStatus
}