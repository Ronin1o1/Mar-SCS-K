import React, { useState } from "react";
import styles from "./quickSelect.css";
import btnSelect from "./../assets/img/button/btnSelect.gif";
import btnSubmit from "./../assets/img/button/btnSubmit.gif";
import btnCancel from "./../assets/img/button/btnCancel.gif";
import CCheckbox from "../../common/components/CCheckbox";
import CSelect from "../../common/components/CSelect";
import CModal from "../../common/components/CModal";

function QuickSelect(props) {
  const [textField, setTextValue] = useState(
    props.quickSelectObject &&
      props.quickSelectObject.componentName === "portfolioCBCStatus"
      ? props.selectedMarshaCodes
      : props?.quickSelectObject?.textField
      ? props?.quickSelectObject?.textField
      : ""
  );
  const [action, setAction] = useState("acc_by_pro");
  const [rjReason, setRjReason] = useState(
    props.quickSelectObject &&
      props.quickSelectObject.componentName === "portfolioCBCStatus"
      ? props.quickSelectObject &&
          props.quickSelectObject.rejectionReasonList[0].rejectreasonid
      : 1
  );
  const [groups, setGroups] = useState([1, 2, 3]);
  const [showValidation, setShowValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [all, setAll] = useState(false);

  const save = () => {
    props.save(textField);
  };

  const cancel = () => {
    setTextValue("");
    props.cancel();
  };

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const submit = () => {
    if (action == "up_rej_reas") {
      if (rjReason == 1) {
        alert("Please select the rejection reason");
        return false;
      }
    }
    if (["acc_by_pro", "rej_by_pro", "up_rej_reas"].includes(action)) {
      if (!textField) {
        alert("There are no hotels available to select.");
        return false;
      }
      if (
        props.quickSelectObject &&
        props.quickSelectObject.componentName == "portfolioAcceptance" &&
        !groups.length &&
        !["acc_all_pro", "rej_all_pro"].includes(action)
      ) {
        alert("At least one room pool must be selected.");
        return false;
      }
      props.save({ action, rjReason, groups, textField });
    }
    if (["acc_all_pro", "rej_all_pro"].includes(action)) {
      if (
        confirm(
          `Are you sure you want to ${
            action == "acc_all_pro" ? "Accept" : "Reject"
          } All properties? Click OK to proceed and Cancel to ignore.`
        )
      ) {
        submitAll();
      }
    }
  };

  const submitAll = () => {
    alert(
      `${
        action == "acc_all_pro" ? "Accept" : "Reject"
      } All request has been submitted successfully. Please wait for screen to refresh before taking additional action.`
    );
    props.save({ action, rjReason, groups, textField });
  };

  return (
    <div className={styles.container}>
      <CModal
        title={""}
        onClose={(e) => setShowValidation(false)}
        show={showValidation}
        xPosition={-100}
        yPosition={-100}
      >
        <div
          style={{
            maxWidth: 500,
            minWidth: 180,
            padding: "9px 12px",
            textAlign: "center",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: validationMessage }} />
        </div>
        <div className={all ? styles.tableDisplay : styles.gridDisplay}>
          <input
            type="button"
            defaultValue="Ok"
            className={styles.okButton}
            onClick={(e) => {
              all ? submitAll() : setShowValidation(false);
            }}
          />
          {all && (
            <input
              type="button"
              defaultValue="Cancel"
              className={styles.okButton}
              onClick={(e) => {
                setAll(false);
                setShowValidation(false);
              }}
            />
          )}
        </div>
      </CModal>
      {props.quickSelectObject &&
        props.quickSelectObject.componentName &&
        (props.quickSelectObject.componentName == "portfolioAcceptance" ||
          props.quickSelectObject.componentName == "portfolioCBCStatus") && (
          <>
            {props.quickSelectObject.componentName === "portfolioAcceptance" ? (
              <div style={{ paddingBottom: "15px" }}>
                Select the desired action, which will be applied to all room
                pools for the indicated properties. Once you submit your
                request, your changes will be made and automatically saved.
              </div>
            ) : (
              <div
                style={{ paddingBottom: "15px" }}
                dangerouslySetInnerHTML={{
                  __html: props.quickSelectObject.label,
                }}
              ></div>
            )}
            <table>
              <tr>
                <td>
                  <CCheckbox
                    type={"radio"}
                    onChangeHandler={(e) => {
                      setAction("acc_by_pro");
                      setRjReason(9);
                    }}
                    checked={action == "acc_by_pro"}
                  />
                  <span className={styles.chLabel}> Accept by Property</span>
                </td>
              </tr>
              <tr>
                <td>
                  <CCheckbox
                    type={"radio"}
                    onChangeHandler={(e) => {
                      setAction("acc_all_pro");
                      setRjReason(9);
                    }}
                    checked={action == "acc_all_pro"}
                  />
                  <span className={styles.chLabel}> Accept All Properties</span>
                </td>
              </tr>
              <tr>
                <td>
                  <CCheckbox
                    type={"radio"}
                    onChangeHandler={(e) => setAction("rej_by_pro")}
                    checked={action == "rej_by_pro"}
                  />
                  <span className={styles.chLabel}> Reject by Property</span>
                </td>
                <td>
                  Select Rejection Reason:{" "}
                  <CSelect
                    isDisabled={["acc_by_pro", "acc_all_pro"].includes(action)}
                    selectedValue={rjReason}
                    ddnOptions={
                      props.quickSelectObject &&
                      props.quickSelectObject.rejectionReasonList
                    }
                    keyField={"rejectreasonid"}
                    valField={"rejectionreason"}
                    onChange={(e) => setRjReason(e.target.value)}
                  ></CSelect>
                </td>
              </tr>
              <tr>
                <td>
                  <CCheckbox
                    type={"radio"}
                    onChangeHandler={(e) => setAction("rej_all_pro")}
                    checked={action == "rej_all_pro"}
                  />
                  <span className={styles.chLabel}> Reject All Properties</span>
                </td>
              </tr>
              <tr>
                <td>
                  <CCheckbox
                    type={"radio"}
                    onChangeHandler={(e) => setAction("up_rej_reas")}
                    checked={action == "up_rej_reas"}
                  />
                  <span
                    className={styles.chLabel}
                    style={{ paddingBottom: "15px" }}
                  >
                    {" "}
                    Update Rejection Reason
                  </span>
                </td>
              </tr>
              {props.quickSelectObject.componentName ===
                "portfolioAcceptance" && (
                <tr style={{ fontWeight: "bold" }}>
                  <td style={{ paddingTop: "15px" }}>
                    Apply to Room Pool Group:{" "}
                  </td>
                  <td style={{ paddingTop: "15px" }}>
                    {[1, 2, 3].map((n) => (
                      <>
                        <CCheckbox
                          disabled={["acc_all_pro", "rej_all_pro"].includes(
                            action
                          )}
                          type={"checkbox"}
                          checked={groups.includes(n)}
                          onChangeHandler={(e) =>
                            groups.includes(n)
                              ? setGroups([...groups.filter((x) => x != n)])
                              : setGroups([...groups, n])
                          }
                        />
                        <span className={styles.apLabel}>{n}</span>
                      </>
                    ))}
                  </td>
                </tr>
              )}
            </table>
          </>
        )}

      <table className="zero-Height">
        <tr>
          {props.quickSelectObject.componentName !== "portfolioCBCStatus" ? (
            <td
              className="field_Name"
              style={{ minWidth: 60, fontWeight: "bold", verticalAlign: "top" }}
              valign="top"
            >
              {props.quickSelectObject.label}
            </td>
          ) : (
            ""
          )}
          {props.quickSelectObject.componentName === "portfolioCBCStatus" ? (
            <td></td>
          ) : (
            <td className="field_Value">
              <textarea
                autoFocus
                id={props.quickSelectObject.textareaId}
                rows={props.quickSelectObject.rows}
                disabled={
                  props.quickSelectObject &&
                  props.quickSelectObject.componentName &&
                  props.quickSelectObject.componentName ==
                    "portfolioAcceptance" &&
                  ["acc_all_pro", "rej_all_pro"].includes(action)
                }
                cols={props.quickSelectObject.cols}
                name={props.quickSelectObject.textareaName}
                value={textField}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </td>
          )}
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          {props.quickSelectObject.componentName === "portfolioCBCStatus" ? (
            <>
              <div style={{ height: "10px" }}>&nbsp;</div>
              <table>
                <tbody>
                  <tr></tr>
                  <tr>
                    <td className={styles.field_Name_cbcStatus} valign="top">
                      Hotel List:
                    </td>
                    <td className={styles.field_Value}>
                      <textarea
                        rows={12}
                        cols={100}
                        id="hotellist"
                        name="hoteldlist"
                        value={textField}
                        className={styles.field_value}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </tr>
      </table>

      <div className={styles.buttonContainer}>
        <div className={styles.buttonPosition}>
          {props.quickSelectObject &&
          props.quickSelectObject.componentName &&
          (props.quickSelectObject.componentName == "portfolioAcceptance" ||
            props.quickSelectObject.componentName == "portfolioCBCStatus") ? (
            <img
              src={btnSubmit}
              className={styles.save}
              onClick={(e) => {
                submit();
              }}
            />
          ) : (
            <img
              src={btnSelect}
              className={styles.save}
              onClick={(e) => {
                save();
              }}
            />
          )}
          <img
            src={btnCancel}
            className={styles.cancel}
            onClick={(e) => {
              cancel();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuickSelect;
