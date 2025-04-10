/* eslint-disable no-var */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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

let tempBTArr = [];

function accSpecQuest(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    "AccountInfoId"
  );

  const [state, setState] = useState({
    showScreenLoader: false,
  });

  const [specAnswerBTTag, setSpecificAnswerBTTag] = useState([]);
  const parentContext = useContext(AccountCenterTabsContext);
  const hotelContext = useContext(HotelAccountQuestionsContext);
  const accSpecBTTagRef = useRef();
  accSpecBTTagRef.current = specAnswerBTTag;

  useEffect(() => {
    getQuestions();
    setTimeout(() => {
      validationCheck(true);
    }, 500);

    return () => {
      saveHotelBTSpecQuestionsForReturn();
      tempBTArr = [];
      appContext.setNoRedirect(false);
      appContext?.setIsUpdateHotelMandatoryFields(false);
      appContext?.setUpdateHotelMandatoryAlert("");
    };
  }, []);
  const validationCheck = (initialLoad?) => {
    initialLoad = initialLoad ? initialLoad : false;
    let msg = "";
    const btQuestions = [];
    let questcheckstatus;

    const questBTDetails = JSON.stringify(tempBTArr);
    const specAnswer = sessionStorage.getItem("specificAnswerBTTag");
    const specQuest = specAnswer ? JSON.parse(specAnswer) : [];
    if (appContext.user.role == "MFPUSER" && !parentContext.isRebidDeclined) {
      if (specAnswerBTTag && specAnswerBTTag.length > 0) {
        if (specAnswerBTTag?.length > 0) {
          const unansweredBTQuestArr = specAnswerBTTag?.filter(
            (item) =>
              (item.answer == "" || item.answer == null) && item.editable
          );
          if (unansweredBTQuestArr.length > 0) {
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

    if (specAnswerBTTag.length > 0) {
      for (value of specAnswerBTTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }

    if (specAnswerBTTag.length > 0) {
      for (value of specAnswerBTTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          counter++;
        }
      }
      if (counter == specAnswerBTTag.length) {
        isValidArr3 = false;
      }
    }

    if (specAnswerBTTag && specAnswerBTTag.length > 0) {
      unanswered = specAnswerBTTag.filter(function (item) {
        return (
          item.editable && (item.answer == null || item.answer?.trim() == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr2 = false;
      }
    }

    if (msg && appContext.user.isHotelUser) {
      if (!initialLoad) {
        alert(msg);
      }
      if (!isValidArr3) {
        if (
          appContext.user.isPASorAnySales &&
          appContext.accSpecificTick == "C"
        ) {
          appContext.setAccSpecificTick("C");
        } else {
          appContext.setAccSpecificTick("");
        }
      } else if (!isValidArr1) {
        appContext.setAccSpecificTick("R");
      }

      questcheckstatus = "failed";
      if (!parentContext.isRebidDeclined) {
        appContext.setNoRedirect(true);
      } else {
        appContext.setNoRedirect(false);
      }
    } else if (msg && appContext.user?.isPASorAnySales) {
      questcheckstatus = "continue";
    } else {
      questcheckstatus = "complete";
    }
    if (questcheckstatus == "complete" || questcheckstatus == "continue") {
      if (isValidArr2 && questcheckstatus == "complete") {
      }
    }
  };

  useEffect(() => {
    let value;
    let isValidArr1 = true;
    let isValidArr2 = true;
    const tempBTArrTest = [...specAnswerBTTag];

    if (tempBTArrTest.length > 0) {
      for (value of tempBTArrTest) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }
    const specAnswer = sessionStorage.getItem("specificAnswerBTTag");
    const specQuest = specAnswer ? JSON.parse(specAnswer) : [];
    if (specAnswerBTTag && specAnswerBTTag?.length) {
      const unanswered = specAnswerBTTag.filter(function (item) {
        return (
          item.editable && (item.answer == null || item.answer?.trim() == "")
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
  }, [specAnswerBTTag || tempBTArr]);

  useEffect(() => {
    if (
      appContext.isActiveTab === "btAndGroupAccount" &&
      hotelContext.state.activeTab === "btQuestTabs" &&
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

  const updateStatusAccSpec = () => {
    const specAnswer = sessionStorage.getItem("specificAnswerBTTag");
    const specQuest = specAnswer ? JSON.parse(specAnswer) : [];
    let isEmpty = false;
    if (specQuest && specAnswerBTTag.length > 0) {
      const unanswered = specQuest.filter(function (item) {
        return (
          item.editable && (item.answer == null || item.answer?.trim() == "")
        );
      });
      if (unanswered.length && tempBTArr?.length) {
        isEmpty = true;
        for (const i in unanswered) {
          for (const j in tempBTArr) {
            if (unanswered[i].question_id === tempBTArr[j].question_id) {
              if (tempBTArr[j].answer && tempBTArr[j].answer.trim()) {
                isEmpty = false;
              } else {
                if (tempBTArr[j].editable) {
                  isEmpty = true;
                } else {
                  isEmpty = false;
                }
                break;
              }
            }
          }
        }
      }
    }
    return isEmpty;
  };

  const handleChangeInput = (event, question_id, type) => {
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    const totalData = [...specAnswerBTTag];
    let status;

    if (totalData.length > 0) {
      totalData.map((item) => {
        if (item.questionid == question_id) {
          item.answer = event.target.value;
        }
      });
    }
    setSpecificAnswerBTTag([...totalData]);
    let value;
    let isValidArr = true;

    if (totalData.length > 0) {
      for (value of totalData) {
        if (
          value.answer == null ||
          value.answer?.trim() == "" ||
          !value.answer.length
        ) {
          isValidArr = false;
          break;
        }
      }
    }
    const specAnswer = sessionStorage.getItem("specificAnswerBTTag");
    const specQuest = specAnswer ? JSON.parse(specAnswer) : [];
    if (totalData && totalData.length) {
      const unanswered = totalData.filter(function (item) {
        return (
          item.editable && (item.answer == null || item.answer?.trim() == "")
        );
      });
      if (unanswered.length > 0) {
        isValidArr = false;
        appContext.setBtAccSpecAllDataFilled(false);
      }
      if (unanswered.length == 0) {
        appContext.setBtAccSpecAllDataFilled(true);
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
          hotelspecificData?.hasgroupspecquests === "Y" &&
          appContext.btAccGrpTick == "C"
            ? "C"
            : hotelspecificData?.hasgroupspecquests === "Y" &&
              appContext.btAccGrpTick != "C"
            ? undefined
            : "C";
        status = parentContext.validateDetailsOnMarkAsCompleteChange(
          hotelspecificData,
          "",
          "C",
          "C",
          undefined,
          "C",
          groupStatus
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
            hotelspecificData?.hasgroupspecquests === "Y" &&
            appContext.btAccGrpTick == "C"
              ? "C"
              : hotelspecificData?.hasgroupspecquests === "Y" &&
                appContext.btAccGrpTick != "C"
              ? undefined
              : "C";
          status = parentContext.validateDetailsOnMarkAsCompleteChange(
            hotelspecificData,
            "",
            undefined,
            undefined,
            undefined,
            "C",
            groupStatus
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
    API.getBTSpecQuest(hotel_accountinfoid).then((data) => {
      setLoader(false);
      if (data.length > 0) {
        sessionStorage.setItem("specificAnswerBTTag", JSON.stringify(data));
        setSpecificAnswerBTTag(data);
      } else {
        hotelContext.setActiveTab("accQuestTab");
      }
    });
  };

  const saveHotelBTSpecQuestionsForReturn = () => {
    setLoader(true);
    let msg = "";
    const btQuestions = [];
    const setVal = false;
    let questcheckstatus;
    const hotelDetails = {
      hotel_accountinfoid: hotel_accountinfoid,
    };
    const tempSpecAnswerTagArr = accSpecBTTagRef.current?.map((item) => {
      return { questionid: item.questionid, answer: item.answer };
    });
    const questBTDetails = JSON.stringify(tempSpecAnswerTagArr);
    const specAnswer = sessionStorage.getItem("specificAnswerBTTag");
    const specQuest = specAnswer ? JSON.parse(specAnswer) : [];
    if (appContext.user.role == "MFPUSER" && !parentContext.isRebidDeclined) {
      if (accSpecBTTagRef?.current && accSpecBTTagRef?.current?.length > 0) {
        if (accSpecBTTagRef?.current?.length > 0) {
          const unansweredBTQuestArr = accSpecBTTagRef?.current?.filter(
            (item) =>
              (item.answer == "" || item.answer == null) && item.editable
          );
          if (unansweredBTQuestArr.length > 0) {
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

    if (accSpecBTTagRef?.current?.length > 0) {
      for (value of accSpecBTTagRef.current) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }

    if (accSpecBTTagRef?.current?.length > 0) {
      for (value of accSpecBTTagRef.current) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          counter++;
        }
      }
      if (counter == accSpecBTTagRef?.current?.length) {
        isValidArr3 = false;
      }
    }

    if (accSpecBTTagRef?.current && accSpecBTTagRef?.current?.length > 0) {
      unanswered = accSpecBTTagRef?.current?.filter(function (item) {
        return (
          item.editable && (item.answer == null || item.answer?.trim() == "")
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
      questcheckstatus = "failed";
    } else if (msg && appContext.user?.isPASorAnySales) {
      questcheckstatus = "continue";
    } else {
      questcheckstatus = "complete";
    }
    if (questcheckstatus == "complete" || questcheckstatus == "continue") {
      API.updateAccBTSpecQuestions(hotelDetails, questBTDetails).then((res) => {
        if (res === "success") {
          getQuestions();
        }
        setLoader(false);
      });
      if (isValidArr2 && questcheckstatus == "complete") {
        appContext.setAccSpecificTick("C");
        hotelContext.checkMainBtgroupTab("C");
      }
    }
  };

  const saveHotelBTSpecQuestions = () => {
    setLoader(true);
    let msg = "";
    const btQuestions = [];
    const setVal = false;
    let questcheckstatus;
    const hotelDetails = {
      hotel_accountinfoid: hotel_accountinfoid,
    };
    const tempSpecAnswerTagArr = specAnswerBTTag?.map((item) => {
      return { questionid: item.questionid, answer: item.answer };
    });
    const questBTDetails = JSON.stringify(tempSpecAnswerTagArr);
    const specAnswer = sessionStorage.getItem("specificAnswerBTTag");
    const specQuest = specAnswer ? JSON.parse(specAnswer) : [];
    if (appContext.user.role == "MFPUSER" && !parentContext.isRebidDeclined) {
      if (specAnswerBTTag && specAnswerBTTag.length > 0) {
        if (specAnswerBTTag?.length > 0) {
          const unansweredBTQuestArr = specAnswerBTTag?.filter(
            (item) =>
              (item.answer == "" || item.answer == null) && item.editable
          );
          if (unansweredBTQuestArr.length > 0) {
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

    if (specAnswerBTTag.length > 0) {
      for (value of specAnswerBTTag) {
        if (
          value.editable &&
          (value.answer == null ||
            value.answer.trim() == "" ||
            !value.answer.length)
        ) {
          isValidArr1 = false;
          break;
        }
      }
    }
    if (specAnswerBTTag && specAnswerBTTag.length > 0) {
      unanswered = specAnswerBTTag.filter(function (item) {
        return (
          item.editable && (item.answer == null || item.answer?.trim() == "")
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
      questcheckstatus = "failed";
    } else if (msg && appContext.user?.isPASorAnySales) {
      questcheckstatus = "continue";
    } else {
      questcheckstatus = "complete";
    }
    if (questcheckstatus == "complete" || questcheckstatus == "continue") {
      API.updateAccBTSpecQuestions(hotelDetails, questBTDetails).then((res) => {
        if (res === "success") {
          getQuestions();
        }
        setLoader(false);
      });

      if (isValidArr2 && questcheckstatus == "complete") {
        appContext.setAccSpecificTick("C");
        hotelContext.checkMainBtgroupTab("C");
      }
    }
  };

  return state.showScreenLoader ? (
    <img
      style={{ position: "absolute", top: "55%", left: "45%" }}
      src={screenLoader}
    />
  ) : (
    specAnswerBTTag.length > 0 && (
      <div>
        <span className={styles.strongTitle}>
          {Settings.instructions.btHeader}
        </span>

        <div className={styles.btasquestions}>
          <table>
            <tbody>
              {" "}
              {specAnswerBTTag.map((data, index) => {
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
                      type="btAns"
                      lastIndex={
                        index + 1 === specAnswerBTTag.length ? true : false
                      }
                      showOnlyAns={showOnlyAns}
                    />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default accSpecQuest;
