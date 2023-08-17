import { Router } from 'express';
import {
  activateCandidate,
  archiveCandidate,
  createCandidate,
  deleteCandidate,
  findCandidate,
  findCandidates,
  unarchiveCandidate,
  updateCandidate,
} from '../controllers/candidate.controller';
import { upload } from '../service/cloudinary.service';

const candidateRoute = Router();

const uploadFields = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'identification', maxCount: 1 },
]);

candidateRoute
  .route('/')
  .get(findCandidates)
  .post(uploadFields, createCandidate);
candidateRoute.route('/activate/:id').patch(activateCandidate);
candidateRoute.route('/archive/:id').patch(archiveCandidate);
candidateRoute.route('/unarchive/:id').patch(unarchiveCandidate);

candidateRoute
  .route('/:id')
  .get(findCandidate)
  .patch(uploadFields, updateCandidate)
  .delete(deleteCandidate);

export default candidateRoute;
