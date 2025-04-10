import React from "react";
import Settings from "./static/Settings";

export function HighlightedHotel(props) {

  const handleRequestforHighlightedOnly = (checked: boolean) => {

    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        highlightedOnly: (checked)?Settings.Y: Settings.N,
      },
    });
  };

  return (

    <tr>
      <td className="field_Name nowrapCell">
        <input type="checkbox" id={Settings.highlightedOnly}
          name={Settings.highlightedOnly} title={Settings.highlightedOnly}
          checked={(props.filterContext.requestPayload.strFilterValues.highlightedOnly == Settings.Y)?true:false}
          onChange={(event) => {
            props.filterContext.setHighlightedOnly(Settings.Y);
            handleRequestforHighlightedOnly(event.target.checked);
          }} /><b>{Settings.runReportHighlight}</b>
      </td>
    </tr>

  );
};