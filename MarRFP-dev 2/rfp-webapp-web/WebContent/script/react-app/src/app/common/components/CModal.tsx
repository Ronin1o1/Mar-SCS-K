import React, { useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./CModal.css";
import Settings from "../static/Settings";
import btnClose from "../assets/img/button/btnClose.gif";

function CModal(props) {
  if (!props.show) {
    return null;
  }

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        props.onClose && props.onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <React.Fragment>
      <Draggable
        bounds={props.bounds ? props.bounds : "body"}
        handle="#title"
        defaultPosition={{
          x: props.xPosition ? props.xPosition : 0,
          y: props.yPosition ? props.yPosition : 0,
        }}
        defaultClassName={
          props.class ? [props.class, styles.customModal].join(" ") : ""
        }
        positionOffset={props.positionOffset ? props.positionOffset : undefined}
        onStart={props.onStart ? props.onStart : undefined}
      >
        <div
          className={
            props?.componentName == "cityMarket" ||
            props?.componentName == "timeOut"
              ? styles.modalcity
              : props?.componentName == "PropSalesUser"
              ? styles.userModal
              : props?.componentName == "cresultGrid"
              ? styles.cgrid
              : styles.modal
          }
          style={props?.styles ? { ...props?.styles } : null}
        >
          {props.hideTitle ? null : (
            <div id={"title"} className={styles.editNewsTitleDiv}>
              <span className={styles.editNewsTitle}>{props.title}</span>
              <span
                className={styles.closeImg}
                title={
                  props.closeImgTitle
                    ? props.closeImgTitle
                    : Settings.cModal.cancelImgTitle
                }
                onClick={(e) => {
                  props.onClose && props.onClose();
                }}
              />
            </div>
          )}
          {props.children}
          {(props.componentName == "PriceEligibilityAmenity" ||
            props.componentName == "ModifyRateDescription") && (
            <div
              className={
                props.componentName == "ModifyRateDescription"
                  ? styles.closeBtnCenter
                  : ""
              }
            >
              <img
                text-align="middle"
                className={
                  props.componentName == "ModifyRateDescription"
                    ? ""
                    : styles.closeButton
                }
                alt="close"
                src={btnClose}
                onClick={(e) => {
                  props.onClose && props.onClose();
                }}
              />
            </div>
          )}
        </div>
      </Draggable>
      {props.opacity ? (
        <div
          className={styles.overlayhidden}
          style={
            props.overlayHeight && props.overlayTopPosition
              ? { height: props.overlayHeight, top: props.overlayTopPosition }
              : props.overlayHeight
              ? { height: props.overlayHeight }
              : null
          }
        ></div>
      ) : props?.componentName == "CNavLink" ||
        props?.componentName == "Navbar" ? (
        <div
          className={styles.customOverlay}
          style={{
            height: props?.overlayHeight,
            width: props?.overlayWidth,
            top: props?.overlayTopPosition,
          }}
        ></div>
      ) : props.componentName == "MainNav" ? (
        <div
          className={styles.customOverlayMainNav}
          style={
            props.overlayHeight && props.overlayTopPosition
              ? { height: props.overlayHeight, top: props.overlayTopPosition }
              : props.overlayHeight
              ? { height: props.overlayHeight }
              : null
          }
        ></div>
      ) : (
        <div
          className={styles.overlay}
          style={{
            height: props?.overlayHeight,
            width: props?.overlayWidth,
            top: props?.overlayTopPosition,
          }}
        ></div>
      )}
    </React.Fragment>
  );
}

export default CModal;
