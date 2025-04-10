import React, { Fragment, useContext, useEffect, useState } from "react";
import CModal from "../../../../common/components/CModal";
import GPPPGOOSMaintenanceContext, {
  initialUpdatePayload,
} from "../context/GPPPGOOSMaintenanceContext";
import styles from "./hotelGPPPGOOSMaintenance.css";
import btnSave from "../../../../common/assets/img/btnSave.gif";
import { CNoDataFound } from "../../../../common/components/CNoDataFound";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

export function HotelGPPPGOOSTableRows(props: any) {
  const [panelList, setPanelList] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [showUpdateDropdown, setShowUpdateDropdown] = useState(true);
  const [currentUpdateItem, setCurrentUpdateItem] = useState<any>({});
  const contexts = useContext(GPPPGOOSMaintenanceContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const { setSaveUpdateReasonData, saveUpdateReasonData } = contexts;
  const [checkInitialLoad, setCheckInitialLoad] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    setPanelList(props.panelData);
    setCheckInitialLoad(true);
  }, [props.panelData, panelList]);

  useEffect(() => {
    const elemView = document.getElementById("gridView");

    if (elemView && appContext.tableRefresh) {
      elemView.scrollTop = 0;
      elemView.scrollLeft = 0;
      appContext.setTableRefersh(false);
    }
  }, [appContext.tableRefresh]);

  const handleSaveUpdateReason = () => {
    if (
      (saveUpdateReasonData.pgoos === "N" &&
        !saveUpdateReasonData.removalreasonid &&
        !currentUpdateItem.removalreasonid) ||
      (saveUpdateReasonData.pgoos === "N" &&
        saveUpdateReasonData.removalreasonid === "")
    ) {
      alert("Please select a valid rejection reason or hit cancel to exit.");
    } else {
      setShowModal(false);
      setSaveUpdateReasonData(initialUpdatePayload);
      contexts.saveUpdateReason();
    }
  };

  const handleRowSelection = (index: number) => {
    const elements = document.querySelectorAll("#gridTableView tr");
    const highlight = "_3iyxNCHPnMdk34KcXaNLaw==";

    elements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
    });

    setActiveRow(index);
    appContext.setactiveRowPortfolio(index);
    appContext.setPrevRowPortfolio(index);
    appContext.setPrevGridRowIndexTableOne(index);
    appContext.setpgoosGridRowHighlight(true);
    appContext.setpgoosFilterRowHighlight(false);
    //setActiveRow(index);
  };

  const handleDisplayPanelData = () => {
    const activeIndex = appContext?.activeRowPortfolio;
    return panelList?.map((item, index) => {
      return (
        <tr
          key={index}
          className={`${index % 2 ? styles.gridRow : styles.gridRowOdd} ${
            styles.gridRowTable
          } ${
            !appContext.pgoosFilterRowHighlight &&
            appContext.pgoosGridRowHighlight &&
            index === parseInt(activeIndex)
              ? styles.gridRowbarSelected
              : styles.rightPanelRow
          } `}
          id="panelCurrentRow"
          style={{ height: 21 }}
          onClick={() => handleRowSelection(index)}
        >
          <td
            style={{ width: "60px", minWidth: "60px" }}
            className={styles.gridCell}
          >
            {item.marshaCode}
          </td>
          <td
            style={{ width: "220px", minWidth: "220px" }}
            className={styles.gridCell}
          >
            {item.hotelname}
          </td>

          <td
            style={{ width: "61px", minWidth: "61px" }}
            className={styles.gridCell}
          >
            {item.pgoos === "Y" ? "Yes" : "No"}
          </td>
          <td
            style={{ width: "150px", minWidth: "150px" }}
            className={styles.gridCell}
          >
            {item.pgoos !== "Y" && item.removalreason}
          </td>
          <td
            style={{ width: "110px", minWidth: "110px" }}
            className={styles.gridCell}
          >
            {item.city}
          </td>
          <td
            style={{ width: "66px", minWidth: "66px" }}
            className={styles.gridCell}
          >
            {item.state}
          </td>
          <td
            style={{
              width: "60px",
              minWidth: "60px",
            }}
            className={styles.gridCell}
          >
            {item.country}
          </td>
          <td
            style={{
              textAlign: "left",
              width: "100px",
              minWidth: "100px",
            }}
            className={styles.gridCell}
          >
            <a
              onClick={() => {
                setShowModal(true);
                setCurrentUpdateItem(item);
                props.removalReasonFunc(item);
                setShowUpdateDropdown(item.pgoos === "Y");
                setSaveUpdateReasonData({
                  ...saveUpdateReasonData,
                  pgoos: item.pgoos,
                  hotelid: item.hotelid,
                });
              }}
            >
              Update
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div
      style={{
        height: "calc(100vh - 180px)",
        overflow: "auto",
      }}
      id="gridView"
      className={`${styles.gridView} ${styles.gppTabledata}`}
    >
      <CModal title="Removal Reason" onClose={closeModal} show={showModal}>
        <div style={{ padding: "10px" }}>
          <Fragment>
            <table cellSpacing={0} cellPadding={0}>
              <tbody>
                {props.removalReason.length === 0 ? (
                  <span className="wait">Please wait loading...</span>
                ) : (
                  <Fragment>
                    <tr>
                      <td className="field_Name" width="150px" align="left">
                        <b>PGOOS</b>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="pgoosStatus"
                          name="pgoosStatus"
                          defaultChecked
                          defaultValue="Y"
                          onChange={(event) => {
                            setShowUpdateDropdown(event.target.checked);
                            setSaveUpdateReasonData({
                              ...saveUpdateReasonData,
                              hotelid: currentUpdateItem.hotelid,
                              pgoos: event.target.checked ? "Y" : "N",
                              changed: "Y",
                            });
                          }}
                          checked={showUpdateDropdown}
                        />
                      </td>
                    </tr>
                    {!showUpdateDropdown && (
                      <tr>
                        <td
                          className="field_Name"
                          width="150px"
                          align="left"
                          style={{ fontWeight: "bold" }}
                        >
                          <div id="rrhdiv">PGOOS Removal Reason:</div>
                        </td>
                        <td className="Field_Value" align="left">
                          <div id="rrsdiv">
                            <select
                              id="removalreasonid"
                              name="removalreasonid"
                              style={{ fontSize: "8pt" }}
                              onChange={(event) => {
                                setSaveUpdateReasonData({
                                  ...saveUpdateReasonData,
                                  changed: "Y",
                                  removalreasonid:
                                    event.target.value == ""
                                      ? 0
                                      : event.target.value,
                                });
                              }}
                            >
                              <option value="" />

                              {props.removalReason?.map((item) => {
                                return (
                                  <option
                                    value={item.removalreasonid}
                                    selected={
                                      currentUpdateItem.removalreasonid ===
                                      item.removalreasonid
                                    }
                                  >
                                    {item.removalreason}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </td>
                      </tr>
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
                  </Fragment>
                )}
              </tbody>
            </table>
          </Fragment>
        </div>
      </CModal>
      {panelList?.length > 0 ? (
        <table
          style={{ height: "21px" }}
          className={`${styles.gridRowTable} ${styles.zeroHeight}`}
          id="gridTableView"
        >
          <tbody>{handleDisplayPanelData()}</tbody>
        </table>
      ) : (
        checkInitialLoad && contexts.checkInitialLoad && <CNoDataFound />
      )}
    </div>
  );
}
