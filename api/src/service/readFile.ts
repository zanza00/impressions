import * as fs from "fs";
import * as papa from "papaparse";

import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { differenceInMinutes, fromUnixTime } from "date-fns";

import { Impressions } from "../models/csv";

const file = fs.createReadStream("src/data/dataset.csv");

const data: Impressions[] = [];

export function parseCsvFile() {
  papa.parse(file, {
    worker: true,
    header: true,
    step: result => {
      pipe(
        Impressions.decode(result.data),
        fold(
          e => {
            console.warn("found errors while decoding", e);
          },
          a => {
            data.push(a);
          },
        ),
      );
    },
    complete: () => {
      console.log(`finish the file, found ${data.length} rows`);
    },
    error: error => {
      console.log("Papa Parse error", error.message);
    },
  });
}

export function getImpressionById(id: string): Impressions[] {
  return data.filter(({ device_id }) => device_id === id);
}

export function getImpressionByTime(ts: string): Impressions[] {
  const dateFrom = fromUnixTime(parseInt(ts, 10));

  differenceInMinutes;
  return data.filter(({ timestamp }) => {
    const diff = differenceInMinutes(
      fromUnixTime(parseInt(timestamp, 10)),
      dateFrom,
    );
    return diff <= 60;
  });
}

export function getAllIds(): Impressions["device_id"][] {
  return data.map(elm => elm.device_id);
}
