import React, { useEffect, useState } from "react";
import btnFindSmall from "../../../../../common/assets/img/button/btnFindSmall.gif";
import btnFindNextSmall from "../../../../../common/assets/img/button/btnFindNextSmall.gif";
import btnSave from "../../../../../common/assets/img/button/btnSave.gif";
import btnSearchSmall from "../../../../../common/assets/img/button/btnSearchSmall.gif";
import styles from "./SearchBlackout.css";
import { MultpleBlackoutContextConsumer } from "../context/multipleBlackoutContextProvider";
import API from "../service/API";
import Settings from "../static/Settings";

let contextType = null;
export default function SearchBlackout(props) {
  const [findText, setFindText] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [matchedAccountsList, setMatchedAccountsList] = useState([]);

  useEffect(() => {
    if (areMatchedAccountsExistAndSearchNotFinished()) {
      const row = document.getElementById(
        `tr_${matchedAccountsList[selectedRowIndex].rowIndex}`
      );

      if (row) {
        const divElements = row && row.getElementsByTagName("div");
        const matchedDivElements =
          divElements &&
          divElements.length > 0 &&
          Array.from(divElements).filter(
            (element) =>
              element.outerText
                ?.toLowerCase()
                .includes(findText?.toLowerCase()) &&
              element.id ==
                `div${matchedAccountsList[
                  selectedRowIndex
                ].accountIndex.toString()}`
          );

        if (matchedDivElements && matchedDivElements.length > 0) {
          matchedDivElements[0].scrollIntoView(true);
          contextType.handleRowSelection(
            matchedAccountsList[selectedRowIndex].rowIndex
          );
        }
      }
    }
  }, [selectedRowIndex, matchedAccountsList]);

  useEffect(() => {
    return () => {
      if (isStartEndDateNotFilled()) {
        //contextType.updateBlackouts();
        contextType.setBlackoutDateValidation(true);
      }
      contextType.componentUnload();
    };
  }, []);

  function isStartEndDateNotFilled() {
    let validation = true;
    for (let i = 0; i < contextType.accountBlackoutGroup.length; i++) {
      for (
        let j = 0;
        j < contextType.accountBlackoutGroup[i].blackouts.length;
        j++
      ) {
        if (
          !!contextType.accountBlackoutGroup[i].blackouts[j].startdate ||
          !!contextType.accountBlackoutGroup[i].blackouts[j].enddate ||
          !!contextType.accountBlackoutGroup[i].blackouts[j].name
        ) {
          if (
            contextType.accountBlackoutGroup[i].blackouts[j].startdate === ""
          ) {
            contextType.setAlertMessage(Settings.alertMessage.enterStartDate);
            contextType.setShowModal(true);
            validation = false;
            break;
          } else if (
            contextType.accountBlackoutGroup[i].blackouts[j].enddate === ""
          ) {
            contextType.setAlertMessage(Settings.alertMessage.enterEndDate);
            contextType.setShowModal(true);
            validation = false;
            break;
          } else if (
            contextType.accountBlackoutGroup[i].blackouts[j].name === ""
          ) {
            contextType.setAlertMessage(
              Settings.alertMessage.enterBlackoutName
            );
            contextType.setShowModal(true);
            validation = false;
            break;
          }
        }
        if (!validation) break;
      }
      if (!validation) break;
    }
    return validation;
  }
  function btnSaveClicked() {
    if (isStartEndDateNotFilled()) {
      contextType.updateBlackouts(true);
      props.onSave();
    }
  }
  function btnFindClicked() {
    if (findText == "") {
      contextType.setActiveRow(-1);
      return;
    }
    const matchedAccounts = contextType.allAccounts.filter(
      isMatchingAccountName
    );
    if (matchedAccounts && matchedAccounts.length) {
      setSelectedRowIndex(0);
      contextType.setActiveRow(-1);
      setMatchedAccountsList(matchedAccounts);
    }
    setSelectedRowIndex(0);
    contextType.setActiveRow(-1);
  }
  function btnFindNextClicked() {
    if (matchedAccountsList && matchedAccountsList.length) {
      if (areMatchedAccountsExistAndSearchNotFinished()) {
        setSelectedRowIndex(selectedRowIndex + 1);
      } else if (areMatchedAccountsExistAndSearchFinished()) {
        btnFindClicked();
      }
    } else {
      btnFindClicked();
    }
  }
  function isMatchingAccountName(account) {
    return (
      account.accountName &&
      account.accountName.toLowerCase().includes(findText.toLowerCase())
    );
  }
  function areMatchedAccountsExistAndSearchNotFinished() {
    return (
      matchedAccountsList &&
      matchedAccountsList.length &&
      selectedRowIndex < matchedAccountsList.length
    );
  }
  function areMatchedAccountsExistAndSearchFinished() {
    return (
      matchedAccountsList &&
      matchedAccountsList.length &&
      selectedRowIndex >= matchedAccountsList.length
    );
  }
  function updateSearchParams(event) {
    let params = contextType.blackoutParams;
    params = { ...params, searchtype: event.target.value };
    sessionStorage.setItem("searchtype", event.target.value);
    contextType.setBlackoutParams(params);
  }
  function btnSearchClicked() {
    if (isStartEndDateNotFilled()) {
      setFindText("");
      const ele = document.getElementById("tr_0");
      if (ele) {
        ele.scrollIntoView(true);
      }
      contextType.setActiveRow(-1);
      contextType.setIsMakingRequest(true);
      API.getHotelAccountBlackout(contextType.blackoutParams).then((data) => {
        contextType.setIsMakingRequest(false);
        contextType.setAccountBlackoutGroup([]);
        contextType.setAllAccounts([]);
        contextType.setBlackoutsData(
          data.accountBlackoutGroup,
          data.numblackouts
        );
      });
    }
  }
  return (
    <MultpleBlackoutContextConsumer>
      {(multipleBlackoutContext) => {
        contextType = multipleBlackoutContext;
        return (
          <table className={styles.zeroHeight}>
            <tbody>
              <tr>
                <td>
                  <div
                    className={styles.filter}
                    style={{
                      width: "320px",
                      height: "30px",
                      borderTopWidth: "1px",
                      borderBottomStyle: "solid",
                      borderRightWidth: "1px",
                      borderLeftStyle: "solid",
                      borderTopStyle: "solid",
                      borderBottomWidth: "1px",
                      borderRightStyle: "solid",
                      borderLeftWidth: "1px",
                      borderColor: "#cccccc",
                      backgroundColor: "#eff0ec",
                    }}
                  >
                    <table
                      className="zero-Height"
                      style={{ width: "310px", height: "25px" }}
                    >
                      <tbody>
                        <tr>
                          <td className={styles.fieldName}>
                            Show:
                            <select
                              id={Settings.searchtype}
                              name={Settings.searchtype}
                              onChange={(e) => {
                                updateSearchParams(e);
                              }}
                              value={
                                sessionStorage.getItem("searchtype")
                                  ? sessionStorage.getItem("searchtype")
                                  : contextType.blackoutParams.searchtype
                              }
                            >
                              <option value="A">All priced accounts</option>
                              <option value="P">All presented accounts</option>
                              <option value="V">
                                All priced BUT not presented accounts
                              </option>
                            </select>
                          </td>
                          <td>
                            <img
                              onClick={btnSearchClicked}
                              src={btnSearchSmall}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td style={{ width: "20px" }}></td>
                <td>
                  <div
                    className={styles.filter}
                    style={{
                      width: "350px",
                      height: "30px",
                      borderTopWidth: "1px",
                      borderBottomStyle: "solid",
                      borderRightWidth: "1px",
                      borderLeftStyle: "solid",
                      borderTopStyle: "solid",
                      borderBottomWidth: "1px",
                      borderRightStyle: "solid",
                      borderLeftWidth: "1px",
                      borderColor: "#cccccc",
                      backgroundColor: "#eff0ec",
                    }}
                  >
                    <table
                      className={styles.zeroHeight}
                      style={{ width: "350px", height: "25px" }}
                    >
                      <tbody>
                        <tr>
                          <td className={styles.fieldName}>
                            Find Account:
                            <input
                              id={Settings.filterString}
                              name={Settings.filterString}
                              onChange={(e) => {
                                setFindText(e.target.value);
                              }}
                              value={findText}
                            />
                          </td>
                          <td>
                            <img onClick={btnFindClicked} src={btnFindSmall} />
                            <img
                              style={{ marginLeft: "3px" }}
                              onClick={btnFindNextClicked}
                              src={btnFindNextSmall}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr style={{ height: "10px" }}>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img onClick={btnSaveClicked} src={btnSave} />
                </td>
              </tr>
            </tbody>
          </table>
        );
      }}
    </MultpleBlackoutContextConsumer>
  );
}
