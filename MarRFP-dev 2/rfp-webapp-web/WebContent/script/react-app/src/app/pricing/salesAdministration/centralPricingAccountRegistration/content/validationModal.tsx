import React, { useContext } from "react";
import CModal from "../../../../common/components/CModal";
import CentralPricingAccountRegistrationContext, {
  ICentralPricingAccRegContext,
} from "../context/centralPricingAccountRegistrationContext";
import Settings from "../static/Settings";
import Styles from "./validationModal.css";

const ValidationModal = (): JSX.Element => {
  const context = useContext(
    CentralPricingAccountRegistrationContext
  ) as ICentralPricingAccRegContext;
  return (
    <div className={Styles.container}>
      <CModal
        title={Settings.labels.modalTitle}
        onClose={() => context.setDisplayValidationModal(false)}
        show={!context.isFormValid}
      >
        <div className={Styles.padding}>
          <p>{context.validationMessage}</p>
        </div>
      </CModal>
    </div>
  );
};

export default ValidationModal;
