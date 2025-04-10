import React, { useContext } from "react";
import styles from "./listing.css";
import trashBtn from "../../../../../common/assets/img/delete.gif";
import CityMarketsContext, {
  ICityMarketsContext,
} from "../context/cityMarketsContext";

interface IListing {
  data;
  i: number;
  marketType: string;
}

const Listing = (props: IListing): JSX.Element => {
  const context = useContext(CityMarketsContext) as ICityMarketsContext;
  const { data, i, marketType } = props;

  return (
    <div className={styles.listingContainer}>
      <a
        className={styles.trashBtn}
        onClick={() => {
          context.deleteMarket(data.recid, marketType);
        }}
      >
        <img src={trashBtn} />
      </a>
      <p className={styles.count}>{i + 1})</p>
      <a
        href="javascript:void(0);"
        className={styles.marketname}
        onClick={() => {
          context.toggleShowEditMarket(i + 1, marketType);
        }}
      >
        {data.marketname}
      </a>
      <p
        className={
          marketType == "US"
            ? styles.locationUS
            : marketType == "International"
            ? styles.locationInt
            : ""
        }
      >
        {marketType == "US"
          ? data.market_state
          : marketType == "International"
          ? data.market_country
          : ""}
      </p>
      <p className={styles.rmNts}>{data.marketpotentialrn}</p>
      <div className={styles.spacer} />
    </div>
  );
};

export default Listing;
