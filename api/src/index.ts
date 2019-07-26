import * as express from "express";
import * as cors from "cors";
const app = express();
const port = 3001;

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  console.log("App not running in production, using cors middleware");
}

app.get("/api/fetch", (req, res) =>
  res.send(JSON.stringify({ hello: "world" })),
);

app.listen(port, () => console.log(`API is started on port ${port}!`));
