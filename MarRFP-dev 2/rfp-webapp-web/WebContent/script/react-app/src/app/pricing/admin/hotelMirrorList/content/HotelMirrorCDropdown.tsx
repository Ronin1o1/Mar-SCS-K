import React from "react";
import styles from "./HotelMirrorList.css";

interface IHotelMirrorCDropdownProps {
  handleChange: any;
  options: any;
  className?: string;
  optionName?: string;
  optionKey?: string;
  value?: string | number | null;
  selectedValue?: string | number;
}

export function HotelMirrorCDropdown(props: IHotelMirrorCDropdownProps) {
  const name = props.optionName ? props.optionName : "name";
  const optionKey = props.optionKey ? props.optionKey : "id";
  return (
    <select
      onChange={(event) => props.handleChange(event)}
      className={[props.className, styles.commonDropdown].join(" ")}
      value={props?.value}
    >
      {props.options.map((label, index) => {
        return (
          <option
            value={label[optionKey]}
            selected={label[optionKey] === props.selectedValue}
          >
            {label[name]}
          </option>
        );
      })}
    </select>
  );
}
