/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "./ViewMarshaCode.css";
import close from "../../../../common/assets/img/button/btnClose.gif";
import API from "../service/API";

export const ViewMarshaCode = (props) => {
  const [marshaCodes, setMarshaCodes] = useState(null);
  useEffect(() => {
    const params = {
      userid: props.params.userid,
      userRole: props.params.userRole,
      //preventCache: '1640861145997'
    };
    API.getUserListDialog(params).then((data) => {
      if (data && data.includes("error")) {
        setMarshaCodes([]);
      } else if (data) {
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
      <div className="bc" style={{ height: "200px", width: "350px" }}>
        <input
          type="text"
          defaultValue="test"
          id="focusField"
          style={{
            width: 0,
            height: 0,
            color: "#FFFFFF",
            background: "none",
            position: "absolute",
          }}
        />
        <div style={{ height: "150px", width: "350px", overflow: "auto" }}>
          <div
            style={{ width: "350px", height: "150px", overflowY: "auto" }}
            id="gridViewA"
            className={styles.gridView}
          >
            <table className={styles.menuWdth100Height}>
              <tbody>
                <tr>
                  <td className={styles.field_Name} style={{ width: "100px" }}>
                    MARSHA Code
                  </td>
                </tr>
                <tr
                  className={styles.BGDarkBlueStyle}
                  style={{ verticalAlign: "top" }}
                >
                  <td
                    style={{ height: "2px", verticalAlign: "top" }}
                    colSpan={1}
                    height={2}
                  />
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
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <table className={styles.menuWdth100Height}>
            <tbody>
              <tr
                className={styles.BGDarkBlueStyle}
                style={{ verticalAlign: "top" }}
              >
                <td
                  style={{ height: "2px", verticalAlign: "top" }}
                  height="2px"
                />
              </tr>
              <tr>
                <td style={{ height: "10px" }}>
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
export default ViewMarshaCode;
