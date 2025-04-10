import React from "react";
import { GlobalHeader } from "./BrandFormattedRateDescRouting";

export const Layout = (props) => {
  return (
    <>
      <GlobalHeader
        context={props.context}
        productName={props.productName}
        screenId={props.screenid}
        rateProductMenu={props.menuData}
      />
      {props.children}
    </>
  );
};
