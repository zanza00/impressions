import * as express from "express";
import * as cors from "cors";
import * as path from "path";

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  console.log("App not running in production, using cors middleware");
}

app.get("/", function(_req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/fetch", (_req, res) =>
  res.send(JSON.stringify({ hello: "world" })),
);

app.listen(port, () => console.log(`API is started on port ${port}!`));
