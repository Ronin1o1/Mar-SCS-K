// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "./CDataTable.css";
import Settings from "../static/Settings";
import "primeicons/primeicons.css";

const dynamicColumns = (columns) =>
  columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={<div dangerouslySetInnerHTML={{ __html: col.header }} />}
        body={col.body}
        style={col.style}
        sortable={col.sortable ? col.sortable : false}
      />
    );
  });

const scrollElement = (search: string) => {
  const aElements = document.querySelectorAll(".p-datatable-tbody > tr > td");
  for (const ele of aElements as any) {
    if (ele.innerHTML === `<td><div><span>${search}</span></div></td>`) {
      const parent = ele.parentElement;
      parent.style.setProperty("background-color", "#98c1e3", "important");
      ele.scrollIntoView(true);
      break;
    }
  }
};

function CDataTable(props) {
  // @ts-ignore
  const ValueSelected =
    props.SelectedValue !== undefined ? props.SelectedValue : null;

  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const container = document.getElementsByClassName(
      "p-datatable-scrollable-body"
    );
    if (container && container[0]) {
      container[0].scrollTop = 0;
      container[0].scrollLeft = 0;
    }
  }, [props.reloadTable]);

  useEffect(() => {
    if (ValueSelected) {
      scrollElement(ValueSelected);
    }
  }, [ValueSelected]);

  return (
    <div
      className={`${styles.dataTableView} ${"dataTablegridView"}`}
      style={{
        width: props.width ? props.width : "100%",
        height: props.height ? props.height : "auto",
        minHeight: props.height ? props.height : "auto",
      }}
    >
      {props.componentGridName === "gridTableViewRD" ? (
        <DataTable
          scrollHeight={props.scrollHeight}
          emptyMessage={
            props.emptyMessage
              ? props.emptyMessage
              : Settings.cDatatable.emptyMessage
          }
          className={styles.dataTable}
          value={props.value}
          //header={props.header ? props.header : ""}
          headerColumnGroup={props.header}
          selectionMode={props.selectionMode}
          dataKey={props.dataKey}
          selection={selectedRow}
          sortField={props.sortField}
          sortOrder={props.sortOrder}
          onSelectionChange={(e) => setSelectedRow(e.value)}
        >
          {dynamicColumns(props.columns)}
        </DataTable>
      ) : (
        <DataTable
          scrollable
          scrollHeight={props.scrollHeight}
          emptyMessage={
            props.emptyMessage
              ? props.emptyMessage
              : Settings.cDatatable.emptyMessage
          }
          className={
            props?.id == "gridTableViewRate"
              ? styles.dataTableRate
              : styles.dataTable
          }
          value={props.value}
          //header={props.header ? props.header : ""}
          headerColumnGroup={props.header}
          selectionMode={props.selectionMode}
          dataKey={props.dataKey}
          selection={selectedRow}
          sortField={props.sortField}
          sortOrder={props.sortOrder}
          onSelectionChange={(e) => setSelectedRow(e.value)}
        >
          {dynamicColumns(props.columns)}
        </DataTable>
      )}
    </div>
  );
}

export default CDataTable;
