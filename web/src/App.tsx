import React, { useEffect, useState } from "react";

import Error from "./Components/Error";
import Table from "./Components/Table";
import DeviceFilter from "./Components/DeviceFilter";
import OrDivider from "./Components/OrDivider";

import "rsuite/dist/styles/rsuite.min.css";
import "./App.css";
import TimeFilter from "./Components/TimeFilter";
import { addTime } from "./helpers";
import { TimeAmountAndType, Impression } from "./model";

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

  async function getImpressionById(id: number): Promise<void> {
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
            <DeviceFilter
              deviceId={deviceId}
              getImpressionById={getImpressionById}
              idList={idList}
              setDeviceId={setDeviceId}
            />
            <OrDivider />
            <TimeFilter
              setStartTime={setStartTime}
              setTimeRange={setTimeRange}
              timeRange={timeRange}
              startTime={startTime}
              getImpressionByTime={getImpressionByTime}
            />
          </div>
          <Table data={impression} />
        </>
      )}
    </div>
  );
};

export default App;
