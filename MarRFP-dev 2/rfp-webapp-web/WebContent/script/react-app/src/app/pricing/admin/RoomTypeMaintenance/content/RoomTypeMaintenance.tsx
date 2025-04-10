import React, { Component, Suspense } from "react";
import Settings from "../static/Settings";
import DeleteImg from "../../../../common/assets/img/delete.gif";
import styles from "./RoomTypeMaintenance.css";
import API from "../service/API";
import EditRoomTypeMaintenance from "./EditRoomTypeMaintenance";
import RoomTypeMaintenanceContext, {
  RoomTypeMaintenanceContextProvider,
} from "../context/RoomTypeMaintenanceContext";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import CDataTable from "../../../../common/components/CDataTable";
import NewBtnImg from "../../../../common/assets/img/btnNew.gif";
import screenLoader from "../../../../common/assets/img/screenloader.gif";

let contextType = null;
interface IProps {}

interface IState {}

export default class RoomTypeMaintenance extends Component<IProps, IState> {
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
    contextType.setLoader(true);
    API.getRoomTyMntcList().then((data) => {
      contextType.setLoader(false);
      contextType.setRoomTypeListData(data);
    });
    document.addEventListener("keydown", this.showRoomTypeModal);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.showRoomTypeModal);
  }

  showRoomTypeModal(event) {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("rtm")) {
        const attr = focusedElem.id.split("-");
        contextType.showModal(
          contextType.state.roomTypeMaintenanceListData.roomTypeMaintenanceList.filter(
            (item) => item.promo_roomtypeid == attr[1]
          )[0]
        );
      }
    }
  }

  linkRoomtype = (rowData) => {
    return (
      <>
        <span
          id={`rtm-${rowData.promo_roomtypeid}`}
          tabIndex={0}
          className={styles.titleLink}
          onClick={() => {
            contextType.showModal(rowData);
          }}
        >
          {rowData.roomtype}
        </span>
      </>
    );
  };

  linkRoomtypeView = (rowData) => {
    return (
      <>
        <span>
          {rowData.roomtype_view ==
          Settings.roomTypeMaintenanceList.yesNoList[0].shortValue
            ? Settings.roomTypeMaintenanceList.yesNoList[0].description
            : Settings.roomTypeMaintenanceList.yesNoList[1].description}
        </span>
      </>
    );
  };

  delimageBodyTemplate = (rowData) => {
    return rowData.used == "N" ? (
      <div
        className={styles.deleteImgDiv}
        onClick={() => {
          contextType.deleteRoomType(rowData.promo_roomtypeid);
        }}
      >
        {<img src={DeleteImg} className={styles.paddingit} />}
      </div>
    ) : (
      " "
    );
  };

  columns = [
    {
      field: Settings.roomTypeMaintenanceList.tableColumns.id.field,
      body: this.delimageBodyTemplate,
      style: { width: "40px" },
    },
    {
      field: Settings.roomTypeMaintenanceList.tableColumns.roomTypeName.field,
      header: Settings.roomTypeMaintenanceList.tableColumns.roomTypeName.header,
      body: this.linkRoomtype,
      style: { width: "300px" },
    },
    {
      field:
        Settings.roomTypeMaintenanceList.tableColumns.viewableByHotels.field,
      header:
        Settings.roomTypeMaintenanceList.tableColumns.viewableByHotels.header,
      body: this.linkRoomtypeView,
      style: { width: "60px", textAlign: "center" },
    },
  ];

  render() {
    return (
      <RoomTypeMaintenanceContextProvider>
        <RoomTypeMaintenanceContext.Consumer>
          {(roomTypeListContext) => {
            contextType = roomTypeListContext;
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
                      <div className={styles.roomTypeHeader}>
                        {Settings.labels.pageHeading}
                      </div>
                      <div className={styles.RoomTypeContainer}>
                        <div style={{ height: "21px" }}>
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
                            contextType.closeShowValidateRoomType(true)
                          }
                          show={contextType.state.showValidateRoomType}
                          xPosition={-100}
                          yPosition={-120}
                          closeImgTitle={"OK - Close Message Box"}
                          class="customModal"
                        >
                          <div style={{ width: "240px", padding: "9px 12px" }}>
                            {Settings.alertMessage}
                          </div>
                        </CModal>
                        <CModal
                          title={Settings.editRoomTypeMaintenanceList.title}
                          onClose={contextType.showModal}
                          show={contextType.state.showModal}
                          xPosition={-150}
                          yPosition={-150}
                          class={"editroomtype"}
                        >
                          <Suspense fallback={<CSuspense />}>
                            <EditRoomTypeMaintenance />
                          </Suspense>
                        </CModal>
                        {
                          <div style={{ marginLeft: "10px" }}>
                            <CDataTable
                              id="gridTableView"
                              columns={this.columns}
                              value={
                                contextType.state.roomTypeMaintenanceListData
                                  .roomTypeMaintenanceList
                              }
                              height="auto"
                              width="420px"
                            />
                          </div>
                        }
                      </div>
                      <style>
                        {`

                      .p-datatable-scrollable-body{

                        height: calc(100vh - 185px);

                        overflow-x: hidden;

                      }
                      .p-datatable .p-datatable-thead > tr > th{
                        border-top: 0 !important;
                      }

                      `}
                      </style>
                    </div>
                    <style>
                      {`.editroomtype{
                          width: 347px !important;
                        }
                        .editroomtype input{
                          width: 222px;
                        }`}
                    </style>
                  </React.Fragment>
                )}
              </>
            );
          }}
        </RoomTypeMaintenanceContext.Consumer>
      </RoomTypeMaintenanceContextProvider>
    );
  }
}
