import React from "react";
import CityMarketsContainer from "./content/cityMarketsContainer";
import { CityMarketsContextProvider } from "./context/cityMarketsContext";

const CityMarketsWrapper: React.FC = () => {
  return (
    <CityMarketsContextProvider>
      <CityMarketsContainer />
    </CityMarketsContextProvider>
  );
};

export default CityMarketsWrapper;
