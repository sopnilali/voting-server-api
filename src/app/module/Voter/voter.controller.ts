import { Request, Response } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { VoterService } from "./voter.service";
import sendResponse from "../../helper/sendResponse";
import status from "http-status";

const createVoterIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await VoterService.createVoterIntoDB(req);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Voter created successfully",
        data: result
    })
})

const getAllVoters = catchAsync(async (req: Request, res: Response) => {
    const result = await VoterService.getAllVoters();
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Voters fetched successfully",
        data: result
    })
})

const updateVoterStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await VoterService.updateVoterStatus(req);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Voter status updated successfully",
        data: result
    })
})

const deleteVoter = catchAsync(async (req: Request, res: Response) => {
    const result = await VoterService.deleteVoter(req);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Voter deleted successfully",
        data: result
    })
})

export const VoterController = {
    createVoterIntoDB,
    getAllVoters,
    updateVoterStatus,
    deleteVoter
}
