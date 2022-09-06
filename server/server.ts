import express from "express";
import driversRouter from "./routes/drivers";
import staticRoutes from "./routes/static";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(driversRouter);
  app.use(staticRoutes);

  return app;
}

export default createServer;
