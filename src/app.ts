/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorhandler from "./app/middleware/globalErrorhandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
// application routes
app.use("/api/v1", router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get("/", test);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalErrorhandler);

// not found

app.use(notFound);
export default app;
