import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { PortfolioSelection } from "./content/PortfolioSelection";
import { PortfolioSelectionContextProvider } from "./context/PortfolioSelectionContext";

const PortfolioSelectionWrapper = () => {
  return (
    <PortfolioSelectionContextProvider>
      <PortfolioSelection />
    </PortfolioSelectionContextProvider>
  );
};

export default PortfolioSelectionWrapper;
