import React, { useState, useContext } from "react";
import Settings from "../static/Settings";
import API from "../service/API";
import Utils from "../../../../../utils/Utils";
import Util from "../../../../../../../common/utils/Utils";
import CriticalFieldsContext from "../../CriticalFields/context/CriticalFieldsContext";
import moment from "moment";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const RateLoadingContext = React.createContext({});

export const RateLoadingContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [searchSelect, setSearchSelect] = useState(null);
  const [state, setState] = useState({
    formChg: false,
    showScreenLoader: false,
    rateLoadingData: {
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
      account_hotel_view: null,
      allowHotelcanPriceFloatVP: null,
      allow_modifications: null,
      altcancelpolicyid: null,
      altcancelpolicynotes: null,
      altcancelpolicytimeid: null,
      allow_floatnociel: null,
      allow_qmodifications: null,
      analysisreportout: null,
      bt_booking_cost: null,
      clustercode: null,
      default_percent: null,
      endmoddate: null,
      endqmoddate: null,
      internalpasnotes: null,
      max_roompools: null,
      startmoddate: null,
      startqmoddate: null,
      aerrateprograms: [
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 1,
          subsequence: 1,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 1,
          subsequence: 2,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 2,
          subsequence: 1,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 2,
          subsequence: 2,
          rateOfferId: null,
          rateOfferName: "",
        },
      ],
      brands: [
        {
          affiliationid: null,
          affiliationname: null,
          canprice: null,
          service_level: null,
          defaultroompools: null,
          currentroompool: null,
          account_percentid: null,
          default_percent: null,
          servicetype: null,
          gpp_optional_brand: null,
          gpp_value: "Y",
          showWarningIcon: false,
          showToolTips: false,
        },
      ],
      rateprograms: [
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 1,
          subsequence: 1,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 1,
          subsequence: 2,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 2,
          subsequence: 1,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 2,
          subsequence: 2,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 3,
          subsequence: 1,
          rateOfferId: null,
          rateOfferName: "",
        },
        {
          rateProg: "",
          is_aer_rpgm: "",
          sequence: 3,
          subsequence: 2,
          rateOfferId: null,
          rateOfferName: "",
        },
      ],
      aer_account: null,
      accountbrandlist: [
        {
          accountrecid: null,
          affiliationid: null,
          value: "",
        },
      ],
      gpp_check: null,
      set_id: null,
      rate_plan_id: null,
      accountAllowFloatVP: null,
      rateLoadInstructionsGDS: null,
      rateLoadingNotes: null,
      shortStartqmoddate: "",
      shortEndmoddate: "",
      shortStartmoddate: "",
      shortEndqmoddate: "",
      strAccountrecid: null,
    },
    rateOffers: [
      {
        completionLevel: "",
        lastUpdateDate: null,
        name: "",
        rateOfferId: null,
        rateOfferSystemId: null,
      },
    ],
    rpgms: [
      {
        rateProgramCode: "",
      },
    ],

    modalId: "",
    numRoomPools: null,
    showModal: false,
    showRpgmModal: false,
    showDateModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
    hasError: false,
    rpgm1: "",
    rpgm2: "",
    rpgm3: "",
    rpgm4: "",
    rpgm5: "",
    rpgm6: "",
    preRequisite: null,
    current: null,
    dateMsg: null,
    hasRpForModal: false,
    hasDupRpForModal: false,
    floatDefPerModal: false,
    showToolTips: false,
  });

  const [selectedRateOffer, setSelectedRateOffer] = useState({
    completionLevel: "",
    lastUpdateDate: null,
    name: "",
    rateOfferId: null,
    rateOfferSystemId: null,
    startIndex: 0,
    noRateOffers: false,
  });

  const initialSelectedRateOffer = {
    completionLevel: "",
    lastUpdateDate: null,
    name: "",
    rateOfferId: null,
    rateOfferSystemId: null,
    startIndex: 0,
    noRateOffers: false,
  };

  const [emptyRateProgram, setEmptyRateProgram] = useState({
    rateProgramsWithFirstItemEmpty: [
      {
        rateProgramCode: "",
      },
    ],
  });

  const initialEmptyRateProgram = {
    rateProgramsWithFirstItemEmpty: [
      {
        rateProgramCode: "",
      },
    ],
  };

  const adjacentContext = useContext(CriticalFieldsContext);

  const onRatesChangeCalendar = (event) => {
    state.formChg = true;
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (event.target.id === Settings.rateLoading.formFields.startDate.calId) {
        state.rateLoadingData.shortStartmoddate = date;
        setState({
          ...state,
          rateLoadingData: {
            ...state.rateLoadingData,
            shortStartmoddate: date,
          },
        });
      }
      if (event.target.id === Settings.rateLoading.formFields.endDate.calId) {
        state.rateLoadingData.shortEndmoddate = date;
        setState({
          ...state,
          rateLoadingData: {
            ...state.rateLoadingData,
            shortEndmoddate: date,
          },
        });
      }
    } else {
      if (event.target.id === Settings.rateLoading.formFields.startDate.calId) {
        state.rateLoadingData.shortStartmoddate = "";
        setState({
          ...state,
          rateLoadingData: {
            ...state.rateLoadingData,
            shortStartmoddate: "",
          },
        });
      }
      if (event.target.id === Settings.rateLoading.formFields.endDate.calId) {
        state.rateLoadingData.shortEndmoddate = "";
        setState({
          ...state,
          rateLoadingData: {
            ...state.rateLoadingData,
            shortEndmoddate: "",
          },
        });
      }
    }
    emptyDatesValidationCheckOnChange();
  };

  const onQuestionsChangeCalendar = (event) => {
    state.formChg = true;
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (
        event.target.id === Settings.rateLoading.formFields.qStartDate.calId
      ) {
        state.rateLoadingData.shortStartqmoddate = date;
        setState({ ...state });
      }
      if (event.target.id === Settings.rateLoading.formFields.qEndDate.calId) {
        state.rateLoadingData.shortEndqmoddate = date;
        setState({ ...state });
      }
    } else {
      if (
        event.target.id === Settings.rateLoading.formFields.qStartDate.calId
      ) {
        state.rateLoadingData.shortStartqmoddate = "";
        setState({ ...state });
      }
      if (event.target.id === Settings.rateLoading.formFields.qEndDate.calId) {
        state.rateLoadingData.shortEndqmoddate = "";
        setState({ ...state });
      }
    }

    emptyDatesValidationCheckOnChange();
  };

  const emptyDatesValidationCheckOnChange = () => {
    state.formChg = true;
    const data = { ...state.rateLoadingData };
    let bOk = true;
    if (bOk) {
      if (data.allow_modifications === Settings.rateLoading.yes) {
        if (data.shortStartmoddate === "" || data.shortStartmoddate === null) {
          bOk = false;

          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.rateLoading.formFields.modal.modalMessageString3,
            type: "custom",
          });
          return false;
        } else if (
          data.shortEndmoddate === "" ||
          data.shortEndmoddate === null
        ) {
          bOk = false;
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.rateLoading.formFields.modal.modalMessageString4,
            type: "custom",
          });
        }
      }
    }
    if (bOk) {
      //Checks if start and end date for modifying questions are null or empty and based on that show an alert message.
      if (data.allow_qmodifications === Settings.rateLoading.yes) {
        if (
          data.shortStartqmoddate === "" ||
          data.shortStartqmoddate === null
        ) {
          bOk = false;
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.rateLoading.formFields.modal.modalMessageString5,
            type: "custom",
          });
        } else if (
          data.shortEndqmoddate === "" ||
          data.shortEndqmoddate === null
        ) {
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.rateLoading.formFields.modal.modalMessageString6,
            type: "custom",
          });
        }
      }
    }
    if (bOk) {
      for (let i = 0; i < data.brands.length; i++) {
        if (data.brands[i].default_percent === null)
          data.brands[i].default_percent = 0;
        if (
          data.brands[i].default_percent >
            Settings.rateLoading.maxFloatDefaultPercentLimit ||
          /\D/.test(data.brands[i].default_percent)
        ) {
          bOk = false;
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.rateLoading.floatDefaultPercentAlertMsg2,
            type: "custom",
          });
          break;
        }
      }
    }

    if (bOk) {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "custom",
      });
    }

    return bOk;
  };

  const resetRateOfferLookUpModalState = () => {
    state.rpgm1 = "";
    state.rpgm2 = "";
    state.rpgm3 = "";
    state.rpgm4 = "";
    state.rpgm5 = "";
    state.rpgm6 = "";
    state.rpgms = initialEmptyRateProgram.rateProgramsWithFirstItemEmpty;
    setState({
      ...state,
    });
    setSelectedRateOffer({
      ...initialSelectedRateOffer,
    });
    setEmptyRateProgram({
      ...initialEmptyRateProgram,
    });
  };

  const setRateLoadingListData = (data: any, closeModal?: boolean) => {
    if (data) {
      const rateLoadingDetails = { ...state };
      data.aer_account =
        adjacentContext.state.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.aer_account;
      if (data.rateprograms.length === 0) {
        data.rateprograms = Settings.rateLoading.rateProgs;
      }
      if (
        data.rateprograms.length ===
        Settings.rateLoading.totalNumberOfRatePrograms
      ) {
        data.rateprograms.push(Settings.rateLoading.emptyRateProgsObject);
      }
      if (data.aerrateprograms === null) {
        data.aerrateprograms = [];
      }
      if (data.aerrateprograms.length === 0) {
        data.aerrateprograms = Settings.rateLoading.aerRateProgs;
      }
      if (
        data.aerrateprograms.length ===
        Settings.rateLoading.totalNumberOfAerRatePrograms
      ) {
        data.aerrateprograms.push(Settings.rateLoading.emptyAerRateProgsObject);
      }
      rateLoadingDetails.rateLoadingData = data;
      state.rateLoadingData = rateLoadingDetails.rateLoadingData;
      setState({
        ...state,
        rateLoadingData: state.rateLoadingData,
      });
    }
  };

  const emptyDatesValidationCheck = (data) => {
    let bOk = true;
    if (bOk) {
      //Checks if start and end date for modifying rates are null or empty and based on that show an alert message.
      if (data.allow_modifications === Settings.rateLoading.yes) {
        if (data.shortStartmoddate === "" || data.shortStartmoddate === null) {
          state.showDateModal = true;
          state.dateMsg =
            Settings.rateLoading.formFields.modal.modalMessageString3;
          bOk = false;
        } else if (
          data.shortEndmoddate === "" ||
          data.shortEndmoddate === null
        ) {
          state.showDateModal = true;
          state.dateMsg =
            Settings.rateLoading.formFields.modal.modalMessageString4;
          bOk = false;
        }
      }
    }
    if (bOk) {
      //Checks if start and end date for modifying questions are null or empty and based on that show an alert message.
      if (data.allow_qmodifications === Settings.rateLoading.yes) {
        if (
          data.shortStartqmoddate === "" ||
          data.shortStartqmoddate === null
        ) {
          state.showDateModal = true;
          state.dateMsg =
            Settings.rateLoading.formFields.modal.modalMessageString5;
          bOk = false;
        } else if (
          data.shortEndqmoddate === "" ||
          data.shortEndqmoddate === null
        ) {
          state.showDateModal = true;
          state.dateMsg =
            Settings.rateLoading.formFields.modal.modalMessageString6;
          bOk = false;
        }
      }
    }

    setState({
      ...state,
    });
    return bOk;
  };

  const conversionOfData = (data) => {
    data.startmoddate =
      data.shortStartmoddate !== ""
        ? Util.getShortDate(data.shortStartmoddate)
        : null;
    data.endmoddate =
      data.shortEndmoddate !== ""
        ? Util.getShortDate(data.shortEndmoddate)
        : null;
    data.startqmoddate =
      data.shortStartqmoddate !== ""
        ? Util.getShortDate(data.shortStartqmoddate)
        : null;
    data.endqmoddate =
      data.shortEndqmoddate !== ""
        ? Util.getShortDate(data.shortEndqmoddate)
        : null;
    data.brands.map((brand) => {
      if (brand.gpp_value === null) {
        brand.gpp_value = Settings.rateLoading.no;
      }
      if (brand.default_percent === "" || brand.default_percent === null) {
        brand.default_percent = 0;
      }
    });
  };

  const autoSave = (callback) => {
    const data = { ...state.rateLoadingData };
    conversionOfData(data);
    Object.keys(data).map((key) => {
      if (typeof data[key] == "boolean") {
        if (data[key]) {
          data[key] = "Y";
        }
      }
    });
    if (emptyDatesValidationCheck(data)) {
      setLoader();
      API.updateRateLoadingData(data).then((response) => {
        if (!response.brateprogsok) {
          alert(Settings.rateLoading.duplicateRateProgsAlertMessage);
          API.getRateLoadingData(data?.accountrecid, data?.period).then(
            (data) => {
              setRateLoadingListData(data);
              resetLoader();
            }
          );
          throw new Error(Settings.rateLoading.duplicateRateProgsErrorMessage);
        } else {
          callback();
          resetLoader();
        }
      });
    }
  };

  const onAccountAllowsFloatVPChangeHandler = (event) => {
    state.formChg = true;
    if (event.target.value === "Y") {
      setState({
        ...state,
        rateLoadingData: {
          ...state.rateLoadingData,
          accountAllowFloatVP: event.target.value,
          allow_floatnociel: "N",
          allowHotelcanPriceFloatVP: "N",
        },
      });
    } else {
      setState({
        ...state,
        rateLoadingData: {
          ...state.rateLoadingData,
          accountAllowFloatVP: event.target.value,
          allow_floatnociel: "N",
          allowHotelcanPriceFloatVP: "N",
        },
      });
    }
  };

  const onFloatVPProductEnabledChangeHandler = (event) => {
    state.formChg = true;
    setState({
      ...state,
      rateLoadingData: {
        ...state.rateLoadingData,
        allow_floatnociel: event.target.value,
      },
    });
  };

  const onHotelCanPriceFloatVPChangeHandler = (event) => {
    state.formChg = true;
    setState({
      ...state,
      rateLoadingData: {
        ...state.rateLoadingData,
        allowHotelcanPriceFloatVP: event.target.value,
      },
    });
  };

  const onHotelCanModifyOrRateOfferUpdateHandler = (event) => {
    state.formChg = true;
    const { id, value } = event.target;
    let newModalId = state.modalId;
    let roomPools = state.numRoomPools;
    newModalId = id;
    let { allow_modifications, allow_qmodifications } = state.rateLoadingData;
    let displayModal = state.showModal;

    if (id === Settings.rateLoading.formFields.hotelsCanModifyRates.id) {
      if (allow_modifications === Settings.rateLoading.no) {
        state.rateLoadingData.shortStartmoddate = "";
        state.rateLoadingData.shortEndmoddate = "";
      } else {
        // appContext.setErrorMessageAlert({
        //   show: true,
        //   message: Settings.rateLoading.formFields.modal.modalMessageString3,
        //   type: "custom",
        // });
      }
    }
    if (id === Settings.rateLoading.formFields.hotelsCanModifyQuestions.id) {
      if (allow_qmodifications === Settings.rateLoading.no) {
        state.rateLoadingData.shortStartqmoddate = "";
        state.rateLoadingData.shortEndqmoddate = "";
        // appContext.setErrorMessageAlert({
        //   show: false,
        //   message: "",
        //   type: "custom",
        // });
      } else {
        // appContext.setErrorMessageAlert({
        //   show: true,
        //   message: Settings.rateLoading.formFields.modal.modalMessageString5,
        //   type: "custom",
        // });
      }
    }

    //To show warning message modal for hotel can modify rates and questions dropdowns.
    newModalId === Settings.rateLoading.formFields.hotelsCanModifyRates.id
      ? (allow_modifications = value)
      : newModalId ===
        Settings.rateLoading.formFields.hotelsCanModifyQuestions.id
      ? (allow_qmodifications = value)
      : null;

    (allow_modifications === Settings.rateLoading.yes &&
      newModalId !==
        Settings.rateLoading.formFields.hotelsCanModifyQuestions.id) ||
    (allow_qmodifications === Settings.rateLoading.yes &&
      newModalId !== Settings.rateLoading.formFields.hotelsCanModifyRates.id)
      ? (displayModal = !state.showModal)
      : displayModal;

    //To show rate offers lookup modal on click of update button.
    if (
      newModalId === Settings.rateLoading.rateOfferLookUpModal.updateBtnId ||
      newModalId === Settings.rateLoading.rateOfferLookUpModal.gppUpdateBtnId
    ) {
      newModalId === Settings.rateLoading.rateOfferLookUpModal.updateBtnId
        ? (roomPools = state.rateLoadingData.max_roompools)
        : (roomPools =
            Settings.rateLoading.rateOfferLookUpModal.gppMaxRoomPools);
      API.lookUpRateOffer(roomPools).then.bind(
        (resetRateOfferLookUpModalState(), (displayModal = !state.showModal))
      );
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "custom",
      });
    }
    setState({
      ...state,
      showModal: displayModal,
      modalId: newModalId,
      numRoomPools: roomPools,
      rateLoadingData: {
        ...state.rateLoadingData,
        allow_modifications: allow_modifications,
        allow_qmodifications: allow_qmodifications,
      },
    });
    emptyDatesValidationCheckOnChange();
  };

  const onRemoveRateOfferAndRateProgramsHandler = (event) => {
    state.formChg = true;
    const ratesData = { ...state };
    if (
      event.target.id === Settings.rateLoading.rateOfferLookUpModal.removeBtnId
    ) {
      ratesData.rateLoadingData.rateprograms.map((rateProgram) => {
        rateProgram.rateProg = "";
        rateProgram.rateOfferName = "";
        rateProgram.rateOfferId = null;
      });
    }
    if (
      event.target.id ===
      Settings.rateLoading.rateOfferLookUpModal.gppRemoveBtnId
    ) {
      ratesData.rateLoadingData.aerrateprograms.map((aerrateprogram) => {
        aerrateprogram.rateProg = "";
        aerrateprogram.rateOfferName = "";
        aerrateprogram.rateOfferId = null;
      });
    }
    setState(ratesData);
  };

  const onRpgmsChangeHandler = (event) => {
    state.formChg = true;
    const { id, value } = event.target;
    const rpgms = { ...state };
    if (id === Settings.rateLoading.formFields.ratePrograms.rpgmId1)
      rpgms.rpgm1 = value;
    if (id === Settings.rateLoading.formFields.ratePrograms.rpgmId2)
      rpgms.rpgm2 = value;
    if (id === Settings.rateLoading.formFields.ratePrograms.rpgmId3)
      rpgms.rpgm3 = value;
    if (id === Settings.rateLoading.formFields.ratePrograms.rpgmId4)
      rpgms.rpgm4 = value;
    if (id === Settings.rateLoading.formFields.ratePrograms.rpgmId5)
      rpgms.rpgm5 = value;
    if (id === Settings.rateLoading.formFields.ratePrograms.rpgmId6)
      rpgms.rpgm6 = value;
    setState({
      ...state,
      rpgm1: rpgms.rpgm1,
      rpgm2: rpgms.rpgm2,
      rpgm3: rpgms.rpgm3,
      rpgm4: rpgms.rpgm4,
      rpgm5: rpgms.rpgm5,
      rpgm6: rpgms.rpgm6,
    });
  };

  const getRateOffers = () => {
    setSelectedRateOffer({
      ...selectedRateOffer,
      startIndex: 0,
      noRateOffers: false,
    });
    return API.getRateOffers(
      "",
      selectedRateOffer.startIndex,
      selectedRateOffer.startIndex + 5
    ).then((data) => {
      if (data.length > 0) {
        setState({
          ...state,
          rateOffers: data,
        });
      } else {
        setSelectedRateOffer({
          ...selectedRateOffer,
          noRateOffers: true,
        });
      }
    });
  };

  const getNextRateOffers = (event) => {
    const searchString = event.searchString;
    setSelectedRateOffer({
      ...selectedRateOffer,
      startIndex: event.start,
      noRateOffers: false,
    });
    return API.getRateOffers(searchString, event.start, event.end).then(
      (data) => {
        if (data.length > 0) {
          setState({
            ...state,
            rateOffers: data,
          });
        } else {
          setSelectedRateOffer({
            ...selectedRateOffer,
            noRateOffers: true,
          });
        }
      }
    );
  };

  const onRateOfferSelectHandler = (event) => {
    const { textContent } = event.target;
    const tabbedRateOffer = state.rateOffers.find((rateOffer) => {
      return rateOffer.name === textContent;
    });
    return API.getRatePrograms(tabbedRateOffer.rateOfferId).then((data) => {
      state.rpgm1 = data[0].rateProgramCode;
      setState({
        ...state,
        rpgms: data,
        rpgm1: state.rpgm1,
      });
      setRatePrograms(data);
      setSelectedRateOffer({
        ...selectedRateOffer,
        rateOfferId: tabbedRateOffer.rateOfferId,
        name: textContent,
      });
    });
  };

  const setRatePrograms = (data) => {
    if (data) {
      const rpgms = {
        ...emptyRateProgram,
      };
      rpgms.rateProgramsWithFirstItemEmpty = Utils.appendJsonObj(
        Settings.rateLoading.rateOfferLookUpModal.initialRateProgObject,
        data
      );
      emptyRateProgram.rateProgramsWithFirstItemEmpty =
        rpgms.rateProgramsWithFirstItemEmpty;
      setEmptyRateProgram(emptyRateProgram);
    }
  };

  const areRateProgramsUnique = () => {
    const rpgms = { ...state };
    let hasRp = false;
    let hasDupRp = false;
    state.hasRpForModal = hasRp;
    if (rpgms.rpgm1 !== null && rpgms.rpgm3 !== null) {
      if (rpgms.rpgm1 === "" && rpgms.rpgm3 !== "") {
        hasRp = true;
        state.hasRpForModal = hasRp;
        rpgms.preRequisite = Settings.rateLoading.preRequisites.rpMsg1;
        rpgms.current = Settings.rateLoading.preRequisites.rpMsg3;
      }
    }
    if (rpgms.rpgm3 !== null && rpgms.rpgm5 !== null) {
      if (rpgms.rpgm3 === "" && rpgms.rpgm5 !== "") {
        hasRp = true;
        state.hasRpForModal = hasRp;
        rpgms.preRequisite = Settings.rateLoading.preRequisites.rpMsg3;
        rpgms.current = Settings.rateLoading.preRequisites.rpMsg5;
      }
    }
    if (rpgms.rpgm1 !== null && rpgms.rpgm2 !== null) {
      if (rpgms.rpgm1 === "" && rpgms.rpgm2 !== "") {
        hasRp = true;
        state.hasRpForModal = hasRp;
        rpgms.preRequisite = Settings.rateLoading.preRequisites.rpMsg1;
        rpgms.current = Settings.rateLoading.preRequisites.rpMsg2;
      }
    }
    if (rpgms.rpgm3 !== null && rpgms.rpgm4 !== null) {
      if (rpgms.rpgm3 === "" && rpgms.rpgm4 !== "") {
        hasRp = true;
        state.hasRpForModal = hasRp;
        rpgms.preRequisite = Settings.rateLoading.preRequisites.rpMsg3;
        rpgms.current = Settings.rateLoading.preRequisites.rpMsg4;
      }
    }
    if (rpgms.rpgm5 !== null && rpgms.rpgm6 !== null) {
      if (rpgms.rpgm5 === "" && rpgms.rpgm6 !== "") {
        hasRp = true;
        state.hasRpForModal = hasRp;
        rpgms.preRequisite = Settings.rateLoading.preRequisites.rpMsg5;
        rpgms.current = Settings.rateLoading.preRequisites.rpMsg6;
      }
    }

    if (hasRp) {
      state.showRpgmModal = !rpgms.showRpgmModal;
      state.preRequisite = rpgms.preRequisite;
      state.current = rpgms.current;
      return false;
    }

    if (rpgms.rpgm1 !== null && rpgms.rpgm1 !== "") {
      if (
        (rpgms.rpgm2 !== null &&
          rpgms.rpgm2 !== "" &&
          rpgms.rpgm1 === rpgms.rpgm2) ||
        (rpgms.rpgm3 !== null &&
          rpgms.rpgm3 !== "" &&
          rpgms.rpgm1 === rpgms.rpgm3) ||
        (rpgms.rpgm4 !== null &&
          rpgms.rpgm4 !== "" &&
          rpgms.rpgm1 === rpgms.rpgm4) ||
        (rpgms.rpgm5 !== null &&
          rpgms.rpgm5 != "" &&
          rpgms.rpgm1 === rpgms.rpgm5) ||
        (rpgms.rpgm6 !== null &&
          rpgms.rpgm6 != "" &&
          rpgms.rpgm1 === rpgms.rpgm6)
      ) {
        hasDupRp = true;
      }
    }

    if (rpgms.rpgm2 !== null && rpgms.rpgm2 !== "") {
      if (
        (rpgms.rpgm3 !== null &&
          rpgms.rpgm3 !== "" &&
          rpgms.rpgm2 === rpgms.rpgm3) ||
        (rpgms.rpgm4 !== null &&
          rpgms.rpgm4 !== "" &&
          rpgms.rpgm2 === rpgms.rpgm4) ||
        (rpgms.rpgm5 !== null &&
          rpgms.rpgm5 !== "" &&
          rpgms.rpgm2 === rpgms.rpgm5) ||
        (rpgms.rpgm6 !== null &&
          rpgms.rpgm6 !== "" &&
          rpgms.rpgm2 === rpgms.rpgm6)
      ) {
        hasDupRp = true;
      }
    }
    if (rpgms.rpgm3 !== null && rpgms.rpgm3 !== "") {
      if (
        (rpgms.rpgm4 !== null &&
          rpgms.rpgm4 !== "" &&
          rpgms.rpgm3 === rpgms.rpgm4) ||
        (rpgms.rpgm5 !== null &&
          rpgms.rpgm5 !== "" &&
          rpgms.rpgm3 === rpgms.rpgm5) ||
        (rpgms.rpgm6 !== null &&
          rpgms.rpgm6 !== "" &&
          rpgms.rpgm3 === rpgms.rpgm6)
      ) {
        hasDupRp = true;
      }
    }
    if (rpgms.rpgm4 !== null && rpgms.rpgm4 !== "") {
      if (
        (rpgms.rpgm5 !== null &&
          rpgms.rpgm5 !== "" &&
          rpgms.rpgm4 === rpgms.rpgm5) ||
        (rpgms.rpgm6 !== null &&
          rpgms.rpgm6 !== "" &&
          rpgms.rpgm4 === rpgms.rpgm6)
      ) {
        hasDupRp = true;
      }
    }
    if (rpgms.rpgm5 !== null && rpgms.rpgm5 !== "") {
      if (
        rpgms.rpgm6 !== null &&
        rpgms.rpgm6 !== "" &&
        rpgms.rpgm5 === rpgms.rpgm6
      ) {
        hasDupRp = true;
      }
    }
    if (
      rpgms.modalId === Settings.rateLoading.rateOfferLookUpModal.updateBtnId
    ) {
      if (
        rpgms.rpgm1 === "" &&
        rpgms.rpgm2 === "" &&
        rpgms.rpgm3 === "" &&
        rpgms.rpgm4 === "" &&
        rpgms.rpgm5 === "" &&
        rpgms.rpgm6 === ""
      ) {
        hasDupRp = true;
      }
    }
    if (
      rpgms.modalId === Settings.rateLoading.rateOfferLookUpModal.gppUpdateBtnId
    ) {
      if (
        rpgms.rpgm1 === "" &&
        rpgms.rpgm2 === "" &&
        rpgms.rpgm3 === "" &&
        rpgms.rpgm4 === ""
      ) {
        hasDupRp = true;
      }
    }
    if (hasDupRp) {
      state.showRpgmModal = !rpgms.showRpgmModal;
      return false;
    }

    setState({
      ...state,
    });
    return true;
  };

  const onSubmitRateOfferAndRateProgramHandler = () => {
    const roAndRpgms = { ...state };
    const rateOffer = { ...selectedRateOffer };
    if (
      searchSelect !== null &&
      searchSelect !== "" &&
      rateOffer.name !== null &&
      rateOffer.name !== ""
    ) {
      if (
        roAndRpgms.modalId ===
        Settings.rateLoading.rateOfferLookUpModal.updateBtnId
      ) {
        if (areRateProgramsUnique()) {
          roAndRpgms.rateLoadingData.rateprograms[0].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.rateprograms[0].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.rateprograms[1].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.rateprograms[1].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.rateprograms[2].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.rateprograms[2].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.rateprograms[3].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.rateprograms[3].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.rateprograms[4].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.rateprograms[4].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.rateprograms[5].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.rateprograms[5].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.rateprograms[0].rateProg =
            roAndRpgms.rpgm1;
          roAndRpgms.rateLoadingData.rateprograms[1].rateProg =
            roAndRpgms.rpgm2;
          roAndRpgms.rateLoadingData.rateprograms[2].rateProg =
            roAndRpgms.rpgm3;
          roAndRpgms.rateLoadingData.rateprograms[3].rateProg =
            roAndRpgms.rpgm4;
          roAndRpgms.rateLoadingData.rateprograms[4].rateProg =
            roAndRpgms.rpgm5;
          roAndRpgms.rateLoadingData.rateprograms[5].rateProg =
            roAndRpgms.rpgm6;
          roAndRpgms.showModal = !roAndRpgms.showModal;
        }
      }
      if (
        roAndRpgms.modalId ===
        Settings.rateLoading.rateOfferLookUpModal.gppUpdateBtnId
      ) {
        if (areRateProgramsUnique()) {
          roAndRpgms.rateLoadingData.aerrateprograms[0].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.aerrateprograms[0].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.aerrateprograms[1].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.aerrateprograms[1].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.aerrateprograms[2].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.aerrateprograms[2].rateOfferName =
            rateOffer.name;
          roAndRpgms.rateLoadingData.aerrateprograms[3].rateOfferId =
            rateOffer.rateOfferId;
          roAndRpgms.rateLoadingData.aerrateprograms[3].rateOfferName =
            rateOffer.name;

          roAndRpgms.rateLoadingData.aerrateprograms[0].rateProg =
            roAndRpgms.rpgm1;
          roAndRpgms.rateLoadingData.aerrateprograms[1].rateProg =
            roAndRpgms.rpgm2;
          roAndRpgms.rateLoadingData.aerrateprograms[2].rateProg =
            roAndRpgms.rpgm3;
          roAndRpgms.rateLoadingData.aerrateprograms[3].rateProg =
            roAndRpgms.rpgm4;
          roAndRpgms.showModal = !roAndRpgms.showModal;
        }
      }
    }

    setState({
      ...state,
      formChg: true,
      showModal: roAndRpgms.showModal,
      rateLoadingData: {
        ...state.rateLoadingData,
        rateprograms: roAndRpgms.rateLoadingData.rateprograms,
        aerrateprograms: roAndRpgms.rateLoadingData.aerrateprograms,
      },
    });
    emptyDatesValidationCheckOnChange();
  };

  const onRateOfferChangeHandler = (event) => {
    return new Promise((resolve, reject) => {
      const searchText = event.searchString;
      setSearchSelect(searchText);
      return API.getRateOffers(searchText, event.start, event.end).then(
        (data) => {
          if (data.length > 0) {
            setState({
              ...state,
              rateOffers: data,
            });
            setSelectedRateOffer({
              ...selectedRateOffer,
              name: searchText,
            });
            const chosenRateOffer = state.rateOffers.find((rateOffer) => {
              return rateOffer.name === searchText;
            });

            if (chosenRateOffer) {
              setSelectedRateOffer({
                ...selectedRateOffer,
                rateOfferId: chosenRateOffer.rateOfferId,
                name: chosenRateOffer.name,
                startIndex: event.start,
                noRateOffers: false,
              });
            } else {
              setSelectedRateOffer({
                ...selectedRateOffer,
                rateOfferId: null,
                name: "",
                noRateOffers: false,
              });
            }
            resolve(data);
          } else {
            setSelectedRateOffer({
              ...selectedRateOffer,
              rateOfferId: null,
              name: searchText,
              startIndex: event.start,
              noRateOffers: true,
            });
            resolve(data);
          }
        }
      );
    });
  };

  const showModal = () => {
    setState({
      ...state,
      showModal: !state.showModal,
    });
    emptyDatesValidationCheckOnChange();
  };

  const floatDefPerModal = () => {
    setState({
      ...state,
      floatDefPerModal: !state.floatDefPerModal,
    });
  };

  const showRpgmModal = () => {
    setState({
      ...state,
      showRpgmModal: !state.showRpgmModal,
    });
  };

  const showDateModal = () => {
    setState({
      ...state,
      showDateModal: !state.showDateModal,
    });
  };

  const onInternalPASNotesChangeHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.internalpasnotes = event.target.value;
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onInternalPASNotesBlurHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.internalpasnotes = event.target.value;
    if (rateData.internalpasnotes.length > Settings.rateLoading.maxLength) {
      rateData.internalpasnotes = rateData.internalpasnotes.substr(
        0,
        Settings.rateLoading.maxLength - 1
      );
      alert(Settings.rateLoading.formFields.internalPASNotes.alertMsg);
    }
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onRateLoadingNotesChangeHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.rateLoadingNotes = event.target.value;
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onRateLoadingNotesBlurHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.rateLoadingNotes = event.target.value;
    if (rateData.rateLoadingNotes.length > Settings.rateLoading.maxLength) {
      rateData.rateLoadingNotes = rateData.rateLoadingNotes.substr(
        0,
        Settings.rateLoading.maxLength - 1
      );
      alert(Settings.rateLoading.formFields.internalPASNotes.alertMsg);
    }
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onRateLoadINstructionsHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.rateLoadInstructionsGDS = event.target.value;
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onAnalysisReportHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.analysisreportout = event.target.value;
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onClusterCodeChange = (event) => {
    state.rateLoadingData.clustercode = event.target.value;
    setState({
      ...state,
      formChg: true,
    });
  };

  const onThirdPartyLoginHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.set_id = event.target.value;
    setState({
      ...state,
      rateLoadingData: rateData,
      formChg: true,
    });
  };

  const onThirdPartyPasswordHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    rateData.rate_plan_id = event.target.value;
    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onChangeFeildValue = (rowData, field, event) => {
    const selectedRateLoad = { ...state.rateLoadingData };
    const index = selectedRateLoad.brands.findIndex(
      (element) => element.affiliationid == rowData.affiliationid
    );

    if (field == "checkbox") {
      const { checked } = event.target;
      if (checked == false) {
        selectedRateLoad.brands[index].canprice = "N";
      } else {
        selectedRateLoad.brands[index].canprice = "Y";
      }
    } else if (field == "select") {
      selectedRateLoad.brands[index].currentroompool = Number(
        event.target.value
      );
    } else if (field == "input") {
      selectedRateLoad.brands[index].default_percent = event.target.value;
      if (
        Number(selectedRateLoad.brands[index].default_percent) >
          Settings.rateLoading.maxFloatDefaultPercentLimit ||
        /\D/.test(selectedRateLoad.brands[index].default_percent)
      ) {
        selectedRateLoad.brands[index].showToolTips = true;
        selectedRateLoad.brands[index].showWarningIcon = true;
      } else {
        selectedRateLoad.brands[index].showToolTips = false;
        selectedRateLoad.brands[index].showWarningIcon = false;
      }
    } else if (field == "gpp_value") {
      const { checked } = event.target;
      if (checked == false) {
        selectedRateLoad.brands[index].gpp_value = "N";
      } else {
        selectedRateLoad.brands[index].gpp_value = "Y";
      }
    }

    setState({ ...state, formChg: true, rateLoadingData: selectedRateLoad });
    emptyDatesValidationCheckOnChange();
  };

  const onFloatDefaultBlurHandler = (rowData) => {
    const selectedRateLoad = { ...state.rateLoadingData };
    const index = selectedRateLoad.brands.findIndex(
      (element) => element.affiliationid == rowData.affiliationid
    );
    selectedRateLoad.brands[index].showToolTips = false;
    setState({ ...state, formChg: true, rateLoadingData: selectedRateLoad });
  };

  const onFloatDefaultClickHandler = (rowData, event) => {
    const selectedRateLoad = { ...state.rateLoadingData };
    const index = selectedRateLoad.brands.findIndex(
      (element) => element.affiliationid == rowData.affiliationid
    );
    if (
      Number(selectedRateLoad.brands[index].default_percent) >
        Settings.rateLoading.maxFloatDefaultPercentLimit ||
      /\D/.test(selectedRateLoad.brands[index].default_percent)
    ) {
      selectedRateLoad.brands[index].showWarningIcon = true;
      selectedRateLoad.brands[index].showToolTips = true;
      setState({ ...state, formChg: true, rateLoadingData: selectedRateLoad });
    }
  };

  const validationCheck = () => {
    let res = true;
    const selectedRateLoad = { ...state.rateLoadingData };
    for (let i = 0; i < selectedRateLoad.brands.length; i++) {
      if (selectedRateLoad.brands[i].default_percent === null)
        selectedRateLoad.brands[i].default_percent = 0;
      if (
        selectedRateLoad.brands[i].default_percent >
          Settings.rateLoading.maxFloatDefaultPercentLimit ||
        /\D/.test(selectedRateLoad.brands[i].default_percent)
      ) {
        state.floatDefPerModal = true;
        res = false;

        break;
      }
    }

    setState({
      ...state,
      floatDefPerModal: state.floatDefPerModal,
    });
    emptyDatesValidationCheckOnChange();
    return res;
  };

  const onStartEndDateChangeHandler = (event) => {
    const rateData = { ...state.rateLoadingData };
    if (event.target.id === Settings.rateLoading.formFields.startDate.id) {
      rateData.shortStartmoddate = event.target.value;
    }
    if (event.target.id === Settings.rateLoading.formFields.endDate.id) {
      rateData.shortEndmoddate = event.target.value;
    }
    if (event.target.id === Settings.rateLoading.formFields.qStartDate.id) {
      rateData.shortStartqmoddate = event.target.value;
    }
    if (event.target.id === Settings.rateLoading.formFields.qEndDate.id) {
      rateData.shortEndqmoddate = event.target.value;
    }

    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
  };

  const onRatesInputHandler = (event) => {
    if (event.target.value.length === 10 || event.target.value.length === 0) {
      if (event.target.id === Settings.rateLoading.formFields.startDate.id) {
        state.rateLoadingData.shortStartmoddate = event.target.value;
      }
      if (event.target.id === Settings.rateLoading.formFields.endDate.id) {
        state.rateLoadingData.shortEndmoddate = event.target.value;
      }
      state.formChg = true;
      setState({ ...state });
    }
  };

  const onQuestionsInputHandler = (event) => {
    if (event.target.value.length === 10 || event.target.value.length === 0) {
      if (event.target.id === Settings.rateLoading.formFields.qStartDate.id) {
        state.rateLoadingData.shortStartqmoddate = event.target.value;
      }
      if (event.target.id === Settings.rateLoading.formFields.qEndDate.id) {
        state.rateLoadingData.shortEndqmoddate = event.target.value;
      }
      state.formChg = true;
      setState({ ...state });
    }
  };

  const onQuestionsBlurHandler = (event, property) => {
    const dateVal = event.target.value;

    if (dateVal == null || dateVal === "") {
      setState({
        ...state,
        formChg: true,
        rateLoadingData: {
          ...state.rateLoadingData,
          [property]: "",
        },
      });

      return false;
    }
    const dateValues = dateVal.split("/");

    if (dateValues == null) return false;
    const dtYear = Number(dateValues[2]);
    const dtMonth = Number(dateValues[0]);
    const dtDay = Number(dateValues[1]);

    if (dtMonth < 1 || dtMonth > 12)
      alert(
        `Invalid month (${dtMonth}). ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    else if (dtDay < 1 || dtDay > 31)
      alert(
        `Invalid day ${dtDay}. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    else if (
      (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) &&
      dtDay == 31
    )
      alert(
        `Day must be less than 30. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    else if (dtMonth == 2) {
      const isleap =
        dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
      if (dtDay > 29 || (dtDay == 29 && !isleap))
        alert(
          `Day must be less than 28. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
        );
    }
  };

  const onRatesStartDateHideHandler = () => {
    let validDate = true;
    let shortStartDate = state.rateLoadingData.shortStartmoddate;
    validDate = Util.isDate(shortStartDate);
    if (!validDate) {
      shortStartDate = "";
    } else {
      if (shortStartDate !== "") {
        shortStartDate = Util.setDatewithYYYY(shortStartDate);
      }
    }
    if (validDate) {
      ratesStartEndDateValidation();
    }
    setState({
      ...state,
      formChg: true,
      rateLoadingData: {
        ...state.rateLoadingData,
        shortStartmoddate: shortStartDate,
      },
    });
  };

  const onRatesEndDateHideHandler = () => {
    let validDate = true;
    let shortEndDate = state.rateLoadingData.shortEndmoddate;
    validDate = Util.isDate(shortEndDate);
    if (!validDate) {
      shortEndDate = "";
    } else {
      if (shortEndDate !== "") {
        shortEndDate = Util.setDatewithYYYY(shortEndDate);
      }
    }
    if (validDate) {
      ratesStartEndDateValidation();
    }
    setState({
      ...state,
      formChg: true,
      rateLoadingData: {
        ...state.rateLoadingData,
        shortEndmoddate: shortEndDate,
      },
    });
  };

  const onQuestionsStartDateHideHandler = () => {
    let validDate = true;
    let shortStartQDate = state.rateLoadingData.shortStartqmoddate;
    validDate = Util.isDate(shortStartQDate);
    if (!validDate) {
      shortStartQDate = "";
    } else {
      if (shortStartQDate !== "") {
        shortStartQDate = Util.setDatewithYYYY(shortStartQDate);
      }
    }
    if (validDate) {
      questionsStartEndDateValidation();
    }
    setState({
      ...state,
      formChg: true,
      rateLoadingData: {
        ...state.rateLoadingData,
        shortStartqmoddate: shortStartQDate,
      },
    });
  };

  const onQuestionsEndDateHideHandler = () => {
    let validDate = true;
    let shortEndQDate = state.rateLoadingData.shortEndqmoddate;
    validDate = Util.isDate(shortEndQDate);
    if (!validDate) {
      shortEndQDate = "";
    } else {
      if (shortEndQDate !== "") {
        shortEndQDate = Util.setDatewithYYYY(shortEndQDate);
      }
    }
    if (validDate) {
      questionsStartEndDateValidation();
    }
    setState({
      ...state,
      formChg: true,
      rateLoadingData: {
        ...state.rateLoadingData,
        shortEndqmoddate: shortEndQDate,
      },
    });
  };

  const ratesStartEndDateValidation = () => {
    const shortStartDate = state.rateLoadingData.shortStartmoddate;
    const shortEndDate = state.rateLoadingData.shortEndmoddate;

    if (shortStartDate !== "" && shortEndDate !== "") {
      Util.isValidDate(shortStartDate, shortEndDate);
    }
  };

  const questionsStartEndDateValidation = () => {
    const shortStartQDate = state.rateLoadingData.shortStartqmoddate;
    const shortEndQDate = state.rateLoadingData.shortEndqmoddate;

    if (shortStartQDate !== "" && shortEndQDate !== "") {
      Util.isValidDate(shortStartQDate, shortEndQDate);
    }
  };

  const onStartEndDateBlurHandler = (event) => {
    let validDate = true;
    const rateData = { ...state.rateLoadingData };

    if (validDate) {
      if (
        rateData.shortStartmoddate !== "" &&
        rateData.shortEndmoddate !== ""
      ) {
        validDate = Util.isValidDate(
          rateData.shortStartmoddate,
          rateData.shortEndmoddate
        );
      }
    }

    if (validDate) {
      if (event.target.id === Settings.rateLoading.formFields.qStartDate.id) {
        validDate = Util.isDate(event.target.value);
        if (!validDate) {
          rateData.shortStartqmoddate = "";
        } else {
          rateData.shortStartqmoddate = Util.setDatewithYYYY(
            event.target.value
          );
        }
      }
    }

    if (validDate) {
      if (event.target.id === Settings.rateLoading.formFields.qEndDate.id) {
        validDate = Util.isDate(event.target.value);
        if (!validDate) {
          rateData.shortEndqmoddate = "";
        } else {
          rateData.shortEndqmoddate = Util.setDatewithYYYY(event.target.value);
        }
      }
    }

    if (validDate) {
      if (
        rateData.shortStartqmoddate !== "" &&
        rateData.shortEndqmoddate !== ""
      ) {
        validDate = Util.isValidDate(
          rateData.shortStartqmoddate,
          rateData.shortEndqmoddate
        );
      }
    }

    setState({
      ...state,
      formChg: true,
      rateLoadingData: rateData,
    });
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

  const rateLoadingContext = {
    state,
    selectedRateOffer,
    emptyRateProgram,
    setState,
    setSelectedRateOffer,
    setEmptyRateProgram,
    setRateLoadingListData,
    showModal,
    showRpgmModal,
    showDateModal,
    onChangeFeildValue,
    onAccountAllowsFloatVPChangeHandler,
    onFloatVPProductEnabledChangeHandler,
    onHotelCanPriceFloatVPChangeHandler,
    onHotelCanModifyOrRateOfferUpdateHandler,
    getRateOffers,
    getNextRateOffers,
    onRateOfferSelectHandler,
    onRateOfferChangeHandler,
    onSubmitRateOfferAndRateProgramHandler,
    autoSave,
    onRpgmsChangeHandler,
    onStartEndDateChangeHandler,
    onStartEndDateBlurHandler,
    onInternalPASNotesBlurHandler,
    onInternalPASNotesChangeHandler,
    onRateLoadingNotesChangeHandler,
    onRateLoadingNotesBlurHandler,
    onRemoveRateOfferAndRateProgramsHandler,
    onRateLoadINstructionsHandler,
    onAnalysisReportHandler,
    onClusterCodeChange,
    onThirdPartyLoginHandler,
    onThirdPartyPasswordHandler,
    onRatesChangeCalendar,
    onQuestionsChangeCalendar,
    onRatesInputHandler,
    onQuestionsInputHandler,
    onRatesStartDateHideHandler,
    onRatesEndDateHideHandler,
    onQuestionsStartDateHideHandler,
    onQuestionsEndDateHideHandler,
    validationCheck,
    floatDefPerModal,
    onFloatDefaultBlurHandler,
    onFloatDefaultClickHandler,
    onQuestionsBlurHandler,
    setLoader,
    resetLoader,
    emptyDatesValidationCheckOnChange,
  };

  return (
    <RateLoadingContext.Provider value={rateLoadingContext}>
      {props.children}
    </RateLoadingContext.Provider>
  );
};

export const RateLoadingConsumer = RateLoadingContext.Consumer;
export default RateLoadingContext;
