import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Filter.css";
import { FilterPgoosDelete } from "./FilterPgoosDelete";
import FilterContext from "./context/FilterContext";

export function FilterAccountrateProgram(props) {
  const [showSpecRtpgm, setShowSpecRtpgm] = useState(false);
  const [showAccountList, setShowAccountList] = useState(true);
  const context = useContext(FilterContext);

  useEffect(() => {
    if (
      props.filterContext.pgoosTypesFilter === "R" ||
      props.filterContext.pgoosTypesFilter === "K"
    ) {
      props.setCheckedBoxes([]);
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          stringRPGMList: "",
        },
      });
      // setShowSpecRtpgm(true)
      // setShowAccountList(false)
    }
  }, [props.filterContext.pgoosTypesFilter]);

  useEffect(() => {
    props.setCheckedBoxes([]);
  }, [props.filterContext?.strFilterValues?.accountFilter]);

  const handleChangeCheckBoxes = (event) => {
    if (!event.target.checked) {
      const objIndex = props.checkedBoxes.findIndex(
        (item) => item === event.target.value
      );
      props.checkedBoxes.splice(objIndex, 1);
      props.setCheckedBoxes([...props.checkedBoxes]);
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          stringRPGMList: [...props.checkedBoxes].toString(),
        },
      });
    } else {
      props.checkedBoxes.push(event.target.value);
      props.setCheckedBoxes([...props.checkedBoxes]);
      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          stringRPGMList: [...props.checkedBoxes].toString(),
        },
      });
    }
  };

  return (
    <table className={styles.zeroHeight}>
      <tbody>
        <tr>
          <td>
            <table
              className={`${styles.menuWdth100Height} ${styles.field_Name}`}
              style={{
                width: "150% !important",
                marginTop: "5px",
                marginBottom: "3px",
              }}
            >
              <tbody>
                <tr>
                  {props.filterContext.pgoosTypesFilter !== "M" && (
                    <Fragment>
                      <td
                        className={styles.field_Name}
                        style={{ paddingRight: "1em" }}
                      >
                        By:
                      </td>
                      <td id="cr" style={{ paddingRight: "2em" }}>
                        <input
                          id="filterValues.byAccountorByRPGM"
                          name="filterValues.byAccountorByRPGM"
                          type="radio"
                          defaultValue="A"
                          className={styles.margin3}
                          value="A"
                          defaultChecked
                          checked={showAccountList}
                          onChange={(event) => {
                            setShowSpecRtpgm(false);
                            setShowAccountList(true);
                            props.filterContext.setIsShowSpecRtpgm(false);
                          }}
                        />
                        <label>Account</label>
                      </td>{" "}
                    </Fragment>
                  )}
                  <td id="rr">
                    {props.filterContext.pgoosTypesFilter !== "M" && (
                      <Fragment>
                        <input
                          id="filterValues.byAccountorByRPGM"
                          name="filterValues.byAccountorByRPGM"
                          type="radio"
                          value="R"
                          defaultValue="R"
                          className={styles.margin3}
                          checked={showSpecRtpgm}
                          onChange={(event) => {
                            setShowSpecRtpgm(true);
                            setShowAccountList(false);
                            props.filterContext.getRateProgramList();
                            props.filterContext.setIsShowSpecRtpgm(true);
                          }}
                        />
                        <label>Specific Rate Program</label>
                      </Fragment>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
      {showAccountList && props.filterContext.pgoosTypesFilter !== "M" && (
        <tbody>
          <tr>
            <FilterPgoosDelete
              {...props}
              filterContext={props.filterContext}
            ></FilterPgoosDelete>
          </tr>
        </tbody>
      )}
      {showSpecRtpgm && (
        <tbody>
          <tr>
            <label>Rate Offer/RPGM</label>
          </tr>
          <tr>
            {props.filterContext.rateProgramListData?.map((item) => {
              return (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      onChange={handleChangeCheckBoxes}
                      value={item.rateProg}
                      checked={
                        props.checkedBoxes.length > 0 &&
                        props.checkedBoxes?.some((rateCheckBoxes) => {
                          return rateCheckBoxes === item.rateProg;
                        })
                      }
                    ></input>
                    {item.rateOfferName}-{item.rateProg}
                    {item.is_aer_rpgm === "Y" ? " (GPP)" : ""}
                  </td>
                </tr>
              );
            })}
          </tr>
        </tbody>
      )}
    </table>
  );
}
