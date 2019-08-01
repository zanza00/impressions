import React from "react";
import { Table } from "rsuite";
import { toDate } from "date-fns";
import { Impression } from "../model";


const { Column, HeaderCell, Cell } = Table;

type CellProps = {
  dataKey: string;
  rowIndex?: number;
  rowData?: object;
};

// typings in this particular instance are bad
export const DateCell = ({ rowData, dataKey, ...props }: CellProps) => {
  // @ts-ignore
  const timestamp = rowData[dataKey];
  const d = toDate(parseInt(timestamp, 10));
  return <Cell {...props}>{d.toISOString()}</Cell>;
};

export default ({ data = [] }: { data: Impression[] }) => (
  <div>
    <Table autoHeight data={data} virtualized>
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
);
