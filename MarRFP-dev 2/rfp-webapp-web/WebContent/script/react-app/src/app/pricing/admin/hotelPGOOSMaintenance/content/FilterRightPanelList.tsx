import React, { useContext, useEffect, useState, useRef } from "react";
import VirtualScroll from "react-dynamic-virtual-scroll";
import styles from "./HotelPGOOSMaintenance.css";
import btnSave from "../../../../common/assets/img/btnSave.gif";
import CModal from "../../../../common/components/CModal";
import { labels } from "../static/labels";
import { WhosChanged } from "../../../../common/components/filter/WhosChanged";
import HotelPGOOSMaintenanceContext from "../context/HotelPGOOSMaintenanceContext";
import { CNoDataFound } from "../../../../common/components/CNoDataFound";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

export function FilterRightPanelList(props: any) {
  const [panelList, setPanelList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [checkInitialLoad, setCheckInitialLoad] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const contexts = useContext(HotelPGOOSMaintenanceContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const virtualScrollRef = useRef();

  const [showWhosChangedModal, setShowWhosChangedModal] = useState({
    show: false,
    clickedItem: [],
  });
  const [saveReason, setSaveReason] = useState({
    id: "",
    reason: "",
    type: "",
    reasonId: "",
  });

  /**
   *
   * @param reasonType
   */
  const getReasonID = (reasonType: string) =>
    props.removalReason.filter((el) => el.removalreason === reasonType)[0]
      ?.removalreasonid || 0;

  /**
   *
   */
  const handleSetSavePayload = () => {
    const list = panelList.length > 0 ? panelList : props.panelData;
    const ppData = list?.map((item, index) => {
      return {
        changed: item.changed || "N",
        hotelid: item.hotelid,
        marshaCode: item.marshaCode,
        pgoos: item.pgoos,
        excludeaer: item.excludeaer,
        removalreason: item.removalreason,
        aerpgoos: item.aerpgoos,
        aerremovalreason: item.aerremovalreason,
        willnotprice: item.willnotprice,
        removalreasonid: getReasonID(item.removalreason),
        aerremovalreasonid: getReasonID(item.aerremovalreason),
      };
    });
    contexts?.setSaveRequestPayload({
      ...contexts?.saveRequestPayload,
      strHotelPGOOSListData: ppData,
    });
  };
  useEffect(() => {
    setPanelList(props.panelData);
    setCheckInitialLoad(true);
    handleSetSavePayload();
  }, [props.panelData, panelList]);

  /**
   *
   * @param checked
   * @param rowItem
   * @param name
   * @param removalName
   */
  const handlePGoosCheck = (checked, rowItem, name, removalName) => {
    const objIndex = panelList.findIndex(
      (item) => item.hotelid === rowItem.hotelid
    );
    const reasonType =
      saveReason.type === "aerremovalreason"
        ? "aerremovalreasonid"
        : "removalreasonid";
    const isChecked = checked ? "Y" : "N";
    if (objIndex >= 0) {
      panelList[objIndex][name] = isChecked;
      if (checked) {
        panelList[objIndex][reasonType] = 0;
        panelList[objIndex][removalName] = labels.noReason;
      }
      panelList[objIndex].changed = "Y";
      setPanelList([...panelList]);
      setSaveReason({
        ...saveReason,
        id: rowItem.hotelid,
        reason: rowItem.removalreason,
      });
    }
  };

  const handleWillPrice = (checked, rowItem) => {
    const objIndex = panelList.findIndex(
      (item) => item.hotelid === rowItem.hotelid
    );

    const isChecked = checked ? "Y" : "N";
    if (objIndex >= 0) {
      panelList[objIndex].willnotprice = isChecked;
      panelList[objIndex].changed = "Y";

      setPanelList([...panelList]);
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
  };

  const scrollList = (e) => {
    if (virtualScrollRef.current) {
      virtualScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      virtualScrollRef.current.scrollHook(e.target);
    }
  };

  /**
   *
   */
  const handleDisplayPanelData = () => {
    if (panelList?.length > 0) {
      return (
        <VirtualScroll
          {...props}
          ref={virtualScrollRef}
          className={styles.virtualScrollDiv}
          minItemHeight={20}
          totalLength={panelList?.length || 0}
          renderItem={renderItem}
        />
      );
    }
  };

  const renderItem = (index) => {
    const activeIndex = appContext?.activeRowPortfolio;
    const data = panelList[index];
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
        style={{ width: 901, height: 21 }}
        onClick={() => handleRowSelection(index)}
      >
        <td
          style={{ width: "60px", minWidth: "60px" }}
          className={styles.gridCell}
        >
          {data?.marshaCode}
        </td>
        <td
          style={{ width: "50px", minWidth: "50px" }}
          className={styles.gridCell}
        >
          <input
            type="checkbox"
            id="hotelPGOOSListData[0].pgoos"
            name="hotelPGOOSListData[0].pgoos"
            checked={data.pgoos === "Y"}
            defaultValue="Y"
            onChange={(event) =>
              handlePGoosCheck(
                event.target.checked,
                data,
                "pgoos",
                "removalreason"
              )
            }
          />
        </td>
        <td
          style={{ width: "150px", minWidth: "150px" }}
          className={styles.gridCell}
        >
          <div id="rrdiv_0">
            {data.pgoos === "N" && (
              <a
                href="javascript:void(0);"
                id="removalreason_0"
                onClick={() => {
                  setSaveReason({
                    ...saveReason,
                    id: data.hotelid,
                    type: "removalreason",
                    reason: data.removalreason,
                  });
                  props.removalReasonFunc(false);
                  setShowModal(true);
                }}
              >
                {data.removalreason}
              </a>
            )}
          </div>
        </td>
        <td
          style={{ width: "50px", minWidth: "50px" }}
          className={styles.gridCell}
        >
          {data?.excludeaer === "N" && (
            <input
              type="checkbox"
              id="hotelPGOOSListData[0].aerpgoos"
              name="hotelPGOOSListData[0].aerpgoos"
              defaultChecked={data.aerpgoos === "Y"}
              defaultValue="Y"
              onChange={(event) =>
                handlePGoosCheck(
                  event.target.checked,
                  data,
                  "aerpgoos",
                  "aerremovalreason"
                )
              }
            />
          )}
        </td>
        <td
          style={{ width: "150px", minWidth: "150px" }}
          className={styles.gridCell}
        >
          {data?.excludeaer === "N" && (
            <div id="ardiv_0">
              {data.aerpgoos === "N" && (
                <a
                  href="javascript:void(0);"
                  id="removalreason_0"
                  onClick={() => {
                    setSaveReason({
                      ...saveReason,
                      id: data.hotelid,
                      type: "aerremovalreason",
                      reason: data.aerremovalreason,
                    });
                    props.removalReasonFunc(true);

                    setShowModal(true);
                  }}
                >
                  {data.aerremovalreason}
                </a>
              )}
            </div>
          )}
        </td>
        <td
          style={{ width: "50px", minWidth: "50px" }}
          className={styles.gridCell}
        >
          <input
            type="checkbox"
            id="hotelPGOOSListData[0].willnotprice"
            name="hotelPGOOSListData[0].willnotprice"
            defaultChecked={data.willnotprice === "Y"}
            onChange={(event) => handleWillPrice(event.target.checked, data)}
          />
        </td>
        <td
          style={{ width: "110px", minWidth: "110px" }}
          className={styles.gridCell}
        >
          {data.city}
        </td>
        <td
          style={{
            textAlign: "center",
            width: "60px",
            minWidth: "60px",
          }}
          className={styles.gridCell}
        >
          {data.state}
        </td>
        <td
          style={{
            textAlign: "center",
            width: "60px",
            minWidth: "60px",
          }}
          className={styles.gridCell}
        >
          {data.country}
        </td>
        <td
          style={{ width: "100px", minWidth: "100px" }}
          className={styles.gridCell}
        >
          <a
            href="javascript:void(0);"
            onClick={() => {
              props.getPGOOSAuditTrailDetail(data.marshaCode);
              setShowWhosChangedModal({
                ...showWhosChangedModal,
                show: true,
                clickedItem: data,
              });
            }}
          >
            Who changed
          </a>
        </td>
      </tr>
    );
  };

  const handleSaveRemoveReason = () => {
    if (saveReason.reason) {
      const name = saveReason.type;
      const objIndex = panelList.findIndex(
        (item) => item.hotelid === saveReason.id
      );
      if (objIndex >= 0) {
        const reasonType =
          saveReason.type === "aerremovalreason"
            ? "aerremovalreasonid"
            : "removalreasonid";
        panelList[objIndex][name] = saveReason.reason;
        panelList[objIndex].changed = "Y";
        panelList[objIndex][reasonType] = saveReason.reasonId;
        setPanelList([...panelList]);
      }
    }
    closeModal();
  };

  return (
    <div
      style={{
        height: "calc(100vh - 180px)",
        overflow: "hidden auto",
        width: "100%",
      }}
      id="gridView"
      className={styles.gridView}
    >
      <CModal
        title={
          saveReason.type === "aerremovalreason"
            ? "GPP Removal Reason"
            : "Removal Reason"
        }
        onClose={closeModal}
        show={showModal}
      >
        <div
          data-dojo-attach-point="containerNode"
          className={styles.dijitDialogPaneContent}
          style={{ margin: "10px" }}
        >
          {props.removalReason?.length === 0 ? (
            <span className="wait">Please wait loading...</span>
          ) : (
            <table cellSpacing={0} cellPadding={0}>
              <tbody>
                <tr>
                  <td className={styles.Field_Name} width="150px" align="left">
                    {saveReason.type === "aerremovalreason"
                      ? "PGOOS GPP Removal Reason:"
                      : "PGOOS Removal Reason:"}
                  </td>
                  <td className={styles.Field_Value} align="left">
                    <select
                      id="removalreasonid"
                      name="removalreasonid"
                      style={{ fontSize: "8pt" }}
                      onChange={(event) =>
                        setSaveReason({
                          ...saveReason,
                          reason: event.target.value
                            ? event.target.options[event.target.selectedIndex]
                                .text
                            : labels.noReason,
                          reasonId: event.target.value,
                        })
                      }
                      autoFocus={true}
                    >
                      <option />

                      {props.removalReason?.map((item) => {
                        return (
                          <option
                            value={item.removalreasonid}
                            selected={item.removalreason === saveReason.reason}
                          >
                            {item.removalreason}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ height: "10px" }} />
                </tr>
                <tr>
                  <td colSpan={2} valign="bottom" align="center">
                    <img
                      src={btnSave}
                      style={{ cursor: "hand" }}
                      onClick={handleSaveRemoveReason}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </CModal>
      {panelList?.length > 0 ? (
        <table
          style={{ width: "100%", scrollBehavior: "smooth" }}
          className={`${styles.gridRowTable} ${styles.zeroHeight}`}
          id="gridTableView"
          onScroll={scrollList}
        >
          <tbody>{handleDisplayPanelData()}</tbody>
        </table>
      ) : (
        checkInitialLoad && contexts.checkInitialLoad && <CNoDataFound />
      )}

      {showWhosChangedModal.show && (
        <WhosChanged
          pGOOSAuditTrailDetails={contexts.PGOOSAuditTrailDetail}
          isMakingDetailRequest={contexts.isMakingDetailRequest}
          showWhosChangedModal={showWhosChangedModal}
          closeModal={() =>
            setShowWhosChangedModal({
              ...showWhosChangedModal,
              show: false,
            })
          }
        />
      )}
    </div>
  );
}
