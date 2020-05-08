import { Router } from 'express';
import { listRepos } from '../controllers/github/listRepos';

export const githubRouter = Router();

githubRouter.get('/listRepos', listRepos);
