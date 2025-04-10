import React, { useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CentralPricingAccountRegistrationContext, {
  ICentralPricingAccRegContext,
} from "../context/centralPricingAccountRegistrationContext";
import AccountRegistrationForm from "./AccountRegistrationForm";
import YearPicker from "./YearPicker";
import ValidationModal from "./validationModal";
import Settings from "../static/Settings";
import styles from "./CentralPricingAccountRegistrationContainer.css";

const CentralPricingAccountRegistrationContainer: React.FC = () => {
  const context = useContext(
    CentralPricingAccountRegistrationContext
  ) as ICentralPricingAccRegContext;
  const { path } = useRouteMatch();

  return (
    <div className={styles.yearSelectionContainer}>
      <div className={styles.header}>
        <h3>{Settings.headers.title}</h3>
        <hr />
      </div>
      {context.displayValidationModal && <ValidationModal />}
      <Switch>
        <Route exact path={`${path}`}>
          <YearPicker />
        </Route>
        <Route exact path={`${path}/:year`}>
          <AccountRegistrationForm />
        </Route>
      </Switch>
    </div>
  );
};

export default CentralPricingAccountRegistrationContainer;
