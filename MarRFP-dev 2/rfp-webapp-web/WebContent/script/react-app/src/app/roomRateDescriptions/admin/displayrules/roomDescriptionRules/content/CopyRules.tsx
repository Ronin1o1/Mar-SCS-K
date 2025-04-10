import React, { Suspense } from "react";
import styles from "./CopyRules.css";
import nextBtnImg from "../../../../../common/assets/img/button/btnNext.gif";
import API from "../service/API";
import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../context/RoomDescriptionContext";
import Settings from "../static/Settings";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";

let contextType = null;

export default class RateProduct extends React.Component {
  static contextType = RoomDescriptionContext;

  constructor(props) {
    super(props);

    this.state = {
      channelName: this.props.location.state.channelValue,
      entryName: this.props.location.state.dataview,
      dataSet: this.props.location.state.dataSet,
      dataview: this.props.location.state.dataview,
      strChannel: this.props.location.state.strChannel,
      strEntry: this.props.location.state.strEntry,
      copyNew: null,
      copyValues: null,
      channelValue: null,
      selectChannelCode: null,
      entryCode: null,
      selectChannelCodeName: null,
      entryValue: null,
      checkboxChecked: false,
      copyRules: "none",
    };
  }

  componentDidMount() {
    API.copyRoomDrop()
      .then((data) => {
        this.context.copyChannels(data);
      })
      .catch((error) => {});
  }

  nextFunction_new(event) {
    if (contextType.createNewRules) {
      this.props.history.push({
        pathname: "/roomdefrules/RoomDescriptionView",
        state: {
          channelValue: this.props.location.state.channelValue,
          dataview: this.state.dataview,
          dataSet: this.state.dataSet,
          strChannel: this.state.strChannel,
          strEntry: this.state.strEntry,
          stateView: "test",
          copyRule: "copy",
        },
      });
    } else {
      if (this.state.channelValue === null) {
        alert(Settings.copyRulesPage.selectChannel);
      } else if (this.state.entryValue === null) {
        alert(Settings.copyRulesPage.selectEntry);
      } else {
        const strCopyChannel = {
          number: this.state.selectChannelCode,
          name: this.state.channelValue,
          code: this.state.selectChannelCodeName,
        };
        const strCopyEntry = {
          name: this.state.entryValue,
          code: this.state.entryCode,
        };
        const sltChannel = this.state.channelValue;
        const sltEntry = this.state.entryValue;
        const param = {
          copy: "on",
          sltChannel: JSON.stringify(sltChannel),
          sltEntry: JSON.stringify(sltEntry),
          formChg: "N",
          strCopyChannel: JSON.stringify(strCopyChannel),
          strCopyEntry: JSON.stringify(strCopyEntry),
          strChannel: JSON.stringify(this.state.strChannel),
          strEntry: JSON.stringify(this.state.strEntry),
        };
        this.props.history.push({
          pathname: "/roomdefrules/RoomDescriptionView",
          state: {
            channelValue: this.state.channelValue,
            dataview: this.state.entryValue,
            copyRule: "copy",
            params: param,
            strChannel: this.state.strChannel,
            strEntry: this.state.strEntry,
          },
        });
      }
    }
  }

  handleSplit(val, count) {
    return val.split("_")[count];
  }
  handleOnchange(e) {
    const inputVal = e.target.value;
    contextType.setCreateNewRules(false);
    contextType.onSelect(contextType.state.departureValue, e);
    if (e.target.name === "channel") {
      const values = inputVal.split("_");
      this.setState({
        channelValue: values[2],
        selectChannelCode: values[1],
        selectChannelCodeName: values[0],
      });
    }
    if (e.target.name === "entry") {
      const valuesEntry = inputVal.split("_");
      this.setState({ entryValue: valuesEntry[1], entryCode: valuesEntry[0] });
    }
  }

  render() {
    return (
      <RoomDescriptionContextProvider>
        <RoomDescriptionContext.Consumer>
          {(roomdescriptioncontext) => {
            contextType = roomdescriptioncontext;
            return (
              <form>
                <table className={styles.section}>
                  <tbody>
                    <tr>
                      <td className={styles.header}>
                        {Settings.copyRulesPage.pageTitle}
                      </td>
                    </tr>
                    <tr className={styles.headerHR}>
                      <td valign="top"></td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <table className={styles.zeroHeight}>
                          <tbody>
                            <tr>
                              <td className={styles.fieldName}>
                                {Settings.copyRulesPage.channel}
                              </td>
                              <td style={{ width: "5px" }}></td>
                              <td className={styles.fieldValue}>
                                {this.state.channelName}
                              </td>

                              <td style={{ width: "15px" }}></td>
                              <td className={styles.fieldName}>
                                {Settings.copyRulesPage.entry}
                              </td>
                              <td style={{ width: "5px" }}></td>
                              <td className={styles.fieldValue}>
                                {this.state.entryName}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.instructions}>
                        {Settings.copyRulesPage.createBlankDisplayRules}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table className={styles.zeroHeight}>
                          <tbody>
                            <tr>
                              <td className={styles.fieldName}>
                                <input
                                  type="radio"
                                  name="copy"
                                  value="copy-new"
                                  onChange={() =>
                                    contextType.setCreateNewRules(true)
                                  }
                                  checked={contextType.createNewRules}
                                />
                                {Settings.copyRulesPage.createNewDisplayRules}
                              </td>
                            </tr>
                            <tr>
                              <td className={styles.fieldName}>
                                <input
                                  type="radio"
                                  name="copy"
                                  value="copy-values"
                                  onChange={() =>
                                    contextType.setCreateNewRules(false)
                                  }
                                  checked={!contextType.createNewRules}
                                />
                                {
                                  Settings.copyRulesPage
                                    .copyDisplayRulesFromChannel
                                }
                              </td>
                              <td style={{ width: "5px" }}></td>
                              <td className={styles.fieldValue}>
                                <select
                                  onChange={(e) => {
                                    this.handleOnchange(e);
                                  }}
                                  name="channel"
                                >
                                  <option>
                                    {
                                      Settings.roomDescriptionTitles
                                        .pleaseSelectaChannel
                                    }
                                  </option>
                                  {this.context.state.copyData &&
                                    this.context.state.copyData.map((data) => (
                                      <option
                                        key={data}
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
                                    ))}
                                </select>
                              </td>
                              <td style={{ width: "10px" }}></td>
                              <td className={styles.fieldName}>
                                {Settings.copyRulesPage.entry}
                              </td>
                              <td style={{ width: "5px" }}></td>
                              <td className={styles.fieldValue}>
                                <select
                                  onChange={(e) => {
                                    this.handleOnchange(e);
                                  }}
                                  name="entry"
                                >
                                  <option>
                                    {
                                      Settings.roomDescriptionTitles
                                        .pleaseSelectanEntry
                                    }
                                  </option>
                                  {contextType.state.entry &&
                                    contextType.state.entry.map((data) => (
                                      <option
                                        key={data}
                                        value={data.code + "_" + data.name}
                                      >
                                        {data.name}
                                      </option>
                                    ))}
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.nextbtn}>
                        <p
                          tabIndex={0}
                          onClick={this.nextFunction_new.bind(this)}
                        >
                          <img src={nextBtnImg} alt={"nextbtn"} />
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <CModal
                  show={contextType.state.showModal}
                  onClose={contextType.onShowModal}
                  xPosition={Settings.modalXPosition}
                  yPosition={Settings.modalYPosition}
                >
                  <Suspense fallback={<CSuspense />}>
                    <div className={`${styles.pd} ${styles.modalContent}`}>
                      <p>{contextType.state.validationMessage}</p>
                    </div>
                  </Suspense>
                </CModal>
              </form>
            );
          }}
        </RoomDescriptionContext.Consumer>
      </RoomDescriptionContextProvider>
    );
  }
}
