import React, { useContext, useState } from "react";
import Util from "../../../../admin/utils/Utils";
import Settings from "../static/Settings";
import API from "../service/API";
import { useLocation } from "react-router-dom";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const PricingStandardsContext = React.createContext({});

export const PricingStandardsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContextType = useContext(HotelPricingContext);
  let isDropDownSelected = false;
  const [onChangeTrigger, setOnChangeTrigger] = useState(false);
  const [state, setState] = useState({
    Nextpath: "",
    standards: {
      bedtypeList: [
        {
          bedtypeid: null,
          bedtype: null,
          seqid: null,
          bedtype_view: null,
          used: null,
        },
      ],
      hotelroompoolList: [],
      hotelroompoolListWithNA: [],
      currencyList: [
        {
          currencycode: null,
          currencyname: null,
        },
      ],
      hotelRFPStandards: {
        distanceunit: null,
        commissionrate: null,
        aggregate_tax_inc: null,
        service_fee_type_included: null,
        netoutrates: null,
        currencycode: null,
        delete_old_rateprogs: "Y",
        standardrmdesc: null,
        currencyname: null,
        iscomplete: null,
        canhavefirstroompool: null,
        canhavesecondroompool: null,
        canhavethirdroompool: null,
        hotelRFPStandardRmPools: [
          {
            roomClassSeq: null,
            bedtypeid: null,
            bedtype: null,
            num_rms_actl_capacity: null,
            roomPools: [
              {
                roomPoolSeq: null,
                roomPool: null,
                rpgm: null,
                restrictionRpgm: null,
                actualNumRooms: null,
                roomtypeid: null,
                roomtype: null,
              },
            ],
          },
        ],
        exempt_gpp: null,
      },
      roomtypeList: [
        {
          promo_roomtypeid: null,
          roomtype: null,
          roomtype_view: null,
          seqid: null,
          used: null,
        },
      ],
      generalReadOnly: false,
      contactemail: null,
      softLaunchEnabled: null,
      disableSecondaryRoomPool: null,
      contactName: null,
    },
    isGpppExemptDisabled: false,
    formChg: "N",
    roleDetails: {
      eid: null,
      role: null,
      fullName: null,
      email: null,
    },
    pageLoad: false,
  });

  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContextType?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");
  let click_navigate = false;

  const parentContext = useContext(HotelPricingContext);

  const setPageLoad = (data) => {
    setState({
      ...state,
      pageLoad: data,
    });
  };

  const setHotelRFPStandard = (data: any) => {
    appContext.setStandardAlert(false);
    const standardsData = { ...state.standards };

    const currencyList1 = [{}];
    standardsData.bedtypeList = data.bedtypeList;

    data.currencyList.map(({ currencycode, currencyname }) => {
      const obj = {};
      obj.currencycode = currencycode;
      obj.currencyname = currencycode + " - " + currencyname;
      currencyList1.push(obj);
    });

    standardsData.currencyList = currencyList1;
    // if (
    //   data.hotelRFPStandards.delete_old_rateprogs == "" ||
    //   data.hotelRFPStandards.delete_old_rateprogs == null
    // ) {
    //   appContext.setPASSelected(true);
    // } else {
    //   appContext.setPASSelected(false);
    // }
    standardsData.hotelRFPStandards = data.hotelRFPStandards;

    standardsData.hotelroompoolList = data.hotelroompoolList;
    standardsData.hotelroompoolListWithNA = Util.appendJsonObj(
      Settings.NAObj,
      data.hotelroompoolList
    );
    standardsData.roomtypeList = Util.appendJsonObj(
      Settings.blankRoomType,
      data.roomtypeList
    );
    standardsData.generalReadOnly = data.GeneralReadOnly;
    standardsData.contactemail = data.contactemail;
    standardsData.contactName = data.contactName;
    standardsData.softLaunchEnabled = data.softLaunchEnabled;
    const newArray = [];
    data?.hotelRFPStandards?.hotelRFPStandardRmPools?.map((roomData) => {
      const roomSeq = roomData.roomClassSeq;
      newArray[roomSeq - 1] = roomData;
    });
    const roomArray = [];
    newArray.map((data, index) => {
      const roomPoolArray = [];

      data.roomPools.map((room, index) => {
        const roomPoolSeq = room.roomPoolSeq;
        roomPoolArray[roomPoolSeq - 1] = room;
      });
      roomArray[index] = roomPoolArray;
    });
    newArray.map((data, index) => {
      newArray[index].roomPools = roomArray[index];
    });
    standardsData.hotelRFPStandards.hotelRFPStandardRmPools.map(
      (data, index) => {
        standardsData.hotelRFPStandards.hotelRFPStandardRmPools[index] =
          newArray[index];
      }
    );
    standardsData.disableSecondaryRoomPool = data.disableSecondaryRoomPool;
    standardsData.hotelRFPStandards.hotelRFPStandardRmPools.map(
      (roomPoolData) => {
        roomPoolData.roomPools.map((room) => {
          if (room.roomPool === null || room.roomPool === "NA")
            room.roomPool = -1;
          if (room.roomtypeid === null || room.roomtypeid === "NA")
            room.roomtypeid = -1;
        });
      }
    );

    if (
      standardsData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0]
        ?.roomPool == -1 &&
      appContext.user.role !== "MFPSALES" &&
      appContext.user.role !== "MFPFSALE"
    ) {
      standardsData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool =
        standardsData?.hotelroompoolList[0]?.roompool;
      standardsData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].onChangeEvtTrigger =
        true;
    } else {
      standardsData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool =
        standardsData?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[0]?.roomPool;
    }
    final_check("", "");

    setState({
      ...state,
      roleDetails: { ...state.roleDetails, role: appContext.user.role },
      standards: standardsData,
    });
  };

  const gpp_disable = () => {
    const stateData = { ...state };
    if (
      stateData.roleDetails.role === Settings.isHotelUser &&
      stateData.standards.softLaunchEnabled === Settings.nLabel
    ) {
      if (stateData.standards.hotelRFPStandards.exempt_gpp !== "") {
        if (stateData.standards.hotelRFPStandards.exempt_gpp === null) {
          appContext.setGPPSelected(true);
          parentContextType.setStandardsAlertData(
            true,
            Settings.alert.gppQuestion
          );
          stateData.isGpppExemptDisabled = false;
        } else {
          appContext.setGPPSelected(false);
          parentContextType.setStandardsAlertData(false, "");
          stateData.isGpppExemptDisabled = true;
        }
      }
    }
    if (
      stateData.standards.generalReadOnly ||
      (stateData.roleDetails.role === Settings.isHotelUser &&
        stateData.standards.disableSecondaryRoomPool === Settings.yLabel)
    ) {
      stateData.isGpppExemptDisabled = true;
    }
    setState(stateData);

    return true;
  };
  const dataConversion = (roomPoolList) => {
    const newArray = [];
    roomPoolList.map((roomPoolData, i) => {
      const jsonObj = {
        roomPools: [
          { roomtypeid: -1, roomPool: -1 },
          { roomtypeid: -1, roomPool: -1 },
        ],
        bedtypeid: "",
      };
      const { bedtypeid, roomPools, ...restData } = roomPoolData;
      roomPools.map((room, index) => {
        if (i === 0 && index === 0) {
          jsonObj.roomPools[index].roomtypeid = isNaN(parseInt(room.roomtypeid))
            ? -1
            : parseInt(room.roomtypeid);
          jsonObj.roomPools[index].roomPool =
            room.roomPool === "NA" ? -1 : room.roomPool;
        } else {
          jsonObj.roomPools[index].roomtypeid = isNaN(parseInt(room.roomtypeid))
            ? -1
            : parseInt(room.roomtypeid);
          jsonObj.roomPools[index].roomPool =
            room.roomPool === "NA" ? -1 : room.roomPool;
        }
      });
      jsonObj.bedtypeid = bedtypeid;
      newArray.push(jsonObj);
    });
    return newArray;
  };
  const flag_onchange = () => {
    setState({
      ...state,
      formChg: "Y",
    });
    return true;
  };

  const handleChange = (event) => {
    isDropDownSelected = true;
    const { id, value } = event.target;
    const stateData = { ...state.standards };

    if (id === Settings.fields.currencyUsedQuotations.id)
      stateData.hotelRFPStandards.currencycode = value;

    if (id === Settings.fields.deleteOldRatePrgms.id) {
      changeDeleteOldRP();
      if (event.target.value == "") {
        appContext.setPASSelected(true);
      } else {
        appContext.setPASSelected(false);
      }
      stateData.hotelRFPStandards.delete_old_rateprogs = value;
      final_check("", Settings.headers.fromDropdown);
    }

    if (id === Settings.fields.exempt_gpp.id) {
      if (event.target.value == "") {
        appContext.setGPPSelected(true);
      } else {
        appContext.setGPPSelected(false);
      }
      parentContextType.setStandardsAlertData(false, "");
      stateData.hotelRFPStandards.exempt_gpp = value;
      final_check("", "");
    }

    setState({
      ...state,
      standards: stateData,
      formChg: "Y",
    });
  };

  const roompoolflag_onchange = (e, roomClassSeq, roomPoolSeq) => {
    isDropDownSelected = true;
    setOnChangeTrigger(true);
    const stateData = { ...state.standards };
    stateData.hotelRFPStandards.hotelRFPStandardRmPools.map((roomPoolData) => {
      roomPoolData.roomPools.map((room) => {
        if (room.roomPool === e.target.value) {
          appContext.setSamePoolSelected(true);
          appContext.setErrorMessageAlert({
            show: true,
            message:
              "You cannot have the same room pool across room pool groups ",
            type: "browserAlert",
          });
          return false;
        } else {
          appContext.setSamePoolSelected(false);
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
          return true;
        }
      });
    });
    if (
      stateData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0]
        .roomPool == -1
    ) {
      stateData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool =
        stateData?.hotelroompoolList[0].roompool;
    } else {
      stateData.hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool =
        stateData?.hotelRFPStandards?.hotelRFPStandardRmPools[0]?.roomPools[0]?.roomPool;
    }
    stateData.hotelRFPStandards.hotelRFPStandardRmPools[
      `${roomClassSeq}`
    ].roomPools[`${roomPoolSeq}`].roomPool = e.target.value;
    if (e.target.value === -1)
      stateData.hotelRFPStandards.hotelRFPStandardRmPools[
        `${roomClassSeq}`
      ].roomPools[`${roomPoolSeq}`].roomtypeid = e.target.value;

    if (state.roleDetails.role === Settings.isPASAdmin) {
      parentContextType.setStandardsAlertData(false, "");
      alert(`${Settings.alertMessages.roomPoolFlagChangeAlert}`);
    }

    stateData.hotelRFPStandards.hotelRFPStandardRmPools[
      `${roomClassSeq}`
    ].roomPools[`${roomPoolSeq}`].roomtypeid = -1;
    stateData.hotelRFPStandards.hotelRFPStandardRmPools[
      `${roomClassSeq}`
    ].roomPools[`${roomPoolSeq}`].onChangeEvtTrigger = true;
    setState({ ...state, standards: stateData, formChg: "Y" });
    final_check("", "");
    return true;
  };

  const roomTypeChangeHandler = (e, roomClassSeq, roomPoolSeq) => {
    isDropDownSelected = true;
    const stateData = { ...state.standards };
    stateData.hotelRFPStandards.hotelRFPStandardRmPools[
      `${roomClassSeq}`
    ].roomPools[`${roomPoolSeq}`].roomtypeid = e.target.value;

    setState({ ...state, standards: stateData, formChg: "Y" });
    final_check("", "");
    return true;
  };

  const changeDeleteOldRP = () => {
    if (state.roleDetails.role === Settings.isHotelUser)
      alert(`${Settings.alertMessages.changeDeleteOldRP}`);
    return true;
  };

  const onContentLoad = () => {
    gpp_disable();
    click_navigate = false;
    if (
      state.standards.hotelRFPStandards.currencycode === "" &&
      state.roleDetails.role !== Settings.isPASAdmin
    ) {
      parentContextType.setStandardsAlertData(false, "");
      alert(
        `${Settings.alertMessages.noCurrency} ${state.standards.contactName} .`
      );
    }
    final_check("", "");
  };

  const onContentBeforeunload = () => {
    if (!click_navigate) {
      if (state.formChg === "Y") {
        //To Do Unable to find on Exisiting Appliction
        // event.returnValue = "You have made changes to the information.\n\n  To save your changes\n\n\t1.) press the \"Cancel\" button on this message\n\t2.) press \"Save and Exit\".";
      }
    }
  };

  const final_check = (msg, fromElement) => {
    let bOK = true;
    const msgArray = [];
    const stateData = { ...state };
    let strEmpty = "";
    const strIncorrect = "";
    if (msg != "") {
      alert(msg);
      return false;
    }

    if (
      state.roleDetails.role !== Settings.isPASAdmin &&
      !state.standards.generalReadOnly
    ) {
      parentContextType.setStandardsAlertData(false, "");
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      if (bOK) {
        if (stateData.standards.hotelRFPStandards.currencycode === "") {
          strEmpty = `${Settings.alertMessages.noCurrency} ${stateData.standards.contactName} .`;
          alert(strEmpty);
          click_navigate = true;
          stateData.formChg = "N";
          return true;
        }
      }

      // if (bOK) {
      //   if (
      //     stateData.standards.hotelRFPStandards.delete_old_rateprogs === "" ||
      //     stateData.standards.hotelRFPStandards.delete_old_rateprogs == null
      //   ) {
      //     // bOK = false;
      //     appContext.setPASSelected(true);
      //     appContext.setStandardAlert(true);
      //     if (
      //       stateData.standards.contactName &&
      //       fromElement != Settings.headers.fromDropdown &&
      //       stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      //     ) {
      //       strEmpty = `You must select if ${stateData.standards.contactName} is to delete old rate programs for this hotel`;
      //     }
      //   } else {
      //     appContext.setPASSelected(false);
      //     appContext.setStandardAlert(false);
      //   }
      // }

      if (bOK) {
        if (
          document.getElementById(
            "hotelRFPStandards.service_fee_type_included"
          ) != null
        ) {
          if (
            stateData.standards.hotelRFPStandards.service_fee_type_included ===
              "" ||
            stateData.standards.hotelRFPStandards.service_fee_type_included ===
              "Null"
          ) {
            bOK = false;
            strEmpty =
              "You must enter whether or not service fees are included";
          }
        }
      }

      if (bOK) {
        if (
          document.getElementById("hotelRFPStandards.aggregate_tax_inc") != null
        ) {
          if (
            stateData.standards.hotelRFPStandards.aggregate_tax_inc === "" ||
            stateData.standards.hotelRFPStandards.aggregate_tax_inc === "Null"
          ) {
            bOK = false;
            strEmpty = "You must enter whether or not taxes fees are included.";
          }
        }
      }

      const roompool1obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomPool"
      );
      const roompool1objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]
          ?.roomPools[0]?.roomPool;

      const roompool4obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[1].roomPool"
      );
      const roompool4objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]
          ?.roomPools[1]?.roomPool;

      const roompool2obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[0].roomPool"
      );
      const roompool2objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]
          ?.roomPools[0]?.roomPool;

      const roompool5obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[1].roomPool"
      );
      const roompool5objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]
          ?.roomPools[1]?.roomPool;

      const roompool3obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[0].roomPool"
      );
      const roompool3objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[2]
          ?.roomPools[0]?.roomPool;

      const roompool6obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[1].roomPool"
      );
      const roompool6objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[2]
          ?.roomPools[1]?.roomPool;

      const roomType1obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[0].roomtypeid"
      );
      const roomType1objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]
          ?.roomPools[0]?.roomtypeid;

      const roomType4obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[0].roomPools[1].roomtypeid"
      );
      const roomType4objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[0]
          ?.roomPools[1]?.roomtypeid;

      const roomType2obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[0].roomtypeid"
      );
      const roomType2objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]
          ?.roomPools[0]?.roomtypeid;

      const roomType5obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[1].roomPools[1].roomtypeid"
      );
      const roomType5objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[1]
          ?.roomPools[1]?.roomtypeid;

      const roomType3obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[0].roomtypeid"
      );
      const roomType3objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[2]
          ?.roomPools[0]?.roomtypeid;

      const roomType6obj = document.getElementById(
        "hotelRFPStandards.hotelRFPStandardRmPools[2].roomPools[1].roomtypeid"
      );
      const roomType6objVal =
        stateData.standards?.hotelRFPStandards?.hotelRFPStandardRmPools[2]
          ?.roomPools[1]?.roomtypeid;

      if (
        ((roompool1obj != null &&
          roompool1objVal != "-1" &&
          roompool1objVal != "NA") ||
          roompool1obj == null) &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType1obj != null && roomType1objVal == "-1") {
            bOK = false;
            appContext.setRtrpgonerponeSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must enter your Room Type for Room Pool Group 1 - Room Pool 1";
          } else {
            appContext.setRtrpgonerponeSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRtrpgonerponeSelected(false);
        appContext.setStandardAlert(false);
      }

      if (
        ((roompool4obj != null &&
          roompool4objVal != "-1" &&
          roompool4objVal != "NA") ||
          roompool4obj == null) &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType4obj != null && roomType4objVal == "-1") {
            bOK = false;
            appContext.setRtrpgonerptwoSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must enter your Room Type for Room Pool Group 1 - Room Pool 2";
          } else {
            appContext.setRtrpgonerptwoSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRtrpgonerptwoSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        ((roompool2obj != null &&
          roompool2objVal != "-1" &&
          roompool2objVal != "NA") ||
          roompool2obj == null) &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType2obj != null && roomType2objVal == "-1") {
            bOK = false;
            appContext.setRtrpgtworponeSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must enter your Room Type for Room Pool Group 2 - Room Pool 1";
          } else {
            appContext.setRtrpgtworponeSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRtrpgtworponeSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        ((roompool5obj != null &&
          roompool5objVal != "-1" &&
          roompool5objVal != "NA") ||
          roompool5obj == null) &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType5obj != null && roomType5objVal == "-1") {
            bOK = false;
            appContext.setRtrpgtworptwoSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must enter your Room Type for Room Pool Group 2 - Room Pool 2";
          } else {
            appContext.setRtrpgtworptwoSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRtrpgtworptwoSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        ((roompool3obj != null &&
          roompool3objVal != "-1" &&
          roompool3objVal != "NA") ||
          roompool3obj == null) &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType3obj != null && roomType3objVal == "-1") {
            bOK = false;
            appContext.setRtrpgthreerponeSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must enter your Room Type for Room Pool Group 3 - Room Pool 1";
          } else {
            appContext.setRtrpgthreerponeSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRtrpgthreerponeSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        ((roompool6obj != null &&
          roompool6objVal != "-1" &&
          roompool6objVal != "NA") ||
          roompool6obj == null) &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType6obj != null && roomType6objVal == "-1") {
            bOK = false;
            appContext.setRtrpgthreerptwoSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must enter your Room Type for Room Pool Group 3 - Room Pool 2";
          } else {
            appContext.setRtrpgthreerptwoSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRtrpgthreerptwoSelected(false);
        appContext.setStandardAlert(false);
      }

      if (
        roompool1obj != null &&
        (roompool1objVal == "-1" || roompool1objVal == "NA") &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType1obj != null && roomType1objVal != "-1") {
            bOK = false;
            appContext.setRpgonerponeSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must select Room Pool for Room Pool Group 1 - Room Pool 1 before selecting Room Type";
          } else {
            appContext.setRpgonerponeSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRpgonerponeSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        roompool4obj != null &&
        (roompool4objVal == "-1" || roompool4objVal == "NA") &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType4obj != null && roomType4objVal != "-1") {
            bOK = false;
            appContext.setRpgonerptwoSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must select Room Pool for Room Pool Group 1 - Room Pool 2 before selecting Room Type";
          } else {
            appContext.setRpgonerptwoSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRpgonerptwoSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        roompool2obj != null &&
        (roompool2objVal == "-1" || roompool2objVal == "NA") &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType2obj != null && roomType2objVal != "-1") {
            bOK = false;
            appContext.setRpgtworponeSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must select Room Pool for Room Pool Group 2 - Room Pool 1 before selecting Room Type";
          } else {
            appContext.setRpgtworponeSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRpgtworponeSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        roompool5obj != null &&
        (roompool5objVal == "-1" || roompool5objVal == "NA") &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType5obj != null && roomType5objVal != "-1") {
            bOK = false;
            appContext.setRpgtworptwoSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must select Room Pool for Room Pool Group 2 - Room Pool 2 before selecting Room Type";
          } else {
            appContext.setRpgtworptwoSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRpgtworptwoSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        roompool3obj != null &&
        (roompool3objVal == "-1" || roompool3objVal == "NA") &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType3obj != null && roomType3objVal != "-1") {
            bOK = false;
            appContext.setRpgthreerponeSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must select Room Pool for Room Pool Group 3 - Room Pool 1 before selecting Room Type";
          } else {
            appContext.setRpgthreerponeSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRpgthreerponeSelected(false);
        appContext.setStandardAlert(false);
      }
      if (
        roompool6obj != null &&
        (roompool6objVal == "-1" || roompool6objVal == "NA") &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (bOK) {
          if (roomType6obj != null && roomType6objVal != "-1") {
            bOK = false;
            appContext.setRpgthreerptwoSelected(true);
            appContext.setStandardAlert(true);
            strEmpty =
              "You must select Room Pool for Room Pool Group 3 - Room Pool 2 before selecting Room Type";
          } else {
            appContext.setRpgthreerptwoSelected(false);
            appContext.setStandardAlert(false);
          }
        }
      } else {
        appContext.setRpgthreerptwoSelected(false);
        appContext.setStandardAlert(false);
      }

      let hasdup = false;
      const hasrp = false;

      if (roompool1obj != null) {
        if (
          roompool1objVal != "-1" &&
          ((roompool2obj != null && roompool1objVal == roompool2objVal) ||
            (roompool3obj != null && roompool1objVal == roompool3objVal) ||
            (roompool4obj != null && roompool1objVal == roompool4objVal) ||
            (roompool5obj != null && roompool1objVal == roompool5objVal) ||
            (roompool6obj != null && roompool1objVal == roompool6objVal))
        ) {
          hasdup = true;
        }
      }
      if (roompool2obj != null) {
        if (
          roompool2objVal != "-1" &&
          ((roompool3obj != null && roompool2objVal == roompool3objVal) ||
            (roompool4obj != null && roompool2objVal == roompool4objVal) ||
            (roompool5obj != null && roompool2objVal == roompool5objVal) ||
            (roompool6obj != null && roompool2objVal == roompool6objVal))
        ) {
          hasdup = true;
        }
      }
      if (roompool3obj != null) {
        if (
          roompool3objVal != "-1" &&
          ((roompool4obj != null && roompool3objVal == roompool4objVal) ||
            (roompool5obj != null && roompool3objVal == roompool5objVal) ||
            (roompool6obj != null && roompool3objVal == roompool6objVal))
        ) {
          hasdup = true;
        }
      }
      if (roompool4obj != null) {
        if (
          roompool4objVal != "-1" &&
          ((roompool5obj != null && roompool4objVal == roompool5objVal) ||
            (roompool6obj != null && roompool4objVal == roompool6objVal))
        ) {
          hasdup = true;
        }
      }
      if (roompool5obj != null) {
        if (
          roompool5objVal != "-1" &&
          roompool6obj != null &&
          roompool5objVal == roompool6objVal
        ) {
          hasdup = true;
        }
      }
      if (hasdup) {
        bOK = false;
        appContext.setSamePoolSelected(true);
        appContext.setStandardAlert(true);
        msgArray.push(
          "You cannot have the same room pool across room pool groups "
        );
        appContext.setErrorMessageAlert({
          show: true,
          message:
            "You cannot have the same room pool across room pool groups ",
          type: "browserAlert",
        });
      } else {
        appContext.setSamePoolSelected(false);
        appContext.setStandardAlert(false);
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }

      if (
        roompool1obj != null &&
        bOK &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (roompool1objVal == "-1") {
          bOK = false;
          appContext.setRponerpgoneMustSelected(true);
          appContext.setStandardAlert(true);
          msgArray.push("You must select Room Pool 1 of Room Pool Group 1");
        }
      } else {
        appContext.setRponerpgoneMustSelected(false);
        appContext.setStandardAlert(false);
      }

      if (
        roompool2obj != null &&
        bOK &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (roompool2objVal != "-1" && roompool1objVal == "-1") {
          bOK = false;
          appContext.setRponerpgoneMustAlsoSelected(true);
          appContext.setStandardAlert(true);
          msgArray.push(
            "You must also select Room Pool 1 of Room Pool Group 1"
          );
        }
      } else {
        appContext.setRponerpgoneMustAlsoSelected(false);
        appContext.setStandardAlert(false);
      }

      if (
        roompool2obj != null &&
        bOK &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (
          roompool1objVal == "-1" ||
          roompool1objVal == "NA" ||
          ((roompool2objVal == "-1" || roompool2objVal == "NA") &&
            roompool5objVal != "-1" &&
            roompool5objVal != "NA")
        ) {
          bOK = false;
          if (roompool1objVal == "-1") {
            appContext.setRponerpgoneMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 1 "
            );
          } else if (roompool2objVal == "-1") {
            appContext.setRponerpgtwoMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 2 "
            );
          }
        }
      } else {
        appContext.setRponerpgoneMustAlsoSelected(false);
        appContext.setRponerpgtwoMustAlsoSelected(false);
        appContext.setStandardAlert(false);
      }

      if (
        roompool3obj != null &&
        bOK &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (
          roompool3objVal != "-1" &&
          roompool3objVal != "NA" &&
          ((roompool1objVal == "-1" && roompool3objVal != "NA") ||
            roompool2objVal == "-1" ||
            roompool2objVal == "NA")
        ) {
          bOK = false;
          if (roompool1objVal == "-1") {
            appContext.setRponerpgoneMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 1 "
            );
          } else if (roompool2objVal == "-1") {
            appContext.setRponerpgtwoMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 2 "
            );
          }
        }
      } else {
        appContext.setRponerpgoneMustAlsoSelected(false);
        appContext.setRponerpgtwoMustAlsoSelected(false);
        appContext.setStandardAlert(false);
      }

      if (
        roompool3obj != null &&
        fromElement != Settings.headers.fromDropdown &&
        stateData.standards?.hotelRFPStandards.delete_old_rateprogs != ""
      ) {
        if (
          (roompool1objVal == "-1" ||
            roompool2objVal == "-1" ||
            roompool3objVal == "-1") &&
          roompool6objVal != "-1"
        ) {
          bOK = false;
          if (roompool1objVal == "-1") {
            appContext.setRponerpgoneMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 1 "
            );
          } else if (roompool2objVal == "-1") {
            appContext.setRponerpgtwoMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 2 "
            );
          } else if (roompool3objVal == "-1") {
            appContext.setRponerpgthreeMustAlsoSelected(true);
            appContext.setStandardAlert(true);
            msgArray.push(
              "You must also select Room Pool 1 of Room Pool Group 3 "
            );
          }
        }
      } else {
        appContext.setRponerpgoneMustAlsoSelected(false);
        appContext.setRponerpgtwoMustAlsoSelected(false);
        appContext.setRponerpgthreeMustAlsoSelected(false);
        appContext.setStandardAlert(false);
      }

      if (!bOK && strEmpty != null && strEmpty != "") {
        appContext.setStandardAlert(true);
        msgArray.push(strEmpty);
      }
    }
    // if (
    //   stateData.standards?.hotelRFPStandards.delete_old_rateprogs === "" ||
    //   stateData.standards?.hotelRFPStandards.delete_old_rateprogs === null
    // ) {
    //   if (
    //     stateData.roleDetails.role === Settings.isHotelUser &&
    //     stateData.standards.disableSecondaryRoomPool === Settings.nLabel
    //   ) {
    //     bOK = false;
    //     appContext.setErrorMessageAlert({
    //       show: true,
    //       message: Settings.alert.PASAlert,
    //       type: "browserAlert",
    //     });
    //     state.Nextpath = Settings.route.Standards;
    //   }
    // } else
    if (
      stateData.standards.hotelRFPStandards.exempt_gpp === "" ||
      stateData.standards.hotelRFPStandards.exempt_gpp === null
    ) {
      if (
        stateData.roleDetails.role === Settings.isHotelUser &&
        stateData.standards.disableSecondaryRoomPool === Settings.nLabel
      ) {
        bOK = false;
        msgArray.push(Settings.alert.gppQuestion);
        state.Nextpath = Settings.route.Standards;
      } else {
        appContext.setStandardAlert(false);
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
    click_navigate = true;
    appContext.setStandardAlert(true);
    appContext.setStandardAlertMsg(JSON.stringify(msgArray));
    return bOK;
  };

  const updateHotelStandards = () => {
    const stateData = { ...state };
    const jsonObj = {
      currencycode: null,
      delete_old_rateprogs: null,
      exempt_gpp: null,
      hotelRFPStandardRmPools: [],
    };
    const convertedData = dataConversion(
      stateData.standards.hotelRFPStandards.hotelRFPStandardRmPools
    );

    jsonObj.currencycode = stateData.standards.hotelRFPStandards.currencycode;
    // jsonObj.delete_old_rateprogs =
    //   stateData.standards.hotelRFPStandards.delete_old_rateprogs;
    jsonObj.delete_old_rateprogs = "Y";
    jsonObj.exempt_gpp = stateData.standards.hotelRFPStandards.exempt_gpp;
    jsonObj.hotelRFPStandardRmPools = convertedData;

    API.updateHotelStandards(
      stateData,
      jsonObj,
      hotelrfpid,
      marshaCode,
      period
    ).then((res) => {
      const currencyCode = stateData.standards.hotelRFPStandards.currencycode;
      const gridData = { ...parentContext.state.gridData };
      gridData.list.currency = currencyCode;
      parentContext.setState({ ...parentContext.state, gridData: gridData });
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Standards: "Y",
      });
    });
  };

  const componentUnload = () => {
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
  };

  const pricingStandardsContext = {
    state,
    setState,
    setHotelRFPStandard,
    flag_onchange,
    gpp_disable,
    handleChange,
    roompoolflag_onchange,
    changeDeleteOldRP,
    onContentLoad,
    onContentBeforeunload,
    final_check,
    roomTypeChangeHandler,
    updateHotelStandards,
    onChangeTrigger,
    setPageLoad,
    componentUnload,
  };

  return (
    <PricingStandardsContext.Provider value={pricingStandardsContext}>
      {props.children}
    </PricingStandardsContext.Provider>
  );
};

export const PricingStandardsContextConsumer = PricingStandardsContext.Consumer;
export default PricingStandardsContext;
