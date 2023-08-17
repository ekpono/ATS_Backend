import { Router } from 'express';
import {
  candidateDemographic,
  plotData,
  recruitmentOverview,
} from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.route('/demographic').get(candidateDemographic);
adminRoute.route('/overview').get(recruitmentOverview);
adminRoute.route('/plot').get(plotData);

export default adminRoute;
