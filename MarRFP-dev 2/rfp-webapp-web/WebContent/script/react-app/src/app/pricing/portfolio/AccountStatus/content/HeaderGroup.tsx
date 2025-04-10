import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import React from "react";
export const headerGroup = (
  <ColumnGroup>
    <Row>
      <Column
        header="Account Name"
        rowSpan={2}
        style={{ width: "200px" }}
        field="accountname"
      />
      <Column
        header="Current Year"
        style={{ textAlign: "center" }}
        colSpan={6}
        //field="period"
      />
    </Row>
    <Row>
      <Column
        header="Non-Preferred GPP"
        style={{ width: "85px" }}
        field="process_aer"
      />
      <Column header="Locked" style={{ width: "70px" }} field="locked" />
      <Column header="Locked Date" style={{ width: "70px" }} field="lockDate" />
      <Column
        header="Status"
        style={{ width: "115px" }}
        field="acctStatusName"
      />
      <Column
        header="Account Notes"
        style={{ width: "300px" }}
        field="status_text"
      />
      <Column
        header="Internal PAS notes"
        style={{ width: "300px" }}
        field="internalpasnotes"
      />
    </Row>
  </ColumnGroup>
);

export default headerGroup;
