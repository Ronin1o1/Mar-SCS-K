import React from "react";
import styles from "./RoomDescription.css";

import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../context/RoomDescriptionContextProvider";
import API from "../service/API";

import Language from "./Language";
import RoomUtills from "./RoomUtills";
import Settings from "../static/Settings";
import { CLoader } from "../../../../common/components/CLoader";
import { withRouter } from "react-router-dom";

let contextType = null;

class RoomDescription extends React.Component {
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
      <RoomDescriptionContextProvider>
        <RoomDescriptionContext.Consumer>
          {(roomDescriptionContext) => {
            contextType = roomDescriptionContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <React.Fragment>
                <form name="thisForm" id="thisForm">
                  {RoomUtills.header(styles, "Channels and Languages")}
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
                              {Settings.customeText.selectChannel}
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
                    <div> {Settings.customeText.langLoader}</div>
                  )}
                </form>
              </React.Fragment>
            );
          }}
        </RoomDescriptionContext.Consumer>
      </RoomDescriptionContextProvider>
    );
  }
}
export default withRouter(RoomDescription);
