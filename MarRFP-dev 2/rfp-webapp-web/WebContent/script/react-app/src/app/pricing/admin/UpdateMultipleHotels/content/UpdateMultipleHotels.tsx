import React from "react";
import { UpdateMultipleHotelsContextProvider } from "../context/UpdateMultipleHotelsContextProvider";
import { UpdateMutipleHotelsContent } from "./UpdateMultipleHotelsContent";

export function UpdateMultipleHotels() {
  return (
    <UpdateMultipleHotelsContextProvider>
      <UpdateMutipleHotelsContent />
    </UpdateMultipleHotelsContextProvider>
  );
}
