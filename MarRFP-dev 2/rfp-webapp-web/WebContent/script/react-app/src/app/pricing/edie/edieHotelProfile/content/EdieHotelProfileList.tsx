import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import styles from "./EdieHotelProfileList.css";
import NewBtnImg from "../../../../common/assets/img/button/btnNew.gif";
import ChangeNamesBtnImg from "../../../../common/assets/img/button/btnChangeNames.gif";
import DeleteBtnImg from "../../../../common/assets/img/button/delete.gif";
import EdieHotelProfileListContext from "../context/EdieHotelProfileListContext";
import Interceptors from "../../../../common/components/Interceptors";
import CSuspense from "../../../../common/components/CSuspense";
import CDataTable from "../../../../common/components/CDataTable";
import Settings from "../static/Settings";
import API from "../service/API";
import { EdieHotelProfileListContextProvider } from "../context/EdieHotelProfileListContext";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;

export default class EdieHotelProfileList extends Component {
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
    API.getEdieHotelProfiles().then((data) => {
      contextType.setEdieHotelProfileListData(data);
      contextType.setIsLoading(false);
    });
  }

  deleteProfileBodyTemplate = (rowData) => {
    return (
      <span
        id={rowData.profile_id}
        onClick={() => {
          contextType.deleteProfile(rowData.profile_id);
        }}
      >
        <img src={DeleteBtnImg} className={styles.deleteBtn} />
      </span>
    );
  };

  linkBodyTemplate = (rowData) => {
    return (
      <Link
        id={rowData.profile_id}
        className={styles.titleLink}
        to={`${Settings.edieHotelProfileList.edieHotelProfileViewPath}/${rowData.profile_id}/${rowData.profile_name}`}
      >
        {rowData.profile_name}
      </Link>
    );
  };

  columns = [
    {
      field: Settings.edieHotelProfileList.tableColumns.profileName.id,
      header: "",
      body: this.deleteProfileBodyTemplate,
      style: {
        width: "30px",
        minWidth: "30px",
        textAlign: "center",
      },
    },

    {
      field: Settings.edieHotelProfileList.tableColumns.profileName.fieldName,
      header: Settings.edieHotelProfileList.tableColumns.profileName.header,
      body: this.linkBodyTemplate,
      style: {
        width: "400px",
        minWidth: "400px",
      },
    },
  ];

  render() {
    return (
      <EdieHotelProfileListContextProvider>
        <EdieHotelProfileListContext.Consumer>
          {(edieHotelProfileListContext) => {
            contextType = edieHotelProfileListContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
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
                                    {Settings.edieHotelProfileList.pageTitle}
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
                        <tr>
                          <td>
                            <table className="zero-Height">
                              <tbody>
                                <tr>
                                  <td>
                                    <Link
                                      to={`${Settings.edieHotelProfileList.edieHotelProfileAddPath}`}
                                    >
                                      <img
                                        text-align="middle"
                                        alt="New Account"
                                        src={NewBtnImg}
                                        className={styles.newBtn}
                                        id="NewButton"
                                      />
                                    </Link>
                                  </td>
                                  <td style={{ width: "15px" }}></td>
                                  <td>
                                    <Link
                                      to={`${Settings.edieHotelProfileList.edieHotelProfileNamePath}`}
                                    >
                                      <img
                                        text-align="middle"
                                        alt="Change Names"
                                        src={ChangeNamesBtnImg}
                                        className={styles.changeNamesBtn}
                                        id="ChangeNamesButton"
                                      />
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr className={styles.topAlign}>
                          <td>
                            <div
                              id="gridHotelProfileList"
                              className={styles.gridHotelProfileList}
                            >
                              <CDataTable
                                id="gridTableView"
                                columns={this.columns}
                                value={
                                  contextType.state.edieHotelProfileListData
                                    .edieHotelProfileList
                                }
                                marginLeft="0px"
                                scrollHeight="calc(100vh - 195px)"
                                width="430px"
                                emptyMessage=" "
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Suspense>
                </div>
                <style>{`
                  .p-datatable-scrollable-body{
                    overflow: hidden auto !important;
                  }
                  .p-datatable-scrollable-header-box{
                    line-height:31px;
                  }
              `}</style>
              </React.Fragment>
            );
          }}
        </EdieHotelProfileListContext.Consumer>
      </EdieHotelProfileListContextProvider>
    );
  }
}
