import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "Not Found" });
});
