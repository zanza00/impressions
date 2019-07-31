import * as express from "express";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";

import { getImpressionByTime } from "../service/readFile";
import { TimeFrom } from "../models/csv";

export function handleimpressionByTime(
  req: express.Request,
  res: express.Response,
) {
  pipe(
    TimeFrom.decode(req.query.from),
    fold(
      _e => {
        res.status(422).send({ errors: { from: "must be a string" } });
      },
      timestamp => {
        const resp = getImpressionByTime(timestamp);
        return res.send(resp);
      },
    ),
  );
}
