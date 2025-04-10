import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import API from "../service/API";
import DepthofsaleAccountContext, {
  DeapthofsaleContextProvider,
} from "../context/depthofsaleContextProvider";
import HotelDepthOfSales from "./hotelDepthOfSales";
import HotelDepthOfSalesEnhanced from "./hotelDepthOfSalesEnhanced";
import styles from "./pricingHotelDepthOfSales.css";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../routing/Layout";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

let contextType = null;

interface IProps {}

interface IState {}
export default function PricingHotelDepthOfSales(props) {
  const [isLoading, setIsLoading] = useState(false);
  const parentContextType = useContext(HotelPricingContext);
  const location = useLocation();
  const [route, setRoute] = useState({
    //--> It can be replaced with useRef or localStorage
    to: location.pathname,
    from: location.pathname, //--> previous pathname
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
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const history = useHistory();

  const fetchHotelDOSData = () => {
    API.gethoteldos(marshaCode, hotelName, hotelrfpid, period).then((data) => {
      if (data?.salesDepth?.salesdepth_en_ranges?.length > 0) {
        contextType.setDepthOfSalesDataAPI(true);
        if (data?.salesDepth?.salesdepth_en_ranges[0]?.volrmax === 999999) {
          contextType.setFirstMaxRowPlus(true);
        }
      }
      if (data?.salesDepth?.salesdepth_ranges?.length > 0) {
        if (data?.salesDepth?.salesdepth_ranges[0]?.volrmax === 999999) {
          contextType.setFirstMaxRowPlusStandard(true);
        }
        const minNumber = 10;
        const maxNumber = 99999999;
        if (data?.salesDepth?.salesdepth_ranges[1]?.volrmax === 999999) {
          if (data?.salesDepth?.salesdepth_ranges[1]?.ratermin === 0) {
            alert(
              "You must enter a value between " +
                minNumber +
                " and " +
                maxNumber +
                " for Rate Range Min. on row " +
                2 +
                "."
            );
          }
          if (data?.salesDepth?.salesdepth_ranges[1]?.ratermax === 0) {
            alert(
              "You must enter a value between " +
                minNumber +
                " and " +
                maxNumber +
                " for Rate Range Max. on row " +
                2 +
                "."
            );
          }
        }
      }
      contextType.setMaxDOSFromAPI(data.maxDOS);
      contextType.setInitialEnSalesDepthRangeData(data);
      contextType.setDepthData(data, period);
      contextType.calcADR();
      if (data?.hotelPricingMenu) {
        parentContextType.setState({
          ...parentContextType.state,
          gridData: {
            ...parentContextType.state.gridData,
            list: {
              ...parentContextType.state.gridData.list,
              menu: data.hotelPricingMenu,
            },
          },
        });
      }
      setIsLoading(false);
      appContext.setCpacLoader(false);
    });
  };

  useEffect(() => {
    if (
      appContext?.updateAPIcallSuccess === true &&
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Seasons")
    ) {
      fetchHotelDOSData();
      appContext.setupdateAPIcallSuccess(false);
    }
  }, [appContext?.updateAPIcallSuccess]);

  useEffect(() => {
    setIsLoading(true);
    appContext.setCpacLoader(true);
    if (
      (history?.location?.prevPath &&
        !history?.location?.prevPath?.includes("GroupsMeetings") &&
        !history?.location?.prevPath?.includes("Standards") &&
        !history?.location?.prevPath?.includes("PriceContact") &&
        !history?.location?.prevPath?.includes("Seasons") &&
        !history?.location?.prevPath?.includes("Blackout") &&
        !history?.location?.prevPath?.includes("eligibilityAmenity")) ||
      history?.location?.prevPath == undefined ||
      history?.location?.prevPath == null ||
      history?.location?.prevPath == ""
    ) {
      fetchHotelDOSData();
    }
    return () => {
      if (history.action !== "POP") {
        UpdatSalesDepth();
      }
      contextType.componentUnload();
    };
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("PriceContact") &&
      parentContextType?.completionState?.PricingContact == "Y"
    ) {
      fetchHotelDOSData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        PricingContact: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Standards") &&
      parentContextType?.completionState?.Standards == "Y"
    ) {
      fetchHotelDOSData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Standards: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Blackout") &&
      parentContextType?.completionState?.Blackout == "Y"
    ) {
      fetchHotelDOSData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Blackout: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("eligibilityAmenity") &&
      parentContextType?.completionState?.EligAmen == "Y"
    ) {
      fetchHotelDOSData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        EligAmen: "N",
      });
    }
  }, [
    parentContextType?.completionState?.PricingContact,
    parentContextType?.completionState?.EligAmen,
    parentContextType?.completionState?.Blackout,
    parentContextType?.completionState?.Standards,
  ]);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings") &&
      appContext?.groupMeetingUpdation
    ) {
      fetchHotelDOSData();
      if (appContext?.groupMeetingUpdation) {
        appContext?.setGroupMeetingUpdation(false);
      }
    }
  }, [appContext?.groupMeetingUpdation]);

  const UpdatSalesDepth = () => {
    const salesDepthData = contextType.standardDataConversion(
      contextType.state.depthOfSales.salesDepth
    );
    const enhancedSalesDepthData = contextType.enhancedDataConversion(
      contextType.state.depthOfSales.salesDepth
    );
    salesDepthData.salesdepth_en_ranges =
      enhancedSalesDepthData.salesdepth_en_ranges;
    contextType.UpdateDepthOfSales(contextType.state, period, salesDepthData);
  };
  const nextBtnClickDOS = () => {
    const methodType =
      contextType.state.depthOfSales.salesDepth.isenhanced === "Y"
        ? contextType.validation_check()
        : contextType.validation_check_standard();
    if (methodType) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Layout nextBtnClick={nextBtnClickDOS}>
      <DeapthofsaleContextProvider>
        <DepthofsaleAccountContext.Consumer>
          {(depthOfSalesContext) => {
            contextType = depthOfSalesContext;
            return isLoading ? (
              <img
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
                src={screenLoader}
              />
            ) : (
              <>
                <table className={styles.tableContainer} id={"dosEnhacedTable"}>
                  {contextType.state.depthOfSales.salesDepth.isenhanced ===
                  "Y" ? (
                    <HotelDepthOfSalesEnhanced />
                  ) : (
                    <HotelDepthOfSales />
                  )}
                </table>
              </>
            );
          }}
        </DepthofsaleAccountContext.Consumer>
      </DeapthofsaleContextProvider>
    </Layout>
  );
}
