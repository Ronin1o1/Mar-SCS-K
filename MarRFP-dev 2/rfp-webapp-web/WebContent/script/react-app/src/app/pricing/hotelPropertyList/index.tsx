import React from "react";

import { PropertyList } from "./content/PropertyList";
import { PropertyListContextProvider } from "./context/PropertyListContext";

const HotelPropertyListWrapper: React.FC = () => {
  return (
    <PropertyListContextProvider>
      <PropertyList />
    </PropertyListContextProvider>
  );
};
export default HotelPropertyListWrapper;
