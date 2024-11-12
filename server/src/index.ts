import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/auth";
import { AppDataSource } from "./ormconfig";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "Not Found" });
});
