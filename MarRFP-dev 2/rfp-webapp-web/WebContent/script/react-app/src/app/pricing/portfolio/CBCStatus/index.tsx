import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { PortfolioCBCStatus } from "./content/portfolioCBCStatus";
import { PortfolioCBCStatusContextProvider } from "./context/portfolioCBCStatusContext";

const PortfolioCBCStatusWrapper: React.FC = () => {
  return (
    <PortfolioCBCStatusContextProvider>
      <PortfolioCBCStatus />
    </PortfolioCBCStatusContextProvider>
  );
};
export default PortfolioCBCStatusWrapper;