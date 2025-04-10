import React from "react";
import { GlobalHeader } from "./hotelPriceRouting";
import { useLocation } from "react-router-dom";

export function Layout(props: any) {
  const urlParms = useLocation().search;
  const isUpdateHotel = new URLSearchParams(urlParms).get("isUpdateHotel");

  return (
    <>
      {!isUpdateHotel && (
        <GlobalHeader
          hideInfo={props.hideInfo}
          hideButtons={props.hideButtons}
          nextBtnClick={props.nextBtnClick}
        />
      )}
      {props.children}
    </>
  );
}
