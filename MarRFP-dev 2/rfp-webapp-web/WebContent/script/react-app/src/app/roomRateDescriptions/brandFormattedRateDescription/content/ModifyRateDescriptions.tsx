import React, { Suspense, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import btnView from "../../../common/assets/img/button/btnView.gif";
import CModal from "../../../common/components/CModal";
import CSuspense from "../../../common/components/CSuspense";
import Settings from "../static/Settings";
import BrandFormattedRateContext from "../context/BrandFormattedRateContext";
import RateProductSearch from "../common/RateProductSearch";
import RateProductSearchResult from "../common/RateProductSearchResult";
import QuickViewDialog from "../common/QuickViewDialog";
import { Layout } from "../routing/Layout";
import API from "../service/API";
import styles from "./ModifyRateDescriptions.css";

let contextType = null;
let brandCode = "";
let brandName = "";
let level;
let productCode;
let productName;
let entryLevel;
let screenid;
let rateProdctMenu;
let brandLevel;

const ModifyRateDescriptions = (): JSX.Element => {
  const storage_productcode = localStorage.getItem("brandProductcode");
  const history = useHistory();
  const urlParms = useLocation().search;
  brandCode = new URLSearchParams(urlParms).get("brandCode");
  brandName = new URLSearchParams(urlParms).get("brandName");
  brandLevel = new URLSearchParams(urlParms).get("level");
  useEffect(() => {
    brandCode && contextType.setBrandCode(brandCode);
    brandName && contextType.setBrandName(brandName);
    contextType.getBrandProductData();
    if (
      history.location?.isModifyDescLinkClicked ||
      (storage_productcode !== null &&
        storage_productcode !== undefined &&
        storage_productcode !== "" &&
        contextType.productCodeChange === false)
    ) {
      contextType.search_Click();
    }
  }, []);

  const searchBodyTemplate = (rowData) => {
    return (
      <div>
        <img
          tabIndex={0}
          src={btnView}
          className={styles.deleteContainer}
          onClick={() => {
            contextType.productQuickSelect(rowData, true);
          }}
          alt={Settings.labels.viewProdDef}
        />
      </div>
    );
  };

  const productDetailTemplate = (rowData) => {
    return (
      <Link
        className={styles.productLink}
        onClick={() => {
          updateProduct(rowData);
        }}
      >
        {rowData.productName}
      </Link>
    );
  };

  const updateProduct = async (rowData) => {
    let queryParamData = null;
    productCode = rowData.productCode;
    productName = rowData.productName;
    brandCode = brandCode ? brandCode : contextType.brandCode;
    brandName = brandName ? brandName : contextType.brandName;
    level = rowData.level;
    entryLevel = "Brand";
    screenid = "0000";
    queryParamData =
      productCode &&
      brandCode &&
      productName &&
      level &&
      entryLevel &&
      screenid &&
      Settings.queryParam.brandCode +
        (brandCode ? brandCode : contextType.brandCode) +
        Settings.queryParam.productCode +
        productCode +
        Settings.queryParam.productName +
        productName +
        Settings.queryParam.level +
        level +
        Settings.queryParam.entryLevel +
        entryLevel +
        Settings.queryParam.screenId +
        screenid;

    const data = await API.productDefinition(queryParamData);
    if (data !== null) {
      const productDetails = {
        productCode: productCode,
        productName: productName?.trim(),
      };
      contextType.setCreateProductData(
        productDetails,
        data.rateProductDataView.rateProductMenu,
        data
      );
      history.push({
        pathname: `${Settings.routingUrl.defineProductParentRoute}/defineProduct`,
        search: `?marshaCode=&hotelName=&brandCode=${brandCode}&brandName=${brandName}&productCode=${
          rowData.productCode
        }&productName=${rowData.productName}&level=${
          rowData.level
        }&entryLevel=${"Brand"}&screenid=0000`,
        rateProductMenu: data.rateProductDataView.rateProductMenu,
        screendata: data,
        nextMenu: data.rateProductDataView.nextMenuOption,
        prevMenu: data.rateProductDataView.previousMenuOption,
        screenId: screenid,
      });
    }
  };

  const columns = [
    {
      field: Settings.gridDetails.columns.search.field,
      header: Settings.gridDetails.columns.search.header,
      body: searchBodyTemplate,
      style: { width: "24px" },
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
    <BrandFormattedRateContext.Consumer>
      {(brandFormattedRateContext) => {
        contextType = brandFormattedRateContext;
        return (
          <Layout
            context={contextType}
            productName={productName}
            rateProdctMenu={rateProdctMenu}
            screenId={screenid}
          >
            <div>
              <CModal
                title={contextType.state.rateProductSearch.productViewTitle}
                onClose={(e) => {
                  contextType.productQuickSelect("", true);
                }}
                show={contextType.showQuickSelectTop}
                xPosition={-300}
                yPosition={-180}
                className="quickViewDialog"
                loadingMessage={Settings.labels.quickViewLoadingMsg}
              >
                <Suspense fallback={<CSuspense />}>
                  <div className={styles.quickViewLoading}>
                    {contextType.quickViewLoadingMsg}
                  </div>
                  <QuickViewDialog
                    rateProductSearch={contextType.state.rateProductSearch}
                    closeDialog={() => {
                      contextType.productQuickSelect("", true);
                    }}
                    quickViewLoadingMsg={contextType.quickViewLoadingMsg}
                    showContents={contextType.showQuickViewDialogContents}
                  />
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
                  <td className={styles.noWrapTop}>
                    <table className={styles.mainTable}>
                      <tr>
                        <td className={styles.instructions}>
                          <RateProductSearch
                            rateProductSearch={
                              contextType.state.rateProductSearch
                            }
                            handleOnChange={(e) =>
                              contextType.handleChangeInput(e)
                            }
                            searchBy_Click={(e, searchBy) =>
                              contextType.searchBy_Click(e, searchBy)
                            }
                            KorSafeCharsOnly={(e) =>
                              contextType.KorSafeCharsOnly(e)
                            }
                            ProductCodeCharsOnly={(e) =>
                              contextType.ProductCodeCharsOnly(e)
                            }
                            validateProductCode={(e) =>
                              contextType.validateProductCode(e)
                            }
                            setSearchQuery={(e, searchBy) => {
                              contextType.setProductCodeChange(true);
                              contextType.setSearchQuery(e, searchBy);
                            }}
                            unSelectAll_Click={contextType.unSelectAll_Click}
                            search_Click={contextType.search_Click}
                            storage_productcode={
                              contextType.productCodeChange
                                ? ""
                                : storage_productcode
                            }
                          />
                        </td>

                        <td className={styles.width_20}></td>
                        <td
                          className={`${styles.width_350} ${styles.alignTop}`}
                        >
                          <RateProductSearchResult
                            rateProductSearch={
                              contextType.state.rateProductSearch
                            }
                            columns={columns}
                            next_onClick={() =>
                              contextType.handlePrevsNextClick(
                                Settings.navPageNext
                              )
                            }
                            previous_onClick={() =>
                              contextType.handlePrevsNextClick(
                                Settings.navPagePrevious
                              )
                            }
                            showTable={contextType.showTable}
                            prevFlag={contextType.prevFlag}
                            nextFlag={contextType.nextFlag}
                            noProductsMessage={Settings.noProductsMessage}
                          />
                          <div className={styles.loadingMessage}>
                            {contextType.loadingSearchMessage}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </Layout>
        );
      }}
    </BrandFormattedRateContext.Consumer>
  );
};

export default ModifyRateDescriptions;
