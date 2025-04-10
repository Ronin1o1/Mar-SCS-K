import React, { useContext, useEffect, useState } from "react";
import styles from "./CResultGrid.css";
import classNames from "classnames";
import Settings from "../../static/Settings";
import { useHistory, useLocation } from "react-router-dom";
import btnprint from "../../../../../../common/assets/img/button/btnPriceIt.gif";
import btncancel from "../../../../../../common/assets/img/button/btnCancel.gif";
import btnok from "../../../../../../common/assets/img/button/btnOK.gif";
import btnquestionRed from "../../../../../../common/assets/img/button/btnQuestionsRed.gif";
import saveBtn from "../../../../../../common/assets/img/button/btnSave.gif";
import btnquestion from "../../../../../../common/assets/img/button/btnQuestions.gif";
import completed from "../../../../../../common/assets/img/w_completed.gif";
import revisit from "../../../../../../common/assets/img/w_revisita.gif";
import rejected from "../../../../../../common/assets/img/rejectedD.gif";
import cbcRejected from "../../../../../../common/assets/img/cbc_rejected.gif";
import noSquatter from "../../../../../../common/assets/img/nosquatter.gif";
import cbcAccepted from "../../../../../../common/assets/img/cbc_accepted.gif";
import cbcRequest from "../../../../../../common/assets/img/cbc_request.gif";
import cbcCompleted from "../../../../../../common/assets/img/cbc_completed.gif";
import requestImg from "../../../../../../common/assets/img/requested.gif";
import acceptedImg from "../../../../../../common/assets/img/accepted.gif";
import lockedImg from "../../../../../../common/assets/img/locked.gif";
import wifi from "../../../../../../common/assets/img/wifi.gif";
import isnew from "../../../../../../common/assets/img/new.gif";
import rollOver from "../../../../../../common/assets/img/roll_over.png";
import aer from "../../../../../../common/assets/img/aer.gif";
import aerlevel1 from "../../../../../../common/assets/img/aerlevel1.gif";
import noview from "../../../../../../common/assets/img/noview.gif";
import offCycle from "../../../../../../common/assets/img/off_cycle.gif";
import btBookingCost from "../../../../../../common/assets/img/bt_booking_cost.png";
import toYear from "../../../../../../common/assets/img/two_year.gif";
import CModal from "../../../../../../common/components/CModal";

import rebid from "../../../../../../common/assets/img/rebid.gif";
import rebidDecline from "../../../../../../common/assets/img/rebid_decline.gif";
import rebidAccept from "../../../../../../common/assets/img/rebid_accept.gif";

import rebid2 from "../../../../../../common/assets/img/rebid2.gif";
import rebidDecline2 from "../../../../../../common/assets/img/rebid_decline2.gif";
import rebidAccept2 from "../../../../../../common/assets/img/rebid_accept2.gif";

import rebid3 from "../../../../../../common/assets/img/rebid3.gif";
import rebidDecline3 from "../../../../../../common/assets/img/rebid_decline3.gif";
import rebidAccept3 from "../../../../../../common/assets/img/rebid_accept3.gif";
//import API from "../../service/API";
import HotelPricingContext from "../../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../common/components/ApplicationContext";
import data from "../../../../../admin/PeriodMaintenance/data";
import { colors } from "react-select/src/theme";

let parentContextType = null;
function CResultList(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const editData = props.data?.hotelAccountCenterList;
  const priceBtnData = props.priceBtnProduct;
  const hotelId = props.hotelData?.hotelid;
  const nobidResonList: any = Array.from(props.reason);
  const editedDataObj = [];
  const updatedRows = [];
  let columnList = [];
  let index;
  const contextType = null;

  useEffect(() => {
    if (editData && editData.length > 0) {
      onBestandFinalCheckboxforSave(0, "N");
    }

    if (props.scrollToMarsha) {
      const marshaCode = props.scrollToMarsha;
      if (editData && editData.length > 0) {
        const index = editData.findIndex((x) => x.marshacode === marshaCode);

        const scrollToElement = document.getElementById("row" + index);
        if (scrollToElement !== undefined) {
          scrollToElement.style.scrollMargin = "150px";
          scrollToElement?.scrollIntoView();
        }
      }
    }
  }, [editData && editData.length > 0]);
  let userDetails = useContext(ApplicationContext);
  if (
    props.resultGridId != undefined &&
    props.resultGridId == "updateHotelResult"
  ) {
    userDetails = {
      role: "adming",
    };
  }

  const updateArray = {
    hotel_accountinfoid: "",
    accountrecid: "",
    changed: "N",
    origratetype_selected: null,
    currimportance: "N",
    importance: "N",
    nobidreasonid: 0,
    ratetype_selected: null,
  };
  const urlParms = useLocation().search;
  const hotel_rfpid = new URLSearchParams(urlParms).get("Hotelrfpid");
  const [accountList, setAccountList] = useState([props.data]);
  const [nobidList, setNobidList] = useState([props.reason]);
  const [activeRow, setActiveRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalPO, setShowModalPO] = useState(false);
  const [selectedNobidReason, setselectedNobReason] = useState("");
  const [selectedNobidid, setselectedNobid] = useState("");
  const [saveNoBid, setSaveNoBid] = useState(false);
  const [savePO, setSavePO] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [theArray, setTheArray] = useState([]);
  const [saveList, setSaveList] = useState([]);
  const [selectedNobidObj, setselectedNobidObj] = useState([]);
  const [rateTypeArray, setrateTypeArray] = useState([]);
  const [showNoBidMsg, setNobidAlert] = useState(false);
  const [singleRowArray, setSingleRowArray] = useState({});
  const closeModalPO = () => {
    setShowModalPO(false);
    setSavePO("");
  };
  const closeModal = () => {
    setShowModal(false);
    editData[activeRow].ratetype_selected = 17;
    if (editData[activeRow].nobidreason == "Select a no bid reason") {
      editData[activeRow].nobidreasonid = 0;
      editData[activeRow].nobidreason = "Select a no bid reason";
      setselectedNobReason("");

      const alert1 = editData.filter(
        (res) =>
          res.nobidreason === "Select a no bid reason" ||
          res.ratetype_selected === 17
      );

      if (alert1.length !== 0) {
        props.onNobidAAlert(false);
      }
    }
  };
  const currentIndex = (index) => {
    setActiveRow(index);
  };
  props.ajaxSave(saveList, showNoBidMsg, isChecked, saveNoBid, singleRowArray);
  const getnobiddata = (excludeaer, aer_account) => {
    if ((excludeaer === "N" || !excludeaer) && aer_account === "Y") {
      return Settings.searchResult.colName.viewGPPPricing;
    } else {
      return Settings.searchResult.colName.viewNBPricing;
    }
  };
  const getrowData = () => {
    return (
      <div
        className={
          props.resultGridId === "updateHotelResult"
            ? ""
            : styles.accountTableBlock
        }
      >
        {props.noDataFound ? (
          <>
            <div className={styles.nodataFound}>
              {Settings.searchResult.nodataFound}
            </div>
            <div
              className={`${
                props.resultGridId === "updateHotelResult"
                  ? styles.updateNoResult
                  : ""
              }`}
            ></div>
          </>
        ) : (
          <div
            id={props.resultGridId}
            className={`${
              userDetails?.user?.isPASAdmin
                ? (styles.gridcpacScroll,
                  styles.gridcpacScrollwidth,
                  styles.fixedTableHeight)
                : props.isUpdateMultiple
                ? styles.updateTableScroll
                : !userDetails?.user?.isPASAdmin
                ? styles.gridcpacScroll1
                : styles.gridcpacScroll2
            }`}
          >
            {editData?.map((data, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  id={"row" + index}
                  className={`${styles.gridHover} ${styles.fordoubleborder}`}
                >
                  <tr
                    onClick={() => {
                      currentIndex(index);
                    }}
                    className={`${
                      index === activeRow
                        ? styles.gridRowbarSelected
                        : styles.rightPanelRow
                    } ${index % 2 ? styles.gridRow : styles.gridRowOdd} `}
                  >
                    <td
                      className={classNames(
                        styles.gridCell,
                        styles.statusRow,
                        styles.cpaccompletionstatus
                      )}
                    >
                      {data.screenstatus === "C" ? (
                        <img src={completed}></img>
                      ) : data.screenstatus === "R" ? (
                        <img src={revisit}></img>
                      ) : (
                        ""
                      )}
                    </td>
                    {!props.isUpdateMultiple && (
                      <>
                        <td
                          className={classNames(
                            styles.gridCell,
                            styles.cbcStatusRow
                          )}
                        >
                          {getCBCStatus(data.cbcstatus, index)}
                        </td>
                        <td
                          className={classNames(
                            styles.gridCell,
                            styles.accountStatusRow,
                            styles.accounstatuscenteralign
                          )}
                        >
                          {getAccountStatus(data.accountStatus, index)}
                        </td>
                      </>
                    )}
                    <td
                      className={classNames(
                        styles.gridCell,
                        props.isUpdateMultiple
                          ? styles.width40
                          : styles.rebidStatusRow
                      )}
                    >
                      {getRebidStatus(
                        data.rebidstatus,
                        data.rebid_level,
                        index
                      )}
                    </td>
                    {props.isUpdateMultiple && (
                      <td
                        className={classNames(
                          styles.gridCell,
                          styles.updatemultiaccountStatusRow,
                          styles.accounstatuscenteralign
                        )}
                      >
                        {getAccountStatus(data.accountStatus, index)}
                      </td>
                    )}
                    {props.isUpdateMultiple ? (
                      <td
                        className={classNames(
                          styles.gridCell,
                          styles.hotelName,
                          styles.updatePadding
                        )}
                      >
                        {data.marshacode} - {data.hotelname}
                      </td>
                    ) : (
                      <td
                        className={classNames(
                          styles.gridCell,
                          styles.accountNameRow
                        )}
                      >
                        <a
                          href="#"
                          style={{ marginRight: "0px" }}
                          onClick={() => {
                            event.preventDefault();
                            onAccountName(data.accountrecid);
                          }}
                        >
                          {data.accountname}
                        </a>
                        <span>
                          {data.aer_account != null &&
                          data.aer_account === "Y" &&
                          (data.excludeaer === null ||
                            data.excludeaer === "" ||
                            (data.excludeaer != null &&
                              data.excludeaer === "N")) ? (
                            <span>
                              {data.ismaxaer && data.ismaxaer === "Y" ? (
                                <img src={aerlevel1}></img>
                              ) : (
                                <img src={aer}></img>
                              )}
                            </span>
                          ) : (
                            ""
                          )}

                          {data.noSquatter === "Y" ? (
                            <img src={noSquatter}></img>
                          ) : (
                            ""
                          )}
                          {data.hotel_display === "N" ? (
                            <img src={noview}></img>
                          ) : (
                            ""
                          )}
                          {data.accountpricingcycleid == 2 ? (
                            <img src={toYear}></img>
                          ) : (
                            ""
                          )}
                          {data.accountpricingcycleid == 3 ? (
                            <img src={offCycle}></img>
                          ) : (
                            ""
                          )}
                          {data.isNew === "Y" ? <img src={isnew}></img> : ""}
                          {data.top_account === "Y" ? (
                            <img src={wifi}></img>
                          ) : (
                            ""
                          )}
                          {data.bt_booking_cost === "Y" ? (
                            <img src={btBookingCost}></img>
                          ) : (
                            ""
                          )}
                          {data.roll_over === "Y" ? (
                            <img src={rollOver}></img>
                          ) : (
                            ""
                          )}
                        </span>
                      </td>
                    )}
                    {!props.isUpdateMultiple && (
                      <td
                        className={classNames(
                          styles.gridCell,
                          styles.dueDateRow
                        )}
                      >
                        {data.strDuedate}
                      </td>
                    )}
                    {userDetails?.user?.isPASAdmin ? (
                      <td
                        className={classNames(
                          styles.gridCell,
                          styles.salesGroupRow
                        )}
                      >
                        {data.accounttypedescription}
                      </td>
                    ) : (
                      ""
                    )}
                    {!props.isUpdateMultiple && (
                      <>
                        <td
                          className={classNames(
                            styles.gridCell,
                            styles.rightPanelRow,
                            styles.priceRow
                          )}
                        >
                          {" "}
                          <img
                            style={{ cursor: "pointer" }}
                            src={btnprint}
                            onClick={() => {
                              getProductOfferedDropDown(
                                index,
                                data.ratetype_selected,
                                data.volunteeredratetype,
                                data.allow_floatnociel,
                                data.allowHotelcanPriceFloatVP,
                                data.hotelAccountCenterView
                              );
                            }}
                          ></img>
                        </td>
                        <td className={styles.cpacproductoffered}>
                          {data.hotelAccountCenterView?.viewProductOffered}
                          {data.hotelAccountCenterView instanceof Object
                            ? getsubRowData(
                                true,
                                index,
                                Settings.searchResult.colName
                                  .viewProductOffered,
                                data.ratetype_selected,
                                data.volunteeredratetype,
                                "",
                                ""
                              )
                            : ""}
                        </td>
                        <td
                          className={classNames(
                            styles.gridCell,
                            styles.cpacquestions
                          )}
                        >
                          {getQuestions(
                            data.showQuestions,
                            data.hasansweredquestions,
                            index
                          )}
                        </td>
                      </>
                    )}

                    {props.isUpdateMultiple && (
                      <>
                        {data.nopricing === "Y" ? (
                          <td colSpan={6}>
                            <span className={styles.noGeneralPricing}>
                              {Settings.searchResult.noGeneralPricing}
                            </span>
                          </td>
                        ) : (
                          <>
                            <td
                              className={classNames(
                                styles.gridCell,
                                styles.rightPanelRow,
                                styles.priceRow
                              )}
                            >
                              {" "}
                              <img
                                style={{ cursor: "pointer" }}
                                src={btnprint}
                                onClick={() => {
                                  getProductOfferedDropDown(
                                    index,
                                    data.ratetype_selected,
                                    data.volunteeredratetype,
                                    priceBtnData?.allow_floatnociel,
                                    priceBtnData?.allowHotelcanPriceFloatVP,
                                    data.hotelAccountCenterView
                                  );
                                }}
                              ></img>
                            </td>

                            <td className={styles.cpacproductoffered}>
                              {data.hotelAccountCenterView?.viewProductOffered}
                              {data.hotelAccountCenterView instanceof Object
                                ? getsubRowData(
                                    true,
                                    index,
                                    Settings.searchResult.colName
                                      .viewProductOffered,
                                    data.ratetype_selected,
                                    data.volunteeredratetype,
                                    "",
                                    ""
                                  )
                                : ""}
                            </td>
                            <td
                              className={classNames(
                                styles.gridCell,
                                styles.cpacquestions
                              )}
                            >
                              {getQuestions(
                                data.showQuestions,
                                data.hasansweredquestions,
                                index
                              )}
                            </td>

                            <td
                              className={classNames(
                                styles.gridCell,
                                styles.bestFn
                              )}
                            >
                              {getFinalSubmission(index, data.importance)}
                            </td>
                          </>
                        )}
                      </>
                    )}
                    {!props.isUpdateMultiple && (
                      <td
                        className={classNames(styles.gridCell, styles.bestFn)}
                      >
                        {getFinalSubmission(index, data.importance)}
                      </td>
                    )}
                    {data.nopricing != "Y" && (
                      <>
                        <td
                          className={classNames(
                            styles.gridCell,
                            styles.rightPanelRow,
                            props.isUpdateMultiple
                              ? styles.noBidUpdate
                              : styles.nobidCol
                          )}
                          align="center"
                        >
                          {data.nopricing != "Y" &&
                          data.hotelAccountCenterView instanceof Object
                            ? getsubRowData(
                                true,
                                index,
                                getnobiddata(data.excludeaer, data.aer_account),
                                data.ratetype_selected,
                                "",
                                data.isSelected,
                                "priceLabel"
                              )
                            : ""}
                        </td>
                        {userDetails?.user?.isHotelUser ? (
                          <td
                            className={classNames(
                              styles.gridCell,
                              styles.nobidRow,
                              styles.cpacnobidRow
                            )}
                          >
                            {data.nobidreasonid === 0 &&
                            data.nopricing != "Y" &&
                            (data.ratetype_selected === 17 ||
                              data.ratetype_selected === 18) ? (
                              <a
                                style={{ color: "red" }}
                                onClick={() => {
                                  {
                                    data.isSolicited !== "Y"
                                      ? (setShowModal(false),
                                        currentIndex(index))
                                      : (setShowModal(true),
                                        currentIndex(index));
                                  }
                                  // setShowModal(false), currentIndex(index);
                                }}
                              >
                                {Settings.searchResult.Grid.selectNobidReason}
                              </a>
                            ) : data.isSolicited !== "Y" ? (
                              <a>{data.nobidreason}</a>
                            ) : (
                              <a
                                onClick={() => {
                                  getNobidReason(index);
                                }}
                              >
                                {data.nobidreason}
                              </a>
                            )}
                          </td>
                        ) : (
                          ""
                        )}
                        {!userDetails?.user?.isHotelUser ? (
                          <td
                            className={classNames(
                              styles.gridCell,
                              styles.nobidRow,
                              styles.cpacnobidRow
                            )}
                          >
                            {data.nobidreasonid === 0 &&
                            data.nopricing != "Y" &&
                            (data.ratetype_selected === 17 ||
                              data.ratetype_selected === 18) ? (
                              <a
                                style={{ color: "red" }}
                                onClick={() => {
                                  setShowModal(true),
                                    currentIndex(index),
                                    setselectedNobReason("");
                                }}
                              >
                                {Settings.searchResult.Grid.selectNobidReason}
                              </a>
                            ) : (
                              <a
                                onClick={() => {
                                  getNobidReason(index);
                                }}
                              >
                                {data.nobidreason}
                              </a>
                            )}
                          </td>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </tr>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const getNobidReason = (index) => {
    setShowModal(true);
    setselectedNobReason(editData[index].nobidreason);
    setselectedNobid(editData[index].nobidreasonid);
  };
  const onAccountName = (id) => {
    // const url = Settings.searchResult.accoutReportUrl + id;
    const url =
      window.location.origin +
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/")
      ) +
      "/hotelReports?&ReportName=" +
      "Account Overview Report" +
      "&AccountId=" +
      id;
    const parms = Settings.searchResult.popupParms;
    window.open(url, "_blank");
  };

  const gotToSpecificQuestions = (i) => {
    const accInfoid = editData[i].hotel_accountinfoid;
    const rtId = editData[i].ratetype_selected;
    if (props.isUpdateMultiple) {
      props.hasQuestions(editData[i]);
    } else {
      history.push({
        pathname: `${Settings.parentRoute}/HotelAccountQuestions`,
        search:
          "?&MarshaCode=" +
          props.marshaCode +
          "&HotelName=" +
          props.hotelName +
          "&Period=" +
          props.period +
          "&Hotelrfpid=" +
          hotel_rfpid +
          "&AccountInfoId=" +
          accInfoid +
          "&rt=" +
          rtId,
        state: {
          from: "CPAC",
        },
      });
    }
  };

  const gotToRateRules = (i) => {
    constructUpdatedObj();
    let currentTab;
    if (editData[i].nobidreason == "Select a no bid reason") {
      currentTab = true;
    } else {
      currentTab = false;
    }
    props.onGotoPrintTab(editData[i], currentTab, columnList);
  };
  const getFinalSubmission = (i, importance) => {
    return (
      <input
        type="checkbox"
        onChange={(e) => onBestandFinalCheckbox(i, importance)}
        checked={importance === "Y" ? true : false}
      />
    );
  };

  const onBestandFinalCheckboxforSave = (i, importance) => {
    updateArray["ratetype_selected"] = editData[i].ratetype_selected;
    updateArray["hotel_accountinfoid"] = editData[i].hotel_accountinfoid;
    updateArray["accountrecid"] = editData[i].accountrecid;
    updateArray["changed"] = "N";
    updateArray["origratetype_selected"] = editData[i].ratetype_selected;
    updateArray["importance"] = importance;
    updateArray["nobidreason"] = editData[i].nobidreason;
    updateArray["nobidreasonid"] = editData[i].nobidreasonid;
    constructUpdatedObjforSave();
  };

  const constructUpdatedObjforSave = () => {
    updatedRows.push(updateArray);
    setSingleRowArray(updateArray);
    removeDuplicateObj(rateTypeArray, updateArray);
    const tempArray = rateTypeArray;
    tempArray.map((d, index) => {
      const keys = Object.keys(d);
      keys.map((key) => {
        if (key === "hotel_accountinfoid") {
          const jsonPair = {};
          let value = {};
          value = d;
          jsonPair[d[key]] = value;
          columnList.push(jsonPair);
        }
      });
    });

    columnList = columnList.reduce(function (result, item) {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});
    setSaveList([...saveList, []]);

    setSaveList([...saveList, columnList]);
    !props.isUpdateMultiple && parentContextType.onCPACSave(columnList);
  };

  const onBestandFinalCheckbox = (i, importance) => {
    let res;
    if (importance === "Y") {
      res = null;
    } else {
      res = "Y";
    }

    if (res === "Y") {
      if (editData[i].ratetype_selected === 17) {
        editData[i].importance = res;
        updateArray["ratetype_selected"] = editData[i].ratetype_selected;
        updateArray["hotel_accountinfoid"] = editData[i].hotel_accountinfoid;
        updateArray["accountrecid"] = editData[i].accountrecid;
        updateArray["changed"] = "Y";
        updateArray["origratetype_selected"] = editData[i].ratetype_selected;
        updateArray["importance"] = res;
        updateArray["nobidreason"] = editData[i].nobidreason;
        updateArray["nobidreasonid"] = editData[i].nobidreasonid;

        constructUpdatedObj();
      } else {
        if (
          props.isUpdateMultiple
            ? window.confirm(
                Settings.searchResult.bestAndFinalAlertUpdateHotels
              )
            : window.confirm(Settings.searchResult.bestAndFinalAlert)
        ) {
          editData[i].importance = res;
          updateArray["ratetype_selected"] = editData[i].ratetype_selected;
          updateArray["hotel_accountinfoid"] = editData[i].hotel_accountinfoid;
          updateArray["accountrecid"] = editData[i].accountrecid;
          updateArray["changed"] = "Y";
          updateArray["origratetype_selected"] = editData[i].ratetype_selected;
          updateArray["importance"] = res;
          updateArray["nobidreason"] = editData[i].nobidreason;
          updateArray["nobidreasonid"] = editData[i].nobidreasonid;
          constructUpdatedObj();
        } else {
          editData[i].importance = false;
          getrowData();
        }
      }
    } else {
      editData[i].importance = res;
      updateArray["ratetype_selected"] = editData[i].ratetype_selected;
      updateArray["hotel_accountinfoid"] = editData[i].hotel_accountinfoid;
      updateArray["accountrecid"] = editData[i].accountrecid;
      updateArray["changed"] = "Y";
      updateArray["origratetype_selected"] = editData[i].ratetype_selected;
      updateArray["importance"] = res;
      updateArray["nobidreason"] = editData[i].nobidreason;
      updateArray["nobidreasonid"] = editData[i].nobidreasonid;
      constructUpdatedObj();
    }
  };
  const getQuestions = (showQuestions, hasAns, i) => {
    if (showQuestions && hasAns === "Y") {
      return (
        <img
          style={{ cursor: "pointer" }}
          src={btnquestion}
          onClick={() => {
            gotToSpecificQuestions(i);
          }}
        ></img>
      );
    } else if (showQuestions && hasAns === "N") {
      return (
        <img
          style={{ cursor: "pointer" }}
          src={btnquestionRed}
          onClick={() => {
            gotToSpecificQuestions(i);
          }}
        ></img>
      );
    } else {
      return "";
    }
  };
  const getRebidStatus = (status, level, index) => {
    if (level === 1) {
      if (status === 1) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebid}></img>
          </td>
        );
      } else if (status === 2) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebidDecline}></img>
          </td>
        );
      } else if (status === 3) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebidAccept}></img>
          </td>
        );
      }
    }
    if (level === 2) {
      if (status === 1) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebid2}></img>
          </td>
        );
      } else if (status === 2) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebidDecline2}></img>
          </td>
        );
      } else if (status === 3) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebidAccept2}></img>
          </td>
        );
      }
    }
    if (level == 3) {
      if (status === 1) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebid3}></img>
          </td>
        );
      } else if (status === 2) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebidDecline3}></img>
          </td>
        );
      } else if (status === 3) {
        return (
          <td className={styles.rebidIcon}>
            {" "}
            <img src={rebidAccept3}></img>
          </td>
        );
      }
    }
  };
  const getAccountStatus = (status, index) => {
    if (status === "A") {
      return (
        <td>
          {" "}
          <img src={acceptedImg}></img>
        </td>
      );
    } else if (status === "S") {
      return (
        <td>
          {" "}
          <img src={requestImg}></img>
        </td>
      );
    } else if (status === "L") {
      return (
        <td>
          {" "}
          <img src={lockedImg}></img>
        </td>
      );
    } else if (status === "R") {
      return (
        <td>
          {" "}
          <img src={rejected}></img>
        </td>
      );
    } else {
      return "";
    }
  };
  const getCBCStatus = (status, index) => {
    if (status === "D") {
      return (
        <td className={styles.cbcIcon}>
          {" "}
          <img src={cbcRejected}></img>
        </td>
      );
    } else if (status === "A") {
      return (
        <td className={styles.cbcIcon}>
          {" "}
          <img src={cbcAccepted}></img>
        </td>
      );
    } else if (status === "R") {
      return (
        <td className={styles.cbcIcon}>
          {" "}
          <img src={cbcRequest}></img>
        </td>
      );
    } else if (status === "C") {
      return (
        <td className={styles.cbcIcon}>
          {" "}
          <img src={cbcCompleted}></img>
        </td>
      );
    } else {
      return "";
    }
  };

  const getsubRowData = (
    obj,
    index,
    fieldName,
    selectedRateType,
    volunteeredratetype,
    isSelected,
    customStyle
  ) => {
    if (fieldName === Settings.searchResult.colName.viewProductOffered) {
      if (obj) {
        if (
          selectedRateType === 9 ||
          selectedRateType === 10 ||
          selectedRateType === 11 ||
          selectedRateType === 12 ||
          selectedRateType === 15 ||
          selectedRateType === 16 ||
          selectedRateType === 25 ||
          selectedRateType === 26 ||
          selectedRateType === 27 ||
          selectedRateType === 28 ||
          selectedRateType === 29 ||
          selectedRateType === 30 ||
          selectedRateType === 31 ||
          selectedRateType === 32
        ) {
          return <td>VP</td>;
        } else if (selectedRateType === 20) {
          return <td>Float</td>;
        }
      }
    }
    if (
      fieldName === Settings.searchResult.colName.viewNBPricing ||
      fieldName === Settings.searchResult.colName.viewGPPPricing
    ) {
      if (isSelected === "Y") {
        return <td></td>;
      } else {
        if (obj) {
          return (
            <td>
              {selectedRateType === 17 || selectedRateType === 18
                ? getRadioButton(index, obj, true, fieldName)
                : getRadioButton(index, obj, false, fieldName)}
            </td>
          );
        }
      }
    }
  };

  const getRadioButton = (index, value, isChecked, fieldName) => {
    return (
      <input
        type="radio"
        value={isChecked}
        onClick={(e) => onChangeFeildValue(index, value, fieldName)}
        checked={isChecked}
      />
    );
  };
  const getProductOfferedDropDown = (
    index,
    ratetype_selected,
    volunteeredratetype,
    allowFloatNoCiel,
    allowHotelcanPriceFloatVP,
    value
  ) => {
    if (ratetype_selected === volunteeredratetype || ratetype_selected === 20) {
      gotToRateRules(index);
    } else if (
      allowFloatNoCiel === "Y" &&
      (appContext?.user?.isPASAdmin || appContext?.user?.isAnySalesUser)
    ) {
      setShowModalPO(true), currentIndex(index);
    } else if (
      allowFloatNoCiel === "Y" &&
      allowHotelcanPriceFloatVP === "Y" &&
      appContext?.user?.isHotelUser
    ) {
      setShowModalPO(true), currentIndex(index);
    } else {
      setVpProduct(index, value);
    }
  };
  const setVpProduct = (index, value) => {
    onChangeFeildValue(
      index,
      value,
      Settings.searchResult.colName.viewVPPricing
    );
    gotToRateRules(index);
  };
  function removeDuplicateObj(array, item) {
    const i = array.findIndex(
      (_item) => _item.accountrecid === item.accountrecid
    );
    if (i > -1) array[i] = item;
    else array.push(item);
  }
  const onChangeFeildValue = (item, field, fieldName) => {
    setNobidAlert(false);
    const i = item;
    const accountName = editData[i].accountname
      ? editData[i].accountname
      : editData[i].marshacode + " - " + editData[i].hotelname;
    let nobid_gpp_message = "";
    let sProduct;
    const selectedObj = editData[i];
    updateArray["hotel_accountinfoid"] = selectedObj.hotel_accountinfoid;
    updateArray["accountrecid"] = selectedObj.accountrecid;

    updateArray["origratetype_selected"] = selectedObj.ratetype_selected;
    if (props.isUpdateMultiple) {
      updateArray["marshaCode"] = selectedObj.marshacode;
      updateArray["period"] = selectedObj.period;
      updateArray["hotelId"] = selectedObj.hotelid;
      updateArray["hotelName"] = selectedObj.hotelname;
      updateArray["hotelrfpid"] = selectedObj.hotelrfpid;
    }
    if (editData[i].importance === "Y") {
      updateArray["importance"] = "Y";
    }
    if (fieldName === Settings.searchResult.colName.viewGPPPricing) {
      updateArray["ratetype_selected"] = 18;
      updateArray["changed"] = "Y";
      // sProduct = "GPP";
      popupConformation(
        item,
        accountName,
        sProduct,
        nobid_gpp_message,
        18,
        editData[i].boolIsLocked
      );
      sProduct = "No Bid";
      {
        let tempObj = [];
        tempObj = editData[i];
        editedDataObj.push(tempObj);
        setTheArray([...theArray, tempObj]);
        if (
          editData[item].nobidreason == "" ||
          editData[item].nobidreason == null
        ) {
          editData[item].nobidreason =
            Settings.searchResult.Grid.selectNobidReason;
          editData[item].activeRow = true;
          getrowData();
        }
        setselectedNobReason(editData[item].nobidreason);

        setShowModal(true);
      }
      editData[item].hotelAccountCenterView.viewPriceit =
        editData[i].boolIsLocked;
    }

    if (fieldName === Settings.searchResult.colName.viewVPPricing) {
      updateArray["changed"] = "Y";
      sProduct = "Volume Producer";
      updateArray["ratetype_selected"] = selectedObj.volunteeredratetype;
      popupConformation(
        item,
        accountName,
        sProduct,
        nobid_gpp_message,
        editData[item].volunteeredratetype,
        true
      );
    }
    if (fieldName === Settings.searchResult.colName.viewFloatVPPricing) {
      updateArray["ratetype_selected"] = 20;
      updateArray["changed"] = "Y";
      sProduct = "Floating Volume Producer";
      popupConformation(
        item,
        accountName,
        sProduct,
        nobid_gpp_message,
        20,
        true
      );
    }
    if (fieldName === Settings.searchResult.colName.viewNBPricing) {
      updateArray["ratetype_selected"] = 17;
      updateArray["changed"] = "Y";
      sProduct = "No Bid";
      nobid_gpp_message = Settings.searchResult.noBidPopupAlert;
      {
        let tempObj = [];
        tempObj = editData[i];
        editedDataObj.push(tempObj);
        setTheArray([...theArray, tempObj]);
        if (
          editData[item].nobidreason == "" ||
          editData[item].nobidreason == null
        ) {
          editData[item].nobidreason =
            Settings.searchResult.Grid.selectNobidReason;
          editData[item].activeRow = true;
          getrowData();
        }
        setselectedNobReason(editData[item].nobidreason);

        setShowModal(true);
      }
      editData[item].hotelAccountCenterView.viewPriceit =
        editData[i].boolIsLocked;
    }
    constructUpdatedObj();
  };

  const constructUpdatedObj = () => {
    updatedRows.push(updateArray);
    setSingleRowArray(updateArray);
    removeDuplicateObj(rateTypeArray, updateArray);
    const tempArray = rateTypeArray;

    const filterData = editData.filter(
      (res) =>
        res.displayNobidreason === "Select a no bid reason" &&
        res.ratetype_selected === 17
    );

    if (filterData.length !== 0) {
      for (const res of filterData) {
        if (
          res.nobidreason == "" ||
          res.nobidreason == "Select a no bid reason"
        ) {
          setNobidAlert(false);
          break;
        } else {
          setNobidAlert(false);
        }
      }
    } else {
      setNobidAlert(false);
    }

    setrateTypeArray([...rateTypeArray, tempArray]);

    tempArray.map((d, index) => {
      const keys = Object.keys(d);
      keys.map((key) => {
        if (key === "hotel_accountinfoid") {
          const jsonPair = {};
          let value = {};
          value = d;
          jsonPair[d[key]] = value;
          columnList.push(jsonPair);
        }
      });
    });

    columnList = columnList.reduce(function (result, item) {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});
    setSaveList([...saveList, []]);
    setNobidList(nobidResonList);
    setSaveList([...saveList, columnList]);
    !props.isUpdateMultiple && parentContextType.onCPACSave(columnList);
  };
  const popupConformation = (
    index,
    accountName,
    sProduct,
    nobid_gpp_message,
    selectValue,
    showPriceBtn
  ) => {
    {
      let check1 = false;
      if (
        (editData[index].screenStatus !== "C" ||
          editData[index].screenStatus !== "R" ||
          editData[index].screenStatus == "N") &&
        (editData[index].cbcstatus === null ||
          editData[index].cbcstatus === "") &&
        (editData[index].accountStatus === null ||
          editData[index].accountStatus === "") &&
        editData[index].rebidstatus === null
      ) {
        check1 = true;
      } else {
        check1 = false;
      }
      let check2 = false;
      if (
        (editData[index].screenStatus !== "C" ||
          editData[index].screenStatus !== "R" ||
          editData[index].screenStatus == "N") &&
        editData[index].cbcstatus !== "" &&
        (editData[index].accountStatus === null ||
          editData[index].accountStatus === "") &&
        editData[index].rebidstatus === null
      ) {
        check2 = true;
      } else {
        check2 = false;
      }
      let check3 = false;
      if (
        (editData[index].screenStatus !== "C" ||
          editData[index].screenStatus !== "R" ||
          editData[index].screenStatus == "N") &&
        (editData[index].cbcstatus === null ||
          editData[index].cbcstatus === "") &&
        editData[index].accountStatus == "S" &&
        editData[index].rebidstatus === null
      ) {
        check3 = true;
      } else {
        check3 = false;
      }

      if (
        editData[index].ratetype_selected === 17 &&
        editData[index].importance === "Y" &&
        (check1 || check2 || check3)
      ) {
        if (window.confirm(Settings.searchResult.bestAndFinalAlert)) {
        } else {
          editData[index].importance = false;
          getrowData();
        }
      }
      setIsChecked(true);

      if (showPriceBtn) {
        gotToRateRules(index);
      } else {
        setIsChecked(false);
        editData[index].hotelAccountCenterView.viewPriceit = showPriceBtn;
        if (selectValue != 17) {
          editData[index].ratetype_selected = selectValue;
          editData[index].nobidreason = "";
        }
        getrowData();
      }
    }
  };

  const onNobidSelect = (e) => {
    if (e) {
      const value = nobidResonList.filter(function (item) {
        return item.nobidreason == e.target.value;
      });

      setselectedNobidObj([...selectedNobidObj, value[0]]);
      setselectedNobReason(value[0].nobidreason);
      setselectedNobid(value[0].nobidreasonid);
    }
  };

  const onSavePO = (e) => {
    setSavePO(e.target.value);
  };

  const onSaveProductOffered = (index, value) => {
    if (savePO === "Volume Producer") {
      onChangeFeildValue(
        index,
        value,
        Settings.searchResult.colName.viewVPPricing
      );
      gotToRateRules(index);
    } else if (savePO === "Float Volume Producer") {
      onChangeFeildValue(
        index,
        value,
        Settings.searchResult.colName.viewFloatVPPricing
      );
      gotToRateRules(index);
    }
  };

  const selectedratetypenobid = (index) => {
    let gpp;
    const data1 =
      props &&
      props.data &&
      props.data.hotelAccountCenterList.length > 0 &&
      props.data.hotelAccountCenterList[index];
    if (
      (data1.excludeaer === "N" || data1.excludeaer === null) &&
      data1.aer_account === "Y"
    ) {
      gpp = 18;
    } else {
      gpp = 17;
    }
    return gpp;
  };

  const onSaveNobid = (e) => {
    setSaveNoBid(true);
    const index = activeRow;
    editData[activeRow].nobidreasonid = selectedNobidid;
    editData[index].nobidreason = selectedNobidReason;
    editData[index].ratetype_selected = selectedratetypenobid(index);
    const selectedObj = editData[index];
    editData[index].activeRow = false;
    updateArray["hotel_accountinfoid"] = selectedObj.hotel_accountinfoid;
    updateArray["accountrecid"] = selectedObj.accountrecid;
    updateArray["ratetype_selected"] = selectedratetypenobid(index);
    updateArray["origratetype_selected"] = selectedObj.ratetype_selected;
    updateArray["changed"] = "Y";
    updateArray["importance"] = editData[index].importance;
    updateArray["nobidreason"] = editData[index].nobidreason;
    updateArray["nobidreasonid"] = editData[index].nobidreasonid;
    const noBidValue = editData[activeRow]?.nobidreason;
    let noBidValid = false;
    if (noBidValue === "Select a No Bid Reason" || noBidValue === "") {
      const alertmsg = Settings.searchResult.pleaseSelectValidNobid;
      editData[activeRow].nobidreason = "Select a No Bid Reason";
      noBidValid = false;
      alert(alertmsg);
    } else {
      setShowModal(false);
      noBidValid = true;
    }
    constructUpdatedObj();
    getrowData();
    if (noBidValid) {
      if (!props.isUpdateMultiple) {
        props.onsavenobidreasonid(
          editData[activeRow],
          columnList,
          true,
          true,
          true
        );
      } else {
        const temparr = [];
        temparr.push(columnList);
        props.onsavenobidreasonidmulti(temparr, isChecked, singleRowArray);
      }
    }
  };
  return (
    <HotelPricingContext.Consumer>
      {(hotelPricing) => {
        parentContextType = hotelPricing;
        return (
          <div>
            <CModal
              title={"No Bid Reason"}
              show={showModal}
              onClose={closeModal}
              xPosition={-235}
              yPosition={-210}
              closeImgTitle={"Close"}
            >
              <div className={styles.popupStyle}>
                <table>
                  <tbody>
                    <tr>
                      <td align="left" className="Field_Name" width={150}>
                        <span
                          style={{ fontWeight: "bold", marginLeft: "-10px" }}
                        >
                          {Settings.searchResult.tableHeader.noBidReason}:{" "}
                        </span>
                      </td>
                      <td align="left" className="Field_Value">
                        <select
                          id=""
                          name=""
                          onChange={onNobidSelect}
                          value={selectedNobidReason}
                          className={styles.nobidSelect}
                          autoFocus
                        >
                          <option value={styles.show}></option>
                          {nobidResonList.map((data) => (
                            <option
                              key={data?.nobidreasonid}
                              value={data.nobidreason}
                            >
                              {data.nobidreason}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr style={{ height: "10px" }}>
                      <td />
                    </tr>
                    <tr>
                      <td align="center" valign="bottom" colSpan={2}>
                        <img
                          src={saveBtn}
                          style={{ cursor: "hand" }}
                          onClick={onSaveNobid}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CModal>
            <div
              id="dataGrid"
              className={
                props?.isUpdateMultiple
                  ? styles.gridUpdateHotelWrapper
                  : styles.cpacHotelWrapper
              }
            >
              <div
                style={{
                  minWidth: props.isUpdateMultiple ? "auto" : "auto",
                  height: props.isUpdateMultiple ? "auto" : styles.cpacheight,
                  marginLeft: "1px",
                  overflow: "auto hidden",
                  background: "#eff0ec",
                  width: !userDetails?.user?.isPASAdmin ? "1188px" : "1360px",
                }}
                className={`${
                  props?.isUpdateMultiple
                    ? styles.updategridtable
                    : styles.cpacgridtable
                } ${"cpacumhgrid"}`}
              >
                <CModal
                  title={"Product Selection"}
                  show={showModalPO}
                  onClose={closeModalPO}
                  componentName={"cresultGrid"}
                  closeImgTitle={"Close"}
                >
                  <div className={styles.popupStylePO}>
                    <table>
                      <tbody>
                        <tr className={styles.poalign}>
                          <td
                            align="left"
                            className="Field_Name"
                            width={150}
                            style={{ width: "135px" }}
                          >
                            <span
                              style={{
                                fontWeight: "bold",
                                marginLeft: "0",
                              }}
                            >
                              {Settings.searchResult.tableHeader.productOffered}
                              :{" "}
                              {/* Select Pricing Product 
                          To Be Offered: */}
                            </span>
                          </td>
                          <td align="left" className="Field_Value">
                            <select
                              id=""
                              name=""
                              onChange={(e) => onSavePO(e)}
                              defaultValue=""
                              value={savePO}
                              className={styles.productofferedPO}
                            >
                              <option value={styles.show}></option>
                              <option>
                                {Settings.searchResult.tableHeader.POVP}
                              </option>
                              <option>
                                {Settings.searchResult.tableHeader.POFloat}
                              </option>
                            </select>
                          </td>
                        </tr>
                        <tr style={{ height: "10px" }}>
                          <td />
                        </tr>
                        <div className={styles.popupButton}>
                          <p>
                            <img
                              src={btnok}
                              style={{ cursor: "hand" }}
                              onClick={() =>
                                onSaveProductOffered(
                                  activeRow,
                                  editData?.hotelAccountCenterView
                                )
                              }
                            />
                          </p>
                          <p>
                            <img
                              src={btncancel}
                              style={{ cursor: "hand" }}
                              onClick={closeModalPO}
                            />
                          </p>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </CModal>
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  className={
                    props?.isUpdateMultiple
                      ? styles.tableUpdateHotelWrapper
                      : styles.tableCpacWrapper
                  }
                >
                  <thead>
                    <tr>
                      <th
                        className={`${styles.gridcpacHeader} ${
                          styles.gridcpacCell
                        }
                         ${
                           props.isUpdateMultiple
                             ? styles.widthcs
                             : styles.width65

                           //  : styles.widthcpac
                         } ${styles.alignCenter}`}
                        rowSpan={2}
                      >
                        {Settings.searchResult.tableHeader.status}
                      </th>
                      {!props.isUpdateMultiple && (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.width40} ${styles.alignCenter}`}
                          rowSpan={2}
                        >
                          {Settings.searchResult.tableHeader.cbcStatus}
                        </th>
                      )}{" "}
                      {!props.isUpdateMultiple && (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.accountstaus} ${styles.alignCenter}`}
                          rowSpan={2}
                        >
                          {Settings.searchResult.tableHeader.accountStatus}
                        </th>
                      )}
                      <th
                        className={`${styles.alignCenter} ${
                          styles.gridcpacHeader
                        } ${styles.gridcpacCell} ${
                          props.isUpdateMultiple
                            ? styles.widthrebiStatus
                            : styles.width40
                        }`}
                        rowSpan={2}
                      >
                        {Settings.searchResult.tableHeader.rebidStatus}
                      </th>
                      {props.isUpdateMultiple && (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.width30} ${styles.alignCenter}`}
                          rowSpan={2}
                        >
                          {Settings.searchResult.tableHeader.accountStatus}
                        </th>
                      )}
                      {props.isUpdateMultiple ? (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.hotelName}`}
                          rowSpan={2}
                        >
                          {"Hotel"}
                        </th>
                      ) : (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.accountName}`}
                          rowSpan={2}
                        >
                          {Settings.searchResult.tableHeader.accountName}
                        </th>
                      )}
                      {!props.isUpdateMultiple && (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.dueDateGrid}`}
                          rowSpan={2}
                        >
                          {Settings.searchResult.tableHeader.dueDate}
                        </th>
                      )}
                      {userDetails?.user?.isPASAdmin ? (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.salesGroup}`}
                          rowSpan={2}
                        >
                          {Settings.searchResult.tableHeader.salesGroup}
                        </th>
                      ) : (
                        ""
                      )}
                      {userDetails?.user?.isHotelUser ? (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.width60hotelpricebtn} ${styles.alignCenter}`}
                          rowSpan={2}
                        >
                          {" "}
                          {Settings.searchResult.tableHeader.price}
                        </th>
                      ) : (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.width60} ${styles.alignCenter}`}
                          rowSpan={2}
                        >
                          {" "}
                          {Settings.searchResult.tableHeader.price}
                        </th>
                      )}
                      <th
                        className={`${styles.alignCenter} ${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.cpacproduct} ${styles.product}`}
                        colSpan={2}
                      >
                        {Settings.searchResult.tableHeader.product}
                      </th>
                      <th
                        className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.width20} ${styles.alignCenter}`}
                        rowSpan={2}
                      >
                        {" "}
                        {Settings.searchResult.tableHeader.why}
                      </th>
                      {props.isUpdateMultiple && (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.best}`}
                          rowSpan={2}
                        >
                          {" "}
                          {Settings.searchResult.tableHeader.bestAndFinal}
                        </th>
                      )}
                      {!props.isUpdateMultiple && (
                        <th
                          className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.best} ${styles.alignCenter}`}
                          rowSpan={2}
                        >
                          {" "}
                          {Settings.searchResult.tableHeader.bestAndFinal}
                        </th>
                      )}
                      <th
                        className={`${styles.gridcpacHeader} ${styles.gridcpacCell} ${styles.noidwidth50} ${styles.width50} ${styles.alignCenter}`}
                        rowSpan={2}
                      >
                        {Settings.searchResult.tableHeader.noBid}
                      </th>
                      <th
                        className={`${styles.gridcpacHeader} ${
                          styles.gridcpacCell
                        }  ${styles.cpacnoBid}  ${
                          !userDetails?.user?.isPASAdmin
                            ? styles.width240
                            : styles.width275
                        }`}
                        rowSpan={2}
                      >
                        {" "}
                        {Settings.searchResult.tableHeader.noBidReason}
                      </th>
                      <th
                        className={`${styles.gridcpacHeader} ${styles.gridcpacCell}  ${styles.cpacnoBid}  ${styles.width10}`}
                      >
                        {" "}
                      </th>
                    </tr>
                    <tr></tr>
                  </thead>
                  <tbody></tbody>
                </table>
                {getrowData()}
              </div>
            </div>
          </div>
        );
      }}
    </HotelPricingContext.Consumer>
  );
}

export default CResultList;
