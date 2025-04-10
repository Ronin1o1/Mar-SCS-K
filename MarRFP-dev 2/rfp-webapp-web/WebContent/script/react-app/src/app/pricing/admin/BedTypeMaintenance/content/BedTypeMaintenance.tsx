import DeleteImg from "../../../../common/assets/img/delete.gif";
import CModal from "../../../../common/components/CModal";
import React, { Component, Suspense } from "react";
import BedTypeMaintenanceContext, {
  BedTypeMaintenanceContextProvider,
} from "./../context/BedTypeMaintenanceContext";
import API from "../service/API";
import Settings from "../static/Settings";
import styles from "./BedTypeMaintenance.css";
import CDataTable from "../../../../common/components/CDataTable";
import EditBedTypeMaintenance from "./EditBedTypeMaintenance";
import NewBtnImg from "../../../../common/assets/img/btnNew.gif";
import CSuspense from "../../../../common/components/CSuspense";
import screenLoader from "../../../../common/assets/img/screenloader.gif";

let contextType = null;

interface IProps {}

interface IState {}

export default class BedTypeMaintenance extends Component<IProps, IState> {
  state = { windowHeight: 0, windowWidth: 0 };

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
    window.addEventListener("resize", this.getWindowDimensions);
    contextType.setLoader(true);
    API.getBedTypeMntcList().then((data) => {
      contextType.setLoader(false);
      contextType.setBedTypeListData(data);
    });
    document.addEventListener("keydown", this.showBedTypeModal);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWindowDimensions);
    document.removeEventListener("keydown", this.showBedTypeModal);
  }

  showBedTypeModal(event) {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("btm")) {
        const attr = focusedElem.id.split("-");
        contextType.showModal(
          contextType.state.bedTypeMaintenanceListData.bedTypeMaintenanceList.filter(
            (item) => item.bedtypeid == attr[1]
          )[0]
        );
      }
    }
  }

  getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({ width: width, height: height - 200 });
  };

  delimageBodyTemplate = (rowData) => {
    return rowData.used == "N" ? (
      <div
        className={styles.deleteImgDiv}
        onClick={() => {
          contextType.deleteBedType(rowData.bedtypeid);
        }}
      >
        {<img src={DeleteImg} className={styles.paddingIt} />}
      </div>
    ) : (
      " "
    );
  };

  linkBedtypeId = (rowData) => {
    return (
      <>
        <span>{rowData.bedtypeid}</span>
      </>
    );
  };

  linkbedtype = (rowData) => {
    return (
      <>
        <span
          id={`btm-${rowData.bedtypeid}`}
          tabIndex={0}
          className={styles.titleLink}
          onClick={() => {
            contextType.showModal(rowData);
          }}
        >
          {rowData.bedtype}
        </span>
      </>
    );
  };

  linkBedtypeView = (rowData) => {
    return (
      <>
        <span className={styles.yesNoList}>
          {rowData.bedtype_view ==
          Settings.bedTypeMaintenanceList.yesNoList[0].shortValue
            ? Settings.bedTypeMaintenanceList.yesNoList[0].description
            : Settings.bedTypeMaintenanceList.yesNoList[1].description}
        </span>
      </>
    );
  };

  columns = [
    {
      field: Settings.bedTypeMaintenanceList.tableColumns.id.field,
      body: this.delimageBodyTemplate,
      style: { width: "44px" },
    },
    {
      field: Settings.bedTypeMaintenanceList.tableColumns.bedTypeName.field,
      header: Settings.bedTypeMaintenanceList.tableColumns.bedTypeName.header,
      body: this.linkbedtype,
      style: { width: "300px" },
    },
    {
      field:
        Settings.bedTypeMaintenanceList.tableColumns.viewableByHotels.field,
      header:
        Settings.bedTypeMaintenanceList.tableColumns.viewableByHotels.header,
      body: this.linkBedtypeView,
      style: { width: "84px", textAlign: "center", borderRight: "0" },
    },
  ];

  render() {
    return (
      <BedTypeMaintenanceContextProvider>
        <BedTypeMaintenanceContext.Consumer>
          {(periodListContext) => {
            contextType = periodListContext;

            return (
              <>
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
                  <React.Fragment>
                    <div className={styles.MainContainer}>
                      <div className={styles.BedTypeContainer}>
                        <p className={styles.header}>{Settings.pageTitle}</p>
                        <hr className={styles.headerhr} />
                        <div className={styles.newButton}>
                          <img
                            tabIndex={0}
                            className={styles.BtnNew}
                            onClick={() => {
                              contextType.showModal();
                            }}
                            src={NewBtnImg}
                            id="NewButton"
                          />
                        </div>
                        <CModal
                          title="Alert Message"
                          onClose={(e) =>
                            contextType.closeShowValidateBedType(true)
                          }
                          show={contextType.state.showValidateBedType}
                          xPosition={-100}
                          yPosition={-120}
                          closeImgTitle={"OK - Close Message Box"}
                          class="customModal"
                        >
                          <div style={{ width: "235px", padding: "9px 12px" }}>
                            {Settings.alertMessage}
                          </div>
                        </CModal>
                        <CModal
                          title={Settings.editBedTypeMaintenanceList.title}
                          onClose={contextType.showModal}
                          show={contextType.state.showModal}
                          xPosition={-175}
                          yPosition={-75}
                          class={"editbedtype"}
                        >
                          <Suspense fallback={<CSuspense />}>
                            <EditBedTypeMaintenance />
                          </Suspense>
                        </CModal>
                        {
                          <div className={styles.bedtypeTable}>
                            <CDataTable
                              id="gridTableView"
                              columns={this.columns}
                              value={
                                contextType.state.bedTypeMaintenanceListData
                                  .bedTypeMaintenanceList
                              }
                              scrollHeight="calc(100vh - 185px)"
                              height="calc(100vh - 150px)"
                              width="430px"
                            />
                          </div>
                        }
                      </div>
                    </div>
                    <style>
                      {`
                      .p-datatable-scrollable-body{
                        overflow-x: hidden;
                        margin-bottom:2rem;
                      }
                      .p-datatable-thead th:nth-child(3){
                        text-align : left !important
                      }
                      .editbedtype{
                        width: 350px !important;
                      }
                      .editbedtype input{
                        width: 222px;
                        height:14.8px;
                        border:1px solid #6e6e6e;
                        border-radius: 1.5px;
                      }
                      .editbedtype select{
                        border:1px solid #6e6e6e;
                        border-radius: 1.5px;
                      }
                    `}
                    </style>
                  </React.Fragment>
                )}
              </>
            );
          }}
        </BedTypeMaintenanceContext.Consumer>
      </BedTypeMaintenanceContextProvider>
    );
  }
}
