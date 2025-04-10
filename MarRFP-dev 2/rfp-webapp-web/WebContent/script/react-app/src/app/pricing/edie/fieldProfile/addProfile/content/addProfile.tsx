import React, { Component } from "react";
import Settings from "../static/Settings";
import styles from "./addProfile.css";

import SaveBtnImg from "../../../../../common/assets/img/btnSave.gif";
//import API from "../service/API";
import CSelect from "../../../../../common/components/CSelect";
import addProfileContext, {
  AddProfileContextProvider,
} from "../context/addProfileContext";
import AddProfileContext from "../context/addProfileContext";
import Utils from "../../../../../common/utils/Utils";
let contextType = null;
export default class AddProfile extends Component {
  static contextType = addProfileContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    contextType.setProfileList();
  }

  render() {
    return (
      <AddProfileContextProvider>
        <AddProfileContext.Consumer>
          {(edieProfileAddContext) => {
            contextType = edieProfileAddContext;
            return (
              <React.Fragment>
                <div>
                  <table className={styles.profileListOuterTable}>
                    <tbody>
                      <tr>
                        <td>
                          <table className={styles.profileListOuterTableHeader}>
                            <tbody>
                              <tr>
                                <td className={styles.header}>
                                  {Settings.title}
                                </td>
                              </tr>
                              <tr className={styles.BGDarkBlueStyle}>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr className={styles.topAlign}>
                        <td />
                      </tr>

                      <tr className={styles.topAlign}>
                        <td>
                          <table
                            className={styles.zeroHeight}
                            style={{ verticalAlign: "top" }}
                          >
                            <tbody>
                              <tr>
                                <td className={styles.field_Name}>
                                  {Settings.edieProfileAdd.profileName.label}
                                  <input
                                    style={{ width: "393px", height: "18px" }}
                                    id={Settings.edieProfileAdd.profileName.id}
                                    value={
                                      contextType.state.profileList.profileName
                                    }
                                    type="text"
                                    maxLength={100}
                                    size={60}
                                    onKeyPress={Utils.IsAlphaNumeric}
                                    onChange={(e) => contextType.onChange(e)}
                                  />
                                </td>
                                <td style={{ width: "20px" }} />
                                <td></td>
                              </tr>
                              <tr>
                                <td className={styles.field_Name}>
                                  {
                                    Settings.edieProfileAdd
                                      .copyFromExistingProfile.label
                                  }
                                  <CSelect
                                    className={styles.selectEdieDrpBox}
                                    name={"CopyFromExistingProfile"}
                                    isDisabled={false}
                                    selectedValue={
                                      contextType.state.profileList
                                        .selectedValue
                                    }
                                    id={
                                      Settings.edieProfileAdd
                                        .copyFromExistingProfile.id
                                    }
                                    ddnOptions={contextType.state.profileList}
                                    keyField={
                                      Settings.edieProfileAdd
                                        .copyFromExistingProfile.keyField
                                    }
                                    valField={
                                      Settings.edieProfileAdd
                                        .copyFromExistingProfile.valField
                                    }
                                    onChange={(e) =>
                                      contextType.handleChange(e)
                                    }
                                    //defaultValue={Settings.edieProfileAdd.copyFromExistingProfile.label}
                                  />
                                </td>
                                <td style={{ width: "20px" }} />
                                <td>
                                  <img
                                    id="saveButton"
                                    src={SaveBtnImg}
                                    alt=""
                                    onClick={() => {
                                      contextType.saveProfile();
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr style={{ verticalAlign: "top" }}></tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            );
          }}
        </AddProfileContext.Consumer>
      </AddProfileContextProvider>
    );
  }
}
