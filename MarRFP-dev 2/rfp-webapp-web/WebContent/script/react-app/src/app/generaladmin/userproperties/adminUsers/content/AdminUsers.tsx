import React, { useEffect } from "react";
import CDataTable from "../../../../common/components/CDataTable";
//import CModal from "../../../../common/components/CModal";
import { CPagination } from "../../../../common/components/CPagination";
import btnSave from "../../../../common/assets/img/button/btnSave.gif";
import AdminUsersSearchFilter from "../../../common/components/adminUsersSearchFilter/AdminUsersSearchFilter";
import Settings from "../static/Settings";
import AdminUsersContext, {
  AdminUsersContextProvider,
} from "../context/AdminUsersContext";
import styles from "./AdminUsers.css";
//import spinnerImg from "../../../../common/assets/img/loading-buffering.gif";
import { CLoader } from "../../../../common/components/CLoader";
let adminUsersContextType = null;
import { useHistory } from "react-router-dom";
const AdminUsers = () => {
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("resize", setGridSize);
    setGridSize();
    return () => {
      window.removeEventListener("resize", setGridSize);
    };
  });

  const setGridSize = () => {
    const element = document.querySelector(".p-datatable") as HTMLElement;
    if (element && element != undefined) {
      element.style.width =
        (document.documentElement.clientWidth - 5).toString() + "px";

      const bodyElement = document.querySelector(
        ".p-datatable-scrollable-body"
      ) as HTMLElement;
      if (bodyElement && bodyElement != undefined) {
        if (document.documentElement.clientWidth < 1165) {
          bodyElement.classList.remove("p-datatable-scrollable-body");
          bodyElement.style["overflowX"] = "scroll";
          bodyElement.style["overflowY"] = "auto";
          bodyElement.style.maxHeight = "calc(100vh - 210px)";
          bodyElement.style.position = "relative";
        } else {
          bodyElement.classList.add("p-datatable-scrollable-body");
        }
      }
    }
  };

  const stateProvinceTemplate = (rowData) => {
    return rowData.cn_state && rowData.cn_country ? (
      <span>{`${rowData.cn_state}/${rowData.cn_country}`}</span>
    ) : rowData.cn_state || rowData.cn_country ? (
      <span>{`${rowData.cn_state}${rowData.cn_country}`}</span>
    ) : null;
  };

  const internalNotesTemplate = (rowData) => {
    return (
      <textarea
        className={styles.internalNotes}
        value={rowData.user_internalnotes || ""}
        onChange={(e) => adminUsersContextType.setInternalText(e, rowData.eid)}
        onBlur={(e) =>
          adminUsersContextType.validateInternalText(e, rowData.eid, 100)
        }
        onKeyPress={(e) =>
          adminUsersContextType.validateInternalText(e, rowData.eid, 100)
        }
      />
    );
  };
  const columns = [
    {
      field: Settings.gridDetails.columns.eid.field,
      header: Settings.gridDetails.columns.eid.header,
      style: { width: "60px", height: "26.3333px" },
    },
    {
      field: Settings.gridDetails.columns.lname.field,
      header: Settings.gridDetails.columns.lname.header,
      style: { width: "90px", height: "26.3333px" },
    },
    {
      field: Settings.gridDetails.columns.fname.field,
      header: Settings.gridDetails.columns.fname.header,
      style: { width: "90px", height: "26.3333px" },
    },
    {
      field: Settings.gridDetails.columns.city.field,
      header: Settings.gridDetails.columns.city.header,
      style: { width: "90px", height: "26.3333px" },
    },
    {
      field: Settings.gridDetails.columns.stateprovince.field,
      header:
        Settings.gridDetails.columns.stateprovince.header1 +
        "</br>" +
        Settings.gridDetails.columns.stateprovince.header2,
      body: stateProvinceTemplate,
      style: {
        width: "90px",
        minWidth: "90px",
        height: "26.3333px",
      },
    },
    {
      field: Settings.gridDetails.columns.phoneno.field,
      header: Settings.gridDetails.columns.phoneno.header,
      style: { width: "100px", height: "26.3333px" },
    },
    {
      field: Settings.gridDetails.columns.email.field,
      header: Settings.gridDetails.columns.email.header,
      style: { width: "300px", height: "26.3333px" },
    },
    {
      field: Settings.gridDetails.columns.internalNotes.field,
      header: Settings.gridDetails.columns.internalNotes.header,
      body: internalNotesTemplate,
      style: { width: "283px", height: "25px" },
    },
  ];

  const handlePaginationAPI = (pageNumber: number) => {
    adminUsersContextType.setPageNumber(pageNumber);
    adminUsersContextType.setPostData({
      ...adminUsersContextType.postData,
      userSearchCriteria: {
        ...adminUsersContextType.postData.userSearchCriteria,
        page: pageNumber,
      },
    });
    adminUsersContextType.onClickSearch(pageNumber);
  };

  return (
    <AdminUsersContextProvider key={history.location.key}>
      <AdminUsersContext.Consumer>
        {(AdminUsersContext) => {
          adminUsersContextType = AdminUsersContext;
          return (
            <>
              {adminUsersContextType.totalPages != 0 && (
                <div>
                  <table className={styles.adminUserTable}>
                    <tbody>
                      <tr>
                        <td>
                          <span
                            className={styles.header}
                          >{`${Settings.labels.PageHeader} ${adminUsersContextType.userRoleDescription}`}</span>
                        </td>
                      </tr>
                      <tr className={styles.blankRow}>
                        <td></td>
                      </tr>
                      <tr className={styles.horizontalLine}></tr>
                      <tr>
                        <td className={styles.searchFilter}>
                          <AdminUsersSearchFilter
                            context={adminUsersContextType}
                          />

                          <div className={styles.pagination}>
                            <CPagination
                              totalPages={adminUsersContextType.totalPages}
                              context={adminUsersContextType}
                              handlePaginationAPI={handlePaginationAPI}
                              goToPageWidth={"28px"}
                              tableCustomStyles={{ marginBottom: "-7px" }}
                              resetInput={adminUsersContextType.resetInput}
                            />
                            <div className={styles.saveBtn}>
                              <a href="javascript:void(0);">
                                <img
                                  src={btnSave}
                                  onClick={() =>
                                    adminUsersContextType.saveAdminUsersGridData()
                                  }
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <CDataTable
                    id="adminUsersGrid"
                    columns={columns}
                    reloadTable={!adminUsersContextType.isLoaded}
                    value={adminUsersContextType.adminUsersData}
                    emptyMessage={Settings.gridDetails.NoDataMessage}
                    scrollHeight="calc(100vh - 198px)"
                    marginLeft="0px"
                  />
                </div>
              )}

              {!adminUsersContextType.isLoaded && <CLoader></CLoader>}
              <style>{`
              .container{
                min-width:770px;
              }
              .dataTablegridView{
                width:100%;
                overflow: auto !important;
              }
              .p-datatable{
                width:calc(100vw - 5px);
              }
                .p-datatable-scrollable-body{
                  overflow-y: auto !important;
                  overflow-x:auto !important;
                }
                .p-datatable .p-datatable-tbody > tr {
                  height: 27.3333px !important;
                  padding-bottom: 0 !important;
                  padding-top: 0px !important;
                }
                .p-datatable .p-datatable-tbody > tr > td{
                  height: 26.3333px !important;
                  padding-top: 0px !important;
                  padding-bottom: 0 !important;
                }
                @media only screen and (min-width: 1920px){
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 215px) !important;
                  }
                  .p-datatable-scrollable-view{
                    width:1162px;
                  }
                  .page_body_container {
                    min-height: calc(100vh - 90px) !important;
                  }
                  .footerwidget{
                    position:fixed;
                  }
                }
                @media (min-width: 1400px) and (max-width: 1750px) {

                  .p-datatable-scrollable-view{
                    width: 1162px;
                  }
                }
                
                @media only screen and (max-width: 1162px){
                  
                .p-datatable-thead th:nth-child(5){
                  padding-right:0 !important;
                  padding-left:0 !important;
                }
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 230px) !important;
                  }
                  .footerwidget{
                    position:fixed;
                  }
                }
                @media only screen and (max-width: 770px){
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 235px) !important;
                  }
                  .page_body_container{
                    min-height: calc(100vh - 106px) !important;
                  }
                }
              `}</style>
            </>
          );
        }}
      </AdminUsersContext.Consumer>
    </AdminUsersContextProvider>
  );
};
export default AdminUsers;
