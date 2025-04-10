import React from "react";

export function EmailMeReport(props) {
  const handleRequestforEmailMeReport = (checked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        emailMe: checked ? "Y" : "N",
      },
    });
  };

  return (
    <tr>
      <td className="field_Name nowrapCell">
        <input
          type="checkbox"
          id="filterValues.emailMe"
          name="filterValues.emailMe"
          title="filterValues.emailMe"
          checked={
            props.filterContext.requestPayload.strFilterValues.emailMe == "Y"
              ? true
              : false
          }
          onChange={(event) => {
            props.filterContext.setemailMe("Y");
            handleRequestforEmailMeReport(event.target.checked);
          }}
        />
        <b>Email me when report is ready</b>
      </td>
    </tr>
  );
}
