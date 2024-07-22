import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connectDb.js";
import { userRouter } from "./routes/userRoute.js";
import { postRoute } from "./routes/postRoute.js";

const app = express();
dotenv.config();
app.use(cors());

const port = process.env.port || 4000;
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => res.send("welcome to blog app"));
app.use((err, req, res, next) => {
  res.status(500).send({ message: `From Test ${err.message}` });
});

app.listen(port, () =>
  console.log(`Server is currently running on port http://localhost:${port}`)
);
