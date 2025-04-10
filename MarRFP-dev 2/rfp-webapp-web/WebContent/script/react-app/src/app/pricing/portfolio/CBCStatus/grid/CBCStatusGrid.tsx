import React, { Fragment, useEffect, useState, useContext } from "react";
import styles from "./CBCStatusGrid.css";
import Settings from "../static/Settings";
import CCheckbox from "../../../../common/components/CCheckbox";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import CModal from "../../../../common/components/CModal";
import btnSave from "../../../../common/assets/img/btnSave.gif";
import { CLoader } from "../../../../common/components/CLoader";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import moment from "moment";

function CBCStatusGrid(props) {
  const [activeRow, setActiveRow] = useState(null);
  const handleRowSelection = (index: number) => {
    setActiveRow(index);
  };
  const [hotelList, setHotelList] = useState(props.value);
  const [hotelListOriginal, setHotelListOriginal] = useState(props.value);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const closeModal = () => setShowModal(false);
  const [rejectionReasonList, setRejectionReasonList] = useState([]);
  const [hoverRow, setHoverRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  useEffect(() => {
    const elemView = document.getElementById("cbcStatusGrid");

    if (elemView && appContext.tableRefresh) {
      elemView.scrollTop = 0;
      elemView.scrollLeft = 0;
      appContext.setTableRefersh(false);
    }
  }, [appContext.tableRefresh]);

  const onChangeFeildValue = (item, field, value, inputType, e) => {
    const i = item;
    if (inputType == Settings.inputType.radio) {
      i[field] = value;
      i["changed"] = "Y";
    }
    if (value !== "D") {
      i["rejectionreason"] = null;
    }
    setHotelList(hotelList);
    const ids = props.selectedID;
    if (!ids.includes(item.hotelid)) {
      ids.push(item.hotelid);
      props.setSelectedID(ids);
    }
    props.ajaxSave(hotelList);
  };

  const getRadioButton = (index, value, field, inputType, item, isChecked) => {
    return (
      <input
        key={`${index}_${field}_${value}`}
        type={Settings.inputType.radio}
        value={value}
        onChange={(e) => onChangeFeildValue(item, field, value, inputType, e)}
        checked={isChecked}
      />
    );
  };

  const hotelidCheckbox = (rowData, checkboxHotelId) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <CCheckbox
            type={Settings.inputType.checkbox}
            id={Settings.hotelList + rowData.hotelid}
            name={Settings.hotelList + rowData.hotelid}
            onChangeHandler={(e) =>
              props.onChangeFeildValue(rowData, props.selectedHotelId, event)
            }
            checked={checkboxHotelId}
          ></CCheckbox>
        ) : (
          ""
        )}
      </>
    );
  };

  const rejectionReasonLinkClick = (value, item) => {
    setShowModal(value);
    setCurrentItem(item);
  };

  const getRejectionReasonLink = (rowData) => {
    return (
      <>
        <CCheckbox
          type={Settings.inputType.checkbox}
          id={Settings.hotelList + rowData.hotelid}
          name={Settings.hotelList + rowData.hotelid}
          onChangeHandler={(e) => handleRejectionReasonCheckbox(rowData, e)}
        ></CCheckbox>
        &nbsp;
        <a
          href="javascript:void(0);"
          onClick={() => {
            {
              rejectionReasonLinkClick(true, rowData);
            }
          }}
        >
          {rowData.rejectionreason === null
            ? "No Reason Provided"
            : rowData.rejectionreason}
        </a>
      </>
    );
  };

  const handleRejectionReasonCheckbox = (rowData, e) => {
    const val = e.target.checked;
    if (val) {
      rowData["changed"] = "Y";
      rowData["rejectionReasonChecked"] = true;
    }
    setHotelList(hotelList);
  };

  const handleRejectionReasonChanged = (val) => {
    if (currentItem) {
      currentItem["rejectreasonid"] = val;
      const selectedVal = (rejectionReasonList ?? []).find(
        (x) => x.props.value === parseInt(val)
      );
      currentItem["rejectionreason"] = selectedVal.props.children;
      setHotelList(hotelList);
      currentItem["changed"] = "Y";
    }
  };

  const handleSaveUpdateReason = () => {
    if (currentItem["changed"] === "Y") {
      setHotelList(hotelList);
      props.ajaxSave(hotelList);
    }
    closeModal();
    setCurrentItem({});
  };

  const isSolicitated = (item, status) => {
    return (
      (item.isSolicited === "Y" && status === "A") ||
      (item.isSolicited !== "Y" && status === "R")
    );
  };

  const getrowData = () => {
    if (hotelList?.length > 0) {
      return hotelList.map((item, index) => {
        const status = item[Settings.tableColumns.status.field];
        const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
          props.selectedHotelId,
          item,
          Settings.tableColumns.hotelid.field
        );

        return (
          <tr
            className={`${
              index === activeRow
                ? styles.gridRowbarSelected
                : styles.rightPanelRow
            } ${index % 2 ? styles.gridRow : styles.gridRowOdd} `}
            onClick={() => handleRowSelection(index)}
          >
            <td>
              <div className={styles.borderInline}>
                <table cellPadding={0} cellSpacing={0}>
                  <tr>
                    <td
                      style={{ minWidth: "29px" }}
                      className={`${styles.marshacode} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {hotelidCheckbox(item, checkboxHotelId)}
                    </td>
                    <td
                      className={`${styles.marshacodeRow} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {item[Settings.tableColumns.marshacode.field]}
                    </td>
                    <td
                      className={`${styles.hotelnamerow} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      <div className={styles.name}>
                        {item[Settings.tableColumns.hotelName.field]}
                      </div>
                    </td>
                    <td
                      className={`${styles.rebidRow} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {isSolicitated(item, status)
                        ? status === "A"
                          ? "X"
                          : null
                        : getRadioButton(
                            index,
                            "A",
                            Settings.tableColumns.status.field,
                            "radio",
                            item,
                            status === "A"
                          )}
                    </td>
                    <td
                      className={`${styles.rebidRow} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {isSolicitated(item, status)
                        ? status === "D"
                          ? "X"
                          : null
                        : getRadioButton(
                            index,
                            "D",
                            Settings.tableColumns.status.field,
                            "radio",
                            item,
                            status === "D"
                          )}
                    </td>
                    <td
                      className={`${styles.rebidRow} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {isSolicitated(item, status)
                        ? status === "C"
                          ? "X"
                          : null
                        : getRadioButton(
                            index,
                            "C",
                            Settings.tableColumns.status.field,
                            "radio",
                            item,
                            status === "C"
                          )}
                    </td>
                    <td
                      className={`${styles.rebidRow} ${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {isSolicitated(item, status) && status === "R"
                        ? "X"
                        : null}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        width: "211px",
                        minWidth: "211px",
                      }}
                      className={`${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {status === "D" ? getRejectionReasonLink(item) : null}
                    </td>

                    <td
                      style={{ minWidth: "83px", width: "83px" }}
                      className={`${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      <span
                        className={
                          moment(
                            item[Settings.tableColumns.cbcCreateDate.field]
                          ).valueOf() >
                          moment(
                            item[Settings.tableColumns.strCbc_softduedate.field]
                          ).valueOf()
                            ? styles.redColor
                            : ""
                        }
                      >
                        {item[Settings.tableColumns.cbcCreateDate.field]}
                      </span>
                    </td>
                    <td
                      style={{
                        width: "101px",
                        minWidth: "101px",
                        paddingLeft: "2px",
                      }}
                      className={`${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {item[Settings.tableColumns.city.field]}
                    </td>
                    <td
                      style={{
                        width: "53px",
                        minWidth: "53px",
                        textAlign: "center",
                      }}
                      className={`${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {item[Settings.tableColumns.state.field]}
                    </td>
                    <td
                      style={{
                        width: "73px",
                        minWidth: "73px",
                        textAlign: "center",
                      }}
                      className={`${
                        index % 2 ? styles.gridRow : styles.gridRowOdd
                      } ${
                        hoverRow == index
                          ? styles.hoverClass
                          : selectedRow == index && styles.selectClass
                      }`}
                      onMouseOver={() => setHoverRow(index)}
                      onMouseLeave={() => setHoverRow(null)}
                      onClick={() => setSelectedRow(index)}
                    >
                      {item[Settings.tableColumns.country.field]}
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return props.dataMessageVisible ? (
        <tr>
          <td
            colSpan={9}
            style={{
              width: "1136px",
              verticalAlign: "middle",
              height: "21px",
              backgroundColor: " white",
              textAlign: "center",
              minHeight: "21px",
              display: "block",
            }}
          >
            No Data Found
          </td>
        </tr>
      ) : (
        <tr></tr>
      );
    }
  };

  useEffect(() => {
    if (props.value.length) {
      setHotelList(props.value);
      setHotelListOriginal(props.value);
    } else {
      setHotelList([]);
      setHotelListOriginal([]);
    }
    if (props.removalReasonList) {
      console.info(props.removalReasonList);
    }
  }, [props]);

  useEffect(() => {
    if (props.rejectionReasonsData && props.rejectionReasonsData.length > 0) {
      const list = (props.rejectionReasonsData ?? [])?.map((item) => {
        return (
          <option value={item.rejectreasonid}>{item.rejectionreason}</option>
        );
      });

      setRejectionReasonList(list);
    }
  }, [props.rejectionReasonsData]);

  return (
    <>
      <CModal
        title="Rejection Reason"
        onClose={closeModal}
        show={showModal}
        xPosition={-170}
        yPosition={-50}
      >
        <div style={{ padding: "10px" }}>
          <Fragment>
            <table cellSpacing={0} cellPadding={0}>
              <tbody>
                {rejectionReasonList.length === 0 ? (
                  <span className="wait" style={{ paddingLeft: 20 }}>
                    Please wait loading...
                  </span>
                ) : (
                  <Fragment>
                    <tr>
                      <td className="field_Name" width="150px" align="left">
                        <div id="rrhdiv">
                          <b>Rejection Reason:</b>
                        </div>
                      </td>
                      <td className="Field_Value" align="left">
                        <div id="rrsdiv">
                          <select
                            id="rejectionreasonid"
                            name="rejectionreasonid"
                            style={{ fontSize: "8pt" }}
                            autoFocus={true}
                            onChange={(event) => {
                              handleRejectionReasonChanged(event.target.value);
                            }}
                          >
                            <option value="" />

                            {rejectionReasonList ||
                              []?.map((item) => {
                                return (
                                  <option
                                    value={item.rejectionreasonid}
                                    selected={
                                      currentItem &&
                                      currentItem["rejectionreasonid"] ===
                                        item.rejectionreasonid
                                    }
                                  >
                                    {item.rejectionreason}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                )}
                <tr>
                  <td style={{ height: "10px" }} />
                </tr>
                <tr>
                  <td colSpan={2} valign="bottom" align="center">
                    <img
                      src={btnSave}
                      style={{ cursor: "hand" }}
                      onClick={handleSaveUpdateReason}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Fragment>
        </div>
      </CModal>
      <div
        id="dataGrid"
        style={{
          width: "calc(100vw - 308px)",
          display: "flex",
        }}
      >
        <div
          id="cbcStatusGrid"
          style={{
            width: "auto",
            height: "calc(100vh - 192px)",
            backgroundColor: "rgb(238, 240, 236)",
            marginLeft: "1px",
            display: "inline-block",
            marginTop: "46px",
          }}
        >
          <div className={styles.cbcstatusgridheader}>
            <table cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th className={styles.unfixedColumn}>
                    <div>
                      <table cellPadding={0} cellSpacing={0}>
                        <tr>
                          <th
                            style={{ width: "29px", minWidth: "29px" }}
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.marshacode}`}
                            rowSpan={2}
                          ></th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.marshacode}`}
                            rowSpan={2}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("0")}
                            >
                              MARSHA
                            </a>
                          </th>

                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.hotelname}`}
                            rowSpan={2}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("1")}
                            >
                              Name
                            </a>
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebidHeading}`}
                            colSpan={4}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("2")}
                            >
                              Status
                            </a>
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell}`}
                            rowSpan={2}
                            style={{
                              width: "208px",
                              minWidth: "208px",
                              verticalAlign: "middle",
                            }}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("3")}
                            >
                              Rejection Reason
                            </a>
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell}`}
                            style={{
                              width: "80px",
                              minWidth: "80px",
                              verticalAlign: "middle",
                            }}
                            rowSpan={2}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("4")}
                            >
                              CBC Create Date
                            </a>
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell}`}
                            style={{
                              width: "100px",
                              minWidth: "100px",
                              verticalAlign: "middle",
                            }}
                            rowSpan={2}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("15")}
                            >
                              City
                            </a>
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell}`}
                            rowSpan={2}
                            style={{
                              width: "50px",
                              minWidth: "50px",
                              verticalAlign: "middle",
                              textAlign: "center",
                            }}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("16")}
                            >
                              State/ Province
                            </a>
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell}`}
                            rowSpan={2}
                            style={{
                              width: "70px",
                              minWidth: "70px",
                              verticalAlign: "middle",
                            }}
                          >
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => props.handleOrderChange("7")}
                            >
                              Country/ Region
                            </a>
                          </th>
                        </tr>
                        <tr>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                            rowSpan={1}
                          >
                            Accepted
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                            rowSpan={1}
                          >
                            Rejected
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                            rowSpan={1}
                          >
                            Pending
                          </th>
                          <th
                            className={`${styles.gridHeader} ${styles.gridCell} ${styles.rebid}`}
                            rowSpan={1}
                          >
                            Requested
                          </th>
                        </tr>
                      </table>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className={styles.cbcstatusgridbody}>
            <table>
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
        </div>
      </div>
    </>
  );
}

export default CBCStatusGrid;
