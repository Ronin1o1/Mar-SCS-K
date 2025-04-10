import React, {
  Suspense,
  useEffect,
  useContext,
  useState,
  useRef,
} from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import styles from "./rebid.css";
import Settings from "./../static/Settings";
import RebidContext from "./../context/rebid";
import CCalendar from "../../../../common/components/CCalendar";
import Utils from "../../../../common/utils/Utils";
import CModal from "../../../../common/components/CModal";
import RebidList from "./rebidList";
import QuickSelect from "../../../../shared/components/quickSelect";
import SendAdditionalInfo from "../../../../shared/components/sendAdditionalInfo";
import { isPast, addBusinessDays, isToday } from "date-fns";
import CPageTitle from "../../../../common/components/CPageTitle";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";
import CSuspense from "../../../../common/components/CSuspense";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const Rebid: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const [sendMailModal, setSendMailModal] = useState(false);
  const [quickSelect, setQuickSelect] = useState(false);
  const [directSelect, setDirectSelect] = useState(false);
  const [accountStatus, setAccountStatus] = useState("");
  const [sendAdditional, setSendAdditional] = useState(false);
  const [alertModalFor200Limit, setalertModalFor200Limit] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [selectedSort, setSelectedSort] = useState("0");
  const [sortOrder, setSortOrder] = useState("asc"); // asc,dsc
  const {
    getRequestPanelData,
    FindFilterData,
    showFilterOptions,
    showMaxAlert,
    setShowMaxAlert,
    totalRecord,
    numItems,

    getshowFilterOptions,
    getFindFilter,
    panelData,
    filteredHotelList,
    handleOrderChange,
    onChangeFieldValue,
    save,
    getContactType,
    contactTypes,
    setContactTypes,
    sendMail,
    ajaxSaveInprogress,
    ajaxSave,
    defaultDueDate,
    setDefaultDueDate,
    sendFromList,
    getRequestPanelDataDup,
    additionalInfoBtnClicked,
    additionalEmailInfoUpdateInprogress,
    hotelsolicitationemailinfoupdate,
    isMakingRequest,
    setFilteredHotelList,
    clearDirectSelect,
    setAPIData,
    loader,
  } = useContext(RebidContext);

  useEffect(() => {
    if (sendAdditional) {
      additionalInfoBtnClicked(panelData);
    }
  }, [sendAdditional]);

  useEffect(() => {
    setRefresh(refresh + 1);
  }, [filteredHotelList]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });

  useEffect(() => {
    if (sendMailModal && !contactTypes.length) {
      getContactType({ ...panelData, defaultRebidDueDate: defaultDueDate });
    } else if (sendMailModal && contactTypes.length) {
      if (
        confirm(
          `The emails will be sent from the ${contactTypes.join(
            ","
          )}. \n\n Click on OK to continue. \n\n Click on Cancel to go back to Portfolio Rebid screen.`
        )
      ) {
        sendEmail();
      }
      setSendMailModal(false);
    }
  }, [sendMailModal]);
  useEffect(() => {
    if (sendMailModal && contactTypes.length) {
      if (
        confirm(
          `The emails will be sent from the ${contactTypes.join(
            ","
          )}. \n\n Click on OK to continue. \n\n Click on Cancel to go back to Portfolio Rebid screen.`
        )
      ) {
        sendEmail();
      }
      setSendMailModal(false);
    }
  }, [contactTypes]);

  useEffect(() => {
    const businessDay = addBusinessDays(new Date(), 5);
    setDefaultDueDate(businessDay);
    try {
      getshowFilterOptions();
      getFindFilter();
    } catch (e) {}
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getRequestPanelDataDup(localStorage.getItem("port_Rebid"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("port_Rebid");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("port_Rebid");
    };
  }, []);

  useEffect(() => {
    if (
      quickSelect &&
      ajaxSaveInprogress.status == "success" &&
      !ajaxSaveInprogress.progress
    ) {
      getRequestPanelData(panelData);
      setQuickSelect(false);
    }
  }, [ajaxSaveInprogress]);

  useEffect(() => {
    if (
      (sendMailModal || quickSelect || directSelect) &&
      !panelData.strFilterValues
    ) {
      if (confirm("Please select an account.!")) {
        setQuickSelect(false);
        setSendMailModal(false);
        setDirectSelect(false);
      } else {
        setQuickSelect(false);
        setSendMailModal(false);
        setDirectSelect(false);
      }
    }
  }, [quickSelect, sendMailModal, directSelect]);

  const setCalendarValue = (param) => {
    setDefaultDueDate(param.value);
  };

  const validateDateValue = (event) => {
    if (event.target?.value) {
      Utils.isDate(event.target?.value);
    }
  };

  const validateDateLength = (event) => {
    if (event.target.value.length > 10) {
      alert(Settings.enter10character);
    }
  };

  const calendarHide = (param) => {
    const isPastDate = isPast(defaultDueDate);

    if (isPastDate && !isToday(defaultDueDate)) {
      setTimeout(() => {
        alert(Settings.pastDate);
      }, 1000);
    }
  };

  const handleSorting = (param) => {
    if (param == selectedSort && sortOrder == "asc") setSortOrder("asc");
    else setSortOrder("asc");

    const arrOrder = [
      { code: 0, name: "marshacode" },
      { code: 1, name: "hotelname" },
      { code: 2, name: "rebid_flag" },
      { code: 3, name: "rebid_due" },
      { code: 4, name: "rebidstatus_desc" },
      { code: 5, name: "rebid_flag2" },
      { code: 6, name: "rebid_due2" },
      { code: 7, name: "rebidstatus_desc2" },
      { code: 8, name: "rebid_flag3" },
      { code: 9, name: "rebid_due3" },
      { code: 10, name: "rebidstatus_desc3" },
      { code: 11, name: "check_respond" },
      { code: 12, name: "chasemail_sent_flag" },
      { code: 13, name: "product_offered" },
      { code: 14, name: "subsetname" },
      { code: 15, name: "city" },
      { code: 16, name: "state" },
      { code: 17, name: "country" },
      { code: 18, name: "importance" },
    ];
    const value = arrOrder.filter((e) => e.code == param);
    let filteredHotelListData = [];
    if (sortOrder == "asc") {
      if (param == 3 || param == 6 || param == 9) {
        filteredHotelListData = [...filteredHotelList.portfolioRebidList].sort(
          (a, b) => {
            if (a[value[0].name] === "" && b[value[0].name] !== "") {
              return 1;
            } else if (b[value[0].name] === "" && a[value[0].name] !== "") {
              return -1;
            } else if (
              moment(a[value[0].name]).toDate() >
              moment(b[value[0].name]).toDate()
            ) {
              return 1;
            } else if (
              moment(a[value[0].name]).toDate() <
              moment(b[value[0].name]).toDate()
            ) {
              return -1;
            } else {
              return 0;
            }
          }
        );
      } else if (param == 4 || param == 7 || param == 10) {
        filteredHotelListData = [...filteredHotelList.portfolioRebidList].sort(
          (a, b) => {
            if (a[value[0].name] === null && b[value[0].name] !== null) {
              return 1;
            } else if (b[value[0].name] === null && a[value[0].name] !== null) {
              return -1;
            } else if (
              a[value[0].name] === "To be Rebid" &&
              b[value[0].name] === "Decline to Rebid"
            ) {
              return -1;
            } else if (
              a[value[0].name] === "Decline to Rebid" &&
              b[value[0].name] === "Submit Rebid"
            ) {
              return -1;
            } else if (
              a[value[0].name] === "To be Rebid" &&
              b[value[0].name] === "Submit Rebid"
            ) {
              return -1;
            } else {
              return 0;
            }
          }
        );
      } else if (param == 2 || param == 5 || param == 8) {
        filteredHotelListData = [...filteredHotelList.portfolioRebidList].sort(
          (a, b) => {
            if (a[value[0].name] === null && b[value[0].name] !== null) {
              return -1;
            } else if (b[value[0].name] === null && a[value[0].name] !== null) {
              return 1;
            } else if (a[value[0].name] > b[value[0].name]) {
              return 1;
            } else if (a[value[0].name] < b[value[0].name]) {
              return -1;
            } else {
              return 0;
            }
          }
        );
      } else if (param == 11) {
        filteredHotelList.portfolioRebidList.map((data) => {
          if (!data.check_respond) {
            data.check_respond = "N";
          }
        });
        filteredHotelListData = [...filteredHotelList.portfolioRebidList].sort(
          (a, b) => {
            if (a[value[0].name] > b[value[0].name]) {
              return 1;
            } else if (a[value[0].name] < b[value[0].name]) {
              return -1;
            } else {
              return 0;
            }
          }
        );
      } else {
        filteredHotelListData = [...filteredHotelList.portfolioRebidList].sort(
          (a, b) => {
            if (a[value[0].name] > b[value[0].name]) {
              return 1;
            } else if (a[value[0].name] < b[value[0].name]) {
              return -1;
            } else {
              return 0;
            }
          }
        );
      }
      document.getElementById("table_1").scrollTop = 0;
      document.getElementById("table_2").scrollTop = 0;
      document.getElementById("table_1").scrollLeft = 0;
      document.getElementById("table_2").scrollLeft = 0;
    }
    filteredHotelList.portfolioRebidList = filteredHotelListData;
    setFilteredHotelList({
      emailNotSent: filteredHotelList.emailNotSent,
      portfolioRebidList: filteredHotelList.portfolioRebidList,
    });

    setSelectedSort(value[0].code);

    // handleOrderChange(panelData, param);
    setRefresh(refresh + 1);
  };

  const sendEmail = () => {
    sendMail({ ...panelData, strPortfolioRebidList: filteredHotelList });
  };

  const quickSelectFormating = (filteredlist) => {
    filteredlist = filteredlist.filter(function (element) {
      return element !== undefined;
    });

    for (let i = 0; i < filteredlist.length; i++) {
      Rebid(filteredlist[i]);
    }

    ajaxSave({
      ...panelData,
      portfolioRebidList: filteredlist,
    });
  };

  const directSelectSaved = (marshas) => {
    const filterList = { ...filteredHotelList };
    marshas = marshas.replace(/\s/g, "");
    // eslint-disable-next-line no-var
    if (marshas.length > 1200) {
      // 600 = (5 letters for property code + 1 for a comma) * 100 maximum entries
      setalertModalFor200Limit(true);
      setDirectSelect(false);
      return;
    }

    marshas = marshas.replace(/[^a-zA-Z,]/g, "");

    const re = /^[a-zA-Z\,]/;
    if (!re.test(marshas)) {
      alert("Please enter only marshacodes seperated by a ,");
      return;
    }

    const n = marshas
      .split(",")
      .filter(
        (x) =>
          !filterList.portfolioRebidList.some(
            (y) => y.marshacode == x.toUpperCase()
          )
      );

    if (n.length && n[0] !== "") {
      alert(Settings.notFoundAlert + `\n` + `${n.join(" ")}`);
      marshas = marshas
        .split(",")
        .filter((el) => !n.includes(el))
        .join(",");
    }
    setDirectSelect(false);
    if (marshas.length) {
      let filteredData = marshas
        .split(",")
        .map((x) =>
          filterList.portfolioRebidList.find(
            (y) => y.marshacode == x.toUpperCase()
          )
        );
      filteredData = filteredData.filter((p) => p != undefined);
      filterList.portfolioRebidList = filteredData;
      setAPIData(filterList);
    }
  };

  const quickSelectSave = (marshas) => {
    marshas = marshas.replace(/\s/g, "");
    // eslint-disable-next-line no-var
    var newArr = [];
    let isInside1 = false;
    let isInside2 = false;
    if (marshas.length > 1200) {
      // 600 = (5 letters for property code + 1 for a comma) * 100 maximum entries
      setalertModalFor200Limit(true);
      setQuickSelect(false);
      return;
    }

    marshas = marshas.replace(/[^a-zA-Z,]/g, "");

    const re = /^[a-zA-Z\,]/;
    if (!re.test(marshas)) {
      alert("Please enter only marshacodes seperated by a ,");
      return;
    }

    const n = marshas
      .split(",")
      .filter(
        (x) =>
          !filteredHotelList.portfolioRebidList.some(
            (y) => y.marshacode == x.toUpperCase()
          )
      );
    const nPresent = marshas.split(",").filter((x) => {
      !filteredHotelList.portfolioRebidList.map((data) => {
        if (x !== "" && x.length > 0) {
          if (
            x.toUpperCase() == data.marshacode &&
            data.rebidstatus_desc === "To be Rebid" &&
            data.rebid_flag == "Y"
          ) {
            newArr.push(x);
            isInside1 = true;
          } else if (
            !filteredHotelList.portfolioRebidList.some(
              (y) => y.marshacode == x.toUpperCase()
            )
          ) {
            isInside2 = true;
          }
        }
      });
    });

    if (isInside1 && isInside2) {
      alert(
        Settings.notFoundAlert +
          `\n` +
          `${n.join(" ")}` +
          `\n` +
          `\n` +
          Settings.rebidStatusAlert +
          `\n` +
          `${newArr.join(" ")}`
      );
      marshas = marshas
        .split(",")
        .filter((el) => !n.includes(el))
        .filter((el) => !newArr.includes(el))
        .join(",");
    } else if (isInside1) {
      alert(Settings.rebidStatusAlert + `\n` + `${newArr.join(" ")}`);
    } else if (n.length && n[0] !== "") {
      alert(Settings.notFoundAlert + `\n` + `${n.join(" ")}`);
      marshas = marshas
        .split(",")
        .filter((el) => !n.includes(el))
        .join(",");
    }
    setQuickSelect(false);
    if (marshas.length) {
      ajaxSave({
        ...panelData,
        portfolioRebidList: quickSelectFormating(
          marshas
            .split(",")
            .map((x) =>
              filteredHotelList.portfolioRebidList.find(
                (y) => y.marshacode == x.toUpperCase()
              )
            )
        ),
      });
    }
  };

  function Rebid(item) {
    let toBeRebid = false;
    if (item.rebid_flag === "Y") {
      if (item.rebidstatus_id > 1) {
        if (item.rebid_flag2 === "Y") {
          if (item.rebidstatus_id2 > 1) {
            if (item.rebid_flag3 !== "Y") {
              item.rebid_flag3 = "Y";
              item.rebid_due3 = defaultDueDate;
              item.chase_email_sent = "N";
              markItemChanged(item);
            }
          } else {
            toBeRebid = true;
          }
        } else {
          item.rebid_flag2 = "Y";
          item.rebid_due2 = defaultDueDate;
          item.chase_email_sent = "N";
          markItemChanged(item);
        }
      } else {
        toBeRebid = true;
      }
    } else {
      item.rebid_flag = "Y";
      item.rebid_due = defaultDueDate;
      item.chase_email_sent = "N";
      markItemChanged(item);
    }

    return toBeRebid;
  }

  function markItemChanged(item) {
    item.changed = "Y";
  }

  const rebidAll = () => {
    if (
      !confirm(
        "Are you sure you want to rebid all hotels?\n\n(Click OK to confirm, Cancel to stop) "
      )
    ) {
      return false;
    }
    if (!panelData.strFilterValues) {
      if (confirm("Please select an account.!")) {
        return false;
      } else {
        return false;
      }
    }
    let items = filteredHotelList.portfolioRebidList;

    items = items.filter(function (element) {
      return element !== undefined;
    });

    for (let i = 0; i < items.length; i++) {
      Rebid(items[i]);
    }

    ajaxSave({
      ...panelData,
      portfolioRebidList: filteredHotelList.portfolioRebidList,
    });
  };

  const saveHandler = (params) => {
    hotelsolicitationemailinfoupdate(
      panelData?.strFilterValues?.accountFilter?.accountrecid,
      {
        defaultRebidDueDate: Utils.formatDate2Digit(defaultDueDate),
        strHotelSolicitationAddEmailInfo: {
          additional_text: params.additional_text,
          duedate_foremail: Utils.formatDate2Digit(defaultDueDate),
          sendfromtype: params.sendfromtype,
          addemailtext_screentype: "R",
        },
      }
    );
    setContactTypes([]);
    setSendAdditional(false);
  };

  const additionalInfo = {
    textareaId: "text_info",
    textareaName: "text_info",
    textareaCols: 70,
    textareaRows: 5,
    sendfromtypeName: "hotelSolicitationAddEmailInfo.sendfromtypeName",
    sendfromtypeId: "hotelSolicitationAddEmailInfo.sendfromtype",
  };

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.SubContainer}>
          <CPageTitle title="Pricing : Portfolio Rebid"></CPageTitle>
          <CModal
            title={Settings.alertMessage}
            onClose={(e) => {
              setalertModalFor200Limit(false);
            }}
            show={alertModalFor200Limit}
            xPosition={-120}
            yPosition={-100}
            closeImgTitle={Settings.okClose}
          >
            <div style={{ maxWidth: 250, minWidth: 180, padding: "9px 12px" }}>
              {Settings.enter200Hotels}
            </div>
          </CModal>
          <CModal
            class={"qspopup"}
            title={
              quickSelect
                ? Settings.quickselect.title
                : Settings.quickselect.heading
            }
            onClose={(e) =>
              quickSelect ? setQuickSelect(false) : setSendAdditional(false)
            }
            show={quickSelect || sendAdditional}
            xPosition={-375}
            yPosition={-120}
          >
            {quickSelect && (
              <>
                <QuickSelect
                  save={(e) => quickSelectSave(e)}
                  cancel={(e) => setQuickSelect(false)}
                  quickSelectObject={{
                    label: "Hotel List:",
                    cols: 145,
                    rows: 10,
                  }}
                />
              </>
            )}
            {sendAdditional && (
              <SendAdditionalInfo
                additionalData={additionalInfo}
                sendFromList={sendFromList}
                cancelAddSentInfo={() => setSendAdditional(false)}
                saveAddSentInfo={saveHandler}
              />
            )}
          </CModal>
          <CModal
            title={Settings.directSelect}
            onClose={(e) => {
              setDirectSelect(false);
            }}
            show={directSelect}
            xPosition={-300}
            yPosition={-200}
          >
            <Suspense fallback={<CSuspense />}>
              <QuickSelect
                quickSelectObject={{
                  label: "Hotel List:",
                  cols: 145,
                  rows: 10,
                }}
                save={directSelectSaved}
                cancel={(e) => {
                  setDirectSelect(false);
                }}
              />
            </Suspense>
          </CModal>
          <CModal
            class={"qspopup"}
            title={"Alert Message"}
            onClose={(e) => setShowMaxAlert(false)}
            show={showMaxAlert}
            xPosition={-250}
            yPosition={-0}
          >
            <div style={{ margin: "10px" }}>
              Cannot show more than 750 entries and there are currently{" "}
              {totalRecord} entries in this result. Please adjust filters and
              try again
            </div>
          </CModal>
          <table
            className={styles.fullHeight}
            style={{ borderCollapse: "collapse", marginRight: "2px" }}
          >
            <tbody>
              <tr id="filterTR" style={{ borderCollapse: "collapse" }}>
                <td valign="top">
                  <Filter
                    componentName="portfolioRebid"
                    getPanelData={getRequestPanelData}
                    findFilters={FindFilterData}
                    showOptions={showFilterOptions}
                    getAccountStatus={setAccountStatus}
                    isAccountRequired={false}
                    filterViewLists={Settings.api.getFilterViewLists}
                    numItems={
                      isMakingRequest
                        ? "Loading..."
                        : filteredHotelList?.portfolioRebidList?.length
                    }
                  />
                </td>
                <td valign="top" className={styles.rightTd}>
                  <div>
                    <table className={styles.SecondHeading}>
                      <tr>
                        <td className={styles.dueDateLabel}>
                          <span className={styles.ddheader}>
                            Default Rebid Due Date:
                          </span>

                          <CCalendar
                            id={"rebidduedate"}
                            inputId={"rebidduedate"}
                            value={defaultDueDate}
                            onChange={setCalendarValue}
                            onInput={validateDateLength}
                            onHide={calendarHide}
                            inputClassName={styles.calendarInput}
                            onBlur={validateDateValue}
                            hasCustomMonth={true}
                            //minDate={Utils.getTodayDate()}
                          />
                        </td>

                        <td className={styles.buttonStyle}>
                          <input
                            type="button"
                            onClick={() => {
                              setSendMailModal(true);
                            }}
                            className={styles.sendEmail}
                          />
                        </td>
                        <td className={styles.buttonStyle}>
                          <input
                            type="button"
                            className={styles.additionalEmailInfo}
                            onClick={() =>
                              panelData.strFilterValues
                                ? setSendAdditional(true)
                                : alert("Please select an account.")
                            }
                          />
                        </td>
                        <td
                          style={{
                            paddingLeft: 15,
                            whiteSpace: "nowrap",
                            verticalAlign: "bottom",
                          }}
                        >
                          <a
                            href="javascript:void(0);"
                            className={styles.header}
                            onClick={(e) => setDirectSelect(true)}
                          >
                            {Settings.directSelect}
                          </a>
                        </td>
                        <td
                          style={{
                            paddingLeft: 15,
                            whiteSpace: "nowrap",
                            verticalAlign: "bottom",
                          }}
                        >
                          <a
                            href="javascript:void(0);"
                            className={styles.header}
                            onClick={(e) => clearDirectSelect()}
                          >
                            {Settings.clearSelection}
                          </a>
                        </td>
                        <td
                          style={{
                            paddingLeft: 15,
                            whiteSpace: "nowrap",
                            verticalAlign: "bottom",
                          }}
                        >
                          <a
                            href="javascript:void(0);"
                            className={styles.header}
                            onClick={(e) => setQuickSelect(true)}
                          >
                            Rebid Quick Select
                          </a>
                        </td>
                        {accountStatus &&
                        (accountStatus === "SOL" ||
                          accountStatus === "V" ||
                          accountStatus === "ALL") ? (
                          ""
                        ) : (
                          <td className={styles.buttonStyle}>
                            <input
                              type="button"
                              onClick={() => rebidAll()}
                              className={styles.rebidAll}
                            />
                          </td>
                        )}
                      </tr>
                    </table>
                  </div>

                  <div>
                    <RebidList
                      key={refresh}
                      value={filteredHotelList ? filteredHotelList : []}
                      handleOrderChange={handleSorting}
                      onChangeFieldValue={onChangeFieldValue}
                      panelData={panelData}
                      save={ajaxSave}
                      defaultDueDate={defaultDueDate}
                      ajaxSaveInprogress={ajaxSaveInprogress}
                      loader={loader}
                      isMakingRequest={isMakingRequest}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
      .p-datepicker {
          width: auto;
          position: absolute;
          top: 3px;
          left: 0;
          background: white;
          z-index:999999;
      }
      .p-datepicker .p-datepicker-header .p-datepicker-prev, .p-datepicker .p-datepicker-header .p-datepicker-next {
          width: 2rem;
          height: 2rem;
          color: #a6a6a6;
          border: 0 none;
          background: transparent;
          border-radius: 50%;
          transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
      }
        .p-datepicker-inline {
          flex-direction: column;
          position: absolute;
        }
        .p-datepicker-header{
          background: #e9e9e9 !important;
          border-radius: 3px !important;
          padding: 0px !important
        }
        .p-datepicker-group{
          padding: 3px !important;
        }
        .p-datepicker-month{
          height: 20px;
          margin-right: 0px !important;
        }
        .p-datepicker table{
          font-size: 11px;
          margin: 0px !important;
          border-collapse: unset !important;
        }
        .p-datepicker table td {
          padding: 0px !important;
        }
        .p-datepicker table td span{
          border: 1px solid #c5c5c5 !important;
          justify-content: flex-end !important;
          border-radius : 0px !important;
          width: 1.7rem !important;
          height: 1.2rem !important;
          padding 3px !important;                          
        }
        .p-datepicker table td.p-datepicker-today > span{
          background: #fffa90;
        }
        .p-inputtext{
          width: 75px !important;
          height: 15px;
          border-radius: 2px !important;
          font-size: 11px !important;
          padding: 0px;
        }
        .p-datepicker .p-datepicker-header .p-datepicker-prev:focus,
        .p-datepicker .p-datepicker-header .p-datepicker-next:focus{
          box-shadow: none !important;
        }
        .p-datepicker .p-datepicker-header .p-datepicker-prev:enabled:hover,
        .p-datepicker .p-datepicker-header .p-datepicker-next:enabled:hover{
          color: #e9e9e9 !important;
        }
        .p-datepicker .p-datepicker-header .p-datepicker-title select:focus{
          box-shadow: none !important;
          border-color: #000000 !important;
        }
        .pi-chevron-left:before{
          content: "\\e928";
          background: #000000;
          border-color: transparent !important;
          border-radius: 50%;
        }
        .pi-chevron-right:before{
          content: "\\e92a";
          background: #000000;
          border-color: transparent !important;
          border-radius: 50%;
        }
        .p-datepicker .p-datepicker-header {
          padding: 0.5rem;
          color: #333333;
          background: #ffffff;
          font-weight: 700;
          margin: 0;
          border-bottom: 0 none;
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
      }
      .p-datepicker-title{
          display:inline;
      }
      .p-datepicker table td span {
          border:none;
      }
      p-datepicker table td {
          padding: 2px !important;
          border: 1px solid #c5c5c5 !important;
          justify-content: flex-end !important;
          border-radius: 0px !important;
          width: 1.7rem !important;
          height: 1.2rem !important;
      }
      .pi-calendar:before {
          content: "";
      }
      .p-button:active{
          border:none;
          outline:none;
      }
      .container{
        min-width:1010px;
      }
      #filterdiv{
          height:calc(100vh - 146px) !important;
      }
      @media only screen and (max-width: 1010px) {
        #dataGrid {
          height: calc(100vh - 223px) !important;
          margin-top:0;
        }
        #table_2 {
          height: calc(100vh - 203px) !important;
        }
        #filterdiv {
          margin-top: 40px !important;
          height:calc(100vh - 202px) !important;
        }
        .filermaindesign {
          overflow: hidden !important;
        }
        .page_body_container{
          min-height:calc(100vh - 107px) !important;
        }
        .footerwidget{
          position:fixed;
        }
      }
      `}</style>
    </>
  );
};
