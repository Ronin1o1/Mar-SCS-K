/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "./ViewAccountNames.css";
import close from "../../../../common/assets/img/button/btnClose.gif";
import API from "../service/API";
import Settings from "../static/Settings";

export const ViewAccountNames = (props) => {
  const [accountname, setAccountNames] = useState(null);

  useEffect(() => {
    const params = {
      userid: props.params.userid,
      userRole: props.params.userRole,
      eid: props.params.eid,
    };

    API.getUserListDialog(params).then((data) => {
      if (data && data.includes("error")) {
        setAccountNames([]);
      } else if (data) {
        const codes = data.map((record) => record.accountname);
        setAccountNames(codes);
      }
    });
  }, []);
  return (
    <div
      data-dojo-attach-point="containerNode"
      className={styles.dialogPaneContent}
    >
      <div className={styles.backgroundCls}>
        <div className={styles.outerDivCls}>
          <div
            className={` ${styles.gridView} ${styles.innerDivCls} `}
            id="gridViewA"
          >
            <table className={styles.menuWdth100Height}>
              <tbody>
                <tr>
                  <td className={` ${styles.field_Name} ${styles.width_100} `}>
                    {Settings.labels.accountName}
                  </td>
                </tr>
                <tr className={` ${styles.BGDarkBlueStyle} ${styles.top}`}>
                  <td className={styles.trCls} colSpan={1} height={2} />
                </tr>
                {accountname == null ? (
                  <span className="wait">{Settings.labels.loadingMessage}</span>
                ) : (
                  accountname.map((code) => {
                    return (
                      <tr>
                        <td className={styles.fontNormal}>{code}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <table className={styles.menuWdth100Height}>
            <tbody>
              <tr className={` ${styles.BGDarkBlueStyle} ${styles.top}`}>
                <td className={styles.trCls} height="2px" />
              </tr>
              <tr>
                <td align="center" className={styles.closebtn}>
                  <img
                    onClick={(e) => {
                      props.onClose && props.onClose();
                    }}
                    src={close}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ViewAccountNames;
