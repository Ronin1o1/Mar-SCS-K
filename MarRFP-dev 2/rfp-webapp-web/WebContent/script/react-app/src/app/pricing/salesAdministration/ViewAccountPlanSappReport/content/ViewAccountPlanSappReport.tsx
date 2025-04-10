import React, { useEffect, useRef } from "react";
import CSelect from "../../../../common/components/CSelect";
import CSearchFilter from "../../../../common/components/CSearchFilter";
import Submitbtn from "../../../../common/assets/img/button/btnSubmit.gif";
import ViewAccountPlanSappReportContext, {
  ViewAccountPlanSappReportProvider,
} from "../context/ViewAccountPlanSappReportContext";
import styles from "./ViewAccountPlanSappReport.css";
import Settings from "../static/Settings";
import CModal from "../../../../common/components/CModal";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
const ViewAccountPlanSappReport = () => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  let contextData = null;
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
  return (
    <ViewAccountPlanSappReportProvider>
      <ViewAccountPlanSappReportContext.Consumer>
        {(context) => {
          contextData = context;
          return (
            <>
              <CModal
                title={Settings.accountSappDetails.CModalTitle}
                onClose={contextData.showValidateMirror}
                show={contextData.validateModal}
                closeImgTitle={Settings.accountSappDetails.CModalCloseImgTitle}
                xPosition={Settings.accountSappDetails.cModalxPosition}
                yPosition={Settings.accountSappDetails.cModalyPosition}
              >
                <div className={styles.cModelDiv}>
                  {contextData.alertMessage}
                </div>
              </CModal>
              <table className={styles.table}>
                <tr>
                  <td>
                    <span className={styles.header}>
                      {Settings.accountSappDetails.heading}
                    </span>
                  </td>
                </tr>
                <tr className={styles.bgDarkBlueStyle}>
                  <td className={styles.column}></td>
                </tr>
                <tr className={styles.blankRow}>
                  <td></td>
                </tr>

                <tr>
                  <td className={styles.noWrapCell}>
                    <span className={styles.fieldNameYear}>
                      {Settings.accountSappDetails.formFields.year.label}
                    </span>
                    <CSelect
                      id={Settings.accountSappDetails.formFields.year.label}
                      selectedValue={contextData.appSelectedData.year}
                      ddnOptions={contextData.state.year}
                      keyField={
                        Settings.accountSappDetails.formFields.year.keyField
                      }
                      valField={
                        Settings.accountSappDetails.formFields.year.keyField
                      }
                      onChange={(event) => contextData.onYearChange(event)}
                      className={styles.select}
                    />
                  </td>
                </tr>

                <tr>
                  <td className={styles.noWrapCell}>
                    <span className={styles.fieldNameAccount}>
                      {Settings.accountSappDetails.formFields.account.label}
                    </span>
                    <CSearchFilter
                      id={Settings.accountSappDetails.formFields.account.label}
                      selected={contextData.appSelectedData.accountrecid}
                      data={contextData.state.account}
                      start={contextData.appSelectedData.accountStartIndex}
                      getInitialData={contextData.onGetInitialSourceAccounts}
                      getNextData={contextData.onGetNextSourceAccounts}
                      onSelect={contextData.onSourceAccountSelect}
                      onChange={contextData.onSourceAccountsChange}
                      pageSize={Settings.accountSappDetails.pageSize}
                      invalidMessage={
                        Settings.accountSappDetails.invalidMessage
                      }
                      className={styles.filterContainer}
                      optionsStyle={styles.options}
                      noData={contextData.appSelectedData.noFromAccounts}
                      removeData={contextData.removeData}
                    />
                  </td>
                </tr>

                <tr>
                  <td className={styles.noWrapCell}>
                    <span className={styles.fieldNameModule}>
                      {Settings.accountSappDetails.formFields.module.label}
                    </span>
                    <CSelect
                      id={Settings.accountSappDetails.formFields.module.label}
                      selectedValue={contextData.appSelectedData.modulename}
                      ddnOptions={contextData.state.module}
                      keyField={
                        Settings.accountSappDetails.formFields.module.keyField
                      }
                      valField={
                        Settings.accountSappDetails.formFields.module.valueField
                      }
                      onChange={(event) => contextData.onModuleChange(event)}
                      className={styles.select}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src={Submitbtn}
                      id={Settings.accountSappDetails.submitButton.label}
                      onClick={contextData.onSubmit}
                    ></img>
                  </td>
                </tr>
              </table>
            </>
          );
        }}
      </ViewAccountPlanSappReportContext.Consumer>
    </ViewAccountPlanSappReportProvider>
  );
};

export default ViewAccountPlanSappReport;
