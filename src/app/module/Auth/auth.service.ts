import prisma from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import { IAuth, IAuthUser } from "./auth.interface";
import config from "../../config";
import { TokenUtils } from "../../utils/token";
import { Secret } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import status from "http-status";

const loginUserIntoDB = async (payload: IAuth) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Password is incorrect");
    }

    const JWTAuthUsers: IAuthUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const accessToken = TokenUtils.GenerateToken(JWTAuthUsers, config.jwt.jwt_access_secret as Secret, config.jwt.jwt_access_expires_in);
    const refreshToken = TokenUtils.GenerateToken(JWTAuthUsers, config.jwt.jwt_refresh_secret as Secret, config.jwt.jwt_refresh_expires_in);

    return {
        accessToken,
        refreshToken,
    }

}

const refreshTokenIntoDB = async (token: string) => {
    const decoded = TokenUtils.VerifyToken(token, config.jwt.jwt_refresh_secret as Secret);
    const user = await prisma.user.findUnique({
        where: {
            id: (decoded as IAuthUser).id
        }
    })
    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    
    const JWTAuthUsers: IAuthUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const accessToken = TokenUtils.GenerateToken(JWTAuthUsers, config.jwt.jwt_refresh_secret as Secret, config.jwt.jwt_refresh_expires_in);
    return {
        accessToken
    }
}
export const AuthService = {
    loginUserIntoDB,
    refreshTokenIntoDB
}