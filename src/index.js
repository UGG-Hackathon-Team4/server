import dotenv from "dotenv";
import express from "express";
import mainRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
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
