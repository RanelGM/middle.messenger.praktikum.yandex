import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;
const dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static("./dist"));

app.get("*", (_req, res) => {
  res.status(200);
  res.sendFile(path.join(dirname, "/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен через порт: ${PORT}`);
});
