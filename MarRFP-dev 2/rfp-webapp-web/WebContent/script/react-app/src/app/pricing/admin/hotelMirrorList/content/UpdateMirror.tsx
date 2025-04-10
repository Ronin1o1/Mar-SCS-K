import React, { Fragment, useEffect, useState } from "react";
import styles from "./HotelMirrorList.css";
import "primeflex/primeflex.css";
import SubmitButtonImg from "../../../../common/assets/img/btnSubmit.gif";
import CancelButtonImg from "../../../../common/assets/img/btnCancel.gif";
import { labels } from "../static/labels";
import { HotelMirrorCDropdown } from "./HotelMirrorCDropdown";
import CModal from "../../../../common/components/CModal";

interface IUpdateMirrorProps {
  itemData: any;
  contextType: any;
  cancelMirrorListModal: () => void;
  showMirrorListModal: any;
  showModal: any;
}

export const UpdateMirror: React.FC<IUpdateMirrorProps> = (
  props: IUpdateMirrorProps
) => {
  const { itemData, contextType } = props;
  const [updateMirror, setUpdateMirror] = useState({
    updateMirrorData: {
      rateEntityDropdowns: {
        roomPool: "",
        priorityTag: "",
        rateProgram: "",
      },
    },
  });
  const [validateModal, setValidateModal] = useState(false);
  const [message, setMessage] = useState("");
  const hotelid = itemData.hotelid;
  const [loader, setLoader] = useState(true);
  const [itemRateEntityID, setItemRateEntityID] = useState(0);

  const isNew =
    itemData.mirrorType === "P"
      ? itemData.priceRateOfferName === labels.isNewType
      : itemData.restrictionRateOfferName === labels.isNewType;

  useEffect(() => {
    setLoader(false);
    contextType.handleResetUpdateMirrorData();
    contextType.setIsLoading(true);
    contextType.getUpdateMirrorData(itemData);

    itemData.mirrorType === "P"
      ? setItemRateEntityID(itemData.priceRateEntityId)
      : setItemRateEntityID(itemData.restrictionRateEntityId);

    return () => {
      setUpdateMirror({
        ...updateMirror,
        updateMirrorData: {
          rateEntityDropdowns: {
            roomPool: "",
            priorityTag: "",
            rateProgram: "",
          },
        },
      });
      contextType.handleResetUpdateMirrorData();
    };
  }, []);
  /**
   *
   */
  const showValidateMirror = () => {
    setValidateModal(!validateModal);
  };

  /**
   *
   * @param event
   */
  const handleChangeRateType = (event) => {
    const value = parseInt(event.target.value);
    contextType.setUpdateMirrorDataStale({
      ...contextType.updateMirrorStale,
      rateType: value,
      rateOfferId: -1,
    });
    !isNew && contextType.handleResetRateType();
    contextType.handleGeltRateOfferNames({
      hotelid,
      rateTypeId: value,
    });
  };

  /**
   *
   * @param event
   */
  const handleChangeRateOffer = (event) => {
    const index = event.nativeEvent.target.selectedIndex;
    const optionText = event.nativeEvent.target[index].text;

    const value = parseInt(event.target.value);

    contextType.setUpdateMirrorDataStale({
      ...contextType.updateMirrorStale,
      rateOfferId: value,
      rateOfferName: optionText,
      rateEntity: -1,
    });

    setItemRateEntityID(-1);

    contextType.handleGeltRateEntities({
      hotelid,
      rateOfferId: value,
    });
  };

  /**
   *
   * @param message
   */
  const setValidationFunc = (message: string) => {
    setValidateModal(true);
    setMessage(message);
  };

  /**
   *
   */
  const handleUpdateRuleValidator = () => {
    const rateEntity = contextType.updateMirrorStale.rateEntity;
    const isRateEntity = rateEntity && rateEntity <= 0;

    if (contextType.updateMirrorStale.rateType < 0) {
      setValidationFunc("Please select a valid Rate Type");
    } else if (contextType.updateMirrorStale.rateOfferId <= 0) {
      setValidationFunc("Please select a valid Rate Offer");
    } else if (isRateEntity && contextType.radioCheck === "roomPool") {
      setValidationFunc("Please select valid Room Pool.");
    } else if (isRateEntity && contextType.radioCheck === "priorityTag") {
      setValidationFunc("Please select valid Priority Tag.");
      // } else if ((isRateEntity && contextType.updateMirrorStale.rateProgramCode) && contextType.radioCheck === "rateProgram") {
      //   setValidationFunc("Please select valid Rate Program.");
    } else if (
      (isRateEntity || !contextType.updateMirrorStale.rateProgramCode) &&
      contextType.radioCheck === "rateProgram"
    ) {
      setValidationFunc("Please select valid Rate Program.");
    } else if (isRateEntity && !contextType.updateMirrorStale.rateProgramCode) {
      setValidationFunc("Please select one type of Rate Entity.");
    } else {
      const rateProgramData = contextType.getRateEntitiesById(rateEntity);
      const data = {
        hotelid,
        mirror_exception_notes: contextType.updateMirrorStale.notes,
        roomPoolSeq: itemData.roomPoolSeq,
        rateProgramCode:
          rateProgramData?.rateProgram ||
          contextType.updateMirrorStale.rateProgramCode,
        rateOfferName: contextType.updateMirrorStale.rateOfferName,
        rateOfferId: contextType.updateMirrorStale.rateOfferId,
        rateEntityId:
          contextType.updateMirrorStale.rateEntity || itemRateEntityID,
        mirrorType: itemData.mirrorType,
        roomClassSeq: itemData.roomClassSeq,
      };

      contextType.updateMirrorData(data);
      props.cancelMirrorListModal();
      contextType.handleResetUpdateMirrorData();
      setValidateModal(false);
    }
    return null;
  };
  if (loader || contextType.isLoading) {
    return (
      <CModal
        title="Update Mirror"
        onClose={props.showMirrorListModal}
        show={props.showModal}
        xPosition={-100}
        yPosition={-120}
      >
        <span className={styles.displayUpdateLoader}>
          Please wait loading...
        </span>
      </CModal>
    );
  } else {
    return (
      <Fragment>
        {validateModal && <div className={styles.blurBG}></div>}
        <CModal
          title="Alert Message"
          onClose={showValidateMirror}
          show={validateModal}
          xPosition={-100}
          yPosition={-20}
          closeImgTitle={"OK - Close Message Box"}
          class="customModal"
        >
          <div
            style={{
              maxWidth: 171,
              minWidth: 151,
              padding: "11px 11px 12px 7px",
            }}
          >
            {message}
          </div>
        </CModal>
        <CModal
          title="Update Mirror"
          onClose={props.showMirrorListModal}
          show={props.showModal}
          xPosition={-300}
          yPosition={-150}
        >
          <div className={styles.updateMirrorWrap}>
            <h2 className={styles.updateMirrorHead}>
              Hotel: {itemData.marshacode} - {itemData.hotelName}
            </h2>

            <div className={styles.customGrid}>
              <div style={{ marginLeft: 5 }}>
                <fieldset className={styles.rateFieldSet}>
                  <legend style={{ marginLeft: 10 }}>
                    {labels.updateMirror.legends.OfferLegend}
                  </legend>
                  <div className={styles.rateWrap}>
                    <div
                      className="p-col-12"
                      style={{ marginLeft: -9, marginBottom: 5 }}
                    >
                      <label className={styles.labelStyling}>
                        {labels.updateMirror.formFields.label.rateType}
                      </label>
                      <HotelMirrorCDropdown
                        options={contextType.rateTypeDropdown}
                        handleChange={handleChangeRateType}
                        className={styles.rateTypeDropdown}
                        selectedValue={contextType.updateMirrorStale.rateType}
                        // value={updateMirror.updateMirrorData.rateType}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "-10px",
                        width: 240,
                        marginLeft: "-4px",
                      }}
                    >
                      <label className={styles.labelStyling}>
                        {labels.updateMirror.formFields.label.offerName}
                      </label>
                      <HotelMirrorCDropdown
                        options={contextType.rateOfferNames}
                        className={styles.offerDropdowns}
                        handleChange={handleChangeRateOffer}
                        optionName="rateOfferName"
                        optionKey="rateOfferId"
                        selectedValue={
                          contextType.updateMirrorStale.rateOfferId
                        }
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div style={{ marginLeft: 2 }}>
                <fieldset className={styles.entityFieldSet}>
                  <legend>{labels.updateMirror.legends.entityLegend}</legend>
                  <div className={styles.entityWrap}>
                    <div className={styles.radioRow}>
                      <div
                        className="p-field-radiobutton"
                        style={{ marginBottom: "13px" }}
                      >
                        <input
                          type="radio"
                          name="rateEntity"
                          checked={contextType.radioCheck === "roomPool"}
                          onChange={() => {
                            contextType.handleResetEntityData();
                            contextType.setRadioCheck("roomPool");
                          }}
                        />
                        <label className={styles.fieldLabel}>
                          {labels.updateMirror.formFields.label.roomPool}
                        </label>
                      </div>
                      <HotelMirrorCDropdown
                        options={contextType.state.rateEntities.roomPool}
                        className={styles.entityDrpdns}
                        handleChange={(event) => {
                          contextType.handleResetEntityData();
                          contextType.setRadioCheck("roomPool");

                          contextType.setUpdateMirrorDataStale({
                            ...contextType.updateMirrorStale,
                            rateEntity: parseInt(event.target.value),
                          });
                          setItemRateEntityID(event.target.value);

                          setUpdateMirror({
                            ...updateMirror,
                            updateMirrorData: {
                              ...updateMirror.updateMirrorData,
                              rateEntityDropdowns: {
                                roomPool: event.target.value,
                                priorityTag: "",
                                rateProgram: "",
                              },
                            },
                          });
                        }}
                        optionName="roomPoolCode"
                        optionKey="rateEntityId"
                        value={
                          updateMirror.updateMirrorData.rateEntityDropdowns
                            .roomPool
                        }
                      />
                    </div>

                    <div className={styles.radioRow}>
                      <div
                        className="p-field-radiobutton"
                        style={{ marginBottom: "13px" }}
                      >
                        <input
                          type="radio"
                          name="rateEntity"
                          checked={contextType.radioCheck === "priorityTag"}
                          onChange={() => {
                            contextType.handleResetEntityData();
                            contextType.setRadioCheck("priorityTag");
                          }}
                        />
                        <label className={styles.fieldLabel}>
                          {labels.updateMirror.formFields.label.priorityTag}
                        </label>
                      </div>
                      <HotelMirrorCDropdown
                        options={contextType.state.rateEntities.priorityTag}
                        className={styles.entityDrpdns}
                        handleChange={(event) => {
                          contextType.handleResetEntityData();

                          contextType.setRadioCheck("priorityTag");
                          contextType.setUpdateMirrorDataStale({
                            ...contextType.updateMirrorStale,
                            rateEntity: parseInt(event.target.value),
                          });
                          setItemRateEntityID(event.target.value);

                          setUpdateMirror({
                            ...updateMirror,
                            updateMirrorData: {
                              ...updateMirror.updateMirrorData,
                              rateEntityDropdowns: {
                                roomPool: "",
                                priorityTag: event.target.value,
                                rateProgram: "",
                              },
                            },
                          });
                        }}
                        optionName="priorityTag"
                        optionKey="rateEntityId"
                        value={
                          updateMirror.updateMirrorData.rateEntityDropdowns
                            .priorityTag
                        }
                      />
                    </div>
                    <div className={styles.radioRow}>
                      <div
                        className="p-field-radiobutton"
                        style={{ marginBottom: "13px" }}
                      >
                        <input
                          type="radio"
                          name="rateEntity"
                          checked={contextType.radioCheck === "rateProgram"}
                          onChange={() => {
                            contextType.handleResetEntityData();
                            contextType.setRadioCheck("rateProgram");
                          }}
                        />

                        <label className={styles.fieldLabel}>
                          {labels.updateMirror.formFields.label.rateProgram}
                        </label>
                      </div>
                      <HotelMirrorCDropdown
                        options={contextType.state.rateEntities.rateProgram}
                        className={styles.entityDrpdns}
                        handleChange={(event) => {
                          contextType.setRadioCheck("rateProgram");
                          contextType.setUpdateMirrorDataStale({
                            ...contextType.updateMirrorStale,
                            rateEntity: parseInt(event.target.value),
                            rateProgramCode: parseInt(event.target.value),
                          });
                          setItemRateEntityID(event.target.value);
                          setUpdateMirror({
                            ...updateMirror,
                            updateMirrorData: {
                              ...updateMirror.updateMirrorData,
                              rateEntityDropdowns: {
                                roomPool: "",
                                priorityTag: "",
                                rateProgram: event.target.value,
                              },
                            },
                          });
                        }}
                        optionName="rateProgram"
                        optionKey="rateEntityId"
                        value={
                          contextType.radioCheck === "rateProgram"
                            ? itemRateEntityID
                            : ""
                        }
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div style={{ marginTop: 30 }}>
              <label className={styles.labelStyling}>Notes:</label>
              <input
                type="text"
                id="mirrorNotes"
                className={styles.inputFieldStyling}
                onKeyPress={contextType.validate}
                maxLength={255}
                onChange={(event) => {
                  contextType.setUpdateMirrorDataStale({
                    ...contextType.updateMirrorStale,
                    notes: event.target.value,
                  });
                }}
                value={contextType.updateMirrorStale?.notes}
              />
            </div>
            <div className={styles.actionBtns}>
              <img
                src={SubmitButtonImg}
                style={{ marginRight: 3, cursor: "default" }}
                onClick={() => handleUpdateRuleValidator()}
              />
              <img
                src={CancelButtonImg}
                style={{ cursor: "default" }}
                onClick={props.cancelMirrorListModal}
              />
            </div>
          </div>
        </CModal>
      </Fragment>
    );
  }
};
