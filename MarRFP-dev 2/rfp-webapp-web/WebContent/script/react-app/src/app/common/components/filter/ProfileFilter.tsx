import React, { useEffect } from "react";

export function ProfileFilter(props) {
  const getProfile = () => {
    return props.filterContext?.edieProfileList?.map((item) => {
      return <option value={item.profile_id}>{item.profile_name}</option>;
    });
  };

  useEffect(() => {
    props.setRequestPayload &&
      props.setRequestPayload(props.filterContext.requestPayload);
  }, [props.filterContext]);

  return (
    <>
      <table
        style={{
          border: "0px",
          borderSpacing: "3px",
          padding: "2px",
          width: "100%",
        }}
        className={"field_Name"}
      >
        <tr>
          <td>Profile </td>
          <td style={{ height: "30px" }}>
            <select
              id="filterValues.Profile"
              name="filterValues.Profile"
              className="FilterSelect"
              style={{ height: "20px", width: "218px" }}
              onChange={(event) => {
                {
                  props.componentName == "requestEdie" &&
                  sessionStorage.getItem("requestEdieBckBtn") === "true"
                    ? props.filterContext.setIsDataChange(false)
                    : props.filterContext.setIsDataChange(true);
                }

                props.filterContext.setRequestPayload({
                  ...props.filterContext.requestPayload,
                  strFilterValues: {
                    ...props.filterContext.requestPayload.strFilterValues,
                    edieProfile: parseInt(event.target.value),
                  },
                });
              }}
            >
              <option value="">*</option>
              {getProfile()}
            </select>
          </td>
        </tr>
      </table>
    </>
  );
}
