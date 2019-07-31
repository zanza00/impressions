import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { handleHealth } from "./routes/health";

const app = express();
const port = process.env.API_PORT || 3001;

app.use(express.static(path.join(__dirname, "build")));

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  console.log("App not running in production, using cors middleware");
}

app.get("/health", handleHealth);

app.listen(port, () => console.log(`API is started on port ${port}!`));
