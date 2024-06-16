import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static("./dist"));

app.get("/", (_req, res) => {
  res.status(200);
  res.send("Приложение создано");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен через порт: ${PORT}`);
});
