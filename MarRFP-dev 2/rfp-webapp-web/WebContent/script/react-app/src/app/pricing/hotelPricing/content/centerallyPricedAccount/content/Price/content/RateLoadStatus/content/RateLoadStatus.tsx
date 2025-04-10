import React, { useState, useEffect } from "react";
import styles from "./RateLoadStatus.css";
import "regenerator-runtime/runtime";
import "core-js/stable";

const statusDecode = {
  FAIL: "Error",
  CMPL: "Pending",
  UNPB: "Pending",
  PUBL: "Success",
  VRPE: "Load",
  VRPX: "Unprotect",
  VRPK: "Delete",
};
function RateLoadStatus(props) {
  const [rateLoadStatusData, setRateLoadStatusData] = useState({});
  const [initialload, setInitialload] = useState("");
  const [rateOfferName, setRateOfferName] = useState("");

  useEffect(() => {
    if (!!props.rateLoadStatus) {
      const groupedRateLoadStatusData = groupBy(
        props.rateLoadStatus,
        "sequence"
      );
      setRateLoadStatusData(groupedRateLoadStatusData);
      setInitialload(props.initialload);
      setRateOfferName(props.rateOfferName);
    }
  }, [props.rateLoadStatus]);

  const groupBy = (objectArray, property) => {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const decodeMarshacmd = (latestStatus) => {
    return latestStatus && latestStatus.marshacmd
      ? statusDecode[latestStatus.marshacmd]
      : "NA";
  };
  return (
    <div>
      <table className={styles.rateStatusTblePD}>
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", paddingTop: "5px" }} width="100px">
              Rate Offer Name:
            </td>
            <td style={{ paddingTop: "5px" }}>{rateOfferName}</td>
          </tr>
          <tr>
            <td
              style={{ fontWeight: "bold", paddingBottom: "10px" }}
              width="100px"
            >
              Initial Load:
            </td>
            <td style={{ paddingBottom: "10px" }}>{initialload}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <table
                style={{ border: "1px solid #CCC", borderCollapse: "collapse" }}
              >
                <tbody>
                  <tr
                    className={styles.gridHeader}
                    style={{ backgroundColor: "#eff0ec" }}
                  >
                    <td
                      className={styles.pgoosstablestatusDetails}
                      width="50px"
                      align="center"
                    >
                      Room Pool Group
                    </td>
                    <td
                      className={styles.pgoosstablestatusDetails}
                      width="50px"
                      align="center"
                    >
                      RPGM
                    </td>
                    <td
                      className={styles.pgoosstablestatusDetails}
                      width="60px"
                      align="center"
                    >
                      Rate Entity
                    </td>
                    <td
                      className={styles.pgoosstablestatusDetails}
                      width="100px"
                      align="center"
                    >
                      Latest Load
                    </td>
                    <td
                      className={styles.pgoosstablestatusDetails}
                      width="120px"
                      align="center"
                    >
                      Latest Command
                    </td>
                    <td
                      className={styles.pgoosstablestatusDetails}
                      width="160px"
                      align="center"
                    >
                      Status
                    </td>
                  </tr>
                  {Object.keys(rateLoadStatusData).map((key) => {
                    return rateLoadStatusData[key].map((record, index) => {
                      return index === 0 ? (
                        <tr>
                          <td
                            rowSpan={rateLoadStatusData[key].length}
                            className={styles.pgoosStatusPopupRC}
                            align="center"
                          >
                            {key}
                          </td>
                          <td
                            className={
                              record.latestStatus &&
                              record.latestStatus.status === "FAIL"
                                ? (styles.pgoosStatusPopupRPGM,
                                  styles.statusDetails)
                                : styles.pgoosStatusPopupRPGM
                            }
                            align="center"
                          >
                            {record.rateprog}
                          </td>
                          <td
                            className={styles.pgoosstablestatusDetails}
                            width="60px"
                            align="center"
                          >
                            {record.rateentity}
                          </td>
                          <td
                            className={styles.pgoosstablestatusDetails}
                            width="120px"
                            align="center"
                          >
                            {record.latestStatus === null
                              ? ""
                              : record.latestStatus.loadDate}
                          </td>
                          <td
                            className={styles.pgoosstablestatusDetails}
                            width="100px"
                            align="center"
                          >
                            {decodeMarshacmd(record.latestStatus)}
                          </td>
                          {record.latestStatus &&
                          record.latestStatus.status === "FAIL" ? (
                            <td
                              className={
                                (styles.pgoosstablestatusDetails,
                                styles.statusDetails)
                              }
                              width="160px"
                              align="center"
                            >
                              {record.latestStatus === null
                                ? ""
                                : record.latestStatus.errorDesc
                                ? record.latestStatus.errorDesc
                                    .map((desc) => `${desc}`)
                                    .join("\n")
                                : "test2"}
                            </td>
                          ) : (
                            <td
                              className={styles.pgoosstablestatusDetails}
                              width="160px"
                              align="center"
                            >
                              {record.latestStatus === null
                                ? ""
                                : record.latestStatus.statusdesc}
                            </td>
                          )}
                        </tr>
                      ) : (
                        <tr>
                          <td
                            className={
                              record.latestStatus &&
                              record.latestStatus.status === "FAIL"
                                ? (styles.pgoosStatusPopupRPGM,
                                  styles.statusDetails)
                                : styles.pgoosStatusPopupRPGM
                            }
                            align="center"
                          >
                            {record.rateprog}
                          </td>
                          <td
                            className={styles.pgoosstablestatusDetails}
                            width="60px"
                            align="center"
                          >
                            {record.rateentity}
                          </td>
                          <td
                            className={styles.pgoosstablestatusDetails}
                            width="120px"
                            align="center"
                          >
                            {record.latestStatus === null
                              ? ""
                              : record.latestStatus.loadDate}
                          </td>
                          <td
                            className={styles.pgoosstablestatusDetails}
                            width="100px"
                            align="center"
                          >
                            {decodeMarshacmd(record.latestStatus)}
                          </td>
                          {record.latestStatus &&
                          record.latestStatus.status === "FAIL" ? (
                            <td
                              className={
                                (styles.pgoosstablestatusDetails,
                                styles.statusDetails)
                              }
                              width="160px"
                              align="center"
                            >
                              {record.latestStatus === null
                                ? ""
                                : record.latestStatus.errorDesc
                                ? record.latestStatus.errorDesc
                                    .map((desc) => `${desc}`)
                                    .join("\n")
                                : "test2"}
                            </td>
                          ) : (
                            <td
                              className={styles.pgoosstablestatusDetails}
                              width="160px"
                              align="center"
                            >
                              {record.latestStatus === null
                                ? ""
                                : record.latestStatus.statusdesc}
                            </td>
                          )}
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default RateLoadStatus;
