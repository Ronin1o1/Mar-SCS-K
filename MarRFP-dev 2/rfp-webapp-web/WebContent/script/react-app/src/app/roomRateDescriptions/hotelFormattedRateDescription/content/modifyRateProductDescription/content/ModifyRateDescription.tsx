import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import btnSearch from "../../../../../common/assets/img/button/btnSearch.gif";
import btnView from "../../../../../common/assets/img/button/btnView.gif";
import deselectBtn from "../../../../../common/assets/img/button/btnUnSelectAll.gif";
import styles from "../content/ModifyRateDescription.css";
import API from "../service/API";
import ViewAPI from "../../ViewRateDescription/service/API";
import Settings from "../static/Settings";
import btnPrevious from "../../../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../../common/assets/img/button/btnNext.gif";
import ModifyRateDescriptionContext, {
  ModifyRateDescriptionContextProvider,
} from "../context/ModifyRateDescriptionContext";
import Utils from "../../../../../common/utils/Utils";
import CDataTable from "../../../../../common/components/CDataTable";
import CModal from "../../../../../common/components/CModal";
import RateDescModalContent from "./RateDescriptionModalContent";
import { Layout } from "../../../routing/Layout";
import HotelRateProductSelectContext, {
  HotelRateProductSelectContextProvider,
} from "../../../context/HotelRateProductSelectContext";

let contextType = null;
let parentcontextType = null;
let marshaCode;
let hotelName;
let strBrandCode;
let brandCode;
let level;
let productCode;
let productName;
let entryLevel;
let brandName;
let screenid;

const ModifyRateDescription = (): JSX.Element => {
  const history = useHistory();
  const urlParms = useLocation().search;
  const [selectedOption1, setselectedOption1] = useState(true);
  const [selectedOption, setselectedOption] = useState(false);
  const [rateProductName, setRateProductName] = useState(null);
  const [setmodal, setmodalContent] = useState(false);
  const [loadingSearchMessage, setLoadingSearchMessage] = useState("");
  const [prevFlag, setPrevFlag] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [quickProductName, setquickProductName] = useState("");
  const [productCodeChange, setProductCodeChange] = useState(false);

  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  const storage_productcode = localStorage.getItem("hotelProductcode");

  useEffect(() => {
    let query = null;
    query =
      marshaCode &&
      hotelName &&
      Settings.queryParam.marshaCode +
        marshaCode +
        Settings.queryParam.hotelName +
        hotelName;

    ViewAPI.getRateProductView(query).then((data) => {
      if (data !== null) {
        let querydata = null;
        strBrandCode = data.brandCode;
        querydata =
          marshaCode &&
          strBrandCode &&
          Settings.queryParam.marshaCode +
            marshaCode +
            Settings.queryParam.strBrandCode +
            strBrandCode;
        API.getHotelProductSearchDetails(querydata).then((data) => {
          contextType.setProductAttribute(data.rateProductDefinitionLists);
          parentcontextType.setBrandName(data.brandCode);
          setLoadingSearchMessage("");
          setShowTable(false);
          if (
            storage_productcode !== null &&
            storage_productcode !== undefined &&
            storage_productcode !== "" &&
            productCodeChange === false
          ) {
            invokeSearchAction();
          }
        });
      }
    });
  }, []);

  const invokeSearchAction = () => {
    setLoadingSearchMessage(Settings.searchLoading);

    if (selectedOption1) {
      const finalProductCode =
        storage_productcode !== null &&
        storage_productcode !== undefined &&
        storage_productcode !== "" &&
        productCodeChange === false
          ? storage_productcode
          : contextType.state.rateProductCode
          ? contextType.state.rateProductCode
          : "";
      const param = {
        formChg: "N",
        marshaCode: marshaCode,
        hotelName: hotelName,
        brandCode: strBrandCode,
        brandName: "",
        strRateProductSearch: JSON.stringify({
          productCode: finalProductCode,
          productName: rateProductName ? rateProductName : "",
          searchStartProduct: "",
          searchFirstProduct: "",
          nendProduct: "",
          searchProductCode: "",
          searchProductName: "",
          searchType: 1,
          searchAttr: {},
        }),
      };
      const postData = Utils.createPostData(param);
      API.getSearchResult(postData).then((data) => {
        if (
          finalProductCode !== null &&
          finalProductCode !== "" &&
          productCodeChange === false
        ) {
          localStorage.setItem("hotelProductcode", data.nendProduct);
        } else {
          const loc_item = localStorage.getItem("hotelProductcode");
          if (loc_item !== null && loc_item !== undefined) {
            localStorage.removeItem("hotelProductcode");
          }
          if (
            productCodeChange &&
            contextType.state.rateProductCode &&
            contextType?.state?.rateProductCode !== ""
          ) {
            localStorage.setItem(
              "hotelProductcode",
              contextType?.state?.rateProductCode
            );
          }
        }
        contextType.setSearchedData(data.rateProductDef);
        contextType.setPaginationParams(data);
        contextType.setfirstProduct(data);
        setLoadingSearchMessage("");
        setShowTable(true);
        if (
          data.rateProductDef[0]?.productCode ===
            contextType?.state?.rateProductSearch?.lastProduct ||
          data.rateProductDef?.length < 200
        ) {
          setNextFlag(false);
        } else {
          setNextFlag(true);
        }
        setPrevFlag(false);
      });
    } else {
      const uniqueChars = [];

      document.querySelectorAll("input[type=checkbox]").forEach((element) => {
        if (element.checked === true) {
          uniqueChars.push(element.name);
        }
      });

      const obj = {};

      uniqueChars.forEach((element) => {
        Object.assign(obj, {
          [element]: {
            searchAttribute: element,
          },
        });
        return obj;
      });
      const param = {
        formChg: "N",
        marshaCode: marshaCode,
        hotelName: hotelName,
        brandCode: strBrandCode,
        brandName: "",
        strRateProductSearch: JSON.stringify({
          productCode: "",
          productName: "",
          searchStartProduct: "",
          searchFirstProduct: "",
          nendProduct: "",
          searchProductCode: "",
          searchProductName: "",
          searchType: 2,
          searchAttr: obj,
        }),
      };
      const postData = Utils.createPostData(param);
      API.getSearchResult(postData).then((data) => {
       
        contextType.setSearchedData(data.rateProductDef);
        contextType.setPaginationParams(data);
        contextType.setfirstProduct(data);
        setLoadingSearchMessage("");
        setShowTable(true);

        if (
          data.rateProductDef[0]?.productCode ===
            contextType?.state?.rateProductSearch?.lastProduct ||
          data.rateProductDef?.length < 200
        ) {
          setNextFlag(false);
        } else {
          setNextFlag(true);
        }

        setPrevFlag(false);
      });
    }
  };

  const handlePrevsNextClick = (navPage) => {
    setLoadingSearchMessage(Settings.searchLoading);
    if (selectedOption1) {
      const param = {
        formChg: "N",
        marshaCode: marshaCode,
        hotelName: hotelName,
        brandCode: strBrandCode,
        brandName: "",
        strRateProductSearch: JSON.stringify({
          productCode: "",
          productName: rateProductName ? rateProductName : "",
          searchStartProduct:
            navPage !== `${Settings.navPagePrevious}`
              ? contextType?.state?.lastProduct
              : "",
          searchFirstProduct: contextType.state.firstProduct,
          nendProduct:
            navPage !== `${Settings.navPagePrevious}`
              ? contextType?.state?.lastProduct
              : contextType.state.startProduct,
          searchProductCode: "",
          searchProductName: "",
          searchType: 1,
          searchAttr: {},
        }),
      };
      const postData = Utils.createPostData(param);
      API.getSearchResult(postData).then((data) => {
       
        contextType.setSearchedData(data.rateProductDef);
        contextType.setPaginationParams(data);
        setLoadingSearchMessage("");
        if (
          data?.rateProductDef[0]?.productCode ===
          contextType?.state?.firstProduct
        ) {
          setPrevFlag(false);
        } else {
          setPrevFlag(true);
        }
        if (
          data?.rateProductDef[0]?.productCode ===
            contextType?.state?.lastProduct ||
          data.rateProductDef?.length < 200
        ) {
          setNextFlag(false);
        } else {
          setNextFlag(true);
        }
      });
    } else {
      const uniqueChars = [];

      document.querySelectorAll("input[type=checkbox]").forEach((element) => {
        if (element.checked === true) {
          uniqueChars.push(element.name);
        }
      });

      const obj = {};

      uniqueChars.forEach((element) => {
        Object.assign(obj, {
          [element]: {
            searchAttribute: element,
          },
        });
        return obj;
      });
      const param = {
        formChg: "N",
        marshaCode: marshaCode,
        hotelName: hotelName,
        brandCode: strBrandCode,
        brandName: "",
        strRateProductSearch: JSON.stringify({
          productCode: "",
          productName: "",
          searchStartProduct:
            navPage !== `${Settings.navPagePrevious}`
              ? contextType?.state?.lastProduct
              : "",
          searchFirstProduct: contextType.state.firstProduct,
          nendProduct:
            navPage !== `${Settings.navPagePrevious}`
              ? contextType?.state?.lastProduct
              : contextType.state.startProduct,
          searchProductCode: "",
          searchProductName: "",
          searchType: 2,
          searchAttr: obj,
        }),
      };
      const postData = Utils.createPostData(param);
      API.getSearchResult(postData).then((data) => {
       
        contextType.setSearchedData(data.rateProductDef);
        contextType.setPaginationParams(data);
        setLoadingSearchMessage("");
        if (
          data?.rateProductDef[0]?.productCode ===
          contextType?.state?.firstProduct
        ) {
          setPrevFlag(false);
        } else {
          setPrevFlag(true);
        }
        if (
          data?.rateProductDef[0]?.productCode ===
            contextType?.state?.lastProduct ||
          data.rateProductDef?.length < 200
        ) {
          setNextFlag(false);
        } else {
          setNextFlag(true);
        }
      });
    }
  };
  const handleChange = (e, val) => {
    if (val === "productName") {
      setselectedOption1(true);
      setselectedOption(false);
    } else {
      setselectedOption1(false);
      setselectedOption(true);
    }
  };

  const deSelectAll = () => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
  };
  const viewProductContent = (Vdata) => {
    let querydata = null;
    brandCode = strBrandCode;
    productCode = Vdata.productCode;
    level = Vdata.level;
    querydata =
      marshaCode &&
      productCode &&
      brandCode &&
      level &&
      Settings.queryParam.marshaCode +
        marshaCode +
        Settings.queryParam.productCode +
        productCode +
        Settings.queryParam.brandCode +
        brandCode +
        Settings.queryParam.level +
        level;
    API.getQuickViewProduct(querydata).then((data) => {
      if (data !== null) {
        contextType.setQuickViewProductList(
          data.productView?.rateProductListView
        );
        setmodalContent(true);
        setquickProductName(Vdata.productName);
      }
    });
  };

  const handleClose = () => {
    setmodalContent(false);
  };
  const viewBtnTemplate = (rowData) => {
    return (
      <div>
        <img
          tabIndex={0}
          src={btnView}
          className={styles.btnStyle}
          onClick={() => {
            viewProductContent(rowData);
          }}
        />
      </div>
    );
  };

  const viewProductNameTemplate = (rowData) => {
    return (
      <div>
        <a
          href="javascript:void(0);"
          className={styles.deleteContainer}
          onClick={() => {
            productDetailView(rowData);
          }}
        >
          {rowData.productName}
        </a>
      </div>
    );
  };

  const productDetailView = (rowData) => {
    let queryparamData = null;
    brandCode = strBrandCode;
    productCode = rowData.productCode;
    productName = rowData.productName;
    level = rowData.level;
    entryLevel = "Hotel";
    screenid = "0000";
    queryparamData =
      marshaCode &&
      productCode &&
      brandCode &&
      productCode &&
      productName &&
      level &&
      entryLevel &&
      Settings.queryParam.marshaCode +
        marshaCode +
        Settings.queryParam.hotelName +
        hotelName +
        Settings.queryParam.brandCode +
        brandCode +
        Settings.queryParam.productCode +
        productCode +
        Settings.queryParam.productName +
        productName +
        Settings.queryParam.level +
        level +
        Settings.queryParam.entryLevel +
        entryLevel;

    API.productDefinition(queryparamData).then((data) => {
      if (data !== null) {
        parentcontextType.setProductMenuData(
          data.rateProductDataView.rateProductMenu
        );
        localStorage.setItem(
          "productMenu",
          JSON.stringify(data?.rateProductDataView?.rateProductMenu)
        );
        localStorage.setItem(
          "nextScreenid",
          data?.rateProductDataView?.nextMenuOption
        );
        localStorage.setItem("definitionData", JSON.stringify(data));
        history.push({
          pathname: `${Settings.productDefinition}/defineProduct`,
          search:
            "?marshaCode=" +
            marshaCode +
            "&hotelName=" +
            hotelName +
            "&brandCode=" +
            strBrandCode +
            "&productCode=" +
            productCode +
            "&productName=" +
            productName +
            "&level=" +
            level +
            "&entryLevel=" +
            entryLevel +
            "&screenid=0000",
          productData: data.rateProductDataView.rateProductMenu,
          screendata: data,
          screenid: "0000",
        });
      }
    });
  };
  const handleProductAttr = (e, val: string, id) => {
    e.target.checked = !e.target.checked;
    if (e.target.id == id) {
      e.target.checked = !e.target.checked;
    }

    contextType.setSearchAttr(val, e.target.checked);
  };

  const removeProductCode = (e) => {
    if (rateProductName !== "") {
      contextType.setState({ ...contextType.state, rateProductCode: "" });
    }
  };

  const columns = [
    {
      field: Settings.modifyrateDescription.tableColumns.viewBtn.field,
      header: Settings.modifyrateDescription.tableColumns.viewBtn.header,
      body: viewBtnTemplate,
      style: { width: "20px", border: "1px solid #c8c8c8" },
    },
    {
      field: Settings.modifyrateDescription.tableColumns.ProductCode.field,
      header: Settings.modifyrateDescription.tableColumns.ProductCode.header,
      style: { width: "75px", border: "1px solid #c8c8c8" },
    },

    {
      field: Settings.modifyrateDescription.tableColumns.ProductName.field,
      header: Settings.modifyrateDescription.tableColumns.ProductName.header,
      body: viewProductNameTemplate,
      style: { width: "180px", border: "1px solid #c8c8c8" },
    },
  ];
  return (
    <HotelRateProductSelectContextProvider>
      <HotelRateProductSelectContext.Consumer>
        {(parentproductview) => {
          parentcontextType = parentproductview;
          return (
            <Layout>
              <ModifyRateDescriptionContextProvider>
                <ModifyRateDescriptionContext.Consumer>
                  {(rateproductview) => {
                    {
                      console.log("rateproductview", rateproductview);
                    }
                    contextType = rateproductview;
                    return (
                      <div>
                        <CModal
                          title={quickProductName}
                          onClose={handleClose}
                          show={setmodal}
                          xPosition={-325}
                          yPosition={-185}
                          closeImgTitle={"OK - Close Message Box"}
                          className={styles.customModal}
                          componentName="ModifyRateDescription"
                        >
                          <div className={styles.BTprofileAlert}>
                            <RateDescModalContent
                              data={contextType.state?.quickViewProductDef}
                            />
                          </div>
                        </CModal>
                        <div className={styles.horizontalLine}></div>

                        <div className={styles.modifyStaticContent}>
                          {Settings.label.modifyStaticContent}
                        </div>
                        <div>{Settings.label.modifyStaticContentList}</div>
                        <div>{Settings.label.viewStaticContentInfo}</div>
                        <div>
                          <div className={styles.leftContainer}>
                            <div className={styles.rateProgramSearch}>
                              {Settings.label.searchBy}
                              <span className={styles.selectContainer}>
                                <input
                                  type="radio"
                                  className={styles.productRadioBtn}
                                  value=""
                                  checked={selectedOption1}
                                  onChange={(event) => {
                                    handleChange(event, "productName");
                                  }}
                                />
                                {Settings.label.productNameOptn}
                              </span>
                              <span>
                                <input
                                  type="radio"
                                  className={styles.productRadioBtn}
                                  value=""
                                  checked={selectedOption}
                                  onChange={(event) => {
                                    handleChange(event, "productAttr");
                                  }}
                                />
                                {Settings.label.productAtrributeOptn}
                              </span>
                            </div>
                            <div
                              className={
                                selectedOption1 ? "" : styles.hiddenLabel
                              }
                            >
                              {console.log(
                                "context",
                                contextType.state.rateProductCode
                              )}
                              <div className={styles.productNametext}>
                                {Settings.label.productNametext}
                              </div>
                              <div className={styles.flexContainer}>
                                <div className={styles.rateProductLabels}>
                                  {Settings.label.rateProductCodeLabel}
                                </div>
                                <input
                                  className={styles.rateProductInput}
                                  type="text"
                                  style={{ height: "13.34px" }}
                                  maxLength={6}
                                  value={
                                    storage_productcode !== null &&
                                    storage_productcode !== undefined &&
                                    storage_productcode !== "" &&
                                    productCodeChange === false
                                      ? storage_productcode
                                      : contextType.state.rateProductCode
                                  }
                                  onKeyPress={(e) =>
                                    contextType.ProductCodeCharsOnly(e)
                                  }
                                  onChange={(e) => {
                                    setProductCodeChange(true);
                                    contextType.handleProductCode(e);
                                  }}
                                  onBlur={(e) => {
                                    contextType.validateProductCode(e),
                                      setRateProductName("");
                                  }}
                                />
                              </div>
                              <div
                                className={styles.flexContainer}
                                style={{ marginTop: "-1.5px" }}
                              >
                                <div className={styles.rateProductLabels}>
                                  {Settings.label.rateProductNameLabel}
                                </div>
                                <input
                                  className={styles.rateProductInputName}
                                  type="text"
                                  style={{ height: "13.34px" }}
                                  maxLength={40}
                                  value={rateProductName}
                                  onKeyPress={(e) =>
                                    contextType.KorSafeCharsOnly(e)
                                  }
                                  onChange={(e) => {
                                    setRateProductName(e.target.value);
                                  }}
                                  onBlur={(e) => removeProductCode(e)}
                                />
                              </div>
                              <div style={{ marginLeft: "20em" }}>
                                <img
                                  src={btnSearch}
                                  className={styles.btnStyleSearch}
                                  onClick={() => {
                                    invokeSearchAction();
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className={
                                selectedOption
                                  ? styles.productAttrMainContainer
                                  : styles.hiddenLabel
                              }
                            >
                              {Settings.label.productAtrributeText}

                              <div className={styles.productAttrContainer}>
                                {contextType.state?.rateProductdefinitionLists?.rateProductDefinitionList?.map(
                                  (list, i) => {
                                    return (
                                      <table
                                        className={styles.productAttrTable}
                                        key={i}
                                      >
                                        <tr>
                                          <td>{list.RP_ListName}</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            {list?.rateProductDefinitionGroup?.map(
                                              (grplist, j) => {
                                                return (
                                                  <table
                                                    className={
                                                      styles.productAttrTable
                                                    }
                                                    style={{
                                                      marginLeft: "10px",
                                                    }}
                                                    key={j}
                                                  >
                                                    <tr>
                                                      <td width="100px">
                                                        {grplist?.RP_GroupName}
                                                      </td>
                                                    </tr>

                                                    <tr>
                                                      <td width="10px">
                                                        {grplist?.rateProductDefinition?.map(
                                                          (grpdeflist, k) => {
                                                            return (
                                                              <table
                                                                className={
                                                                  styles.productAttrTable
                                                                }
                                                                key={k}
                                                              >
                                                                <tr>
                                                                  <td width="10px">
                                                                    &nbsp;
                                                                  </td>
                                                                  <td>
                                                                    <input
                                                                      style={{
                                                                        marginRight:
                                                                          "-3px",
                                                                      }}
                                                                      type="CheckBox"
                                                                      id={
                                                                        grpdeflist?.RP_Code
                                                                      }
                                                                      name={
                                                                        list.RP_ListCode +
                                                                        "_" +
                                                                        grplist.RP_GroupCode +
                                                                        "_" +
                                                                        grpdeflist.RP_Name +
                                                                        "_" +
                                                                        grpdeflist.RP_Code
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) => {
                                                                        handleProductAttr(
                                                                          e,
                                                                          list.RP_ListCode +
                                                                            "_" +
                                                                            grplist.RP_GroupCode +
                                                                            "_" +
                                                                            grpdeflist.RP_Name +
                                                                            "_" +
                                                                            grpdeflist.RP_Code,
                                                                          grpdeflist?.RP_Code
                                                                        );
                                                                      }}
                                                                    />{" "}
                                                                    {
                                                                      grpdeflist?.RP_CodeName
                                                                    }
                                                                  </td>
                                                                </tr>
                                                              </table>
                                                            );
                                                          }
                                                        )}
                                                      </td>
                                                    </tr>
                                                  </table>
                                                );
                                              }
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="10px">&nbsp;</td>
                                        </tr>
                                      </table>
                                    );
                                  }
                                )}
                              </div>
                              <img
                                src={deselectBtn}
                                className={styles.deSelectbtnStyle}
                                onClick={() => {
                                  deSelectAll();
                                }}
                              />
                              <img
                                style={{ marginTop: "20px" }}
                                src={btnSearch}
                                className={styles.btnStyle}
                                onClick={() => {
                                  invokeSearchAction();
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className={styles.rightContainer}
                            style={{ marginTop: "10px" }}
                          >
                            <div className={styles.rateProductLabels}>
                              {Settings.label.ProductTable}
                            </div>
                            {loadingSearchMessage && (
                              <div className={styles.loadingMessage}>
                                <div className={styles.loadingMsg}>
                                  {loadingSearchMessage}
                                </div>
                              </div>
                            )}

                            <div
                              className={
                                showTable && !loadingSearchMessage
                                  ? styles.tableView
                                  : styles.hiddenLabel
                              }
                            >
                              <CDataTable
                                id="modifyRateGridTableView"
                                columns={columns}
                                value={contextType.state?.productList}
                                scrollHeight="calc(100vh - 320px)"
                                emptyMessage={Settings.DataTableMessage}
                              />
                            </div>
                            <div
                              className={
                                nextFlag || prevFlag
                                  ? styles.buttonPanel
                                  : styles.hiddenLabel
                              }
                            >
                              <img
                                className={
                                  prevFlag ? styles.prevBtn : styles.hiddenLabel
                                }
                                onClick={() => {
                                  handlePrevsNextClick(
                                    Settings.navPagePrevious
                                  );
                                }}
                                src={btnPrevious}
                              ></img>

                              <img
                                className={
                                  nextFlag ? styles.nextBtn : styles.hiddenLabel
                                }
                                onClick={() => {
                                  handlePrevsNextClick(Settings.navPageNext);
                                }}
                                src={btnNext}
                              ></img>
                            </div>
                            <style>{`
                            .p-datatable .p-datatable-tbody > tr {
                              height: 14px !important;
                            }
                            .p-datatable-tbody tr td{
                              height: 14px !important;
                              padding: 0 !important;
                            } 
                            .p-datatable-scrollable-body{
                              overflow-x: hidden !important;
                              overflow-y: auto !important;
                            } 
                            .p-datatable-thead th{
                              line-height:31px;
                            } 
                            .p-datatable .p-datatable-thead > tr > th:first-child{
                              border-left: 0 !important;
                            }
                            .p-datatable .p-datatable-thead > tr > th:last-child{
                              border-right: 0 !important;
                            }                 
                           
                  `}</style>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </ModifyRateDescriptionContext.Consumer>
              </ModifyRateDescriptionContextProvider>
            </Layout>
          );
        }}
      </HotelRateProductSelectContext.Consumer>
    </HotelRateProductSelectContextProvider>
  );
};

export default ModifyRateDescription;
