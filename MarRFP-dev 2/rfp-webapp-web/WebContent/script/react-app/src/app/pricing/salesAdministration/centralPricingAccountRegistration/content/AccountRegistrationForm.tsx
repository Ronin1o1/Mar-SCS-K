import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CentralPricingAccountRegistrationContext, {
  ICentralPricingAccRegContext,
} from "../context/centralPricingAccountRegistrationContext";
import Settings from "../static/Settings";
import styles from "./AccountRegistrationForm.css";
import submitImg from "../../../../common/assets/img/button/btnSubmit.gif";

const AccountRegistrationForm = (): JSX.Element => {
  const context = useContext(
    CentralPricingAccountRegistrationContext
  ) as ICentralPricingAccRegContext;
  const [accLeadEid, setLeadSel] = useState(null);
  const [displayAccNameOther, setDisplayAccNameOther] = useState(false);

  useEffect(() => {
    context.fetchAccLeadNames(context.yearSelection.year);
  }, []);

  useEffect(() => {
    if (accLeadEid) {
      context.fetchAccLeadContact(accLeadEid.eid);
      context.fetchAAEAccountList(accLeadEid.eid);
      context.handlePricingAccountChange("eid", accLeadEid.eid);
    }
  }, [accLeadEid]);

  useEffect(() => {
    if (context.centralPricingAccount.utilThirdParty == "Y") {
    }
  }, [context.centralPricingAccount.utilThirdParty]);

  useEffect(() => {
    if (displayAccNameOther) {
      context.handlePricingAccountChange("accountName", "");
    }
  }, [displayAccNameOther]);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        {Settings.headers.subTitle}
        {context.yearSelection.year}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <a href="javascript:void(0);" className={styles.submitBtn} onClick={context.handleSubmit}>
          <img src={submitImg} />
        </a>
        <p className={styles.subHeader}>{Settings.headers.info}</p>
        <div className={styles.registrationForm}>
          <label>
            {Settings.labels.accountLeadName}
            <Link
              mailto={Settings.labels.accountLeadNameEmail}
              onClick={(e) => {
                e.preventDefault();
                window.open(`mailto:${Settings.labels.accountLeadNameEmail}`);
              }}
            >
              {Settings.labels.accountLeadNameEmail}
            </Link>
            {Settings.labels.accountLeadNameTail}
          </label>
          <div className={`${styles.inputSide} ${styles.width250}`}>
            <select
              value={
                accLeadEid
                  ? context.centralAccountRegistry.aaes.findIndex(
                      (item) => item.personname == accLeadEid.personname
                    )
                  : ""
              }
              onChange={(e) => {
                setLeadSel(context.centralAccountRegistry.aaes[e.target.value]);
                context.handlePricingAccountChange("leadName", e.target.value);
              }}
            >
              <option value=""></option>
              {context &&
                context.centralAccountRegistry &&
                context.centralAccountRegistry.aaes.map((item, i) => (
                  <option key={i} value={i}>
                    {item.personname}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.accountLeadPhone}</label>
          <div className={styles.inputSide}>
            <input
              type="text"
              value={
                context?.accLeadContact?.phoneNumber
                  ? context.accLeadContact.phoneNumber
                  : context.centralPricingAccount.phoneNumber
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "accountLeadPhone",
                  e.target.value
                )
              }
            />
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.accountLeadEmail}</label>
          <div className={`${styles.inputSide} ${styles.width318}`}>
            <input
              type="text"
              value={
                context?.centralAccountRegistry?.accLeadContact?.emailAddress
                  ? context.centralAccountRegistry.accLeadContact.emailAddress
                  : context.centralPricingAccount.accountLeadEmail
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "accountLeadEmail",
                  e.target.value
                )
              }
            />
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.accountName}</label>
          <div className={styles.extraRow}>
            <div className={`${styles.inputSide} ${styles.width318}`}>
              <select
                value={
                  displayAccNameOther
                    ? "other"
                    : context?.centralPricingAccount?.accountID
                    ? context?.accAAEAccList?.findIndex(
                        (item) =>
                          item.accountid ==
                          context.centralPricingAccount.accountID
                      )
                    : ""
                }
                onChange={(e) => {
                  if (e.target.value === "other") {
                    setDisplayAccNameOther(true);
                  } else {
                    setDisplayAccNameOther(false);
                    const acc = context.accAAEAccList[e.target.value];
                    context.handlePricingAccountChange(
                      "accountID",
                      Number(acc.accountid)
                    );
                    context.handlePricingAccountChange(
                      "accountName",
                      acc.accountname
                    );
                  }
                }}
              >
                <option value=""></option>
                {context?.accAAEAccList?.map((item, i) => (
                  <option key={i} value={i}>
                    {item.accountname}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>
            {displayAccNameOther && (
              <>
                <div className={`${styles.inputSide}, ${styles.inputAdded}`}>
                  <input
                    type="text"
                    value={
                      context.centralPricingAccount?.accountName
                        ? context.centralPricingAccount.accountName
                        : ""
                    }
                    onChange={(e) =>
                      context.handlePricingAccountChange(
                        "accountName",
                        e.target.value
                      )
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.clientName}</label>
          <div className={`${styles.inputSide} ${styles.width318}`}>
            <input
              type="text"
              value={
                context?.centralPricingAccount?.clientPreferredName
                  ? context.centralPricingAccount.clientPreferredName
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "clientPreferredName",
                  e.target.value
                )
              }
            />
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.accountWebsite}</label>
          <div className={`${styles.inputSide} ${styles.width318}`}>
            <input
              type="text"
              value={
                context?.centralPricingAccount?.accountUrl
                  ? context.centralPricingAccount.accountUrl
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange("accountUrl", e.target.value)
              }
            />
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.accountSegment}</label>
          <div className={`${styles.inputSide} ${styles.width200}`}>
            <select
              value={
                context?.centralPricingAccount?.accountType
                  ? context?.centralPricingAccount?.accountType
                  : ""
              }
              onChange={(e) => {
                context.handlePricingAccountChange(
                  "accountType",
                  e.target.value
                );
              }}
            >
              <option value=""></option>
              {context?.centralAccountRegistry?.accountSegmentList.map(
                (item, i) => (
                  <option key={i} value={item.accounttype}>
                    {item.accounttypedescription}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.salesRegion}</label>
          <div className={`${styles.inputSide} ${styles.width200}`}>
            <select
              value={
                context?.centralPricingAccount?.salesRegionID
                  ? context.centralPricingAccount.salesRegionID
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "salesRegionID",
                  e.target.value
                )
              }
            >
              <option value=""></option>
              {context?.centralAccountRegistry?.salesRegionList.map(
                (region, i) => (
                  <option key={i} value={region.salesregionid}>
                    {region.salesregion}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.priceOnMarRFP}</label>
          <div className={styles.inputSide}>
            <select
              value={
                context?.centralPricingAccount?.haspriorprice
                  ? context.centralPricingAccount.haspriorprice
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "haspriorprice",
                  e.target.value
                )
              }
            >
              <option value=""></option>
              <option value="Y">{Settings.labels.yes}</option>
              <option value="N">{Settings.labels.no}</option>
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.thirdPartyTool}</label>
          <div className={styles.inputSide}>
            <select
              value={
                context?.centralPricingAccount?.thirdPartyTool
                  ? context.centralPricingAccount.thirdPartyTool
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "thirdPartyTool",
                  e.target.value
                )
              }
            >
              <option value=""></option>
              <option value="Y">{Settings.labels.yes}</option>
              <option value="N">{Settings.labels.no}</option>
            </select>
          </div>
        </div>
        {context.centralPricingAccount.thirdPartyTool == "Y" && (
          <div className={styles.registrationForm}>
            <label>{Settings.labels.thirdPartyName}</label>
            <div className={styles.inputSide}>
              <select
                value={
                  context?.centralPricingAccount?.thirdPartyId
                    ? context.centralPricingAccount.thirdPartyId
                    : ""
                }
                onChange={(e) =>
                  context.handlePricingAccountChange(
                    "thirdPartyId",
                    e.target.value
                  )
                }
              >
                <option key={"blank"} value=""></option>
                {context?.centralAccountRegistry?.thirdParties.map(
                  (party, i) => (
                    <option key={i} value={party.account_thirdparty_refid}>
                      {party.account_thirdparty}
                    </option>
                  )
                )}
                <option value="-1">Other</option>
              </select>
            </div>
          </div>
        )}
        {context.centralPricingAccount.thirdPartyId == -1 && (
          <div className={styles.registrationForm}>
            <label>{Settings.labels.thirdPartyOther}</label>
            <div className={styles.inputSide}>
              <input
                type="text"
                onChange={(e) =>
                  context.handlePricingAccountChange(
                    "otherthirdpartyname",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        )}
        <div className={styles.registrationForm}>
          <label>{Settings.labels.pricingThreshold}</label>
          <div className={styles.inputSide}>
            <select
              value={
                context?.centralPricingAccount?.solicitPricing
                  ? context.centralPricingAccount.solicitPricing
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "solicitPricing",
                  e.target.value
                )
              }
            >
              <option key={"blank"} value=""></option>
              <option key={"Yes"} value="Yes">
                {Settings.labels.yes}
              </option>
              <option key={"No"} value="No">
                {Settings.labels.no}
              </option>
              <option key={"Unknown"} value="Unknown">
                {Settings.labels.unknown}
              </option>
            </select>
          </div>
        </div>
        {context.centralPricingAccount.solicitPricing == "No" && (
          <div className={styles.registrationForm}>
            <label>{Settings.labels.regReason}</label>
            <div className={styles.inputSide}>
              <div className={styles.radioOptions}>
                <input
                  type="radio"
                  id="ofValue"
                  checked={
                    context.centralPricingAccount.reasonToPrice ===
                    Settings.labels.radioOptions.ofValue.value
                  }
                  value={Settings.labels.radioOptions.ofValue.value}
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "reasonToPrice",
                      e.target.value
                    )
                  }
                />
                <label htmlFor="ofValue">
                  {Settings.labels.radioOptions.ofValue.label}
                </label>
              </div>
              <div className={styles.radioOptions}>
                <input
                  type="radio"
                  id="leaderInstructions"
                  checked={
                    context.centralPricingAccount.reasonToPrice ===
                    Settings.labels.radioOptions.leaderInstructions.value
                  }
                  value={Settings.labels.radioOptions.leaderInstructions.value}
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "reasonToPrice",
                      e.target.value
                    )
                  }
                />
                <label htmlFor="leaderInstructions">
                  {Settings.labels.radioOptions.leaderInstructions.label}
                </label>
              </div>
              <div className={styles.radioOptions}>
                <input
                  type="radio"
                  id="moreEfficient"
                  checked={
                    context.centralPricingAccount.reasonToPrice ===
                    Settings.labels.radioOptions.moreEfficient.value
                  }
                  value={Settings.labels.radioOptions.moreEfficient.value}
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "reasonToPrice",
                      e.target.value
                    )
                  }
                />
                <label htmlFor="moreEfficient">
                  {Settings.labels.radioOptions.moreEfficient.label}
                </label>
              </div>
            </div>
          </div>
        )}
        <div className={styles.registrationForm}>
          <label>{Settings.labels.btRoomNightSpan}</label>
          <div className={styles.inputSide}>
            <select
              value={
                context?.centralPricingAccount?.btRoomNightSpan
                  ? context.centralPricingAccount.btRoomNightSpan
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "btRoomNightSpan",
                  e.target.value
                )
              }
            >
              <option key={"blank"} value=""></option>
              <option key={"Y"} value="Y">
                {Settings.labels.yes}
              </option>
              <option key={"N"} value="N">
                {Settings.labels.no}
              </option>
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.expectedRoomNightProduction}</label>
          <div className={styles.inputSide}>
            <input
              type="text"
              value={
                context?.centralPricingAccount?.roomNight
                  ? context.centralPricingAccount.roomNight
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange("roomNight", e.target.value)
              }
            />
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.gdsRateLoading}</label>
          <div className={styles.inputSide}>
            <select
              value={
                context?.centralPricingAccount?.rateLoadInstr
                  ? context.centralPricingAccount.rateLoadInstr
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "rateLoadInstr",
                  e.target.value
                )
              }
            >
              <option key={"blank"} value=""></option>
              <option key={"Y"} value="Y">
                {Settings.labels.yes}
              </option>
              <option key={"N"} value="N">
                {Settings.labels.no}
              </option>
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.desiredMarRFPDueDate}</label>
          <div className={styles.inputSide}>
            <select
              value={
                context?.centralPricingAccount?.pricingperiodid
                  ? context.centralPricingAccount.pricingperiodid
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "pricingperiodid",
                  e.target.value
                )
              }
            >
              <option key={"blank"} value=""></option>
              {context?.centralAccountRegistry?.dueDateList.map(
                (dueDate, i) => (
                  <option key={i} value={dueDate.pricingperiodid}>
                    {dueDate.longDueDate}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.clientRFPDueDate}</label>
          <div className={styles.inputSide}>
            <input
              type="text"
              value={
                context?.centralPricingAccount?.clientDueDate
                  ? context.centralPricingAccount.clientDueDate
                  : ""
              }
              onChange={(e) =>
                context.handlePricingAccountChange(
                  "clientDueDate",
                  e.target.value
                )
              }
            />
          </div>
        </div>
        <div className={styles.registrationForm}>
          <label>{Settings.labels.specialPricingCircumstances}</label>
          <div className={`${styles.inputSide} ${styles.specialCircumstances}`}>
            <div className={styles.row}>
              <div className={styles.specialCircumstancesItem}>
                <input
                  type={"checkbox"}
                  value={
                    context?.centralPricingAccount?.twoyearpricing
                      ? context.centralPricingAccount.twoyearpricing
                      : ""
                  }
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "twoyearpricing",
                      e.target.checked
                    )
                  }
                />
                <label style={{ width: "121px" }}>
                  {Settings.labels.specialPricingOptions.twoYearPricing}
                </label>
              </div>
              <div className={styles.specialCircumstancesItem}>
                <input
                  type={"checkbox"}
                  value={
                    context?.centralPricingAccount?.offcyclepricing
                      ? context.centralPricingAccount.offcyclepricing
                      : ""
                  }
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "offcyclepricing",
                      e.target.checked
                    )
                  }
                />
                <label style={{ width: "182px" }}>
                  {Settings.labels.specialPricingOptions.offCycle}
                </label>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.specialCircumstancesItem}>
                <input
                  type={"checkbox"}
                  value={
                    context?.centralPricingAccount?.commrates
                      ? context.centralPricingAccount.commrates
                      : ""
                  }
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "commrates",
                      e.target.checked
                    )
                  }
                />
                <label style={{ width: "121px" }}>
                  {Settings.labels.specialPricingOptions.commissionableRates}
                </label>
              </div>
              <div className={styles.specialCircumstancesItem}>
                <input
                  type={"checkbox"}
                  value={
                    context?.centralPricingAccount?.flatrates
                      ? context.centralPricingAccount.flatrates
                      : ""
                  }
                  onChange={(e) =>
                    context.handlePricingAccountChange(
                      "flatrates",
                      e.target.checked
                    )
                  }
                />
                <label style={{ width: "121px" }}>
                  {Settings.labels.specialPricingOptions.flatRate}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <a href="javascript:void(0);" onClick={context.handleSubmit}>
            <img src={submitImg} />
          </a>
          <p>
            {Settings.labels.questions}{" "}
            <Link
              mailto={Settings.labels.accountLeadNameEmail}
              onClick={(e) => {
                e.preventDefault();
                window.open(`mailto:${Settings.labels.accountLeadNameEmail}`);
              }}
            >
              {Settings.labels.accountLeadNameEmail}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AccountRegistrationForm;
