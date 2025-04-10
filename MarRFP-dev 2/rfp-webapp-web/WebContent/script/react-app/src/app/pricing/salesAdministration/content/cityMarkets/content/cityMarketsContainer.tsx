import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../routing/Layout";
import Settings from "../static/Settings";
import CityMarketsContext, {
  ICityMarketsContext,
} from "../context/cityMarketsContext";
import MarketList from "./marketList";
import EditMarketModal from "./EditMarketModal";
import ImportModal from "./ImportModal";
import AddDisabledModal from "./AddDisabledModal";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";

const CityMarketsContainer = (): JSX.Element => {
  const context = useContext(CityMarketsContext) as ICityMarketsContext;
  const urlParms = useLocation().search;
  const queryParams = new URLSearchParams(urlParms);
  const recID = queryParams.get("accountrecid");
  const year = queryParams.get("year");
  const accname = queryParams.get("accountName");

  const fetchDataUpdate = async () => {
    context.setLoader(true);
    await context.getAccMarkets(recID, accname, year);
    context.setLoader(false);
  };

  const fetchData = async () => {
    await context.getAccMarkets(recID, accname, year);
  };

  useEffect(() => {
    if (recID && year && accname) {
      context.setParams(recID, year, accname);
    }
  }, []);

  useEffect(() => {
    context.getAccMarketsSorted(recID, accname, year);
  }, [context.state?.sorting.sortByUS, context.state?.sorting.sortByInter]);

  return (
    <>
      <Layout
        IsDataUpdate={fetchDataUpdate}
        getlastUpdateDate={context?.lastUpdateDateValue}
      >
        {context.state.showScreenLoader ? (
          <img
            style={{
              position: "absolute",
              top: "55%",
              left: "45%",
            }}
            src={screenLoader}
          />
        ) : (
          <>
            <MarketList
              header={Settings.marketListHeader.us}
              marketType={"US"}
              instructionType={"US-Instruction"}
              deleteUrl={Settings.api.deleteAllUsMarkets}
            />
            <MarketList
              header={Settings.marketListHeader.int}
              marketType={"International"}
              instructionType={"International-Instruction"}
              deleteUrl={Settings.api.deleteAllIntMarkets}
            />
          </>
        )}
      </Layout>
      {context.state.showEditMarket.isOpen && <EditMarketModal />}
      <ImportModal />
      <AddDisabledModal />
    </>
  );
};

export default CityMarketsContainer;
