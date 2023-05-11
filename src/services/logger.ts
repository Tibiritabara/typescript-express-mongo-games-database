import * as winston from 'winston';
import AppConfig from '../config/appConfig';

const level = () => {
    return AppConfig.app.isDevelopment ? 'debug' : 'warn';
};

const Logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});
  
export default Logger;
