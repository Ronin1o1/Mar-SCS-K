import React, { useEffect, useState } from "react";
import styles from "./IdleMonitor.css";
import Settings from "../home/static/settings";

const IdleMonitorInnerContent = (props): JSX.Element => {
  useEffect(() => {
    return () => {
      if (props.timeoutCountdown === 0) {
        props.handleOkClick();
      }
    };
  }, [props.timeoutCountdown]);

  return (
    <div>
      {props.componentType == "timeoutModal" ? (
        <div className={"timeoutnotification"}>
          <div className={styles.MBLEVEL1}>
            <h2>Time Out Notification</h2>
          </div>

          <div className={styles.timeoutmessage}>
            <div dangerouslySetInnerHTML={{__html: props.idleMessage}}></div>
          </div>

          <div className={styles.okbutton}>
            {props.timeoutCountdown === 0 && (
              <a
                href="javascript:void(0);"
                onClick={() => props.handleOkClick()}
              >
                OK
              </a>
            )}
            {props.timeoutCountdown !== 0 && (
              <a
                href="javascript:void(0);"
                onClick={() => props.handleContinueClick()}
              >
                Continue
              </a>
            )}
          </div>
        </div>
      ) : null}
      {props.componentType == "renewModal" ? (
        <div className={"timeoutnotification"}>
          <div className={styles.MBLEVEL1}>
            <h2>Session Sucessfully Renewed</h2>
          </div>

          <div className={styles.timeoutmessage}>
            <p>{Settings.renewMessage}</p>
          </div>
          <div className={styles.okbutton}>
            <a
              href="javascript:void(0);"
              onClick={() => props.handleCloseLink()}
            >
              Close
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default IdleMonitorInnerContent;
