import React, { useEffect, useState } from "react";

import ReportContext, {
  ReportContextProvider,
} from "../context/ReportContextProvider";
import { useLocation } from "react-router-dom";
import API from "../service/API";
import styles from "./TopTravelMarket.css";
//import deselectBtn from "../../../../../common/assets/img/button/btnUnSelectAll.gif";
import submittBtn from "../../../../../common/assets/img/button/btnSubmit.gif";
//import FilteredGridSelectUtils from "../../../../../shared/utils/FilteredGridSelectUtils";
import Settings from "../static/Settings";
import CIFrame from "../../../../../common/components/CIFrame";
import { ReportsWindow } from "./ReportsTitleWindow";

// import Settings from "../../static/Settings";

let contextType = null;
let pickUpCount;
let congnosEndPointUrl;

function TopTravelMarket(params) {
  const urlParms = useLocation().search;
  const [cognosUrl, setcognosUrl] = useState(null);
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
  const [url, setUrl] = useState("");
  const [showReport, setshowReport] = useState(false);
  useEffect(() => {
    getdata();

    API.getCongnosUrl()
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((data) => {
        congnosEndPointUrl = data.REPORT_ONDEMAND_URL;
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }, []);

  const getdata = () => {
    const parms = {
      period: year,
      hotelid: hotelid,
    };
    contextType.setLoader(true);
    setReportHeader();
    API.getTopTravelMarkey(parms)
      .then((res) => {
        res.states.map((data) => {
          data.isChecked = false;
        });
        res.countries.map((data) => {
          data.isChecked = false;
        });

        contextType.setTopTravelData(res);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const setReportHeader = () => {
    if (reportName == Settings.reportTabs.topTravelMarkets) {
      setreportHeader(Settings.reportTabsHeader.topTravelMarkets);
    }
  };
  const onSubmit = () => {
    const selectedState = contextType.state.topTravelList.list.states.filter(
      (obj) => obj.isChecked === true
    );
    const selectedCountries =
      contextType.state.topTravelList.list.countries.filter(
        (obj) => obj.isChecked === true
      );
    const slist = [];
    const cList = [];
    selectedState.map((res) => {
      slist.push(res.state);
    });
    selectedCountries.map((res) => {
      cList.push(res.country);
    });

    if (slist.length > 3) {
      alert("Please pick 3 or less states");
    } else {
      if (cList.length > 3) {
        alert("Please pick 3 or less countries/regions");
      } else {
        const parms = {
          strStates: JSON.stringify(slist),
          strCountries: JSON.stringify(cList),
          period: year,
          hotelid: hotelid,
          numstates: contextType.state.topTravelList?.list?.states?.length,
          numcountries:
            contextType.state.topTravelList?.list?.countries?.length,
        };

        API.generateTopTravelReports(parms)
          .then((res) => {
            const parms = Settings.popupParms;
            const url = congnosEndPointUrl + "&" + res;
            setUrl(url);
            setshowReport(true);
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {});
      }
    }
  };
  const onStateCheckbox = (e, i) => {
    contextType.state.topTravelList.list.states[i].isChecked =
      !contextType.state.topTravelList.list.states[i].isChecked;
  };
  const onCountryCheckbox = (e, i) => {
    contextType.state.topTravelList.list.countries[i].isChecked =
      !contextType.state.topTravelList.list.countries[i].isChecked;
  };
  return (
    <ReportContextProvider>
      <ReportContext.Consumer>
        {(report) => {
          contextType = report;

          return (
            <div className={styles.reportBody}>
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
                      // hiddenSrc={contextType.state.hiddenUrl}
                      width="100%"
                      height="400px"
                    ></CIFrame>
                  </ReportsWindow>
                  <style>{`
                    
                    .container{
                      display:none!important;
                    }
                  
                  `}</style>
                </div>
              ) : (
                <div>
                  {contextType.state.topTravelList?.list && (
                    <div>
                      <div className={styles.header}>
                        {Settings.topTravelMarket.header}
                      </div>

                      <div className={styles.instructions}>
                        {Settings.topTravelMarket.instructions}
                      </div>
                      <div className={styles.submitBtn}>
                        <img src={submittBtn} onClick={() => onSubmit()} />
                      </div>
                      {contextType.state.topTravelList?.list?.states?.length >
                        0 && (
                        <span>
                          <span style={{ fontWeight: "bold" }}>
                            {Settings.topTravelMarket.states}
                          </span>
                          <div className={styles.statesBlock}>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    {contextType.state.topTravelList.list?.states.map(
                                      (res, i) => {
                                        return (
                                          // eslint-disable-next-line react/jsx-key
                                          <span>
                                            {/* <div>{res.statename}</div> */}
                                            <input
                                              type="checkbox"
                                              id={res.state}
                                              name={res.statename}
                                              defaultValue=""
                                              value={res.state}
                                              onChange={(e) => {
                                                onStateCheckbox(e, i);
                                              }}
                                            ></input>
                                            <span
                                              style={{ fontWeight: "normal" }}
                                            >
                                              {res.statename}
                                            </span>
                                            <br></br>
                                          </span>
                                        );
                                      }
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </span>
                      )}
                      <div className={styles.andOrblock}>
                        {Settings.topTravelMarket.andor}
                      </div>
                      <span className={styles.countryReagionHeader}>
                        {Settings.topTravelMarket.countriesRegion}
                      </span>
                      <div className={styles.countryRegionBlock}>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                {contextType.state.topTravelList.list?.countries?.map(
                                  (res, i) => {
                                    return (
                                      // eslint-disable-next-line react/jsx-key
                                      <span>
                                        <input
                                          type="checkbox"
                                          id={res.country}
                                          name={res.countryname}
                                          defaultValue=""
                                          value={res.country}
                                          onChange={(e) => {
                                            onCountryCheckbox(e, i);
                                          }}
                                        ></input>
                                        <span style={{ fontWeight: "normal" }}>
                                          {res.countryname}
                                        </span>
                                        <br></br>
                                      </span>
                                    );
                                  }
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
                  )}
                </div>
              )}
            </div>
          );
        }}
      </ReportContext.Consumer>
    </ReportContextProvider>
  );
}

export default TopTravelMarket;
