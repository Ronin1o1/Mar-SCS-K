/* eslint-disable react/jsx-key */
import React, { Suspense, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CPageTitle from "../../../common/components/CPageTitle";
import btnNewProduct from "../../../../app/common/assets/img/button/btnNewProduct.gif";
import btnUnSelectAll from "../../../../app/common/assets/img/button/btnUnSelectAll.gif";
import btnSearch from "../../../../app/common/assets/img/button/btnSearch.gif";
import btnPrevious from "../../../../app/common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../app/common/assets/img/button/btnNext.gif";
import btnView from "../../../../app/common/assets/img/button/btnView.gif";
import btnClose from "../../../../app/common/assets/img/button/btnClose.gif";
import MasterFormattedTabs from "./masterFormattedTabs";
import Settings from "../settings/settings";
import styles from "./modifyRateDescriptions.css";
import CRadio from "../../../common/components/CRadio";
import MasterModifyRateDescriptionContext, {
  MasterModifyRateDescriptionContextProvider,
} from "../context/MasterModifyRateDescriptionContext";
import Utils from "../common/Util";
import { ListViewProduct } from "../common/listViewProduct";
import CDataTable from "../../../common/components/CDataTable";
import { Link } from "react-router-dom";
import CModal from "../../../common/components/CModal";
import CSuspense from "../../../common/components/CSuspense";
import { CLoader } from "../../../common/components/CLoader";

let contextType = null;
const search =
  `${Settings.queryParam.screenId}` + `${Settings.pageNo.createProdscreenId}`;

const modifyRateDescriptions = () => {
  const storage_productcode = localStorage.getItem("masterProductcode");
  const history = useHistory();
  const handleNext = () => {
    history.push({
      pathname: `${Settings.routingUrl.createProduct}`,
      search: search,
    });
  };

  useEffect(() => {
    contextType.getMasterProductData();
    if (
      storage_productcode !== null &&
      storage_productcode !== undefined &&
      storage_productcode !== "" &&
      contextType.productCodeChange === false
    ) {
      contextType.search_Click();
    }
  }, []);

  const productCodeNameValidation = (event, type) => {
    let validProdCode;
    const updatedList = contextType.state;
    if (type == "productCode") {
      validProdCode = Utils.productCodeValidation(event);
      if (validProdCode) {
        if (event.target.value.length == 6) {
          if (Utils.isValidProductCode(event.target.value)) {
            updatedList.rateProductSearch.productCode = event.target.value;
            contextType.setValidProductCode(true);
            contextType.setValidProductName(false);
          } else {
            contextType.setValidProductCode(false);
            contextType.setValidProductName(false);
          }
        } else {
          updatedList.rateProductSearch.productCode = event.target.value;
          contextType.setValidProductCode(true);
          contextType.setValidProductName(false);
        }
      } else {
        if (
          (event.charCode > 47 && event.charCode < 58) ||
          event.charCode == 80 ||
          event.charCode == 112
        ) {
          if (Utils.isValidProductCode(event.target.value)) {
            updatedList.rateProductSearch.productCode =
              event.target.value.substring(
                0,
                event.target.value.length > 2
                  ? event.target.value.length - 1
                  : event.target.value.length
              );
          } else {
            alert(Settings.alert.validProductCode);
          }
        }
        contextType.setValidProductCode(false);
        contextType.setValidProductName(false);
      }
    } else if (type == "productName") {
      validProdCode = Utils.korSafeCharsOnly(event);
      if (validProdCode) {
        updatedList.rateProductSearch.productName = event.target.value;
        contextType.setValidProductCode(false);
        contextType.setValidProductName(true);
      } else {
        contextType.setValidProductCode(false);
        contextType.setValidProductName(false);
      }
    }

    contextType.setProductData(updatedList);
  };

  const productCodeNameAlert = (event, type) => {
    let validProdCode;
    const updatedListAlert = contextType.state;
    if (type == "productCode") {
      validProdCode = Utils.productCodeValidation(event);
      if (validProdCode) {
        if (event.target.value.length == 6) {
          if (Utils.isValidProductCode(event.target.value)) {
          } else {
            updatedListAlert.rateProductSearch.productCode =
              event.target.value.substring(0, event.target.value.length - 1);
            alert(Settings.alert.validProductCode);
          }
          updatedListAlert.rateProductSearch.productName = "";
        } else {
          updatedListAlert.rateProductSearch.productName = "";
          if (updatedListAlert.rateProductSearch.productCode) {
            alert(Settings.alert.validProductCode);
          }
        }
      }
    } else if (type == "productName") {
      validProdCode = Utils.korSafeCharsOnly(event);
      if (validProdCode) {
        updatedListAlert.rateProductSearch.productCode = "";
      }
    }

    contextType.setProductData(updatedListAlert);
  };

  function searchBodyTemplate(rowData) {
    return (
      <div>
        <a>
          <img
            tabIndex={0}
            src={btnView}
            className={styles.deleteContainer}
            onClick={() => {
              contextType.productQuickSelect(true, rowData);
            }}
            alt={Settings.labels.viewProdDef}
          />
        </a>
      </div>
    );
  }

  function productDetailTemplate(rowData) {
    return (
      <Link
        to={{
          pathname: `${Settings.routingUrl.createProduct}`,
          state: rowData,
          search: search,
        }}
        className={styles.productLink}
        onClick={() => {
          contextType.updateProduct(rowData);
        }}
      >
        {rowData.productName}
      </Link>
    );
  }

  const columns = [
    {
      field: Settings.gridDetails.columns.search.field,
      header: Settings.gridDetails.columns.search.header,
      body: searchBodyTemplate,
      style: { width: "20px" },
    },
    {
      field: Settings.gridDetails.columns.productCode.field,
      header: Settings.gridDetails.columns.productCode.header,
      style: { width: "80px" },
    },
    {
      field: Settings.gridDetails.columns.productName.field,
      header: Settings.gridDetails.columns.productName.header,
      body: productDetailTemplate,
      style: { width: "200px" },
    },
  ];

  return (
    <MasterModifyRateDescriptionContextProvider>
      <MasterModifyRateDescriptionContext.Consumer>
        {(masterModifyProductRateContext) => {
          contextType = masterModifyProductRateContext;
          return contextType.isMakingRequest ? (
            <CLoader></CLoader>
          ) : (
            <React.Fragment>
              <div>
                <MasterFormattedTabs />
                <CPageTitle
                  title={Settings.labels.pageTitle}
                  titleSpace={{ padding: "4px 0px 25px 0px" }}
                ></CPageTitle>
                <div>
                  <CModal
                    title={contextType.state.rateProductSearch.productViewTitle}
                    onClose={(e) => {
                      contextType.productQuickSelect(true, "");
                    }}
                    show={contextType.showQuickSelectTop}
                    xPosition={-450}
                    yPosition={-200}
                    loadingMessage={Settings.labels.quickViewLoadingMsg}
                  >
                    <Suspense fallback={<CSuspense />}>
                      <table className={styles.mainTable}>
                        {contextType.isShowModalContent == true &&
                        contextType.state.rateProductSearch
                          .rateProductListView != null ? (
                          <>
                            <tr>
                              <td>
                                <div className={styles.quickView}>
                                  <table
                                    className={` ${styles.mainTable} ${styles.tableMargin} `}
                                  >
                                    {contextType.state.rateProductSearch.rateProductListView.map(
                                      (data) => {
                                        return (
                                          <>
                                            <tr>
                                              <td>{data.rp_ListName}</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <table
                                                  className={styles.mainTable}
                                                >
                                                  {data.rateProductGroupView
                                                    .length > 0 &&
                                                    data.rateProductGroupView.map(
                                                      (item) => {
                                                        return (
                                                          <>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.width_5
                                                                }
                                                              ></td>
                                                              <td>
                                                                {item?.rp_GroupName.trim()}
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                className={
                                                                  styles.width_5
                                                                }
                                                              ></td>
                                                              <td>
                                                                <table
                                                                  className={
                                                                    styles.mainTable
                                                                  }
                                                                >
                                                                  {item.rateProductView.map(
                                                                    (
                                                                      itemval
                                                                    ) => {
                                                                      return (
                                                                        <>
                                                                          <tr>
                                                                            <td
                                                                              className={
                                                                                styles.width_10
                                                                              }
                                                                            ></td>
                                                                            <td
                                                                              className={
                                                                                styles.width_30
                                                                              }
                                                                              align="left"
                                                                            >
                                                                              {itemval.availabilityInd ==
                                                                                "Y" &&
                                                                                "Yes"}
                                                                              {itemval.availabilityInd ==
                                                                                "N" &&
                                                                                "No"}
                                                                            </td>
                                                                            <td
                                                                              className={
                                                                                styles.width_30
                                                                              }
                                                                              align="left"
                                                                            ></td>
                                                                            <td
                                                                              className={
                                                                                styles.noWrap
                                                                              }
                                                                            >
                                                                              {itemval.rp_CodeName.trim()}
                                                                            </td>
                                                                            {itemval.bshowQuantity &&
                                                                            itemval.uom_Type !=
                                                                              null &&
                                                                            itemval.quantity !=
                                                                              null ? (
                                                                              <td
                                                                                align="left"
                                                                                className={
                                                                                  styles.noWrap
                                                                                }
                                                                              >
                                                                                {
                                                                                  itemval.quantity
                                                                                }
                                                                              </td>
                                                                            ) : (
                                                                              <>
                                                                                &nbsp;
                                                                              </>
                                                                            )}
                                                                            <td
                                                                              className={`${styles.width_10} ${styles.noWrap}`}
                                                                              align="left"
                                                                            ></td>
                                                                            <td
                                                                              className={
                                                                                styles.noWrap
                                                                              }
                                                                              align="left"
                                                                            >
                                                                              {itemval.uom_Type !=
                                                                                null &&
                                                                              itemval.uom_Name !=
                                                                                null ? (
                                                                                <>
                                                                                  <span
                                                                                    className={
                                                                                      styles.boldText
                                                                                    }
                                                                                  >
                                                                                    {itemval?.uom_Type.trim()}

                                                                                    :
                                                                                    <>
                                                                                      &nbsp;
                                                                                    </>
                                                                                  </span>
                                                                                  <span>
                                                                                    {itemval?.uom_Name.trim()}
                                                                                  </span>
                                                                                </>
                                                                              ) : (
                                                                                <>
                                                                                  &nbsp;
                                                                                </>
                                                                              )}
                                                                            </td>
                                                                            <td
                                                                              className={`${styles.width_10} ${styles.noWrap}`}
                                                                              align="left"
                                                                            ></td>
                                                                            <td
                                                                              className={
                                                                                styles.noWrap
                                                                              }
                                                                              align="left"
                                                                            >
                                                                              {itemval.typeListName !=
                                                                                null &&
                                                                              itemval.typeName !=
                                                                                null ? (
                                                                                <>
                                                                                  <span
                                                                                    className={
                                                                                      styles.boldText
                                                                                    }
                                                                                  >
                                                                                    {itemval?.typeListName.trim()}

                                                                                    :
                                                                                    <>
                                                                                      &nbsp;
                                                                                    </>
                                                                                  </span>
                                                                                  <span>
                                                                                    {itemval?.typeName.trim()}
                                                                                  </span>
                                                                                </>
                                                                              ) : (
                                                                                <>
                                                                                  &nbsp;
                                                                                </>
                                                                              )}
                                                                            </td>
                                                                            <td
                                                                              className={`${styles.width_10} ${styles.noWrap}`}
                                                                              align="left"
                                                                            ></td>
                                                                            <td
                                                                              className={
                                                                                styles.noWrap
                                                                              }
                                                                              align="left"
                                                                            >
                                                                              {itemval.brandType !=
                                                                                null &&
                                                                              itemval.brandName !=
                                                                                null ? (
                                                                                <>
                                                                                  <span
                                                                                    className={
                                                                                      styles.boldText
                                                                                    }
                                                                                  >
                                                                                    {itemval?.brandType.trim()}

                                                                                    :
                                                                                    <>
                                                                                      &nbsp;
                                                                                    </>
                                                                                  </span>
                                                                                  <span>
                                                                                    {itemval?.brandName.trim()}
                                                                                  </span>
                                                                                </>
                                                                              ) : (
                                                                                <>
                                                                                  &nbsp;
                                                                                </>
                                                                              )}
                                                                            </td>
                                                                            <td
                                                                              className={`${styles.width_10} ${styles.noWrap}`}
                                                                              align="left"
                                                                            ></td>
                                                                            <td
                                                                              className={
                                                                                styles.noWrap
                                                                              }
                                                                              align="left"
                                                                            >
                                                                              {itemval.text !=
                                                                                null &&
                                                                                itemval?.text}
                                                                            </td>
                                                                          </tr>
                                                                        </>
                                                                      );
                                                                    }
                                                                  )}
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                </table>
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    )}
                                  </table>
                                </div>
                              </td>
                            </tr>
                            <img
                              className={styles.centerAlign}
                              src={btnClose}
                              onClick={(e) => {
                                contextType.productQuickSelect(true, "");
                              }}
                            />
                          </>
                        ) : (
                          <tr>
                            <td>
                              <div className={styles.waitLoadingCls}>
                                {contextType.isQuickViewLoadMsg == false
                                  ? Settings.labels.noProdDef
                                  : Settings.labels.quickViewLoadingMsg}
                              </div>
                            </td>
                          </tr>
                        )}
                      </table>
                    </Suspense>
                  </CModal>
                  <table className={styles.mainTable}>
                    <tr>
                      <td className={styles.instructions} colSpan={3}>
                        {Settings.labels.rateProgramContent}
                        <br></br>
                        {Settings.labels.viewProductDefinition}
                        <br></br>
                        {Settings.labels.clickToModifyContent}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.height_10}>
                        <>&nbsp;</>
                      </td>
                    </tr>
                    <tr className={styles.height_100}>
                      <td className={`${styles.width_350} ${styles.noWrapTop}`}>
                        <table className={styles.mainTable}>
                          <tr>
                            {contextType.state?.entryLevel ==
                              Settings.labels.entryLevel && (
                              <td className={styles.noWrapTop}>
                                <button
                                  className={styles.buttonModify}
                                  onClick={() => handleNext()}
                                >
                                  <img
                                    src={btnNewProduct}
                                    alt={Settings.labels.createProductAlt}
                                  />
                                </button>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td className={styles.instructions}>
                              {Settings.labels.searchByTitle}
                              <CRadio
                                type={Settings.inputType.radio}
                                id={Settings.labels.radioSearchType}
                                name={Settings.labels.radioSearchType}
                                onChangeHandler={(e) =>
                                  contextType.chgSearch_onclick(
                                    e,
                                    "ProductCode"
                                  )
                                }
                                checked={
                                  contextType.state.rateProductSearch
                                    .searchType == 1
                                    ? true
                                    : false
                                }
                              ></CRadio>
                              {Settings.labels.productCodeName}
                              <CRadio
                                type={Settings.inputType.radio}
                                id={Settings.labels.radioSearchType}
                                name={Settings.labels.radioSearchType}
                                onChangeHandler={(e) =>
                                  contextType.chgSearch_onclick(
                                    e,
                                    "ProductAttr"
                                  )
                                }
                                checked={
                                  contextType.state.rateProductSearch
                                    .searchType == 2
                                    ? true
                                    : false
                                }
                              ></CRadio>
                              {Settings.labels.productAttribute}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div id="searchByCode">
                                <table>
                                  <tr>
                                    {contextType.state.rateProductSearch
                                      .searchType == "1" && (
                                      <td className={styles.instructions}>
                                        {Settings.labels.enterProductCode}
                                      </td>
                                    )}
                                  </tr>
                                  <tr>
                                    {contextType.state.rateProductSearch
                                      .searchType == "1" && (
                                      <td>
                                        <table className={styles.mainTable}>
                                          <tr>
                                            <td className={styles.field_Name}>
                                              {Settings.labels.productCodeTitle}
                                            </td>
                                            <td>
                                              <input
                                                id={
                                                  Settings.modifyRateDescription
                                                    .productCode.id
                                                }
                                                type="text"
                                                name={
                                                  Settings.modifyRateDescription
                                                    .productCode.name
                                                }
                                                onKeyPress={(e) => {
                                                  productCodeNameValidation(
                                                    e,
                                                    "productCode"
                                                  );
                                                }}
                                                onPaste={(e) => {
                                                  productCodeNameValidation(
                                                    e,
                                                    "productCode"
                                                  );
                                                }}
                                                onBlur={(e) => {
                                                  productCodeNameAlert(
                                                    e,
                                                    "productCode"
                                                  );
                                                }}
                                                onChange={(e) => {
                                                  contextType.setSearchQuery(
                                                    e,
                                                    "productCode"
                                                  );
                                                  contextType.setProductCodeChange(
                                                    true
                                                  );
                                                }}
                                                value={
                                                  storage_productcode !==
                                                    null &&
                                                  storage_productcode !==
                                                    undefined &&
                                                  storage_productcode !== "" &&
                                                  contextType.productCodeChange ===
                                                    false
                                                    ? storage_productcode
                                                    : contextType.state
                                                        .rateProductSearch
                                                        .productCode
                                                }
                                                maxLength={6}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className={styles.field_Name}>
                                              {Settings.labels.productName}
                                            </td>
                                            <td>
                                              <input
                                                id={
                                                  Settings.modifyRateDescription
                                                    .productName.id
                                                }
                                                type="text"
                                                name={
                                                  Settings.modifyRateDescription
                                                    .productName.name
                                                }
                                                onKeyPress={(e) => {
                                                  productCodeNameValidation(
                                                    e,
                                                    "productName"
                                                  );
                                                }}
                                                onPaste={(e) => {
                                                  productCodeNameValidation(
                                                    e,
                                                    "productName"
                                                  );
                                                }}
                                                onBlur={(e) => {
                                                  productCodeNameAlert(
                                                    e,
                                                    "productName"
                                                  );
                                                }}
                                                onChange={(e) => {
                                                  contextType.setSearchQuery(
                                                    e,
                                                    "productName"
                                                  );
                                                }}
                                                value={
                                                  contextType.state
                                                    .rateProductSearch
                                                    .productName
                                                }
                                                maxLength={40}
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    )}
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div id="searchByAttr">
                                <table className={styles.mainTable}>
                                  <tr>
                                    {contextType.state.rateProductSearch
                                      .searchType == "2" && (
                                      <td className={styles.instructions}>
                                        {
                                          Settings.labels
                                            .productAttibutesSubHeader
                                        }
                                      </td>
                                    )}
                                  </tr>
                                  <tr>
                                    {contextType.state.rateProductSearch
                                      .searchType == "2" && (
                                      <td>
                                        <div
                                          className={styles.productAttrTable}
                                        >
                                          <table
                                            className={
                                              styles.menuWdth100_Height
                                            }
                                          >
                                            {contextType.state.rateProductSearch.rateProductDefinitionList.map(
                                              (data) => {
                                                return (
                                                  <ListViewProduct
                                                    data={data}
                                                    handleChange={
                                                      contextType.handleChangeInput
                                                    }
                                                  />
                                                );
                                              }
                                            )}
                                          </table>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                  <tr>
                                    {contextType.state.rateProductSearch
                                      .searchType == "2" && (
                                      <td>
                                        <table
                                          className={styles.menuWdth100_Height}
                                        >
                                          <tr>
                                            <td align="left">
                                              <img
                                                src={btnUnSelectAll}
                                                alt={
                                                  Settings.labels.unselectAll
                                                }
                                                onClick={() =>
                                                  contextType.unselectall_Click()
                                                }
                                              />
                                            </td>
                                            <td align="right"></td>
                                          </tr>
                                        </table>
                                      </td>
                                    )}
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <tr>
                              <td>
                                <table className={styles.menuWdth100_Height}>
                                  <tr>
                                    <td
                                      align="left"
                                      className={styles.width_230}
                                    ></td>
                                    <td align="right">
                                      <button
                                        className={styles.buttonModify}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          contextType.search_Click(true);
                                        }}
                                      >
                                        <img
                                          tabIndex={0}
                                          src={btnSearch}
                                          alt={Settings.labels.searchAlt}
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  id={Settings.modifyRateDescription.formChg.id}
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription.formChg.name
                                  }
                                  value={
                                    Settings.modifyRateDescription.formChg.value
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription.marshaCode.id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription.marshaCode
                                      .name
                                  }
                                  value={
                                    Settings.modifyRateDescription.marshaCode
                                      .value
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription.hotelName.id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription.hotelName
                                      .name
                                  }
                                  value={
                                    Settings.modifyRateDescription.hotelName
                                      .value
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription.brandCode.id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription.brandCode
                                      .name
                                  }
                                  value={
                                    Settings.modifyRateDescription.brandCode
                                      .value
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription.brandName.id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription.brandName
                                      .name
                                  }
                                  value={
                                    Settings.modifyRateDescription.brandName
                                      .value
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription
                                      .searchStartProduct.id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription
                                      .searchStartProduct.name
                                  }
                                  value={
                                    contextType.state.rateProductSearch
                                      .searchStartProduct
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription
                                      .searchFirstProduct.id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription
                                      .searchFirstProduct.name
                                  }
                                  value={
                                    contextType.state.rateProductSearch
                                      .searchFirstProduct
                                  }
                                />
                                <input
                                  id={
                                    Settings.modifyRateDescription.nendProduct
                                      .id
                                  }
                                  type={Settings.inputType.hidden}
                                  name={
                                    Settings.modifyRateDescription.nendProduct
                                      .name
                                  }
                                  value={
                                    contextType.state.rateProductSearch
                                      .nendProduct
                                  }
                                />
                              </td>
                            </tr>
                          </tr>
                        </table>
                      </td>
                      <td className={styles.width_20}></td>
                      <td className={`${styles.width_350} ${styles.alignTop}`}>
                        <table className={styles.mainTableFullHeight}>
                          <tr>
                            <td
                              className={`${styles.field_Name} ${styles.alignTop} ${styles.boldText}`}
                            >
                              {Settings.labels.productsTitle}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className={`${styles.alignTop} ${styles.height_100} ${styles.gridRowInlBlock}`}
                            >
                              {contextType.isSearching == false &&
                              contextType.state.rateProductSearch.productList
                                ?.length > 0 ? (
                                <CDataTable
                                  id="products"
                                  columns={columns}
                                  value={
                                    contextType.state.rateProductSearch
                                      .productList
                                  }
                                  scrollHeight="calc(100vh - 330px)"
                                />
                              ) : contextType.state.rateProductSearch
                                  ?.productList == null ? (
                                <>
                                  <div className={styles.topDataNotFoundDiv}>
                                    <div
                                      className={styles.innerDataNotFoundDiv}
                                      data-scrollselectors=".p-datatable-scrollable-body, .p-datatable-unfrozen-view .p-datatable-scrollable-body"
                                    >
                                      <div>
                                        <table
                                          role="grid"
                                          className={styles.dataNotfoundTable}
                                        >
                                          <thead>
                                            <tr role="row">
                                              <th
                                                role="columnheader"
                                                className={`${styles.gridBorder} ${styles.width_20}`}
                                              >
                                                <span>
                                                  <div></div>
                                                </span>
                                              </th>
                                              <th
                                                role="columnheader"
                                                className={`${styles.gridBorder} ${styles.width_80}`}
                                              >
                                                <span>
                                                  <div>
                                                    {
                                                      Settings.gridDetails
                                                        .columns.productCode
                                                        .header
                                                    }
                                                  </div>
                                                </span>
                                              </th>
                                              <th
                                                role="columnheader"
                                                className={`${styles.gridBorder} ${styles.width_200}`}
                                              >
                                                <span>
                                                  <div>
                                                    {
                                                      Settings.gridDetails
                                                        .columns.productName
                                                        .header
                                                    }
                                                  </div>
                                                </span>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr role="row">
                                              <td role="cell" colSpan={3}>
                                                {
                                                  Settings.labels
                                                    .noProductMessage
                                                }
                                              </td>
                                            </tr>
                                            <tr
                                              role="row"
                                              colSpan={3}
                                              className={styles.height_270}
                                            >
                                              <td>{""}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {contextType.isSearching && (
                                    <div className={styles.searchingCls}>
                                      {Settings.labels.searchingTitle}
                                    </div>
                                  )}
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td align="center">
                              <table
                                className={`${styles.mainTable} ${styles.alignBottom}`}
                              >
                                <tr>
                                  <td>
                                    {contextType.state.rateProductSearch
                                      .prevBtn && (
                                      <div id="previousBtn">
                                        <img
                                          src={btnPrevious}
                                          alt={Settings.labels.previousDef}
                                          onClick={() =>
                                            contextType.previous_onClick()
                                          }
                                        />
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <>&nbsp;&nbsp;</>
                                  </td>
                                  <td>
                                    {contextType.state.rateProductSearch
                                      .nextBtn &&
                                      contextType.state.rateProductSearch
                                        ?.productList != null && (
                                        <div id="nextBtn">
                                          <img
                                            tabIndex={0}
                                            src={btnNext}
                                            alt={Settings.labels.nextDef}
                                            onClick={() =>
                                              contextType.next_onClick()
                                            }
                                          />
                                        </div>
                                      )}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <style>{`
                .p-datatable-thead th{
                  line-height:31px;
                }
                .p-datatable-scrollable-body{
                  overflow:hidden auto !important;
                  margin-bottom:30px;
                }
              `}</style>
            </React.Fragment>
          );
        }}
      </MasterModifyRateDescriptionContext.Consumer>
    </MasterModifyRateDescriptionContextProvider>
  );
};

export default modifyRateDescriptions;
