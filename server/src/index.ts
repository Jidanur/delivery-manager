import cors from 'cors';
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { AppDataSource } from "./config/ormconfig";
import { errorHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import packageRoutes from "./routes/packageRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/package", packageRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("API is working!");
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

app.use(errorHandler);

export default app;
