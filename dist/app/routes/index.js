"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/Auth/auth.route");
const user_route_1 = require("../module/User/user.route");
const voter_route_1 = require("../module/Voter/voter.route");
const candidate_route_1 = require("../module/Candidate/candidate.route");
const vote_route_1 = require("../module/Vote/vote.route");
const election_route_1 = require("../module/Election/election.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes
    },
    {
        path: '/voter',
        route: voter_route_1.VoterRoutes
    },
    {
        path: '/candidate',
        route: candidate_route_1.CandidateRoutes
    },
    {
        path: '/election',
        route: election_route_1.ElectionRoutes
    },
    {
        path: '/vote',
        route: vote_route_1.VoteRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
