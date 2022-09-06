import createServer from "./server";

const PORT = process.env.PORT ?? 5000;

const app = createServer();

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
