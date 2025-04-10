import React, { Component } from "react";
import styles from "../content/viewReports.css";
import ViewReportsContext, {
  ViewReportsContextProvider,
} from "../context/ViewReportsContext";
import API from "../service/API";
import CSelect from "../../../../common/components/CSelect";
import Settings from "../../ViewReports/static/Settings";
import CIFrame from "../../../../common/components/CIFrame";
import { withRouter } from "react-router-dom";
import { CLoader } from "../../../../common/components/CLoader";

//import CognosPreload from "../../../../common/components/CognosPreload";
//import Utils from "../../../../common/utils/Utils";

interface IProps {}
interface IState {}

let contextType = null;
class ViewReports extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (contextType.getFilterFromSession()) {
      contextType.setReportURL();
      API.getViewReportsData(
        contextType.getFilterFromSession()?.selectedAccount?.accountrecid == 0
          ? 0
          : contextType.getFilterFromSession()?.selectedAccount?.accountrecid ||
              "",
        contextType.getFilterFromSession()?.selectedReport,
        contextType.getFilterFromSession()?.selectedPeriod || ""
      ).then((data) => {
        contextType.setFilterFromSession();
        contextType.setViewReportsData(data);
      });
    } else {
      API.getReports().then((data) => {
        contextType.setReportURL();
        contextType.setFilterFromSession();
        contextType.setViewReportsData(data);
      });
    }
  }
  getReport() {
    if (contextType.getFilterFromSession()?.selectedReport != undefined) {
      API.getViewReportsData(
        contextType.getFilterFromSession()?.selectedAccount?.accountrecid == 0
          ? 0
          : contextType.getFilterFromSession()?.selectedAccount?.accountrecid ||
              "",
        contextType.getFilterFromSession()?.selectedReport,
        contextType.getFilterFromSession()?.selectedPeriod || ""
      ).then((data) => {
        contextType.setFilterFromSession();
        contextType.setViewReportsData(data);
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const location = this.props.history.location;
    const prevLocation = prevProps.location;
    if (
      prevLocation?.key != location?.key &&
      prevLocation?.pathname == location?.pathname
    ) {
      this.props.history.push("/temp");
      this.props.history.goBack();
    }
  }

  componentWillUnmount(): void {
    localStorage.removeItem("VIEW_REPORT_FILTER");
  }

  render() {
    const { history } = this.props;
    return (
      <ViewReportsContextProvider key={history.location.key}>
        <ViewReportsContext.Consumer>
          {(reportsContext) => {
            contextType = reportsContext;
            if (contextType.state.viewReportsData?.reportList.length === 1) {
              this.getReport();
            }

            return (
              <React.Fragment>
                <table className={styles.fullHeight}>
                  <tr className={styles.report}>
                    <td className={styles.fieldName}>
                      <CSelect
                        name={Settings.RecordDropDown.name}
                        id={Settings.RecordDropDown.id}
                        onChange={contextType.onChangeReport}
                        ddnOptions={
                          contextType.state.viewReportsData.reportList
                        }
                        selectedValue={
                          contextType.state.selectedData.selectedReport
                        }
                        keyField={Settings.ControlKeyValues.cSelectKeyField}
                        valField={Settings.ControlKeyValues.cSelectValueField}
                        className={styles.drpdwnbox}
                        autoComplete="off"
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
                          />

                          {` ${Settings.Labels.account}`}
                          <CSelect
                            key={contextType.state.resetAccount}
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
                            className={styles.printDrpdwnbox}
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

                  <div id="iframeDiv" className={styles.iFrameStyle}>
                    {contextType.state.showLoader ? (
                      <CLoader></CLoader>
                    ) : (
                      contextType.state.viewReportsData.currentReport !=
                        null && (
                        <CIFrame
                          src={contextType.state.reportUrl}
                          componentName={"viewReort"}
                          // hiddenSrc={contextType.state.hiddenUrl}
                          id={Settings.banner}
                          width="100%"
                          height="calc(100vh - 200px)"
                        ></CIFrame>
                      )
                    )}
                  </div>
                </table>
              </React.Fragment>
            );
          }}
        </ViewReportsContext.Consumer>
      </ViewReportsContextProvider>
    );
  }
}

export default withRouter(ViewReports);
