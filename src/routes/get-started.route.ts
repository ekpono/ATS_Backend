import { Router } from 'express';
import { sendUserDetails } from '../controllers/get-started.controller';

const getStartedRoutes = Router();

getStartedRoutes.route('/').post(sendUserDetails);

export default getStartedRoutes;
