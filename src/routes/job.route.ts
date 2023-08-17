import { Router } from 'express';
import {
  createJob,
  deleteJob,
  findJob,
  findJobs,
  jobOverview,
  jobStatus,
  qualifiedCandidate,
  updateJob,
} from '../controllers/job.controller';

const jobRouter = Router();

jobRouter.route('/').get(findJobs).post(createJob);
jobRouter.route('/overview').get(jobOverview);
jobRouter.route('/status/:id').patch(jobStatus);
jobRouter.route('/qualified/:id').get(qualifiedCandidate);
jobRouter.route('/:id').get(findJob).patch(updateJob).delete(deleteJob);

export default jobRouter;
