import React from "react";
import CentralPricingAccountRegistrationContainer from "./content/CentralPricingAccountRegistrationContainer";
import { CentralPricingAccountRegistrationContextProvider } from "./context/centralPricingAccountRegistrationContext";
import { useHistory } from "react-router-dom";

const CentralPricingAccountRegistrationWrapper: React.FC = () => {
  const history = useHistory();

  return (
    <CentralPricingAccountRegistrationContextProvider
      key={history.location.key}
    >
      <CentralPricingAccountRegistrationContainer />
    </CentralPricingAccountRegistrationContextProvider>
  );
};

export default CentralPricingAccountRegistrationWrapper;
