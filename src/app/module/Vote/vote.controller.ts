import { catchAsync } from "../../helper/catchAsync";
import { VoteService } from "./vote.service";
import sendResponse from "../../helper/sendResponse";
import status from "http-status";
import { Request, Response } from "express";

const submitVote = catchAsync(async (req, res) => {
    const result = await VoteService.submitVote(req);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Vote submitted successfully",
        data: result
    })
})

const getVoteCount = catchAsync(async (req, res) => {
    const result = await VoteService.getVoteCount(req);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Vote count fetched successfully",
        data: result
    })
})

const getVoteByCandidateId = catchAsync(async (req, res) => {
    const result = await VoteService.getVoteBycandidateId(req);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Vote fetched successfully",
        data: result
    })
})

const getVotingStats = catchAsync(async (req: Request, res: Response) => {
    const result = await VoteService.getVotingStats(req);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Voting statistics retrieved successfully",
        data: result
    });
});

export const VoteController = {
    submitVote,
    getVoteCount,
    getVoteByCandidateId,
    getVotingStats
}

