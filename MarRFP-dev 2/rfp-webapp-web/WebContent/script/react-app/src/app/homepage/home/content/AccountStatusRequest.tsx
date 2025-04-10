import moment from "moment";
import React, { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import CDataTable from "../../../common/components/CDataTable";
import btnPrice from "../../../common/assets/img/button/btnPriceIt.gif";
import btnAnsQuestions from "../../../common/assets/img/button/btnQuestions.gif";
import btnQuestions from "../../../common/assets/img/button/btnQuestionsRed.gif";
import cbcRejected from "../../../common/assets/img/cbc_rejected.gif";
import cbcAccepted from "../../../common/assets/img/cbc_accepted.gif";
import cbcRequest from "../../../common/assets/img/cbc_request.gif";
import cbcCompleted from "../../../common/assets/img/cbc_completed.gif";
import rejected from "../../../common/assets/img/rejectedD.gif";
import requestImg from "../../../common/assets/img/requested.gif";
import acceptedImg from "../../../common/assets/img/accepted.gif";
import lockedImg from "../../../common/assets/img/locked.gif";
import rebid from "../../../common/assets/img/rebid.gif";
import rebidDecline from "../../../common/assets/img/rebid_decline.gif";
import rebidAccept from "../../../common/assets/img/rebid_accept.gif";
import rebid2 from "../../../common/assets/img/rebid2.gif";
import rebidDecline2 from "../../../common/assets/img/rebid_decline2.gif";
import rebidAccept2 from "../../../common/assets/img/rebid_accept2.gif";
import rebid3 from "../../../common/assets/img/rebid3.gif";
import rebidDecline3 from "../../../common/assets/img/rebid_decline3.gif";
import rebidAccept3 from "../../../common/assets/img/rebid_accept3.gif";
import loadingaccount from "../../../common/assets/img/loading.gif";
import HomeContext from "../context/HomeContext";
import API from "../service/API";
import Settings from "../static/settings";
import styles from "./AccountStatusRequest.css";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";

interface IAccountStatusRequestProps {
  noRecordsMessage: string;
  tabTitle: string;
  tabId: string;
}
const AccountStatusRequest: FC<IAccountStatusRequestProps> = (
  props
): JSX.Element => {
  const { noRecordsMessage, tabTitle, tabId } = props;
  const homeContext = useContext(HomeContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const rebidStatusTemplate = (rowData) => {
    return (
      <span>{getRebidStatus(rowData.rebidstatus, rowData.rebid_level)}</span>
    );
  };
  const accountStatusTemplate = (rowData) => {
    return <span>{getAccountStatus(rowData)}</span>;
  };
  const cbcStatusTemplate = (rowData) => {
    return <span>{getCBCStatus(rowData.cbcstatus)}</span>;
  };
  const dueDateTemplate = (rowData) => {
    return <span>{moment(rowData.duedate).format("MMM DD, YYYY")}</span>;
  };
  const accountNameTemplate = (rowData) => {
    return (
      <a
        href="javascript:void(0);"
        onClick={() => accountNameHandler(rowData.accountrecid)}
      >
        {rowData.accountname}
      </a>
    );
  };
  const priceTemplate = (rowData) => {
    if (
      tabId == Settings.tabNames.accountStatus ||
      tabId == Settings.tabNames.rebidRequests
    ) {
      return (
        <a href="javascript:void(0);" id={rowData.accountrecid}>
          <img
            src={btnPrice}
            onClick={() => {
              const accountStatus = rowData.accountStatus;
              const hotelName = getHotelName(rowData.marshacode);
              getAccountData(rowData, hotelName, accountStatus);
            }}
          />
        </a>
      );
    } else if (
      tabId == Settings.tabNames.cbcRequests ||
      tabId == Settings.tabNames.pricingRequests
    ) {
      if (rowData.hasaccountspec == "Y") {
        return (
          <a href="javascript:void(0);" id={rowData.accountrecid}>
            <img
              src={btnPrice}
              onClick={() => {
                const accountStatus = rowData.accountStatus;
                const hotelName = getHotelName(rowData.marshacode);
                getAccountData(rowData, hotelName, accountStatus);
              }}
            />
          </a>
        );
      } else if (rowData.hasgenpricing == "Y") {
        return (
          <a
            href="javascript:void(0);"
            onClick={() =>
              accountCenterIt(
                rowData.marshacode,
                rowData.hotelrfpid,
                rowData.accountpricingtype,
                rowData.period,
                rowData.hotel_accountinfoid
              )
            }
          >
            {Settings.AccountCenter}
          </a>
        );
      } else {
        return <span>{Settings.noGeneralPricing}</span>;
      }
    }
  };
  const getCBCStatus = (status) => {
    if (status === "D") {
      return <img src={cbcRejected}></img>;
    } else if (status === "A") {
      return <img src={cbcAccepted}></img>;
    } else if (status === "R") {
      return <img src={cbcRequest}></img>;
    } else if (status === "C") {
      return <img src={cbcCompleted}></img>;
    } else {
      return "";
    }
  };
  const getAccountStatus = (rowData) => {
    if (rowData.isAccepted != null && rowData.isAccepted === "Y") {
      return <img src={acceptedImg}></img>;
    } else if (rowData.isAccepted != null && rowData.isAccepted === "N") {
      return <img src={rejected}></img>;
    } else if (rowData.isLocked != null && rowData.isLocked === "Y") {
      return <img src={lockedImg}></img>;
    } else if (rowData.isSolicited != null && rowData.isSolicited === "Y") {
      return <img src={requestImg}></img>;
    } else {
      return "";
    }
  };
  const getRebidStatus = (status, level) => {
    if (level === 1) {
      if (status === 1) {
        return <img src={rebid}></img>;
      } else if (status === 2) {
        return <img src={rebidDecline}></img>;
      } else if (status === 3) {
        return <img src={rebidAccept}></img>;
      }
    }
    if (level === 2) {
      if (status === 1) {
        return <img src={rebid2}></img>;
      } else if (status === 2) {
        return <img src={rebidDecline2}></img>;
      } else if (status === 3) {
        return <img src={rebidAccept2}></img>;
      }
    }
    if (level == 3) {
      if (status === 1) {
        return <img src={rebid3}></img>;
      } else if (status === 2) {
        return <img src={rebidDecline3}></img>;
      } else if (status === 3) {
        return <img src={rebidAccept3}></img>;
      }
    }
  };

  const hasQuestionsTemplate = (rowData) => {
    if (rowData.accountpricingtype != "L" && rowData.hasquestions == "Y")
      return (
        <div
          style={{
            display: rowData.ratetype_selected != 17 ? "block" : "none",
          }}
        >
          <a href="javascript:void(0);">
            <img
              src={
                rowData.hasansweredquestions == "Y"
                  ? btnAnsQuestions
                  : btnQuestions
              }
              onClick={() =>
                hasQuestions(
                  rowData.marshacode,
                  rowData.hotelrfpid,
                  rowData.hotel_accountinfoid,
                  rowData.period
                )
              }
            />
          </a>
        </div>
      );
  };
  const priceIt = (
    accountDetails,
    hotelName,
    accountSpecData,
    accountStatus
  ) => {
    const path = "/pricinghotelselect/printAccountContainer";
    const search = `MarshaCode=${accountDetails.marshacode}&hotelName=${hotelName}&Period=${accountDetails.period}&Hotelrfpid=${accountDetails.hotelrfpid}&AccountInfoId=${accountDetails.hotel_accountinfoid}`;
    history.push({
      pathname: path,
      search: search,
      data: {
        accountSpecDetail: accountSpecData,
        accountStatus: accountStatus,
      },
      accountSpecDetail: accountDetails,
      state: { from: "accountstatus" },
    });
  };

  const getAccountData = (accountDetails, hotelName, accountStatus) => {
    appContext.setRetainActiveTab(true);
    const param = {
      marshaCode: accountDetails.marshacode,
      hotelName: hotelName,
      hotelrfpid: accountDetails.hotelrfpid,
      period: accountDetails.period,
      hotel_accountinfoid: accountDetails.hotel_accountinfoid,
    };
    API.getHotelaccountspeccentralrates(param).then((data) => {
      if (data != undefined && data != null) {
        priceIt(
          accountDetails,
          hotelName,
          data.hotelAccountSpecific.hotelAccountSpecificData,
          accountStatus
        );
      }
    });
  };
  const accountCenterIt = (
    marshacode,
    rfpid,
    actype,
    period,
    accountInfoId
  ) => {
    appContext.setRetainActiveTab(true);
    const path = "/pricinghotelselect/CPAC";
    const search = `MarshaCode=${marshacode}&Hotelrfpid=${rfpid}&Period=${period}&AccountInfoId=${accountInfoId}`;
    history.push({
      pathname: path,
      search: search,
      state: { from: "accountstatus" },
    });
  };

  const hasQuestions = (marshacode, rfpid, haccid, period) => {
    appContext.setRetainActiveTab(true);
    const path = "/pricinghotelselect/HotelAccountQuestions";
    const search = `MarshaCode=${marshacode}&Period=${period}&Hotelrfpid=${rfpid}&AccountInfoId=${haccid}`;
    history.push({
      pathname: path,
      search: search,
      state: { from: "accountstatus" },
    });
  };

  const getHotelName = (marshacode) => {
    const foundHotel = homeContext.state.hoteListData.find((data) => {
      return data.marshacode === marshacode;
    });
    return foundHotel && foundHotel.name;
  };
  const accountNameHandler = (accountrecid) => {
    const parms = Settings.accountNamePopupParams;
    API.getOverviewReport(accountrecid).then((res) => {
      const url = res.reportServer + "&" + res.reportQueryString;
      const popupWindow = window.open(url, "_blank");
      popupWindow.focus();
    });
  };
  const columns = [
    {
      field: Settings.accountStatusRequestsGridDetails.columns.period.field,
      header: Settings.accountStatusRequestsGridDetails.columns.period.header,
      style: { width: "50px", cursor: "text" },
    },
    {
      field: Settings.accountStatusRequestsGridDetails.columns.cbcStatus.field,
      header:
        Settings.accountStatusRequestsGridDetails.columns.cbcStatus.header,
      body: cbcStatusTemplate,
      style: { width: "40px" },
    },
    {
      field:
        Settings.accountStatusRequestsGridDetails.columns.rebidStatus.field,
      header:
        Settings.accountStatusRequestsGridDetails.columns.rebidStatus.header,
      body: rebidStatusTemplate,
      style: { width: "40px", textAlign: "center" },
    },
    {
      field:
        Settings.accountStatusRequestsGridDetails.columns.accountStatus.field,
      header: "",
      body: accountStatusTemplate,
      style: { width: "30px", textAlign: "center" },
    },
    {
      field:
        Settings.accountStatusRequestsGridDetails.columns.accountName.field,
      header:
        Settings.accountStatusRequestsGridDetails.columns.accountName.header,
      body: accountNameTemplate,
      style: { width: "210px" },
    },
    {
      field: Settings.accountStatusRequestsGridDetails.columns.dueDate.field,
      header: Settings.accountStatusRequestsGridDetails.columns.dueDate.header,
      body: dueDateTemplate,
      style: { width: "70px", cursor: "text" },
    },
    {
      field:
        Settings.accountStatusRequestsGridDetails.columns.productOffered.field,
      header:
        Settings.accountStatusRequestsGridDetails.columns.productOffered.header,
      style: { width: "110px", cursor: "text" },
    },
    {
      field: Settings.accountStatusRequestsGridDetails.columns.price.field,
      header: Settings.accountStatusRequestsGridDetails.columns.price.header,
      body: priceTemplate,
      style: { width: "100px" },
    },
    {
      field:
        Settings.accountStatusRequestsGridDetails.columns.hasQuestions.field,
      header:
        tabId == Settings.tabNames.accountStatus ||
        tabId == Settings.tabNames.rebidRequests
          ? Settings.accountStatusRequestsGridDetails.columns.hasQuestions
              .header
          : "",
      body: hasQuestionsTemplate,
      style: { width: "37px" },
    },
  ];

  const productOffered = homeContext.requestDetails.filter((datavalue) => {
    return (
      datavalue.productoffered != "No OC pricing" &&
      datavalue.productoffered != "Fixed"
    );
  });
  return (
    <>
      {homeContext.isLoading ? (
        <div className={styles.loaderaccounthome}>
          <img src={loadingaccount} />
          Loading...
        </div>
      ) : homeContext.requestDetails <= 0 ? (
        <div
          className={styles.tabTitle}
          style={
            appContext.homePageDragNoSelectStyle
              ? {
                  userSelect: "none",
                  msUserSelect: "none",
                  MozUserSelect: "none",
                  cursor: "text",
                }
              : null
          }
        >
          {noRecordsMessage}
        </div>
      ) : (
        <>
          <div
            className={styles.tabTitle}
            style={
              appContext.homePageDragNoSelectStyle
                ? {
                    userSelect: "none",
                    msUserSelect: "none",
                    MozUserSelect: "none",
                    cursor: "text",
                  }
                : null
            }
          >
            {tabTitle}
          </div>
          <div
            className={styles.tabTitle}
            style={
              appContext.homePageDragNoSelectStyle
                ? {
                    userSelect: "none",
                    msUserSelect: "none",
                    MozUserSelect: "none",
                  }
                : null
            }
          >
            <CDataTable
              id="accountStatusRequestsGrid"
              columns={columns}
              value={productOffered}
              emptyMessage={Settings.noDataMessage}
              scrollHeight="200px"
              marginLeft="0px"
            />
            <style>{`
                      .p-datatable-scrollable-body{
                        overflow-x: hidden !important;
                      }
                    `}</style>
          </div>
        </>
      )}
    </>
  );
};

export default AccountStatusRequest;
