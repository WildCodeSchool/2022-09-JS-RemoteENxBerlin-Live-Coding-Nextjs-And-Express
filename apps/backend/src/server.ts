import express from "express";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(5050, () => {
  console.log("Express listening on http://localhost:5050");
});
