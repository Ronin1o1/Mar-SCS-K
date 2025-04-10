/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import React from "react";
import styles from "./RateOfferLookupModal.css";
import Settings from "./static/Settings";
import RateLoadingContext from "./context/RateLoadingContext";
import SubmitBtnImg from "./../../../../../../common/assets/img/btnSubmit.gif";
import CancelBtnImg from "./../../../../../../common/assets/img/btnCancel.gif";
import CSelect from "../../../../../../common/components/CSelect";
import CSearchFilter from "../../../../../../common/components/CSearchFilter";

let contextType = null;

class RateOfferLookupModal extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeHandler = () => {
    
  };
  render() {
    return (
      <RateLoadingContext.Consumer>
        {(RateLoadingContext) => {
          contextType = RateLoadingContext;
          
          return (
            <table className={styles.gridContainer}>
              <tbody>
                <tr>
                  <td
                    className={[
                      styles.header,
                      styles.basicLookUp,
                      styles.noWrapCell,
                    ].join(" ")}
                    colSpan={3}
                  >
                    {Settings.rateLoading.rateOfferLookUpModal.subHeading}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className={styles.horLineContainer}>
                    <hr className={styles.horLine} />
                  </td>
                </tr>
                <tr>
                  <td
                    className={[styles.fieldName, styles.basicLookUp].join(" ")}
                  >
                    {Settings.rateLoading.formFields.rateOffers.name}
                  </td>
                  <td colSpan={2} className={styles.searchSelect}>
                    <CSearchFilter
                      id={
                        Settings.rateLoading.rateOfferLookUpModal.searchSelect
                          .id
                      }
                      componentName={"rateOfferLookupAcctMaint"}
                      className={styles.filterContainer}                     
                      selected={contextType.selectedRateOffer.rateOfferId}
                      data={contextType.state.rateOffers}
                      start={contextType.selectedRateOffer.startIndex}
                      getInitialData={contextType.getRateOffers}
                      getNextData={contextType.getNextRateOffers}
                      onChange={contextType.onRateOfferChangeHandler}
                      onSelect={contextType.onRateOfferSelectHandler}
                      pageSize={
                        Settings.rateLoading.rateOfferLookUpModal.searchSelect
                          .range
                      }
                      optionsStyle={styles.options}
                      invalidMessage={Settings.rateLoading.requiredMessage}
                      noData={
                        contextType.selectedRateOffer.noAccounts
                      }
                      requiredMessage={Settings.rateLoading.toolTipMessage}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className={[styles.fieldName, styles.basicLookUp].join(" ")}
                  >
                    {Settings.rateLoading.formFields.roomPoolGroup1.name}
                  </td>
                  <td colSpan={2}>
                    <CSelect
                      id={Settings.rateLoading.formFields.ratePrograms.rpgmId1}
                      className={styles.fieldWidth60}
                      keyField={
                        Settings.rateLoading.rateOfferLookUpModal.select.key
                      }
                      valField={
                        Settings.rateLoading.rateOfferLookUpModal.select.value
                      }
                      ddnOptions={contextType.state.rpgms}
                      onChange={contextType.onRpgmsChangeHandler}
                    />
                    <CSelect
                      id={Settings.rateLoading.formFields.ratePrograms.rpgmId2}
                      className={[
                        styles.fieldWidth60,
                        styles.selectMargin,
                      ].join(" ")}
                      keyField={
                        Settings.rateLoading.rateOfferLookUpModal.select.key
                      }
                      valField={
                        Settings.rateLoading.rateOfferLookUpModal.select.value
                      }
                      ddnOptions={
                        contextType.emptyRateProgram
                          .rateProgramsWithFirstItemEmpty
                      }
                      onChange={contextType.onRpgmsChangeHandler}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className={[styles.fieldName, styles.basicLookUp].join(" ")}
                  >
                    {Settings.rateLoading.formFields.roomPoolGroup2.name}
                  </td>
                  <td colSpan={2}>
                    <CSelect
                      id={Settings.rateLoading.formFields.ratePrograms.rpgmId3}
                      className={styles.fieldWidth60}
                      keyField={
                        Settings.rateLoading.rateOfferLookUpModal.select.key
                      }
                      valField={
                        Settings.rateLoading.rateOfferLookUpModal.select.value
                      }
                      ddnOptions={
                        contextType.emptyRateProgram
                          .rateProgramsWithFirstItemEmpty
                      }
                      onChange={contextType.onRpgmsChangeHandler}
                    />
                    <CSelect
                      id={Settings.rateLoading.formFields.ratePrograms.rpgmId4}
                      className={[
                        styles.fieldWidth60,
                        styles.selectMargin,
                      ].join(" ")}
                      keyField={
                        Settings.rateLoading.rateOfferLookUpModal.select.key
                      }
                      valField={
                        Settings.rateLoading.rateOfferLookUpModal.select.value
                      }
                      ddnOptions={
                        contextType.emptyRateProgram
                          .rateProgramsWithFirstItemEmpty
                      }
                      onChange={contextType.onRpgmsChangeHandler}
                    />
                  </td>
                </tr>
                <tr
                  className={
                    contextType.state.numRoomPools ===
                    Settings.rateLoading.rateOfferLookUpModal
                      .gppMaxRoomPools && styles.divHideDisplay
                  }
                >
                  <td
                    className={[styles.fieldName, styles.basicLookUp].join(" ")}
                  >
                    {Settings.rateLoading.formFields.roomPoolGroup3.name}
                  </td>
                  <td colSpan={2}>
                    <CSelect
                      id={Settings.rateLoading.formFields.ratePrograms.rpgmId5}
                      className={styles.fieldWidth60}
                      keyField={
                        Settings.rateLoading.rateOfferLookUpModal.select.key
                      }
                      valField={
                        Settings.rateLoading.rateOfferLookUpModal.select.value
                      }
                      ddnOptions={
                        contextType.emptyRateProgram
                          .rateProgramsWithFirstItemEmpty
                      }
                      onChange={contextType.onRpgmsChangeHandler}
                    />
                    <CSelect
                      id={Settings.rateLoading.formFields.ratePrograms.rpgmId6}
                      className={[
                        styles.fieldWidth60,
                        styles.selectMargin,
                      ].join(" ")}
                      keyField={
                        Settings.rateLoading.rateOfferLookUpModal.select.key
                      }
                      valField={
                        Settings.rateLoading.rateOfferLookUpModal.select.value
                      }
                      ddnOptions={
                        contextType.emptyRateProgram
                          .rateProgramsWithFirstItemEmpty
                      }
                      onChange={contextType.onRpgmsChangeHandler}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}><>&nbsp;</></td>
                </tr>
                <tr>
                  <td colSpan={3} className={styles.imgBtn}>
                    <img
                      alt={
                        Settings.rateLoading.rateOfferLookUpModal.submitButton
                          .alternative
                      }
                      id={
                        Settings.rateLoading.rateOfferLookUpModal.submitButton
                          .id
                      }
                      onClick={
                        contextType
                          .onSubmitRateOfferAndRateProgramHandler
                      }
                      src={SubmitBtnImg}
                    />
                    <>&nbsp;</>
                    <img
                      alt={
                        Settings.rateLoading.rateOfferLookUpModal.cancelButton
                          .alternative
                      }
                      id={
                        Settings.rateLoading.rateOfferLookUpModal.cancelButton
                          .id
                      }
                      onClick={contextType.showModal}
                      src={CancelBtnImg}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          );
        }}
      </RateLoadingContext.Consumer>
    );
  }
}

export default RateOfferLookupModal;
