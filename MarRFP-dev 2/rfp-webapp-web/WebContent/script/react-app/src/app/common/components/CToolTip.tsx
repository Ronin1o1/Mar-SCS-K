import ReactTooltip from "react-tooltip";
import React from "react";
import PropTypes from "prop-types";
import Styles from "./CToolTip.css";

const CTooltip = (props) => {

  return (
    <div>
      <ReactTooltip
        id={props.id}
        place={props.position}
        className={Styles.tooltipContainer}
        effect="solid"
        textColor="#000"  
        globalEventOff="mouseout"
        afterHide= {props.afterHide}
        delayShow={1000}
        arrowColor="transparent"
        event="click"
      >
        {props.children}
      </ReactTooltip>
    </div>
  );
};

CTooltip.propTypes = {
  id: PropTypes.string,
  content: PropTypes.any,
  place: PropTypes.string,
  backgroundColor: PropTypes.string,
  event: PropTypes.string,
  borderColor: PropTypes.string,
  afterHide: PropTypes.func
};

export default CTooltip;
