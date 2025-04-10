/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
import APIHotel from "../service/APIHotel";
import APISales from "../service/APISales";
import { useHistory } from "react-router-dom";
import Settings from "../../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import UserAPI, { IUser } from "../../../../common/services/GetUser";
import APILimitedSales from "../service/APILimitedSales";

// Set state variables and function
const SalesUpdateContactInfoContext = React.createContext({});

export const SalesUpdateContactInfoContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const [state, setState] = useState({
    showScreenLoader: false,
    isSalesUpdate: false,
    isMarketSales: false,
    isHomeUpdate: false,
    isLimitedHotelSorted: false,
    isLimitedAccountsSorted: false,
    role: null,
    hotelRespondent: {
      hotelRespondentid: 0,
      personname: null,
      personTitle: null,
      countrycode: 0,
      phonenumber: 0,
      faxnumber: null,
      areacitycode: null,
      email: null,
      eid: null,
    },
    Respondent: {
      Personal: {
        salesrespondentid: 0,
        eid: null,
        personname: null,
        personTitle: null,
        email: null,
        salestypeid: 0,
        saleslocationid: 0,
        salesregionid: 0,
        countrycode: 0,
        areacitycode: null,
        phonenumber: 0,
        faxnumber: null,
        mae: null,

        acctpage: {
          page: null,
        },
        htlpage: {
          page: null,
        },
        totalAcctPages: null,
        totalHtlPages: null,
        alreadyAssigned: false,
      },
      ResponArray: {
        accountSegmentList: [],
        salesRegionList: [],
        marketSalesRegionList: [],
        salesHotelNotSel: [],
        salesHotelSel2: [],
        linkedHotels: [],
        linkedAccounts: [],
        primaryContact: [],
      },
    },

    filter: {
      updateInfoSaleTypeOption: {
        id: "updateInfoSaleTypeOption",
        keyField: "accounttype",
        valField: "accounttypedescription",
      },
      updateInfoSaleRegionOption: {
        id: "updateInfoSaleRegionOption",
        keyField: "areaid",
        valField: "areaname",
      },
      updateInfoSaleAreaOption: {
        id: "updateInfoSaleAreaOption",
        keyField: "regionid",
        valField: "region",
      },
      hotelNotSelectedOption: {
        id: "hotelNotSelectedOption",
        keyField: "marshaCode",
        valField: "hotelName",
      },
      selectedHotelOption: {
        id: "selectedHotelOption",
        keyField: "marshaCode",
        valField: "hotelName",
      },
    },

    tempArray: {
      tempSelectHotelArr: [],
      tempSelectAcctArr: [],
      tempPrimaryAcct: [],
    },

    sourcehotelSelection: [],
    targethotelSelection: [],
    sourcehotelSelection1: [],
    targethotelSelection1: [],

    salesMudrromPC: [],
    totalPCPages: 0,
  });

  const [isChecked, setCheck] = useState(false);
  const [resetInput, setResetInput] = useState(false);
  const [viewPrimaryContactFlag, setViewPrimaryContactFlag] = useState(false);
  const [alertOnAccount, setAlertOnAccount] = useState(false);
  const [alertOnHotel, setAlertOnHotel] = useState(false);
  const [primaryGridLoader, setPrimaryGridLoader] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [alertModalMsg, setAlertModalMsg] = useState("");
  const [fromUserUpdateButtonClick, setFromUserUpdateButtonClick] =
    useState(false);
  const [fromSalesUpdateButtonClick, setFromSalesUpdateButtonClick] =
    useState(false);

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setSalesUpdateInfoData = (data, startFrom) => {
    let is_update = false;
    let is_market_sales = false;
    if (data) {
      const updateSalesInfoAPI = { ...state.Respondent };
      updateSalesInfoAPI.Personal.alreadyAssigned = data.alreadyAssigned;
      updateSalesInfoAPI.Personal.salesrespondentid =
        data.salesMudroom.salesrespondentid;
      updateSalesInfoAPI.Personal.eid = data.salesMudroom.eid;
      updateSalesInfoAPI.Personal.personname = data.salesMudroom.personname;
      updateSalesInfoAPI.Personal.personTitle = data.salesMudroom.persontitle;
      updateSalesInfoAPI.Personal.salestypeid = data.salesMudroom.salestypeid;
      updateSalesInfoAPI.Personal.saleslocationid =
        data.salesMudroom.saleslocationid;
      updateSalesInfoAPI.Personal.salesregionid =
        data.salesMudroom.salesregionid;
      updateSalesInfoAPI.Personal.email = data.salesMudroom.email;
      updateSalesInfoAPI.Personal.countrycode = data.salesMudroom.countrycode;
      updateSalesInfoAPI.Personal.areacitycode = data.salesMudroom.areacitycode;
      updateSalesInfoAPI.Personal.phonenumber = data.salesMudroom.phonenumber;
      updateSalesInfoAPI.Personal.faxnumber = data.salesMudroom.faxnumber;
      updateSalesInfoAPI.Personal.totalHtlPages = data.totalHtlPages;
      updateSalesInfoAPI.Personal.totalAcctPages = data.totalAcctPages;
      updateSalesInfoAPI.Personal.mae = data.salesMudroom.mae;

      updateSalesInfoAPI.ResponArray.accountSegmentList =
        data.accountSegmentList;
      updateSalesInfoAPI.ResponArray.salesRegionList = data.salesRegionList;
      updateSalesInfoAPI.ResponArray.marketSalesRegionList =
        data.marketSalesRegionList;
      updateSalesInfoAPI.ResponArray.salesHotelNotSel =
        data.salesMudroom.salesHotelNotSel;
      updateSalesInfoAPI.ResponArray.salesHotelSel2 =
        data.salesMudroom.salesHotelSel;
      updateSalesInfoAPI.ResponArray.linkedHotels =
        data.salesMudroom.linkedHotels;
      updateSalesInfoAPI.ResponArray.linkedAccounts =
        data.salesMudroom.linkedAccounts;
      updateSalesInfoAPI.ResponArray.primaryContact =
        data.salesMudroom?.primaryContact;
      if (updateSalesInfoAPI.ResponArray.primaryContact) {
        if (
          startFrom == "onmount" &&
          updateSalesInfoAPI.ResponArray.primaryContact.length > 0
        ) {
          updateSalesInfoAPI.Personal.acctpage.page = 1;
          updateSalesInfoAPI.Personal.htlpage.page = 1;
        }
      }

      is_update = data.salesMudroom.salesrespondentid == 0 ? false : true;
      is_market_sales = data.salesMudroom.salestypeid == 4 ? true : false;
      setState({
        ...state,
        isSalesUpdate: is_update,
        isMarketSales: is_market_sales,
        Respondent: updateSalesInfoAPI,
      });
    }
  };

  const setLimitedSalesUpdateInfoData = (data) => {
    if (data) {
      const updateSalesInfoAPI = { ...state };
      updateSalesInfoAPI.salesMudrromPC = data.salesMudrromPC;
      updateSalesInfoAPI.totalPCPages = data.totalPCPages;
      updateSalesInfoAPI.isMarketSales = false;
      setState(updateSalesInfoAPI);
    }
  };

  const setHotelInfoData = (data) => {
    let is_update = false;
    if (data) {
      const updateHotelInfoAPI = { ...state.hotelRespondent };
      updateHotelInfoAPI.hotelRespondentid = data.hotelRespondentid;
      updateHotelInfoAPI.personname = data.personName;
      updateHotelInfoAPI.personTitle = data.personTitle;
      updateHotelInfoAPI.countrycode = data.countryCode;
      updateHotelInfoAPI.phonenumber = data.phoneNumber;
      updateHotelInfoAPI.faxnumber = data.faxNumber;
      updateHotelInfoAPI.areacitycode = data.areaCityCode;
      updateHotelInfoAPI.email = data.email;
      updateHotelInfoAPI.eid = data.eid;
      is_update = data.hotelRespondentid == 0 ? false : true;

      setState({
        ...state,
        isHomeUpdate: is_update,
        hotelRespondent: updateHotelInfoAPI,
      });
    }
  };

  const handleDropdownChange = (event, str) => {
    const selectedData = { ...state };
    const value = event.target.value;
    if (str == "salesType") {
      selectedData.Respondent.Personal.salestypeid = value;
      selectedData.isMarketSales = value == "4" ? true : false;
      if (selectedData.isMarketSales) {
        selectedData.Respondent.ResponArray.salesHotelSel2 = [];
      }
    } else if (str == "salesRegion") {
      selectedData.Respondent.Personal.saleslocationid = parseInt(value);
    } else if (str == "salesArea") {
      selectedData.Respondent.Personal.salesregionid = value;
    }

    setState(selectedData);
    validateSalesFields();
  };

  const setHotelNotSelValue = (event) => {
    const updateArray = { ...state };
    let sourcehotelSelection = [];
    let targethotelSelection = [];

    const target = [...event.target.selectedOptions].map((option) => {
      return {
        marshaCode: option.id,
        hotelName: option.label.includes(`${option.id} - `)
          ? option.label.replace(`${option.id} - `, "")
          : option.label,
      };
    });

    sourcehotelSelection =
      updateArray.Respondent.ResponArray.salesHotelNotSel.filter(function (sh) {
        return !target.find(function (e) {
          return e.marshaCode == sh.marshaCode;
        });
      });

    if (targethotelSelection.length > 0) {
      targethotelSelection = targethotelSelection.filter(function (item) {
        return Object.values(target).indexOf(item) == -1;
      });
      targethotelSelection.push(Object.values(target));
    } else {
      targethotelSelection.push(Object.values(target));
    }

    setState({
      ...state,
      sourcehotelSelection: sourcehotelSelection,
      targethotelSelection: targethotelSelection,
    });
  };

  const moveRightHotelSelected = (event) => {
    const updateArray = { ...state };
    if (updateArray.Respondent.ResponArray.salesHotelSel2) {
      if (
        updateArray.targethotelSelection[0] &&
        updateArray.targethotelSelection[0].length > 0
      ) {
        updateArray.Respondent.ResponArray.salesHotelSel2 =
          updateArray.Respondent.ResponArray.salesHotelSel2.concat(
            updateArray.targethotelSelection[0]
          );
      }
    } else {
      updateArray.Respondent.ResponArray.salesHotelSel2 =
        updateArray.targethotelSelection[0];
    }

    if (updateArray.sourcehotelSelection.length > 0) {
      updateArray.Respondent.ResponArray.salesHotelNotSel =
        updateArray.sourcehotelSelection;
    }

    updateArray.sourcehotelSelection = [];
    updateArray.targethotelSelection = [];
    updateArray.sourcehotelSelection1 = [];
    updateArray.targethotelSelection1 = [];
    setState(updateArray);

    const elementsHotelNotSelected = document.getElementById(
      updateArray.filter.hotelNotSelectedOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsHotelNotSelected.length; ) {
      elementsHotelNotSelected[i].selected = false;
    }
  };

  const moveAllRightHotelSelected = (event) => {
    const updateArray = { ...state };
    if (updateArray.Respondent.ResponArray.salesHotelSel2?.length < 0) {
      if (updateArray.Respondent.ResponArray.salesHotelSel2) {
        updateArray.Respondent.ResponArray.salesHotelSel2 = [];
      }
      updateArray.Respondent.ResponArray.salesHotelSel2 =
        updateArray.Respondent.ResponArray.salesHotelNotSel;
    } else {
      updateArray.Respondent.ResponArray.salesHotelSel2 =
        updateArray.Respondent.ResponArray.salesHotelSel2 || [];
      updateArray.Respondent.ResponArray.salesHotelSel2.push(
        ...updateArray.Respondent.ResponArray.salesHotelNotSel
      );
    }

    updateArray.Respondent.ResponArray.salesHotelNotSel = [];
    setState(updateArray);
  };

  const moveLeftHotelSelected = (event) => {
    const updateArray = { ...state };
    if (updateArray.Respondent.ResponArray.salesHotelNotSel) {
      if (
        updateArray.targethotelSelection1[0] &&
        updateArray.targethotelSelection1[0].length > 0
      ) {
        updateArray.Respondent.ResponArray.salesHotelNotSel =
          updateArray.Respondent.ResponArray.salesHotelNotSel.concat(
            updateArray.targethotelSelection1[0]
          );
      }
    } else {
      updateArray.Respondent.ResponArray.salesHotelNotSel =
        updateArray.targethotelSelection1[0];
    }

    if (
      updateArray.sourcehotelSelection1.length > 0 ||
      updateArray.targethotelSelection1[0].length > 0
    ) {
      updateArray.Respondent.ResponArray.salesHotelSel2 =
        updateArray.sourcehotelSelection1;
    }

    updateArray.sourcehotelSelection = [];
    updateArray.targethotelSelection = [];
    updateArray.sourcehotelSelection1 = [];
    updateArray.targethotelSelection1 = [];
    setState(updateArray);

    const elementsHotelsSelected = document.getElementById(
      updateArray.filter.selectedHotelOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsHotelsSelected.length; ) {
      elementsHotelsSelected[i].selected = false;
    }
  };

  const moveAllLeftHotelSelected = (event) => {
    const updateArray = { ...state };
    if (updateArray.Respondent.ResponArray.salesHotelNotSel?.length < 0) {
      if (updateArray.Respondent.ResponArray.salesHotelNotSel) {
        updateArray.Respondent.ResponArray.salesHotelNotSel = [];
      }
      updateArray.Respondent.ResponArray.salesHotelNotSel =
        updateArray.Respondent.ResponArray.salesHotelSel2;
    } else {
      updateArray.Respondent.ResponArray.salesHotelNotSel =
        updateArray.Respondent.ResponArray.salesHotelNotSel || [];
      updateArray.Respondent.ResponArray.salesHotelNotSel.push(
        ...updateArray.Respondent.ResponArray.salesHotelSel2
      );
    }

    updateArray.Respondent.ResponArray.salesHotelSel2 = [];
    setState(updateArray);
  };

  const setRemoveHotelValue = (event) => {
    const updateArray = { ...state };
    let sourcehotelSelection1 = [];
    let targethotelSelection1 = [];

    const target_remove = [...event.target.selectedOptions].map((option) => {
      return {
        marshaCode: option.id,
        hotelName: option.label.includes(`${option.id} - `)
          ? option.label.replace(`${option.id} - `, "")
          : option.label,
      };
    });

    sourcehotelSelection1 =
      updateArray.Respondent.ResponArray.salesHotelSel2.filter(function (sh) {
        return !target_remove.find(function (e) {
          return e.marshaCode == sh.marshaCode;
        });
      });

    if (targethotelSelection1.length > 0) {
      targethotelSelection1 = targethotelSelection1.filter(function (item) {
        return Object.values(target_remove).indexOf(item) == -1;
      });
      targethotelSelection1.push(Object.values(target_remove));
    } else {
      targethotelSelection1.push(Object.values(target_remove));
    }

    setState({
      ...state,
      sourcehotelSelection1: sourcehotelSelection1,
      targethotelSelection1: targethotelSelection1,
    });
  };

  const setValidationData = (data, field) => {
    if (data) {
      const updateInfoData = { ...state };
      if (field === "title") {
        updateInfoData.Respondent.Personal.personTitle = data.personTitle;
      } else if (field === "email") {
        updateInfoData.Respondent.Personal.email = data.email;
      } else if (field === "countryCode") {
        updateInfoData.Respondent.Personal.countrycode = data.countrycode;
      } else if (field === "areaCode") {
        updateInfoData.Respondent.Personal.areacitycode = data.areacitycode;
      } else if (field === "phone") {
        updateInfoData.Respondent.Personal.phonenumber = data.phonenumber;
      } else if (field === "fax") {
        updateInfoData.Respondent.Personal.faxnumber = data.faxnumber;
      }
      setState(updateInfoData);
    }
  };

  const setValidationHotelData = (data, field) => {
    if (data) {
      const updateHotelInfoData = { ...state };
      if (field === "title") {
        updateHotelInfoData.hotelRespondent.personTitle = data.personTitle;
      } else if (field === "email") {
        updateHotelInfoData.hotelRespondent.email = data.email;
      } else if (field === "countryCode") {
        updateHotelInfoData.hotelRespondent.countrycode = data.countrycode;
      } else if (field === "areaCode") {
        updateHotelInfoData.hotelRespondent.areacitycode = data.areacitycode;
      } else if (field === "phone") {
        updateHotelInfoData.hotelRespondent.phonenumber = data.phonenumber;
      } else if (field === "fax") {
        updateHotelInfoData.hotelRespondent.faxnumber = data.faxnumber;
      }
      setState(updateHotelInfoData);
    }
  };

  const checkValidation = (role, isCalledFrom) => {
    let bOK = true;
    const updatedInfoData = { ...state.Respondent };
    if (role == "MFPSALES") {
      if (
        !updatedInfoData.Personal.personTitle ||
        !updatedInfoData.Personal.email ||
        !updatedInfoData.Personal.countrycode ||
        !updatedInfoData.Personal.phonenumber ||
        updatedInfoData.Personal.salestypeid == 0 ||
        (updatedInfoData.Personal.salestypeid == 4 &&
          updatedInfoData.Personal.saleslocationid == 0) ||
        (updatedInfoData.Personal.salestypeid == 4 &&
          updatedInfoData.Personal.salesregionid == 0)
      ) {
        bOK = false;
        if (isCalledFrom === "onSaveButtonClick") {
          setAlertModalMsg(Settings.updateContactInfo.salesContactAlert);
          setShowModalAlert(true);
        }
      }

      if (bOK) {
        if (updatedInfoData.Personal.email) {
          if (
            Settings.validation_details.re_email.test(
              updatedInfoData.Personal.email
            )
          ) {
            bOK = true;
          } else {
            bOK = false;
            if (isCalledFrom === "onSaveButtonClick") {
              setAlertModalMsg(
                Settings.updateContactInfo.salesEmailValidationAlert
              );
              setShowModalAlert(true);
            }
          }
        }
      }
    }

    if (role == "MFPFSALE") {
      if (
        !updatedInfoData.Personal.personTitle ||
        !updatedInfoData.Personal.email ||
        !updatedInfoData.Personal.countrycode ||
        !updatedInfoData.Personal.phonenumber
      ) {
        bOK = false;
        if (isCalledFrom === "onSaveButtonClick") {
          setAlertModalMsg(Settings.updateContactInfo.salesContactAlert);
          setShowModalAlert(true);
        }
      }

      if (bOK) {
        if (updatedInfoData.Personal.email) {
          if (
            Settings.validation_details.re_email.test(
              updatedInfoData.Personal.email
            )
          ) {
            bOK = true;
          } else {
            bOK = false;
            if (isCalledFrom === "onSaveButtonClick") {
              setAlertModalMsg(
                Settings.updateContactInfo.salesEmailValidationAlert
              );
              setShowModalAlert(true);
            }
          }
        }
      }
    }
    return bOK;
  };

  const checkValidationHotel = (isCalledFrom) => {
    let bOK = true;
    const updatedInfoHotelData = { ...state.hotelRespondent };

    if (
      !updatedInfoHotelData.personTitle ||
      !updatedInfoHotelData.email ||
      !updatedInfoHotelData.countrycode ||
      !updatedInfoHotelData.phonenumber
    ) {
      bOK = false;
      if (isCalledFrom === "onSaveButtonClick") {
        setAlertModalMsg(Settings.updateContactInfo.hotelContactAlert);
        setShowModalAlert(true);
      }
    }

    if (bOK) {
      if (updatedInfoHotelData.email) {
        if (
          Settings.validation_details.re_email.test(updatedInfoHotelData.email)
        ) {
          bOK = true;
        } else {
          bOK = false;
          if (isCalledFrom === "onSaveButtonClick") {
            setAlertModalMsg(
              Settings.updateContactInfo.hotelEmailValidationAlert
            );
            setShowModalAlert(true);
          }
        }
      }
    }
    return bOK;
  };

  const saveUpdateInfo = (role, isCalledFrom, isHotelAccountRemoval) => {
    let updateInfoDetails = {};
    const strAcctData = {};
    const strHotelData = {};
    const strPrimeContact = {};
    let strHotelSelected = "";
    const isValidated = checkValidation(role, isCalledFrom);

    if (isValidated) {
      const updateArray = { ...state };
      if (role == "MFPSALES") {
        if (updateArray.Respondent.ResponArray.salesHotelSel2?.length > 0) {
          updateArray.Respondent.ResponArray.salesHotelSel2.filter(function (
            item
          ) {
            strHotelSelected += item.marshaCode + ",";
          });
        }
        strHotelSelected = strHotelSelected.slice(0, -1);
        let strHotelSelectedToArr = strHotelSelected.split(",");
        strHotelSelectedToArr =
          strHotelSelectedToArr[0] == "" ? null : strHotelSelectedToArr;

        updateInfoDetails = {
          areacitycode: updateArray.Respondent.Personal.areacitycode,
          countrycode: updateArray.Respondent.Personal.countrycode,
          eid: updateArray.Respondent.Personal.eid,
          email: updateArray.Respondent.Personal.email,
          faxnumber: updateArray.Respondent.Personal.faxnumber,
          mae: "N",
          linkedAccounts: null,
          linkedHotels: null,
          personname: updateArray.Respondent.Personal.personname,
          persontitle: updateArray.Respondent.Personal.personTitle,
          phonenumber: updateArray.Respondent.Personal.phonenumber,
          salesrespondentid: updateArray.Respondent.Personal.salesrespondentid,
          salesHotelNotSel: updateArray.Respondent.ResponArray.salesHotelNotSel,
          salesHotelSel2: strHotelSelectedToArr,
          salestypeid: updateArray.Respondent.Personal.salestypeid,
          saleslocationid: updateArray.Respondent.Personal.saleslocationid,
          salesregionid: updateArray.Respondent.Personal.salesregionid,
        };
      } else if (role == "MFPFSALE") {
        updateInfoDetails = {
          areacitycode: updateArray.Respondent.Personal.areacitycode,
          countrycode: updateArray.Respondent.Personal.countrycode,
          eid: updateArray.Respondent.Personal.eid,
          email: updateArray.Respondent.Personal.email,
          faxnumber: updateArray.Respondent.Personal.faxnumber,
          mae: updateArray.Respondent.Personal.mae,
          personname: updateArray.Respondent.Personal.personname,
          persontitle: updateArray.Respondent.Personal.personTitle,
          phonenumber: updateArray.Respondent.Personal.phonenumber,
          salesrespondentid: updateArray.Respondent.Personal.salesrespondentid,
          salesHotelNotSel: [],
          salesHotelSel2: [],
          salestypeid: 0,
          saleslocationid: 0,
          salesregionid: 0,
        };
        strAcctData: {
        }
        strHotelData: {
        }
      }

      if (updateArray.Respondent.Personal.mae == "Y" && role == "MFPFSALE") {
        if (updateArray.Respondent.ResponArray.primaryContact?.length > 0) {
          updateArray.Respondent.ResponArray.linkedHotels.map((hotel) => {
            return (hotel.isCheckedValue =
              updateArray.tempArray.tempSelectHotelArr.find(
                (selectHotel) => hotel.marshaCode == selectHotel.marshaCode
              )
                ? "Y"
                : "N");
          });

          updateArray.Respondent.ResponArray.linkedAccounts.map((accounts) => {
            return (accounts.isCheckedValue =
              updateArray.tempArray.tempSelectAcctArr.find(
                (selectAccount) => accounts.accountid == selectAccount.accountid
              )
                ? "Y"
                : "N");
          });

          Object.values(updateArray.Respondent.ResponArray.linkedHotels).filter(
            function (item) {
              Object.assign(strHotelData, {
                [item.marshaCode]: item.isCheckedValue,
              });
            }
          );

          Object.values(
            updateArray.Respondent.ResponArray.linkedAccounts
          ).filter(function (item) {
            Object.assign(strAcctData, {
              [item.accountid]: item.isCheckedValue,
            });
          });
        }

        if (isHotelAccountRemoval == "removeHotelAcc") {
          Object.values(
            updateArray.Respondent.ResponArray.primaryContact
          ).filter(function (item, index) {
            Object.assign(strPrimeContact, {
              [index]: {
                accountID: item.accountID,
                accountname: item.accountname,
                email: "",
                hotelName: item.hotelName,
                marshaCode: item.marshaCode,
                pcChecked: item.pcChecked == true ? "Y" : "N",
                personname: "",
                phoneNumber: "",
              },
            });
          });

          updateArray.Respondent.ResponArray.primaryContact =
            updateArray.Respondent.ResponArray.primaryContact.filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.marshaCode === value.marshaCode &&
                    t.accountID === value.accountID &&
                    (t.checked == false ||
                      t.checked == undefined ||
                      t.pcChecked == false ||
                      t.pcChecked == undefined ||
                      t.pcChecked == "")
                )
            );
        } else {
          Object.values(
            updateArray.Respondent.ResponArray.primaryContact
          ).filter(function (item, index) {
            Object.assign(strPrimeContact, {
              [index]: {
                accountID: item.accountID,
                accountname: item.accountname,
                email: "",
                hotelName: item.hotelName,
                marshaCode: item.marshaCode,
                pcChecked: "N",
                personname: "",
                phoneNumber: "",
              },
            });
          });
        }

        updateArray.tempArray.tempSelectHotelArr = [];
        updateArray.tempArray.tempSelectAcctArr = [];
        updateArray.tempArray.tempPrimaryAcct = [];
        updateArray.Respondent.Personal.acctpage.page = 1;
        updateArray.Respondent.Personal.htlpage.page = 1;
        APILimitedSales.updateLimitedSalesMAEAccount(
          updateInfoDetails,
          strPrimeContact,
          strAcctData,
          strHotelData
        ).then((res) => {
          appContext.setAlreadyAssigned(res.alreadyAssigned);
            UserAPI.getUser().then((response) => {
              appContext.setUser(response as IUser);
              sessionStorage.setItem("GETUSERDETAILS", JSON.stringify(response));
            });
          
          setState(updateArray);
          if (isCalledFrom === "onSaveButtonClick") {
            setFromSalesUpdateButtonClick(true);
            history.push({
              pathname: "/",
            });
          }
        });
      } else {
        APISales.updateSalesAccount(updateInfoDetails).then((res) => {
            UserAPI.getUser().then((response) => {
              appContext.setUser(response as IUser);
              sessionStorage.setItem("GETUSERDETAILS", JSON.stringify(response));
            });
          
          setState(updateArray);
          if (isCalledFrom === "onSaveButtonClick") {
            setFromSalesUpdateButtonClick(true);
            history.push({
              pathname: "/",
            });
          }
        });
      }
    }
  };

  const saveUpdateHomeInfo = (isCalledFrom) => {
    const isValidated = checkValidationHotel(isCalledFrom);
    if (isValidated) {
      const updateHomeArray = { ...state.hotelRespondent };
      const updateHomeInfoDetails = {
        hotelRespondentid: updateHomeArray.hotelRespondentid,
        personName: updateHomeArray.personname,
        personTitle: updateHomeArray.personTitle,
        countryCode: updateHomeArray.countrycode,
        phoneNumber: updateHomeArray.phonenumber,
        faxNumber: updateHomeArray.faxnumber,
        areaCityCode: updateHomeArray.areacitycode,
        email: updateHomeArray.email,
        eid: updateHomeArray.eid,
      };
      APIHotel.updateHotelAccount(updateHomeInfoDetails).then((res) => {
        setState({
          ...state,
          hotelRespondent: updateHomeArray,
        });
        setFromUserUpdateButtonClick(true);
        UserAPI.getUser().then((response) => {
          appContext.setUser(response as IUser);
          sessionStorage.setItem("GETUSERDETAILS", JSON.stringify(response));
        });
        history.push({
          pathname: "/",
        });
      });
    }
  };

  const getSalesType = () => {
    let checkedSales = false;
    const updatedInfoData = { ...state.Respondent };
    return updatedInfoData.ResponArray.accountSegmentList?.map((item) => {
      checkedSales =
        item.accounttype == updatedInfoData.Personal.salestypeid ? true : false;
      return (
        <option value={item.accounttype} selected={checkedSales}>
          {item.accounttypedescription}
        </option>
      );
    });
  };

  const getRegionType = () => {
    let checkedRegion = false;
    const updatedInfoData = { ...state.Respondent };
    return updatedInfoData.ResponArray.salesRegionList?.map((item) => {
      checkedRegion =
        item.areaid == updatedInfoData.Personal.saleslocationid ? true : false;
      return (
        <option value={item.areaid} selected={checkedRegion}>
          {item.areaname}
        </option>
      );
    });
  };

  const validateSalesFields = () => {
    let bOK = true;
    let bOKEmail = true;
    const updatedInfoData = { ...state.Respondent };
    if (appContext.user.role == "MFPSALES") {
      if (
        !updatedInfoData.Personal.personTitle ||
        !updatedInfoData.Personal.email ||
        !updatedInfoData.Personal.countrycode ||
        !updatedInfoData.Personal.phonenumber ||
        updatedInfoData.Personal.salestypeid == 0 ||
        (updatedInfoData.Personal.salestypeid == 4 &&
          updatedInfoData.Personal.saleslocationid == 0) ||
        (updatedInfoData.Personal.salestypeid == 4 &&
          updatedInfoData.Personal.salesregionid == 0)
      ) {
        bOK = false;
      }

      if (bOK) {
        if (updatedInfoData.Personal.email) {
          if (
            Settings.validation_details.re_email.test(
              updatedInfoData.Personal.email
            )
          ) {
            bOK = true;
            bOKEmail = true;
          } else {
            bOK = false;
            bOKEmail = false;
          }
        }
      }
      bOK == false
        ? appContext.setUpdateSalesAlert(true)
        : appContext.setUpdateSalesAlert(false);
      bOKEmail == false
        ? appContext.setUpdateEmailSalesAlert(true)
        : appContext.setUpdateEmailSalesAlert(false);
    }

    if (appContext.user.role == "MFPFSALE") {
      if (
        !updatedInfoData.Personal.personTitle ||
        !updatedInfoData.Personal.email ||
        !updatedInfoData.Personal.countrycode ||
        !updatedInfoData.Personal.phonenumber
      ) {
        bOK = false;
      }

      if (bOK) {
        if (updatedInfoData.Personal.email) {
          if (
            Settings.validation_details.re_email.test(
              updatedInfoData.Personal.email
            )
          ) {
            bOK = true;
            bOKEmail = true;
          } else {
            bOK = false;
            bOKEmail = false;
          }
        }
      }

      bOK == false
        ? appContext.setUpdateLSAlert(true)
        : appContext.setUpdateLSAlert(false);
      bOKEmail == false
        ? appContext.setUpdateEmailSalesAlert(true)
        : appContext.setUpdateEmailSalesAlert(false);
    }

    return bOK;
  };

  const validateHotelFields = () => {
    let bOK = true;
    let bOKEmail = true;
    const updatedInfoHotelData = { ...state.hotelRespondent };

    if (
      !updatedInfoHotelData.personTitle ||
      !updatedInfoHotelData.email ||
      !updatedInfoHotelData.countrycode ||
      !updatedInfoHotelData.phonenumber
    ) {
      bOK = false;
    }

    if (bOK) {
      if (updatedInfoHotelData.email) {
        if (
          Settings.validation_details.re_email.test(updatedInfoHotelData.email)
        ) {
          bOK = true;
        } else {
          bOK = false;
          bOKEmail = false;
        }
      }
    }

    bOK == false
      ? appContext.setUpdateHUAlert(true)
      : appContext.setUpdateHUAlert(false);
    bOKEmail == false
      ? appContext.setUpdateHEAlert(true)
      : appContext.setUpdateHEAlert(false);
    return bOK;
  };

  const handleChangeInput = (event, type) => {
    if (type == "selectHotel") {
      handleChangeSelectHotelInput(event);
    } else if (type == "selectAccount") {
      handleChangeAccountInput(event);
    } else if (type == "selectPrimaryAcct") {
      handleChangeHotelAccountInput(event);
    }
  };

  const handleChangeSelectHotelInput = (event) => {
    setCheck(!isChecked);
    const hotelData = { ...state };
    if (hotelData.tempArray.tempSelectHotelArr.length > 0) {
      if (event.target.checked) {
        hotelData.tempArray.tempSelectHotelArr.push({
          acct_tracking: "N",
          affiliationid: null,
          changed: null,
          city: null,
          country: null,
          description: null,
          futureopening: null,
          hotelName: event.target.name,
          hotelid: event.target.id,
          marshaCode: event.target.value,
          state: null,
          checked: event.target.checked,
        });
      } else {
        hotelData.Respondent.ResponArray.linkedHotels.filter(
          (hotel) =>
            !hotelData.tempArray.tempSelectHotelArr.some(function (selectProp) {
              if (hotel.marshaCode == event.target.value) {
                hotel.checked = event.target.checked;
              }
            })
        );

        hotelData.tempArray.tempSelectHotelArr =
          hotelData.tempArray.tempSelectHotelArr.filter(function (item) {
            return item.marshaCode !== event.target.value;
          });
      }
    } else {
      hotelData.tempArray.tempSelectHotelArr.push({
        acct_tracking: "N",
        affiliationid: null,
        changed: null,
        city: null,
        country: null,
        description: null,
        futureopening: null,
        hotelName: event.target.name,
        hotelid: event.target.id,
        marshaCode: event.target.value,
        state: null,
        checked: event.target.checked,
      });
    }

    hotelData.Respondent.ResponArray.linkedHotels.filter(
      (hotel) =>
        !hotelData.tempArray.tempSelectHotelArr.some(function (selectProp) {
          if (hotel.marshaCode == event.target.value) {
            hotel.checked = event.target.checked;
          }
        })
    );

    setState(hotelData);
  };

  const handleChangeAccountInput = (event) => {
    setCheck(!isChecked);
    const accountData = { ...state };
    if (accountData.tempArray.tempSelectAcctArr.length > 0) {
      if (event.target.checked) {
        accountData.tempArray.tempSelectAcctArr.push({
          accountid: event.target.id,
          accountname: event.target.name,
          accountpricingtype: null,
          accountrecid: null,
          accounttypedescription: null,
          duedate: null,
          groupmeetings: "N",
          hotel_display: "N",
          period: null,
          top_account: "N",
          checked: !isChecked,
        });
      } else {
        accountData.Respondent.ResponArray.linkedAccounts.filter(
          (account) =>
            !accountData.tempArray.tempSelectAcctArr.some(function (
              selectAcct
            ) {
              if (account.accountid == event.target.id) {
                account.checked = event.target.checked;
              }
            })
        );

        accountData.tempArray.tempSelectAcctArr =
          accountData.tempArray.tempSelectAcctArr.filter(function (item) {
            return item.accountid !== event.target.id;
          });
      }
    } else {
      accountData.tempArray.tempSelectAcctArr.push({
        accountid: event.target.id,
        accountname: event.target.name,
        accountpricingtype: null,
        accountrecid: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
        checked: !isChecked,
      });
    }

    accountData.Respondent.ResponArray.linkedAccounts.filter(
      (account) =>
        !accountData.tempArray.tempSelectAcctArr.some(function (selectAcct) {
          if (account.accountid == event.target.id) {
            account.checked = event.target.checked;
          }
        })
    );

    setState(accountData);
  };

  const handleChangeHotelAccountInput = (event) => {
    setCheck(!isChecked);
    const idObtained = event.target.id.split("-");
    const nameObtained = event.target.name.split("-");
    const hotelAcctData = { ...state };
    if (hotelAcctData.tempArray.tempPrimaryAcct.length > 0) {
      if (event.target.checked) {
        hotelAcctData.tempArray.tempPrimaryAcct.push({
          acct_tracking: "N",
          affiliationid: null,
          changed: null,
          city: null,
          country: null,
          description: null,
          futureopening: null,
          hotelName: nameObtained[0],
          hotelid: null,
          marshaCode: event.target.value,
          state: null,
          accountid: idObtained[1],
          accountID: idObtained[1],
          accountname: nameObtained[1],
          accountpricingtype: null,
          accountrecid: null,
          accounttypedescription: null,
          duedate: null,
          groupmeetings: "N",
          hotel_display: "N",
          period: null,
          top_account: "N",
          checked: event.target.checked,
          pcChecked: event.target.checked,
        });
      } else {
        hotelAcctData.Respondent.ResponArray.primaryContact.filter(
          (hotelAcct) =>
            !hotelAcctData.tempArray.tempPrimaryAcct.some(function (
              selectProp
            ) {
              if (
                hotelAcct.marshaCode == event.target.value &&
                hotelAcct.accountID == idObtained[1]
              ) {
                hotelAcct.checked = event.target.checked;
                hotelAcct.pcChecked = event.target.checked;
              }
            })
        );

        hotelAcctData.tempArray.tempPrimaryAcct =
          hotelAcctData.tempArray.tempPrimaryAcct.filter(
            (value, index) =>
              index ===
              hotelAcctData.Respondent.ResponArray.primaryContact.findIndex(
                (t) => (t.checked = true)
              )
          );
      }
    } else {
      hotelAcctData.tempArray.tempPrimaryAcct.push({
        acct_tracking: "N",
        affiliationid: null,
        changed: null,
        city: null,
        country: null,
        description: null,
        futureopening: null,
        hotelName: nameObtained[0],
        hotelid: null,
        marshaCode: event.target.value,
        state: null,
        accountid: idObtained[1],
        accountID: idObtained[1],
        accountname: nameObtained[1],
        accountpricingtype: null,
        accountrecid: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
        checked: event.target.checked,
        pcChecked: event.target.checked,
      });
    }

    hotelAcctData.Respondent.ResponArray.primaryContact.filter(
      (hotel) =>
        !hotelAcctData.tempArray.tempPrimaryAcct.some(function (selectProp) {
          if (
            hotel.marshaCode == event.target.value &&
            hotel.accountID == idObtained[1]
          ) {
            hotel.checked = event.target.checked;
            hotel.pcChecked = event.target.checked;
          }
        })
    );

    setState(hotelAcctData);
  };

  const btnAddHotelAccount_onclick = (event) => {
    setPrimaryGridLoader(true);
    const towardsPrimaryArray = { ...state };
    if (
      towardsPrimaryArray.tempArray.tempSelectHotelArr.length <= 0 &&
      towardsPrimaryArray.tempArray.tempSelectHotelArr.length <= 0
    ) {
      setAlertOnHotel(true);
      setPrimaryGridLoader(false);
    } else if (
      towardsPrimaryArray.tempArray.tempSelectHotelArr.length <= 0 &&
      towardsPrimaryArray.tempArray.tempSelectAcctArr.length > 0
    ) {
      setAlertOnHotel(true);
      setPrimaryGridLoader(false);
    } else if (
      towardsPrimaryArray.tempArray.tempSelectAcctArr.length <= 0 &&
      towardsPrimaryArray.tempArray.tempSelectHotelArr.length > 0
    ) {
      setAlertOnHotel(true);
      setPrimaryGridLoader(false);
    } else {
      towardsPrimaryArray.tempArray.tempSelectHotelArr.filter(function (
        hotelItem
      ) {
        towardsPrimaryArray.tempArray.tempSelectAcctArr.filter(function (
          acctItem
        ) {
          towardsPrimaryArray.Respondent.ResponArray.primaryContact.push({
            acct_tracking: hotelItem.acct_tracking,
            affiliationid: hotelItem.affiliationid,
            changed: hotelItem.changed,
            city: hotelItem.city,
            country: hotelItem.country,
            description: hotelItem.description,
            futureopening: hotelItem.futureopening,
            hotelName: hotelItem.hotelName,
            hotelid: hotelItem.hotelid,
            marshaCode: hotelItem.marshaCode,
            state: hotelItem.state,
            accountID: acctItem.accountid,
            accountname: acctItem.accountname,
            accountpricingtype: acctItem.accountpricingtype,
            accountrecid: acctItem.accountrecid,
            accounttypedescription: acctItem.accounttypedescription,
            duedate: acctItem.duedate,
            groupmeetings: acctItem.groupmeetings,
            hotel_display: acctItem.hotel_display,
            period: acctItem.period,
            top_account: acctItem.top_account,
          });
        });
      });

      towardsPrimaryArray.Respondent.ResponArray.primaryContact =
        towardsPrimaryArray.Respondent.ResponArray.primaryContact.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.marshaCode === value.marshaCode &&
                t.accountID === value.accountID
            )
        );

      towardsPrimaryArray.Respondent.ResponArray.linkedHotels.filter(
        (hotel) =>
          !towardsPrimaryArray.tempArray.tempSelectHotelArr.some(function (
            selectHotel
          ) {
            if (hotel.marshaCode == selectHotel.marshaCode) {
              hotel.checked = false;
            }
          })
      );

      towardsPrimaryArray.Respondent.ResponArray.linkedAccounts.filter(
        (account) =>
          !towardsPrimaryArray.tempArray.tempSelectAcctArr.some(function (
            selectAcct
          ) {
            if (account.accountid == selectAcct.accountid) {
              account.checked = false;
            }
          })
      );
      setState(towardsPrimaryArray);
      saveUpdateInfo(appContext.user.role, "", "");
    }
  };

  const btnRemoveHotelAccount_onclick = (event) => {
    const towardsHotelAccount = { ...state };
    if (
      towardsHotelAccount.tempArray.tempPrimaryAcct.length <= 0 &&
      towardsHotelAccount.tempArray.tempPrimaryAcct.length <= 0
    ) {
      setAlertOnAccount(true);
    } else {
      towardsHotelAccount.tempArray.tempPrimaryAcct = [];
      setState(towardsHotelAccount);
      saveUpdateInfo(appContext.user.role, "", "removeHotelAcc");
    }
  };

  const setPageHotelNumber = (pageno) => {
    const pageNoData = { ...state };
    pageNoData.Respondent.Personal.htlpage.page = pageno;
    setState(pageNoData);

    const params = {
      orderBy: 0,
      strHtlpage: JSON.stringify({
        page: pageno,
        maxpagelen: pageNoData.Respondent.Personal.totalHtlPages,
      }),
      strAcctpage: JSON.stringify({
        page: pageNoData.Respondent.Personal.acctpage.page,
        maxpagelen: pageNoData.Respondent.Personal.totalAcctPages,
      }),
    };
    setLoader(true);
    APILimitedSales.getSalesUpdatePaginationInfo(params).then((data) => {
      setSalesUpdateInfoData(data, "");
      setLoader(false);
    });
  };

  const setPageAcctNumber = (pageno) => {
    const pageNoData = { ...state };
    pageNoData.Respondent.Personal.acctpage.page = pageno;
    setState(pageNoData);

    const params = {
      orderBy: 0,
      strHtlpage: JSON.stringify({
        page: pageNoData.Respondent.Personal.htlpage.page,
        maxpagelen: pageNoData.Respondent.Personal.totalHtlPages,
      }),
      strAcctpage: JSON.stringify({
        page: pageno,
        maxpagelen: pageNoData.Respondent.Personal.totalAcctPages,
      }),
    };
    setLoader(true);
    APILimitedSales.getSalesUpdatePaginationInfo(params).then((data) => {
      setSalesUpdateInfoData(data, "");
      setLoader(false);
    });
  };

  const changeOrderBy = (orderBy) => {
    const container = document.getElementById("primaryContactContainer");
    container.scrollTop = 0;
    const orderData = { ...state };
    if (!orderData.isLimitedHotelSorted && orderBy == 0) {
      orderData.isLimitedHotelSorted = true;
      orderData.isLimitedAccountsSorted = false;
      orderData.Respondent.ResponArray.primaryContact =
        orderData.Respondent.ResponArray.primaryContact.sort((a, b) =>
          a.marshaCode > b.marshaCode ? 1 : -1
        );
    }

    if (!orderData.isLimitedAccountsSorted && orderBy == 1) {
      orderData.isLimitedHotelSorted = false;
      orderData.isLimitedAccountsSorted = true;
      orderData.Respondent.ResponArray.primaryContact =
        orderData.Respondent.ResponArray.primaryContact.sort((a, b) =>
          a.accountname > b.accountname ? 1 : -1
        );
    }
    setState(orderData);
  };

  const seePrimaryContacts = (closeModal?: boolean) => {
    const value = closeModal ? !viewPrimaryContactFlag : viewPrimaryContactFlag;
    setViewPrimaryContactFlag(value);
  };

  const alertMessageOnAccount = (closeModal?: boolean) => {
    const value = closeModal ? !alertOnAccount : alertOnAccount;
    setAlertOnAccount(value);
  };

  const alertMessageOnHotel = (closeModal?: boolean) => {
    const value = closeModal ? !alertOnHotel : alertOnHotel;
    setAlertOnHotel(value);
  };

  const handleClose = () => {
    setViewPrimaryContactFlag(false);
  };

  const handleCloseAccountAlert = () => {
    setAlertOnAccount(false);
  };

  const handleCloseHotelAlert = () => {
    setAlertOnHotel(false);
  };

  const closeModalAlert = () => {
    setShowModalAlert(false);
  };

  const SalesUpdateContactInfo = {
    state,
    setState,
    setCheck,
    setResetInput,
    setLoader,
    viewPrimaryContactFlag,
    setViewPrimaryContactFlag,
    alertOnAccount,
    setAlertOnAccount,
    alertOnHotel,
    setAlertOnHotel,
    setSalesUpdateInfoData,
    handleDropdownChange,
    setHotelNotSelValue,
    moveRightHotelSelected,
    moveAllRightHotelSelected,
    moveLeftHotelSelected,
    moveAllLeftHotelSelected,
    setRemoveHotelValue,
    setValidationData,
    saveUpdateInfo,
    setLimitedSalesUpdateInfoData,
    setHotelInfoData,
    setValidationHotelData,
    saveUpdateHomeInfo,
    getSalesType,
    getRegionType,
    validateSalesFields,
    validateHotelFields,
    handleChangeInput,
    btnAddHotelAccount_onclick,
    btnRemoveHotelAccount_onclick,
    setPageHotelNumber,
    setPageAcctNumber,
    changeOrderBy,
    seePrimaryContacts,
    alertMessageOnAccount,
    alertMessageOnHotel,
    handleClose,
    handleCloseAccountAlert,
    handleCloseHotelAlert,
    primaryGridLoader,
    setPrimaryGridLoader,
    showModalAlert,
    setShowModalAlert,
    alertModalMsg,
    setAlertModalMsg,
    closeModalAlert,
    fromUserUpdateButtonClick,
    setFromUserUpdateButtonClick,
    fromSalesUpdateButtonClick,
    setFromSalesUpdateButtonClick,
  };

  return (
    <SalesUpdateContactInfoContext.Provider value={SalesUpdateContactInfo}>
      {props.children}
    </SalesUpdateContactInfoContext.Provider>
  );
};
export const SalesUpdateContactInfoConsumer =
  SalesUpdateContactInfoContext.Consumer;
export default SalesUpdateContactInfoContext;
