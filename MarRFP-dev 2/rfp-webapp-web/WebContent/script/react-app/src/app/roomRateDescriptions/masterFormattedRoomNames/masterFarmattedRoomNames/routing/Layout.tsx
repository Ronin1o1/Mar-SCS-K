import React from "react";
import { GlobalHeader } from "../routing/masterFormatedRoomNamesRouting";

export function Layout(props: any) {
  return (
    <>
      <GlobalHeader />
      {props.children}
    </>
  );
}
