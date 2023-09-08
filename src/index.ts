import express from 'express';
import { frontendUrl, frontendUrlProd, port, url } from './config';
import logger from './utils/logger';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import database from './service/database.service';
import indexRoute from './routes';
import errorHandler from './middlewares/error/index';
import swagger from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'fs';
import { resolve } from 'path';

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const whitelist: string[] = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8080',
  frontendUrl,
  frontendUrlProd,
];

app.use(
  cors({
    origin: (
      origin: string,
      callback: (err: Error | null, origin?: string) => void,
    ) => {
      callback(
        whitelist.includes(origin as string) || !origin
          ? null
          : new Error(`Access to API from origin ${origin} denied`),
        origin,
      );
    },
    credentials: true,
  } as CorsOptions),
);

app.set('trust proxy', 1);

app.use('/api/v1', indexRoute);
app.use(errorHandler);
// const swaggerFile = yaml.parse(
//   fs.readFileSync(resolve('src/swagger.yaml'), 'utf8'),
// );

// app.use('/documentation', swagger.serve, swagger.setup(swaggerFile));
app.listen(port, async () => {
  try {
    await database();
    logger.info(`server is running on ${url}`);
  } catch (error) {
    logger.error(error);
  }
});
