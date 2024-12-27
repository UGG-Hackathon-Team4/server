import dotenv from "dotenv";
import express from "express";
import mainRouter from "./routes/index.js";
import { prisma } from "./db.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("연결됨");
  res.send("ugg team4 서버");
});

app.use("/api/v1", mainRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(PORT || 3000, () => {
  console.info(`Server is running on port ${PORT}`);
});
