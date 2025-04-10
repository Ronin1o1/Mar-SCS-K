import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ToggleButton } from "primereact/togglebutton";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import CDataTable from "../../../common/components/CDataTable";
import API from "../service/API";
import Settings from "../static/settings";
import styles from "./Home.css";
import Utils from "../../../common/utils/Utils";

const ViewableAccounts = React.forwardRef((props, ref) => {
  const [checked, setChecked] = useState(false);
  const [accountViewData, setAccountViewData] = useState([]);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const accountNameTemplate = (rowData) => {
    return (
      <a href="#" onClick={() => accountNameHandler(rowData.accountrecid)}>
        {rowData.accountname}
      </a>
    );
  };
  const dueDateTemplate = (rowData) => {
    //return <span>{moment(rowData.duedate).format("MMM DD, YYYY")}</span>;
    return <span>{rowData.dueDateShortDesc}</span>;
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
      field: Settings.accountGridDetails.columns.accountName.field,
      header: Settings.accountGridDetails.columns.accountName.header,
      body: accountNameTemplate,
      style: { width: "150px" },
    },
    {
      field: Settings.accountGridDetails.columns.segment.field,
      header: Settings.accountGridDetails.columns.segment.header,
      style: { width: "170px", cursor: "auto" },
    },
    {
      field: Settings.accountGridDetails.columns.dueDate.field,
      header: Settings.accountGridDetails.columns.dueDate.header,
      body: dueDateTemplate,
      style: { width: "108px", cursor: "auto" },
    },
  ];

  const isLocal = window.location.href
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);

  useEffect(() => {
    if (Utils.getCookie("CODE") || isLocal.length) {
      API.getAccountViewData().then((res) => {
        setAccountViewData(res);
      });
    }
  }, [appContext.user]);
  return (
    <Accordion
      activeIndex={0}
      expandIcon={`${styles.customCaret} ${styles.rightCaret}`}
      collapseIcon={`${styles.customCaret} ${styles.downCaret}`}
    >
      <AccordionTab
        header={
          <div
            ref={ref}
            data-handler-id={props.handlerId}
            style={{ cursor: "move" }}
          >
            <ToggleButton
              checked={checked}
              onChange={(e) => setChecked(e.value)}
              onLabel="Accounts Recently Made Viewable"
              offLabel="Accounts Recently Made Viewable"
              className={styles.paneltoggle}
            />
          </div>
        }
        headerClassName={`${styles.dijitTitlePaneTitle} ${styles.dijitTitlePaneAccount} ${styles.cursorMove}`}
      >
        <div
          className={`${styles.dijitTitlePaneContentOuter}`}
          data-dojo-attach-point="hideNode"
          role="presentation"
        >
          <div
            className={`${styles.dijitReset}`}
            data-dojo-attach-point="wipeNode"
            role="presentation"
          >
            <div
              className={`${styles.dijitTitlePaneContentInner}`}
              data-dojo-attach-point="containerNode"
              role="region"
              id="dijit_TitlePane_3_pane"
              aria-labelledby="dijit_TitlePane_3_titleBarNode"
              aria-hidden="false"
            >
              <div
                className={`${styles.accountsViewConatiner}`}
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
                {accountViewData.length <= 0 ? (
                  <span style={{ cursor: "text" }}>
                    {Settings.noNewAccountListMessage}
                  </span>
                ) : (
                  <CDataTable
                    id="accountsGrid"
                    columns={columns}
                    value={accountViewData}
                    emptyMessage={Settings.noDataMessage}
                    scrollHeight="calc(50vh - 45px)"
                    marginLeft="0px"
                  />
                )}
                <style>{`
                     .p-datatable-scrollable-body{
                      overflow-x: hidden !important;
                    }
                    .p-datatable .p-datatable-tbody > tr {
                      height: 14px !important;
                    }
                    .p-datatable-tbody tr td{
                      height: 14px !important;
                      padding: 0 2px !important;
                    }
                    @media only screen and (min-width: 1920px) {
                      .p-datatable-scrollable-body{
                        max-height: calc(50vh - 145px) !important;
                      }
                    }
                    `}</style>
              </div>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  );
});

ViewableAccounts.displayName = "ViewableAccounts";

export default ViewableAccounts;
