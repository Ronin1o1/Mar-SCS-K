import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SelectHotel.css";
import API from "../service/API";
import Settings from "../static/Settings";
import SelectHotelContext from "../context/SelectHotelContext";
import Go from "../../../common/assets/img/go.gif";
import HotelFormattedTabs from "./HotelFormattedTabs";

let contextType = null;
function SelectHotel() {
  const [isAlert, setIsAlert] = useState(false);
  const [enterClick, setEnterClick] = useState(false);
  const history = useHistory();
  useEffect(() => {
    contextType.clearData();
    API.getSelectHotelListDetails().then((res) => {
      contextType.getHotelList(res);
    });
  }, []);

  const handleChange = (e) => {
    contextType.handleChangeProperty(e);
  };

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
      const data = contextType.state.hotelList.find(
        (item) =>
          item?.marshaCode?.toUpperCase() === inputMarsacode.toUpperCase()
      );

      if (data) {
        contextType.setState({
          ...contextType.state,
          hotelName: data.hotelName,
        });

        if (inputMarsacode != undefined && inputMarsacode != "") {
          sessionStorage.setItem("MARSHACODE", inputMarsacode);
        }
        if (finalHotelName != undefined && finalHotelName != "") {
          sessionStorage.setItem("HOTELNAME", finalHotelName);
        }

        history.push({
          pathname: `${Settings.parentRoute}/getRoomPools`,
          search:
            "?marshaCode=" +
            inputMarsacode.toUpperCase() +
            "&hotelName=" +
            (finalHotelName && finalHotelName != ""
              ? finalHotelName
              : data.hotelName),
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
        contextType.setMarshaOnBlur(valueName[0].marshaCode);
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
    <SelectHotelContext.Consumer>
      {(selectHotelContext) => {
        contextType = selectHotelContext;
        return (
          <div>
            <HotelFormattedTabs />
            <div className={styles.tableBody}>
              {Settings.label.HotelSelection}
            </div>
            <div className={styles.horizontalLine}></div>
            {contextType.state.showLoading == true ? (
              Settings.loaderMessage
            ) : contextType.state.hotelList?.length != 0 ? (
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
                    <td className={styles.tdImage}>
                      <img src={Go} onClick={() => onGoClick("directclick")} />
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
              </table>
            ) : (
              <tr>
                <td>
                  {Settings.noData}
                  {contextType.state.contactEmail} .
                </td>
              </tr>
            )}
          </div>
        );
      }}
    </SelectHotelContext.Consumer>
  );
}

export default SelectHotel;
