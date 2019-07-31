import * as express from "express";

import { getAllIds } from "../service/readFile";

export function handleGetAllId(_req: express.Request, res: express.Response) {
  const resp = getAllIds();
  return res.send(resp);
}
