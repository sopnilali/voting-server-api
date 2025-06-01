import express from 'express'
import { AuthRoutes } from '../module/Auth/auth.route';
import { UserRoutes } from '../module/User/user.route';
import { VoterRoutes } from '../module/Voter/voter.route';
import { CandidateRoutes } from '../module/Candidate/candidate.route';
import { VoteRoutes } from '../module/Vote/vote.route';
import { ElectionRoutes } from '../module/Election/election.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    }, 
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/voter',
        route: VoterRoutes
    },
    {
        path: '/candidate',
        route: CandidateRoutes
    },
    {
        path: '/election',
        route: ElectionRoutes
    },
    {
        path: '/vote',
        route: VoteRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

