import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./HotelRateProductSelect.css";
import API from "../service/API";
import Settings from "../static/Settings";
import HotelRateProductSelectContext from "../context/HotelRateProductSelectContext";
import Go from "../../../common/assets/img/go.gif";
//import HotelFormattedTabs from "./HotelFormattedTabs";
import { CLoader } from "../../../common/components/CLoader";
import { Layout } from "../routing/Layout";

let contextType = null;
function HotelRateProductSelect() {
  const [isAlert, setIsAlert] = useState(false);
  const [enterClick, setEnterClick] = useState(false);
  const history = useHistory();
  useEffect(() => {
    contextType.clearData();
    API.getSelectHotelListDetails().then((res) => {
      contextType.getHotelList(res);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    contextType?.state?.selectedYear,
    contextType?.state?.selectedmarshacode,
    contextType?.state?.inputmarshacode,
  ]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setEnterClick(true);
      onGoClick("enter");
    }
  };

  const handleChange = (e) => {
    contextType.handleChangeProperty(e);
  };

  const onGoClick = (type) => {
    let inputMarsacode;
    if (type === "enter") {
      inputMarsacode = contextType?.state?.selectedMarshaCode;
    } else {
      inputMarsacode = contextType?.state?.inputmarshacode;
    }

    let finalHotelName;
    const value = contextType.state.hotelList?.filter(function (item) {
      return item.marshaCode == inputMarsacode.toUpperCase();
    });
    if (value.length > 0 && type === "enter") {
      finalHotelName = value[0].hotelName;
    } else {
      finalHotelName = contextType.state.hotelName;
    }
    if (inputMarsacode) {
      if (
        contextType.state.hotelList.find(
          (item) =>
            item?.marshaCode?.toUpperCase() === inputMarsacode.toUpperCase()
        )
      ) {
        if (inputMarsacode != undefined && inputMarsacode != "") {
          sessionStorage.setItem("MARSHACODE", inputMarsacode);
        }
        if (finalHotelName != undefined && finalHotelName != "") {
          sessionStorage.setItem("HOTELNAME", finalHotelName);
        }
        history.push({
          pathname: `${Settings.viewparentRoute}/viewDescription`,
          search:
            "?marshaCode=" +
            inputMarsacode?.toUpperCase() +
            "&hotelName=" +
            finalHotelName,
        });
      } else {
        if (type === "enter") {
          alert(Settings.alert.invalidMarshaCode);
        }
        alert(Settings.alert.selectProperty);
      }
    } else {
      alert(Settings.alert.selectProperty);
    }
  };

  useEffect(() => {
    if (contextType.state.inputmarshacode) {
      contextType.clearData();
      sessionStorage.removeItem("MARSHACODE");
      sessionStorage.removeItem("HOTELNAME");
    }
  }, [history.location.key]);

  const onInputMarshaCode = (e) => {
    setEnterClick(false);
    const inputvalue = e.target.value;
    let valueName = [];
    if (inputvalue.length > 0) {
      valueName = contextType.state.hotelList?.filter(function (x) {
        return x?.marshaCode
          ?.toUpperCase()
          .startsWith(inputvalue.toUpperCase());
      });
      if (valueName.length > 0) {
        contextType.setMarshaOnBlur(
          valueName[0].marshaCode,
          valueName[0].hotelName
        );
      } else {
        if (!isAlert) {
          if (!enterClick) {
            alert(Settings.alert.invalidMarshaCode);
          }
        }
        setIsAlert(true);
      }
    }
  };

  return (
    <Layout>
      <HotelRateProductSelectContext.Consumer>
        {(hotelRateProductSelect) => {
          contextType = hotelRateProductSelect;

          return contextType.state.showLoading ? (
            <CLoader />
          ) : (
            <div>
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
                        className={styles.selectedHotelData}
                        onChange={handleChange}
                        value={contextType.state.inputmarshacode?.toUpperCase()}
                      >
                        <option>&lt;{Settings.pleaseSelect}&gt;</option>
                        {contextType.state.hotelList?.map((data) => (
                          <option key={data.marshaCode} value={data.marshaCode}>
                            {data.marshaCodeAndName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.space2}></td>
                    <td>
                      <img
                        src={Go}
                        onClick={() => onGoClick("directclick")}
                        className={styles.goBtn}
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
                        value={contextType.state.selectedMarshaCode}
                        maxLength={5}
                        onChange={(event) => {
                          contextType.handleMarshaChange(event);
                        }}
                        onBlur={onInputMarshaCode}
                        onKeyPress={() => {
                          setIsAlert(false);
                        }}
                      />
                    </td>
                    <td className={styles.space2}></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>{" "}
              : <tr></tr>
            </div>
          );
        }}
      </HotelRateProductSelectContext.Consumer>
    </Layout>
  );
}

export default HotelRateProductSelect;
