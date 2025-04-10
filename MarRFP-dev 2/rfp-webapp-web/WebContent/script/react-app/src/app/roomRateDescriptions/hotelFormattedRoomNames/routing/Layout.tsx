import React from "react";
import { GlobalHeader } from "./SelectFormattedRoomNamesRouting";

export function Layout(props: any) {
  return (
    <>
      <GlobalHeader />
      {props.children}
    </>
  );
}
