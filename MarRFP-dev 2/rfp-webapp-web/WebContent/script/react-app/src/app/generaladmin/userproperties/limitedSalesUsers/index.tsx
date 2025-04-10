/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component } from "react";
import Settings from "./static/Settings";
import styles from "./styles/limitedSalesUsers.css";
import CDataTable from "../../../common/components/CDataTable";
import { Link } from "react-router-dom";
import LimitedSalesUsersContext, {
  LimitedSalesUsersContextProvider,
} from "./context/LimitedSalesUsersContext";
import { LimitedSalesUsersSearchFilters } from "../../common/components/limitedSalesUsersFilters/LimitedSalesUsersSearchFilters";
import { CPagination } from "../../../common/components/CPagination";
import CModal from "../../../common/components/CModal";
import ViewAccountNamesOrMarshaCode from "./content/ViewAccountNamesOrMarshaCode";
import CPageTitle from "../../../common/components/CPageTitle";
import btnViewSmall from "../../../common/assets/img/button/btnViewSmall.gif";
import btnSave from "../../../common/assets/img/button/btnSave.gif";
import { CLoader } from "../../../common/components/CLoader";

let limitedSalesUsersContextType = null;
interface IProps {}
interface IState {
  limitedSalesUsersData: {};
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
  viewAccountNamesDialogFlag: boolean;
  params: {
    userid: string;
    userRole: string;
    eid: string;
  };
}
class LimitedSalesUsers extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      limitedSalesUsersData: null,
      userSearchCriteria: {
        searchBy: "ALL",
        filterString: "",
        orderby: 1,
        userRole: "MFPFSALE",
        strPage: {
          page: 1,
          maxpagelen: 20,
        },
      },
      viewAccountNamesDialogFlag: false,
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
        to={{ pathname: "/usereditlimitedsalesaccess", state: rowData }}
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
        onChange={(e) =>
          limitedSalesUsersContextType.setInternalText(e, rowData.eid)
        }
        style={{ width: "265px" }}
        onBlur={(e) =>
          limitedSalesUsersContextType.validateInternalText(e, rowData.eid, 100)
        }
        onKeyPress={(e) =>
          limitedSalesUsersContextType.validateInternalText(e, rowData.eid, 100)
        }
      />
    );
  };

  accountOrMarshaCodeTemplate = (rowData) => {
    return (
      (rowData.acctcount > 0 || rowData.marshacount > 0) && (
        <a href="javascript:void(0);">
          <img
            style={{ cursor: "default" }}
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
    paramsObj.userRole = "MFPFSALE";
    paramsObj.eid = data.eid;
    this.setState({ ...this.state, params: paramsObj });
    this.setViewAccountNamesDialogFlag(true);
  }

  setViewAccountNamesDialogFlag(flag: boolean) {
    this.setState({ ...this.state, viewAccountNamesDialogFlag: flag });
  }

  stateCountryDisplay = (rowData) => {
    return rowData.cn_state && rowData.cn_country ? (
      <span>{rowData.cn_state + "/" + rowData.cn_country}</span>
    ) : rowData.cn_state || rowData.cn_country ? (
      <span>{rowData.cn_state + rowData.cn_country}</span>
    ) : null;
  };

  columns = [
    {
      field: Settings.tableColumns.eid.field,
      header: Settings.tableColumns.eid.header,
      body: this.eidBodyTemplate,
      style: { width: "65px", minWidth: "65px" },
    },
    {
      field: Settings.tableColumns.lname.field,
      header: Settings.tableColumns.lname.header,
      style: { width: "95px", minWidth: "95px" },
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
      body: this.stateCountryDisplay,
      style: { width: "95px", minWidth: "95px" },
    },
    {
      field: Settings.tableColumns.companyname.field,
      header: Settings.tableColumns.companyname.header,
      style: { width: "95px", minWidth: "95px" },
    },
    {
      field: Settings.tableColumns.accountormarshacode.field,
      header: Settings.tableColumns.accountormarshacode.header,
      body: this.accountOrMarshaCodeTemplate,
      style: { width: "85px", minWidth: "85px" },
    },
    {
      field: Settings.tableColumns.phoneno.field,
      header: Settings.tableColumns.phoneno.header,
      style: { width: "100px", minWidth: "100px" },
    },
    {
      field: Settings.tableColumns.email.field,
      header: Settings.tableColumns.email.header,
    },
    {
      field: Settings.tableColumns.internalNotes.field,
      header: Settings.tableColumns.internalNotes.header,
      body: this.internalNotesTemplate,
    },
  ];

  handlePaginationAPI(pageNumber: number) {
    sessionStorage.setItem("limitedsalesUsersPageNo", pageNumber);
    limitedSalesUsersContextType.setPNumber(pageNumber);
    limitedSalesUsersContextType.setPostData({
      ...limitedSalesUsersContextType.postData,
      userSearchCriteria: {
        ...limitedSalesUsersContextType.postData.userSearchCriteria,
        page: pageNumber,
      },
    });
    limitedSalesUsersContextType.updateLimitedSalesUsersGridData(pageNumber);
  }

  render() {
    return (
      <LimitedSalesUsersContextProvider>
        <LimitedSalesUsersContext.Consumer>
          {(LimitedSalesUsersContext) => {
            limitedSalesUsersContextType = LimitedSalesUsersContext;
            return (
              <>
                <>
                  <CModal
                    title={
                      limitedSalesUsersContextType.isSaved
                        ? Settings.labels.successMessage
                        : Settings.labels.alertMessage
                    }
                    onClose={limitedSalesUsersContextType.closeValidateModel}
                    show={limitedSalesUsersContextType.validateModal}
                    closeImgTitle={Settings.labels.closeTitle}
                    xPosition={-100}
                    yPosition={-100}
                  >
                    <div className={styles.model}>
                      <table>
                        <tr>
                          <td align="center">
                            {limitedSalesUsersContextType.message}
                          </td>
                        </tr>
                        {limitedSalesUsersContextType.isSaved && (
                          <tr>
                            <td align="center">
                              <button
                                onClick={
                                  limitedSalesUsersContextType.closeValidateModel
                                }
                              >
                                OK
                              </button>
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </CModal>
                  <CModal
                    title={`${Settings.labels.marshaCodeOrAccountListFor} ${this.state.params.eid}`}
                    onClose={() => {
                      this.setViewAccountNamesDialogFlag(false);
                    }}
                    show={this.state.viewAccountNamesDialogFlag}
                    xPosition={-200}
                    yPosition={-200}
                  >
                    <ViewAccountNamesOrMarshaCode
                      params={this.state.params}
                      onClose={() => {
                        this.setViewAccountNamesDialogFlag(false);
                      }}
                    />
                  </CModal>
                  <CPageTitle
                    title={Settings.labels.titleLimitedSalesUsers}
                    titleSpace={{ paddingBottom: "25px" }}
                    titleContainer={{ marginBottom: "0px" }}
                  ></CPageTitle>
                  {limitedSalesUsersContextType.totalPages != -1 && (
                    <div>
                      <div className={styles.tablemargin}>
                        <div className={styles.lsfilters}>
                          <LimitedSalesUsersSearchFilters />

                          <CPagination
                            totalPages={limitedSalesUsersContextType.totalPages}
                            context={limitedSalesUsersContextType}
                            handlePaginationAPI={this.handlePaginationAPI}
                            compName="LimitessalesUsers"
                            resetInput={limitedSalesUsersContextType.resetInput}
                          />
                          <a
                            href="javascript:void(0);"
                            style={{ marginTop: "13px" }}
                          >
                            <img
                              src={btnSave}
                              onClick={() =>
                                limitedSalesUsersContextType.saveLimitedSalesUsersGridData()
                              }
                            />
                          </a>
                        </div>
                      </div>
                      <CDataTable
                        id="salesUsersGrid"
                        columns={this.columns}
                        reloadTable={!limitedSalesUsersContextType.isLoaded}
                        value={
                          limitedSalesUsersContextType.limitedSalesUsersData
                        }
                        marginLeft="0px"
                        emptyMessage="No Data Found"
                        overflow-x="scroll"
                      />
                    </div>
                  )}

                  {!limitedSalesUsersContextType.isLoaded && (
                    <CLoader></CLoader>
                  )}
                </>
                <style>
                  {`
                    .container{
                      min-width:850px;
                    }
                    .p-datatable{
                      width:calc(100vw - 5px);
                    }
                    .p-datatable-scrollable-body{
                      overflow-y: auto !important;
                      overflow-x:auto !important;
                      height: calc(100vh - 216px);
                    }
                    .p-datatable-scrollable-body-table{
                      min-width: 1315px;
                    }
                    .p-datatable-scrollable-header-table{
                      min-width: 1315px;
                    }
                    @media only screen and (min-width: 1920px){

                      .p-datatable-scrollable-view{
                        height: auto;
                        width: 1315px;
                      }
                      .page_body_container {
                        min-height: calc(100vh - 90px) !important;
                      }
                      .footerwidget{
                        position:fixed;
                      }
                    }
                    @media (min-width: 1650px) and (max-width: 1750px) {

                      .p-datatable-scrollable-view{
                        height: auto;
                        width: 1315px;
                      }
                    }
                    @media (min-width: 1450px) and (max-width: 1600px){
                      .p-datatable-scrollable-view{
                        width: 1315px;
                      }
                    }
                    @media only screen and (max-width: 1320px){
                      .p-datatable-scrollable-body {
                        height: calc(100vh - 240px);
                      }
                      .page_body_container{
                        min-height: calc(100vh - 90px) !important;
                      }
                    }
                    @media only screen and (max-width: 1000px){
                      .p-datatable-scrollable-body {
                        height: calc(100vh - 244px);
                      }
                      .page_body_container{
                        min-height: calc(100vh - 106px) !important;
                      }
                      .footerwidget{
                        position:fixed;
                      }
                      .dataTablegridView{
                        width:100vw !important;
                        overflow: auto !important;
                      }
                    }
                    @media (min-width: 1220px) and (max-width: 1250px) {
                      .p-datatable-scrollable-body {
                        height: calc(100vh - 221px);
                      }
                    }
                  `}
                </style>
              </>
            );
          }}
        </LimitedSalesUsersContext.Consumer>
      </LimitedSalesUsersContextProvider>
    );
  }
}
export default LimitedSalesUsers;
