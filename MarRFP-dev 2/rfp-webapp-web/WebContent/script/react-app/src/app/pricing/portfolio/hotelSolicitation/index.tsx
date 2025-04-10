import React from "react";

import { HotelSolicitation } from "./content/HotelSolicitation";
import { HotelSolicitationContextProvider } from "./context/HotelSolicitationContext";

const HotelSolicitationWrapper = () => {
  return (
    <HotelSolicitationContextProvider>
      <HotelSolicitation />
    </HotelSolicitationContextProvider>
  );
};

export default HotelSolicitationWrapper;
