import React from "react";
import styles from "./Filter.css";

export function FilterPgoosDelete(props) {

    const handleRejectedOnly = (checked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        notAccepted: checked,
      },
    });
  };

  
  const handleHotelsDeleted = (checked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        hotelSaidDelete: checked,
      },
    });
  };

  const handleExcludeGpp = (checked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        excludeGPP: checked,
      },
    });
  };

  return (
    <table className={styles.zeroHeight}>
      <tbody>
        <tr>
          <td>
            <table className={styles.zeroHeight}>
              <tbody>
                <tr>
                  <td>
                    <input
                      id="filterValues.notAccepted"
                      name="filterValues.notAccepted"
                      type="checkbox"
                      checked={props.filterContext.requestPayload.strFilterValues.notAccepted}
                      onChange={(event) => {
                        props.filterContext.setIsDataChange(true);
                        handleRejectedOnly(event.target.checked);
                      }}
                    />{" "}
                    Rejected Only
                  </td>
                </tr>
                {/* </tr>
                <tr> */}
                <tr>
                  <td>
                    <input
                      id="filterValues.hotelSaidDelete"
                      name="filterValues.hotelSaidDelete"
                      type="checkbox"
                      checked={props.filterContext.requestPayload.strFilterValues.hotelSaidDelete}
                      onChange={(event) => {
                        props.filterContext.setIsDataChange(true);
                        handleHotelsDeleted(event.target.checked);
                      }}
                    />{" "}
                    Only Hotels That Said Delete
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="filterValues.excludeGPP"
                      name="filterValues.excludeGPP"
                      type="checkbox"
                      checked={props.filterContext.requestPayload.strFilterValues.excludeGPP}
                      onChange={(event) => {
                        props.filterContext.setIsDataChange(true);
                        handleExcludeGpp(event.target.checked);
                      }}
                    />{" "}
                    Exclude GPP Accounts
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}