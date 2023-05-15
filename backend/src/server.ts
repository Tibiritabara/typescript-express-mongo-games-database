import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose"; 
import * as swaggerUi from "swagger-ui-express";
import routesV1 from "./routes/v1";
import * as fs from "fs";
import YAML from "yaml";
import { Application } from "express";
import compression from "compression";
import AppConfig from "./config/AppConfig";
import MongoStore from "connect-mongo";
import mainRouter from "./routes/v1/main";
import { AppError, HttpCode } from "./exceptions/AppError";
import { errorHandler } from "./exceptions/ErrorHandler";

export function createServer(): Application {
  const app = express();

  // CORS configuration set up
  const corsOption = {
    origin: "*",
    credentials: true,
  };

  // Swagger configuration set up
  const file = fs.readFileSync(AppConfig.app.specFile, "utf8");
  const swaggerDocument = YAML.parse(file);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  //Mongoose configuration set up
  const clientP = mongoose.connect(
    `mongodb://${AppConfig.db.usernameLocal}:${AppConfig.db.passwordLocal}@${AppConfig.db.host}:${AppConfig.db.port}`
  ).then(m => m.connection.getClient())

  app.use(session({
    secret: AppConfig.app.secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: AppConfig.db.database,
      stringify: false,
      autoRemove: "native",
      autoRemoveInterval: 1,
    })
  }));


  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());
  app.use(cors(corsOption));
  app.use('/', mainRouter);
  app.use(`/${AppConfig.app.apiVersion}`, routesV1);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new AppError({
      title: "NOT_FOUND",
      detail: "API endpoint not found",
      status: HttpCode.NOT_FOUND,
    });
    errorHandler.handleError(err, res);
  });

  return app;
}
