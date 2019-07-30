"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, 'build')));
if (process.env.NODE_ENV !== "production") {
    app.use(cors());
    console.log("App not running in production, using cors middleware");
}
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/api/fetch", (req, res) => res.send(JSON.stringify({ hello: "world" })));
app.listen(port, () => console.log(`API is started on port ${port}!`));
//# sourceMappingURL=index.js.map