import React, { Fragment, useState, Suspense, useEffect } from "react";
import DeleteImg from "../../../../common/assets/img/delete.gif";
import styles from "./HotelMirrorList.css";
//import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import { UpdateMirror } from "./UpdateMirror";

interface IHotelMirrorListTableProps {
  tableContextType: any;
}
export const HotelMirrorListTable: React.FC<IHotelMirrorListTableProps> = (
  props: IHotelMirrorListTableProps
) => {
  const [showModal, setShowModal] = useState(false);
  const [updateMirrorItemData, setUpdateMirrorItemData] = useState({});

  useEffect(() => {
    document.addEventListener("keydown", openMirrorListModal);
    return () => document.removeEventListener("keydown", openMirrorListModal);
  }, [props.tableContextType.state]);

  const openMirrorListModal = (event) => {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id.includes("hml")) {
        const attr = focusedElem.id.split("-");
        showMirrorListModal(
          Object.assign(
            {
              roomClassSeq:
                props.tableContextType.state.hotelMirrorList[attr[2]]
                  .mirrorRoomClassList[attr[3]].roomClassSeq,
              mirrorType: attr[1],
            },
            props.tableContextType.state.hotelMirrorList[attr[2]]
              .mirrorRoomClassList[attr[3]].mirrorRoomPoolList[attr[4]]
          ),
          props.tableContextType.state.hotelMirrorList[attr[2]]
        );
      }
    }
  };

  const showMirrorListModal = (titleData, hotelData) => {
    setShowModal(!showModal);
    setUpdateMirrorItemData(Object.assign(hotelData, titleData));
  };

  return (
    <Fragment>
      {showModal && (
        <Suspense fallback={<CSuspense />}>
          <UpdateMirror
            itemData={updateMirrorItemData}
            contextType={props.tableContextType}
            cancelMirrorListModal={() => {
              setShowModal(false);
            }}
            showMirrorListModal={showMirrorListModal}
            showModal={showModal}
          />
        </Suspense>
      )}
      <div className={styles.hotelmirrorlisttable}>
        <div>
          <table className={styles.mirrorListTable}>
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  style={{
                    width: "24px",
                    minWidth: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                ></th>
                <th
                  rowSpan={2}
                  style={{
                    width: "70px",
                    minWidth: "70px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  MARSHA
                </th>
                <th
                  rowSpan={2}
                  style={{
                    width: "286px",
                    minWidth: "286px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  rowSpan={2}
                  style={{
                    width: "22px",
                    minWidth: "22px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  #
                </th>
                <th
                  rowSpan={2}
                  style={{
                    width: "50px",
                    minWidth: "50px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Room Pool
                </th>
                <th
                  colSpan={3}
                  style={{
                    width: "346px",
                    minWidth: "346px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Pricing
                </th>
                <th
                  colSpan={3}
                  style={{
                    width: "346px",
                    minWidth: "346px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Restrictions
                </th>
                <th
                  rowSpan={2}
                  style={{
                    width: "194px",
                    minWidth: "194px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Notes
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    width: "191px",
                    minWidth: "191px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Rate Offer
                </th>
                <th
                  style={{
                    width: "97px",
                    minWidth: "97px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Rate Entity #
                </th>
                <th
                  style={{
                    width: "51px",
                    minWidth: "50px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  RPGM
                </th>
                <th
                  style={{
                    width: "191px",
                    minWidth: "191px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Rate Offer
                </th>
                <th
                  style={{
                    width: "97px",
                    minWidth: "97px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Rate Entity #
                </th>
                <th
                  style={{
                    width: "51px",
                    minWidth: "51px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  RPGM
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div
          id="gridView"
          className={styles.tableScroll}
          style={
            props.tableContextType.state.hotelMirrorList?.length <= 0
              ? {}
              : { overflow: "auto" }
          }
        >
          <table
            className={styles.tableListWrap}
            style={
              props.tableContextType.state.hotelMirrorList?.length <= 0
                ? { background: "#f2f2f2" }
                : {}
            }
          >
            {props.tableContextType.isUpdateLoader ? (
              <span>Please wait loading...</span>
            ) : props.tableContextType.state.hotelMirrorList?.length > 0 ? (
              props.tableContextType.state.hotelMirrorList.map(
                (mirrorItem, mirrorItemIndex) => {
                  return (
                    <tbody key={mirrorItemIndex} className={styles.rowTbody}>
                      {mirrorItem.mirrorRoomClassList.map(
                        (roomCls, clIndex) => {
                          return (
                            <Fragment key={clIndex}>
                              {roomCls.mirrorRoomPoolList.map(
                                (roomPool, listIndex) => {
                                  return (
                                    <Fragment key={listIndex}>
                                      <tr
                                        className={
                                          mirrorItemIndex % 2
                                            ? styles.mirrorEvenRow
                                            : styles.mirrorOddRow
                                        }
                                      >
                                        {clIndex === 0 && listIndex != 1 && (
                                          <Fragment>
                                            <td
                                              rowSpan={6}
                                              style={{ width: "21px" }}
                                            >
                                              <img
                                                tabIndex={0}
                                                style={{ cursor: "pointer" }}
                                                src={DeleteImg}
                                                onClick={() => {
                                                  if (
                                                    window.confirm(
                                                      `Are you sure you want to delete the Mirror for hotel ${mirrorItem.marshacode}?`
                                                    )
                                                  ) {
                                                    props.tableContextType.handleDeleteHotelMirror(
                                                      mirrorItem.hotelid
                                                    );
                                                  }
                                                }}
                                              />
                                            </td>
                                            <td
                                              rowSpan={6}
                                              width="68px"
                                              style={{ minWidth: "68px" }}
                                            >
                                              {mirrorItem.marshacode}
                                            </td>
                                            <td
                                              rowSpan={6}
                                              width="284px"
                                              style={{ minWidth: "284px" }}
                                            >
                                              {mirrorItem.hotelName}
                                            </td>
                                          </Fragment>
                                        )}
                                        {listIndex === 0 && (
                                          <td
                                            rowSpan={2}
                                            width="20px"
                                            style={{ minWidth: "20px" }}
                                          >
                                            {roomCls.roomClassSeq}
                                          </td>
                                        )}
                                        <td
                                          width="48px"
                                          style={{ minWidth: "48px" }}
                                        >
                                          {roomPool.roompool}
                                        </td>
                                        <td
                                          width="189px"
                                          style={{ minWidth: "189px" }}
                                        >
                                          <span
                                            id={`hml-P-${mirrorItemIndex}-${clIndex}-${listIndex}`}
                                            tabIndex={0}
                                            className={styles.titleLink}
                                            onClick={() =>
                                              showMirrorListModal(
                                                Object.assign(
                                                  {
                                                    roomClassSeq:
                                                      roomCls.roomClassSeq,
                                                    mirrorType: "P",
                                                  },
                                                  roomPool
                                                ),
                                                mirrorItem
                                              )
                                            }
                                          >
                                            {roomPool.priceRateOfferName}
                                          </span>
                                        </td>
                                        <td width="96px">
                                          {roomPool.priceRateEntityId}
                                        </td>
                                        <td width="49px">
                                          {roomPool.priceRateProgramCode}
                                        </td>
                                        <td width="190px">
                                          <span
                                            id={`hml-R-${mirrorItemIndex}-${clIndex}-${listIndex}`}
                                            tabIndex={0}
                                            className={styles.titleLink}
                                            onClick={() =>
                                              showMirrorListModal(
                                                Object.assign(
                                                  {
                                                    roomClassSeq:
                                                      roomCls.roomClassSeq,
                                                    mirrorType: "R",
                                                  },
                                                  roomPool
                                                ),
                                                mirrorItem
                                              )
                                            }
                                          >
                                            {roomPool.restrictionRateOfferName}
                                          </span>
                                        </td>
                                        <td width="96px">
                                          {roomPool.restrictionRateEntityId}
                                        </td>

                                        <td width="48px">
                                          {roomPool.restrictionRateProgramCode}
                                        </td>
                                        {clIndex === 0 && listIndex != 1 && (
                                          <td rowSpan={6} width="173px">
                                            {mirrorItem.mirror_exception_notes}
                                          </td>
                                        )}
                                      </tr>
                                    </Fragment>
                                  );
                                }
                              )}
                            </Fragment>
                          );
                        }
                      )}
                    </tbody>
                  );
                }
              )
            ) : (
              <span className={styles.emptyData}> No Data Found!!</span>
            )}
          </table>
        </div>
      </div>
    </Fragment>
  );
};
