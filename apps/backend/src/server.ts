import express from "express";
import helmet from "helmet";
import database from "./database";
import MainRouter from "./routes";

const app = express();
app.use(helmet());
// TODO: merge below functionality into above helmet config
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
