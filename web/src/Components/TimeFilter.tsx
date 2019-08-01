import React from "react";
import { Button, InputPicker, DatePicker, InputNumber } from "rsuite";
import { parse } from "date-fns";
import { TimeAmountAndType } from "../model";

import "./TimeFilter.css";

type TimeFilterProps = {
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setTimeRange: React.Dispatch<React.SetStateAction<TimeAmountAndType>>;
  timeRange: TimeAmountAndType;
  startTime: number;
  getImpressionByTime: (
    from: number,
    amountAndTime: TimeAmountAndType,
  ) => Promise<void>;
};

export default ({
  setStartTime,
  setTimeRange,
  timeRange,
  startTime,
  getImpressionByTime,
}: TimeFilterProps) => (
  <div className="TimeFilter">
    <h2>Select a start time and a range</h2>
    <div>
      Start Time:
      <DatePicker
        format="YYYY-MM-DD HH:mm:ss"
        ranges={[
          {
            label: "2017",
            value: parse("2017-07-01", "yyyy-MM-dd", new Date()),
          },
        ]}
        onChange={v => {
          setStartTime(v.getTime());
        }}
      />
    </div>
    <div className="TimeRange">
      Range:
      <span>
        <InputNumber
          style={{ width: 80 }}
          defaultValue={1}
          max={100}
          min={1}
          onChange={amount => {
            setTimeRange({ amount, type: timeRange.type });
          }}
        />
      </span>
      <span>
        <InputPicker
          style={{ width: 150 }}
          defaultValue={"hour"}
          data={["hour", "day", "month"].map(a => ({
            value: a,
            label: a,
          }))}
          onSelect={type => {
            setTimeRange({ amount: timeRange.amount, type });
          }}
        />
      </span>
    </div>
    <Button
      disabled={startTime === 0}
      onClick={() => {
        getImpressionByTime(startTime, timeRange);
      }}
      color="violet"
    >
      Select {timeRange.type}
    </Button>
  </div>
);
