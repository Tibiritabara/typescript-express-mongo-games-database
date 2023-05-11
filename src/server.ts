import express from "express";
import cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import routesV1 from "./routes/v1";
import * as fs from "fs";
import * as YAML from "yaml";
import { Application } from "express";
import compression from "compression";
import AppConfig from "./config/appConfig";

export function createServer(): Application {
  const app = express();
  const corsOption = {
    origin: "*",
    credentials: true,
  };

  const file = fs.readFileSync("./spec/main.yaml", "utf8");
  const swaggerDocument = YAML.parse(file);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());
  app.use(cors(corsOption));
  app.use(`/${AppConfig.app.apiVersion}`, routesV1);

  return app;
}
