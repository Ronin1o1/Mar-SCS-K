import React, {
  useEffect,
  useContext,
  Suspense,
  useState,
  useRef,
} from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import styles from "./portfolioCBCStatus.css";
import Settings from "./../static/Settings";
import CCheckbox from "../../../../common/components/CCheckbox";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import PortfolioCBCStatusContext from "./../context/portfolioCBCStatusContext";
import CIFrame from "../../../../common/components/CIFrame";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import QuickSelect from "../../../../shared/components/quickSelect";
import CBCStatusGrid from "../grid/CBCStatusGrid";
import { isEqual } from "lodash";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const PortfolioCBCStatus: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const {
    getPortfolioCBCStatusPanelData,
    FindFilterData,
    showFilterOptions,
    numItems,
    rejectionReasonsData,
    getshowFilterOptions,
    getFindFilter,
    getRejectionReasons,
    filteredHotelList,
    onChangeFeildValue,
    selectedHotelId,
    showQuickSelectTop,
    quickSelectGrid1BtnClicked,
    quickSelectTopSaved,
    CBCRunReport,
    rightPanelViewGrid,
    reportUrl,
    panelData,
    handleOrderChange,
    setFiltertedList,
    saveFormData,
    isQuickSelectClickable,
    setShowRefreshAlert,
    showRefreshAlert,
    isAcceptRejectAllClicked,
    setIAcceptRejectAllClicked,
    isMakingRequest,
    getPortfolioCBCStatusPanelDataDup,
  } = useContext(PortfolioCBCStatusContext);

  const [alertModalForCommaValidate, setalertModalForCommaValidate] =
    useState(false);
  const [alertModalFor200Limit, setalertModalFor200Limit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const softDueDateValue =
    filteredHotelList && filteredHotelList.length > 0
      ? filteredHotelList[0].strCbc_softduedate
      : "";
  const [selectedID, setSelectedID] = useState([]);

  const marshaCodeKey = Settings.marshacode;

  useEffect(() => {
    try {
      getshowFilterOptions();
      getRejectionReasons();
      getFindFilter();
    } catch (e) {}
    localStorage.removeItem("panelDataToCompare");

    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPortfolioCBCStatusPanelDataDup(localStorage.getItem("port_CBCStat"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("port_CBCStat");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("port_CBCStat");
    };
  }, []);

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

  const hotelidCheckbox = (rowData, checkboxHotelId) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <CCheckbox
            type={Settings.inputType.checkbox}
            id={Settings.hotelList + rowData.hotelid}
            name={Settings.hotelList + rowData.hotelid}
            onChangeHandler={(e) =>
              onChangeFeildValue(rowData, selectedHotelId, event)
            }
            checked={checkboxHotelId}
          ></CCheckbox>
        ) : (
          ""
        )}
      </>
    );
  };

  const gridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,
      body: hotelidCheckbox,
      style: { width: "25px" },
      sortable: false,
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "55px" },
      sortable: true,
    },
    {
      field: Settings.tableColumns.hotelName.field,
      header: Settings.tableColumns.hotelName.header,
      style: { width: "235px" },
      sortable: true,
    },
    {
      field: Settings.tableColumns.status.field,
      header: Settings.tableColumns.status.header,
      style: { width: "55px" },
      sortable: true,
      subHeader: [
        {
          field: Settings.tableColumns.status.field,
          header: Settings.tableColumns.status.header,
          style: { width: "235px" },
          sortable: true,
        },
      ],
    },
    {
      field: Settings.tableColumns.rejectionReason.field,
      header: Settings.tableColumns.rejectionReason.header,
      style: { width: "55px" },
      sortable: true,
    },
    {
      field: Settings.tableColumns.cbcCreateDate.field,
      header: Settings.tableColumns.cbcCreateDate.header,
      style: { width: "55px" },
      sortable: true,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "105px" },
      sortable: true,
    },
  ];

  const validateMarshaCode = (param, completeList) => {
    let bOK = true;
    const thelistobj = completeList;
    if (thelistobj.length == 0) bOK = false;
    let thelist = param;
    if (bOK) {
      thelist = thelist.replace(/[^a-zA-Z,]/g, "");
    }

    if (bOK) {
      const re = /^[a-zA-Z\,]/;
      if (!re.test(thelist)) {
        bOK = false;
        setalertModalForCommaValidate(true);
      }
    }

    if (bOK) {
      if (thelist.length > 1200) {
        setalertModalFor200Limit(true);
        bOK = false;
      }
    }
    let data = [];
    if (bOK) {
      data = FilteredGridSelectUtils.selectHotels(
        thelist,
        completeList,
        marshaCodeKey
      );
    }
    return data;
  };

  const SaveQuickSelect = async (params) => {
    let selectedMarshaCodes = "";
    let selectedHotelIds = selectedHotelId.concat(selectedID);
    if (params.action == "rej_all_pro" || params.action === "acc_all_pro") {
      const list = [];
      gethotelSolicitAvailList(filteredHotelList).map((x) => {
        list.push({ hotelid: x.hotelid, marshacode: x.marshacode });
      });
      selectedMarshaCodes = list.map((x) => x.marshacode).join(",");
      selectedHotelIds = list.map((x) => x.hotelid);
    } else {
      if (selectedID.length != 0) {
        selectedMarshaCodes = selectedHotelIds
          .map((y) => {
            return filteredHotelList.filter((x) => x.hotelid == y)[0]
              ?.marshacode;
          })
          .toString();
      } else {
        selectedMarshaCodes = params.textField;
      }
    }

    const data = validateMarshaCode(
      selectedMarshaCodes,
      getGridDetails().availgridRows
    );

    const updatedList = data.map((x) => {
      if (!selectedID.includes(x.hotelid)) {
        const selectedVal = (rejectionReasonsData ?? []).find(
          (x) => x.rejectreasonid === parseInt(params.rjReason)
        );
        return {
          changed: x.status == "A" || x.status == "R" ? "N" : "Y",
          hotelid: x.hotelid,
          hotelname: x.hotelname,
          marshacode: x.marshacode,
          rejectionreason:
            params.action === "rej_all_pro" ||
            params.action === "rej_by_pro" ||
            params.action === "up_rej_reas"
              ? selectedVal.rejectionreason
              : null,
          rejectreasonid:
            params.action === "rej_all_pro" ||
            params.action === "rej_by_pro" ||
            params.action === "up_rej_reas"
              ? params.rjReason
              : null,
          status: x.status,
        };
      } else {
        return {
          changed: "Y",
          hotelid: x.hotelid,
          hotelname: x.hotelname,
          marshacode: x.marshacode,
          rejectionreason:
            params.action === "rej_all_pro" ||
            params.action === "rej_by_pro" ||
            params.action === "up_rej_reas"
              ? x.rejectionreason
              : null,
          rejectreasonid:
            params.action === "rej_all_pro" ||
            params.action === "rej_by_pro" ||
            params.action === "up_rej_reas"
              ? x.rejectreasonid
              : null,
          status: x.status,
        };
      }
    });

    quickSelectTopSaved(
      params.action,
      params.rjReason,
      updatedList,
      selectedHotelIds,
      panelData
    );
    setSelectedID([]);
  };

  const getGridDetails = () => {
    const availGrid = {
      availgridColumns: gridColumns,
      availgridRows: filteredHotelList
        ? gethotelSolicitAvailList(filteredHotelList)
        : [],
      id: Settings.gridTR,
      width: Settings.width630,
      scroll: Settings.height248,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        row: Settings.quickSelectObject.row,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
    return availGrid;
  };

  const getCBCRunReport = () => {
    CBCRunReport(panelData);
  };

  const handleSorting = (param) => {
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    handleOrderChange(dataitem, param);
  };

  const handleRejectionReasonClick = (value) => {
    setShowModal(value);
  };

  const gethotelSolicitAvailList = (data) => {
    const arr = [];
    if (data) {
      data.map((element) => {
        const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
          selectedHotelId,
          element,
          Settings.tableColumns.hotelid.field
        );
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: hotelidCheckbox(element, checkboxHotelId),
          checkboxHotelId_checked: checkboxHotelId,
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelName.field],
          status: element[Settings.tableColumns.status.field],
          rejectionreason: element[Settings.tableColumns.rejectionReason.field],
          rejectreasonid: element[Settings.tableColumns.rejectreasonid.field],
          strCbccreatedate: element[Settings.tableColumns.cbcCreateDate.field],
          strCbc_softduedate:
            element[Settings.tableColumns.strCbc_softduedate.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          isSolicited: element[Settings.tableColumns.isSolicited.field],
          changed: element.changed ?? "N",
          rejectionReasonChecked: false,
        };
        arr.push(obj);
      });
    }
    return arr;
  };

  const getMarshCodes = () => {
    const list =
      selectedHotelId &&
      gethotelSolicitAvailList(filteredHotelList).filter((x) => {
        if (selectedHotelId.some((i) => i === parseInt(x.hotelid)))
          return x.marshacode;
      });
    return list.map((x) => x.marshacode).join(",");
  };

  const handleAjaxSave = (item) => {
    setFiltertedList(item);
  };

  const handleSave = () => {
    panelData.formChg = "Y";
    saveFormData(panelData);
    getPortfolioCBCStatusPanelData(panelData);
    setSelectedID([]);
  };

  const handleRetrieveList = (requestPayload) => {
    const panelDataToCompare =
      localStorage.getItem("panelDataToCompare") || JSON.stringify([]);
    if (isEqual(JSON.parse(panelDataToCompare), filteredHotelList)) {
      getPortfolioCBCStatusPanelData(requestPayload);
    } else {
      if (
        window.confirm(
          "Your data has not been saved. Press OK to continue and CANCEL to stop."
        )
      ) {
        getPortfolioCBCStatusPanelData(requestPayload);
      }
    }
  };

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.SubContainer}>
          <>
            {!showRefreshAlert && isAcceptRejectAllClicked ? (
              <CModal
                title={"Alert"}
                xPosition={-400}
                yPosition={-100}
                onClose={() => {
                  setShowRefreshAlert(true);
                  setIAcceptRejectAllClicked(false);
                }}
                show={!showRefreshAlert && isAcceptRejectAllClicked}
              >
                <div style={{ padding: "4px" }}>Data is being refreshed</div>
              </CModal>
            ) : (
              ""
            )}
            <CModal
              title={Settings.quickSelectLabel}
              onClose={(e) => {
                quickSelectGrid1BtnClicked(true);
              }}
              show={showQuickSelectTop && isQuickSelectClickable}
              xPosition={-100}
              yPosition={-250}
            >
              <Suspense fallback={<CSuspense />}>
                <QuickSelect
                  quickSelectObject={{
                    textField: getMarshCodes(),
                    componentName: "portfolioCBCStatus",
                    label: Settings.QuickSelectPopupLabel,
                    textareaId: Settings.quickSelectObject.textareaId,
                    row: 12,
                    cols: 100,
                    textareaName: Settings.quickSelectObject.textareaName,
                    rejectionReasonList: rejectionReasonsData,
                  }}
                  selectedMarshaCodes={getMarshCodes()}
                  save={(e) => SaveQuickSelect(e)}
                  cancel={(e) => {
                    quickSelectGrid1BtnClicked(true);
                  }}
                  rejectionReasonList={rejectionReasonsData}
                />
              </Suspense>
            </CModal>
            <CModal
              title={Settings.alertMessage}
              onClose={(e) => {
                setalertModalForCommaValidate(false);
              }}
              show={alertModalForCommaValidate}
              xPosition={-100}
              yPosition={-100}
              closeImgTitle={Settings.okClose}
            >
              <div
                style={{ maxWidth: 250, minWidth: 180, padding: "9px 12px" }}
              >
                {Settings.marshacodeSeparatedByComma}
              </div>
            </CModal>
            <CModal
              title={Settings.alertMessage}
              onClose={(e) => {
                setalertModalFor200Limit(false);
              }}
              show={alertModalFor200Limit}
              xPosition={-100}
              yPosition={-100}
              closeImgTitle={Settings.okClose}
            >
              <div
                style={{ maxWidth: 250, minWidth: 180, padding: "9px 12px" }}
              >
                {Settings.enter200Hotels}
              </div>
            </CModal>
            <table width="100%">
              <tbody>
                <tr>
                  <td className={styles.header}> Pricing : CBC Status</td>
                </tr>
                <tr className={styles.BGDarkBlueStyle}>
                  <td style={{ height: "2px" }} />
                </tr>
              </tbody>
            </table>
            <table className={styles.cbcdatatable}>
              <tbody className={styles.cbcdatatablebody}>
                <tr
                  id="filterTR"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div className={styles.filter}>
                    <Filter
                      componentName={Settings.portfolioCBCStatus}
                      getPanelData={handleRetrieveList}
                      filterViewLists={Settings.api.getFilterViewLists}
                      findFilters={FindFilterData}
                      showOptions={showFilterOptions}
                      numItems={numItems}
                      save={handleSave}
                      CBCRunReport={getCBCRunReport}
                      isAccountRequired={true}
                    />
                  </div>
                  <div className={styles.content}>
                    {rightPanelViewGrid ? (
                      <>
                        <table className={styles.SecondHeading}>
                          <tr>
                            <td></td>
                            <td className={styles.quickSelect}>
                              <a
                                href="javascript:void(0);"
                                style={{ fontWeight: "bold" }}
                                onClick={(e) => {
                                  quickSelectGrid1BtnClicked(true);
                                }}
                              >
                                {Settings.quickSelect}
                              </a>
                            </td>
                            <td className={styles.secondHeading}>
                              <span>CBC Soft Due Date:</span>
                            </td>
                            <td>{softDueDateValue}</td>
                          </tr>
                        </table>
                        <div
                          style={{
                            border: "2px solid #9b9b9b",
                            width: "100%",
                            display: "block",
                            overflow: "auto",
                          }}
                        >
                          <CBCStatusGrid
                            selectedHotelId={selectedHotelId}
                            selectedID={selectedID}
                            setSelectedID={setSelectedID}
                            value={gethotelSolicitAvailList(filteredHotelList)}
                            handleOrderChange={handleSorting}
                            onChangeFeildValue={onChangeFeildValue}
                            ajaxSave={handleAjaxSave}
                            rejectionReasonLinkClick={
                              handleRejectionReasonClick
                            }
                            rejectionReasonsData={rejectionReasonsData}
                            dataMessageVisible={isQuickSelectClickable}
                            isMakingRequest={isMakingRequest}
                          ></CBCStatusGrid>
                        </div>
                      </>
                    ) : (
                      <CIFrame
                        src={reportUrl}
                        width={Settings.width630}
                        height={Settings.height248}
                      ></CIFrame>
                    )}
                  </div>
                </tr>
              </tbody>
            </table>
          </>
        </div>
      </div>
      <style>{`
      #filterdiv{
          height:calc(100vh - 146px) !important;
      }
      @media only screen and (max-width: 1500px) {
        #cbcStatusGrid{
          height: calc(100vh - 205px) !important;
        }
        #filterdiv {
          height: calc(100vh - 142px) !important;
        }
      }
      @media only screen and (max-width: 1920px) {
        #filterdiv{
          height:calc(100vh - 149px) !important;
        }
        #cbcStatusGrid{
          height: calc(100vh - 196px) !important;
        }
      }
      #loading{
        text-align: center;
        display: inline;
        position: fixed;
        width: 1135px !important;
        height: calc(100vh - 197px) !important;
        top: 175px !important;
      }
      `}</style>
    </>
  );
};
