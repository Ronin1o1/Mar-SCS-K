import React, { useEffect, useState } from "react";
import Utils from "../../utils/Utils";
import styles from "./Filter.css";

export function PgoosTypeFilter(props: any) {
  const [showPeriodFilter, setPeriodFilter] = useState(false);
  const [showMcbFilter, setMcbFilter] = useState(true);
  const [showPgoosType, setPgoosType] = useState(true);
  const [sendVrp, setSendVrp] = useState({});

  const [filterValuesCheckBoxes, setFilterValuesCheckBoxes] = useState({
    sendVrpe: false,
    sendVrpx: false,
    sendProd: false,
    sendVrpa: true,
  });

  useEffect(() => {
    const showOptions = props.showOptions?.pfo?.showOptions;
    setSendVrp({ sendVrpa: "A" });
    if (showOptions?.showPgoosFilter) {
      const modifiedStrValues = Object.assign(
        props.filterContext.requestPayload.strFilterValues,
        {
          pgoosType: "M",
          deleteMCB: "N",
          byYear: "N",
        }
      );
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: modifiedStrValues,
      });
      runPgoos("M");
    }
    (document.getElementById("reportProgram") as HTMLElement).style.display =
      "none";
  }, [props.showOptions]);
  const runPgoos = (pgoosType) => {
    let currValue = pgoosType;
    if (pgoosType === "M") {
      if (
        Utils.getElementTye("filterValues.sendVrpe")?.checked &&
        Utils.getElementTye("filterValues.sendVrpx")?.checked
      ) {
        currValue = "D";
      } else if (
        Utils.getElementTye("filterValues.sendVrpx")?.checked &&
        Utils.getElementTye("filterValues.sendProd")?.checked
      ) {
        currValue = "C";
      } else if (
        Utils.getElementTye("filterValues.sendVrpe")?.checked &&
        Utils.getElementTye("filterValues.sendProd")?.checked
      ) {
        currValue = "F";
      } else if (Utils.getElementTye("filterValues.sendVrpe")?.checked) {
        currValue = "E";
      } else if (Utils.getElementTye("filterValues.sendVrpx")?.checked) {
        currValue = "Z";
      } else if (Utils.getElementTye("filterValues.sendProd")?.checked) {
        currValue = "P";
      } else if (Utils.getElementTye("filterValues.sendVrpa")?.checked) {
        currValue = "M";
      }
    }

    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        pgoosType: currValue,
      },
    });
  };

  const handleAllCheckBoxes = (sendVrpe, sendVrpx, sendProd) => {
    console.log(props.filterContext?.aerType);
    runPgoos("M");
    if (
      (sendVrpe && sendVrpx && sendProd) ||
      (sendVrpe && sendProd && props.filterContext?.aerType === "AER_N")
    ) {
      setFilterValuesCheckBoxes({
        sendVrpe: false,
        sendVrpx: false,
        sendProd: false,
        sendVrpa: true,
      });
    } else {
      setFilterValuesCheckBoxes({
        ...filterValuesCheckBoxes,
        sendVrpe,
        sendVrpx,
        sendProd,
        sendVrpa: false,
      });
    }
  };
  return (
    <div id="accountFilter" style={{ display: "" }}>
      <table className={styles.menuWdth100Height}>
        <tbody>
          <div id="jpcdiv" style={{ display: "blocked" }}>
            <table
              style={{ width: "100%", border: "0px"}}
              className="pogofield_Name"
            >
              <tr>
                <td>
                  <input
                    style={{ verticalAlign: "center" }}
                    id="filterValues.pgoosType"
                    name="filterValues.pgoosType"
                    type="radio"
                    value="M"
                    defaultChecked
                    onChange={(event) => {
                      props.deleteAPIUpdate(
                        props.filterContext.requestPayload,
                        { deleteMCB: "N", pgoosType: "M" }
                      );
                      props.filterContext.setIsDataChange(true);
                      setPgoosType(true);
                      setMcbFilter(true);
                      setPeriodFilter(false);
                      props.filterContext.setPgoosTypesFilter(
                        event.target.value
                      );
                      (
                        document.getElementById("reportProgram") as HTMLElement
                      ).style.display = "none";
                      runPgoos("M");

                      (
                        document.getElementById(
                          "selectedGridView"
                        ) as HTMLDivElement
                      ).style.width = "560px";
                      (
                        document.getElementById(
                          "gridTableHeader"
                        ) as HTMLDivElement
                      ).style.width = "560px";
                      (
                        document.getElementById(
                          "gridViewSelectedGrid"
                        ) as HTMLDivElement
                      ).style.width = "560px";
                    }}
                  />
                  <label>RunMCB</label>
                </td>
                <td>
                  <input
                    style={{ verticalAlign: "center" }}
                    id="filterValues.pgoosType"
                    name="filterValues.pgoosType"
                    type="radio"
                    value="R"
                    onChange={(event) => {
                      props.deleteAPIUpdate(
                        props.filterContext.requestPayload,
                        { deleteMCB: "Y", pgoosType: "R" }
                      );
                      props.filterContext.setIsDataChange(true);
                      setPgoosType(true);
                      setMcbFilter(false);
                      setPeriodFilter(true);
                      runPgoos("R");
                      props.filterContext.setPgoosTypesFilter(
                        event.target.value
                      );
                      (
                        document.getElementById("reportProgram") as HTMLElement
                      ).style.display = "table-cell";
                      (
                        document.getElementById(
                          "selectedGridView"
                        ) as HTMLDivElement
                      ).style.width = "680px";
                      (
                        document.getElementById(
                          "gridTableHeader"
                        ) as HTMLDivElement
                      ).style.width = "680px";
                      (
                        document.getElementById(
                          "gridViewSelectedGrid"
                        ) as HTMLDivElement
                      ).style.width = "680px";

                      props.filterContext.setRequestPayload({
                        ...props.filterContext.requestPayload,
                        strFilterValues: {
                          ...props.filterContext.requestPayload.strFilterValues,
                          pgoosType: "R",
                          deleteMCB: "N",
                        },
                      });
                      props.filterContext.setPgoosTypesFilter(
                        event.target.value
                      );
                    }}
                  />
                  <label>Relinquish</label>
                </td>
                <td>
                  <input
                    style={{ verticalAlign: "center" }}
                    id="filterValues.pgoosType"
                    name="filterValues.pgoosType"
                    type="radio"
                    value="K"
                    onBlur={() => runPgoos("K")}
                    onChange={(event) => {
                      props.filterContext.setIsDataChange(true);
                      setPgoosType(false);
                      setMcbFilter(false);
                      setPeriodFilter(false);
                      runPgoos("K");
                      (
                        document.getElementById("reportProgram") as HTMLElement
                      ).style.display = "table-cell";
                      props.filterContext.setPgoosTypesFilter(
                        event.target.value
                      );
                      props.deleteAPIUpdate(
                        props.filterContext.requestPayload,
                        { deleteMCB: "Y", pgoosType: "K" }
                      );
                      (
                        document.getElementById(
                          "selectedGridView"
                        ) as HTMLDivElement
                      ).style.width = "680px";
                      (
                        document.getElementById(
                          "gridTableHeader"
                        ) as HTMLDivElement
                      ).style.width = "680px";
                      (
                        document.getElementById(
                          "gridViewSelectedGrid"
                        ) as HTMLDivElement
                      ).style.width = "680px";
                    }}
                  />
                  <label>Kill</label>
                </td>
              </tr>
              <tr>
                {showMcbFilter && props.numItemsSelected > 0 && (
                  <a
                    style={{ display: "block" }}
                    onClick={() =>
                      props.getbatchId(
                        props.filterContext.requestPayload,
                        Object.assign({
                          pgoosType: "M",
                          byAccountorByRPGM: (document.querySelector(
                            'input[name="filterValues.byAccountorByRPGM"]:checked'
                          ) as HTMLInputElement)
                            ? (
                              document.querySelector(
                                'input[name="filterValues.byAccountorByRPGM"]:checked'
                              ) as HTMLInputElement
                            ).value
                            : "A",
                        }),
                        sendVrp,
                        true
                      )
                    }
                  >
                    <b>RunMCB</b>
                  </a>
                )}
                {showPeriodFilter && props.numItemsSelected > 0 && (
                  <a
                    style={{ display: "block" }}
                    onClick={() =>
                      props.getbatchId(
                        props.filterContext.requestPayload,
                        Object.assign({
                          pgoosType: "R",
                          byAccountorByRPGM: (
                            document.querySelector(
                              'input[name="filterValues.byAccountorByRPGM"]:checked'
                            ) as HTMLInputElement
                          ).value,
                        }),
                        sendVrp
                      )
                    }
                  >
                    <b>Relinquish</b>
                  </a>
                )}
                {!showPeriodFilter &&
                  !showMcbFilter &&
                  props.numItemsSelected > 0 && (
                    <a
                      style={{ display: "block" }}
                      onClick={() =>
                        props.getbatchId(
                          props.filterContext.requestPayload,
                          Object.assign({
                            pgoosType: "K",
                            byAccountorByRPGM: (
                              document.querySelector(
                                'input[name="filterValues.byAccountorByRPGM"]:checked'
                              ) as HTMLInputElement
                            ).value,
                          }),
                          sendVrp
                        )
                      }
                    >
                      <b>Kill</b>
                    </a>
                  )}
              </tr>
            </table>
          </div>
        </tbody>
      </table>
      {showPgoosType && (
        <table
          className={styles.menuWdth100Height}
          style={{ borderTop: "thin groove" }}
        >
          <tbody>
            <tr>
              <td>
                <table>
                  {showPeriodFilter && (
                    <tr>
                      <td>
                        <div id="byPeriodFilter" style={{ display: "block" }}>
                          <table
                            style={{ width: "120%" }}
                            className="field_Name"
                          >
                            <tr>
                              <td>
                                <input
                                  id="filterValues.byYear"
                                  name="filterValues.byYear"
                                  type="radio"
                                  value="N"
                                  defaultChecked
                                  onChange={(event) => {
                                    props.filterContext.setIsDataChange(true);
                                    props.filterContext.setRequestPayload({
                                      ...props.filterContext.requestPayload,
                                      strFilterValues: {
                                        ...props.filterContext.requestPayload
                                          .strFilterValues,
                                        byYear: event.target.value,
                                        pgoosType: "R",
                                        deleteMCB: "N",
                                      },
                                    });
                                  }}
                                />
                                <label>Relinquish Unlimited</label>
                              </td>
                              <td>
                                <input
                                  id="filterValues.byYear"
                                  name="filterValues.byYear"
                                  type="radio"
                                  value="Y"
                                  onChange={(event) => {
                                    props.filterContext.setIsDataChange(true);
                                    props.filterContext.setRequestPayload({
                                      ...props.filterContext.requestPayload,
                                      strFilterValues: {
                                        ...props.filterContext.requestPayload
                                          .strFilterValues,
                                        byYear: event.target.value,
                                        pgoosType: "R",
                                        deleteMCB: "N",
                                      },
                                    });
                                  }}
                                />
                                <label> Relinquish by Period </label>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}

                  {showMcbFilter && (
                    <div id="runMcbFilter" style={{ display: "block" }}>
                      <table style={{ width: "150%" }} className="field_Name">
                        <tr>
                          <td>
                            <input
                              id="filterValues.sendVrpa"
                              name="filterValues.sendVrpa"
                              type="checkbox"
                              value="A"
                              checked={filterValuesCheckBoxes.sendVrpa}
                              onChange={(event) => {
                                props.filterContext.setIsDataChange(true);
                                !filterValuesCheckBoxes.sendVrpa &&
                                  setFilterValuesCheckBoxes({
                                    ...filterValuesCheckBoxes,
                                    sendVrpe: false,
                                    sendVrpx: false,
                                    sendProd: false,
                                    sendVrpa: true,
                                  });
                                setSendVrp({ sendVrpa: "A" });
                                runPgoos("M");
                              }}
                            />
                            <label>All</label>
                          </td>
                          <td>
                            <input
                              id="filterValues.sendVrpe"
                              name="filterValues.sendVrpe"
                              type="checkbox"
                              value="E"
                              checked={filterValuesCheckBoxes.sendVrpe}
                              onChange={(event) => {
                                props.filterContext.setIsDataChange(true);
                                setSendVrp({ sendVrpe: "E" });
                                handleAllCheckBoxes(
                                  event.target.checked,
                                  filterValuesCheckBoxes.sendVrpx,
                                  filterValuesCheckBoxes.sendProd
                                );
                              }}
                            />
                            <label>Rates</label>
                          </td>
                          {props.filterContext?.aerType !== "AER_N" && (
                            <td>
                              <div
                                id="releaseFilter"
                                style={{ display: "block" }}
                              >
                                <input
                                  id="filterValues.sendVrpx"
                                  name="filterValues.sendVrpx"
                                  type="checkbox"
                                  value="X"
                                  checked={filterValuesCheckBoxes.sendVrpx}
                                  onChange={(event) => {
                                    props.filterContext.setIsDataChange(true);
                                    setSendVrp({ sendVrpx: "X" });
                                    handleAllCheckBoxes(
                                      filterValuesCheckBoxes.sendVrpe,
                                      event.target.checked,
                                      filterValuesCheckBoxes.sendProd
                                    );
                                  }}
                                />
                                <label>Kill(Logic)</label>
                              </div>
                            </td>
                          )}
                          <td>
                            <span>
                              <input
                                id="filterValues.sendProd"
                                name="filterValues.sendProd"
                                type="checkbox"
                                value="P"
                                checked={filterValuesCheckBoxes.sendProd}
                                onChange={(event) => {
                                  props.filterContext.setIsDataChange(true);
                                  setSendVrp({ sendProd: "P" });
                                  handleAllCheckBoxes(
                                    filterValuesCheckBoxes.sendVrpe,
                                    filterValuesCheckBoxes.sendVrpx,
                                    event.target.checked
                                  );
                                }}
                              />
                              <label> Amenities </label>
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  )}
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
