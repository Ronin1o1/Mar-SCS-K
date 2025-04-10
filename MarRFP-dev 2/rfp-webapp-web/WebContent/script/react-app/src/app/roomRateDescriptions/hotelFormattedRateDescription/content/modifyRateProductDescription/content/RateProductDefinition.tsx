import React, { useContext } from "react";
import Utils from "../../../../../common/utils/Utils";
import styles from "../content/ModifyRateDescription.css";
import ModifyRateDescriptionContext from "../context/ModifyRateDescriptionContext";

export const RateProductDefinition = (props) => {
  const context = useContext(ModifyRateDescriptionContext);
  const check = (data) => {
    for (const item in data) {
      if (data[item].availabilityInd === "Y") {
        return true;
      }
    }
    return false;
  };

  const renderAvailabilityInd = (
    showStatus,
    modifiable,
    rateProductDefinitionData
  ): JSX.Element => {
    if (showStatus) {
      if (modifiable) {
        return (
          <div className={styles.dropDownColumn}>
            <select
              name={rateProductDefinitionData.RP_CodeName}
              id={rateProductDefinitionData.RP_CodeName}
              size={1}
              value={rateProductDefinitionData?.availabilityInd}
              onChange={(e) => {
                context.setFormChange("Y");
                context.handleDropChange(
                  rateProductDefinitionData.RP_CodeName,
                  e
                );
              }}
            >
              <option value="" />
              <option
                value="Y"
                selected={
                  rateProductDefinitionData.availabilityInd === "Y"
                    ? true
                    : false
                }
              >
                Yes
              </option>
              <option
                value="N"
                selected={
                  rateProductDefinitionData.availabilityInd === "N"
                    ? true
                    : false
                }
              >
                No
              </option>
            </select>
          </div>
        );
      } else {
        return (
          <div className={styles.dropDownColumn}>
            <span>
              {rateProductDefinitionData.availabilityInd === "Y" ? (
                <label className={styles.selectionLabel}>Yes</label>
              ) : rateProductDefinitionData.availabilityInd === " " ? (
                ""
              ) : (
                <label className={styles.selectionLabel}>No</label>
              )}
            </span>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <div>
        <div className={styles.mainTableWidth}>
          {context.state?.definitionList?.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.map(
            (list, l) => {
              return (
                <table className={styles.tableWidth} key={l}>
                  <tr>
                    <td
                      className={
                        check(list.rateProductDefinition)
                          ? styles.instructionHeader2
                          : styles.instructionHeader
                      }
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {list?.RP_GroupName}
                    </td>
                  </tr>
                  {list.rateProductDefinition.map(
                    (rateProductDefinitionData, m) => {
                      let showStatus = false;
                      let showText = false;
                      let showQuantity = false;
                      let modifiable = true;
                      if (rateProductDefinitionData.supplementaryData != null) {
                        rateProductDefinitionData.supplementaryData.forEach(
                          (k) => {
                            if (k.path == "../@AvailabilityInd") {
                              showStatus = true;
                            }
                            if (k.path == "../Text/text()") {
                              showText = true;
                            }
                            if (k.path == "../@Quantity") {
                              showQuantity = true;
                            }
                          }
                        );
                      }
                      if (
                        context.state.definitionList.readOnly ||
                        rateProductDefinitionData.managed === "true" ||
                        (props.entryData === "Brand" &&
                          rateProductDefinitionData.brandModifiable ===
                            "false") ||
                        (props.entryData === "Hotel" &&
                          rateProductDefinitionData.hotelModifiable === "false")
                      ) {
                        modifiable = false;
                      } else {
                        modifiable = true;
                      }
                      return (
                        <tr key={m}>
                          <td className={styles.datavaluesfor}>
                            <table>
                              <tr className={styles.tableWidth}>
                                <td style={{ display: "flex" }}>
                                  {renderAvailabilityInd(
                                    showStatus,
                                    modifiable,
                                    rateProductDefinitionData
                                  )}
                                  <div className={styles.codeName}>
                                    <p className={styles.rpCodeName}>
                                      {rateProductDefinitionData?.RP_CodeName}
                                    </p>
                                    <p className={styles.rpTextValue}>
                                      {rateProductDefinitionData?.text?.value}
                                    </p>
                                  </div>
                                </td>
                                {(showStatus === true ||
                                  rateProductDefinitionData.unitOfMeasure !==
                                    null) &&
                                  showQuantity == true && (
                                    <td
                                      style={{
                                        visibility:
                                          showStatus === true &&
                                          rateProductDefinitionData.availabilityInd ===
                                            "Y"
                                            ? "visible"
                                            : "hidden",
                                      }}
                                    >
                                      {modifiable ? (
                                        <input
                                          className={styles.quantityField}
                                          defaultValue={
                                            rateProductDefinitionData?.quantity
                                          }
                                          onKeyPress={
                                            Utils.NumberAndSingleFloatOnly_onkeypress
                                          }
                                          onChange={(e) =>
                                            context?.changeQuantity(
                                              rateProductDefinitionData.RP_CodeName,
                                              e
                                            )
                                          }
                                        ></input>
                                      ) : (
                                        <p className={styles.quantityreadOnly}>
                                          {rateProductDefinitionData?.quantity}
                                        </p>
                                      )}
                                    </td>
                                  )}
                                {rateProductDefinitionData.unitOfMeasure && (
                                  <td className={styles.columnWidth}>
                                    {showStatus &&
                                      rateProductDefinitionData.availabilityInd ===
                                        "Y" && (
                                        <b>
                                          {rateProductDefinitionData.unitOfMeasure &&
                                            rateProductDefinitionData
                                              .unitOfMeasure.UOM_List != null &&
                                            context.state.UOMLists[
                                              rateProductDefinitionData
                                                .unitOfMeasure.UOM_List
                                            ]?.UOM_Type}
                                          :&nbsp;
                                        </b>
                                      )}
                                    {modifiable ? (
                                      <select
                                        className={
                                          rateProductDefinitionData.hotelModifiable ==
                                            "true" &&
                                          rateProductDefinitionData.availabilityInd ===
                                            "Y"
                                            ? styles.selectDropDown
                                            : styles.hiddenField
                                        }
                                        onChange={(e) => {
                                          context.setFormChange("Y");
                                          context.changeUOMList(
                                            rateProductDefinitionData.RP_CodeName,
                                            e,
                                            context.state.UOMLists[
                                              rateProductDefinitionData
                                                .unitOfMeasure.uom_List
                                            ]
                                          );
                                        }}
                                      >
                                        <option value="" />
                                        {context.state.UOMLists[
                                          rateProductDefinitionData
                                            .unitOfMeasure.UOM_List
                                        ]?.unitOfMeasure.map((m, i) => (
                                          <option
                                            key={i}
                                            value={m.UOM_Code}
                                            selected={
                                              m.UOM_Code ==
                                              rateProductDefinitionData
                                                .unitOfMeasure.UOM_Code
                                                ? true
                                                : false
                                            }
                                          >
                                            {m.UOM_Name}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      context.state.UOMLists[
                                        rateProductDefinitionData.unitOfMeasure
                                          .UOM_List
                                      ]?.unitOfMeasure.map((uomItem, i) => {
                                        return (
                                          <>
                                            <span
                                              className={styles.selectionLabel}
                                            >
                                              {uomItem.UOM_Code ==
                                                rateProductDefinitionData
                                                  .unitOfMeasure.UOM_Code &&
                                                uomItem.UOM_Name}
                                            </span>
                                          </>
                                        );
                                      })
                                    )}
                                  </td>
                                )}

                                {rateProductDefinitionData.type != null &&
                                  rateProductDefinitionData.type.typeListCode !=
                                    null && (
                                    <td className={styles.columnWidth}>
                                      {showStatus &&
                                        rateProductDefinitionData.availabilityInd ===
                                          "Y" && (
                                          <b>
                                            {rateProductDefinitionData.type &&
                                              rateProductDefinitionData.type
                                                .typeListCode != null &&
                                              context.state.typeLists[
                                                rateProductDefinitionData.type
                                                  .typeListCode
                                              ]?.typeListName}
                                            :&nbsp;
                                          </b>
                                        )}
                                      {modifiable ? (
                                        <select
                                          className={
                                            rateProductDefinitionData.hotelModifiable ==
                                              "true" &&
                                            rateProductDefinitionData.availabilityInd ===
                                              "Y"
                                              ? styles.selectDropDown
                                              : styles.hiddenField
                                          }
                                          onChange={(e) => {
                                            context.setFormChange("Y");
                                            context.changeTypeList(
                                              rateProductDefinitionData.RP_CodeName,
                                              e
                                            );
                                          }}
                                        >
                                          <option value="" />
                                          {context.state.typeLists[
                                            rateProductDefinitionData.type
                                              .typeListCode
                                          ]?.type.map((m, i) => (
                                            <option
                                              key={i}
                                              value={m.typeCode}
                                              selected={
                                                m.typeCode ==
                                                rateProductDefinitionData.type
                                                  .typeCode
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {m.typeName}
                                            </option>
                                          ))}
                                        </select>
                                      ) : (
                                        context.state.typeLists[
                                          rateProductDefinitionData.type
                                            .typeListCode
                                        ]?.type.map((m, i) => {
                                          return (
                                            <>
                                              {m.typeCode ==
                                                rateProductDefinitionData.type
                                                  .typeCode && (
                                                <span
                                                  className={
                                                    styles.selectionLabel
                                                  }
                                                >
                                                  {m.typeName}
                                                </span>
                                              )}
                                            </>
                                          );
                                        })
                                      )}
                                    </td>
                                  )}

                                {rateProductDefinitionData.brand != null &&
                                  rateProductDefinitionData.brand.brandList !=
                                    null && (
                                    <td className={styles.columnWidth}>
                                      {showStatus &&
                                        rateProductDefinitionData.availabilityInd ===
                                          "Y" && (
                                          <b>
                                            {rateProductDefinitionData.brand &&
                                              rateProductDefinitionData.brand
                                                .brandList != null &&
                                              context.state.brandLists[
                                                rateProductDefinitionData.brand
                                                  .brandList
                                              ].brandType}
                                            :&nbsp;
                                          </b>
                                        )}
                                      {modifiable ? (
                                        <select
                                          className={
                                            rateProductDefinitionData.hotelModifiable ==
                                              "true" &&
                                            rateProductDefinitionData.availabilityInd ===
                                              "Y"
                                              ? styles.selectDropDown
                                              : styles.hiddenField
                                          }
                                          onChange={(e) => {
                                            context.setFormChange("Y");
                                            context.changeBrandList(
                                              rateProductDefinitionData.RP_CodeName,
                                              e
                                            );
                                          }}
                                        >
                                          <option value="" />
                                          {context.state.brandLists[
                                            rateProductDefinitionData.brand
                                              .brandList
                                          ].brand.map((m, i) => (
                                            <option
                                              key={i}
                                              value={m.brandCode}
                                              selected={
                                                m.brandCode ==
                                                rateProductDefinitionData.brand
                                                  .brandCode
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {m.brandName}
                                            </option>
                                          ))}
                                        </select>
                                      ) : (
                                        context.state.brandLists[
                                          rateProductDefinitionData.brand
                                            .brandList
                                        ].brand.map((m, i) => {
                                          return (
                                            <>
                                              {m.brandCode ==
                                                rateProductDefinitionData.brand
                                                  .brandCode && (
                                                <span
                                                  className={
                                                    styles.selectionLabel
                                                  }
                                                >
                                                  {m.brandName}
                                                </span>
                                              )}
                                            </>
                                          );
                                        })
                                      )}
                                    </td>
                                  )}

                                {showText &&
                                  rateProductDefinitionData.description !=
                                    null &&
                                  rateProductDefinitionData.availabilityInd ===
                                    "Y" && (
                                    <td className={styles.textBoxDesc}>
                                      {modifiable ? (
                                        <input
                                          className={styles.inputDescription}
                                          value={
                                            (rateProductDefinitionData.description &&
                                              rateProductDefinitionData
                                                .description.text &&
                                              rateProductDefinitionData
                                                .description.text[0].value) ||
                                            undefined
                                          }
                                          maxLength={
                                            rateProductDefinitionData.description &&
                                            rateProductDefinitionData
                                              .description.text &&
                                            rateProductDefinitionData
                                              .description.text[0].maxLength
                                          }
                                          onKeyPress={(e) =>
                                            context.KorSafeCharsOnly(e)
                                          }
                                          onChange={(e) => {
                                            context.setFormChange("Y");
                                            context.changeDescription(
                                              rateProductDefinitionData.RP_CodeName,
                                              e
                                            );
                                          }}
                                        />
                                      ) : (
                                        <span className={styles.rpTextValue}>
                                          {
                                            rateProductDefinitionData
                                              .description.text[0].value
                                          }
                                        </span>
                                      )}
                                    </td>
                                  )}
                              </tr>
                            </table>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </table>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};
