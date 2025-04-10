import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import Settings from "../settings/settings";
import MasterModifyRateDescriptionContext, {
  MasterModifyRateDescriptionContextProvider,
} from "../context/MasterModifyRateDescriptionContext";
import API from "../service/api";
import MasterFormattedTabs from "./masterFormattedTabs";
import CommonHeaders from "../common/commonHeaders";
import { ProductDescription } from "../common/productDescription";
import Utils from "../../../common/utils/Utils";
import { CLoader } from "../../../common/components/CLoader";

let contextType = null;
let menuData, postData, queryParam, productCode, productName;

const masterFormattedRateProductDescription = (props) => {
  const screenId = props.location?.state?.headerName;
  let nextScreenId = "";
  let prevScreenId = "";
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  useEffect(() => {
    productCode = contextType.createProductState.productCode
      ? contextType.createProductState.productCode
      : props.location.state.productCode;

    productName = contextType.createProductState.productName
      ? contextType.createProductState.productName
      : props.location.state.productName.trim();

    queryParam = {
      productCode: productCode,
      level: props.location.state.entryLevel
        ? props.location?.state?.entryLevel
        : Settings.defaultLevel,
      screenid: screenId,
    };
    setIsMakingRequest(true);
    API.getProductDetails(queryParam).then((data) => {
      setIsMakingRequest(false);
      menuData = data.rateProductDataView.rateProductMenu;
      nextScreenId = data.rateProductDataView.nextMenuOption;
      prevScreenId = data.rateProductDataView.previousMenuOption;
      contextType.setCreateProductData(props, menuData, data);
      contextType.setDescriptionData(data);
      postData = {
        formChg: props.location?.state?.formChg,
        productName: productName,
        productCode: productCode,
        managed: props.location?.state?.managed,
        level: props.location.state.entryLevel
          ? props.location?.state?.entryLevel
          : Settings.defaultLevel,
        entryLevel: props.location.state.entryLevel
          ? props.location?.state?.entryLevel
          : Settings.defaultLevel,
      };
      contextType.setCommonBindingData(data);
    });

    return () => {
      const isValid = contextType.checkMinOccurs();
      if (isValid) {
        contextType.saveProductDescription();
      }
    };
  }, [screenId]);

  return (
    <MasterModifyRateDescriptionContextProvider>
      <MasterModifyRateDescriptionContext.Consumer>
        {(masterModifyRateDescriptionContext) => {
          contextType = masterModifyRateDescriptionContext;
          return (
            <React.Fragment>
              <div>
                <div>
                  <MasterFormattedTabs
                    productCode={productCode}
                    productName={productName}
                    menuData={menuData}
                    screenData={contextType}
                  />
                  <CommonHeaders
                    productCode={productCode}
                    productName={productName}
                    postData={postData}
                    screenid={screenId}
                    queryParam={queryParam}
                    screenTitle={contextType.createProductState.title}
                    screenData={contextType}
                    nextScreen={nextScreenId}
                    prevScreen={prevScreenId}
                  />
                </div>
                {(isMakingRequest || contextType.isMakingRequest) && (
                  <div>
                    <CLoader />
                  </div>
                )}
                <ProductDescription
                  data={contextType}
                  handleModifiableChange={
                    contextType.handleModifiableChangeInput
                  }
                  handleShowRest={contextType.handleShowRestInput}
                  handleNumberChange={Utils.NumberAndSingleFloatOnly_onkeypress}
                  handleShowUOM={contextType.handleShowUOMInput}
                  handleChangeQuantity={contextType.handleChangeQuantity}
                  handleShowType={contextType.handleShowTypeInput}
                  handleShowBrand={contextType.handleShowBrandInput}
                  handleForSafeNumberChange={Utils.KorSafeCharsOnly_onkeypress}
                  handleDescriptionData={contextType.setDescriptionText}
                  handleModifiableRadioChange={contextType.setModifiableChange}
                  handleSelectAll_Click={contextType.onSelectAll}
                  handleUnSelectall_Click={contextType.onUnSelectAll}
                  handleUnBlankAll_Click={contextType.onBlankAll}
                />
              </div>
            </React.Fragment>
          );
        }}
      </MasterModifyRateDescriptionContext.Consumer>
    </MasterModifyRateDescriptionContextProvider>
  );
};

export default masterFormattedRateProductDescription;
