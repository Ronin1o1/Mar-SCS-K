import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./CSelect.css";

const CSelect = ({
  selectedValue,
  name,
  id,
  width,
  ddnOptions,
  onChange,
  keyField,
  valField,
  className,
  isDisabled,
  autoComplete,
  onFocus,
}) => {
  const handleChange = (event) => {
    onChange(event);
  };

  const options = (options, keyField, valField) =>
    options.length > 0 &&
    options.map((opt) => {
      return (
        <Fragment>
          <option
            value={keyField ? opt[keyField] : opt.key}
            key={keyField ? opt[keyField] : opt.key}
            selected={
              opt[keyField]?.toString() === selectedValue?.toString()
                ? true
                : false
            }
          >
            {valField ? opt[valField] : opt.value}
          </option>
        </Fragment>
      );
    });

  return (
    <select
      name={name}
      id={id}
      style={width ? { width: width } : null}
      onChange={(event) => handleChange(event)}
      className={className}
      disabled={isDisabled}
      autoComplete={autoComplete}
      autoFocus={onFocus ? onFocus : null}
      onFocus={onFocus ? onFocus : null}
    >
      {options(ddnOptions, keyField, valField)}
    </select>
  );
};

CSelect.propTypes = {
  name: PropTypes.string,
  selectedValue: PropTypes.string || PropTypes.number,
  id: PropTypes.string,
  ddnOptions: PropTypes.array,
  keyField: PropTypes.string,
  valField: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  key: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  width: PropTypes.string,
  onfocus: PropTypes.func,
};

export default CSelect;
