import React from "react";
import styles from "./Filter.css";

export function ManagedFranchisedFilter(props) {
  // const [managedFranchisedChecked, setManagedFranchisedChecked] = useState({
  //   managed: true,
  //   franchised: true,
  // });

  const handleRequestforManaged = (checked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        managed: checked,
      },
    });
  };

  
  const handleRequestforFranchised = (checked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        franchised: checked,
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
                      id="filterValues.managed"
                      name="filterValues.managed"
                      type="checkbox"
                      checked={props.filterContext.requestPayload.strFilterValues.managed}
                      onChange={(event) => {
                        props.filterContext.setIsDataChange(true);
                        handleRequestforManaged(event.target.checked);
                      }}
                    />{" "}
                    Managed
                  </td>
                {/* </tr>
                <tr> */}
                  <td style={{paddingLeft: "60px"}}>
                    <input
                      id="filterValues.franchised"
                      name="filterValues.franchised"
                      type="checkbox"
                      checked={props.filterContext.requestPayload.strFilterValues.franchised}
                      onChange={(event) => {
                        props.filterContext.setIsDataChange(true);
                        handleRequestforFranchised(event.target.checked);
                      }}
                    />{" "}
                    Franchised
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