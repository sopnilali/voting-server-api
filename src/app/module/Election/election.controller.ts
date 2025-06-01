import { Request, Response } from "express";
import { ElectionService } from "./election.service";
import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import status from "http-status";

const createElection = catchAsync(async (req, res) => {
    const result = await ElectionService.createElectionIntoDB(req);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Election created successfully",
        data: result
    })
})

const getAllElections = catchAsync(async (req, res) => {
    const result = await ElectionService.getAllElections();
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Elections fetched successfully",
        data: result
    })
})
export const ElectionController = {
    createElection, getAllElections
}
