import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { handleHealth } from "./routes/health";
import { handleimpressionById } from "./routes/impressionById";
import { parseCsvFile } from "./service/readFile";
import { handleimpressionByTime } from "./routes/impressionByTime";

parseCsvFile();

const app = express();
const port = process.env.API_PORT || 3001;

app.use(express.static(path.join(__dirname, "build")));

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  console.log("App not running in production, using cors middleware");
}

app.get("/health", handleHealth);

app.get("/getById", handleimpressionById);

app.get("/getByTime", handleimpressionByTime);

app.listen(port, () => console.log(`API is started on port ${port}!`));
