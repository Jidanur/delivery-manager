import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { AppDataSource } from "./config/ormconfig";
import { errorHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/auth", authRoutes);
app.use(errorHandler);


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
