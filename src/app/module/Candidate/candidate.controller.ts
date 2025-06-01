import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { CandidateService } from "./candidate.service";
import status from "http-status";

const createCandidate = catchAsync(async (req, res) => {
    const result = await CandidateService.createCandidateIntoDB(req);
    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Candidate created successfully",
        data: result
    })
})

const getAllCandidates = catchAsync(async (req, res) => {
    const result = await CandidateService.getAllCandidates();
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Candidates fetched successfully",
        data: result
    })
})

const getCandidateByElectionId = catchAsync(async (req, res) => {
    const { electionId } = req.params;
    const result = await CandidateService.getCandidateByElectionId(electionId);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Candidates fetched successfully",
        data: result
    })
})

export const CandidateController = {
    createCandidate,
    getAllCandidates,
    getCandidateByElectionId
}
