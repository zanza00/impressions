import * as express from "express";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";

import { getImpressionById } from "../service/readFile";
import { QueryId } from "../models/csv";

export function handleimpressionByTime(
  req: express.Request,
  res: express.Response,
) {
  pipe(
    QueryId.decode(req.query.from),
    fold(
      _e => {
        res.status(422).send({ errors: { from: "must be a string" } });
      },
      id => {
        const resp = getImpressionById(id);
        return res.send(resp);
      },
    ),
  );
}
