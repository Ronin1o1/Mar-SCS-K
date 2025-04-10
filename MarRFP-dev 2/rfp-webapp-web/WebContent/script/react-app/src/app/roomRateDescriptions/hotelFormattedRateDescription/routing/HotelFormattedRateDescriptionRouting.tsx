import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../content/HotelRateProductSelect.css";
import Settings from "../static/Settings";
import HotelFormattedTabs from "../content/HotelFormattedTabs";
import HotelRateProductSelectContext from "../context/HotelRateProductSelectContext";

let contextType = null;
let marshaCode;
let hotelName;
let productName;
let productCode;

export function GlobalHeader(props) {
  const history = useHistory();
  const urlParms = useLocation().search;
  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  productName = new URLSearchParams(urlParms).get(Settings.queryId.productName);
  productCode = new URLSearchParams(urlParms).get(Settings.queryId.productCode);

  /**on click of finishAndSave */

  const handleOnClick = (e) => {
    props.setEvent(e);
  };

  const handleFinishSave = (e) => {
    props.setSave(e);
  };
  return (
    <HotelRateProductSelectContext.Consumer>
      {(rateProductContext) => {
        contextType = rateProductContext;
        return (
          <div>
            <HotelFormattedTabs
              onClick={(id) => handleOnClick(id)}
              finishSave={(e) => handleFinishSave(e)}
            />
            <div
              className={
                history.location.pathname.includes(
                  Settings.routingUrl.viewDescription
                ) ||
                history.location.pathname.includes(
                  Settings.routingUrl.modifyDescription
                ) ||
                history.location.pathname.includes(Settings.routingUrl.select)
                  ? styles.tableBody
                  : styles.hiddenField
              }
            >
              {history.location.pathname.includes(
                Settings.routingUrl.viewDescription
              )
                ? `${marshaCode} -
                  ${hotelName}:
                  ${Settings.label.HotelRateViewDescription}`
                : history.location.pathname.includes(
                    Settings.routingUrl.modifyDescription
                  )
                ? `${marshaCode} -
                ${hotelName} - ${Settings.label.ModifyRateViewDesription}`
                : history.location.pathname.includes(Settings.routingUrl.select)
                ? `${Settings.label.HotelSelection}`
                : ""}
            </div>
          </div>
        );
      }}
    </HotelRateProductSelectContext.Consumer>
  );
}
