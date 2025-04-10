import React, { useState } from "react";
import Utils from "../../../../../../../common/utils/Utils";
import Util from "../../../../../utils/Utils";
import Settings from "../static/Settings";
import API from "../service/API";

const RFPSettingsContext = React.createContext({});

export const RFPSettingsContextProvider = (props) => {
  const [state, setState] = useState({
    formChg: false,
    showScreenLoader: false,
    rfpSettingsData: {
      accountDetailRFP: {
        accountid: null,
        accountname: null,
        accountpricingtype: null,
        accountrecid: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: null,
        hotel_display: null,
        period: null,
        top_account: null,
        num_requiredfields: null,
        contain_userdefques: null,
        gbtaformat: null,
        maxseason: null,
        maxrt: null,
        rtallowed: null,
        ratevisible: null,
        addquestnotes: null,
        edierfp: null,
        ediebt: null,
        edieaq: null,
        addrepformat: null,
        blackoutdateshidden: null,
        maxnum_blackoutdates: null,
        maxnum_blackoutperiod: null,
        taxfields: null,
        addnotes_rfp: null,
        presentfcr: null,
        filesubmission: null,
        pb: "",
        cs: "",
        ss: "",
        bd: "",
        gm: "",
        csr: "",
        es: "",
        accleadname: null,
        accleadphone: null,
        sharedaccleadname: null,
        sharedaccleadphone: null,
        btamname: null,
        btamphone: null,
        strAccountrecid: null,
      },
      modules: {
        pb: false,
        cs: false,
        ss: false,
        bd: false,
        gm: false,
        csr: false,
        es: false,
      },
      rfpSettingsDropDowns: {
        gbtaList: [
          {
            colValue: null,
            colDesc: null,
            profileName: null,
            name: null,
            phone: null,
          },
        ],
        maxseasonList: [
          {
            colValue: null,
            colDesc: null,
            profileName: null,
            name: null,
            phone: null,
          },
        ],
        maxrtList: [
          {
            colValue: null,
            colDesc: null,
            profileName: null,
            name: null,
            phone: null,
          },
        ],
        rtallowedList: [
          {
            colValue: null,
            colDesc: null,
            profileName: null,
            name: null,
            phone: null,
          },
        ],
        ratevisibleList: [
          {
            colValue: null,
            colDesc: null,
            profileName: null,
            name: null,
            phone: null,
          },
        ],
        edierfpList: [
          {
            colValue: null,
            colDesc: null,
            profileName: null,
            name: null,
            phone: null,
          },
        ],
        accLeadList: [],
        sharedaccLeadList: [],
        btamList: [],
        userRole: "Y",
      },
      readOnly: "",
      accleadname: null,
      accleadphone: null,
      sharedaccleadname: null,
      sharedaccleadphone: null,
      btamname: null,
      btamphone: null,
      modulesList: [],
    },
    isDataChanged: false,
  });

  const setRFPSettingsData = (data: any, closeModal?: boolean) => {
    const rfpData = { ...state.rfpSettingsData };
    const modules = { ...state.rfpSettingsData.modules };
    const stateData = { ...state };

    if (data) {
      rfpData.accountDetailRFP = data.accountDetailRFP;

      rfpData.rfpSettingsDropDowns.edierfpList = Util.appendJsonObj(
        Settings.RFPFieldData.blankValue,
        data.rfpSettingsDropDowns.edierfpList
      );

      rfpData.rfpSettingsDropDowns.gbtaList = Util.appendJsonObj(
        Settings.RFPFieldData.blankValue,
        data.rfpSettingsDropDowns.gbtaList
      );

      rfpData.rfpSettingsDropDowns.maxrtList = Util.appendJsonObj(
        Settings.RFPFieldData.blankValue,
        data.rfpSettingsDropDowns.maxrtList
      );
      rfpData.rfpSettingsDropDowns.maxseasonList = Util.appendJsonObj(
        Settings.RFPFieldData.blankValue,
        data.rfpSettingsDropDowns.maxseasonList
      );
      rfpData.rfpSettingsDropDowns.ratevisibleList = Util.appendJsonObj(
        Settings.RFPFieldData.blankValue,
        data.rfpSettingsDropDowns.ratevisibleList
      );
      rfpData.rfpSettingsDropDowns.rtallowedList = Util.appendJsonObj(
        Settings.RFPFieldData.blankValue,
        data.rfpSettingsDropDowns.rtallowedList
      );
      if (rfpData.accountDetailRFP.addquestnotes === null)
        rfpData.accountDetailRFP.addquestnotes = "";
      if (rfpData.accountDetailRFP.addrepformat === null)
        rfpData.accountDetailRFP.addrepformat = "";
      if (rfpData.accountDetailRFP.addnotes_rfp === null)
        rfpData.accountDetailRFP.addnotes_rfp = "";
      if (rfpData.accountDetailRFP.filesubmission === null)
        rfpData.accountDetailRFP.filesubmission = "";
      setState({
        ...state,
        rfpSettingsData: rfpData,
      });
    }
  };
  const handleChange = (event) => {
    state.formChg = true;
    const modules = { ...state.rfpSettingsData.modules };
    const selectedRFPData = { ...state.rfpSettingsData.accountDetailRFP };
    const { type, id, value, checked } = event.target;
    if (type === "checkbox") {
      modules[id] = checked;

      if (checked) selectedRFPData[id] = "Y";
      else {
        selectedRFPData[id] = "N";
      }
    } else if (type === "textarea") {
      selectedRFPData[id] = value;
      // if(Utils.text_onclick(event, 255))
      // selectedRFPData[id] = value;
      // else
      // selectedRFPData[id] = value.substr(0, 255);
    } else {
      selectedRFPData[id] = value;
    }

    setState({
      ...state,
      formChg: true,
      rfpSettingsData: {
        ...state.rfpSettingsData,
        accountDetailRFP: selectedRFPData,
        modules: modules,
      },
      isDataChanged: true,
    });
  };
  const validate = (event) => {
    Utils.checklen_onkeypress(event, 255);
  };

  const handleBlur = (event) => {
    const selectedRFPData = { ...state.rfpSettingsData.accountDetailRFP };
    const { id, value } = event.target;

    if (Utils.text_onclick(event, 255)) {
      selectedRFPData[id] = value;
    } else if (value.length > 255) {
      selectedRFPData[id] = value.substr(0, 254);
    } else {
      selectedRFPData[id] = value.substr(0, 255);
    }

    setState({
      ...state,
      formChg: true,
      rfpSettingsData: {
        ...state.rfpSettingsData,
        accountDetailRFP: selectedRFPData,
      },
      isDataChanged: true,
    });
  };
  const autoSaveData = () => {
    const currentData = { ...state.rfpSettingsData.accountDetailRFP };

    if (state.isDataChanged) {
      setLoader();
      API.updateRFPData(currentData).then((data) => {
        resetLoader();
      });

      return true;
    } else return false;
  };

  const setLoader = () => {
    setState({
      ...state,
      showScreenLoader: true,
    });
  };
  const resetLoader = () => {
    setState({
      ...state,
      showScreenLoader: false,
    });
  };

  const rfpSettingsContext = {
    state,
    setState,
    setRFPSettingsData,
    handleChange,
    validate,
    handleBlur,
    autoSaveData,
    setLoader,
    resetLoader,
  };

  return (
    <RFPSettingsContext.Provider value={rfpSettingsContext}>
      {props.children}
    </RFPSettingsContext.Provider>
  );
};

export const RFPSettingsContextConsumer = RFPSettingsContext.Consumer;
export default RFPSettingsContext;
