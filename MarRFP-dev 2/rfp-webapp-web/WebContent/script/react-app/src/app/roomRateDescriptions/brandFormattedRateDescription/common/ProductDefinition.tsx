import React from "react";
import btnSelectAll from "../../../common/assets/img/button/btnSelectAll.gif";
import btnUnSelectAll from "../../../common/assets/img/button/btnUnSelectAll.gif";
import btnBlankAll from "../../../common/assets/img/button/btnBlankAll.gif";
import CRadio from "../../../common/components/CRadio";
import CCheckbox from "../../../common/components/CCheckbox";
import Settings from "../static/Settings";
import styles from "./ProductDefinition.css";
export const ProductDefinition = (props) => {
  const renderAvailabilityInd = (
    showStatus,
    modifiable,
    dataItem
  ): JSX.Element => {
    if (showStatus) {
      if (modifiable) {
        return (
          <select
            name={
              "rateProductDefinition[" +
              dataItem.RP_Name +
              "_" +
              dataItem.RP_Code +
              "].availabilityInd"
            }
            id={
              "rateProductDefinition[" +
              dataItem.RP_Name +
              "_" +
              dataItem.RP_Code +
              "].availabilityInd"
            }
            onChange={(e) => showRest(e, dataItem)}
          >
            <option value=""></option>
            <option
              value="Y"
              selected={dataItem.availabilityInd == "Y" ? true : false}
            >
              {Settings.labels.yesOption}
            </option>
            <option
              value="N"
              selected={dataItem.availabilityInd == "N" ? true : false}
            >
              {Settings.labels.noOption}
            </option>
          </select>
        );
      } else {
        return (
          <>
            {dataItem.availabilityInd == "Y" && (
              <label className={styles.selectionLabel}>
                {Settings.labels.yesOption}
              </label>
            )}
            {dataItem.availabilityInd == "N" && (
              <label className={styles.selectionLabel}>
                {Settings.labels.noOption}
              </label>
            )}
          </>
        );
      }
    } else {
      return null;
    }
  };

  const setUnitOfMeasure = (unitItem, modifiable) => {
    const uom = unitItem.unitOfMeasure;
    const uomListKey = uom.UOM_List;
    const uomList =
      props.data.commonDataBindState.rateProductDataView.uomLists[uomListKey];

    return (
      <>
        <b>{uomList.UOM_Type} :</b>
        {modifiable ? (
          <select
            name={
              "rateProductDefinition[" +
              unitItem.RP_Name +
              "_" +
              unitItem.RP_Code +
              "].UOM_Code"
            }
            id={
              "rateProductDefinition[" +
              unitItem.RP_Name +
              "_" +
              unitItem.RP_Code +
              "].UOM_Code"
            }
            onChange={(e) => showUOM(e)}
          >
            <option
              value="    "
              selected={uom.UOM_Code == "    " ? true : false}
            >
              {""}
            </option>
            {uomList.unitOfMeasure.map((uomItem) => {
              return (
                <>
                  (
                  <option
                    value={uomItem?.UOM_Code}
                    selected={uomItem?.UOM_Code == uom.UOM_Code ? true : false}
                  >
                    {uomItem.UOM_Name}
                  </option>
                  )
                </>
              );
            })}
          </select>
        ) : (
          uomList.unitOfMeasure.map((uomItem) => {
            return (
              <>
                {uomItem.UOM_Code == unitItem.unitOfMeasure.UOM_Code &&
                  uomItem.UOM_Name}
              </>
            );
          })
        )}
      </>
    );
  };

  const setTypeList = (typeItem, modifiable) => {
    const type = typeItem.type;
    const typeListKey = type?.typeListCode;
    const typeLists =
      props.data.commonDataBindState.rateProductDataView.typeLists[typeListKey];

    return (
      <>
        <b>{typeLists.typeListName} :</b>
        {modifiable ? (
          <select
            name={
              "rateProductDefinition[" +
              typeItem.RP_Name +
              "_" +
              typeItem.RP_Code +
              "].typeCode"
            }
            id={
              "rateProductDefinition[" +
              typeItem.RP_Name +
              "_" +
              typeItem.RP_Code +
              "].typeCode"
            }
            onChange={(e) => showType(e)}
          >
            <option
              value="    "
              selected={typeItem.type.typeCode == "    " ? true : false}
            >
              {""}
            </option>
            {typeLists.type.map((typeItem) => {
              return (
                <>
                  (
                  <option
                    value={typeItem?.typeCode}
                    selected={
                      typeItem?.typeCode == type.typeCode ? true : false
                    }
                  >
                    {typeItem.typeName}
                  </option>
                  )
                </>
              );
            })}
          </select>
        ) : (
          typeLists.type.map((typeItem) => {
            return (
              <>{typeItem?.typeCode == type?.typeCode && typeItem.typeName}</>
            );
          })
        )}
      </>
    );
  };

  const setBrandList = (brandItem, modifiable) => {
    const brand = brandItem.brand;
    const brandListKey = brand?.brandList;
    const brandLists =
      props.data.commonDataBindState.rateProductDataView.brandLists[
        brandListKey
      ];

    return (
      <>
        <b>{brandLists.brandType} :</b>
        {modifiable ? (
          <select
            name={
              "rateProductDefinition[" +
              brandItem.RP_Name +
              "_" +
              brandItem.RP_Code +
              "].brandCode"
            }
            id={
              "rateProductDefinition[" +
              brandItem.RP_Name +
              "_" +
              brandItem.RP_Code +
              "].brandCode"
            }
            onChange={(e) => showBrand(e)}
          >
            <option
              value="    "
              selected={brandItem.brand?.brandCode == "    " ? true : false}
            >
              {""}
            </option>
            {brandLists.brand.map((brandItem) => {
              return (
                <>
                  (
                  <option
                    value={brandItem?.brandCode}
                    selected={
                      brandItem?.brandCode == brand.brandCode ? true : false
                    }
                  >
                    {brandItem.brandName}
                  </option>
                  )
                </>
              );
            })}
          </select>
        ) : (
          brandLists.brand.map((brandItem) => {
            return (
              <>
                {brandItem?.brandCode == brand?.brandCode &&
                  brandItem?.brandName}
              </>
            );
          })
        )}
      </>
    );
  };

  const checkBrandModifible = (event) => {
    props.handleModifiableChange(event, "brand_modifiable");
  };

  const checkHotelModifible = (event) => {
    props.handleModifiableChange(event, "hotel_modifiable");
  };

  const showRest = (event, fieldValue) => {
    props.handleShowRest(event, fieldValue);
  };

  const checkForNumber = (event) => {
    props.handleNumberChange(event);
  };

  const showUOM = (event) => {
    props.handleShowUOM(event);
  };

  const showType = (event) => {
    props.handleShowType(event);
  };

  const showBrand = (event) => {
    props.handleShowBrand(event);
  };

  const checkForKorSafeCharsOnly = (event) => {
    props.handleForSafeNumberChange(event);
  };

  const chgModifiable_onclick = (event) => {
    props.handleModifiableRadioChange(event);
  };

  const chgDescriptionData = (event) => {
    props.handleDescriptionData(event);
  };

  const selectAll_Click = () => {
    props.handleSelectAll_Click();
  };

  const unselectall_Click = () => {
    props.handleUnSelectall_Click();
  };

  const blankAll_Click = () => {
    props.handleUnBlankAll_Click();
  };

  return (
    <>
      <div>
        <table
          className={` ${styles.menuHght100_Height} ${styles.fieldValueCls}`}
        >
          <tbody>
            {props.data?.createProductState?.entryLevel ==
              Settings.labels.entryLevel ||
            props.data?.createProductState?.entryLevel ==
              Settings.labels.entryLevelBrand ? (
              <tr>
                <td colSpan={7}>
                  <table className={styles.innerTableBHS}>
                    <tr>
                      <td rowSpan={3} style={{ verticalAlign: "middle" }}>
                        {(props.data?.createProductState?.entryLevel ==
                          Settings.labels.entryLevel ||
                          props.data?.createProductState?.entryLevel ==
                            Settings.labels.entryLevelBrand) && (
                          <>
                            <CRadio
                              type={Settings.inputType.radio}
                              id={Settings.labels.radioModifiable}
                              name={Settings.labels.radioModifiable}
                              onChangeHandler={(e) => chgModifiable_onclick(e)}
                              value={Settings.labels.hotelModifiable}
                              checked={
                                props.data?.commonDataBindState?.radio1 ===
                                Settings.labels.hotelModifiable
                              }
                            ></CRadio>
                            {Settings.labels.hotelModifiableText}
                            <br></br>
                          </>
                        )}
                        <CRadio
                          type={Settings.inputType.radio}
                          id={Settings.labels.radioModifiable}
                          name={Settings.labels.radioModifiable}
                          onChangeHandler={(e) => chgModifiable_onclick(e)}
                          value={Settings.labels.statusYN}
                          checked={
                            props.data?.commonDataBindState?.radio1 ===
                            Settings.labels.statusYN
                          }
                        ></CRadio>
                        {Settings.labels.statusYNText}
                      </td>
                      <td className={styles.selectbtns}>
                        <a>
                          <img
                            tabIndex={0}
                            src={btnSelectAll}
                            alt={Settings.labels.unselectAll}
                            onClick={() => selectAll_Click()}
                          />
                        </a>
                        <a>
                          <img
                            tabIndex={0}
                            src={btnUnSelectAll}
                            alt={Settings.labels.unselectAll}
                            onClick={() => unselectall_Click()}
                          />
                        </a>
                        <a>
                          <img
                            tabIndex={0}
                            src={btnBlankAll}
                            alt={Settings.labels.blankAll}
                            onClick={() => blankAll_Click()}
                          />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            ) : (
              <>&nbsp;</>
            )}
            {props.data?.commonDataBindState?.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup?.map(
              (data, index) => {
                let showStatus = "false";
                let showText = "false";
                let showQuantity = "false";
                let modifiable = true;
                return (
                  <>
                    {data.RP_GroupCode != "0000" && (
                      <>
                        <tr>
                          <td
                            className={styles.tdheader}
                            colSpan={8}
                            align="left"
                          >
                            {data.RP_GroupName}
                          </td>
                        </tr>
                        <>
                          {data.text != null && (
                            <>
                              <tr>
                                <td
                                  className={styles.tdheader}
                                  colSpan={6}
                                  align="left"
                                >
                                  &nbsp;&nbsp;{data.text}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={7} height="5px">
                                  &nbsp;
                                </td>
                              </tr>
                            </>
                          )}
                        </>
                      </>
                    )}
                    {props.data?.createProductState?.entryLevel !=
                      Settings.labels.hotelTitle && (
                      <>
                        <tr>
                          <td className={styles.width_10}>&nbsp;</td>
                          <td colSpan={2}>{Settings.labels.modifiableBy}</td>
                          <td colSpan={4}></td>
                        </tr>
                        <tr>
                          <td className={styles.width_10}>&nbsp;</td>
                          <td>
                            {(props.data?.createProductState?.entryLevel ==
                              Settings.labels.entryLevel ||
                              props.data?.createProductState?.entryLevel ==
                                Settings.labels.entryLevelBrand) &&
                              Settings.labels.hotelTitle}
                          </td>
                          <td colSpan={4}></td>
                        </tr>
                      </>
                    )}

                    {data?.rateProductDefinition?.map((dataItem) => {
                      {
                        if (
                          props.data?.createProductState?.readOnly ||
                          dataItem.managed == "true" ||
                          (props.data?.createProductState?.entryLevel ==
                            Settings.labels.entryLevelBrand &&
                            dataItem.brandModifiable == "false") ||
                          (props.data?.createProductState?.entryLevel ==
                            Settings.labels.hotelTitle &&
                            dataItem.hotelModifiable == "false")
                        ) {
                          modifiable = false;
                        } else {
                          modifiable = true;
                        }

                        {
                          dataItem.supplementaryData.length > 0 &&
                            dataItem.supplementaryData.forEach((k) => {
                              if (k.path == "../@AvailabilityInd") {
                                showStatus = "true";
                              }
                              if (k.path == "../Text/text()") {
                                showText = "true";
                              }
                              if (k.path == "../@Quantity") {
                                showQuantity = "true";
                              }
                            });
                        }
                      }
                      return (
                        <>
                          <tr key={index}>
                            <td className={styles.align_top}></td>
                            <td className={styles.align_top}>
                              {(props.data?.createProductState?.entryLevel ==
                                Settings.labels.entryLevel ||
                                props.data?.createProductState?.entryLevel ==
                                  Settings.labels.entryLevelBrand) && (
                                <>
                                  .
                                  <CCheckbox
                                    type={Settings.inputType.checkbox}
                                    id={
                                      "hchk_" +
                                      dataItem.RP_Name +
                                      "_" +
                                      dataItem.RP_Code
                                    }
                                    name={
                                      "hchk_" +
                                      dataItem.RP_Name +
                                      "_" +
                                      dataItem.RP_Code
                                    }
                                    value={!!dataItem.checkedH}
                                    onChangeHandler={(e) =>
                                      checkHotelModifible(e)
                                    }
                                    checked={
                                      dataItem.hotelModifiable == "true"
                                        ? true
                                        : false
                                    }
                                    disabled={
                                      dataItem.brandModifiable == "false"
                                        ? true
                                        : false
                                    }
                                  ></CCheckbox>
                                  <input
                                    id={
                                      "rateProductDefinition[" +
                                      dataItem.RP_Name +
                                      "_" +
                                      dataItem.RP_Code +
                                      "].hotelModifiable"
                                    }
                                    type={Settings.inputType.hidden}
                                    name={
                                      "rateProductDefinition[" +
                                      dataItem.RP_Name +
                                      "_" +
                                      dataItem.RP_Code +
                                      "].hotelModifiable"
                                    }
                                    value={dataItem.hotelModifiable}
                                  />
                                </>
                              )}
                            </td>
                            {showStatus == "false" &&
                              dataItem.unitOfMeasure == null &&
                              showQuantity == "true" && (
                                <td align="left" className={styles.alignWrap}>
                                  {modifiable ? (
                                    <input
                                      type={Settings.inputType.text}
                                      className={styles.width_30}
                                      id={
                                        "rateProductDefinition[" +
                                        dataItem.RP_Name +
                                        "_" +
                                        dataItem.RP_Code +
                                        "].quantity"
                                      }
                                      name={
                                        "rateProductDefinition[" +
                                        dataItem.RP_Name +
                                        "_" +
                                        dataItem.RP_Code +
                                        "].quantity"
                                      }
                                      value={dataItem.quantity}
                                      onKeyPress={(e) => checkForNumber(e)}
                                    />
                                  ) : (
                                    <>
                                      <label>{dataItem.quantity}</label>
                                      <input
                                        id={
                                          "rateProductDefinition[" +
                                          dataItem.RP_Name +
                                          "_" +
                                          dataItem.RP_Code +
                                          "].quantity"
                                        }
                                        type={Settings.inputType.hidden}
                                        name={
                                          "rateProductDefinition[" +
                                          dataItem.RP_Name +
                                          "_" +
                                          dataItem.RP_Code +
                                          "].quantity"
                                        }
                                        value={dataItem.quantity}
                                      />
                                      )
                                    </>
                                  )}
                                </td>
                              )}
                            <td
                              align="left"
                              height={30}
                              className={styles.prodAvail}
                            >
                              {renderAvailabilityInd(
                                showStatus,
                                modifiable,
                                dataItem
                              )}
                            </td>
                            <td
                              align="left"
                              className={styles.product_width_200}
                            >
                              <table className={styles.mainTable}>
                                <tr>
                                  <td>
                                    <b>
                                      <span
                                        id={
                                          "NM_" +
                                          dataItem.RP_Name +
                                          "_" +
                                          dataItem.RP_Code
                                        }
                                      >
                                        {dataItem.RP_CodeName?.trim()}
                                      </span>
                                      <input
                                        id={
                                          "REQ_" +
                                          dataItem.RP_Name +
                                          "_" +
                                          dataItem.RP_Code
                                        }
                                        type={Settings.inputType.hidden}
                                        name={
                                          "REQ_" +
                                          dataItem.RP_Name +
                                          "_" +
                                          dataItem.RP_Code
                                        }
                                        value={dataItem.mustComplete}
                                      />
                                    </b>
                                  </td>
                                </tr>
                                {dataItem.text != null && (
                                  <tr>
                                    <td
                                      align="left"
                                      className={styles.itemTypeText}
                                    >
                                      {dataItem.text.value}
                                    </td>
                                  </tr>
                                )}
                              </table>
                            </td>
                            <td
                              align="left"
                              className={styles.product_width_10}
                            >
                              &nbsp;
                            </td>
                            <td className={styles.align_top}>
                              {showStatus == "true" && (
                                <div
                                  id={
                                    "div_" +
                                    dataItem.RP_Name +
                                    "_" +
                                    dataItem.RP_Code
                                  }
                                  style={
                                    dataItem.availabilityInd == "Y"
                                      ? { display: "block" }
                                      : { display: "none" }
                                  }
                                >
                                  <table className={styles.mainTable}>
                                    <tr>
                                      {(showStatus == "true" ||
                                        dataItem.unitOfMeasure != null) &&
                                        showQuantity == "true" && (
                                          <td
                                            className={` ${styles.alignWrap} ${styles.width_30} `}
                                          >
                                            {modifiable ? (
                                              <input
                                                className={styles.width_30}
                                                type={Settings.inputType.text}
                                                name={
                                                  "rateProductDefinition[" +
                                                  dataItem.RP_Name +
                                                  "_" +
                                                  dataItem.RP_Code +
                                                  "].quantity"
                                                }
                                                id={
                                                  "rateProductDefinition[" +
                                                  dataItem.RP_Name +
                                                  "_" +
                                                  dataItem.RP_Code +
                                                  "].quantity"
                                                }
                                                value={dataItem.quantity}
                                                onKeyPress={(e) =>
                                                  checkForNumber(e)
                                                }
                                              />
                                            ) : (
                                              <>
                                                <label>
                                                  {dataItem.quantity}
                                                </label>
                                                <input
                                                  id={
                                                    "rateProductDefinition[" +
                                                    dataItem.RP_Name +
                                                    "_" +
                                                    dataItem.RP_Code +
                                                    "].quantity"
                                                  }
                                                  type={
                                                    Settings.inputType.hidden
                                                  }
                                                  name={
                                                    "rateProductDefinition[" +
                                                    dataItem.RP_Name +
                                                    "_" +
                                                    dataItem.RP_Code +
                                                    "].quantity"
                                                  }
                                                  value={dataItem.quantity}
                                                />
                                              </>
                                            )}
                                          </td>
                                        )}
                                      <td
                                        align="left"
                                        className={styles.product_width_10}
                                      >
                                        &nbsp;
                                      </td>
                                      {dataItem.unitOfMeasure != null && (
                                        <>
                                          <td
                                            align="left"
                                            className={styles.product_width_250}
                                          >
                                            {setUnitOfMeasure(
                                              dataItem,
                                              modifiable
                                            )}
                                          </td>
                                          <td
                                            align="left"
                                            className={styles.product_width_10}
                                          >
                                            &nbsp;
                                          </td>
                                        </>
                                      )}
                                      {dataItem.type != null && (
                                        <>
                                          <td
                                            align="left"
                                            className={styles.product_width_250}
                                          >
                                            {setTypeList(dataItem, modifiable)}
                                          </td>
                                          <td
                                            align="left"
                                            className={styles.product_width_10}
                                          >
                                            &nbsp;
                                          </td>
                                        </>
                                      )}
                                      {dataItem.brand != null && (
                                        <>
                                          <td
                                            align="left"
                                            className={styles.product_width_250}
                                          >
                                            {setBrandList(dataItem, modifiable)}
                                          </td>
                                          <td
                                            align="left"
                                            className={styles.product_width_10}
                                          >
                                            &nbsp;
                                          </td>
                                        </>
                                      )}
                                      <td className={styles.alignWrap}>
                                        <>
                                          {dataItem.description != null &&
                                            dataItem.description.text.length >
                                              0 && (
                                              <>
                                                {modifiable ? (
                                                  dataItem.description.text.map(
                                                    (textItem) => {
                                                      return (
                                                        <>
                                                          {(textItem.language ==
                                                            null ||
                                                            textItem.language ==
                                                              "en") && (
                                                            <input
                                                              type={
                                                                Settings
                                                                  .inputType
                                                                  .text
                                                              }
                                                              className={
                                                                styles.width_200
                                                              }
                                                              id={
                                                                "rateProductDefinition[" +
                                                                dataItem.RP_Name +
                                                                "_" +
                                                                dataItem.RP_Code +
                                                                "].text"
                                                              }
                                                              name={
                                                                "rateProductDefinition[" +
                                                                dataItem.RP_Name +
                                                                "_" +
                                                                dataItem.RP_Code +
                                                                "].text"
                                                              }
                                                              value={
                                                                textItem.value
                                                              }
                                                              maxLength={
                                                                textItem.maxLength
                                                              }
                                                              onKeyPress={(e) =>
                                                                checkForKorSafeCharsOnly(
                                                                  e
                                                                )
                                                              }
                                                              onChange={(e) => {
                                                                chgDescriptionData(
                                                                  e
                                                                );
                                                              }}
                                                            />
                                                          )}
                                                        </>
                                                      );
                                                    }
                                                  )
                                                ) : (
                                                  <>
                                                    {dataItem.description.text.map(
                                                      (textItem) => {
                                                        return (
                                                          <>
                                                            {(textItem.language ==
                                                              null ||
                                                              textItem.language ==
                                                                "en") && (
                                                              <label
                                                                className={
                                                                  styles.selectionLabel
                                                                }
                                                              >
                                                                {textItem.value}
                                                              </label>
                                                            )}
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                        </>
                                      </td>
                                    </tr>
                                    {data.text != null && (
                                      <tr className={styles.height_10}>
                                        <td align="left"> </td>
                                      </tr>
                                    )}
                                  </table>
                                </div>
                              )}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
