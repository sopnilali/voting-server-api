import prisma from "../../utils/prisma"
import * as bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import AppError from "../../errors/AppError";
import status from "http-status";

const createUserIntoDB = async (payload: IUser) => {

    const isUserExist = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (isUserExist) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        }
    })
    return result;
}

const getUserFromDB = async () => {
    const result = await prisma.user.findMany({
        include: {
            voterProfile: true
        }
    })
    return result;
}

const updateUser = async (req: any) => {
    const result = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            ...req.body
        }
    })
    return result;
}

const deleteUser = async (req: any) => {
    const userId = req.params.id;

    // First check if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { voterProfile: true }
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    // Use transaction to handle all deletions
    const result = await prisma.$transaction(async (tx) => {
        if (user.voterProfile) {
            // First delete all votes associated with this voter profile
            await tx.vote.deleteMany({
                where: {
                    voterId: user.voterProfile.id
                }
            });

            // Then delete the voter profile
            await tx.voterProfile.delete({
                where: { id: user.voterProfile.id }
            });
        }

        // Finally delete the user
        return await tx.user.delete({
            where: { id: userId }
        });
    });

    return result;
}

export const UserService = {
    createUserIntoDB,
    getUserFromDB,
    updateUser,
    deleteUser
}