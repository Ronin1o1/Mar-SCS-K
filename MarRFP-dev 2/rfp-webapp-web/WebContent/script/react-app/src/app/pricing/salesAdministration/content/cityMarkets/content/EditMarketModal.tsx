import React, { useContext, useEffect, useState, useRef } from "react";
import CModal from "../../../../../common/components/CModal";
import styles from "./EditMarketModal.css";
import Settings from "../static/Settings";
import Utils from "../../../../../common/utils/Utils";
import btnUpdate from "../../../../../common/assets/img/btnUpdate.gif";
import btnDelete from "../../../../../common/assets/img/button/btnDelete.gif";
import btnClose from "../../../../../common/assets/img/button/btnClose.gif";
import CityMarketsContext, {
  ICityMarketsContext,
} from "../context/cityMarketsContext";
import { IMarket } from "../interfaces/IAccMarkets";

const emptyMarket: IMarket = {
  accountinfoid: null,
  brandsegment: null,
  contactTypeID: null,
  contactemail: null,
  contactname: null,
  contactphone: null,
  contacttitle: null,
  curractivity: null,
  location: null,
  market_country: null,
  market_state: null,
  marketinfoid: null,
  marketname: null,
  marketpotentialrev: null,
  marketpotentialrn: null,
  maxrate: null,
  notes: null,
  prefhotels: null,
  prefmarprop: null,
  ratecap: null,
  recid: 0,
  seqid: -2,
  traveldist: null,
  usMarket: null,
};

function EditMarketModal(): JSX.Element {
  const context = useContext(CityMarketsContext) as ICityMarketsContext;
  const marketType = context.state.showEditMarket.type;
  const seqid = context.state?.showEditMarket?.seqId;

  const usStates = context.state?.locations.stateRef;
  const countries = context.state?.locations.countryRef;

  const [state, setState] = useState(emptyMarket);
  const marketNameRef = useRef(null);

  useEffect(() => {
    marketNameRef.current.focus();
    if (seqid > 0 || seqid == 0) {
      if (marketType == "US") {
        setState(context?.state?.accMarkets?.usMarkets[seqid - 1]);
      } else if (marketType == "International") {
        setState(context?.state?.accMarkets?.intlMarkets[seqid - 1]);
      } else {
        throw new Error("Invalid markettype passed");
      }
    } else {
      const data = { ...state };
      data.marketname = null;
      data.market_country = null;
      data.marketpotentialrn = null;
      data.market_state = null;
      data.notes = null;
      data.curractivity = null;
      setState(data);
    }
  }, [seqid]);

  const handleState = (key, value) => {
    if (key == "marketpotentialrn") {
      setState((prevState) => {
        if (value != undefined && value != null && value != "") {
          value = parseInt(value);
        }
        prevState[key] = value;
        return { ...prevState };
      });
    } else {
      setState((prevState) => {
        prevState[key] = value;
        return { ...prevState };
      });
    }
  };

  const handleUpdate = () => {
    const newAccMarkets = context.state.accMarkets;

    if (marketType == "US") {
      newAccMarkets.usMarkets[seqid] = state;
    } else {
      newAccMarkets.intlMarkets[seqid] = state;
    }
    const data = { ...state };
    data.seqid = seqid;
    data.usMarket = marketType == "US" ? "Y" : "N";
    //setState(emptyMarket);

    context.updateMarket(state.recid, marketType, data);
  };

  return (
    <>
    <CModal
      title={Settings.TabTitles.EditMarket}
      onClose={context.toggleShowEditMarket}
      show={context.state.showEditMarket.isOpen}
      xPosition={-291}
      yPosition={-200}
      class="editcitymarket"
      closeImgTitle={Settings.cmodelclose}
      overlayHeight={Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )}
      overlayTopPosition={"-79px"}
    >
      <div className={styles.modalContainer}>
        <div className={styles.topSection}>
          <div className={styles.marketNameContainer}>
            <b>{Settings.TabTitles.marketName}</b>
            <input
              ref={marketNameRef}
              type="text"
              value={state.marketname}
              onChange={(e) => {
                handleState("marketname", e.target.value);
              }}
              size={50}
              maxLength={20}
            />
          </div>
          {marketType == "US" && (
            <>
              <div className={styles.marketContainerRed}>
                <b className={styles.stateText}>{Settings.TabTitles.state}</b>
                <select
                  value={state.market_state}
                  onChange={(e) => handleState("market_state", e.target.value)}
                >
                  <option value="" />
                  {usStates?.map((item) => {
                    return (
                      <option key={item.state} value={item.state}>
                        {item.statename}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.marketContainerRed}>
                <b>{Settings.TabTitles.country}</b>
                <p>USA</p>
              </div>
            </>
          )}
          {marketType == "International" && (
            <div className={styles.marketContainerRed}>
              <b>{Settings.TabTitles.countryRegion}</b>
              <select
                value={state?.market_country}
                onChange={(e) => handleState("market_country", e.target.value)}
              >
                <option></option>
                {countries.map((item) => {
                  return (
                    <option key={item.country} value={item.country}>
                      {item.countryname}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className={styles.marketContainerRed}>
            <b>{Settings.TabTitles.marketPotential}</b>
            <input
              type="text"
              className={styles.marketPotentialRn}
              value={state.marketpotentialrn}
              onKeyPress={(e) => {
                Utils.NumberOnly_onkeypress(e);
              }}
              onChange={(e) => handleState("marketpotentialrn", e.target.value)}
              maxLength={16}
              size={10}
            />
          </div>
        </div>
        <div>
          <b>
            {Settings.TabTitles.currentAcc}
            <br></br>
            {Settings.TabTitles.additionalInfo}
          </b>
          <textarea
            className={styles.textAreaFont}
            onKeyPress={(e) => {
              Utils.checklen_onkeypress(e, 1024);
            }}
            // onPaste={(e) => Utils.checklenchar_onpaste_quest(e, 1024)}
            value={state.curractivity}
            onChange={(e) => handleState("curractivity", e.target.value)}
          />
        </div>
        <div>
          <b>{Settings.TabTitles.notes}</b>
          <textarea
            className={styles.textAreaFont}
            onKeyPress={(e) => {
              Utils.checklen_onkeypress(e, 1024);
            }}
            // onPaste={(e) => Utils.checklenchar_onpaste_quest(e, 1024)}
            value={state.notes}
            onChange={(e) => handleState("notes", e.target.value)}
          />
        </div>
        <div className={styles.buttonalignment}>
          <img
            className={styles.updatebtn}
            id="update"
            src={btnUpdate}
            onClick={handleUpdate}
          />{" "}
          <img
            id="delete"
            className={styles.updatebtn}
            src={btnDelete}
            onClick={() => {
              context.deleteMarketModal(state.recid, marketType);
            }}
          />{" "}
          <img
            id="close"
            src={btnClose}
            className={styles.updatebtn}
            onClick={context.toggleShowEditMarket}
          />{" "}
        </div>
      </div>
    </CModal>
    <style>{`
    .editcitymarket{
      position: fixed;
    }
    `}</style>
    </>
  );
}

export default EditMarketModal;
