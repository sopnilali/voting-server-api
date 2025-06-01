import { IAuth } from "./auth.interface";

import { catchAsync } from "../../helper/catchAsync";
import config from "../../config";
import sendResponse from "../../helper/sendResponse";
import { AuthService } from "./auth.service";

import { status } from "http-status";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUserIntoDB(req.body as IAuth);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    sendResponse(res, {
        success: true,
        message: "User logged in successfully",
        statusCode: status.OK,
        data: {
            accessToken: result.accessToken,
        },
    })
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return sendResponse(res, {
            success: false,
            message: "Refresh token not found",
            statusCode: status.UNAUTHORIZED,
        })
    }
    const result = await AuthService.refreshTokenIntoDB(refreshToken);
    res.cookie("refreshToken", result.accessToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    sendResponse(res, {
        success: true,
        message: "Access token is retrieved succesfully!",
        statusCode: status.OK,
        data: {
            accessToken: result.accessToken,
        },
    })
})

export const AuthController = {
    loginUser,
    refreshToken
}