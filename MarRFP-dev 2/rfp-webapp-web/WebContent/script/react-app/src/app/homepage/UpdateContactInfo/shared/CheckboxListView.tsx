import React from "react";
import styles from "../shared/CheckboxListView.css";
import Settings from "../static/Settings";
import CCheckbox from "../../../common/components/CCheckbox";

export const CheckboxListView = (props) => {
  const handleOnChange = (event) => {
    props.handleChange(event, props.type);
  };

  return (
    <li
      className={`${styles.listNoneCls} ${
        (props.data.marshaCode && styles.listCls) ??
        (props.data.accountid && styles.listCls)
      }`}
      key={props.data.marshaCode ?? props.data.accountid}
    >
      <div className={styles.hotelListItem}>
        <div className={styles.itemPadding}>
          {props.type == "selectPrimaryAcct" ? (
            <span>
              <CCheckbox
                type={Settings.inputType.checkbox}
                id={
                  props.data.marshaCode +
                  "-" +
                  (props.data.accountid || props.data.accountID)
                }
                name={props.data.hotelName + "-" + props.data.accountname}
                value={props.data.marshaCode}
                onChangeHandler={(e) => handleOnChange(e)}
                checked={props.data.checked}
                class={styles.checkboxCls}
              ></CCheckbox>
            </span>
          ) : (
            <span>
              <CCheckbox
                type={Settings.inputType.checkbox}
                id={props.data.hotelid ?? props.data.accountid}
                name={props.data.hotelName ?? props.data.accountname}
                value={props.data.marshaCode ?? props.data.accountid}
                onChangeHandler={(e) => handleOnChange(e)}
                checked={props.data.checked}
                class={styles.checkboxCls}
              ></CCheckbox>
            </span>
          )}
          {props.type == "selectPrimaryAcct" ? (
            <span className={styles.widthSecondCell}>
              <label
                className={styles.hotelListLabel}
                htmlFor={`${props.data.marshaCode ?? props.data.accountid}`}
              >
                {props.data.marshaCode}
                {props.data.marshaCode && <span>-</span>}
                {props.data.hotelName ?? props.data.accountname}
              </label>
            </span>
          ) : (
            <span>
              <label
                className={styles.hotelListLabel}
                htmlFor={`${props.data.marshaCode ?? props.data.accountid}`}
              >
                {props.data.marshaCode}
                {props.data.marshaCode && <span>-</span>}
                {props.data.hotelName ?? props.data.accountname}
              </label>
            </span>
          )}

          {props.type == "selectPrimaryAcct" && (
            <span className={styles.paddingLastCell}>
              <label className={` ${styles.hotelListLabel}`}>
                {props.data.accountname}
              </label>
            </span>
          )}
        </div>
      </div>
    </li>
  );
};
