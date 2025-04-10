import React, { useContext, useState } from "react";
import { initialPayload } from "../../../../common/components/filter/context/FilterContext";
import API from "../service/API";
import { useHistory } from "react-router-dom";
import Settings from "../static/Settings";
import { isEmpty } from "lodash";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

const UpdateMultipleHotelsContext = React.createContext({} as any);
export const UpdateMultipleHotelsContextProvider = (props) => {
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [storeRequestPayload, setStoreRequestPayload] =
    useState(initialPayload);
  const [searchResponse, setSearchResponse] = useState({});
  const [showPopup, setShowPopup] = useState(true);
  const [nobidReason, setnobidData] = useState([]);
  const [noBidAlert, setnoBidAlert] = useState(false);
  const [getResponse, setGetResponse] = useState<any>({});
  const [showAccountInfoBar, setShowAccountInfoBar] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [payload, setPayload] = React.useState(() => {
    return JSON.parse(localStorage.getItem("REQUEST_PAYLOAD")) || undefined;
  });

  React.useEffect(() => {
    getnobidReason();
  }, []);

  React.useEffect(() => {
    if (payload) {
      setShowPopup(false);
      searchUpdateTableData(payload, 1);
    }
  }, [payload]);
  const searchUpdateTableData = (requestPayload, pageNumber) => {
    let maxPageLen;
    if (
      maxPageLen !== undefined &&
      maxPageLen !== null &&
      maxPageLen !== "" &&
      !maxPageLen
    ) {
      maxPageLen = localStorage.getItem("maxPageLengthUMH");
    } else {
      maxPageLen = 1200;
    }
    if (requestPayload) {
      localStorage.setItem("REQUEST_PAYLOAD", JSON.stringify(requestPayload));
    }
    setPageNumber(pageNumber);
    setShowLoader(true);
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("printAccountContainer")
    ) {
      setTimeout(() => {
        API.postMultiHotelAccountCenter(requestPayload, pageNumber, maxPageLen)
          .then((res) => {
            setShowLoader(false);
            setSearchResponse(res);
            setStoreRequestPayload(requestPayload);
            appContext.setStoreRequestPayload(JSON.stringify(requestPayload));
            setShowPopup(false);
            setShowAccountInfoBar(true);
          })
          .catch((error) => {
            setShowLoader(false);
            setSearchResponse(error);
            setShowAccountInfoBar(true);
            setShowPopup(false);
          });
      }, 500);
    } else {
      API.postMultiHotelAccountCenter(requestPayload, pageNumber, maxPageLen)
        .then((res) => {
          setShowLoader(false);
          setSearchResponse(res);
          setStoreRequestPayload(requestPayload);
          appContext.setStoreRequestPayload(JSON.stringify(requestPayload));
          setShowPopup(false);
          setShowAccountInfoBar(true);
        })
        .catch((error) => {
          setShowLoader(false);
          setSearchResponse(error);
          setShowAccountInfoBar(true);
          setShowPopup(false);
        });
    }
  };

  const getnobidReason = () => {
    API.getNobidReason()
      .then((data) => {
        setnobidData(data);
      })
      .catch((error) => {});
  };

  const navigatePriceTab = (
    savaData,
    rateType = null,
    isHasQuestions = false
  ) => {
    localStorage.setItem("accountSpecDetail", savaData);
    let accountName = "";
    if (localStorage.getItem("accNameUpdateHotel")) {
      accountName = localStorage.getItem("accNameUpdateHotel");
    } else {
      accountName = searchResponse?.accountCenterInfo?.accountname;
    }
    if (isHasQuestions) {
      history.push({
        pathname: `${Settings.parentRoute}/HotelAccountQuestions`,
        search:
          "?&MarshaCode=" +
          (savaData.marshaCode || savaData.marshacode) +
          "&Period=" +
          savaData.period +
          "&HotelId=" +
          (savaData.hotelId || savaData.hotelid) +
          "&AccountInfoId=" +
          savaData.hotel_accountinfoid +
          "&HotelName=" +
          (savaData.hotelname || savaData.hotelName) +
          "&Hotelrfpid=" +
          savaData.hotelrfpid +
          "&isUpdateHotel=" +
          true +
          "&AccountName=" +
          encodeURIComponent(accountName) +
          "&Hotelrfpid=" +
          savaData.hotelrfpid +
          "&rt=" +
          savaData.ratetype_selected +
          "&vpRate=" +
          rateType,
        state: { from: "updateMultipleHotel" },
      });
    } else {
      history.push({
        pathname: `${Settings.parentRoute}/printAccountContainer`,
        search:
          "?&MarshaCode=" +
          (savaData.marshaCode || savaData.marshacode) +
          "&Period=" +
          savaData.period +
          "&HotelId=" +
          (savaData.hotelId || savaData.hotelid) +
          "&AccountInfoId=" +
          savaData.hotel_accountinfoid +
          "&isUpdateHotel=" +
          true +
          "&AccountName=" +
          encodeURIComponent(accountName) +
          "&Hotelrfpid=" +
          savaData.hotelrfpid +
          "&vpRate=" +
          rateType,
        Hotelrfpid: savaData.hotelrfpid,
        HotelName: savaData.hotelName,
        accountSpecDetail: savaData,
        // userDetailsRole: parentContextType.state.userDetails?.list,
        // hotelPeriodData: contextType.state.gridData.list?.hotelPeriodData,
      });
    }
  };
  let rateType;
  const handleUpdateAccountCenter = (
    updateArray,
    isRadiobutton,
    hotelDetails,
    isSave = false,
    isHasQuestions = false
  ) => {
    const saveData = updateArray;
    const requestData: any = storeRequestPayload;

    const param = {
      hotel_accountinfoid: "",
    };
    if (isSave) {
      setShowLoader(true);
    }
    const bodyParam = {
      formChg: "Y",
      strHotelAccountCenterUpdate: saveData.length ? saveData : {},
    };
    if (isRadiobutton) {
      API.updateAccountGridData(param, bodyParam)
        .then(() => {
          if ((isRadiobutton && !isSave) || isHasQuestions) {
            rateType = hotelDetails.volunteeredratetype
              ? hotelDetails.volunteeredratetype
              : rateType;

            navigatePriceTab(
              isEmpty(hotelDetails) ? saveData : hotelDetails,
              rateType,
              isHasQuestions
            );
          }
          if (isSave) {
            setShowLoader(false);
            alert("Changes saved successfully!");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          // navigatePriceTab(isEmpty(hotelDetails) ? saveData :hotelDetails);
        });
    }
  };

  const handleTest = (saveData) => {
    navigatePriceTab(saveData);
  };

  const updateMultipleHotelsContext = {
    storeRequestPayload,
    setStoreRequestPayload,
    searchUpdateTableData,
    searchResponse,
    setSearchResponse,
    showPopup,
    setShowPopup,
    nobidReason,
    handleUpdateAccountCenter,
    noBidAlert,
    setnoBidAlert,
    handleTest,
    showAccountInfoBar,
    setShowAccountInfoBar,
    showLoader,
    pageNumber,
    setPageNumber,
  };

  return (
    <UpdateMultipleHotelsContext.Provider value={updateMultipleHotelsContext}>
      {props.children}
    </UpdateMultipleHotelsContext.Provider>
  );
};

export default UpdateMultipleHotelsContext;
