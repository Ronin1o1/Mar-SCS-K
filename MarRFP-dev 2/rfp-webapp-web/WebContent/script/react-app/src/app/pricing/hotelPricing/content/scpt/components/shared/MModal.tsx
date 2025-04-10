import React from "react";
import styles from "./MModal.module.css";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import MAccountPricingButton from "./MAccountPricingButton";
import Settings from "../../data/Settings";

interface IProps {
  title: string;
  body?: any;
  button1?: any;
  button1OnClick?: (event, any) => void;
  button2?: any;
  button2OnClick?: (event, any) => void;
  button3?: any;
  button3OnClick?: (event, any) => void;
  handleClose: () => void;
  show: boolean;
  overflow: boolean;
}

interface IState {}

export default class MModal extends React.Component<IProps, IState> {
  renderModal() {
    return (
      <section
        className={[
          styles.modalMain,
          this.props.overflow && styles.modalMainOverflow
        ].join(Settings.text.constant.stringSpace)}
      >
        <div className={styles.modalHeaderContainer}>
          <div className={styles.modalTitle}>{this.props.title}</div>
          <div className={styles.modalCloseIcon}>
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
          className={
            this.props.overflow
              ? styles.modalBodyContainerOverFlow
              : styles.modalBodyContainer
          }
        >
          {this.props.body}
        </div>
        <div className={styles.modelFooterContainer}>
          {(() => {
            return (
              this.props.button1 != null && (
                <div>
                  <MAccountPricingButton
                    id={this.props.button1.id}
                    label={this.props.button1.label}
                    onClick={event => {
                      this.props.button1.closeButton
                        ? this.props.handleClose()
                        : this.props.button1OnClick(
                            event,
                            this.props.handleClose
                          );
                    }}
                  />
                </div>
              )
            );
          })()}
          <div className={styles.modelRightButtons}>
            {(() => {
              return (
                this.props.button2 && (
                  <div>
                    <MAccountPricingButton
                      id={this.props.button2.id}
                      label={this.props.button2.label}
                      onClick={event => {
                        this.props.button2.closeButton
                          ? this.props.handleClose()
                          : this.props.button2OnClick(
                              event,
                              this.props.handleClose
                            );
                      }}
                    />
                  </div>
                )
              );
            })()}
            {(() => {
              return (
                this.props.button3 && (
                  <div className={styles.modelFirstRightButton}>
                    <MAccountPricingButton
                      id={this.props.button3.id}
                      label={this.props.button3.label}
                      onClick={event => {
                        this.props.button3.closeButton
                          ? this.props.handleClose()
                          : this.props.button3OnClick(
                              event,
                              this.props.handleClose
                            );
                      }}
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
          styles.modal,
          this.props.show ? styles.modalDisplayBlock : styles.modalDisplayNone
        ].join(Settings.text.constant.stringSpace)}
      >
        {this.renderModal()}
      </div>
    );
  }
}
