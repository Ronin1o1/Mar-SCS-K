import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./SelectHotelPricing.css";
import Go from "../../../../../common/assets/img/go.gif";
import HotelContext, {
  HotelContextProvider,
} from "../context/HotelContextProvider";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import API from "../service/API";
import { useLocation, useHistory } from "react-router-dom";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

import screenLoader from "../../../../../common/assets/img/screenloader.gif";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

let contextType = null;
let parentContextType = null;
let marshaCode;
let hotelName;

function SelectHotelPricing(parms) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();

  const location = useLocation();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const [enterClick, setEnterClick] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const refreshData = sessionStorage.getItem("hotelRefreshData")
      ? JSON.parse(sessionStorage.getItem("hotelRefreshData"))
      : null;
    API.getHotelSelect()
      .then((data) => {
        contextType.setState({
          ...contextType.state,
          selecthotellist: data.hotelList,
          periodlist: data.periodList,
          hotelData1: data,
          selectedYear: refreshData?.period
            ? refreshData.period
            : data.periodList[0].period,
          hotelRfpid: data.periodList[0].hotelrfpid,
          hotelName: refreshData?.hotelName ? refreshData.hotelName : "",
          inputmarshacode: refreshData?.inputMarshaCode
            ? refreshData.inputMarshaCode
            : "",
          marshaCode: refreshData?.marshaCode ? refreshData.marshaCode : "",
          selectedmarshacode: refreshData?.marshaCode
            ? refreshData.marshaCode
            : "",
        });
        sessionStorage.removeItem("hotelRefreshData");

        parentContextType?.setSelectedHotelRfpId(0);
      })
      .catch((error) => {
        console.log("error==", error);
      });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [contextType]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setEnterClick(true);
      onGoClick("enter");
    }
  };

  const handleChange = (e) => {
    contextType.setinputmarshacode(e.target.value);
    contextType.state.selectedmarshacode = e.target.value;

    const value = contextType.state.selecthotellist?.filter(function (item) {
      return item.marshaCode == e.target.value;
    });
    if (value[0] !== undefined) {
      contextType.setinputmarshacode(value[0]);

      contextType.state.selectedmarshacode = value[0].marshaCode;
      contextType.state.hotelName = value[0].hotelName;
      window.sessionStorage.setItem("hotelName", value[0].hotelName);
      contextType.sethotelName(value[0].hotelName);

      marshaCode = value[0].marshaCode;
      hotelName = value[0].hotelName;
    }
    if (marshaCode == null || marshaCode == "") {
      alert(Settings.alertMsgs.selectProperty);
    } else {
    }
  };

  const onInputMarshaCode = (e) => {
    setEnterClick(false);
    const inputvalue = e.target.value;
    let valueName = [];
    if (inputvalue.length > 0) {
      valueName = contextType.state.selecthotellist?.filter(function (x) {
        return x?.marshaCode
          ?.toUpperCase()
          .startsWith(inputvalue.toUpperCase());
      });
      if (valueName.length > 0) {
        contextType.setinputmarshacodeOnBlur(valueName[0].marshaCode);
      } else {
        if (!isAlert) {
          if (!enterClick) {
            alert(Settings.alertMsgs.invalidAlert);
          }
        }
        setIsAlert(true);
      }
    }
  };

  const periodhandleChange = (e) => {
    const value = contextType.state.periodlist?.filter(function (item) {
      return item.period == e.target.value;
    });
    contextType.setSelectedYear(value[0]);
  };

  const onyearselect = () => {
    if (
      contextType.state.selectedYear == null ||
      contextType.state.selectedYear == ""
    ) {
      //alert(Settings.alertMsgs.alert2);
    }
  };

  const onGoClick = (type) => {
    if (contextType.state.selectedYear === undefined) {
      const Periodvalue = contextType.state.periodlist?.filter(function (item) {
        return item;
      });
      contextType.state.selectedYear = Periodvalue[0].period;
    }
    const value = {
      period: contextType.state.selectedYear,
    };
    const marshaCode =
      contextType.state.selectedmarshacode.toUpperCase() ||
      contextType?.state?.inputmarshacode.toUpperCase();

    contextType.state.selectedmarshacode;

    parentContextType.setSelectedYear(value);
    contextType.setSelectedYear(value);
    if (marshaCode) {
      if (
        contextType.state.selecthotellist.find(
          (x) => x?.marshaCode?.toUpperCase() === marshaCode
        )
      ) {
        const hotel = contextType.state.selecthotellist?.filter(function (
          item
        ) {
          return item.marshaCode == marshaCode;
        });
        contextType.state.selectedmarshacode = hotel[0].marshaCode;
        contextType.state.hotelName = hotel[0].hotelName;
        window.sessionStorage.setItem("hotelName", hotel[0].hotelName);
        contextType.sethotelName(hotel[0].hotelName);

        hotelName = hotel[0].hotelName;

        if (marshaCode != undefined && marshaCode != "") {
          sessionStorage.setItem("MARSHACODE", marshaCode);
        }
        if (hotelName != undefined && hotelName != "") {
          sessionStorage.setItem("HOTELNAME", hotelName);
        }

        parentContextType.seturlDetails({
          period: contextType.state.selectedYear,
          marshaCode: marshaCode,
          hotelName: hotelName,
        });
        appContext?.setHotelPricingUrlDetails({
          marshaCode: marshaCode,
          hotelName: hotelName,
          period: contextType.state.selectedYear,
        });
        parentContextType?.setIsHotelSelectionChanged(true);
        /**MRFP-8305 browser back button click need to retain the saved data,
         * clearing the data in unmount
         */
        const refreshData = {
          marshaCode: contextType.state.selectedmarshacode,
          hotelName: hotelName,
          period: contextType.state.selectedYear,
          inputMarshaCode: contextType.state.inputmarshacode,
        };
        sessionStorage.setItem("hotelRefreshData", JSON.stringify(refreshData));
        history.push({
          pathname: `${Settings.parentRoute}/PriceContact`,
          search:
            "?&MarshaCode=" +
            marshaCode +
            "&Period=" +
            contextType.state.selectedYear +
            "&HotelName=" +
            hotelName,
        });
      } else {
        if (type === "enter") {
          alert(Settings.alertMsgs.invalidAlert);
        }
        alert("Please select a property");
      }
    } else {
      alert("Please select a property");
    }
  };

  return (
    <HotelPricingContext.Consumer>
      {(hotelPricing) => {
        parentContextType = hotelPricing;

        return (
          <HotelContextProvider>
            <HotelContext.Consumer>
              {(CenterallyPricedAccount) => {
                contextType = CenterallyPricedAccount;
                return (
                  <>
                    {!contextType.state.selecthotellist ? (
                      <img
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                        }}
                        src={screenLoader}
                      />
                    ) : (
                      <div>
                        <div className={styles.tableBody}>
                          {Settings.label.btPrice}
                        </div>
                        <div className={styles.horizontalLine}></div>
                        <table className={styles.table}>
                          <tbody className={styles.tableBody}>
                            <tr>
                              <td className={styles.fieldName}>
                                {Settings.label.selectProperty}
                              </td>
                              <td className={styles.width}></td>
                              <td align="left">
                                <select
                                  id="SelectedHotel"
                                  style={{
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                  value={contextType.state.selectedmarshacode?.toUpperCase()}
                                  onChange={handleChange}
                                >
                                  <option>
                                    &lt;{Settings.pleaseSelect}&gt;
                                  </option>
                                  {contextType.state.selecthotellist.map(
                                    (data) => (
                                      <option
                                        key={data.marshaCode}
                                        value={data.marshaCode}
                                      >
                                        {data.marshaCodeAndName}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>
                              {/**select period for property */}
                              <td>
                                <select
                                  id="switchAccountCenter"
                                  className={styles.switchAccountCenter}
                                  name="switchAccountCenter"
                                  defaultValue={contextType.state.selectedYear}
                                  value={contextType.state.selectedYear}
                                  onChange={periodhandleChange}
                                  onMouseLeave={onyearselect}
                                >
                                  {" "}
                                  {contextType.state.periodlist?.map((data) => (
                                    <option
                                      key={data.Period}
                                      value={data.period}
                                    >
                                      {data.period}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className={styles.space2}></td>
                              <td>
                                <img
                                  src={Go}
                                  onClick={() => onGoClick("directclick")}
                                />
                              </td>
                            </tr>
                            <tr>
                              {/**propert code input  */}
                              <td className={styles.fieldName}>
                                {Settings.label.propertyCodeInter}
                              </td>
                              <td className={styles.width}></td>
                              <td align="left">
                                <input
                                  className={styles.code}
                                  type="text"
                                  value={contextType.state.inputmarshacode}
                                  onBlur={onInputMarshaCode}
                                  maxLength={5}
                                  onKeyPress={() => {
                                    setIsAlert(false);
                                  }}
                                  onChange={contextType.handleChange1}
                                />
                              </td>
                              <td className={styles.space2}></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                );
              }}
            </HotelContext.Consumer>
          </HotelContextProvider>
        );
      }}
    </HotelPricingContext.Consumer>
  );
}
export default SelectHotelPricing;
