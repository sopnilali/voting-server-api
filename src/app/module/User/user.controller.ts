import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import { status } from "http-status";


const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUserIntoDB(req.body as IUser);
    sendResponse(res, {
        success: true,
        message: "User created successfully",
        statusCode: status.CREATED,
        data: result
    })
})

const getAllUser = catchAsync(async (req, res) => {
    const result = await UserService.getUserFromDB();
    sendResponse(res, {
        success: true,
        message: "Users fetched successfully",
        statusCode: status.OK,
        data: result
    })
})

const updateUser = catchAsync(async (req, res) => {
    const result = await UserService.updateUser(req);
    sendResponse(res, {
        success: true,
        message: "User updated successfully",
        statusCode: status.OK,
        data: result
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const result = await UserService.deleteUser(req);
    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: status.OK,
        data: result
    })
})


export const UserController = {
    createUser,
    getAllUser,
    updateUser,
    deleteUser
}
