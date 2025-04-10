import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { PortfolioOrganization } from "./content/PortfolioOrganization";
import { PortfolioOrganizationContextProvider } from "./context/PortfolioOrganizationContext";

const PortfolioOrganizationWrapper: React.FC = () => {
  return (
    <PortfolioOrganizationContextProvider>
      <PortfolioOrganization />
    </PortfolioOrganizationContextProvider>
  );
};
export default PortfolioOrganizationWrapper;