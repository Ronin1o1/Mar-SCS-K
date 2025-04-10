import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { PortfolioAcceptance } from "./content/PortfolioAcceptance";
import { PortfolioAcceptancesContextProvider } from "./context/PortfolioAcceptancesContext";

const PortfolioAcceptanceWrapper: React.FC = () => {
    return (
        <PortfolioAcceptancesContextProvider>
            <PortfolioAcceptance />
        </PortfolioAcceptancesContextProvider>
    );
};
export default PortfolioAcceptanceWrapper;