import React, { useContext } from "react";
import CityMarketsContext, {
  ICityMarketsContext,
} from "../context/cityMarketsContext";
import Settings from "../static/Settings";
import styles from "./marketList.css";
import btnDeleteAll from "../../../../../common/assets/img/button/btnDeleteAll.gif";
import btnAdd from "../../../../../common/assets/img/button/btnAddStr.gif";
import btnExport from "../../../../../common/assets/img/button/btnExpStr.gif";
import btnImport from "../../../../../common/assets/img/button/btnImportStr.gif";
import btnInstruction from "../../../../../common/assets/img/button/btnInstructionStr.gif";
import btnTemplate from "../../../../../common/assets/img/button/btnExportStr.gif";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";

import Listing from "./listing";
//import CloseBtnImg from "../../../../../common/assets/img/button/btnClose.gif";
import { size } from "lodash";

interface IMarketList {
  header: string;
  marketType: string;
  deleteUrl: string;
  instructionType: string;
}

const marketList = (props: IMarketList): JSX.Element => {
  const context = useContext(CityMarketsContext) as ICityMarketsContext;
  const { header, marketType, instructionType, deleteUrl } = props;

  const listings =
    marketType == "US"
      ? context.state?.accMarkets?.usMarkets
      : marketType == "International"
      ? context.state?.accMarkets?.intlMarkets
      : null;

  const sort =
    marketType == "US"
      ? context.state.sorting.sortByUS
      : context.state.sorting.sortByInter;

  const handleSortChange = (e) => {
    const opts = context.state.sorting;
    if (marketType == "US") {
      opts.sortByUS = e.target.value;
      context.setAccMarkets("sorting", opts);
    } else {
      opts.sortByInter = e.target.value;
      context.setAccMarkets("sorting", opts);
    }
  };

  const handleDeleteAll = () => {
    if (confirm(Settings.deleteAll)) {
      context.deleteAllMarkets(deleteUrl);
    }
  };
  const handleInstruction = () => {
    context.downloadInstruction(instructionType);
  };
  const handleTemplate = () => {
    context.downloadTemplate(marketType);
  };
  const handleImport = () => {
    context.importTemplate(marketType);
  };
  const handleExport = () => {
    context.exportTemplate(marketType);
  };
  const handleAdd = () => {
    if (
      marketType == "US" &&
      context.state.accMarkets.maxTravelMarkets <=
        context.state.accMarkets.usMarkets.length
    ) {
      context.toggleShowAddDisabled(marketType);
    } else if (
      marketType == "International" &&
      context.state.accMarkets.maxTravelMarkets <=
        context.state.accMarkets.intlMarkets.length
    ) {
      context.toggleShowAddDisabled(marketType);
    } else {
      context.toggleShowEditMarket(-1, marketType);
    }
  };
  return listings == undefined ? (
    <img
      style={{
        position: "absolute",
        top: "55%",
        left: "45%",
      }}
      src={screenLoader}
    />
  ) : (
    <div className={marketType == "International" ? styles.International : ""}>
      <h3 className={styles.header}>{header}</h3>
      <div className={styles.sortBy}>
        <p>Sort by:</p>
        <select value={sort} onChange={handleSortChange}>
          {marketType == "US" &&
            Settings.sortByUS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          {marketType == "International" &&
            Settings.sortByInt.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
        </select>
        <a onClick={handleDeleteAll}>
          <img tabIndex={0} src={btnDeleteAll} />
        </a>
        <a onClick={handleAdd}>
          <img tabIndex={0} src={btnAdd} />
        </a>
        {!(listings?.length > 0) ? (
          <>
            <a onClick={handleInstruction}>
              <img tabIndex={0} src={btnInstruction} />
            </a>
            <a onClick={handleTemplate}>
              <img tabIndex={0} src={btnTemplate} />
            </a>
            <a onClick={handleImport}>
              <img tabIndex={0} src={btnImport} />
            </a>
          </>
        ) : (
          <>
            {" "}
            <a onClick={handleExport}>
              <img tabIndex={0} src={btnExport} />
            </a>
          </>
        )}
      </div>
      <div className={styles.listingsTabContainer}>
        <div className={styles.spacer} />
        {[...Array(4)].map((i) => (
          <div key={i} className={styles.listingTabs}>
            <div className={styles.spacer} />
            <p className={styles.cityMarkets}>
              {Settings.marketListingTabs.city}
            </p>
            <p
              className={
                marketType === "US"
                  ? styles.locationUS
                  : marketType === "International"
                  ? styles.locationInt
                  : ""
              }
            >
              {marketType === "US"
                ? Settings.marketListingTabs.state
                : marketType === "International"
                ? Settings.marketListingTabs.country
                : ""}
            </p>
            <p className={styles.rmNts}>{Settings.marketListingTabs.rmNts}</p>
            <div className={styles.spacer} />
            <div className={styles.spacer} />
          </div>
        ))}
      </div>
      <div className={styles.listingsContainer}>
        {listings?.map((item, i) => {
          //Insert line break for every 4 items
          if (i % 4 === 0) {
            return (
              <div key={i}>
                <div className={styles.lineBreak} />
                <Listing data={item} i={i} marketType={marketType} />
              </div>
            );
          } else {
            return (
              <Listing key={i} data={item} i={i} marketType={marketType} />
            );
          }
        })}
      </div>
      <style>{`
        .container {
            min-width:1180px;
        }
      @media only screen and (max-width: 1180px){
        .page_body_container {
            min-height: calc(100vh - 106px) !important;
        }
      }
    `}</style>
    </div>
  );
};

export default marketList;
