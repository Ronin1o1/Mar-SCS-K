import React, { Component } from "react";
import styles from "./ViewEdieReports.css";
import Settings from "../static/Settings";
import ViewEdieReportsContext, {
  ViewEdieReportsContextProvider,
} from "../context/ViewEdieReportsContext";
import API from "../service/API";
import CIFrame from "../../../../common/components/CIFrame";
import CPageTitle from "../../../../common/components/CPageTitle";
import { CLoader } from "../../../../common/components/CLoader";
import { withRouter } from "react-router-dom";

interface IProps {}
interface IState {}
let contextType = null;
class RequestSpecialReports extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    const location = this.props?.history?.location;
    const prevLocation = prevProps?.location;
    if (
      prevLocation?.key != location?.key &&
      prevLocation?.pathname == location?.pathname
    ) {
      this.props.history.push("/temp");
      this.props.history.goBack();
    }
  }
  componentDidMount() {
    contextType.setIsLoading(true);
    API.getEdieReport().then((data) => {
      contextType.setEdieReportsData(data);
      contextType.setIsLoading(false);
    });
  }

  render() {
    return (
      <ViewEdieReportsContextProvider>
        <ViewEdieReportsContext.Consumer>
          {(viewReportContext) => {
            contextType = viewReportContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <>
                <CPageTitle title={Settings.title}></CPageTitle>
                <table className={styles.fullHeight}>
                  <tr>
                    <td className={styles.viewediereports}>
                      {contextType.state.currentReport != null && (
                        <CIFrame
                          src={contextType.state.reportUrl}
                          id={Settings.banner}
                          componentName={"viewEdie"}
                          width="100%"
                          height="100%"
                          border="0"
                        ></CIFrame>
                      )}
                    </td>
                  </tr>
                </table>
              </>
            );
          }}
        </ViewEdieReportsContext.Consumer>
        <style>{`
          @media only screen and (max-width: 1100px) {
            .page_body_container {
              min-height: calc(100vh - 90px) !important;
            }
          }
        `}</style>
      </ViewEdieReportsContextProvider>
    );
  }
}

export default withRouter(RequestSpecialReports);
