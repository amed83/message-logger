import express, { Request, Response } from "express";
import cors from "cors";
const logs = require("./data.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.listen(8080, () => {
  console.log("Server running on port on port 8080");
});

interface DataPayload {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  job_title: string;
}

app.get("/api/users", (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const payloadlenght = 30;
  const start = page * payloadlenght - payloadlenght;
  const end = page * payloadlenght;
  const logsPayload = logs.slice(start, end);
  setTimeout(() => {
    res
      .status(200)
      .json({ hasNextPage: logsPayload.length > 1, logs: logsPayload });
  }, 300);
});
