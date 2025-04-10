import React, { useContext, useEffect } from "react";
import styles from "./StatusAccountPricing.css";
import Settings from "../static/Settings";
import API from "../service/API";
import { useHistory, useLocation } from "react-router-dom";
import StatusAccountPricingContext, {
  StatusAccountPricingContextProvider,
} from "../context/StatusAccountPricingContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import HotelPricingContext from "../../../../../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
//import CPACAPI from "../../../../../../../../hotelPricing/content/centerallyPricedAccount/service/API";
import { CLoader } from "../../../../../../../../../common/components/CLoader";
let contextValue = null;
function StatusAccountPricing() {
  const parentContext = useContext(AccountCenterTabsContext);
  const hotelContext = useContext(HotelPricingContext);
  const urlParms = useLocation().search;
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    "AccountInfoId"
  );
  const hotelId = new URLSearchParams(urlParms).get("HotelId");
  const history = useHistory();
  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };
  const reqParam = {
    accountinfoid: setQueryParam("AccountInfoId"),
    userDetails:
      history.location.userDetailsRole != null
        ? history.location.userDetailsRole
        : hotelContext &&
          hotelContext.state &&
          hotelContext.state.userDetails &&
          hotelContext.state.userDetails.list,
  };
  const appContext: IApplicationContext = useContext(ApplicationContext);

  useEffect(() => {
    contextValue?.setLoader(true);
    API.getStatusAccountPricingList(reqParam).then((res) => {
      contextValue.personalInfo(res);
      appContext.setPricingTick("C");
      contextValue.setLoader(false);
      contextValue.statusCheck(event);
    });
    return () => {
      contextValue.setTickMarkAndUpdate(reqParam);
    };
  }, []);

  useEffect(() => {
    if (appContext.saveStatusAccountClicked) {
      if (appContext.isActiveTab === "statusAccount")
        if (appContext.errorMessageAlert.show) {
          alert(appContext.errorMessageAlert.message);
        } else {
          contextValue.setTickMarkAndUpdate(reqParam);
        }
      appContext.setSaveStatusAccountClicked(false);
    }
  }, [appContext.saveStatusAccountClicked]);

  const handleChange = (e) => {
    contextValue.handleOverrideChange(e);
    contextValue.statusCheck(e);
  };

  return (
    <StatusAccountPricingContextProvider>
      <StatusAccountPricingContext.Consumer>
        {(statusaccountpricingContext) => {
          contextValue = statusaccountpricingContext;
          return (
            <div className={styles.pageLayoutOutter}>
              {contextValue.state.showLoader ? <CLoader></CLoader> : ""}
              <div>
                <div
                  id="tabStatus"
                  className={` ${
                    styles.pageLayout
                  } ${"updatestatusaccountpricing"}`}
                >
                  <form id="acctStatusForm" name="acctStatusForm" method="post">
                    {(reqParam?.userDetails?.user?.isPASorAnySales ||
                      appContext?.user?.isPASorAnySales) && (
                      <div className={styles.statusAccountHeader}>
                        <div
                          className={`${styles.fieldName} ${styles.floatleft} ${styles.presentedHeader}`}
                        >
                          Presented
                        </div>
                        <div
                          className={`${styles.fieldValue} ${styles.floatleft} ${styles.presentedHeader}`}
                        >
                          {contextValue.state?.selected === "Y" ? "Yes" : "No"}
                        </div>
                        {(reqParam?.userDetails?.user?.isPASorAnySales ||
                          appContext?.user?.isPASorAnySales) && (
                          <>
                            <div
                              className={`${styles.fieldName} ${styles.floatleft} ${styles.MarketHeader}`}
                            >
                              Market Code
                            </div>
                            <div
                              className={`${styles.fieldValue} ${styles.floatleft} ${styles.MarketHeaderData}`}
                            >
                              {contextValue.state.marketcode === -3
                                ? "Rates Not loaded"
                                : contextValue.state.marketcode}
                            </div>
                          </>
                        )}
                        {(reqParam?.userDetails?.user?.isPASAdmin ||
                          appContext?.user?.isPASAdmin) && (
                          <>
                            <div
                              className={`${styles.fieldName} ${styles.floatleft} ${styles.amenityHeader}`}
                            >
                              2 Year Amenity Logic Override
                            </div>
                            <div
                              className={`${styles.fieldValue} ${styles.floatleft} ${styles.amenityData}`}
                            >
                              <select
                                name="amenityOverride"
                                id="amenityOverride"
                                onChange={handleChange}
                                disabled={parentContext.isRebidDeclined}
                              >
                                <option
                                  value="Y"
                                  selected={
                                    contextValue.state.amenities_exempt == "Y"
                                      ? true
                                      : false
                                  }
                                >
                                  Yes
                                </option>
                                <option
                                  value="N"
                                  selected={
                                    contextValue.state.amenities_exempt == "N"
                                      ? true
                                      : false
                                  }
                                >
                                  No
                                </option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    <div className={styles.InstructionHeader}>
                      Account Pricing Contact (The person responsible for
                      managing pricing &amp; rebids for this account at this
                      hotel)
                    </div>
                    <table className={styles.zeroHeight}>
                      <tbody>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.pricingContact.name.label}
                          </td>
                          {!contextValue.state.isSalesContactEditable ? (
                            <td>{contextValue.state.contactname}</td>
                          ) : (
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.name.id}
                                type="text"
                                name={Settings.pricingContact.name.name}
                                className={styles.priceContactInput}
                                onChange={(event) => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "contactname"
                                  );
                                }}
                                value={contextValue.state.contactname}
                                maxLength={40}
                                disabled={parentContext.isRebidDeclined}
                              />
                            </td>
                          )}
                        </tr>

                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.pricingContact.email.label}
                          </td>
                          {!contextValue.state.isSalesContactEditable ? (
                            <td>{contextValue.state.contactemail}</td>
                          ) : (
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.email.id}
                                name={Settings.pricingContact.email.name}
                                className={styles.priceContactInput}
                                onChange={(event) => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "contactemail"
                                  );
                                }}
                                value={contextValue.state.contactemail}
                                maxLength={255}
                                disabled={parentContext.isRebidDeclined}
                              />
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.pricingContact.countryCode.label}
                          </td>
                          {!contextValue.state.isSalesContactEditable ? (
                            <td>{contextValue.state.contactcountrycode}</td>
                          ) : (
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.countryCode.id}
                                name={Settings.pricingContact.countryCode.name}
                                className={styles.countryCodeInput}
                                onChange={(event) => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "contactcountrycode"
                                  );
                                }}
                                value={contextValue.state.contactcountrycode}
                                maxLength={3}
                                disabled={parentContext.isRebidDeclined}
                              />
                              <span className={styles.countrycodealign}>
                                For example, US=001
                              </span>
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.pricingContact.cityCode.label}
                          </td>
                          {!contextValue.state.isSalesContactEditable ? (
                            <td>{contextValue.state.contactareacitycode}</td>
                          ) : (
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.cityCode.id}
                                name={Settings.pricingContact.cityCode.name}
                                pattern="\d+(?:[.]\d+)?"
                                className={styles.cityCodeInput}
                                onChange={(event) => {
                                  contextValue.onPrimaryContact(
                                    event,
                                    "contactareacitycode"
                                  );
                                }}
                                value={contextValue.state.contactareacitycode}
                                maxLength={4}
                                disabled={parentContext.isRebidDeclined}
                              />
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.pricingContact.contactPhone.label}
                          </td>
                          {!contextValue.state.isSalesContactEditable ? (
                            <td>{contextValue.state.contactphonenumber}</td>
                          ) : (
                            <td className={styles.fieldValue}>
                              <input
                                id={Settings.pricingContact.contactPhone.id}
                                name={Settings.pricingContact.contactPhone.name}
                                className={styles.contactPhoneInput}
                                onChange={(event) => {
                                  contextValue.onPhoneNumberChange(event);
                                }}
                                value={contextValue.state.contactphonenumber}
                                maxLength={10}
                                disabled={parentContext.isRebidDeclined}
                              />
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </StatusAccountPricingContext.Consumer>
    </StatusAccountPricingContextProvider>
  );
}
export default StatusAccountPricing;
