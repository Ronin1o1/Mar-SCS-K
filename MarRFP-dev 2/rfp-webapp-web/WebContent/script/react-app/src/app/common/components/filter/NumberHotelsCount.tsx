import React from "react";
import styles from "./Filter.css";

export function NumberHotelsCount(props) {
  const portfolioOrgtextA = "Number Hotels Subset A:";
  const portfolioOrgtextB = "Number Hotels Subset B:";

  const defaultTextA = "Number Hotels:";
  const defaultTextB = "Number Hotels Selected:";

  const textA =
    props.componentName === "portfolioOrganization"
      ? portfolioOrgtextA
      : defaultTextA;
  const textB =
    props.componentName === "portfolioOrganization"
      ? portfolioOrgtextB
      : defaultTextB;

  const renderHotels = () => {
    if (props.componentName == "hotelSolicitation") {
      return props.isMakingRequestAvailList ? "Loading.." : props.numItems || 0;
    } else {
      return props.isMakingRequest ? "Loading.." : props.numItems || 0;
    }
  };
  return (
    <table
      id="tblNumHotels"
      style={{
        width: "100%",
        borderWidth: "0px",
        padding: "2px",
      }}
      width="100%"
    >
      <tbody>
        <tr id="rowNumHotels">
          <td className={styles.field_Name}>{textA}</td>
          <td id="numHotels" className={styles.FilterName}>
            {renderHotels()}
            <input
              type="hidden"
              id="numItems"
              name="numItems"
              value={props.numItems || 0}
            />
          </td>
        </tr>
        {props.componentName == "PortfolioSelection" ||
        props.componentName == "hotelSolicitation" ||
        props.componentName == "PgoosPropagation" ||
        props.componentName == "cbcRequest" ||
        props.componentName == "portfolioOrganization" ||
        props.componentName == "EdieHotelProfileView" ? (
          <tr id="rowNumHotels">
            <td className={styles.field_Name}>{textB}</td>
            <td id="numHotels" className={styles.FilterName}>
              {props.isMakingRequest
                ? "Loading.."
                : props.numItemsSelected || 0}
              <input
                type="hidden"
                id="numItemsSelected"
                name="numItemsSelected"
                value={props.numItemsSelected || 0}
              />
            </td>
          </tr>
        ) : (
          ""
        )}
      </tbody>
    </table>
  );
}
