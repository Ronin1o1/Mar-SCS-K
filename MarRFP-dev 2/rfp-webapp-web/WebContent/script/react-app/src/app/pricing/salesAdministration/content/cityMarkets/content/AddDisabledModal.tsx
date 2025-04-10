import React, { useContext, useEffect } from "react";
import CModal from "../../../../../common/components/CModal";
import styles from "./AddDisabledModal.css";
import Settings from "../static/Settings";
import CityMarketsContext, {
  ICityMarketsContext,
} from "../context/cityMarketsContext";

const AddDisabledModal = (): JSX.Element => {
  const context = useContext(CityMarketsContext) as ICityMarketsContext;

  useEffect;

  return (
    <div className={styles.modalContainer}>
      <CModal
        title={Settings.TabTitles.AddDisabled}
        onClose={context.toggleShowAddDisabled}
        show={context.state.showAddDisabled.isOpen}
        xPosition={-170}
        yPosition={-150}
        closeImgTitle={Settings.cmodelclose}
        overlayHeight={Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        )}
        overlayTopPosition={"-79px"}
      >
        <div className={styles.modalContent}>
          <p>{context.state.showAddDisabled.message}</p>
        </div>
      </CModal>
    </div>
  );
};

export default AddDisabledModal;
