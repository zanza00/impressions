import React from "react";
import { Button, InputPicker } from "rsuite";

import "./DeviceFilter.css";

export type DeviceFilterProps = {
  idList: number[];
  setDeviceId: React.Dispatch<React.SetStateAction<number>>;
  deviceId: number;
  getImpressionById: (id: number) => Promise<void>;
};

export default ({
  idList,
  setDeviceId,
  deviceId,
  getImpressionById,
}: DeviceFilterProps) => (
  <div className="DeviceFilter">
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
      color="orange"
    >
      Select ID
    </Button>
  </div>
);
