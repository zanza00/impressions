import React, { useEffect, useState } from "react";
import { Button, InputPicker, Table, DatePicker, InputNumber } from "rsuite";
import { addHours, addDays, addMonths, toDate } from "date-fns";

import Error from "./Components/Error";

import "rsuite/dist/styles/rsuite.min.css";
import "./App.css";

const { Column, HeaderCell, Cell } = Table;

type Impression = {
  device_id: string;
  lat: string;
  lng: string;
  timestamp: string;
};

type TimeAmountAndType = { amount: number; type: "hour" | "day" | "month" };

type CellProps = {
  dataKey: string;
  rowIndex?: number;
  rowData?: object;
};
// typings in this particular instance are bad
const DateCell = ({ rowData, dataKey, ...props }: CellProps) => {
  // @ts-ignore
  const d = toDate(parseInt(rowData[dataKey], 10));
  return <Cell {...props}>{d.toISOString()}</Cell>;
};

function addTime(from: number, { amount, type }: TimeAmountAndType): number {
  switch (type) {
    case "day":
      return addDays(new Date(from), amount).getTime();
    case "hour":
      return addHours(new Date(from), amount).getTime();
    case "month":
      return addMonths(new Date(from), amount).getTime();
  }
}

const App: React.FC = () => {
  const [hasError, setErrors] = useState(false);

  const [idList, setIdList] = useState([]);
  const [impression, setImpression] = useState<Impression[]>([]);

  const [deviceId, setDeviceId] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeAmountAndType>({
    amount: 1,
    type: "hour",
  });

  async function getIds() {
    const res = await fetch("/api/getAllIds/");
    res
      .json()
      .then(res => setIdList(res))
      .catch(() => setErrors(true));
  }

  async function getImpressionById(id: number) {
    const res = await fetch(`/api/getById?id=${id}`);
    res
      .json()
      .then(res => setImpression(res))
      .catch(() => setErrors(true));
  }
  async function getImpressionByTime(
    from: number,
    amountAndTime: TimeAmountAndType,
  ) {
    const to = addTime(from, amountAndTime);
    const res = await fetch(`/api/getByTime?from=${from}&to=${to}`);
    res
      .json()
      .then(res => setImpression(res))
      .catch(() => setErrors(true));
  }

  useEffect(() => {
    getIds();
  }, []);

  return (
    <div className="App">
      {hasError ? (
        <Error />
      ) : (
        <>
          <div className="Header">
            <div className="Left">
              <h2>Select a device Id</h2>
              <InputPicker
                style={{ width: 250 }}
                data={idList.map(a => ({ value: a, label: a }))}
                onSelect={value => {
                  setDeviceId(value);
                }}
              />
              <br />
              <Button
                disabled={deviceId === 0}
                onClick={() => {
                  getImpressionById(deviceId);
                }}
                color="blue"
              >
                Select ID
              </Button>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>OR</div>
            <div className="Right">
              <h2>Select a start time and a range</h2>
              <div>
                Start Time:
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  ranges={[
                    {
                      label: "Now",
                      value: new Date(),
                    },
                  ]}
                  onOk={v => {
                    setStartTime(v.getTime());
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
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
                color="blue"
              >
                Select {timeRange.type}
              </Button>
            </div>
          </div>
          <div>
            <Table height={400} data={impression} virtualized>
              <Column width={70} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="device_id" />
              </Column>
              <Column width={200} fixed>
                <HeaderCell>lat</HeaderCell>
                <Cell dataKey="lat" />
              </Column>
              <Column width={200}>
                <HeaderCell>lng</HeaderCell>
                <Cell dataKey="lng" />
              </Column>
              <Column width={200}>
                <HeaderCell>Date</HeaderCell>
                <DateCell dataKey="timestamp" />
              </Column>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
