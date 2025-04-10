import React, { useEffect, useRef } from "react";
import styles from "../content/GeneralAdminViewReports.css";
import GeneralViewReportsContext, {
  GeneralViewReportsContextProvider,
} from "../context/GeneralAdminViewReportsContext";
import API from "../service/API";
import CSelect from "../../../common/components/CSelect";
import Settings from "../../ViewReports/static/Settings";
import CIFrame from "../../../common/components/CIFrame";
//import CognosPreload from "../../../common/components/CognosPreload";
import { useLocation, useHistory } from "react-router-dom";
import { CLoader } from "../../../common/components/CLoader";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

let contextType = null;

const GeneralViewReports = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  useEffect(() => {
    API.getReports().then((data) => {
      contextType.setViewReportsData(data);
      API.getCognosServerUrl().then((response) => {
        contextType.setReportURL(response);
        contextType.setViewReportsData(data);
      });
    });
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
  return (
    <GeneralViewReportsContextProvider>
      <GeneralViewReportsContext.Consumer>
        {(reportsContext) => {
          contextType = reportsContext;
          return (
            <React.Fragment>
              <table className={styles.fullHeight}>
                <tr className={styles.report}>
                  <td className={styles.fieldName}>
                    <CSelect
                      name={Settings.RecordDropDown.name}
                      id={Settings.RecordDropDown.id}
                      onChange={contextType.onChangeReport}
                      ddnOptions={contextType.state.viewReportsData.reportList}
                      selectedValue={
                        contextType.state.selectedData.selectedReport
                      }
                      keyField={Settings.ControlKeyValues.cSelectKeyField}
                      valField={Settings.ControlKeyValues.cSelectValueField}
                      className={styles.drpdwnbox}
                    />
                  </td>
                </tr>
                {contextType.state.viewReportsData.filterLists != null ? (
                  <tr>
                    <tr className={styles.report}>
                      <td className={styles.instructions}>
                        {Settings.Labels.instructions}
                      </td>
                    </tr>
                    <tr className={styles.report}>
                      <td className={styles.fieldName}>
                        {Settings.Labels.period}
                        <CSelect
                          onChange={contextType.periodChangeHandler}
                          ddnOptions={contextType.state.periodList}
                          selectedValue={
                            contextType.state.selectedData.selectedPeriod
                          }
                          keyField={Settings.period.keyField}
                          valField={Settings.period.valField}
                          className={styles.drpdwnbox_period}
                        />

                        {` ${Settings.Labels.account}`}
                        <CSelect
                          name={Settings.accountrecid}
                          id={Settings.accountrecid}
                          onChange={contextType.onChangeReport}
                          ddnOptions={
                            contextType.state.viewReportsData.filterLists
                              .accountList
                          }
                          selectedValue={
                            contextType.state.selectedData.selectedAccount
                              .accountrecid
                          }
                          keyField={Settings.accountNameList.keyField}
                          valField={Settings.accountNameList.valField}
                          className={styles.drpdwnbox}
                        />
                      </td>
                    </tr>
                  </tr>
                ) : (
                  ""
                )}

                <tr className={styles.report}>
                  <td className={styles.instructions}>
                    {`${Settings.Labels.instructionsline1}${Settings.Labels.instructionsline2}`}
                  </td>
                </tr>

                <div id="iframeDiv">
                  {contextType.state.showLoader ? (
                    <CLoader></CLoader>
                  ) : (
                    contextType.state.reportUrl &&
                    contextType.state.viewReportsData.currentReport != null && (
                      <CIFrame
                        src={contextType.state.reportUrl}
                        id={Settings.banner}
                        width="100%"
                        height="calc(100vh - 215px)"
                        componentName={"viewReort"}
                      ></CIFrame>
                    )
                  )}
                </div>
              </table>
            </React.Fragment>
          );
        }}
      </GeneralViewReportsContext.Consumer>
    </GeneralViewReportsContextProvider>
  );
};

export default GeneralViewReports;
