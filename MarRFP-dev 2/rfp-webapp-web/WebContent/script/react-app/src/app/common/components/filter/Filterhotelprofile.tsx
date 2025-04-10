
import React, { useEffect } from "react";

export function Filterhotelprofile(props) {
  const getHotelProfile = () => {
    return props.filterContext?.hotelProfileList?.map((item) => {
      return <option value={item.profile_id}>{item.profile_name}</option>;
    });
  };

  useEffect(() => {
    props.setRequestPayload &&
      props.setRequestPayload(props.filterContext.requestPayload);
  }, [props.filterContext]);

  return (
    <>
      <table style={{ border: "0px", borderSpacing: "3px", padding: "2px", width: "100%" }} className="field_Name">
        <tr>
          <td style={{fontWeight : "normal"}}>Apply to </td>
          <td style={{ height: "30px" }}>
            <select id="filterValues.hotelProfile" name="filterValues.hotelProfile"
              className="FilterSelect" style={{ height: "20px", width: "218px" }}
              onChange={(event) => {
                props.filterContext.setRequestPayload({
                  ...props.filterContext.requestPayload,
                  strFilterValues: {
                    ...props.filterContext.requestPayload.strFilterValues,
                    hotelProfile: parseInt(event.target.value),
                  },
                });
              }}
            >
              <option value="0">All hotels</option>
              {getHotelProfile()}
            </select>
          </td>
        </tr>
      </table >
    </>
  );
}
