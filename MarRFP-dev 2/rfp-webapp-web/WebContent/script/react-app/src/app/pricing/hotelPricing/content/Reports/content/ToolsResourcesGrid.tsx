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
import CIFrame from "../../../../../common/components/CIFrame";

let contextType = null;
let congnosEndPointUrl;

const ToolsResourcesGrid = (): JSX.Element => {
  const [activeRow, setActiveRow] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState(0);
  const [submitClick, setSubmitClick] = useState(false);
  const [showQuickSelect, setQuickSelect] = useState(false);
  const [cognosUrls, setCognosUrls] = useState(null);
  const [hiddenSrc, setHiddenSrc] = useState(null);

  const handleRowSelection = (index: number) => {
    setActiveRow(index);
  };
  const urlParms = useLocation().search;

  const [year, setPeriod] = useState(
    new URLSearchParams(urlParms).get("Period")
  );

  const [reportName, setreportName] = useState(
    new URLSearchParams(urlParms).get("ReportName")
  );
  const [refreshReport, setRefreshReport] = useState(null);

  useEffect(() => {
    getCognosUrl();

    if (reportName === Settings.toolsTabs.HotelSelfReport) {
      getdata(false);
    } else if (reportName === Settings.toolsTabs.HotelCSRReport) {
      getdata(true);
    }
  }, []);
  useEffect(() => {
    const selectedids = contextType.state.hotelList.list.filter(
      (item) => item.isChecked == true
    );
    contextType.setSelectedIds(selectedids);
  }, [selectedRecords]);

  const getCognosUrl = () => {
    API.getCongnosUrl()
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((data) => {
        congnosEndPointUrl = data.REPORT_ONDEMAND_URL;
        setCognosUrls(data);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getdata = (isCSR: boolean) => {
    const parms = {
      period: year,
    };
    contextType.setLoader(true);
    API.getHotelSelfAudit(parms, isCSR)
      .then((data) => {
        contextType.setLoader(false);
        const response = data;
        response.map((res) => {
          res["isChecked"] = false;
        });
        contextType.setGridDataList(response);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const deselectHotlList = () => {
    setSelectedRecords(0);
    contextType.deselect();
  };
  const quickSelectSave = (marshaList) => {
    marshaList = marshaList.replace(/\s/g, "");
    const initialMarshaList = marshaList;
    const length = 1200;
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
      return;
    }

    if (marshaList.length > 1200) {
      alert(Settings.alerts.maxHotels);
      setQuickSelect(false);
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
    setQuickSelect(false);
  };

  const onCheckBox = (data, i) => {
    contextType.state.hotelList.list[i].isChecked =
      !contextType.state.hotelList.list[i].isChecked;
    const count = contextType.state.hotelList.list.filter(
      (obj) => obj.isChecked === true
    );

    contextType.setSelectedIds(count);

    setSelectedRecords(count.length);
  };

  const onSubmit = () => {
    let isCSR = false;
    if (reportName === Settings.toolsTabs.HotelSelfReport) {
      isCSR = false;
    } else if (reportName === Settings.toolsTabs.HotelCSRReport) {
      isCSR = true;
    }
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
    API.submitToolsResourcesSelfAudit(parms, isCSR)
      .then((res) => {
        setSubmitClick(true);
        const url = res.reportQueryString2;
        // window.location.href = url;

        const parms = Settings.toolsPopupParms;
        if (res.reportQueryString2) {
          setHiddenSrc(res.reportQueryString2);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  return (
    <ReportContextProvider>
      <ReportContext.Consumer>
        {(report) => {
          contextType = report;

          return (
            <div>
              {submitClick ? (
                <>
                  <div className={styles.refresh_message}>
                    If you do not see the report you requested, please click on
                    Refresh List.
                  </div>
                  <div className={styles.refresh_link}>
                    <a
                      className={styles.refresh_tag}
                      onClick={() => setRefreshReport(Math.random())}
                    >
                      Refresh List
                    </a>
                  </div>
                  <div id="iframeDiv" className={styles.iFrameStyle}>
                    <CIFrame
                      key={refreshReport}
                      src={`${cognosUrls.COGNOS_EXCEL_LOC}__reportName=NBTA_edie`}
                      componentName={"viewReort"}
                      width="100%"
                      height="100%"
                    ></CIFrame>
                    {hiddenSrc && (
                      <div className={styles.hide}>
                        <CIFrame key={hiddenSrc} hiddenSrc={hiddenSrc} />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className={styles.reportBody}>
                  <div className={styles.header}>
                    {year}{" "}
                    {reportName === Settings.toolsTabs.HotelSelfReport
                      ? Settings.labels.selfAuditAmenities
                      : Settings.labels.selfAuditCSR}
                  </div>
                  {contextType.state.hotelList.list.length >= 1 ? (
                    <div className="instructions">
                      {Settings.labels.PickUp}{" "}
                      {contextType.state.hotelList.list.length}{" "}
                      {Settings.labels.hotels}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.deselect}>
                    <img src={deselectBtn} onClick={() => deselectHotlList()} />
                  </div>
                  <span
                    className={styles.quickSelect}
                    onClick={() => setQuickSelect(true)}
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
                      <CReportGrid
                        key={`report_window_${showQuickSelect}`}
                        data={contextType.state.hotelList.list}
                        handleRowSelection={handleRowSelection}
                        onCheckBox={onCheckBox}
                      ></CReportGrid>

                      <div className={styles.hotelPricingRightCol}>
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
                        <div className={styles.submit}>
                          <img src={submittBtn} onClick={() => onSubmit()} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <CModal
                    title={"Quick Select"}
                    xPosition={-400}
                    yPosition={-100}
                    onClose={(e) => {
                      setQuickSelect(false);
                    }}
                    show={showQuickSelect}
                  >
                    <QuickSelect
                      save={(e) => quickSelectSave(e)}
                      cancel={(e) => setQuickSelect(false)}
                      quickSelectObject={{
                        label: "Hotel List",
                        cols: 100,
                        rows: 6,
                      }}
                    />
                  </CModal>
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
};

export default ToolsResourcesGrid;
