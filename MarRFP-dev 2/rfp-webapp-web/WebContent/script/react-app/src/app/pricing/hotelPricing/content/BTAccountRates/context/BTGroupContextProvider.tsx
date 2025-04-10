import React, { useContext, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import API from "../service/API";

interface IBTGroupContext {
  handleGetBTData: () => void;
  btData: any;
  handleGetBTDataWithPagination: (number: number) => void;
  loader: boolean;
  setLoading: (data: any) => void;
  btRatesupdateRates: (data: any, isPagination: boolean) => void;
  currentPage: any;
  setCurrentPage: (number: number) => void;
}

const BTGroupContext = React.createContext({} as IBTGroupContext);

export default BTGroupContext;

export const BTGroupContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [btData, setBTData] = useState({});
  const [loader, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const parentContextType = useContext(HotelPricingContext);

  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };

  const [marshCode, setMarshaCode] = useState(setQueryParam("MarshaCode"));
  const [hotelId, setHotelId] = useState(setQueryParam("HotelId"));
  const [hotelrfpid, sethotelrfpid] = useState(setQueryParam("Hotelrfpid"));
  const [period, setPeriod] = useState(setQueryParam("Period"));

  const handleGetBTData = () => {
    setLoading(true);
    appContext.setCpacLoader(true);
    setBTData([]);
    API.getBtData(currentPage, marshCode, hotelrfpid, period).then((data) => {
      if (data?.allHotelRates && data?.allHotelRates?.length > 0) {
        data?.allHotelRates?.forEach((NewData) => {
          if (
            NewData?.hotelAccountSpecific?.hotelAccountSpecificData
              .percentdiscount == "0"
          ) {
            NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
              (0.0).toFixed(1);
          }
          const hasd = NewData?.hotelAccountSpecific?.hotelAccountSpecificData;
          let percentDiscount =
            NewData?.hotelAccountSpecific?.hotelAccountSpecificData
              .percentdiscount;
          if (percentDiscount) {
            percentDiscount =
              percentDiscount && Number(percentDiscount).toFixed(2);
            if (Number.isInteger(Number(percentDiscount))) {
              NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                Number(percentDiscount).toFixed(1);
            } else {
              const decimals = percentDiscount && percentDiscount.split(".")[1];
              if (decimals) {
                const str = Array.from(decimals);
                if (str[1] === "0") {
                  NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                    Number(percentDiscount).toFixed(1);
                } else {
                  NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                    Number(
                      NewData.hotelAccountSpecific.hotelAccountSpecificData
                        .percentdiscount
                    ).toFixed(2);
                }
              }
            }
          }
        });
      }
      setCurrentPage(data.startnum);
      parentContextType?.setPricingMenuList(data);
      localStorage.setItem("orginalAllRatesData", JSON.stringify(data));
      setBtRatesLocalStorage(data);
      setBTData(data);
      setLoading(false);
      appContext.setCpacLoader(false);
    });
  };

  const handleGetBTDataWithPagination = (startNum) => {
    setCurrentPage(startNum);
    setLoading(true);
    appContext.setCpacLoader(true);
    setBTData([]);
    API.getBtDataWithPagination(startNum, marshCode, hotelrfpid, period).then(
      (data) => {
        if (data?.allHotelRates && data?.allHotelRates?.length > 0) {
          data?.allHotelRates?.forEach((NewData) => {
            if (
              NewData?.hotelAccountSpecific?.hotelAccountSpecificData
                .percentdiscount == "0"
            ) {
              NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                (0.0).toFixed(1);
            }
            const hasd =
              NewData?.hotelAccountSpecific?.hotelAccountSpecificData;
            let percentDiscount =
              NewData?.hotelAccountSpecific?.hotelAccountSpecificData
                .percentdiscount;
            if (percentDiscount) {
              percentDiscount =
                percentDiscount && Number(percentDiscount).toFixed(2);
              if (Number.isInteger(Number(percentDiscount))) {
                NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                  Number(percentDiscount).toFixed(1);
              } else {
                const decimals =
                  percentDiscount && percentDiscount.split(".")[1];
                if (decimals) {
                  const str = Array.from(decimals);
                  if (str[1] === "0") {
                    NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                      Number(percentDiscount).toFixed(1);
                  } else {
                    NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                      Number(
                        NewData.hotelAccountSpecific.hotelAccountSpecificData
                          .percentdiscount
                      ).toFixed(2);
                  }
                }
              }
            }
          });
        }
        localStorage.setItem("orginalAllRatesData", JSON.stringify(data));
        parentContextType?.setPricingMenuList(data);
        setBtRatesLocalStorage(data);
        setBTData(data);
        setLoading(false);
        appContext.setCpacLoader(false);
      }
    );
  };

  const setBtRatesLocalStorage = (btRates) => {
    for (let step = 0; step < btRates.length; step++) {
      localStorage.setItem(
        "ratesData_" + btRates.allHotelRates[step]?.hotel_accountinfoid,
        JSON.stringify(
          btRates?.allHotelRates[step]?.hotelAccoutSpecific
            ?.hotelAccountSpecificData
        )
      );
    }
  };

  const btRatesupdateRates = (requestData, isPagination = false, saveFlag) => {
    const data = { strHasd: JSON.stringify(requestData) };
    setLoading(true);
    appContext.setCpacLoader(true);
    appContext.setIsPercentDiscountSaved(true);
    API.updateBTRatesData(data)
      .then((data) => {
        setLoading(false);
        appContext.setCpacLoader(false);

        if (
          !isPagination &&
          window.location.pathname.includes("/btAccountRates")
        ) {
          handleGetBTData();
        }
        if (
          saveFlag === undefined &&
          window.location.pathname.includes("/btAccountRates")
        ) {
          handleGetBTData();
        }
      })
      .catch(() => {});
  };

  const btGroupContext = {
    btData,
    handleGetBTData,
    handleGetBTDataWithPagination,
    loader,
    setLoading,
    btRatesupdateRates,
    currentPage,
    setCurrentPage,
  };

  return (
    <BTGroupContext.Provider value={btGroupContext}>
      {props.children}
    </BTGroupContext.Provider>
  );
};
