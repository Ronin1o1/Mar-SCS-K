import React from "react";
import styles from "./MDialog.module.css";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import MAccountPricingButton from "./MAccountPricingButton";
import Settings from "../../data/Settings";
import existingStyles from "../../index.css";

interface IProps {
  dialogOptions: any;
  handleClose: () => void;
  handleOk: () => void;
  show: boolean;
}

interface IState {}

export default class MDialog extends React.Component<IProps, IState> {
  renderDialog() {
    return (
      <section className={styles.dialogMain}>
        <div className={styles.dialogHeaderContainer}>
          <div className={styles.dialogTitle}>
            {this.props.dialogOptions.type}
          </div>
          <div className={styles.dialogCloseIcon}>
            <svg
              className={styles.closeXLightSVG}
              onClick={event => {
                this.props.handleClose();
              }}
            >
              <use
                x="-90"
                y="-10"
                href={icon + "#close-x-light"}
                xlinkHref={icon + "#close-x-light"}
              />
            </svg>
          </div>
        </div>
        <div
          className={[
            styles.dialogBodyContainer,
            existingStyles.scptLabel
          ].join(Settings.text.constant.stringSpace)}
        >
          {this.props.dialogOptions.text.map((data, index) => {
            return <div key={index}>{data}</div>;
          })}
        </div>
        <div className={styles.dialogFooterContainer}>
          <div className={styles.dialogRightButtons}>
            <div>
              <MAccountPricingButton
                id={Settings.text.label.dialog.okButton}
                label={Settings.text.label.dialog.okButton}
                onClick={
                  this.props.dialogOptions.type ===
                  Settings.text.label.dialog.confirmDialog
                    ? this.props.handleOk
                    : this.props.handleClose
                }
              />
            </div>
            {(() => {
              return (
                this.props.dialogOptions.type ===
                  Settings.text.label.dialog.confirmDialog && (
                  <div className={styles.dialogFirstRightButton}>
                    <MAccountPricingButton
                      id={Settings.text.label.dialog.cancelButton}
                      label={Settings.text.label.dialog.cancelButton}
                      onClick={this.props.handleClose}
                    />
                  </div>
                )
              );
            })()}
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div
        className={[
          styles.dialog,
          this.props.show ? styles.dialogDisplayBlock : styles.dialogDisplayNone
        ].join(Settings.text.constant.stringSpace)}
      >
        {this.renderDialog()}
      </div>
    );
  }
}
