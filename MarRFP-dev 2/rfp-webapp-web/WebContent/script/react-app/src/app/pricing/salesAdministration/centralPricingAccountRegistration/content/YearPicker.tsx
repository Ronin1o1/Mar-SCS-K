import React, { useContext, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Settings from "../static/Settings";
import CentralPricingAccountRegistrationContext, {
  ICentralPricingAccRegContext,
} from "../context/centralPricingAccountRegistrationContext";
import styles from "./YearPicker.css";
import submitImg from "../../../../common/assets/img/button/btnSubmit.gif";

const YearPicker = (): JSX.Element => {
  const context = useContext(
    CentralPricingAccountRegistrationContext
  ) as ICentralPricingAccRegContext;
  const { url } = useRouteMatch();

  useEffect(() => {
    context.fetchPeriods();
  }, []);

  return (
    <div className={styles.yearContainer}>
      <div className={styles.yearContent}>
        <p className={styles.header}>{Settings.yearHeader}</p>
        <div className={styles.menu}>
          <p>Year</p>
          <select
            value={context.yearSelection.year}
            onChange={(e) => context.handleYearSelect(e.currentTarget.value)}
          >
            {context?.periods?.map((year) => (
              <option key={year.period} value={year.period}>
                {year.period}
              </option>
            ))}
          </select>
        </div>
        <Link to={`${url}/${context.yearSelection.year}`}>
          <img src={submitImg} />
        </Link>
      </div>
    </div>
  );
};

export default YearPicker;
