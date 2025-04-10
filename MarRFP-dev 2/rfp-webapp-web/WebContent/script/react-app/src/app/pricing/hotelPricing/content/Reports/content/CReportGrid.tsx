import React, { useCallback, useRef, useState } from "react";
import CCheckbox from "../../../../../common/components/CCheckbox";
import styles from "./Report.css";
import VirtualScroll from "react-dynamic-virtual-scroll";
interface ICRowProps {
  data?: any;
  copmonentName?: string;

  handleRowSelection?: (index: number) => void;
  onCheckBox?: (data: any, i: number, event: any) => void;
  onSort?: (data: any) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function CReportGrid(props: ICRowProps) {
  const [activeRow, setActiveRow] = useState(null);

  const virtualScrollRef = useRef();

  const handleRowSelection = (i) => {
    setActiveRow(i);
  };
  const hotelidCheckbox = (rowData, i) => {
    if (rowData) {
      return (
        <>
          <CCheckbox
            type={"checkbox"}
            onChangeHandler={(e) => onCheckBox(rowData, i, e)}
            checked={rowData.isChecked}
          ></CCheckbox>
        </>
      );
    }
  };
  const onCheckBox = (rowData, index, event) => {
    props.onCheckBox(rowData, index, event);
  };

  const scrollList = (e) => {
    if (virtualScrollRef.current) {
      virtualScrollRef.current.scrollHook(e.target);
    }
  };
  const renderItem = useCallback(
    (index) => {
      return (
        <div className={styles.borderInline}>
          <tr
            className={`${
              index === activeRow
                ? styles.gridRowbarSelected
                : styles.rightPanelRow
            } ${index % 2 ? styles.gridRow : styles.gridRowOdd} `}
            onClick={() => {
              handleRowSelection(index);
            }}
          >
            <td
              className={styles.gridCell}
              style={{
                minWidth: "30px",
                width: "30px",
                fontWeight: "normal",
              }}
            >
              {hotelidCheckbox(props.data[index], index)}
            </td>
            <td
              className={styles.gridCell}
              style={{
                minWidth: "60px",
                width: "60px",
                fontWeight: "normal",
                verticalAlign: "middle",
              }}
            >
              {props.data[index].marshaCode}{" "}
            </td>
            <td
              className={styles.gridCell}
              style={{
                minWidth: "240px",
                maxWidth: "100px",
                width: "240px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: "normal",
                verticalAlign: "middle",
              }}
            >
              {props.data[index].hotelName}{" "}
            </td>
            <td
              className={styles.gridCell}
              style={{
                minWidth: "110px",
                width: "110px",
                fontWeight: "normal",
                verticalAlign: "middle",
              }}
            >
              {props.data[index].city}{" "}
            </td>
            <td
              className={styles.gridCell}
              style={{
                minWidth: "50px",
                width: "50px",
                fontWeight: "normal",
                textAlign: "center",
              }}
            >
              {props.data[index].state}{" "}
            </td>
            <td
              className={styles.gridCell}
              style={{
                minWidth: "50px",
                width: "50px",
                fontWeight: "normal",
                textAlign: "center",
              }}
            >
              {props.data[index].country}{" "}
            </td>
          </tr>
        </div>
      );
    },
    [activeRow, props.data]
  );

  const getrowData = () => {
    if (props.data.length > 0) {
      return (
        <VirtualScroll
          className={styles.tableContent}
          minItemHeight={20}
          totalLength={props.data.length}
          renderItem={renderItem}
        />
      );
    }
  };
  const onHeaderSort = (selectedHeader) => {
    props.onSort(selectedHeader);
  };
  return (
    <table
      style={{ width: "100%", scrollBehavior: "smooth" }}
      cellPadding={0}
      cellSpacing={0}
      onScroll={scrollList}
    >
      <thead>
        <tr style={{ height: "28px" }}>
          <th className={styles.unfixedColumn}>
            <div>
              <table cellPadding={0} cellSpacing={0}>
                <tr>
                  <th
                    style={{ minWidth: "30px", width: "30px" }}
                    className={`${styles.gridHeader} ${styles.gridCell} `}
                    rowSpan={2}
                  ></th>
                  <th
                    style={{
                      minWidth: "60px",
                      width: "60px",
                      verticalAlign: "middle",
                    }}
                    className={`${styles.gridHeader} ${styles.gridCell} `}
                    rowSpan={2}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        onHeaderSort("marshaCode");
                      }}
                    >
                      MARSHA
                    </a>
                  </th>

                  <th
                    style={{
                      minWidth: "240px",
                      width: "240px",
                      verticalAlign: "middle",
                    }}
                    className={`${styles.gridHeader} ${styles.gridCell} ${styles.hotelname}`}
                    rowSpan={2}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        onHeaderSort("hotelName");
                      }}
                    >
                      Name
                    </a>
                  </th>

                  <th
                    style={{
                      minWidth: "110px",
                      width: "110px",
                      verticalAlign: "middle",
                    }}
                    className={`${styles.gridHeader} ${styles.gridCell}`}
                    rowSpan={2}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        onHeaderSort("city");
                      }}
                    >
                      City
                    </a>
                  </th>
                  <th
                    style={{ minWidth: "50px", width: "50px" }}
                    className={`${styles.gridHeader} ${styles.gridCell}`}
                    rowSpan={2}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        onHeaderSort("state");
                      }}
                    >
                      State/<br></br>Province
                    </a>
                  </th>
                  <th
                    className={`${styles.gridHeader} ${styles.gridCell}`}
                    rowSpan={2}
                    style={{ minWidth: "70px", width: "70px" }}
                  >
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        onHeaderSort("country");
                      }}
                    >
                      Country/<br></br> Region
                    </a>
                  </th>
                </tr>
              </table>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id="gridView">{getrowData()}</tbody>
    </table>
  );
}

export default CReportGrid;
