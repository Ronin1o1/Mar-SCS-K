import React, { Suspense } from "react";
import styles from "./CopyRules.css";
import nextBtnImg from "../../../../../common/assets/img/button/btnNext.gif";
import API from "../service/API";
import RateProductContext, {
  RateProductContextProvider,
} from "../context/RateProductContext";
import Settings from "../static/Settings";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import CPageTitle from "../../../../../common/components/CPageTitle";

let contextType = null;
export default class CopyRules extends React.Component {
  static contextType = RateProductContext;
  constructor(props) {
    super(props);
    this.state = {
      channelName: this.props.location.state.channelValue,
      entryName: this.props.location.state.dataview,
      strChannel: this.props.location.state.strChannel,
      strEntry: this.props.location.state.strEntry,
      copyNew: null,
      copyValues: null,
      channelValue: null,
      entryValue: null,
      entryCode: null,
      selectChannelCode: null,
      selectChannelCodeName: null,
      checkboxChecked: false,
      copyRules: "none",
    };
  }

  componentDidMount() {
    API.copyRoomDrop()
      .then((data) => {
        contextType.copyChannels(data);
      })
      .catch((error) => {});
  }

  nextFunction_new(event) {
    if (contextType.createNewRules) {
      this.props.history.push({
        pathname: "/rateproductrules/RateProductView",
        state: {
          channelValue: this.props.location.state.channelValue,
          dataview: this.state.entryName,
          stateView: "test",
          copyRule: "copy",
          strChannel: this.state.strChannel,
          strEntry: this.state.strEntry,
          bCreateNew: true,
        },
      });
    } else {
      if (this.state.channelValue === null) {
        contextType.setState({
          ...contextType.state,
        });
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
          pathname: "/rateproductrules/RateProductView",
          state: {
            channelValue: this.state.channelValue,
            dataview: this.state.entryName,
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
      <RateProductContextProvider>
        <RateProductContext.Consumer>
          {(rateProductContext) => {
            contextType = rateProductContext;
            return (
              <form>
                <CPageTitle
                  title={Settings.copyRulesPage.pageTitle}
                ></CPageTitle>
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
                                  checked={contextType.createNewRules}
                                  onChange={() =>
                                    contextType.setCreateNewRules(true)
                                  }
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
                                  checked={!contextType.createNewRules}
                                  onChange={() =>
                                    contextType.setCreateNewRules(false)
                                  }
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
                                      Settings.rateProductTitles
                                        .pleaseSelectaChannel
                                    }
                                  </option>
                                  {contextType.state.copyData &&
                                    contextType.state.copyData.map((data) => (
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
                                    {Settings.rateProductTitles.selectEntry}
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
                    <div className={styles.modalContent}>
                      {contextType.state.validationMessage}
                    </div>
                  </Suspense>
                </CModal>
              </form>
            );
          }}
        </RateProductContext.Consumer>
      </RateProductContextProvider>
    );
  }
}
