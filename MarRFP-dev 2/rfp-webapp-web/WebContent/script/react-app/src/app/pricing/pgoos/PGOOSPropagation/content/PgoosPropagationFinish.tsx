import React, { useEffect } from "react";
import styles from "./PGOOSPropagation.css";
import TerminateBtnImg from "../../../../common/assets/img/button/btnTerminateBatch.gif";
import LoadingDoggie from "../../../../common/assets/img/doggie0.gif";
//import { useHistory } from "react-router-dom";

export function PgoosPropagationFinish(props: any) {
  //const history = useHistory();

  useEffect(() => {
    if (props.pgoosRunPropagationData?.pgoosLoad?.batchid) {
      window.history.replaceState(
        null,
        null,
        "?batchId=" + props.pgoosRunPropagationData?.pgoosLoad?.batchid
      );
    }
  }, [props.pgoosRunPropagationData?.pgoosLoad?.batchid]);
  return (
    <table className="full-height">
      <tbody>
        <tr>
          <td>
            <tr>
              <td className={styles.header}>Status of Pgoos Load</td>
            </tr>
            <tr>
              <td style={{ height: "20px" }}> </td>
            </tr>
            <tr>
              <td className={styles.Field_Name}>
                <b style={{ color: "#ff0000" }}>
                  PGOOS Status: <>&nbsp;</>
                  <>&nbsp;</>
                </b>
                {props.pgoosRunPropagationData?.pgoosLoad?.status}
              </td>
            </tr>
            <tr>
              <td style={{ height: "10px" }}> </td>
            </tr>
            <tr>
              <td className={styles.Field_Name}>
                <b style={{ color: "#ff0000" }}>
                  PGOOS Loaded By: <>&nbsp;</>
                  <>&nbsp;</>
                </b>
                {props.pgoosRunPropagationData?.pgoosLoad?.username}
              </td>
            </tr>
          </td>
        </tr>

        <tr>
          {props?.pgoosRunPropagationData?.filterValues?.pgoosStatus ==
            null && (
            <td>
              <div id="reset">
                <table
                  className="zero-Height"
                  style={{ width: "500px", height: "50%" }}
                >
                  <tr>
                    <td style={{ height: "10px" }}> </td>
                  </tr>
                  <tr>
                    <td
                      className={styles.Field_Name}
                      style={{ color: "#ff0000" }}
                    >
                      <b>
                        Would you like to terminate the process or reset the
                        batch?
                      </b>
                    </td>
                    <td style={{ width: "135px" }}>
                      <img
                        id="retrievebtn"
                        className="btnSubmit"
                        src={TerminateBtnImg}
                        style={{ width: "135px", height: "23px" }}
                        onClick={() =>
                          props.getResetPgoosBatch(
                            props.pgoosRunPropagationData?.pgoosLoad?.batchid
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "20px" }}> </td>
                  </tr>
                  <tr style={{ height: "100%" }}>
                    <td valign="middle">
                      <img
                        style={{ width: "200px", height: "35px" }}
                        src={LoadingDoggie}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          )}
        </tr>

        <tr>
          <td>
            {(props?.pgoosRunPropagationData?.filterValues?.pgoosStatus ==
              "P" ||
              props?.pgoosRunPropagationData?.filterValues?.pgoosStatus ==
                "H" ||
              props?.pgoosRunPropagationData?.filterValues?.pgoosStatus ==
                "K" ||
              props?.pgoosRunPropagationData?.filterValues?.pgoosStatus ==
                "R") && (
              <div id="displaylog">
                <table style={{ width: "500px" }}>
                  <tr>
                    <td style={{ width: "225px", height: "15px" }}>
                      <tr>
                        <td className={styles.header}>
                          PGOOS Propagate Completion Summary{" "}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ height: "20px" }} />
                      </tr>

                      {(props?.pgoosRunPropagationData?.filterValues
                        ?.pgoosStatus == "P" ||
                        props?.pgoosRunPropagationData?.filterValues
                          ?.pgoosStatus == "H") && (
                        <>
                          <tr>
                            <td
                              className={styles.Field_Name}
                              style={{ color: "#ff0000" }}
                            >
                              <b>Verify And Account Product Processing:</b>
                            </td>
                            <td>
                              <b style={{ color: "#ff0000" }}>
                                {" "}
                                100 % Completed
                              </b>
                            </td>{" "}
                          </tr>
                          <tr>
                            <td style={{ height: "10px" }}> </td>
                          </tr>
                          <tr>
                            <td
                              className={styles.Field_Name}
                              style={{ color: "#ff0000" }}
                            >
                              <b>Hotel Product Processing:</b>
                            </td>
                            <td>
                              <b style={{ color: "#ff0000" }}>
                                {Math.round(
                                  ((props.pgoosRunPropagationData?.totalCount -
                                    props.pgoosRunPropagationData?.prodCount) /
                                    props.pgoosRunPropagationData?.totalCount) *
                                    100
                                )}
                                % Completed
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ height: "10px" }}> </td>
                          </tr>
                        </>
                      )}

                      <tr>
                        <td className={styles.Field_Name}>
                          <b style={{ color: "#ff0000" }}>Rates Processing:</b>
                        </td>
                        <td>
                          <b style={{ color: "#ff0000" }}>
                            {
                              //props.pgoosRunPropagationData?.totalCount -
                              Math.round(
                                (props.pgoosRunPropagationData?.progressCount /
                                  props.pgoosRunPropagationData?.totalCount) *
                                  100
                              )
                            }{" "}
                            % Completed
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ height: "20px" }}></td>
                      </tr>
                      <tr style={{ height: "100%" }}>
                        <td style={{ verticalAlign: "middle" }}>
                          <img
                            src={LoadingDoggie}
                            style={{ width: "200px", height: "35px" }}
                          />
                        </td>
                      </tr>
                    </td>
                  </tr>
                </table>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
