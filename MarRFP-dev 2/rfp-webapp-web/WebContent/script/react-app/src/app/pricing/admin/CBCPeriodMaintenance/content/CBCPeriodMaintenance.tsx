import React, { Component, Suspense } from "react";
const EditCBCPeriod = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing.admin.period.cbcperiodmaintenance" */ "./EditCBCPeriod"
    )
);
import CSuspense from "../../../../common/components/CSuspense";
import CBCPeriodMaintenanceContext, {
  CBCPeriodMaintenanceContextProvider,
} from "../context/CBCPeriodMaintenanceContext";
import API from "../service/API";
import Settings from "../static/Settings";
import CDataTable from "../../../../common/components/CDataTable";
import CModal from "../../../../common/components/CModal";
import NewBtnImg from "../../../../common/assets/img/btnNew.gif";
import DeleteImg from "../../../../common/assets/img/delete.gif";
import styles from "./CBCPeriodMaintenance.css";
import ObjectDestructure from "../../../../common/utils/ObjectDestructure";
import Utils from "../../utils/Utils";
import Interceptors from "../../../../common/components/Interceptors";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;
interface IProps {}

interface IState {}

export default class CBCPeriodMaintenance extends Component<IProps, IState> {
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
    contextType.initializeDates();
    contextType.setIsLoading(true);
    API.getCBCPeriodMntcList()
      .then((data) => {
        const filteredArray = data.filter(function (value) {
          return value.dueDates.length > 0;
        });
        const convertedData =
          ObjectDestructure.getConvertedJsonArray(filteredArray);
        Utils.addingFlagToJson(convertedData);
        contextType.updatePeriodMaintenance(convertedData);
        contextType.setIsLoading(false);
      })
      .catch((error) => {
        contextType.setError();
        contextType.setIsLoading(false);
      });
  }

  addimageBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.newAddFlag && (
          <div>
            {rowData.period}
            <img
              tabIndex={0}
              src={NewBtnImg}
              id="NewButton"
              className={styles.newBtnDiv}
              onClick={() => {
                contextType.showModal(rowData.period);
              }}
            />
          </div>
        )}
      </div>
    );
  };

  delimageBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.hasAccounts === Settings.labelForNo && (
          <div>
            {
              <img
                src={DeleteImg}
                className={styles.deleteImgDiv}
                onClick={() => {
                  contextType.deletePeriod(rowData.pricingperiodid);
                }}
              />
            }
          </div>
        )}
      </div>
    );
  };
  addButtonHandler = () => {};
  linkBodyTemplate = (rowData) => {
    return (
      rowData.pricingperiodid && (
        <div>
          {" "}
          <span
            tabIndex={0}
            className={styles.titleLink}
            onClick={() => {
              contextType.showModal(rowData);
            }}
          >
            {rowData.shortDueDate == null ? "" : rowData.shortDueDate}
          </span>
          <span className={styles.longDueDate}>
            {" "}
            {`${rowData.longDueDate == null ? "" : rowData.longDueDate}`}
          </span>
        </div>
      )
    );
  };

  columns = [
    {
      field: Settings.periodMaintenanceList.tableColumns.year.field,
      header: Settings.periodMaintenanceList.tableColumns.year.header,
      body: this.addimageBodyTemplate,
      style: { width: "160px", minWidth: "160px" },
    },
    {
      field: Settings.periodMaintenanceList.tableColumns.id.field,
      body: this.delimageBodyTemplate,
      style: { width: "40px", minWidth: "40px" },
    },
    {
      field: Settings.periodMaintenanceList.tableColumns.duedate.field,
      header: Settings.periodMaintenanceList.tableColumns.duedate.header,
      body: this.linkBodyTemplate,
      style: { width: "220px", minWidth: "220px" },
    },
  ];

  render() {
    return (
      <CBCPeriodMaintenanceContextProvider>
        <CBCPeriodMaintenanceContext.Consumer>
          {(periodListContext) => {
            contextType = periodListContext;
            return (
              <React.Fragment>
                {contextType.isLoading ? (
                  <CLoader></CLoader>
                ) : (
                  <div className={styles.MainContainer}>
                    <div className={styles.CBCListContainer}>
                      <p className={styles.header}>{Settings.pageTitle}</p>
                      <hr className={styles.headerhr} />

                      {
                        <Suspense fallback={<CSuspense />}>
                          <Interceptors spinnerFlag={true} />
                          <div className={styles.dataTable}>
                            <CDataTable
                              id="gridTableView"
                              columns={this.columns}
                              value={
                                contextType.state.periodMaintenanceListData
                                  .periodMaintenanceList
                              }
                              scrollHeight="calc(100vh - 155px)"
                              height="auto"
                              width="433px"
                            />
                          </div>
                        </Suspense>
                      }
                    </div>
                    <style>{`
                    .p-datatable-scrollable-header-box{
                    margin-right:0px !important;
                    } 
                    .p-datatable .p-datatable-thead{
                      position:absolute;
                    }
                    .p-datatable .p-datatable-scrollable-header-box {
                      display:block;
                      height:32px;
                    }
                    .p-datatable .p-datatable-scrollable-body{
                      overflow-x:hidden;
                    }
                    .p-datatable-tbody tr td{
                      height: 14px !important;
                      padding: 2px !important;
                      box-sizing: border-box !important;
                    } 
                    .p-datatable-tbody tr td:nth-child(2){
                      padding: 1.5px !important;
                    }
                    .p-datatable-thead tr th{
                      height:31px;
                      padding: 0 0 0 2px !important;
                      box-sizing: border-box !important;
                    }
                    .p-datatable-scrollable-view{
                      margin-top:-1px;
                    }
                    .p-datatable-thead tr th:first-child{
                      border-left-width:0 !important;
                    }
                  `}</style>
                  </div>
                )}

                <CModal
                  title={Settings.editPeriodMaintenance.title}
                  onClose={contextType.showModal}
                  show={contextType.state.showModal}
                  xPosition={-90}
                  yPosition={-70}
                >
                  <Suspense fallback={<CSuspense />}>
                    {/* <Interceptors spinnerFlag={true} /> */}
                    <EditCBCPeriod />
                  </Suspense>
                </CModal>
              </React.Fragment>
            );
          }}
        </CBCPeriodMaintenanceContext.Consumer>
      </CBCPeriodMaintenanceContextProvider>
    );
  }
}
