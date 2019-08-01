export type TimeAmountAndType = {
  amount: number;
  type: "hour" | "day" | "month";
};

export type Impression = {
  device_id: string;
  lat: string;
  lng: string;
  timestamp: string;
};
