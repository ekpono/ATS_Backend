import { NextFunction, Router, Request, Response } from 'express';
import { notFound } from '../middlewares/not-found.middleware';
import candidateRoute from './candidate.route';
import contactRoutes from './contact-us.route';
import jobRouter from './job.route';
import userRoute from './user.route';
import authRoute from './auth.route';
import { signInMiddleware } from '../middlewares/signIn.middleware';
import adminRoute from './admin.route';
import paymentRouter from './payment.route';
import getStartedRoutes from './get-started.route';

const indexRoute = Router();

indexRoute.route('/').get((req: Request, res: Response, next: NextFunction) => {
  res.send('Ace Recruitment AP1');
});

indexRoute.use('/auth', authRoute);
indexRoute.use('/user', signInMiddleware, userRoute);
indexRoute.use('/candidate', signInMiddleware, candidateRoute);
indexRoute.use('/job', signInMiddleware, jobRouter);
indexRoute.use('/admin', signInMiddleware, adminRoute);
indexRoute.use('/contact-us', contactRoutes);
indexRoute.use('/payment', signInMiddleware, paymentRouter);
indexRoute.use('/get-started', getStartedRoutes);
indexRoute.use(notFound);

export default indexRoute;
