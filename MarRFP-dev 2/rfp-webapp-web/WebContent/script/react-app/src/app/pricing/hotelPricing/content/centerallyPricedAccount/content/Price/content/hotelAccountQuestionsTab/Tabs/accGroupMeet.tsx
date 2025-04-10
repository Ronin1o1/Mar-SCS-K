import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../hotelAccountQuestionsTab.css";
import Settings from "../Settings";
import screenLoader from "../../../../../../../../../common/assets/img/screenloader.gif";
import API from "../API";
import { SpecificAnswerTag } from "../../../../../../shared/specificAnswerTag/content/specificAnswerTag";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import HotelAccountQuestionsContext from "../hotelAccountQuestionsContext";

let tempAccArr = [];

function accGroupMeet(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    "AccountInfoId"
  );
  const history = useHistory();
  const hotelId = new URLSearchParams(urlParms).get("HotelId");

  const [state, setState] = useState({
    showScreenLoader: false,
  });

  const [specMeetAnswerTag, setAccMeetSpecificAnswerTag] = useState([]);
  const parentContext = useContext(AccountCenterTabsContext);
  const hotelContext = useContext(HotelAccountQuestionsContext);

  const specMeetAnswerTagRef = useRef();
  specMeetAnswerTagRef.current = specMeetAnswerTag;

  useEffect(() => {
    setLoader(true);
    getQuestions();
    setTimeout(() => {
      validationCheck(true);
    }, 500);
    sessionStorage.setItem("VisitedAccGroupMeet", "true");
    return () => {
      saveHotelBTSpecQuestionsFromReturn();
      tempAccArr = [];
      appContext.setNoRedirect(false);
      appContext?.setIsUpdateHotelMandatoryFields(false);
      appContext?.setUpdateHotelMandatoryAlert("");
    };
  }, []);

  const validationCheck = (initialLoad?) => {
    initialLoad = initialLoad ? initialLoad : false;
    let msg = "";
    const accQuestions = [];
    let groupscheckstatus;
    const specAnswer = sessionStorage.getItem("accMeetSpecificAnswerTag");
    const specMeet = specAnswer ? JSON.parse(specAnswer) : [];
    if (appContext.user.role == "MFPUSER" && !parentContext.isRebidDeclined) {
      if (specMeetAnswerTag && specMeetAnswerTag?.length > 0) {
        if (specMeetAnswerTag?.length > 0) {
          const unansweredBTGrpMeetArr = specMeetAnswerTag?.filter(
            (item) =>
              (item.answer == "" || item.answer == null) && item.editable
          );
          if (unansweredBTGrpMeetArr.length > 0) {
            msg = Settings.instructions.fillAllDetails;
          }
        }
      }
    } else {
      msg = "";
    }

    let value;
    let isValidArr1 = true;
    let isValidArr2 = true;
    let isValidArr3 = true;
    let unanswered = [];
    let counter = 0;

    if (specMeetAnswerTag.length > 0) {
      for (value of specMeetAnswerTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer?.trim() == "" ||
            !value.answer.length ||
            value.answer == "")
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }

    if (specMeetAnswerTag.length > 0) {
      for (value of specMeetAnswerTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          counter++;
        }
      }
      if (counter == specMeetAnswerTag.length) {
        isValidArr3 = false;
      }
    }

    if (specMeetAnswerTag && specMeetAnswerTag.length > 0) {
      unanswered = specMeetAnswerTag.filter(function (item) {
        return (
          item.editable &&
          (item.answer == null ||
            item.answer?.trim() == "" ||
            item.answer == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr2 = false;
      }
    }

    if (!isValidArr1 || !isValidArr2) {
      if (!parentContext.isRebidDeclined) {
        msg = Settings.instructions.fillAllDetails;
        appContext.setNoRedirect(true);
      } else {
        msg = "";
        appContext.setNoRedirect(false);
      }
    } else {
      msg = "";
      appContext.setNoRedirect(false);
    }

    if (msg && appContext.user.isHotelUser) {
      if (!initialLoad) {
        alert(msg);
      }
      if (!isValidArr3) {
        if (appContext.user.isPASAdmin && appContext.btAccGrpTick == "C") {
          appContext.setBtAccGrpTick("C");
        } else {
          appContext.setBtAccGrpTick("");
        }
      } else if (!isValidArr1) {
        appContext.setBtAccGrpTick("R");
      }
      groupscheckstatus = "failed";
    } else if (msg && appContext.user.isPASorAnySales) {
      groupscheckstatus = "continue";
    } else {
      groupscheckstatus = "complete";
    }
  };

  useEffect(() => {
    let value;
    let isValidArr1 = true;
    let isValidArr2 = true;
    const tempAccArr1 = [...specMeetAnswerTag];
    if (tempAccArr1.length > 0) {
      for (value of tempAccArr1) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer?.trim() == "" ||
            !value.answer.length ||
            value.answer == "")
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }
    const specAnswer = sessionStorage.getItem("accMeetSpecificAnswerTag");
    const specMeet = specAnswer ? JSON.parse(specAnswer) : [];
    if (tempAccArr1 && tempAccArr1.length > 0) {
      const unanswered = tempAccArr1.filter(function (item) {
        return (
          item.editable &&
          (item.answer == null ||
            item.answer?.trim() == "" ||
            item.answer == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr2 = false;
      }
    }

    if (!isValidArr1 || !isValidArr2) {
      if (!parentContext.isRebidDeclined) {
        appContext.setNoRedirect(true);
      } else {
        appContext.setNoRedirect(false);
      }
    }
  }, [specMeetAnswerTag || tempAccArr]);

  useEffect(() => {
    if (
      appContext.isActiveTab === "btAndGroupAccount" &&
      hotelContext.state.activeTab === "accQuestTab" &&
      appContext.saveBTGClicked
    ) {
      appContext.setSaveBTGClicked(false);
      saveHotelBTSpecQuestions();
    }
  }, [appContext.saveBTGClicked]);

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const handleChangeInput = (event, question_id, type) => {
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    let status;
    const totalData = [...specMeetAnswerTag];
    if (totalData.length > 0) {
      totalData.map((item) => {
        if (item.questionid == question_id) {
          item.answer = event.target.value;
        }
      });
    }

    setAccMeetSpecificAnswerTag([...totalData]);
    let value;
    let isValidArr = true;

    if (totalData.length > 0) {
      for (value of totalData) {
        if (
          value.answer == null ||
          value.answer?.trim() == "" ||
          !value.answer.length ||
          value.answer == ""
        ) {
          isValidArr = false;
          break;
        }
      }
    }
    const specAnswer = sessionStorage.getItem("accMeetSpecificAnswerTag");
    const specMeet = specAnswer ? JSON.parse(specAnswer) : [];
    if (totalData && totalData.length) {
      const unanswered = totalData.filter(function (item) {
        return (
          item.editable &&
          (item.answer == null ||
            item.answer?.trim() == "" ||
            item.answer == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr = false;
        appContext.setBtAccGrpMeetAllDataFilled(false);
      }
      if (unanswered.length == 0) {
        appContext.setBtAccGrpMeetAllDataFilled(true);
      }
    }

    if (!isValidArr) {
      if (!parentContext.isRebidDeclined) {
        appContext.setNoRedirect(true);
      } else {
        appContext.setNoRedirect(false);
      }
    } else {
      appContext.setNoRedirect(false);
      sessionStorage.setItem("changedQuestions", "true");
      if (
        hotelspecificData?.showrebid === "Y" &&
        (appContext?.user?.isHotelUser ||
          appContext?.user?.isLimitedSalesUser ||
          (appContext?.user?.isSalesUser && appContext.isMarkAsCompleteChecked))
      ) {
        const groupStatus =
          hotelspecificData?.hasaccountspecquests === "Y" &&
          appContext.accSpecificTick == "C"
            ? "C"
            : hotelspecificData?.hasaccountspecquests === "Y" &&
              appContext.accSpecificTick != "C"
            ? undefined
            : "C";
        status = parentContext.validateDetailsOnMarkAsCompleteChange(
          hotelspecificData,
          "",
          "C",
          "C",
          undefined,
          groupStatus,
          "C"
        );

        if (!status.bOK) {
          appContext.setMarkAsCompleteErrorAlert({
            show: true,
            message: status.msg,
            type: "browserAlert",
          });
        } else {
          appContext.setMarkAsCompleteErrorAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
        }
      } else {
        if (
          appContext?.user?.isHotelUser ||
          appContext?.user?.isLimitedSalesUser ||
          (appContext?.user?.isSalesUser && appContext.isMarkAsCompleteChecked)
        ) {
          const groupStatus =
            hotelspecificData?.hasaccountspecquests === "Y" &&
            appContext.accSpecificTick == "C"
              ? "C"
              : hotelspecificData?.hasaccountspecquests === "Y" &&
                appContext.accSpecificTick != "C"
              ? undefined
              : "C";
          status = parentContext.validateDetailsOnMarkAsCompleteChange(
            hotelspecificData,
            "",
            undefined,
            undefined,
            undefined,
            groupStatus,
            "C"
          );

          if (!status.bOK) {
            appContext.setMarkAsCompleteErrorAlert({
              show: true,
              message: status.msg,
              type: "browserAlert",
            });
          } else {
            appContext.setMarkAsCompleteErrorAlert({
              show: false,
              message: "",
              type: "browserAlert",
            });
          }
        }
      }
    }
  };

  const getQuestions = () => {
    setLoader(true);
    API.getMeetSpecQuest(hotel_accountinfoid).then((data) => {
      if (data.length > 0) {
        setAccMeetSpecificAnswerTag(data);
        sessionStorage.setItem(
          "accMeetSpecificAnswerTag",
          JSON.stringify(data)
        );
        setLoader(false);
      }
    });
  };

  const saveHotelBTSpecQuestions = () => {
    setLoader(true);
    let msg = "";
    const accQuestions = [];
    let groupscheckstatus;
    const hotelDetails = {
      hotel_accountinfoid: hotel_accountinfoid,
    };
    const tempSpecMeetTagArr = specMeetAnswerTag?.map((item) => {
      return { questionid: item.questionid, answer: item.answer };
    });
    const questBTDetails = JSON.stringify(tempSpecMeetTagArr);
    const specAnswer = sessionStorage.getItem("accMeetSpecificAnswerTag");
    const specMeet = specAnswer ? JSON.parse(specAnswer) : [];
    if (appContext.user.role == "MFPUSER" && !parentContext.isRebidDeclined) {
      if (specMeetAnswerTag && specMeetAnswerTag.length > 0) {
        if (specMeetAnswerTag?.length > 0) {
          const unansweredBTGrpMeetArr = specMeetAnswerTag?.filter(
            (item) =>
              (item.answer == "" || item.answer == null) && item.editable
          );
          if (unansweredBTGrpMeetArr.length > 0) {
            msg = Settings.instructions.fillAllDetails;
          }
        }
      }
    } else {
      msg = "";
    }

    let value;
    let isValidArr1 = true;
    let isValidArr2 = true;
    let unanswered = [];
    let counter = 0;
    let isValidArr3 = true;

    if (specMeetAnswerTag.length > 0) {
      for (value of specMeetAnswerTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer?.trim() == "" ||
            !value.answer.length ||
            value.answer == "")
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }

    if (specMeetAnswerTag.length > 0) {
      for (value of specMeetAnswerTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          counter++;
        }
      }
      if (counter == specMeetAnswerTag.length) {
        isValidArr3 = false;
      }
    }

    if (specMeetAnswerTag && specMeetAnswerTag.length > 0) {
      unanswered = specMeetAnswerTag.filter(function (item) {
        return (
          item.editable &&
          (item.answer == null ||
            item.answer?.trim() == "" ||
            item.answer == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr2 = false;
      }
    }

    if (!isValidArr1 || !isValidArr2) {
      if (!parentContext.isRebidDeclined) {
        msg = Settings.instructions.fillAllDetails;
        appContext.setNoRedirect(true);
      } else {
        msg = "";
        appContext.setNoRedirect(false);
      }
    } else {
      msg = "";
      appContext.setNoRedirect(false);
    }

    if (msg && appContext.user.isHotelUser) {
      alert(msg);
      appContext.setSaveBTGClicked(false);
      setLoader(false);
      groupscheckstatus = "failed";
    } else {
      groupscheckstatus = "complete";
    }
    if (groupscheckstatus == "complete" || groupscheckstatus == "continue") {
      API.updateAccMeetSpecQuestions(hotelDetails, questBTDetails).then(
        (res) => {
          if (res === "success") {
            getQuestions();
          }
          setLoader(false);
        }
      );
    }

    if (groupscheckstatus == "complete") {
      appContext.setBtAccGrpTick("C");
      hotelContext.checkMainBtgroupTab(undefined, "C");
    }
  };

  const saveHotelBTSpecQuestionsFromReturn = () => {
    setLoader(true);
    let msg = "";
    const accQuestions = [];
    let groupscheckstatus;
    const hotelDetails = {
      hotel_accountinfoid: hotel_accountinfoid,
    };
    const tempSpecMeetTagArr = specMeetAnswerTagRef?.current?.map((item) => {
      return { questionid: item.questionid, answer: item.answer };
    });
    const questBTDetails = JSON.stringify(tempSpecMeetTagArr);
    const specAnswer = sessionStorage.getItem("accMeetSpecificAnswerTag");
    const specMeet = specAnswer ? JSON.parse(specAnswer) : [];
    if (appContext.user.role == "MFPUSER" && !parentContext.isRebidDeclined) {
      if (
        specMeetAnswerTagRef.current &&
        specMeetAnswerTagRef?.current?.length > 0
      ) {
        if (specMeetAnswerTagRef?.current?.length > 0) {
          const unansweredBTGrpMeetArr = specMeetAnswerTagRef?.current?.filter(
            (item) =>
              (item.answer == "" || item.answer == null) && item.editable
          );
          if (unansweredBTGrpMeetArr.length > 0) {
            msg = Settings.instructions.fillAllDetails;
          }
        }
      }
    } else {
      msg = "";
    }

    let value;
    let isValidArr1 = true;
    let isValidArr2 = true;
    let unanswered = [];
    let counter = 0;
    let isValidArr3 = true;

    if (specMeetAnswerTagRef?.current?.length > 0) {
      for (value of specMeetAnswerTagRef?.current) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer?.trim() == "" ||
            !value.answer.length ||
            value.answer == "")
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }

    if (specMeetAnswerTagRef?.current?.length > 0) {
      for (value of specMeetAnswerTagRef?.current) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          counter++;
        }
      }
      if (counter == specMeetAnswerTagRef?.current?.length) {
        isValidArr3 = false;
      }
    }
    if (
      specMeetAnswerTagRef?.current &&
      specMeetAnswerTagRef?.current?.length > 0
    ) {
      unanswered = specMeetAnswerTagRef?.current?.filter(function (item) {
        return (
          item.editable &&
          (item.answer == null ||
            item.answer?.trim() == "" ||
            item.answer == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr2 = false;
      }
    }

    if (!isValidArr1 || !isValidArr2) {
      if (!parentContext.isRebidDeclined) {
        msg = Settings.instructions.fillAllDetails;
        appContext.setNoRedirect(true);
      } else {
        msg = "";
        appContext.setNoRedirect(false);
      }
    } else {
      msg = "";
      appContext.setNoRedirect(false);
    }

    if (msg && appContext.user.isHotelUser) {
      appContext.setSaveBTGClicked(false);
      setLoader(false);
      groupscheckstatus = "failed";
    } else {
      groupscheckstatus = "complete";
    }
    if (groupscheckstatus == "complete" || groupscheckstatus == "continue") {
      API.updateAccMeetSpecQuestions(hotelDetails, questBTDetails).then(
        (res) => {
          if (res === "success") {
            getQuestions();
          }
          setLoader(false);
        }
      );
    }
    if (groupscheckstatus == "complete") {
      appContext.setBtAccGrpTick("C");
      hotelContext.checkMainBtgroupTab(undefined, "C");
    }
  };

  return state.showScreenLoader ? (
    <img
      style={{ position: "absolute", top: "55%", left: "45%" }}
      src={screenLoader}
    />
  ) : (
    specMeetAnswerTag.length > 0 && (
      <div>
        <span className={styles.strongTitle}>
          {Settings.instructions.accHeader}
        </span>
        <table>
          <tbody>
            {specMeetAnswerTag.map((data, index) => {
              const showOnlyAns = parentContext.isRebidDeclined
                ? parentContext.isRebidDeclined
                : !data?.editable;
              return (
                <>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <SpecificAnswerTag
                    key={index}
                    data={data}
                    handleChange={handleChangeInput}
                    type="acctAns"
                    showOnlyAns={showOnlyAns}
                  />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
}

export default accGroupMeet;
