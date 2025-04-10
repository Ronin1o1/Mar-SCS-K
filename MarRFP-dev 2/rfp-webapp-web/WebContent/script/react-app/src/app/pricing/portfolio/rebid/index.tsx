import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Rebid } from "./content/rebid";
import { RebidContextProvider } from "./context/rebid";

const PortfolioRebidWrapper: React.FC = () => {
  return (
    <RebidContextProvider>
      <Rebid />
    </RebidContextProvider>
  );
};
export default PortfolioRebidWrapper;