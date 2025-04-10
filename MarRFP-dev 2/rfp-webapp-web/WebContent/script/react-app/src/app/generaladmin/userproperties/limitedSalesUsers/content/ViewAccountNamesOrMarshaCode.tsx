/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "./ViewAccountNamesOrMarshaCode.css";
import close from "../../../../common/assets/img/button/btnClose.gif";
import API from "../service/API";
import Settings from "../static/Settings";

export const ViewAccountNamesOrMarshaCode = (props) => {
  const [accountname, setAccountNames] = useState(null);
  const [marshaCodes, setMarshaCodes] = useState(null);

  useEffect(() => {
    const params = {
      userid: props.params.userid,
      userRole: props.params.userRole,
      eid: props.params.eid,
    };

    API.getUserListDialog(params).then((data) => {
      if (data && data.includes("error")) {
        setAccountNames([]);
        setMarshaCodes([]);
      } else if (data) {
        const names = data.map((record) => record.accountname);
        setAccountNames(names);
        const codes = data.map((record) => record.marshacode);
        setMarshaCodes(codes);
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
              <tbody
                style={{
                  display: "flex",
                  overflow: "scroll",
                  height: "200px",
                  width: "420px",
                  overflowX: "auto",
                }}
              >
                <div>
                  <tr>
                    <td
                      className={` ${styles.field_Name} ${styles.width_100} `}
                    >
                      {Settings.labels.accountName}
                    </td>
                  </tr>
                  <tr className={` ${styles.BGDarkBlueStyle} ${styles.top}`}>
                    <td className={styles.trCls} colSpan={1} height={2} />
                  </tr>
                  {accountname == null ? (
                    <span className="wait">
                      {Settings.labels.loadingMessage}
                    </span>
                  ) : (
                    accountname.map((name) => {
                      return (
                        <tr>
                          <td className={styles.fontNormal}>{name}</td>
                        </tr>
                      );
                    })
                  )}
                </div>
                <div>
                  <tr>
                    <td
                      className={` ${styles.field_Name} ${styles.width_100} `}
                    >
                      {Settings.labels.marshaCode}
                    </td>
                  </tr>
                  <tr className={` ${styles.BGDarkBlueStyle} ${styles.top}`}>
                    <td className={styles.trCls} colSpan={1} height={2} />
                  </tr>
                  {marshaCodes == null ? (
                    <span className="wait">Please wait loading...</span>
                  ) : (
                    marshaCodes.map((code) => {
                      return (
                        <tr>
                          <td className={styles.filter_Value}>{code}</td>
                        </tr>
                      );
                    })
                  )}
                </div>
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
                <td className={styles.height_10}>
                  <>&nbsp;</>
                </td>
              </tr>
              <tr>
                <td align="center">
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
export default ViewAccountNamesOrMarshaCode;
