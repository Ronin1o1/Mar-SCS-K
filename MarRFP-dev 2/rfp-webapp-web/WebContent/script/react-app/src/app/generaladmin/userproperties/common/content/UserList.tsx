import React, { FC, useEffect } from "react";
import CDataTable from "../../../../common/components/CDataTable";
import { CPagination } from "../../../../common/components/CPagination";
import AdminUsersSearchFilter from "../../../common/components/adminUsersSearchFilter/AdminUsersSearchFilter";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
import UserListContext, {
  UserListContextProvider,
} from "../context/UserListContext";
import styles from "./UserList.css";
import screenLoader from "../../../../common/assets/img/screenloader.gif";

interface IUserList {
  userRole: string;
}

let userListContextType = null;

const UserList: FC<IUserList> = (props): JSX.Element => {
  useEffect(() => {
    window.addEventListener("resize", setGridSize);
    return () => {
      window.removeEventListener("resize", setGridSize);
    };
  });
  const setGridSize = () => {
    const element = document.querySelector(".p-datatable") as HTMLElement;
    if (element && element != undefined) {
      element.style.width = "calc(100vw - 5)";
      const bodyElement = document.querySelector(
        ".p-datatable-scrollable-body"
      ) as HTMLElement;
      if (bodyElement && bodyElement != undefined) {
        if (document.documentElement.clientWidth < 1536) {
          bodyElement.classList.remove("p-datatable-scrollable-body");
          bodyElement.style["overflowY"] = "auto";
          bodyElement.style["overflowX"] = "scroll";
          bodyElement.style.maxHeight = "calc(100vh - 215px)";
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

  const columns = [
    {
      field: Settings.gridDetails.columns.eid.field,
      header: Settings.gridDetails.columns.eid.header,
      style: {
        width: "60px",
        minWidth: "60px",
        whiteSpace: "nowrap",
      },
    },
    {
      field: Settings.gridDetails.columns.lname.field,
      header: Settings.gridDetails.columns.lname.header,
      style: {
        width: "90px",
        minWidth: "90px",
      },
    },
    {
      field: Settings.gridDetails.columns.fname.field,
      header: Settings.gridDetails.columns.fname.header,
      style: {
        width: "90px",
        minWidth: "90px",
      },
    },
    {
      field: Settings.gridDetails.columns.city.field,
      header: Settings.gridDetails.columns.city.header,
      style: {
        width: "90px",
        minWidth: "90px",
        whiteSpace: "nowrap",
      },
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
        whiteSpace: "nowrap",
        paddingRight: "0 !important",
      },
    },
    {
      field: Settings.gridDetails.columns.phoneno.field,
      header: Settings.gridDetails.columns.phoneno.header,
      style: {
        width: "100px",
        minWidth: "100px",
        whiteSpace: "nowrap",
      },
    },
    {
      field: Settings.gridDetails.columns.email.field,
      header: Settings.gridDetails.columns.email.header,
      style: {
        width: "300px",
        minWidth: "300px",
        whiteSpace: "nowrap",
      },
    },
  ];
  const history = useHistory();
  const handlePaginationAPI = (pageNumber: number) => {
    userListContextType.setPageNumber(pageNumber);
    userListContextType.setPostData({
      ...userListContextType.postData,
      userSearchCriteria: {
        ...userListContextType.postData.userSearchCriteria,
        page: pageNumber,
      },
    });
    userListContextType.onClickSearch(pageNumber);
  };

  return (
    <UserListContextProvider
      userRole={props.userRole}
      key={history?.location.key}
    >
      <UserListContext.Consumer>
        {(UserListContextType) => {
          userListContextType = UserListContextType;
          return (
            <>
              {userListContextType.totalPages != -1 && (
                <div>
                  <table className={styles.adminUserTable}>
                    <tbody>
                      <tr>
                        <td colSpan={3}>
                          <span className={styles.header}>
                            {`${Settings.labels.PageHeader} ${userListContextType.userRoleDescription}`}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <div className={styles.horizontalLine}></div>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.searchFilter}>
                          <AdminUsersSearchFilter
                            context={userListContextType}
                          />
                        </td>
                        <td className={styles.pagination}>
                          <CPagination
                            totalPages={userListContextType.totalPages}
                            context={userListContextType}
                            handlePaginationAPI={handlePaginationAPI}
                            resetInput={userListContextType.resetInput}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {userListContextType.isLoading ? (
                <img
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "45%",
                  }}
                  src={screenLoader}
                />
              ) : (
                <CDataTable
                  id="userListGrid"
                  columns={columns}
                  value={userListContextType.userList}
                  reloadTable={!userListContextType.isLoaded}
                  emptyMessage={Settings.gridDetails.NoDataMessage}
                  marginLeft="0px"
                />
              )}
              <style>{`
              .container{
                min-width:682px;
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
                  height: calc(100vh - 211px)
                }
                .p-column-title {
                  white-space:normal;
                }
                .p-datatable .p-datatable-tbody > tr {
                  height: 14px !important;
                }
                .p-datatable-tbody tr td{
                  height: 14px !important;
                  padding: 0 !important;
                }
                .p-datatable-tbody tr td{
                  height: 14px !important;
                  padding: 0 !important;
                }
                @media only screen and (min-width: 1920px){
                  .p-datatable-scrollable-body{
                    height: calc(100vh - 220px);
                  }
                  .page_body_container{
                    min-height: calc(100vh - 90px) !important;
                  }
                  .footerwidget{
                    position:fixed;
                  }
                  .p-datatable-scrollable-view{
                    width: 860px;
                  }
                }
                @media (min-width: 1200px) and (max-width: 1750px) {

                  .p-datatable-scrollable-view{
                    width: 860px;
                  }
                }

                @media only screen and (max-width: 1400px){
                  .page_body_container{
                    min-height: calc(100vh - 90px) !important;
                  }
                  .footerwidget{
                    position:fixed;
                  }
                }
                @media only screen and (max-width: 860px){
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 210px);
                  }
                  .page_body_container{
                    min-height: calc(100vh - 106px) !important;
                  }
                  .dataTablegridView{
                    width: 100% !important;
                    overflow:auto;
                  }
                  .p-datatable-thead th:nth-child(5){
                    padding-right:0 !important;
                    padding-left:1px !important;
                  }
                }
              `}</style>
            </>
          );
        }}
      </UserListContext.Consumer>
    </UserListContextProvider>
  );
};
export default UserList;
