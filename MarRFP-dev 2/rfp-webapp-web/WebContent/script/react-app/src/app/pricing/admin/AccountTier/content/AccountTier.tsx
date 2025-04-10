import React, { Component } from "react";
import API from "../service/API";
import styles from "./AccountTier.css";
import CopyAccountContext, {
  CopyAccountContextProvider,
} from "../context/AccountTierContext";
import Settings from "../static/Settings";
import Copybtn from "../../../../common/assets/img/btnCopy.gif";
import CSelect from "../../../../common/components/CSelect";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
let contextType = null;
interface IProps {}
interface IState {}
export default class CopyAccount extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      clearData: false,
    };
  }

  handleClick = () => {
    contextType.copyButtonHandler();
  };
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
    contextType.setLoader(true);
    contextType.state.showScreenLoader = true;
    API.getAccount().then((data) => {
      contextType.state.showScreenLoader = false;
      const accountTierData = { ...contextType.state.accountTierData };
      accountTierData.accountSegment = data.accountSegmentList;
      accountTierData.fromDate = data.fromperiodList;
      accountTierData.toDate = data.toperiodList;
      accountTierData.accountSegment.splice(0, 0, {
        accounttype: "",
        accounttypedescription: "",
        defaultcom: null,
      });
      accountTierData.fromDate.splice(0, 0, { period: "" });
      accountTierData.toDate.splice(0, 0, { period: "" });
      contextType.setState({
        ...contextType.state,
        accountTierData: accountTierData,
        isComplete: true,
      });
    });
  }
  render() {
    return (
      <CopyAccountContextProvider>
        <CopyAccountContext.Consumer>
          {(accountContext) => {
            contextType = accountContext;
            if (contextType.state.isComplete) {
              return (
                <>
                  {" "}
                  {contextType.state.showScreenLoader ? (
                    <img
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "45%",
                      }}
                      src={screenLoader}
                    />
                  ) : (
                    <>
                      <div className={styles.header}>
                        {Settings.accountTierDetails.copyTitle}
                        <hr />
                      </div>
                      <div>
                        <p className={styles.instruction}>
                          {Settings.accountTierDetails.title}
                        </p>
                        <table className={styles.table}>
                          <tr>
                            <td className={styles.fontBold}>
                              {
                                Settings.accountTierDetails.formFields
                                  .accountTier.label
                              }
                            </td>
                            <td>
                              <CSelect
                                id={Settings.accountTierDetails.accountSegment}
                                selectedValue={
                                  contextType.state.copyAccountInfoByTierData
                                    .accountSegment
                                }
                                ddnOptions={
                                  contextType.state.accountTierData
                                    .accountSegment
                                }
                                keyField={
                                  Settings.accountTierDetails.accounttype
                                }
                                valField={
                                  Settings.accountTierDetails
                                    .accounttypedescription
                                }
                                onChange={(event) =>
                                  contextType.onChangeData(
                                    Settings.accountTierDetails.accountSegment,
                                    event
                                  )
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>
                              {
                                Settings.accountTierDetails.formFields
                                  .fromPeriod.label
                              }
                            </td>
                            <td>
                              <CSelect
                                id={Settings.accountTierDetails.fromPeriod}
                                selectedValue={
                                  contextType.state.copyAccountInfoByTierData
                                    .fromPeriod
                                }
                                ddnOptions={
                                  contextType.state.accountTierData.fromDate
                                }
                                keyField={Settings.accountTierDetails.period}
                                valField={Settings.accountTierDetails.period}
                                onChange={(event) =>
                                  contextType.onChangeData(
                                    Settings.accountTierDetails.fromPeriod,
                                    event
                                  )
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={styles.fontBold}>
                              {
                                Settings.accountTierDetails.formFields.toPeriod
                                  .label
                              }
                            </td>
                            <td>
                              <CSelect
                                id={Settings.accountTierDetails.toPeriod}
                                selectedValue={
                                  contextType.state.copyAccountInfoByTierData
                                    .toPeriod
                                }
                                ddnOptions={
                                  contextType.state.accountTierData.toDate
                                }
                                keyField={Settings.accountTierDetails.period}
                                valField={Settings.accountTierDetails.period}
                                onChange={(event) =>
                                  contextType.onChangeData(
                                    Settings.accountTierDetails.toPeriod,
                                    event
                                  )
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <div
                              className={styles.copybtn}
                              id={Settings.accountTierDetails.copybtn}
                            >
                              <img
                                tabIndex={0}
                                src={Copybtn}
                                id={
                                  Settings.accountTierDetails.copyButton.label
                                }
                                onClick={contextType.copyButtonHandler}
                              ></img>
                            </div>
                          </tr>
                        </table>
                      </div>
                    </>
                  )}
                </>
              );
            } else {
              return null;
            }
          }}
        </CopyAccountContext.Consumer>
      </CopyAccountContextProvider>
    );
  }
}
