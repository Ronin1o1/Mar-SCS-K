import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import styles from "./EdieHotelProfileName.css";
import SaveBtnImg from "../../../../common/assets/img/button/btnSave.gif";
import CancelBtnImg from "../../../../common/assets/img/button/btnCancel.gif";

import EdieHotelProfileListContext, {
  EdieHotelProfileListContextProvider,
} from "../context/EdieHotelProfileListContext";
import Interceptors from "../../../../common/components/Interceptors";
import CSuspense from "../../../../common/components/CSuspense";
import CDataTable from "../../../../common/components/CDataTable";
import Settings from "../static/Settings";
import API from "../service/API";

let contextType = null;
export default class EdieHotelProfileName extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    API.getEdieHotelProfiles().then((data) => {
      contextType.setEdieHotelProfileListData(data);
    });
  }

  editBodyTemplate = (rowData) => {
    return (
      <input
        id={rowData.profile_id}
        //onKeyPress={}
        onChange={contextType.onGridProfileNameEdit}
        onBlur={contextType.validate}
        value={rowData.profile_name}
        style={{
          width: "390px",
          fontFamily: "Arial, Helvetica, sans-serif, Verdana, Geneva",
        }}
      />
    );
  };

  columns = [
    {
      field: Settings.edieHotelProfileList.tableColumns.profileName.fieldName,
      header: Settings.edieHotelProfileList.tableColumns.profileName.header,
      body: this.editBodyTemplate,
      style: {
        width: "400px",
      },
    },
  ];

  render() {
    return (
      <EdieHotelProfileListContextProvider>
        <EdieHotelProfileListContext.Consumer>
          {(edieHotelProfileListContext) => {
            contextType = edieHotelProfileListContext;
            return (
              <React.Fragment>
                <div>
                  <Suspense fallback={<CSuspense />}>
                    <Interceptors spinnerFlag={true} />
                    <table className={styles.edieHotelProfileListOuterTable}>
                      <tbody>
                        <tr>
                          <td>
                            <table
                              className={
                                styles.edieHotelProfileListOuterTableHeader
                              }
                            >
                              <tbody>
                                <tr>
                                  <td className={styles.header}>
                                    {Settings.changeProfileName.pageTitle}
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
                          <td>
                            <table className="zero-Height">
                              <tbody>
                                <tr>
                                  <td>
                                    <Link
                                      to={`${Settings.edieHotelProfileList.editediehotelprofile}`}
                                    >
                                      <img
                                        onClick={contextType.updateProfileName}
                                        src={SaveBtnImg}
                                        className={styles.saveBtn}
                                      />
                                    </Link>
                                  </td>
                                  <td />
                                  <td style={{ width: "20px" }} />
                                  <td>
                                    <Link
                                      to={`${Settings.edieHotelProfileList.editediehotelprofile}`}
                                    >
                                      <img
                                        // onClick={contextType.cancelProfile}
                                        src={CancelBtnImg}
                                        className={styles.cancelBtn}
                                      />
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>

                        <tr className={styles.topAlign}>
                          <td>
                            <div
                              id="editGridHotelProfileList"
                              className={styles.editGridHotelProfileList}
                            >
                              <CDataTable
                                id="gridTableView"
                                columns={this.columns}
                                value={
                                  contextType.state.edieHotelProfileListData
                                    .edieHotelProfileList
                                }
                                marginLeft="0px"
                                scrollHeight="470px"
                                width="421px"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Suspense>
                </div>
              </React.Fragment>
            );
          }}
        </EdieHotelProfileListContext.Consumer>
      </EdieHotelProfileListContextProvider>
    );
  }
}
