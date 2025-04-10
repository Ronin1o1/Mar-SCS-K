import React from "react";

export function ReportFilter(props) {
  const getReport = () => {
    return props.filterContext.filterViewLists?.reportlist?.map((item) => {
      return <option value={item.report_name}>{item.report_title}</option>;
    });
  };

  return (
    <>
      <table
        style={{
          border: "0px",
          borderSpacing: "3px",
          padding: "2px",
          width: "100%",
        }}
        className="field_Name"
      >
        <tr>
          <td>
            <b>Report</b>{" "}
          </td>
          <td>
            <select
              id="filterValues.report"
              name="filterValues.report"
              className="FilterSelect"
              style={{ height: "20px", width: "218px" }}
              onChange={(event) => {
                {
                  props.componentName == "requestReport" &&
                  sessionStorage.getItem("onBckBtn") === "true"
                    ? props.filterContext.setIsDataChange(false)
                    : props.filterContext.setIsDataChange(true);
                }

                props.filterContext.getReportInfo(event.target.value);
                props.filterContext.setRequestPayload({
                  ...props.filterContext.requestPayload,
                  strFilterValues: {
                    ...props.filterContext.requestPayload.strFilterValues,
                    report: event.target.value,
                    accountFilter: {
                      ...props.filterContext.requestPayload.strFilterValues
                        .accountFilter,
                      accountstatus: props.filterContext.selectedAccount,
                    },
                  },
                });
              }}
            >
              <option value="">*</option>
              {getReport()}
            </select>
          </td>
        </tr>
      </table>
    </>
  );
}
