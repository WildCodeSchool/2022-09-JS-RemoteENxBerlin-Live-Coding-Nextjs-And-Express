import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import database from "./database";
import MainRouter from "./routes";

dotenv.config();

if (process.env.JWT_SECRET == null) {
  console.warn(
    "No JWT_SECRET found in .env, using random one at runtime. This will change on every execution of your backend so make sure to set afixed value in .env!"
  );
  process.env.JWT_SECRET = crypto.randomUUID();
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.use("/api", MainRouter);

app.listen(5050, () => {
  if (database.getConnection() == null) {
    console.error("Database connection failed");
    process.exit(1);
  }
  console.log(
    "Database connected.\nExpress listening on http://localhost:5050"
  );
});
