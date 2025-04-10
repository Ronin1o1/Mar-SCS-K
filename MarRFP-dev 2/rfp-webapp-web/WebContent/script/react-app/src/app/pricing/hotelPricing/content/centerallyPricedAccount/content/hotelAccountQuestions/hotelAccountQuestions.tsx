import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./hotelAccountQuestions.css";
import Settings from "./Settings";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
import btnSave from "../../../../../../common/assets/img/button/btnReturnAccountCenter.gif";
import btnReturnHotelCenter from "../../../../../../common/assets/img/button/btnReturnHotelCenter.gif";
import API from "./API";
import { SpecificAnswerTag } from "../../../shared/specificAnswerTag/content/specificAnswerTag";
import { Layout } from "../../../../routing/Layout";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../common/components/ApplicationContext";
import HotelPricingContext from "../../../../context/hotelPricingContextProvider";

let tempBTArr = [];
let tempAccArr = [];

function HotelAccountQuestions(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const contextValue = useContext(HotelPricingContext);
  const urlParms = useLocation().search;
  const history = useHistory();

  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const hotelrfpid = new URLSearchParams(urlParms).get("Hotelrfpid");
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    "AccountInfoId"
  );
  const ratetype_selected = new URLSearchParams(urlParms).get("rt");
  const isUpdateHotel = new URLSearchParams(urlParms).get("isUpdateHotel");

  const updateHotelHead = marshaCode + "-" + hotelName + ": ";

  const [state, setState] = useState({
    showScreenLoader: false,
  });

  const [specAnswerTag, setSpecificAnswerTag] = useState([]);
  const [specAccAnswerTag, setAccSpecificAnswerTag] = useState([]);

  const specAnswerTagRef = useRef();
  specAnswerTagRef.current = specAnswerTag;

  const specAccAnswerTagRef = useRef();
  specAccAnswerTagRef.current = specAccAnswerTag;

  useEffect(() => {
    setLoader(true);
    getQuestions();
    validateFields(specAnswerTag, specAccAnswerTag);
    return () => {
      tempAccArr = [];
      tempBTArr = [];
      if (history.action == "POP") {
        appContext?.setIsUpdateHotelMandatoryFields(false);
        appContext?.setUpdateHotelMandatoryAlert("");
      }
    };
  }, []);

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const validateFields = (specAnswerTag, specAccAnswerTag) => {
    let msg = "";
    const questTag = [];
    const questAccTag = [];
    const questionsFlag =
      specAnswerTag.length > 0 && specAnswerTag[0].isEditable;
    if (appContext.user.role == "MFPUSER") {
      if (specAnswerTag.length > 0) {
        const unansweredBTQuestArr = specAnswerTag.filter(
          (item) =>
            (item.answer == "" || item.answer == null) && item.isEditable
        );
        if (unansweredBTQuestArr.length > 0) {
          msg = Settings.instructions.fillAllDetails;
        }
      }

      if (specAccAnswerTag.length > 0) {
        const unansweredGrpMeetArr = specAccAnswerTag.filter(
          (item) =>
            (item.answer == "" || item.answer == null) && item.isEditable
        );
        if (unansweredGrpMeetArr.length > 0) {
          msg = Settings.instructions.fillAllDetails;
        }
      }
    } else {
      msg = "";
    }

    if (msg) {
      appContext?.setIsUpdateHotelMandatoryFields(true);
      appContext?.setUpdateHotelMandatoryAlert(
        Settings.instructions.fillAllDetails
      );
    } else {
      appContext?.setIsUpdateHotelMandatoryFields(false);
      appContext?.setUpdateHotelMandatoryAlert("");
    }
  };

  const handleChangeInput = (event, question_id, type) => {
    const totalBTArrData = [...specAnswerTag];
    const totalAccArrData = [...specAccAnswerTag];
    if (type == "btAns") {
      totalBTArrData.map((item) => {
        if (item.questionid == question_id) {
          item.answer = event.target.value;
        }
      });
      setSpecificAnswerTag([...totalBTArrData]);
    }

    if (type == "acctAns") {
      totalAccArrData.map((item) => {
        if (item.questionid == question_id) {
          item.answer = event.target.value;
        }
      });
      setAccSpecificAnswerTag([...totalAccArrData]);
    }
    validateFields(totalBTArrData, totalAccArrData);
  };
  const getQuestions = () => {
    setLoader(true);
    const param = {
      marshaCode: marshaCode,
      hotelName: hotelName,
      hotelrfpid: hotelrfpid,
      period: period,
      hotel_accountinfoid: hotel_accountinfoid,
      rt: ratetype_selected,
    };

    API.getAccSpec(param).then((data) => {
      if (data.accountSpecificQandAList.length > 0) {
        setSpecificAnswerTag(data.accountSpecificQandAList);
      }
      if (data.accountSpecificGroupQandAList.length > 0) {
        setAccSpecificAnswerTag(data.accountSpecificGroupQandAList);
      }
      if (data?.hotelData) {
        data.hotelData["marshaCodeAndName"] =
          data.hotelData.marshaCode + " - " + data.hotelData.hotelName;
        contextValue.setState({
          ...contextValue.state,
          gridData: {
            ...contextValue.state?.gridData,
            list: {
              ...contextValue.state?.gridData?.list,
              hotelData: data?.hotelData,
              menu: data?.menu,
            },
          },
        });
      }
      validateFields(
        data.accountSpecificQandAList,
        data.accountSpecificGroupQandAList
      );
      setLoader(false);
    });
  };

  const saveHotelSpecQuestions = () => {
    setLoader(true);
    let msg = "";
    const questTag = [];
    const questAccTag = [];
    const hotelDetails = {
      formChg: "Y",
      accountrecid: "",
      hotel_accountinfoid: hotel_accountinfoid,
      hotelrfpid: hotelrfpid,
      marshaCode: marshaCode,
      period: period,
    };
    const tempSpecAnswerTagArr = specAnswerTag.map((item) => {
      return { questionid: item.questionid, answer: item.answer };
    });
    const tempSpecAccAnswerTagArr = specAccAnswerTag.map((item) => {
      return { questionid: item.questionid, answer: item.answer };
    });
    const questBTDetails = JSON.stringify(tempSpecAnswerTagArr);
    const questAccDetails = JSON.stringify(tempSpecAccAnswerTagArr);

    if (appContext.user.role == "MFPUSER") {
      if (specAnswerTag.length > 0) {
        const unansweredBTQuestArr = specAnswerTag?.filter(
          (item) =>
            (item.answer == "" || item.answer == null) && item.isEditable
        );
        if (unansweredBTQuestArr.length > 0) {
          msg = Settings.instructions.fillAllDetails;
        }
      }

      if (specAccAnswerTag.length > 0) {
        const unansweredGrpMeetArr = specAccAnswerTag.filter(
          (item) =>
            (item.answer == "" || item.answer == null) && item.isEditable
        );
        if (unansweredGrpMeetArr.length > 0) {
          msg = Settings.instructions.fillAllDetails;
        }
      }
    } else {
      msg = "";
    }

    if (msg) {
      alert(msg);
      setLoader(false);
    } else {
      API.updateAccountSpecQuestions(
        hotelDetails,
        questBTDetails,
        questAccDetails
      ).then((res) => {
        if (res === "success") {
          if (isUpdateHotel) {
            history.push({
              pathname: `/multihotelaccountcenter`,
              search: `?&navigateToMultipleHotel=true`,
              MarshaCode: marshaCode,
            });
          } else {
            history.push({
              pathname: `${Settings.parentRoute}/CPAC`,
              search:
                "?&MarshaCode=" +
                marshaCode +
                "&HotelName=" +
                hotelName +
                "&Hotelrfpid=" +
                hotelrfpid +
                "&Period=" +
                period +
                "&AccountInfoId=" +
                hotel_accountinfoid,
            });
          }
        }
      });
    }
  };

  return state.showScreenLoader ? (
    <img
      style={{ position: "absolute", top: "55%", left: "45%" }}
      src={screenLoader}
    />
  ) : (
    <>
      {useLocation().state &&
      useLocation().state.from !== "CPAC" &&
      useLocation().state.from !== "accountstatus" ? (
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {updateHotelHead ? updateHotelHead : ""}
            {Settings.instructions.header}
          </div>
          {period && <div className={styles.period}>Period: {period}</div>}
          <hr className={styles.mt8} />
        </div>
      ) : null}

      <Layout>
        <div className={styles.hotelacquestions}>
          {specAnswerTag.length > 0 && (
            <div>
              <span className={`${styles.strongTitle} ${styles.width100}`}>
                {Settings.instructions.btHeader}
              </span>
              {specAnswerTag.map((data, index) => {
                const showAnsOnly =
                  appContext.user.role === "MFPUSER" &&
                  !data.isEditable &&
                  data.answer !== null &&
                  data.answer !== ""
                    ? true
                    : false;
                return (
                  <>
                    <SpecificAnswerTag
                      key={index}
                      data={data}
                      handleChange={handleChangeInput}
                      type="btAns"
                      lastIndex={
                        index + 1 === specAnswerTag.length ? true : false
                      }
                      isUpdateHotel={isUpdateHotel}
                      showOnlyAns={showAnsOnly}
                    />
                  </>
                );
              })}
            </div>
          )}
          {specAccAnswerTag.length > 0 && (
            <div className={styles.topSpace}>
              <span className={`${styles.strongTitle} ${styles.width100}`}>
                {Settings.instructions.accHeader}
              </span>
              {specAccAnswerTag.map((data, index) => {
                const showAnsOnly =
                  appContext.user.role === "MFPUSER" &&
                  !data.isEditable &&
                  data.answer !== null &&
                  data.answer !== ""
                    ? true
                    : false;
                return (
                  <SpecificAnswerTag
                    key={index}
                    data={data}
                    handleChange={handleChangeInput}
                    type="acctAns"
                    isUpdateHotel={isUpdateHotel}
                    showOnlyAns={showAnsOnly}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.imgClass}>
          <img
            src={isUpdateHotel ? btnReturnHotelCenter : btnSave}
            onClick={() => saveHotelSpecQuestions()}
            className={styles.pointerClass}
          />
        </div>
      </Layout>
      <style>{`
        .container{
          overflow: auto;
          height: 100vh;
        }
      `}</style>
    </>
  );
}

export default HotelAccountQuestions;
