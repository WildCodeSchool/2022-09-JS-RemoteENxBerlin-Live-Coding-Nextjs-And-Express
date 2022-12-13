import express from "express";
import helmet from "helmet";
import database from "./database";
import MainRouter from "./routes";

const app = express();
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.use("/api", MainRouter);

app.listen(5050, () => {
  if (database.getConnection() == null) {
    console.error("Database connection failed");
    process.exit(1);
  }
  console.log("Database connected.\nExpress listening on http://localhost:5050");
});
