/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from "react";
import API from "../service/API";
import Settings from "../../static/Settings";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import UserAPI, { IUser } from "../../../../common/services/GetUser";

// Set state variables and function
const UpdateContactInfoContext = React.createContext({});

export const UpdateContactInfoContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const [state, setState] = useState({
    showScreenLoader: false,
    isUpdate: false,
    accountSegmentList: [],
    adminRespondent: {
      numOfPrimaryAvail: 0,
      numOfPrimarySelect: 0,
      numOfSecAvail: 0,
      numOfSecSelect: 0,
      adminRespondentPersonal: {
        adminLocationid: 0,
        adminRespondentid: 0,
        areacitycode: 0,
        countrycode: 0,
        eid: null,
        email: null,
        faxnumber: 0,
        last_updatedate: null,
        personName: null,
        personTitle: null,
        phonenumber: 0,
        period: null,
        locationid: "0",
        selectedLocation: 0,
        availableSalesType: [],
        selectedSalesType: [],
        primaryAccount: [],
        selectedPrimaryAccount: [],
        marketSelected: "N",
        changingPeriod: "N",
        periodList: [],
      },

      adminRespondentArray: {
        acctMktRgnNotSel: [],
        acctMktRgnSel: [],
        acctMktRgnSel2: [],

        primeAccountNotSel: [],
        primeAccountSel: [],
        primeAccountSel2: [],

        salesTypesNotSel: [],
        salesTypesSel: [],
        salesTypesSel2: [],

        secAccountNotSel: [],
        secAccountSel: [],
        secAccountSel2: [],

        locationList: [],
        periodList: [],
      },
    },

    filter: {
      updateInfoLocationOption: {
        id: "updateInfoLocationOption",
        keyField: "locationid",
        valField: "location",
      },
      availableSalesOption: {
        id: "availableSalesOption",
        keyField: "accounttype",
        valField: "accounttypedescription",
      },
      selectedSalesOption: {
        id: "selectedSalesOption",
        keyField: "accounttype",
        valField: "accounttypedescription",
      },
      primaryAccountOption: {
        id: "primaryAccountOption",
        keyField: "accountrecid",
        valField: "accountname",
      },
      selectedPrimaryAccountOption: {
        id: "selectedPrimaryAccountOption",
        keyField: "accountrecid",
        valField: "accountname",
      },
      secondaryAccountOption: {
        id: "secondaryAccountOption",
        keyField: "accountrecid",
        valField: "accountname",
      },
      selectedSecondaryAccountOption: {
        id: "selectedSecondaryAccountOption",
        keyField: "accountrecid",
        valField: "accountname",
      },
    },

    sourceSaleSelection: [],
    targetSaleSelection: [],
    sourceSaleSelection1: [],
    targetSaleSelection1: [],

    sourcePrimarySelection: [],
    targetPrimarySelection: [],
    sourcePrimarySelection1: [],
    targetPrimarySelection1: [],

    sourceSecondarySelection: [],
    targetSecondarySelection: [],
    sourceSecondarySelection1: [],
    targetSecondarySelection1: [],
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const [showModalAlert, setShowModalAlert] = useState(false);
  const [alertModalMsg, setAlertModalMsg] = useState("");
  const [fromUpdateButtonClick, setFromUpdateButtonClick] = useState(false);
  const [multipleAlertMessages, setMultipleAlertMessages] = useState(null);

  const setUpdateInfoData = (data) => {
    let is_update = false;

    if (data) {
      const updateInfoAPI = { ...state.adminRespondent };
      updateInfoAPI.adminRespondentPersonal.adminLocationid =
        data.adminRespondent.adminLocationid;
      updateInfoAPI.adminRespondentPersonal.adminRespondentid =
        data.adminRespondent.adminRespondentid;
      updateInfoAPI.adminRespondentPersonal.areacitycode =
        data.adminRespondent.areaCityCode;
      updateInfoAPI.adminRespondentPersonal.countrycode =
        data.adminRespondent.countryCode;
      updateInfoAPI.adminRespondentPersonal.eid = data.adminRespondent.eid;
      updateInfoAPI.adminRespondentPersonal.email = data.adminRespondent.email;
      updateInfoAPI.adminRespondentPersonal.faxnumber =
        data.adminRespondent.faxNumber;
      updateInfoAPI.adminRespondentPersonal.last_updatedate =
        data.adminRespondent.last_updatedate;
      updateInfoAPI.adminRespondentPersonal.personName =
        data.adminRespondent.personName;
      updateInfoAPI.adminRespondentPersonal.personTitle =
        data.adminRespondent.personTitle;
      updateInfoAPI.adminRespondentPersonal.phonenumber =
        data.adminRespondent.phoneNumber;
      updateInfoAPI.adminRespondentPersonal.period = data.period;
      updateInfoAPI.adminRespondentPersonal.periodList = data.periodList;
      updateInfoAPI.adminRespondentPersonal.locationid =
        data.adminRespondent.adminLocationid;
      updateInfoAPI.adminRespondentPersonal.selectedLocation =
        data.adminRespondent.adminLocationid;

      updateInfoAPI.adminRespondentArray.locationList = data.locationList;
      updateInfoAPI.adminRespondentArray.salesTypesNotSel =
        data.adminRespondent.salesTypesNotSel;
      updateInfoAPI.adminRespondentArray.salesTypesSel2 =
        data.adminRespondent.salesTypesSel;
      updateInfoAPI.adminRespondentArray.primeAccountNotSel =
        data.adminRespondent.primeAccountNotSel;
      updateInfoAPI.numOfPrimaryAvail = updateInfoAPI.adminRespondentArray
        .primeAccountNotSel
        ? updateInfoAPI.adminRespondentArray.primeAccountNotSel.length
        : 0;
      updateInfoAPI.adminRespondentArray.primeAccountSel2 =
        data.adminRespondent.primeAccountSel;
      updateInfoAPI.numOfPrimarySelect = updateInfoAPI.adminRespondentArray
        .primeAccountSel2
        ? updateInfoAPI.adminRespondentArray.primeAccountSel2.length
        : 0;
      updateInfoAPI.adminRespondentArray.secAccountNotSel =
        data.adminRespondent.secAccountNotSel;
      updateInfoAPI.numOfSecAvail = updateInfoAPI.adminRespondentArray
        .secAccountNotSel
        ? updateInfoAPI.adminRespondentArray.secAccountNotSel.length
        : 0;
      updateInfoAPI.adminRespondentArray.secAccountSel2 =
        data.adminRespondent.secAccountSel;
      updateInfoAPI.numOfSecSelect = updateInfoAPI.adminRespondentArray
        .secAccountSel2
        ? updateInfoAPI.adminRespondentArray.secAccountSel2.length
        : 0;

      is_update = data.adminRespondent.adminRespondentid == 0 ? false : true;

      setState({
        ...state,
        isUpdate: is_update,
        adminRespondent: updateInfoAPI,
      });
    }
  };

  const setValidationData = (data, field) => {
    if (data) {
      const updateInfoData = { ...state };
      if (field === "title") {
        updateInfoData.adminRespondent.adminRespondentPersonal.personTitle =
          data.personTitle;
      } else if (field === "email") {
        updateInfoData.adminRespondent.adminRespondentPersonal.email =
          data.email;
      } else if (field === "countryCode") {
        updateInfoData.adminRespondent.adminRespondentPersonal.countrycode =
          data.countrycode;
      } else if (field === "areaCode") {
        updateInfoData.adminRespondent.adminRespondentPersonal.areacitycode =
          data.areacitycode;
      } else if (field === "phone") {
        updateInfoData.adminRespondent.adminRespondentPersonal.phonenumber =
          data.phonenumber;
      } else if (field === "fax") {
        updateInfoData.adminRespondent.adminRespondentPersonal.faxnumber =
          data.faxnumber;
      }
      setState(updateInfoData);
    }
  };

  const setSaleValue = (event) => {
    const adminArray = { ...state };
    let sourceSaleSelection = [];
    let targetSaleSelection = [];

    const tempSelectOption = [...event.target.selectedOptions].map((option) => {
      return {
        accounttype: option.id,
        accounttypedescription: option.label,
        defaultcom: null,
      };
    });

    sourceSaleSelection =
      adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel.filter(
        function (cv) {
          return !tempSelectOption.find(function (e) {
            return e.accounttype == cv.accounttype;
          });
        }
      );

    if (targetSaleSelection.length > 0) {
      targetSaleSelection = targetSaleSelection.filter(function (item) {
        return Object.values(tempSelectOption).indexOf(item) == -1;
      });
      targetSaleSelection.push(Object.values(tempSelectOption));
    } else {
      targetSaleSelection.push(Object.values(tempSelectOption));
    }

    setState({
      ...state,
      sourceSaleSelection: sourceSaleSelection,
      targetSaleSelection: targetSaleSelection,
    });
  };

  const setRemoveSaleValue = (event) => {
    const adminArray = { ...state };
    let sourceSaleSelection1 = [];
    let targetSaleSelection1 = [];

    const target_remove = [...event.target.selectedOptions].map((option) => {
      return {
        accounttype: option.id,
        accounttypedescription: option.label,
        defaultcom: null,
      };
    });

    sourceSaleSelection1 =
      adminArray.adminRespondent.adminRespondentArray.salesTypesSel2.filter(
        function (cv) {
          return !target_remove.find(function (e) {
            return e.accounttype == cv.accounttype;
          });
        }
      );

    if (targetSaleSelection1.length > 0) {
      targetSaleSelection1 = targetSaleSelection1.filter(function (item) {
        return Object.values(target_remove).indexOf(item) == -1;
      });
      targetSaleSelection1.push(Object.values(target_remove));
    } else {
      targetSaleSelection1.push(Object.values(target_remove));
    }

    setState({
      ...state,
      sourceSaleSelection1: sourceSaleSelection1,
      targetSaleSelection1: targetSaleSelection1,
    });
  };

  const moveRightSelected = (event) => {
    let isMarketSelected = "N";
    const adminArray = { ...state };
    if (adminArray.adminRespondent.adminRespondentArray.salesTypesSel2) {
      if (
        adminArray.targetSaleSelection[0] &&
        adminArray.targetSaleSelection[0].length > 0
      ) {
        adminArray.adminRespondent.adminRespondentArray.salesTypesSel2 =
          adminArray.adminRespondent.adminRespondentArray.salesTypesSel2.concat(
            adminArray.targetSaleSelection[0]
          );
      }
    } else {
      adminArray.adminRespondent.adminRespondentArray.salesTypesSel2 =
        adminArray.targetSaleSelection[0];
    }

    if (adminArray.sourceSaleSelection.length > 0) {
      adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel =
        adminArray.sourceSaleSelection;
    }

    adminArray.adminRespondent.adminRespondentArray.salesTypesSel2.find((i) => {
      isMarketSelected = i.accounttype == "4" ? "Y" : "N";
    });
    adminArray.adminRespondent.adminRespondentPersonal.marketSelected =
      isMarketSelected;

    adminArray.sourceSaleSelection = [];
    adminArray.targetSaleSelection = [];
    adminArray.sourceSaleSelection1 = [];
    adminArray.targetSaleSelection1 = [];

    setState(adminArray);
    const elementsSalesAvailable = document.getElementById(
      adminArray.filter.availableSalesOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsSalesAvailable.length; ) {
      elementsSalesAvailable[i].selected = false;
    }
  };

  const moveLeftSelected = (event) => {
    let isMarketSelected = "N";
    const adminArray = { ...state };
    if (adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel) {
      if (
        adminArray.targetSaleSelection1[0] &&
        adminArray.targetSaleSelection1[0].length > 0
      ) {
        adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel =
          adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel.concat(
            adminArray.targetSaleSelection1[0]
          );
      }
    } else {
      adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel =
        adminArray.targetSaleSelection1[0];
    }

    if (
      adminArray.sourceSaleSelection1.length > 0 ||
      adminArray.targetSaleSelection1[0].length > 0
    ) {
      adminArray.adminRespondent.adminRespondentArray.salesTypesSel2 =
        adminArray.sourceSaleSelection1;
    }

    adminArray.adminRespondent.adminRespondentArray.salesTypesNotSel.find(
      (i) => {
        isMarketSelected = i.accounttype == "4" ? "Y" : "N";
      }
    );

    adminArray.adminRespondent.adminRespondentPersonal.marketSelected =
      isMarketSelected;
    adminArray.sourceSaleSelection = [];
    adminArray.targetSaleSelection = [];
    adminArray.sourceSaleSelection1 = [];
    adminArray.targetSaleSelection1 = [];
    setState(adminArray);

    const elementsSalesSelected = document.getElementById(
      adminArray.filter.selectedSalesOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsSalesSelected.length; ) {
      elementsSalesSelected[i].selected = false;
    }
  };

  const handleDropdownChange = (event, str) => {
    const selectedData = { ...state };
    const value = event.target.value;
    const selectText = event.target.options[event.target.selectedIndex].text;
    if (str == "periodList") {
      selectedData.adminRespondent.adminRespondentArray.periodList = value;
      saveUpdateInfo("dropdownUpdate", selectText, "");
    } else if (str == "salesLocation") {
      selectedData.adminRespondent.adminRespondentPersonal.locationid = value;
    }
    selectedData.adminRespondent.adminRespondentPersonal.changingPeriod = "Y";
    setState(selectedData);
  };

  const setPrimaryAccountValue = (event) => {
    const adminArray = { ...state };
    let sourcePrimarySelection = [];
    let targetPrimarySelection = [];

    const target = [...event.target.selectedOptions].map((option) => {
      return {
        accountrecid: option.id,
        accountname: option.label,
        accountid: null,
        accountpricingtype: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
      };
    });

    sourcePrimarySelection =
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel.filter(
        function (sps) {
          return !target.find(function (e) {
            return e.accountrecid == sps.accountrecid;
          });
        }
      );

    if (targetPrimarySelection.length > 0) {
      targetPrimarySelection = targetPrimarySelection.filter(function (item) {
        return Object.values(target).indexOf(item) == -1;
      });
      targetPrimarySelection.push(Object.values(target));
    } else {
      targetPrimarySelection.push(Object.values(target));
    }

    setState({
      ...state,
      sourcePrimarySelection: sourcePrimarySelection,
      targetPrimarySelection: targetPrimarySelection,
    });
  };

  const setRemovePrimaryValue = (event) => {
    const adminArray = { ...state };
    let sourcePrimarySelection1 = [];
    let targetPrimarySelection1 = [];

    const target_remove = [...event.target.selectedOptions].map((option) => {
      return {
        accountrecid: option.id,
        accountname: option.label,
        accountid: null,
        accountpricingtype: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
      };
    });

    sourcePrimarySelection1 =
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2.filter(
        function (sps) {
          return !target_remove.find(function (e) {
            return e.accountrecid == sps.accountrecid;
          });
        }
      );

    if (targetPrimarySelection1.length > 0) {
      targetPrimarySelection1 = targetPrimarySelection1.filter(function (item) {
        return Object.values(target_remove).indexOf(item) == -1;
      });
      targetPrimarySelection1.push(Object.values(target_remove));
    } else {
      targetPrimarySelection1.push(Object.values(target_remove));
    }

    setState({
      ...state,
      sourcePrimarySelection1: sourcePrimarySelection1,
      targetPrimarySelection1: targetPrimarySelection1,
    });
  };

  const moveRightPrimarySelected = (event) => {
    const adminArray = { ...state };
    if (adminArray.adminRespondent.adminRespondentArray.primeAccountSel2) {
      if (
        adminArray.targetPrimarySelection[0] &&
        adminArray.targetPrimarySelection[0].length > 0
      ) {
        adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 =
          adminArray.adminRespondent.adminRespondentArray.primeAccountSel2.concat(
            adminArray.targetPrimarySelection[0]
          );
      }
    } else {
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 =
        adminArray.targetPrimarySelection[0];
    }

    if (adminArray.sourcePrimarySelection.length > 0) {
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel =
        adminArray.sourcePrimarySelection;
    }

    adminArray.sourcePrimarySelection = [];
    adminArray.targetPrimarySelection = [];
    adminArray.sourcePrimarySelection1 = [];
    adminArray.targetPrimarySelection1 = [];
    setState(adminArray);
    const elementsPrimarySelected = document.getElementById(
      adminArray.filter.primaryAccountOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsPrimarySelected.length; ) {
      elementsPrimarySelected[i].selected = false;
    }
  };

  const moveLeftPrimarySelected = (event) => {
    const adminArray = { ...state };
    if (adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel) {
      if (
        adminArray.targetPrimarySelection1[0] &&
        adminArray.targetPrimarySelection1[0].length > 0
      ) {
        adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel =
          adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel.concat(
            adminArray.targetPrimarySelection1[0]
          );
      }
    } else {
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel =
        adminArray.targetSaleSelection1[0];
    }

    if (
      adminArray.sourcePrimarySelection1.length > 0 ||
      adminArray.targetPrimarySelection1[0].length > 0
    ) {
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 =
        adminArray.sourcePrimarySelection1;
    }

    adminArray.sourcePrimarySelection = [];
    adminArray.targetPrimarySelection = [];
    adminArray.sourcePrimarySelection1 = [];
    adminArray.targetPrimarySelection1 = [];
    setState(adminArray);
    const elementsPrimaryAvailable = document.getElementById(
      adminArray.filter.selectedPrimaryAccountOption.id
    )?.selectedOptions;
    for (let i = 0; i < elementsPrimaryAvailable.length; ) {
      elementsPrimaryAvailable[i].selected = false;
    }
  };

  const moveAllRightPrimarySelected = (event) => {
    const adminArray = { ...state };
    if (
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2?.length <
      0
    ) {
      if (adminArray.adminRespondent.adminRespondentArray.primeAccountSel2) {
        adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 = [];
      }
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 =
        adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel;
    } else {
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 =
        adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 || [];
      adminArray.adminRespondent.adminRespondentArray.primeAccountSel2.push(
        ...adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel
      );
    }

    adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel = [];
    setState(adminArray);
  };

  const moveAllLeftPrimarySelected = (event) => {
    const adminArray = { ...state };
    if (
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel
        ?.length < 0
    ) {
      if (adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel) {
        adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel = [];
      }
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel =
        adminArray.adminRespondent.adminRespondentArray.primeAccountSel2;
    } else {
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel =
        adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel ||
        [];
      adminArray.adminRespondent.adminRespondentArray.primeAccountNotSel.push(
        ...adminArray.adminRespondent.adminRespondentArray.primeAccountSel2
      );
    }

    adminArray.adminRespondent.adminRespondentArray.primeAccountSel2 = [];
    setState(adminArray);
  };

  const setSecondaryValue = (event) => {
    const adminArray = { ...state };
    let sourceSecondarySelection = [];
    let targetSecondarySelection = [];

    const target = [...event.target.selectedOptions].map((option) => {
      return {
        accountrecid: option.id,
        accountname: option.label,
        accountid: null,
        accountpricingtype: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
      };
    });

    sourceSecondarySelection =
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel.filter(
        function (sans) {
          return !target.find(function (e) {
            return e.accountrecid == sans.accountrecid;
          });
        }
      );

    if (targetSecondarySelection.length > 0) {
      targetSecondarySelection = targetSecondarySelection.filter(function (
        item
      ) {
        return Object.values(target).indexOf(item) == -1;
      });
      targetSecondarySelection.push(Object.values(target));
    } else {
      targetSecondarySelection.push(Object.values(target));
    }

    setState({
      ...state,
      sourceSecondarySelection: sourceSecondarySelection,
      targetSecondarySelection: targetSecondarySelection,
    });
  };

  const setRemoveSecondaryValue = (event) => {
    const adminArray = { ...state };
    let sourceSecondarySelection1 = [];
    let targetSecondarySelection1 = [];

    const target_remove = [...event.target.selectedOptions].map((option) => {
      return {
        accountrecid: option.id,
        accountname: option.label,
        accountid: null,
        accountpricingtype: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
      };
    });

    sourceSecondarySelection1 =
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2.filter(
        function (sas) {
          return !target_remove.find(function (e) {
            return e.accountrecid == sas.accountrecid;
          });
        }
      );

    if (targetSecondarySelection1.length > 0) {
      targetSecondarySelection1 = targetSecondarySelection1.filter(function (
        item
      ) {
        return Object.values(target_remove).indexOf(item) == -1;
      });
      targetSecondarySelection1.push(Object.values(target_remove));
    } else {
      targetSecondarySelection1.push(Object.values(target_remove));
    }

    setState({
      ...state,
      sourceSecondarySelection1: sourceSecondarySelection1,
      targetSecondarySelection1: targetSecondarySelection1,
    });
  };

  const moveRightSecondarySelected = (event) => {
    const adminArray = { ...state };
    if (adminArray.adminRespondent.adminRespondentArray.secAccountSel2) {
      if (
        adminArray.targetSecondarySelection[0] &&
        adminArray.targetSecondarySelection[0].length > 0
      ) {
        adminArray.adminRespondent.adminRespondentArray.secAccountSel2 =
          adminArray.adminRespondent.adminRespondentArray.secAccountSel2.concat(
            adminArray.targetSecondarySelection[0]
          );
      }
    } else {
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2 =
        adminArray.targetSecondarySelection[0];
    }

    if (adminArray.sourceSecondarySelection.length > 0) {
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel =
        adminArray.sourceSecondarySelection;
    }

    adminArray.sourceSecondarySelection = [];
    adminArray.targetSecondarySelection = [];
    adminArray.sourceSecondarySelection1 = [];
    adminArray.targetSecondarySelection1 = [];
    setState(adminArray);
    const elementsSecondarySelected = document.getElementById(
      adminArray.filter.secondaryAccountOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsSecondarySelected.length; ) {
      elementsSecondarySelected[i].selected = false;
    }
    checkValidation();
  };

  const moveLeftSecondarySelected = (event) => {
    const adminArray = { ...state };
    if (adminArray.adminRespondent.adminRespondentArray.secAccountNotSel) {
      if (
        adminArray.targetSecondarySelection1[0] &&
        adminArray.targetSecondarySelection1[0].length > 0
      ) {
        adminArray.adminRespondent.adminRespondentArray.secAccountNotSel =
          adminArray.adminRespondent.adminRespondentArray.secAccountNotSel.concat(
            adminArray.targetSecondarySelection1[0]
          );
      }
    } else {
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel =
        adminArray.targetSecondarySelection1[0];
    }

    if (
      adminArray.sourceSecondarySelection1.length > 0 ||
      adminArray.targetSecondarySelection1[0].length > 0
    ) {
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2 =
        adminArray.sourceSecondarySelection1;
    }

    adminArray.sourceSecondarySelection = [];
    adminArray.targetSecondarySelection = [];
    adminArray.sourceSecondarySelection1 = [];
    adminArray.targetSecondarySelection1 = [];
    setState(adminArray);
    const elementsSecondaryAvailable = document.getElementById(
      adminArray.filter.selectedSecondaryAccountOption.id
    )?.selectedOptions;

    for (let i = 0; i < elementsSecondaryAvailable.length; ) {
      elementsSecondaryAvailable[i].selected = false;
    }
    checkValidation();
  };

  const moveAllRightSecondarySelected = (event) => {
    const adminArray = { ...state };
    if (
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2?.length < 0
    ) {
      if (adminArray.adminRespondent.adminRespondentArray.secAccountSel2) {
        adminArray.adminRespondent.adminRespondentArray.secAccountSel2 = [];
      }
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2 =
        adminArray.adminRespondent.adminRespondentArray.secAccountNotSel;
    } else {
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2 =
        adminArray.adminRespondent.adminRespondentArray.secAccountSel2 || [];
      adminArray.adminRespondent.adminRespondentArray.secAccountSel2.push(
        ...adminArray.adminRespondent.adminRespondentArray.secAccountNotSel
      );
    }

    adminArray.adminRespondent.adminRespondentArray.secAccountNotSel = [];
    setState(adminArray);
    checkValidation();
  };

  const moveAllLeftSecondarySelected = (event) => {
    const adminArray = { ...state };
    if (
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel?.length <
      0
    ) {
      if (adminArray.adminRespondent.adminRespondentArray.secAccountNotSel) {
        adminArray.adminRespondent.adminRespondentArray.secAccountNotSel = [];
      }
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel =
        adminArray.adminRespondent.adminRespondentArray.secAccountSel2;
    } else {
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel =
        adminArray.adminRespondent.adminRespondentArray.secAccountNotSel || [];
      adminArray.adminRespondent.adminRespondentArray.secAccountNotSel.push(
        ...adminArray.adminRespondent.adminRespondentArray.secAccountSel2
      );
    }

    adminArray.adminRespondent.adminRespondentArray.secAccountSel2 = [];
    setState(adminArray);
    checkValidation();
  };

  const areAllRequiredFieldsNotFilled = () => {
    const updatedInfoData = { ...state.adminRespondent };
    return (
      !updatedInfoData.adminRespondentPersonal?.personTitle ||
      !updatedInfoData.adminRespondentPersonal?.email ||
      !updatedInfoData.adminRespondentPersonal?.countrycode ||
      !updatedInfoData.adminRespondentPersonal?.phonenumber ||
      updatedInfoData.adminRespondentPersonal?.locationid == "0"
    );
  };

  const checkValidation = () => {
    const updatedInfoData = { ...state.adminRespondent };
    if (areAllRequiredFieldsNotFilled()) {
      return Settings.updateContactInfo.fillAllFieldsAlert;
    }

    if (updatedInfoData.adminRespondentArray.salesTypesSel2?.length < 0) {
      return Settings.updateContactInfo.selectOneSalesAlert;
    }

    if (updatedInfoData.adminRespondentPersonal.email) {
      if (
        !Settings.validation_details.re_email.test(
          updatedInfoData.adminRespondentPersonal.email
        )
      ) {
        return Settings.updateContactInfo.adminEmailValidationAlert;
      }
    }

    if (
      updatedInfoData.adminRespondentArray.primeAccountSel2 &&
      updatedInfoData.adminRespondentArray.secAccountSel2
    ) {
      appContext.duplicateAccountErrorMessages.splice(
        0,
        appContext.duplicateAccountErrorMessages.length
      );
      appContext.setDuplicateAccountErrorMessages([]);
      let accounts = getCommonAccountNames(
        updatedInfoData.adminRespondentArray.primeAccountSel2,
        updatedInfoData.adminRespondentArray.secAccountSel2
      );
      if (accounts.length > 0) {
        accounts.forEach((accountname) => {
          appContext.duplicateAccountErrorMessages.push(
            Settings.updateContactInfo.noPrimAndSecSameAlert + accountname
          );
        });
        appContext.setIsUpdateAccountAlert(true);
        appContext.setDuplicateAccountErrorMessages([
          ...appContext.duplicateAccountErrorMessages,
        ]);
      } else {
        appContext.setIsUpdateAccountAlert(false);
        appContext.duplicateAccountErrorMessages.splice(
          0,
          appContext.duplicateAccountErrorMessages.length
        );
        appContext.setDuplicateAccountErrorMessages([]);
      }
      if (appContext.duplicateAccountErrorMessages.length) {
        return "DuplicateAccounts";
      }
    }
    return false;
  };

  const getCommonAccountNames = (primaryAccount, secondaryAccount) => {
    const isSameAccount = (a, b) => a.accountname === b.accountname;

    const onlyInLeft = (left, right, compareFunction) =>
      left.filter((leftValue) =>
        right.some((rightValue) => compareFunction(leftValue, rightValue))
      );

    const onlyInA = onlyInLeft(primaryAccount, secondaryAccount, isSameAccount);
    const onlyInB = onlyInLeft(secondaryAccount, primaryAccount, isSameAccount);

    const result = [...onlyInA, ...onlyInB];
    var flags = [],
      output = [],
      l = result.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[result[i].accountname]) continue;
      flags[result[i].accountname] = true;
      output.push(result[i].accountname);
    }
    return output;
  };

  const saveUpdateInfo = async (fromTask, selectedPeriod, saveAction) => {
    const isValidated = checkValidation();
    let strSalesType = "";
    let strPrimaryAcct = "";
    let strSecondAcct = "";
    if (!isValidated) {
      const adminArray = { ...state.adminRespondent };

      if (
        !adminArray.adminRespondentPersonal.adminLocationid ||
        adminArray.adminRespondentPersonal.adminLocationid == null ||
        adminArray.adminRespondentPersonal.adminLocationid == ""
      ) {
        adminArray.adminRespondentPersonal.adminLocationid = 1;
      } else {
        adminArray.adminRespondentPersonal.adminLocationid =
          adminArray.adminRespondentPersonal.locationid;
      }
      if (adminArray.adminRespondentArray.salesTypesSel2?.length > 0) {
        adminArray.adminRespondentArray.salesTypesSel2.filter(function (item) {
          strSalesType += item.accounttype + ",";
        });
      }
      strSalesType = strSalesType.slice(0, -1);
      let strSalesTypeToArr = strSalesType.split(",");
      strSalesTypeToArr = strSalesTypeToArr[0] == "" ? null : strSalesTypeToArr;

      if (adminArray.adminRespondentArray.primeAccountSel2?.length > 0) {
        adminArray.adminRespondentArray.primeAccountSel2.filter(function (
          item
        ) {
          strPrimaryAcct += item.accountrecid + ",";
        });
      }
      strPrimaryAcct = strPrimaryAcct.slice(0, -1);
      let strPrimaryToArr = strPrimaryAcct.split(",");
      strPrimaryToArr = strPrimaryToArr[0] == "" ? null : strPrimaryToArr;

      if (adminArray.adminRespondentArray.secAccountSel2?.length > 0) {
        adminArray.adminRespondentArray.secAccountSel2.filter(function (item) {
          strSecondAcct += item.accountrecid + ",";
        });
      }
      strSecondAcct = strSecondAcct.slice(0, -1);
      let strSecondToArr = strSecondAcct.split(",");
      strSecondToArr = strSecondToArr[0] == "" ? null : strSecondToArr;

      const adminInfoDetails = {
        personName: adminArray.adminRespondentPersonal.personName,
        adminRespondentid: adminArray.adminRespondentPersonal.adminRespondentid,
        eid: adminArray.adminRespondentPersonal.eid,
        personTitle: adminArray.adminRespondentPersonal.personTitle,
        email: adminArray.adminRespondentPersonal.email,
        countryCode: adminArray.adminRespondentPersonal.countrycode,
        areaCityCode: adminArray.adminRespondentPersonal.areacitycode,
        phoneNumber: adminArray.adminRespondentPersonal.phonenumber,
        faxNumber: adminArray.adminRespondentPersonal.faxnumber,
        adminLocationid:
          !adminArray.adminRespondentPersonal.adminLocationid ||
          adminArray.adminRespondentPersonal.adminLocationid == null ||
          adminArray.adminRespondentPersonal.adminLocationid == ""
            ? 1
            : adminArray.adminRespondentPersonal.locationid == null
            ? 1
            : adminArray.adminRespondentPersonal.locationid,
        salesTypesNotSel:
          adminArray.adminRespondentArray.salesTypesNotSel?.length > 0
            ? adminArray.adminRespondentArray.salesTypesNotSel
            : null,
        salesTypesSel2: strSalesTypeToArr,
        primeAccountNotSel:
          adminArray.adminRespondentArray.primeAccountNotSel?.length > 0
            ? adminArray.adminRespondentArray.primeAccountNotSel
            : null,
        primeAccountSel2: strPrimaryToArr,
        secAccountNotSel:
          adminArray.adminRespondentArray.secAccountNotSel?.length > 0
            ? adminArray.adminRespondentArray.secAccountNotSel
            : null,
        secAccountSel2: strSecondToArr,
      };
      const params = {
        period: selectedPeriod
          ? selectedPeriod
          : adminArray.adminRespondentPersonal.period,
        origPeriod: adminArray.adminRespondentPersonal.period,
        changingPeriod: adminArray.adminRespondentPersonal.changingPeriod,
      };
      const res = await API.updateAdminAccount(params, adminInfoDetails);
      setState({
        ...state,
        adminRespondent: adminArray,
      });
      if (saveAction == "onSaveButtonClick") {
          UserAPI.getUser().then((response) => {
            appContext.setUser(response as IUser);
            sessionStorage.setItem("GETUSERDETAILS", JSON.stringify(response));
          });
        
        setTimeout(() => {
          history.push({
            pathname: "/",
          });
        }, 1000);
        setFromUpdateButtonClick(true);
      } else if (fromTask == "dropdownUpdate") {
        API.getAdminUpdateInfo(selectedPeriod).then((data) => {
          setUpdateInfoData(data);
        });
      }
    } else {
      if (isValidated === "DuplicateAccounts") {
        showMultipleAlerts(appContext.duplicateAccountErrorMessages);
      } else {
        setAlertModalMsg(isValidated);
        setShowModalAlert(true);
      }
    }
  };

  const validateAdminFields = () => {
    let bOK = true;
    let bOKEmail = true;
    const updatedInfoData = { ...state.adminRespondent };
    if (
      !updatedInfoData.adminRespondentPersonal.personTitle ||
      !updatedInfoData.adminRespondentPersonal.email ||
      !updatedInfoData.adminRespondentPersonal.countrycode ||
      !updatedInfoData.adminRespondentPersonal.phonenumber
    ) {
      bOK = false;
    }

    if (bOK) {
      if (updatedInfoData.adminRespondentPersonal.email) {
        if (
          Settings.validation_details.re_email.test(
            updatedInfoData.adminRespondentPersonal.email
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
      ? appContext.setIsUpdateAdminAlert(true)
      : appContext.setIsUpdateAdminAlert(false);
    bOKEmail == false
      ? appContext.setIsUpdateAdminEmailAlert(true)
      : appContext.setIsUpdateAdminEmailAlert(false);
  };

  const showMultipleAlerts = (alertsArray) => {
    setMultipleAlertMessages(alertsArray);
  };

  const closeModalAlert = () => {
    setShowModalAlert(false);
  };

  const UpdateContactContext = {
    state,
    checkValidation,
    setLoader,
    setUpdateInfoData,
    setSaleValue,
    moveRightSelected,
    moveLeftSelected,
    setRemoveSaleValue,
    handleDropdownChange,
    setPrimaryAccountValue,
    setRemovePrimaryValue,
    moveRightPrimarySelected,
    moveLeftPrimarySelected,
    moveAllRightPrimarySelected,
    moveAllLeftPrimarySelected,
    setSecondaryValue,
    setRemoveSecondaryValue,
    moveRightSecondarySelected,
    moveLeftSecondarySelected,
    moveAllRightSecondarySelected,
    moveAllLeftSecondarySelected,
    setValidationData,
    saveUpdateInfo,
    validateAdminFields,
    showMultipleAlerts,
    showModalAlert,
    setShowModalAlert,
    alertModalMsg,
    setAlertModalMsg,
    closeModalAlert,
    fromUpdateButtonClick,
    setFromUpdateButtonClick,
    multipleAlertMessages,
    setMultipleAlertMessages,
  };

  return (
    <UpdateContactInfoContext.Provider value={UpdateContactContext}>
      {props.children}
    </UpdateContactInfoContext.Provider>
  );
};

export const UpdateContactInfoConsumer = UpdateContactInfoContext.Consumer;
export default UpdateContactInfoContext;
