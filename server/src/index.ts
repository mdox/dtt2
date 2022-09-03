import express from "express";
import driversRouter from "./routes/drivers";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.use(driversRouter);

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
