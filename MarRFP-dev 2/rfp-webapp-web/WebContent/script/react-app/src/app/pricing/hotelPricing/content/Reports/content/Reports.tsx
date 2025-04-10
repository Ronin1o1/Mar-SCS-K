import React, { useEffect, useState } from "react";
import ReportContext, {
  ReportContextProvider,
} from "../context/ReportContextProvider";
import { useLocation } from "react-router-dom";
import API from "../service/API";
import styles from "./Report.css";
import deselectBtn from "../../../../../common/assets/img/button/btnUnSelectAll.gif";
import submittBtn from "../../../../../common/assets/img/button/btnSubmit.gif";

import Settings from "../static/Settings";
import QuickSelect from "../../../../../shared/components/quickSelect";
import CModal from "../../../../../common/components/CModal";
import CReportGrid from "./CReportGrid";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";

import { ReportsWindow } from "./ReportsTitleWindow";
import CIFrame from "../../../../../common/components/CIFrame";
// import Settings from "../../static/Settings";

let contextType = null;
let pickUpCount;
let congnosEndPointUrl;
// let hotelid;

function Reports(params) {
  const [activeRow, setActiveRow] = useState(null);
  const [url, setUrl] = useState("");
  const [selectedRecords, setSelectedRecords] = useState(0);
  const [showQuickSelect, setshowQuickSelect] = useState(false);
  const [lastSelectedRow, setLastSelectedRow] = useState();
  const [showReport, setshowReport] = useState(false);
  const handleRowSelection = (index: number) => {
    setActiveRow(index);
  };
  const urlParms = useLocation().search;

  // period = new URLSearchParams(urlParms).get("Period");
  const [year, setPeriod] = useState(
    new URLSearchParams(urlParms).get("Period")
  );

  // hotelid = new URLSearchParams(urlParms).get("HoteId");
  const [hotelid, setHotelid] = useState(
    new URLSearchParams(urlParms).get("HoteId")
  );
  const [reportName, setreportName] = useState(
    new URLSearchParams(urlParms).get("ReportName")
  );
  const [reportHeader, setreportHeader] = useState(
    new URLSearchParams(urlParms).get("ReportName")
  );
  const screenHeight = screen.height - 100;
  useEffect(() => {
    getdata();
    getCognosUrl();
    if (
      reportName === Settings.reportTabs.acceptanceStatus ||
      reportName === Settings.reportTabs.acceptanceStatusExcel ||
      reportName === Settings.reportTabs.accountPricing
    ) {
      pickUpCount = 40;
    } else {
      pickUpCount = 20;
    }
  }, []);

  useEffect(() => {
    const count = contextType.state.hotelList.list.filter(
      (obj) => obj.isChecked === true
    );
    contextType.setSelectedIds(count);
  }, [selectedRecords]);

  const getCognosUrl = () => {
    API.getCongnosUrl()
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((data) => {
        congnosEndPointUrl = data.REPORT_ONDEMAND_URL;
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getdata = () => {
    const parms = {
      period: year,
      hotelid: hotelid,
    };
    contextType.setLoader(true);
    setReportHeader();
    API.getAccountStatusReport(parms, reportName)
      .then((data) => {
        contextType.setLoader(false);
        const response = data;
        if (pickUpCount > data.length) {
          pickUpCount = data.length;
        }
        response.map((res) => {
          res["isChecked"] = false;
        });
        contextType.setGridDataList(response);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };

  const setReportHeader = () => {
    if (reportName == Settings.reportTabs.acceptanceStatus) {
      setreportHeader(Settings.reportTabsHeader.acceptanceStatus);
    } else if (reportName == Settings.reportTabs.acceptanceStatusExcel) {
      setreportHeader(Settings.reportTabsHeader.acceptanceStatusExcel);
    } else if (reportName == Settings.reportTabs.addendumQuestions) {
      setreportHeader(Settings.reportTabsHeader.addendumQuestions);
    } else if (reportName == Settings.reportTabs.accountPricing) {
      setreportHeader(Settings.reportTabsHeader.accountPricing);
    } else if (reportName == Settings.reportTabs.accountDirectory) {
      setreportHeader(Settings.reportTabsHeader.accountDirectory);
    } else if (reportName == Settings.reportTabs.topTravelMarkets) {
      setreportHeader(Settings.reportTabsHeader.topTravelMarkets);
    } else if (reportName == Settings.reportTabs.rebidReport) {
      setreportHeader(Settings.reportTabsHeader.rebidReport);
    } else if (reportName == Settings.reportTabs.SpecialCorporatePricing) {
      setreportHeader(Settings.reportTabsHeader.SpecialCorporatePricing);
    } else if (reportName == Settings.reportTabs.SCPTDetailExtract) {
      setreportHeader(Settings.reportTabsHeader.SCPTDetailExtract);
    } else if (reportName == Settings.reportTabs.SCPTSummaryExtract) {
      setreportHeader(Settings.reportTabsHeader.SCPTSummaryExtract);
    } else if (reportName == Settings.reportTabs.SummaryTax) {
      setreportHeader(Settings.reportTabsHeader.SummaryTax);
    }
  };
  const deselectHotlList = () => {
    setLastSelectedRow(null);
    setSelectedRecords(0);
    contextType.deselect();
  };
  const quickSelectSave = (marshaList) => {
    marshaList = marshaList.replace(/\s/g, "");
    const initialMarshaList = marshaList;
    const length = pickUpCount * 6 + 1;
    const initialHotelList = [...contextType.state.hotelList.list];
    const selectedMarshaCount = initialHotelList.filter(
      (item) => item.isChecked === true
    );
    const selectedValidMarsha = selectedMarshaCount.map(
      (item) => item.marshaCode
    );

    marshaList = marshaList.replace(/[^a-zA-Z,]/g, "");

    const re = /^[a-zA-Z\,]/;
    if (!re.test(marshaList)) {
      alert("Please enter only marshacodes seperated by a ,");
      setshowQuickSelect(false);
      return;
    }
    const validMarsha = [];
    const invalidMarsha = [];
    let fullMList = marshaList.split(",");
    fullMList = fullMList.filter((item) => item.length > 0);
    fullMList.map((marsha) => {
      if (marsha.length === 5) {
        const vMarsha = contextType.state.hotelList.list.filter(
          (y) => y.marshaCode == marsha.toUpperCase()
        );
        if (vMarsha.length) {
          validMarsha.push(vMarsha[0].marshaCode);
        } else {
          invalidMarsha.push(marsha);
        }
      } else {
        const parMarsha = contextType.state.hotelList?.list.filter((x) => {
          return x?.marshaCode?.toUpperCase().startsWith(marsha.toUpperCase());
        });
        if (parMarsha.length) {
          validMarsha.push(parMarsha[0].marshaCode);
        } else {
          invalidMarsha.push(marsha);
        }
      }
    });
    marshaList =
      selectedValidMarsha.length > 0
        ? `${selectedValidMarsha.join(",")},${validMarsha.join(",")}`
        : validMarsha.join(",");
    if (fullMList.length > 0) {
      if (initialMarshaList.length > length || marshaList.length > length) {
        const moreLength = marshaList;
        const moreLengthMarsha = moreLength.slice(length - 1);
        const alertMCode =
          invalidMarsha.length && moreLengthMarsha.length
            ? `${invalidMarsha.join(",")},${moreLengthMarsha}`
            : invalidMarsha.length && !moreLengthMarsha.length
            ? invalidMarsha.join(",")
            : moreLengthMarsha;
        alert(
          "The following MARSHA codes where either not found or exceeded the limit allowed\n" +
            alertMCode
        );
        marshaList = marshaList.substring(0, length - 1);
      } else if (invalidMarsha.length) {
        alert(
          "The following MARSHA codes where not found " +
            invalidMarsha.join(",")
        );
      }
    }
    contextType.setQuickSelectList(marshaList);

    const selectedCount = marshaList
      .split(",")
      .filter(
        (item, index) =>
          item.length > 0 && marshaList.split(",").indexOf(item) === index
      );
    setSelectedRecords(selectedCount.length);
    setshowQuickSelect(false);
  };
  const onCheckBox = (data, i, event) => {
    setLastSelectedRow(i);
    if (
      event.nativeEvent.shiftKey &&
      lastSelectedRow !== undefined &&
      lastSelectedRow !== null &&
      data.isChecked == false
    ) {
      if (selectedRecords < pickUpCount) {
        if (i > lastSelectedRow) {
          let ite = i;
          const newRows = i - lastSelectedRow;
          if (selectedRecords + newRows > pickUpCount) {
            ite = lastSelectedRow + (pickUpCount - selectedRecords);
            alert("Pick up to " + pickUpCount + " hotels");
          }
          for (let item = lastSelectedRow + 1; item <= ite; item++) {
            contextType.state.hotelList.list[item].isChecked = !data.isChecked;
          }
        } else if (i < lastSelectedRow) {
          let ite = i;
          const newRows = lastSelectedRow - i;
          if (selectedRecords + newRows > pickUpCount) {
            ite = lastSelectedRow - (pickUpCount - selectedRecords);
            alert("Pick up to " + pickUpCount + " hotels");
          }
          for (let item = lastSelectedRow - 1; item >= ite; item--) {
            contextType.state.hotelList.list[item].isChecked = !data.isChecked;
          }
        }
        const count = contextType.state.hotelList.list.filter(
          (obj) => obj.isChecked === true
        );

        contextType.setSelectedIds(count);

        setSelectedRecords(count.length);
      } else {
        alert("Pick up to " + pickUpCount + " hotels");
      }
    } else {
      if (
        selectedRecords < pickUpCount ||
        (selectedRecords === pickUpCount && data.isChecked == true)
      ) {
        contextType.state.hotelList.list[i].isChecked =
          !contextType.state.hotelList.list[i].isChecked;
        const count = contextType.state.hotelList.list.filter(
          (obj) => obj.isChecked === true
        );

        contextType.setSelectedIds(count);

        setSelectedRecords(count.length);
        if (count.length > pickUpCount) {
          alert("Pick up to " + pickUpCount + " hotels");
        }
      } else {
        alert("Pick up to " + pickUpCount + " hotels");
      }
    }
  };
  const onSort = (selectedHeader) => {
    let gridData;
    if (selectedHeader == "marshaCode") {
      gridData = contextType.state.hotelList.list.sort((a, b) =>
        a.marshaCode > b.marshaCode ? 1 : -1
      );
    } else if (selectedHeader == "hotelName") {
      gridData = contextType.state.hotelList.list.sort((a, b) =>
        a.hotelName > b.hotelName ? 1 : -1
      );
      contextType.setLoader(true);
    } else if (selectedHeader == "city") {
      gridData = contextType.state.hotelList.list.sort((a, b) =>
        a.city > b.city ? 1 : -1
      );
    } else if (selectedHeader == "state") {
      gridData = contextType.state.hotelList.list.sort((a, b) =>
        a.state > b.state ? 1 : -1
      );
    } else if (selectedHeader == "country") {
      gridData = contextType.state.hotelList.list.sort((a, b) =>
        a.country > b.country ? 1 : -1
      );
    }
    contextType.setGridDataList(gridData);
  };
  const onSubmit = () => {
    if (selectedRecords === 0) {
      alert("Please select at least one hotel for the report.");
    } else {
      const selectedIds = [];
      contextType.state.selectedHotelList.list.map((res) => {
        selectedIds.push(res.hotelid);
      });
      const parms = {
        numItems: contextType.state.hotelList.list.length,
        orderBy: "",
        period: year,
        strHotelids: JSON.stringify(selectedIds),
      };

      API.generateHotelPricingReports(parms, reportName)
        .then((res) => {
          const url = congnosEndPointUrl + "&" + res.reportQueryString;
          setUrl(url);
          setshowReport(true);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    }
  };

  return (
    <ReportContextProvider>
      <ReportContext.Consumer>
        {(report) => {
          contextType = report;

          return (
            <div>
              <CModal
                title={"Quick Select"}
                xPosition={-275}
                yPosition={-80}
                onClose={(e) => {
                  setshowQuickSelect(false);
                }}
                show={showQuickSelect}
              >
                <QuickSelect
                  save={(e) => quickSelectSave(e)}
                  cancel={(e) => setshowQuickSelect(false)}
                  quickSelectObject={{
                    label: "Hotel List:",
                    cols: 100,
                    rows: 10,
                  }}
                />
              </CModal>
              {showReport ? (
                <div>
                  <ReportsWindow
                    closeWindowPortal={true}
                    title={reportHeader}
                    popup={false}
                  >
                    <CIFrame
                      src={url}
                      componentName={"viewReort"}
                      // hiddenSrc={
                      //   "https://extranetcloudtest.marriott.com/rfptc/rfp-webapp-web/home/home.action"
                      // }
                      width="100%"
                      height={screenHeight}
                    ></CIFrame>
                  </ReportsWindow>
                  <style>{`
                    
                    .container{
                      display:none!important;
                    }
                  
                  `}</style>
                </div>
              ) : (
                <div className={styles.reportBody}>
                  <div className={styles.header}>
                    {year} {reportName}
                  </div>
                  <div className="instructions">
                    {Settings.labels.PickUp} {pickUpCount}{" "}
                    {Settings.labels.hotels}
                  </div>
                  <div className={styles.deselect}>
                    <img src={deselectBtn} onClick={() => deselectHotlList()} />
                  </div>
                  <span
                    className={styles.quickSelect}
                    onClick={() => setshowQuickSelect(true)}
                  >
                    {Settings.labels.QuickSelect}
                  </span>
                  {contextType.state.showScreenLoader ? (
                    <img className={styles.loaderImg} src={screenLoader}></img>
                  ) : (
                    ""
                  )}
                  {contextType.state.hotelList.list.length >= 1 ? (
                    <div>
                      <div className={styles.leftDiv}>
                        <CReportGrid
                          key={`report_window_${showQuickSelect}`}
                          data={contextType.state.hotelList.list}
                          handleRowSelection={handleRowSelection}
                          onCheckBox={onCheckBox}
                          onSort={onSort}
                        ></CReportGrid>
                        <div className={styles.submit}>
                          <img src={submittBtn} onClick={() => onSubmit()} />
                        </div>
                      </div>

                      <span className={styles.rightDiv}>
                        <div className={styles.field_Name}>
                          {Settings.labels.Numberofhotelsavailable}{" "}
                          <span className={styles.field_Value}>
                            {" "}
                            {contextType.state.hotelList.list.length}
                          </span>
                        </div>
                        <div className={styles.field_Name}>
                          {Settings.labels.Numberofhotelsselected}{" "}
                          <span className={styles.field_Value}>
                            {" "}
                            {selectedRecords}
                          </span>
                        </div>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}

              <style>{`
                    nav{
                      display:none!important;
                    } 
                    #subMenu{
                      display:none!important;
                    }
                    #footerID{
                      display: none!important;
                    }
                    
                  
                  `}</style>
            </div>
          );
        }}
      </ReportContext.Consumer>
    </ReportContextProvider>
  );
}

export default Reports;
