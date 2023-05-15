import * as dotenv from 'dotenv';	
dotenv.config();

import { Server } from 'net';
import { createServer } from './server';
import Logger from './services/logger';
import AppConfig from './config/AppConfig';

const PORT = AppConfig.app.port;

function startServer(): Server {
  const app = createServer();
  return app.listen(PORT, () => {
    Logger.debug(
        `Server running on port ${PORT} with API version ${AppConfig.app.apiVersion}`
    );
  });
}

startServer();
