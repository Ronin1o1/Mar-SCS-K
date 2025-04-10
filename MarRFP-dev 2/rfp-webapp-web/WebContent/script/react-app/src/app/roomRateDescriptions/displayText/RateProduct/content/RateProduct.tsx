import React from "react";
import styles from "./RateProduct.css";

import RateProductContext, {
  RateProductContextProvider,
} from "../context/RateProductContextProvider";
import API from "../service/API";

import Language from "./Language";
import RateUtils from "./RateUtils";
import Settings from "../static/Settings";
import { CLoader } from "../../../../common/components/CLoader";
import { withRouter } from "react-router-dom";

let contextType = null;

class RateProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    contextType.setIsLoading(true);
    API.getDisplayText()
      .then((data) => {
        contextType.setChannelData(data.channels.channel);
        contextType.setIsLoading(false);
      })
      .catch((error) => {
        contextType.state.showTableLoader = false;
        contextType.setIsLoading(false);
      });
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

  componentWillUnmount() {
    sessionStorage.removeItem("channelNames");
    sessionStorage.removeItem("listViewDatas");
    sessionStorage.removeItem("copyTextChannel");
    sessionStorage.removeItem("copyTextLanguage");
  }
  render() {
    return (
      <RateProductContextProvider>
        <RateProductContext.Consumer>
          {(rateProductContext) => {
            contextType = rateProductContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <React.Fragment>
                <form name="thisForm" id="thisForm">
                  {RateUtils.header(styles, "Channels and Languages")}
                  <table className={styles.zero_Height}>
                    <tbody>
                      <tr>
                        <td className={styles.bold}>Channel:</td>
                        <td className={styles.field_Name}>
                          <select
                            value={contextType.channel}
                            className={styles.fontSize}
                            onChange={(event) => contextType.onSelect(event)}
                          >
                            <option value={"select"}>
                              {Settings.customText.selectChannel}
                            </option>

                            {contextType.state.channelData &&
                              contextType.state.channelData.map(
                                (data, index) => (
                                  <option
                                    key={"channel_" + index}
                                    value={
                                      data.code +
                                      "_" +
                                      data.number +
                                      "_" +
                                      data.name
                                    }
                                  >
                                    {data.name}
                                  </option>
                                )
                              )}
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {contextType.state.langListData &&
                    contextType.state.langListData &&
                    !contextType.state.langLoader && (
                      <Language data={contextType} />
                    )}
                  {contextType.state.langLoader && (
                    <div> {Settings.customText.langLoader}</div>
                  )}
                </form>
              </React.Fragment>
            );
          }}
        </RateProductContext.Consumer>
      </RateProductContextProvider>
    );
  }
}
export default withRouter(RateProduct);
