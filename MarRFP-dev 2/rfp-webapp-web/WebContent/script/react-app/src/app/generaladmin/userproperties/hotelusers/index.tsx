/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component } from "react";
import Settings from "./static/Settings";
import styles from "./styles/hotelusers.css";
import CDataTable from "../../../common/components/CDataTable";
import { Link } from "react-router-dom";
import HotelUsersContext, {
  HotelUsersContextProvider,
} from "./context/HotelUsersContext";
// import UserPropertiesContext, {
//   UserPropertiesContextProvider,
// } from "../context/UserPropertiesContext";
import { HotelUserSearchFilters } from "../../common/components/hotelusersearchfilters/HotelUserSearchFilters";
import { CPagination } from "../../../common/components/CPagination";
import CModal from "../../../common/components/CModal";
import ViewMarshaCode from "./content/ViewMarshaCode";
import btnViewSmall from "../../../common/assets/img/button/btnViewSmall.gif";
import btnSave from "../../../common/assets/img/button/btnSave.gif";
import { CLoader } from "../../../common/components/CLoader";

let hotelUsersContextType = null;
interface IProps {}
interface IState {
  hotelUsersData: {};
  userSearchCriteria: {
    searchBy: string;
    filterString: string;
    orderby: number;
    userRole: string;
    strPage: {
      page: number;
      maxpagelen: number;
    };
  };
  viewMarshaCodeDialogFlag: boolean;
  params: {
    userid: string;
    userRole: string;
    eid: string;
  };
}
class HotelUsers extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      hotelUsersData: null,
      userSearchCriteria: {
        searchBy: "ALL",
        filterString: "",
        orderby: 0,
        userRole: "MFPSALES",
        strPage: {
          page: 1,
          maxpagelen: 0,
        },
      },
      viewMarshaCodeDialogFlag: false,
      params: {
        userid: "",
        userRole: "",
        eid: "",
      },
    };
  }

  setGridSize = () => {
    const element = document.querySelector(".p-datatable") as HTMLElement;
    if (element && element != undefined) {
      element.style.width =
        (document.documentElement.clientWidth - 5).toString() + "px";
      const bodyElement = document.querySelector(
        ".p-datatable-scrollable-body"
      ) as HTMLElement;
      if (bodyElement && bodyElement != undefined) {
        if (document.documentElement.clientWidth != 1536) {
          bodyElement.classList.remove("p-datatable-scrollable-body");
          bodyElement.style["overflowX"] = "scroll";
          bodyElement.style["overflowY"] = "auto";
          bodyElement.style.maxHeight = "calc(100vh - 235px)";
          bodyElement.style.position = "relative";
        } else {
          bodyElement.classList.add("p-datatable-scrollable-body");
        }
      }
    }
  };
  componentDidMount(): void {
    window.addEventListener("resize", this.setGridSize);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.setGridSize);
  }
  eidBodyTemplate = (rowData) => {
    return (
      <Link
        to={{ pathname: "/useredithotelaccess", state: rowData }}
        className={styles.eidLink}
      >
        {rowData.eid}
      </Link>
    );
  };

  internalNotesTemplate = (rowData) => {
    return (
      <textarea
        value={
          rowData.user_internalnotes != null ? rowData.user_internalnotes : ""
        }
        className={styles.internalNotes}
        rows={2}
        onChange={(e) => hotelUsersContextType.setInternalText(e, rowData.eid)}
        onBlur={(e) =>
          hotelUsersContextType.validateInternalText(e, rowData.eid, 100)
        }
        onKeyPress={(e) =>
          hotelUsersContextType.validateInternalText(e, rowData.eid, 100)
        }
      />
    );
  };

  marshaCodeTemplate = (rowData) => {
    return (
      rowData.marshacount > 0 && (
        <a href="javascript:void(0);">
          <img
            src={btnViewSmall}
            onClick={() => this.marshaCodeButtonHandler(rowData)}
          />
        </a>
      )
    );
  };

  marshaCodeButtonHandler(data) {
    const paramsObj = this.state.params;
    paramsObj.userid = data.cn_userid;
    //paramsObj.userRole = data.role;
    paramsObj.userRole = "MFPUSER";
    paramsObj.eid = data.eid;
    this.setState({ ...this.state, params: paramsObj });
    this.setViewMarshaCodeDialogFlag(true);
  }
  setViewMarshaCodeDialogFlag(flag: boolean) {
    this.setState({ ...this.state, viewMarshaCodeDialogFlag: flag });
  }
  stateProvinceTemplate = (rowData) => {
    return rowData.cn_state && rowData.cn_country ? (
      <span>{`${rowData.cn_state}/${rowData.cn_country}`}</span>
    ) : rowData.cn_state || rowData.cn_country ? (
      <span>{`${rowData.cn_state}${rowData.cn_country}`}</span>
    ) : null;
  };

  columns = [
    {
      field: Settings.tableColumns.eid.field,
      header: Settings.tableColumns.eid.header,
      body: this.eidBodyTemplate,
      style: { width: "60px", minWidth: "60px" },
    },
    {
      field: Settings.tableColumns.lname.field,
      header: Settings.tableColumns.lname.header,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.fname.field,
      header: Settings.tableColumns.fname.header,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.stateprovince.field,
      header: Settings.tableColumns.stateprovince.header,
      body: this.stateProvinceTemplate,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      body: this.marshaCodeTemplate,
      style: { width: "80px", minWidth: "80px" },
    },
    {
      field: Settings.tableColumns.enhanced_reporting.field,
      header: Settings.tableColumns.enhanced_reporting.header,
      style: { width: "70px", minWidth: "70px" },
    },
    {
      field: Settings.tableColumns.phoneno.field,
      header: Settings.tableColumns.phoneno.header,
      style: { width: "100px", minWidth: "100px" },
    },
    {
      field: Settings.tableColumns.email.field,
      header: Settings.tableColumns.email.header,
      style: { width: "300px", minWidth: "300px" },
    },
    {
      field: Settings.tableColumns.internalNotes.field,
      header: Settings.tableColumns.internalNotes.header,
      body: this.internalNotesTemplate,
      style: { width: "300px", minWidth: "300px" },
    },
  ];

  handlePaginationAPI(pageNumber: number) {
    sessionStorage.setItem("hotelUsersPageNo", pageNumber);
    hotelUsersContextType.setPNumber(pageNumber);
    hotelUsersContextType.setPostData({
      ...hotelUsersContextType.postData,
      userSearchCriteria: {
        ...hotelUsersContextType.postData.userSearchCriteria,
        page: pageNumber,
      },
    });
    hotelUsersContextType.onClickSearch(pageNumber);
  }

  render() {
    return (
      <HotelUsersContextProvider>
        <HotelUsersContext.Consumer>
          {(HotelUsersContext) => {
            hotelUsersContextType = HotelUsersContext;
            return (
              <>
                <CModal
                  title={
                    Settings.labels.marshaCodeListFor + this.state.params.eid
                  }
                  onClose={() => {
                    this.setViewMarshaCodeDialogFlag(false);
                  }}
                  show={this.state.viewMarshaCodeDialogFlag}
                  xPosition={-300}
                  yPosition={-200}
                >
                  <ViewMarshaCode
                    params={this.state.params}
                    onClose={() => {
                      this.setViewMarshaCodeDialogFlag(false);
                    }}
                  />
                </CModal>
                <div className={styles.hoteluserheading}>
                  <div className={styles.headings}>
                    {Settings.labels.hotesUserHeading}
                  </div>
                  <hr />
                </div>
                {hotelUsersContextType.totalPages != -1 && (
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td className={styles.lsfilters}>
                            <HotelUserSearchFilters />
                          </td>
                          <td className={styles.pd40}>
                            <CPagination
                              totalPages={hotelUsersContextType.totalPages}
                              context={hotelUsersContextType}
                              handlePaginationAPI={this.handlePaginationAPI}
                              compName="HotelUsers"
                            />
                          </td>
                          <td className={styles.pd40}>
                            <a href="javascript:void(0);">
                              <img
                                src={btnSave}
                                onClick={() =>
                                  hotelUsersContextType.saveHotelUsersGridData()
                                }
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <CDataTable
                      id="hotelUsersGrid"
                      reloadTable={!hotelUsersContextType.isLoaded}
                      columns={this.columns}
                      value={hotelUsersContextType.hotelUsersData}
                      marginLeft="0px"
                      emptyMessage="&nbsp;&nbsp;"
                      scrollHeight="calc(100vh - 215px)"
                    />
                  </div>
                )}

                {!hotelUsersContextType.isLoaded && <CLoader></CLoader>}
              </>
            );
          }}
        </HotelUsersContext.Consumer>
        <style>{`
          .dataTablegridView{
            overflow:auto;
          }
          .p-datatable.p-component.p-datatable-scrollable{
            width:calc(100vw - 5px);
          }
          .p-datatable-scrollable-body{
            overflow-y: auto !important;
            overflow-x:auto !important;
          }
          .p-datatable-tbody tr td:nth-child(7){
            text-align:center;
          }
          .p-datatable-tbody tr{
            border-bottom:0 !important;
          }
          .p-datatable-tbody tr td{
            padding: 0 2px !important;
          }
          .p-datatable-thead .p-column-title{
            width: 90px;
            min-width: 90px;
            display: block;
          }
          @media only screen and (min-width: 1920px) {
            .p-datatable-scrollable-view{
              height: auto;
            }
            .p-datatable-scrollable-body{
              max-height: calc(100vh - 220px) !important;
            }
            .page_body_container {
              min-height: calc(100vh - 90px) !important;
            }
            .footerwidget{
              position:fixed;
            }
            .p-datatable-scrollable-view{
              width: 1315px;
            }
          }
          @media (min-width: 1650px) and (max-width: 1750px) {

            .p-datatable-scrollable-view{
              height: auto;
            }
            .p-datatable-scrollable-body{
              max-height: calc(100vh - 225px) !important;
            }
            .p-datatable-scrollable-view{
              width: 1315px;
            }
          }
          @media (min-width: 1450px) and (max-width: 1600px){
            .p-datatable-scrollable-view{
              width: 1315px;
            }
          }
          .container{
            min-width:850px;
          }
          @media only screen and (max-width: 1245px) {
            .page_body_container {
              min-height: calc(100vh - 111px) !important;
            }
            .footerwidget{
              position:fixed;
            }
            .p-datatable-scrollable-view {
              height: auto;
            }
            .p-datatable-scrollable-body{
              max-height: calc(100vh - 238px) !important;
            }
          }
        `}</style>
      </HotelUsersContextProvider>
    );
  }
}
export default HotelUsers;
