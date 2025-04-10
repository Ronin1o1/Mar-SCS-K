/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import styles from "./SelectHotelPricing.css";
import Go from "../assets/img/go.gif";
import API from "../service/API";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
//import { PropertyList } from "../../pricing/hotelPropertyList/content/PropertyList";

let periodlist;
let period;
let hotelrfpid;
let selInputmarshacode;
let selYear;
let urlName;

function SelectHotelPricing({ title }) {
  const [hotelList, setHotelList] = useState([]);
  const [selecthotellist, setSelecthotellist] = useState(false);
  const [periodList, setPeriodList] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [yearShow, setYearShow] = useState(false);
  const [inputmarshacode, setInputmarshacode] = useState();
  const [inputmarshacodeText, setInputmarshacodeText] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [enterClick, setEnterClick] = useState(false);
  const urlParms = useLocation().search;
  urlName = useLocation().pathname;
  sessionStorage.removeItem("MARSHACODE");
  sessionStorage.removeItem("HOTELNAME");
  const history = useHistory();
  useEffect(() => {
    if (
      history.location.pathname !== "/roomdeftext/dataElements" &&
      history.location.pathname !== "/roomdeftext/enterAmenity"
    ) {
      history.replace({
        search: "",
      });
      selInputmarshacode = "";
      setInputmarshacodeText("");
      API.getHotelSelect()
        .then((data) => {
          setHotelList(data.hotelList);
          setPeriodList(data.periodList);
          setSelecthotellist(true);
        })

        .catch((error) => {});
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [inputmarshacode]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setEnterClick(true);
      onGoClick("enter");
    }
  };

  const handleChange1 = (e) => {
    setInputmarshacode(e.target.value)
    setInputmarshacodeText(e.target.value);
  };

  const handleChange = (e) => {
    selInputmarshacode = e.target.value;
    setInputmarshacode(null);
    const value = hotelList?.filter(function (item) {
      return item.marshaCode == e.target.value;
    });

    selInputmarshacode = value[0].marshaCode;
    setInputmarshacode(value[0].marshaCode);
    setHotelName(value[0].hotelName);
    window.sessionStorage.setItem("hotelName", value[0].hotelName);

    if (selInputmarshacode == null || selInputmarshacode == "") {
      alert(Settings.alertMsgs.selectProperty);
    } else {
    }
  };

  const onInputMarshaCode = (e) => {
    setEnterClick(false);
    const inputvalue = e.target.value;
    if (inputvalue.length > 0) {
      const value = hotelList?.filter(function (x) {
        return x?.marshaCode
          ?.toUpperCase()
          .startsWith(inputvalue.toUpperCase());
      });
      if (value.length > 0) {
        selInputmarshacode = value[0].marshaCode;
        setInputmarshacode(value[0].marshaCode);
        setHotelName(value[0].hotelName);
        window.sessionStorage.setItem("hotelName", value[0].hotelName);
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
    selYear = e.target.value;
    const value = periodList?.filter(function (item) {
      return item.period == e.target.value;
    });

    setSelectedYear(value[0]);

    period = value[0].period;
    hotelrfpid = value[0].hotelrfpid;
  };

  const onyearselect = () => {
    if (selectedYear == null || selectedYear == null) {
      alert(Settings.alertMsgs.alert2);
    }
  };

  const onGoClick = (type) => {
    let finalHotelName;
    const value = hotelList?.filter(function (item) {
      return item.marshaCode == inputmarshacode.toUpperCase()
    });
    if(value.length > 0 && type === "enter"){
      finalHotelName = value[0].hotelName
    } else {
      finalHotelName = hotelName
    }
    if (inputmarshacode) {
      if (
        hotelList.find(
          (x) => x?.marshaCode?.toUpperCase() === inputmarshacode.toUpperCase()
        )
      ) {
        if (inputmarshacode != undefined && inputmarshacode != "") {
          sessionStorage.setItem("MARSHACODE", inputmarshacode);
        }
        if (finalHotelName != undefined && finalHotelName != "") {
          sessionStorage.setItem("HOTELNAME", finalHotelName);
        }

        if (urlName == "/roomdefhotelselect/select") {
          history.push({
            pathname: "/roomdefhotelselect/selectRoomPool",
            search:
              "?hotelName=" + finalHotelName + "&marshaCode=" + inputmarshacode?.toUpperCase(),
          });
        }
      } else {
        if (type === "enter") {
          alert(Settings.alertMsgs.invalidAlert);
        }
        alert(Settings.selectPropertyMsg);
      }
    } else {
      alert(Settings.selectPropertyMsg);
    }
  };

  useEffect(() => {
    if (inputmarshacode) {
      setInputmarshacode("");
      setInputmarshacodeText("");
      selInputmarshacode = "";
      sessionStorage.removeItem("MARSHACODE");
      sessionStorage.removeItem("HOTELNAME");
    }
  }, [history.location.key]);

  return (
    <React.Fragment>
      {selecthotellist ? (
        <div>
          <div className={styles.tableBody}>{title}</div>
          <div className={styles.horizontalLine}></div>
          <table className={styles.tableContainer}>
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
                    value={selInputmarshacode?.toUpperCase()}
                    onChange={handleChange}
                  >
                    <option>&lt;{Settings.pleaseSelect}&gt;</option>
                    {hotelList?.map((data) => (
                      <option key={data.marshaCode} value={data.marshaCode}>
                        {data.marshaCodeAndName}
                      </option>
                    ))}
                  </select>
                </td>
                {/**select period for property */}
                {yearShow && (
                  <td>
                    <select
                      id="switchAccountCenter"
                      className={styles.switchAccountCenter}
                      name="switchAccountCenter"
                      defaultValue={selYear}
                      value={selYear}
                      onChange={periodhandleChange}
                      onMouseLeave={onyearselect}
                    >
                      {" "}
                      <option value={styles.show}></option>
                      {periodList?.map((data) => (
                        <option key={data.Period} value={data.period}>
                          {data.period}
                        </option>
                      ))}
                    </select>
                  </td>
                )}

                <td className={styles.space2}></td>
                <td>
                  <img src={Go} onClick={()=> onGoClick("directclick")} />
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
                    defaultValue={"" || inputmarshacodeText}
                    onBlur={onInputMarshaCode}
                    maxLength={5}
                    onChange={handleChange1}
                    value={inputmarshacodeText}
                    onKeyPress={() => {
                      setIsAlert(false);
                    }}
                  />
                </td>
                <td className={styles.space2}></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <> {Settings.loaderMessage}</>
      )}
    </React.Fragment>
  );
}
export default SelectHotelPricing;
