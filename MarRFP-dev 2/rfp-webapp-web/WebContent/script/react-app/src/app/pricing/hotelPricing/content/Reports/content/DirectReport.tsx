import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Settings from "../static/Settings";
import { ReportsWindow } from "./ReportsTitleWindow";
import CIFrame from "../../../../../common/components/CIFrame";

import API from "../../../service/API";
import CpacAPI from "../../centerallyPricedAccount/service/API";
import PriceAPI from "../../../content/centerallyPricedAccount/content/Price/service/API";
import ViewAccountPlanSappReportApi from "../../../../salesAdministration/ViewAccountPlanSappReport/service/ViewAccountPlanSappReportApi";
import SalesAdminAPI from "../../../../salesAdministration/service/API";
import RoomDescriptionAPI from "../../../../../roomRateDescriptions/hotelRoomDesc/content/RoomPool/service/API";
import hotelFormattedAPI from "../../../../../roomRateDescriptions/hotelFormattedRateDescription/service/API";
let winHeight;
function Reports(params) {
  const urlParms = useLocation().search;

  const [congnosEndPointUrl, setcongnosEndPointUrl] = useState(
    new URLSearchParams(urlParms).get("reportUrl")
  );
  const [url, setUrl] = useState(
    new URLSearchParams(urlParms).get("reportUrl")
  );
  const [hotelid, sethotelid] = useState(
    new URLSearchParams(urlParms).get("HotelId")
  );
  const [period, setperiod] = useState(
    new URLSearchParams(urlParms).get("Period")
  );
  const [reportHeader, setreportHeader] = useState(
    new URLSearchParams(urlParms).get("ReportName")
  );
  const [hotelRfpid, setHotelRfpid] = useState(
    new URLSearchParams(urlParms).get("HotelRfpid")
  );
  const [accountrecid, setAccountrecid] = useState(
    new URLSearchParams(urlParms).get("Accountrecid")
  );
  const [accountid, setAccountid] = useState(
    new URLSearchParams(urlParms).get("AccountId")
  );

  const [accountName, setAccountName] = useState(
    new URLSearchParams(urlParms).get("AccountName")
  );
  const [moduleid, setModuleid] = useState(
    new URLSearchParams(urlParms).get("ModuleID")
  );
  const [apiUrl, setapiUrl] = useState(
    new URLSearchParams(urlParms).get("apiUrl")
  );
  const [MarshaCode, setMarshaVode] = useState(
    new URLSearchParams(urlParms).get("MarshaCode")
  );
  const [HotelName, setHotelName] = useState(
    new URLSearchParams(urlParms).get("HotelName")
  );
  const [RoomPool, setRoomPool] = useState(
    new URLSearchParams(urlParms).get("RoomPool")
  );
  const [RoomPoolOnly, setRoomPoolOnly] = useState(
    new URLSearchParams(urlParms).get("RoomPoolOnly")
  );
  const [roomUrl, setroomUrl] = useState(
    new URLSearchParams(urlParms).get("roomUrl")
  );
  const [BranchCode, setBranchCode] = useState(
    new URLSearchParams(urlParms).get("BranchCode")
  );
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getCognosUrl();
    if (reportHeader === "Nearest Facility Report") {
      getNearestFacility();
      winHeight = screen.height - 95;
    } else if (reportHeader === "Nearest Facility Excel Report") {
      getNearestExcelFacility();
      winHeight = screen.height - 145;
    } else if (
      reportHeader === "Special Corporate Pricing Tool Summary Report"
    ) {
      getScptReport();
      winHeight = screen.height - 95;
    } else if (reportHeader === "Final Print") {
      finalReport();
      winHeight = screen.height - 95;
    } else if (
      reportHeader === "Special Corporate Pricing Tool Summary Report."
    ) {
      getScptReport();
      winHeight = 580;
    } else if (reportHeader === "SCPT Account History Report") {
      scptHistoryReport();
      winHeight = 530;
    } else if (reportHeader === "Account Overview Report") {
      getAccountReport();
      winHeight = "calc(100vh - 4px)"
    } else if (reportHeader === "Account Overview Report.") {
      getAccountReport();
      winHeight = screen.height - 105;
    } else if (reportHeader === "Account Plan(SAPP) Report") {
      getViewAccount();
      winHeight = screen.height - 95;
    } else if (reportHeader === "Print BT Account Plan Overview") {
      getSappAccountOverview();
      winHeight = screen.height - 95;
    } else if (reportHeader === "Print BT Account Plan Overview w/Market") {
      getSappAccountOverview();
      setreportHeader("Account  Overview Report..");
      winHeight = screen.height - 105;
    } else if (reportHeader === "Print Room pool") {
      getRoompool();
      winHeight = screen.height - 95;
    } else if (reportHeader === "Print Rate Programs") {
      getRoompool();
      winHeight = screen.height - 95;
    } else if (reportHeader === "Rate Product") {
      getHotelFormattedReport();
      winHeight = screen.height - 195;
    }
  }, [congnosEndPointUrl]);

  const getHotelFormattedReport = () => {
    const query = {
      marshacode: MarshaCode,
      hotelname: HotelName,
      branchCode: BranchCode,
    };
    hotelFormattedAPI
      .getRateProductAssignmentReport(query)
      .then((data) => {
        const url = data.reportUrl + "&" + data.reportQueryString;

        setUrl(url);
      })
      .catch(() => {});
  };
  const getRoompool = () => {
    const param =
      Settings.api.roomReport +
      "?marshaCode=" +
      MarshaCode +
      "&hotelName=" +
      HotelName +
      "&roomPool=" +
      RoomPool +
      "&roomPoolOnly=" +
      RoomPoolOnly;
    RoomDescriptionAPI.generatePoolReports(param)
      .then((res) => {
        let url;
        if (reportHeader === "Print Room pool") {
          url = res.reportServer + "&" + res.QueryString;
          setreportHeader("Room Description");
        } else if (reportHeader === "Print Rate Programs") {
          url = res.reportServer + "&" + res.QueryString;
          setreportHeader("Room  Description");
        }
        setUrl(url);
      })

      .catch(() => {});
  };
  const getCognosUrl = () => {
    API.getCongnosUrl()
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((data) => {
        setcongnosEndPointUrl(data.REPORT_ONDEMAND_URL);
        appContext.setCognosURL(congnosEndPointUrl);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getSappAccountOverview = () => {
    SalesAdminAPI.generateAccntOverViewReports(apiUrl)
      .then((res) => {
        let url = res.reportServer + "&" + res.reportQueryString;
        url = url.replace("p_paccount=null", "p_paccount=" + accountrecid);

        if (reportHeader === "Print BT Account Plan Overview") {
          url = url.replace("p_pmarketinfo=null", "p_pmarketinfo=N");
          setreportHeader("Account Overview  Report");
        } else if (reportHeader === "Print BT Account Plan Overview w/Market") {
          url = url.replace("p_pmarketinfo=null", "p_pmarketinfo=Y");
          setreportHeader("Account  Overview Report");
        }

        setUrl(url);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };

  const getViewAccount = () => {
    const parms = {
      moduleid: moduleid,
      accountrecid: accountid,
      accountname: accountName,
      period: period,
    };

    ViewAccountPlanSappReportApi.generateHotelPricingReports(parms)
      .then((res) => {
        const url = res.reportServer + "&" + res.reportQueryString;
        setUrl(url);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getAccountReport = () => {
    CpacAPI.getAccountReport(accountid)
      .then((res) => {
        const url = res.reportServer + "&" + res.reportQueryString;
        setUrl(url);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const scptHistoryReport = () => {
    const parms = {
      hotelid: hotelid,
      period: period,
    };
    API.generateScptHistoryReport(parms)
      .then((res) => {
        const url = res.reportServer + "&" + res.reportQueryString;

        setUrl(url);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getNearestExcelFacility = () => {
    const parms = {
      hotelid: hotelid,
      period: period,
    };
    API.getNearestAccountExcel(parms)
      .then((res) => {
        const reportUrl = congnosEndPointUrl + "&" + res.reportQueryString;
        if (congnosEndPointUrl) {
          setUrl(reportUrl);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getScptReport = () => {
    const parms = {
      hotelid: hotelid,
      period: period,
    };
    API.generateScptSummaryReport(parms)
      .then((res) => {
        const reportUrl = congnosEndPointUrl + "&" + res.reportQueryString;
        if (congnosEndPointUrl) {
          setUrl(reportUrl);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const getNearestFacility = () => {
    const parms = {
      hotelid: hotelid,
      period: period,
    };
    API.getNearestAccount(parms)
      .then((res) => {
        const reportUrl = congnosEndPointUrl + "&" + res.reportQueryString;
        if (congnosEndPointUrl) {
          setUrl(reportUrl);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };
  const finalReport = () => {
    const param = {
      hotelrfpid: hotelRfpid,

      accountrecid: accountrecid,
    };
    PriceAPI.getHotelFinalPrintReport(param).then((data) => {
      const url = congnosEndPointUrl + "&" + data.queryString;
      if (congnosEndPointUrl) {
        setUrl(url);
      }
    });
  };
  return (
    <div>
      <div>
        <ReportsWindow
          closeWindowPortal={true}
          title={reportHeader}
          popup={false}
        >
          <CIFrame
            src={url}
            componentName={"viewReort"}
            width="100%"
            height={winHeight}
          ></CIFrame>
        </ReportsWindow>
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
                    .container{
                      display:none!important;
                    }
                  
                  `}</style>
    </div>
  );
}

export default Reports;
