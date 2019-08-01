import * as fs from "fs";
import * as papa from "papaparse";

import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { fromUnixTime, isWithinInterval } from "date-fns";

import { Impression } from "../models/csv";

const filePath =
  process.env.NODE_ENV === "production"
    ? "build/data/dataset.csv"
    : "src/data/dataset.csv";

const file = fs.createReadStream(filePath);

const data: Impression[] = [];

export function parseCsvFile() {
  papa.parse(file, {
    worker: true,
    header: true,
    step: result => {
      pipe(
        Impression.decode(result.data),
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

export function getImpressionById(id: string): Impression[] {
  return data.filter(({ device_id }) => device_id === id);
}

export function getImpressionByTime(from: string, to: string): Impression[] {
  const dateFrom = fromUnixTime(parseInt(from, 10));
  const dateTo = fromUnixTime(parseInt(to, 10));

  return data.filter(({ timestamp }) => {
    return isWithinInterval(fromUnixTime(parseInt(timestamp, 10)), {
      start: dateFrom,
      end: dateTo,
    });
  });
}

export function getAllIds(): Impression["device_id"][] {
  return Array.from(new Set(data.map(elm => elm.device_id))).sort();
}
