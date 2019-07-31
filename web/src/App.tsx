import React, { useEffect, useState } from "react";
import { Button, InputPicker, Table, DatePicker } from "rsuite";

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

const App: React.FC = () => {
  const [hasError, setErrors] = useState(false);

  const [idList, setIdList] = useState([]);
  const [impression, setImpression] = useState<Impression[]>([]);

  const [deviceId, setDeviceId] = useState(0);
  const [time, setTime] = useState(0);

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
  async function getImpressionByTime(from: number) {
    const res = await fetch(`/api/getByTime?from=${from}`);
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
              Select a device Id <br />
              <InputPicker
                style={{ width: 250 }}
                data={idList.map(a => ({ value: a, label: a }))}
                onSelect={value => {
                  setDeviceId(value);
                }}
              />
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
            <div>OR</div>
            <div className="Right">
              Select a time <br />
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                ranges={[
                  {
                    label: "Now",
                    value: new Date(),
                  },
                ]}
                onOk={v => {
                  console.log(v.getTime());
                  setTime(v.getTime());
                }}
              />
              <Button
                disabled={time === 0}
                onClick={() => {
                  getImpressionByTime(time);
                }}
                color="blue"
              >
                Select Hour
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
                <Cell dataKey="timestamp" />
              </Column>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
