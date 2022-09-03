import express, { Router } from "express";
import path from "path";

const staticRoutes = Router();

staticRoutes.use(
  "/static",
  express.static(path.join(process.cwd(), "../resources/static"))
);

export default staticRoutes;
