import React, { useContext, useEffect, useState } from "react";
import styles from "./rebidList.css";
import Settings from "../static/Settings";
import CCheckbox from "../../../../common/components/CCheckbox";
import CalendarInput from "../../../../shared/components/calendarInput";
import classnames from "classnames";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import RebidContext from "../context/rebid";
import { CLoader } from "../../../../common/components/CLoader";

function RebidList(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const rebidContext = useContext(RebidContext);
  const [activeRow, setActiveRow] = useState(null);
  const [prevRow, setprevRow] = useState(null);
  const [currentRow, setcurrentRow] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", sortHeader);
    return () => document.removeEventListener("keydown", sortHeader);
  }, []);

  useEffect(() => {
    const elemView = document.getElementById("table_2");

    if (elemView && appContext.tableRefresh) {
      elemView.scrollTop = 0;
      elemView.scrollLeft = 0;
      appContext.setTableRefersh(false);
    }
  }, [appContext.tableRefresh]);

  const sortHeader = (event) => {
    if (event.keyCode === 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("rebid")) {
        const sortBy = focusedElem.id.split("-")[1];
        if (sortBy.length == 1) {
          props.handleOrderChange(sortBy);
        }
      }
    }
  };

  const scolling = (e, tableName) => {
    const rightScrollPos = document.getElementById(
      tableName == "table_2" ? "table_2" : "table_1"
    ).scrollTop;
    document.getElementById(
      tableName == "table_2" ? "table_1" : "table_2"
    ).scrollTop = rightScrollPos;
  };

  const handleRowSelection = (item, index: number) => {
    const elements = document.querySelectorAll("#frozenCol tr");
    const rowlements = document.querySelectorAll("#gridView tr");
    const highlight = "_3iyxNCHPnMdk34KcXaNLaw==";

    elements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
    });
    rowlements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
    });

    if (currentRow == null && prevRow == null) {
      setprevRow(currentRow);

      setcurrentRow(index);
    } else {
      if (currentRow != index) {
        setprevRow(currentRow);
        setcurrentRow(index);
        const s = props.value.portfolioRebidList[currentRow];

        if (s.changed == "Y") {
          props.save({
            portfolioRebidList: [s],
            strFilterValues: props.panelData.strFilterValues,
          });
        }
      }
    }

    setActiveRow(index);

    appContext.setactiveRowPortfolio(index);
    appContext.setPrevRowPortfolio(index);
    appContext.setpgoosGridRowHighlight(true);
    appContext.setpgoosFilterRowHighlight(false);
  };

  const getRebidCheckbox = (
    item,
    field,
    index,
    isEditable,
    due_field: string = null
  ) => {
    return (
      <CCheckbox
        type={Settings.inputType.checkbox}
        id={field + "_Checkbox_" + index}
        onChangeHandler={(e) => {
          props.onChangeFieldValue(item, props.value, field, e);
          const filteredHotelList =
            rebidContext.filteredHotelList.portfolioRebidList[index];
          if (filteredHotelList && filteredHotelList.changed == "Y") {
            props.save({
              portfolioRebidList: [filteredHotelList],
              strFilterValues: props.panelData.strFilterValues,
            });
          }
        }}
        checked={item[field] == "Y" ? true : false}
        disabled={!isEditable}
      ></CCheckbox>
    );
  };

  const getDueDate = (item, field, index, isEditable) => {
    return (
      <>
        <CalendarInput
          defaultValue={item[field]}
          item={item}
          field={field}
          disabled={!isEditable}
          index={index}
          onChange={(e) => {
            props.onChangeFieldValue(item, props.value, field, e);
          }}
          onSelect={(e) => {
            props.onChangeFieldValue(item, props.value, field, e);
            const filteredHotelList =
              rebidContext.filteredHotelList.portfolioRebidList[currentRow];
            if (filteredHotelList && filteredHotelList.changed == "Y") {
              props.save({
                portfolioRebidList: [filteredHotelList],
                strFilterValues: props.panelData.strFilterValues,
              });
            }
          }}
          onHide={() => {
            const filteredHotelList =
              rebidContext.filteredHotelList.portfolioRebidList[currentRow];
            if (filteredHotelList.changed == "Y") {
              props.save({
                portfolioRebidList: [filteredHotelList],
                strFilterValues: props.panelData.strFilterValues,
              });
            }
          }}
        ></CalendarInput>
      </>
    );
  };

  const enableSendChaseEmail = (item) =>
    item[Settings.tableColumns.rebidstatus_desc.field] == "To be Rebid" ||
    item[Settings.tableColumns.rebidstatus_desc2.field] == "To be Rebid" ||
    item[Settings.tableColumns.rebidstatus_desc3.field] == "To be Rebid";

  const noDataFound = () => {
    return <span>No Data Found</span>;
  };

  const gridHasData = () => {
    return props.value.portfolioRebidList?.length > 0 ? true : false;
  };

  const mouseOverHightLightRow = (index) => {
    const el1 = document.getElementById(`row_${index}`);
    const el2 = document.getElementById(`ppeRow_${index}`);
    if (el1.classList.contains(styles.gridRow)) {
      el1.classList.remove(styles.gridRow);
    }
    if (el1.classList.contains(styles.gridRowOdd)) {
      el1.classList.remove(styles.gridRowOdd);
    }
    if (el2.classList.contains(styles.gridRow)) {
      el2.classList.remove(styles.gridRow);
    }
    if (el2.classList.contains(styles.gridRowOdd)) {
      el2.classList.remove(styles.gridRowOdd);
    }
    el1?.classList?.add(styles.gridRowOver);
    el2?.classList?.add(styles.gridRowOver);
  };

  const mouseLeaveHandler = (index) => {
    const el1 = document.getElementById(`row_${index}`);
    const el2 = document.getElementById(`ppeRow_${index}`);
    el1?.classList?.remove(styles.gridRowOver);
    el2?.classList?.remove(styles.gridRowOver);
    if (index % 2) {
      el1.classList.add(styles.gridRow);
      el2.classList.add(styles.gridRow);
    } else {
      el1.classList.add(styles.gridRowOdd);
      el2.classList.add(styles.gridRowOdd);
    }
  };

  const getrowData = (leftColumn = false) => {
    if (props.value.portfolioRebidList?.length > 0) {
      return props.value.portfolioRebidList.map((item, index) => {
        const rebid1 = item.rebid_flag;
        const rebid2 = item.rebid_flag2;
        const rebid3 = item.rebid_flag3;
        const activeIndex = appContext?.activeRowPortfolio;
        if (leftColumn) {
          return (
            // eslint-disable-next-line react/jsx-key
            <tr
              id={`row_${index}`}
              className={
                !appContext.pgoosFilterRowHighlight &&
                appContext.pgoosGridRowHighlight &&
                index === activeIndex
                  ? styles.gridRowbarSelected
                  : hoverRow == index && hoverRow != activeIndex
                  ? styles.gridRowOver
                  : index % 2
                  ? styles.gridRow
                  : styles.gridRowOdd
              }
              onMouseOver={() => mouseOverHightLightRow(index)}
              onMouseLeave={() => mouseLeaveHandler(index)}
              onClick={() => handleRowSelection(item, index)}
            >
              <td className={`${styles.rebid} `} style={{ textAlign: "left" }}>
                {props.ajaxSaveInprogress.progress && prevRow == index && (
                  <div className={styles.newLoaderClass}></div>
                )}
                {item[Settings.tableColumns.marshacode.field]}
              </td>
            </tr>
          );
        } else {
          return (
            // eslint-disable-next-line react/jsx-key
            <tr
              id={`ppeRow_${index}`}
              className={
                !appContext.pgoosFilterRowHighlight &&
                appContext.pgoosGridRowHighlight &&
                index === activeIndex
                  ? styles.gridRowbarSelected
                  : hoverRow == index && hoverRow != activeIndex
                  ? styles.gridRowOver
                  : index % 2
                  ? styles.gridRow
                  : styles.gridRowOdd
              }
              onMouseOver={() => mouseOverHightLightRow(index)}
              onMouseLeave={() => mouseLeaveHandler(index)}
              onClick={() => handleRowSelection(item, index)}
            >
              <td className={`${styles.rebid} `} style={{ textAlign: "left" }}>
                <div id="rebidHotelName" className={styles.name}>
                  {item[Settings.tableColumns.hotelname.field]}
                </div>
              </td>
              <td className={`${styles.rebid} `}>
                {item.selected === "Y"
                  ? getRebidCheckbox(
                      item,
                      Settings.tableColumns.rebid_flag.field,
                      index,
                      item.rebid_flag2 === "Y" ? false : true,
                      Settings.tableColumns.rebid_due.field
                    )
                  : ""}
              </td>
              <td className={`${styles.rebid} `}>
                {item.selected === "Y" && rebid1 == "Y"
                  ? getDueDate(
                      item,
                      Settings.tableColumns.rebid_due.field,
                      index,
                      item.rebid_flag2 === "Y" ? false : true
                    )
                  : ""}
              </td>
              <td className={`${styles.rebid}  `} style={{ textAlign: "left" }}>
                {item.selected === "Y" && rebid1 == "Y"
                  ? item[Settings.tableColumns.rebidstatus_desc.field]
                  : ""}
              </td>
              <td className={`${styles.rebid}`}>
                {rebid2
                  ? getRebidCheckbox(
                      item,
                      Settings.tableColumns.rebid_flag2.field,
                      index,
                      item.rebid_flag3 === "Y" ? false : true,
                      Settings.tableColumns.rebid_due2.field
                    )
                  : item[Settings.tableColumns.rebid_flag.field] == "Y" &&
                    item[Settings.tableColumns.rebidstatus_desc.field] !=
                      null &&
                    item[Settings.tableColumns.rebidstatus_desc.field] !=
                      "To be Rebid" &&
                    item[Settings.tableColumns.rebidstatus_desc.field] != ""
                  ? getRebidCheckbox(
                      item,
                      Settings.tableColumns.rebid_flag2.field,
                      index,
                      item.rebid_flag3 === "Y" ? false : true,
                      Settings.tableColumns.rebid_due2.field
                    )
                  : ""}
              </td>
              <td className={`${styles.rebid} `}>
                {rebid2 == "Y"
                  ? getDueDate(
                      item,
                      Settings.tableColumns.rebid_due2.field,
                      index,
                      item.rebid_flag3 === "Y" ? false : true
                    )
                  : ""}
              </td>
              <td className={`${styles.rebid} `} style={{ textAlign: "left" }}>
                {rebid2 == "Y"
                  ? item[Settings.tableColumns.rebidstatus_desc2.field]
                  : ""}
              </td>
              <td className={`${styles.rebid}`}>
                {rebid3
                  ? getRebidCheckbox(
                      item,
                      Settings.tableColumns.rebid_flag3.field,
                      index,
                      true,
                      Settings.tableColumns.rebid_due3.field
                    )
                  : item[Settings.tableColumns.rebid_flag2.field] == "Y" &&
                    item[Settings.tableColumns.rebidstatus_desc2.field] !=
                      null &&
                    item[Settings.tableColumns.rebidstatus_desc2.field] !=
                      "To be Rebid" &&
                    item[Settings.tableColumns.rebidstatus_desc2.field] != ""
                  ? getRebidCheckbox(
                      item,
                      Settings.tableColumns.rebid_flag3.field,
                      index,
                      true,
                      Settings.tableColumns.rebid_due3.field
                    )
                  : ""}
              </td>
              <td className={`${styles.rebid} `}>
                {rebid3 == "Y"
                  ? getDueDate(
                      item,
                      Settings.tableColumns.rebid_due3.field,
                      index,
                      true
                    )
                  : ""}
              </td>
              <td className={`${styles.rebid}`} style={{ textAlign: "left" }}>
                {rebid3 == "Y"
                  ? item[Settings.tableColumns.rebidstatus_desc3.field]
                  : ""}
              </td>
              <td style={{ minWidth: "75px" }} className={`${styles.width200}`}>
                {item[Settings.tableColumns.check_respond.field] === "Y"
                  ? "Yes"
                  : "No"}
              </td>
              <td style={{ minWidth: "85px" }} className={`${styles.width200}`}>
                {item[Settings.tableColumns.chasemail_sent_flag.field] === "Y"
                  ? "Yes"
                  : "No"}
              </td>
              <td style={{ minWidth: "80px" }} className={`${styles.width200}`}>
                {getRebidCheckbox(
                  item,
                  Settings.tableColumns.to_send_chasemail.field,
                  index,
                  enableSendChaseEmail(item)
                )}
              </td>
              <td style={{ minWidth: "75px" }} className={`${styles.width200}`}>
                {item[Settings.tableColumns.importance.field] === "Y"
                  ? "Yes"
                  : "No"}
              </td>
              <td
                className={`${styles.width200}`}
                style={{ textAlign: "left", minWidth: "120px" }}
              >
                {item[Settings.tableColumns.product_offered.field]}
              </td>
              <td
                className={`${styles.width200}`}
                style={{ textAlign: "left", minWidth: "120px" }}
              >
                {item[Settings.tableColumns.subsetname.field]}
              </td>
              <td
                className={`${styles.width200}`}
                style={{ textAlign: "left", minWidth: "100px" }}
              >
                {item[Settings.tableColumns.city.field]}
              </td>
              <td style={{ minWidth: "90px" }} className={`${styles.width200}`}>
                {item[Settings.tableColumns.state.field]}
              </td>
              <td
                style={{ minWidth: "110px" }}
                className={`${styles.width200}`}
              >
                {item[Settings.tableColumns.country.field]}
              </td>
            </tr>
          );
        }
      });
    }
  };

  return (
    <>
      <div id="dataGrid" className={styles.dataGrid}>
        {props.loader && <CLoader></CLoader>}
        {rebidContext.hideNoData ? null : (
          <>
            {" "}
            <div
              className={classnames(
                styles.table_1,
                gridHasData() ? "" : styles.emptyTable
              )}
              id="table_1"
              onScroll={(e) => {
                const el = document.getElementById("table_2");
                el.scrollTop = e.target.scrollTop;
              }}
            >
              <table style={{ borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.marshacode} ${styles.stickyTop}`}
                      style={{ fontWeight: "bold", height: "50px" }}
                      rowSpan={2}
                    >
                      <a
                        id="rebid-0"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("0")}
                      >
                        MARSHA
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody id="frozenCol">
                  {props.value.portfolioRebidList?.length > 0
                    ? getrowData(true)
                    : noDataFound()}
                </tbody>
              </table>
            </div>
            <div
              id="table_2"
              className={classnames(
                styles.table_2,
                gridHasData() ? "" : styles.emptyTable
              )}
              onScroll={(e) => scolling(e, "table_2")}
            >
              <table style={{ borderSpacing: 0 }}>
                <thead className={styles.stickyTop}>
                  <tr>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.hotelname}`}
                      rowSpan={2}
                      style={{
                        fontWeight: "bold",
                        borderLeft: "1px solid #ACA899",
                      }}
                      id="hotelname"
                    >
                      <a
                        id="rebid-1"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("1")}
                      >
                        Name
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebidHeading}`}
                      colSpan={3}
                      style={{ fontWeight: "bold" }}
                    >
                      Rebid 1
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebidHeading}`}
                      colSpan={3}
                      style={{ fontWeight: "bold" }}
                    >
                      Rebid 2
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebidHeading}`}
                      colSpan={3}
                      style={{ fontWeight: "bold" }}
                    >
                      Rebid 3
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "75px" }}
                    >
                      <a
                        id="rebid-11"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("11")}
                      >
                        Property Responded
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "85px" }}
                    >
                      <a
                        id="rebid-12"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("12")}
                      >
                        Chase Email Sent
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "80px" }}
                    >
                      Send Chase Email
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "75px" }}
                    >
                      <a
                        id="rebid-12"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("18")}
                      >
                        Best &amp; Final
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "120px" }}
                    >
                      <a
                        id="rebid-13"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("13")}
                      >
                        Product
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "120px" }}
                    >
                      <a
                        id="rebid-14"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("14")}
                      >
                        Subset
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "100px" }}
                    >
                      <a
                        id="rebid-15"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("15")}
                      >
                        City
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "90px" }}
                    >
                      <a
                        id="rebid-16"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("16")}
                      >
                        State/Province
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.width200}`}
                      rowSpan={2}
                      style={{ fontWeight: "bold", minWidth: "110px" }}
                    >
                      <a
                        id="rebid-17"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("17")}
                      >
                        Country/Region
                      </a>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "72px" }}
                    >
                      <a
                        id="rebid-2"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("2")}
                      >
                        Rebid
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "76px" }}
                    >
                      <a
                        id="rebid-3"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("3")}
                      >
                        Rebid Due Date
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "90px" }}
                    >
                      <a
                        id="rebid-4"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("4")}
                      >
                        Rebid Status
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "72px" }}
                    >
                      <a
                        id="rebid-5"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("5")}
                      >
                        Rebid
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "76px" }}
                    >
                      <a
                        id="rebid-6"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("6")}
                      >
                        Rebid Due Date
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "90px" }}
                    >
                      <a
                        id="rebid-7"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("7")}
                      >
                        Rebid Status
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "72px" }}
                    >
                      <a
                        id="rebid-8"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("8")}
                      >
                        Rebid
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "76px" }}
                    >
                      <a
                        id="rebid-9"
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("9")}
                      >
                        Rebid Due Date
                      </a>
                    </th>
                    <th
                      className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                      rowSpan={1}
                      style={{ fontWeight: "bold", width: "90px" }}
                    >
                      <a
                        href="javascript:void(0);"
                        onClick={(e) => props.handleOrderChange("10")}
                      >
                        Rebid Status
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody id="gridView">
                  {props.isMakingRequest && (
                    <div className={styles.loaderImg}>
                      <CLoader />
                    </div>
                  )}
                  {getrowData()}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RebidList;
