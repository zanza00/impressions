import * as express from "express";

export function handleHealth(_req: express.Request, res: express.Response) {
  return res.send(JSON.stringify({ currentTimeUtc: new Date() }));
}
