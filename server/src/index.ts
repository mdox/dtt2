import express from "express";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.get("/test", (req, res) => res.status(200).send("Hi!"));

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
