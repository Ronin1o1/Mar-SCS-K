import React from "react";
import styles from "../shared/listView.css";
import Settings from "../hotelusers/static/Settings";
import CCheckbox from "../../../common/components/CCheckbox";

export const ListView = (props) => {
  const handleOnChange = (event) => {
    props.handleChange(event, props.type);
  };

  return (
    <li
      className={`${styles.listNoneCls} ${
        (props.data.marshaCode && styles.listCls) ??
        (props.data.accountid && styles.listCls)
      } `}
      key={
        props.data.marshaCode ??
        props.data.regionid ??
        props.data.affiliationid ??
        props.data.accountid
      }
    >
      <div className={styles.hotelListItem}>
        <div>
          <CCheckbox
            type={Settings.inputType.checkbox}
            id={
              props.data.marshaCode ??
              props.data.regionid ??
              props.data.affiliationid ??
              props.data.franchCode ??
              props.data.accountid
            }
            name={
              props.data.hotelName ??
              props.data.regionname ??
              props.data.affiliationname ??
              props.data.franchName ??
              props.data.accountname
            }
            value={
              props.data.marshaCode ??
              props.data.regionid ??
              props.data.affiliationid ??
              props.data.epicIdy ??
              props.data.accountid
            }
            onChangeHandler={(e) => handleOnChange(e)}
            checked={props.data.checked}
          ></CCheckbox>
          <label
            className={styles.hotelListLabel}
            htmlFor={`${
              props.data.marshaCode ??
              props.data.regionid ??
              props.data.affiliationid ??
              props.data.franchCode ??
              props.data.accountid
            }`}
          >
            {props.data.marshaCode}
            {props.data.marshaCode && <span>-</span>}
            {props.data.hotelName ??
              props.data.regionname ??
              props.data.affiliationname ??
              props.data.franchName ??
              props.data.accountname}
          </label>
        </div>
      </div>
    </li>
  );
};
