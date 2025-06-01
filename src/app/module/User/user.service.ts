import prisma from "../../utils/prisma"
import * as bcrypt from "bcrypt";
import { IUser } from "./user.interface";
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

export const UserService = {
    createUserIntoDB,
    getUserFromDB
}