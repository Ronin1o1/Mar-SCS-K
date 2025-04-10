import React, { Component, Suspense } from "react";
const EditPeriod = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing.admin.period.periodmaintenance" */ "./EditPeriod"
    )
);
import CSuspense from "../../../../common/components/CSuspense";
import PeriodaintenanceContext, {
  PeriodMaintenanceContextProvider,
} from "../context/PeriodMaintenanceContext";
import API from "../service/API";
import Settings from "../static/Settings";
import CDataTable from "../../../../common/components/CDataTable";
import CModal from "../../../../common/components/CModal";
import NewBtnImg from "../../../../common/assets/img/btnNew.gif";
import DeleteImg from "../../../../common/assets/img/delete.gif";
import styles from "./PeriodMaintenance.css";
import ObjectDestructure from "../../../../common/utils/ObjectDestructure";
import Utils from "../../utils/Utils";
import CSelect from "../../../../common/components/CSelect";
import Interceptors from "../../../../common/components/Interceptors";
import CPageTitle from "../../../../common/components/CPageTitle";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;

interface IProps {}

interface IState {}

export default class PeriodMaintenance extends Component<IProps, IState> {
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
    API.getPricingPeriod().then((data) => {
      const filteredArray = data.filter(function (value) {
        return value.dueDates.length > 0;
      });
      const convertedData =
        ObjectDestructure.getConvertedJsonArray(filteredArray);
      Utils.addingFlagToJson(convertedData);
      contextType.updatePeriodMaintenance(convertedData);
      contextType.setIsLoading(false);
    });
    document.addEventListener("keydown", this.openDueDateModal);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.openDueDateModal);
  }

  openDueDateModal = (event) => {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("periodmain")) {
        const rowData =
          contextType.state.periodMaintenanceListData.periodMaintenanceList.filter(
            (item) => item.pricingperiodid == focusedElem.id.split("-")[1]
          )[0];
        contextType.showModal(rowData);
      }
    }
  };

  addimageBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.newAddFlag && (
          <div>
            {rowData.period}
            <img
              tabIndex={0}
              src={NewBtnImg}
              className={styles.newBtnDiv}
              id="NewButton"
              onClick={() => {
                contextType.showModal(rowData.period);
              }}
            />
          </div>
        )}
      </div>
    );
  };

  dropdownBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.newAddFlag && (
          <div style={{ width: "40px" }}>
            <CSelect
              ddnOptions={Settings.periodMaintenanceList.yesNoList}
              keyField={
                Settings.periodMaintenanceList.accountViewableoptions.key
              }
              valField={
                Settings.periodMaintenanceList.accountViewableoptions.value
              }
              onChange={(e) => contextType.updateHotelView(rowData, event)}
              selectedValue={rowData.selectedHotelView}
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
            id={`periodmain-${rowData.pricingperiodid}`}
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
      field: Settings.periodMaintenanceList.tableColumns.accviewable.field,
      header: Settings.periodMaintenanceList.tableColumns.accviewable.header,
      body: this.dropdownBodyTemplate,
      style: { width: "115px", minWidth: "115px" },
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
      <PeriodMaintenanceContextProvider>
        <PeriodaintenanceContext.Consumer>
          {(periodListContext) => {
            contextType = periodListContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <React.Fragment>
                <CPageTitle title={Settings.pageTitle}></CPageTitle>
                <div className={styles.MainContainer}>
                  <div className={styles.PeriodListContainer}>
                    {
                      <Suspense fallback={<CSuspense />}>
                        <Interceptors spinnerFlag={true} />
                        <div style={{ marginLeft: "10px" }}>
                          <CDataTable
                            id="gridTableView"
                            columns={this.columns}
                            value={
                              contextType.state.periodMaintenanceListData
                                .periodMaintenanceList
                            }
                            scrollHeight="calc(100vh - 160px)"
                            height="auto"
                            width="547px"
                            emptyMessage=" "
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
                    .p-datatable .p-datatable-scrollable-header-box .p-datatable-thead > tr > th{
                      box-sizing: border-box !important;
                    }
                    .p-datatable .p-datatable-scrollable-body{
                      overflow-x:hidden;
                    }
                    .p-datatable-thead tr th{
                      height:31px;
                      padding: 0 0 0 2px !important;
                    }
                    .p-datatable-scrollable-view{
                      margin-top:-1px;
                    }
                    .p-datatable-tbody tr td{
                      padding: 0 0 0 2px !important;
                    }
                    .p-datatable-tbody tr td:nth-child(2){
                      padding-left: 1.5px !important;
                    }
                    .p-datatable-thead tr th:first-child{
                      border-left-width:0 !important;
                    }
                  `}</style>
                </div>
                <CModal
                  title={Settings.editPeriodMaintenance.title}
                  onClose={contextType.showModal}
                  show={contextType.state.showModal}
                  xPosition={-90}
                  yPosition={-70}
                >
                  <Suspense fallback={<CSuspense />}>
                    {/* <Interceptors spinnerFlag={true} /> */}
                    <EditPeriod />
                  </Suspense>
                </CModal>
              </React.Fragment>
            );
          }}
        </PeriodaintenanceContext.Consumer>
      </PeriodMaintenanceContextProvider>
    );
  }
}
