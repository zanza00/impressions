import * as t from "io-ts";

export const Impressions = t.type({
  device_id: t.string,
  lat: t.string,
  lng: t.string,
  timestamp: t.string,
});
export type Impressions = t.TypeOf<typeof Impressions>;

export const QueryId = t.string;
export type QueryId = t.TypeOf<typeof QueryId>;

export const TimeFrom = t.type({
  from: t.string,
  to: t.string,
});
export type TimeFrom = t.TypeOf<typeof TimeFrom>;
