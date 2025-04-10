import React, { Suspense, useEffect, useRef } from "react";
import styles from "./RoomDescription.css";
import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../context/RoomDescriptionContext";
import DeleteImg from "../../../../../common/assets/img/button/delete.gif";
import BtnView from "../../../../../common/assets/img/button/btnViewSmall.gif";
import API from "../service/API";
import { Link } from "react-router-dom";
import Settings from "../static/Settings";
import CDataTable from "../../../../../common/components/CDataTable";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import { useHistory, useLocation } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

let contextType = null;
const RoomDescription = (props): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const mounted = useRef();

  useEffect(() => {
    API.getRoomData()
      .then((data) => {
        contextType.setChannels(data);
      })
      .catch((error) => {
        contextType.state.showTableLoader = false;
      });
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        props.history.push("/temp");
        props.history.goBack();
      }
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", onViewBtnClick);
    return () => {
      removeEventListener("keydown", onViewBtnClick);
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
    };
  }, [contextType?.state?.entry]);

  const onViewBtnClick = (event) => {
    if (event.keyCode === 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("dispRule")) {
        const viewRowId = focusedElem.id.split("-")[1];
        const viewRowData = contextType.state.entry.filter(
          (item) => item.code == viewRowId
        )[0];
        if (viewRowData) {
          contextType.viewLang(viewRowData, history);
        }
      }
    }
  };

  function imageBodyTemplate(rowData) {
    const channelName = contextType.state.selectedChannel
      ? contextType.state.selectedChannel.trim()
      : "";
    return (
      <React.Fragment>
        <img
          src={DeleteImg}
          className={styles.deleteContainer}
          onClick={() => {
            contextType.deleteLang(rowData.name + "_" + rowData.code);

            if (
              confirm(
                "Are you sure that you want to delete the rules for " +
                  channelName +
                  " / " +
                  rowData.name +
                  "?"
              )
            ) {
              <Link to={"/formattedRoom"}></Link>;
            } else {
              // cancel click do nothing
            }
          }}
          alt={"deleteIcon"}
        />
      </React.Fragment>
    );
  }
  function viewButtonTemplate(rowData) {
    return (
      <div tabIndex={0} id={`dispRule-${rowData.code}`}>
        <img
          src={BtnView}
          className={styles.deleteContainer}
          onClick={() => {
            contextType.viewLang(rowData, history);
          }}
          alt={"viewBtn"}
        />
      </div>
    );
  }

  const columns = [
    {
      field: "populated",
      body: imageBodyTemplate,
      style: { width: "20px", height: "10px" },
    },
    {
      field: "name",
      header: "Entry",
      style: { width: "200px", height: "10px" },
    },
    {
      field: "code",
      body: viewButtonTemplate,
      style: { width: "40px", height: "10px" },
    },
  ];

  return (
    <RoomDescriptionContextProvider>
      <RoomDescriptionContext.Consumer>
        {(roomdescriptioncontext) => {
          contextType = roomdescriptioncontext;
          return (
            <form name="thisForm" id="thisForm">
              <table className={styles.section}>
                <tbody>
                  <tr>
                    <td className={styles.header}>
                      {Settings.roomDescriptionTitles.pageTitle}
                    </td>
                  </tr>
                  <tr className={styles.headerHR}>
                    <td valign="top" style={{ height: "2px" }}></td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <table className={styles.zero_Height}>
                        <tbody>
                          <tr>
                            <td className={styles.field_Name}>
                              {Settings.roomDescriptionTable.title}
                              <select
                                value={contextType.channel}
                                onChange={() => {
                                  contextType.onSelect(
                                    contextType.state.departureValue,
                                    event
                                  );
                                }}
                              >
                                <option value={styles.show}>
                                  {
                                    Settings.roomDescriptionTitles
                                      .pleaseSelectaChannel
                                  }
                                </option>
                                {contextType.state.roomData.map((data) => (
                                  <option
                                    key={data}
                                    value={
                                      data.code +
                                      "_" +
                                      data.number +
                                      "_" +
                                      data.name
                                    }
                                  >
                                    {data.name}
                                  </option>
                                ))}
                              </select>
                              {contextType.state.langLoader && (
                                <div className={styles.loadingMessage}>
                                  {" "}
                                  {Settings.roomDescriptionTitles.loading}
                                </div>
                              )}
                              {!contextType.state.langLoader && (
                                <div
                                  className={contextType.state.departureValue}
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {contextType.state.entry && (
                                    <CDataTable
                                      id="gridTableView"
                                      columns={columns}
                                      value={contextType.state.entry}
                                      componentGridName="gridTableViewRD"
                                      width="288px"
                                    />
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <CModal
                show={contextType.state.showModal}
                onClose={contextType.onShowModal}
                xPosition={Settings.modalXPosition}
                yPosition={Settings.modalYPosition}
              >
                <Suspense fallback={<CSuspense />}>
                  <div className={styles.modalContent}>
                    {contextType.state.validationMessage}
                  </div>
                </Suspense>
              </CModal>
              <style>
                {`
                .p-datatable .p-datatable-tbody > tr > td {
                  padding: 0px  !important;
                }
               
                  
                `}
              </style>
            </form>
          );
        }}
      </RoomDescriptionContext.Consumer>
    </RoomDescriptionContextProvider>
  );
};

export default RoomDescription;
