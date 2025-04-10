import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import API from "../service/api";
import ModifyRateAPI from "../service/ModifyRateAPI";
import Settings from "../settings/settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import Utils from "../common/Util";

const MasterModifyRateDescriptionContext = React.createContext({});
export const MasterModifyRateDescriptionContextProvider = (props) => {
  const location = useLocation();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [isAttrChecked, setAttrCheck] = useState(false);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [isBrandChecked, setBrandCheck] = useState(true);
  const [isHotelChecked, setHotelCheck] = useState(true);
  const [isShowModalContent, setShowModalContent] = useState(false);
  const [isQuickViewLoadMsg, setQuicKViewLoadMsg] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isValidProductCode, setValidProductCode] = useState(false);
  const [isValidProductName, setValidProductName] = useState(false);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [productCodeChange, setProductCodeChange] = useState(false);

  const [state, setState] = useState({
    formChg: "Y",
    managed: "",
    entryLevel: "Master",
    rateProductSearch: {
      searchType: 1,
      productCode: null,
      productName: null,
      searchStartProduct: "",
      searchFirstProduct: "",
      nendProduct: "",
      startProduct: "",
      endProduct: "",
      searchProductCode: "",
      searchProductName: "",
      rateProductDefinitionList: [],
      searchAttr: [],
      productList: [],
      productViewTitle: "",
      rateProductListView: [],
      prevBtn: false,
      nextBtn: false,
    },
  });

  const [createProductState, setCreateProductState] = useState({
    formChg: "Y",
    managed: "",
    entryLevel: "Master",
    productCode: null,
    productName: null,
    menuData: [],
    readOnly: false,
    title: "",
  });

  const [commonDataBindState, setCommonDataBindState] = useState({
    rateProductDataView: [],
    uom: [],
    uomListKey: null,
    uomList: {},
    type: [],
    typeListKey: null,
    typeLists: {},
    brand: [],
    brandListKey: null,
    brandLists: {},
    maxOccurs: null,
    minOccurs: null,
    radio1: "B",
  });

  const [payloadDataState, setPayloadDataState] = useState({
    brandCheckBoxList: [],
    brandHiddenFieldList: [],
    hotelCheckBoxList: [],
    hotelHiddenFieldList: [],
    uOMSelectedList: [],
    typeSelectedList: [],
    brandSelectedList: [],
  });

  const getMasterProductData = () => {
    const masterProductData = { ...state };
    ModifyRateAPI.getMasterProduct().then((res) => {
      masterProductData.rateProductSearch.rateProductDefinitionList =
        res.rateProductDefinitionList;
      masterProductData.rateProductSearch.rateProductDefinitionList.filter(
        function (item) {
          item?.rateProductDefinitionGroup.filter(function (inneritem) {
            inneritem?.rateProductDefinition.filter(function (itemval) {
              itemval.checked = false;
            });
          });
        }
      );
    });
    setState(masterProductData);
  };

  const chgSearch_onclick = (event, type) => {
    const productData = { ...state };
    if (type == "ProductCode") {
      productData.rateProductSearch.searchType = 1;
      unselectall_Click();
    } else if (type == "ProductAttr") {
      productData.rateProductSearch.searchType = 2;
      productData.rateProductSearch.productCode = "";
      productData.rateProductSearch.productName = "";
    }
    setState(productData);
  };

  const setProductData = (data) => {
    if (data) {
      const rateData = { ...state.rateProductSearch };
      rateData.productCode = data.rateProductSearch.productCode;
      rateData.productName = data.rateProductSearch.productName;

      setState({
        ...state,
        rateProductSearch: rateData,
      });
    }
  };

  const search_Click = async (
    isSearchbtn,
    navType = "Next",
    isNextPrevClicked = false
  ) => {
    setSearching(true);
    let strProduct;
    const storage_productcode = localStorage.getItem("masterProductcode");
    const rateData = { ...state.rateProductSearch };
    if (isSearchbtn) {
      strProduct = "";
    } else {
      if (navType == "Next") {
        strProduct = rateData.nendProduct;
      }
      if (navType == "Prev") {
        strProduct = "";
      } else {
        strProduct = rateData.nendProduct;
      }
    }
    let searchVal = {};
    const validProdCode = Utils.isValidProductCode(rateData.productCode);
    if (
      (rateData.productCode && validProdCode) ||
      rateData.productName ||
      (!rateData.productName && !rateData.productCode)
    ) {
      if (rateData.searchType == 1) {
        searchVal = searchVal;
      } else {
        rateData.searchAttr.filter(function (item) {
          Object.assign(searchVal, {
            [item.id]: {
              searchAttribute: item.id,
            },
          });
        });
      }
      const finalProductCode =
        storage_productcode !== null &&
        storage_productcode !== undefined &&
        storage_productcode !== "" &&
        productCodeChange === false
          ? storage_productcode
          : rateData.productCode;
      const param = {
        marshaCode: Settings.modifyRateDescription.marshaCode.value,
        brandCode: Settings.modifyRateDescription.brandCode.value,
        strRateProductSearch: JSON.stringify({
          productCode: finalProductCode,
          productName: rateData.productName,
          searchType: rateData.searchType,
          searchStartProduct: strProduct,
          searchFirstProduct: rateData.searchFirstProduct,

          nendProduct:
            navType == "Next"
              ? ""
              : navType == "Prev"
              ? rateData.searchFirstProduct
              : rateData.nendProduct,
          searchProductCode: rateData.searchProductCode,
          searchProductName: rateData.searchProductName,
          searchAttr: searchVal,
        }),
      };
      await ModifyRateAPI.searchProduct(param).then((res) => {
        if (
          finalProductCode !== null &&
          finalProductCode !== "" &&
          productCodeChange === false
        ) {
          localStorage.setItem("masterProductcode", res.nendProduct);
        } else {
          const loc_item = localStorage.getItem("masterProductcode");
          if (loc_item !== null && loc_item !== undefined) {
            localStorage.removeItem("masterProductcode");
          }
          if (productCodeChange && rateData?.productCode !== "") {
            localStorage.setItem("masterProductcode", rateData?.productCode);
          }
        }
        if (res.rateProductDef) {
          rateData.productList = res.rateProductDef;
          rateData.nendProduct = res.nendProduct;
          rateData.searchFirstProduct = res.searchFirstProduct;
          rateData.productCode =
            finalProductCode !== null && finalProductCode !== ""
              ? res.nendProduct
              : "";
          if (isNextPrevClicked) {
            if (rateData.searchFirstProduct) {
              if (rateData.startProduct) {
                rateData.searchFirstProduct = rateData.startProduct;
                rateData.searchStartProduct = rateData.startProduct;
              }
            } else {
              if (rateData.startProduct) {
                rateData.searchStartProduct = rateData.startProduct;
              }
            }

            if (
              rateData.searchFirstProduct &&
              rateData.startProduct != rateData.searchFirstProduct
            ) {
              if (
                navType == "Next" &&
                rateData.endProduct != rateData.nendProduct
              ) {
                rateData.prevBtn = true;
              } else if (
                navType == "Prev" &&
                rateData.endProduct == rateData.nendProduct
              ) {
                rateData.prevBtn = false;
              } else if (
                navType == "Next" &&
                rateData.endProduct == rateData.nendProduct &&
                rateData.endProduct == rateData.searchFirstProduct
              ) {
                rateData.prevBtn = true;
              }
            } else {
              rateData.prevBtn = false;
            }

            if (rateData.endProduct) {
              if (
                rateData.searchFirstProduct &&
                rateData.nendProduct == rateData.searchFirstProduct
              ) {
                rateData.nextBtn = false;
              } else {
                rateData.nextBtn = true;
              }
            } else {
              rateData.prevBtn = true;
            }
          } else {
            if (rateData.productList.length >= 200) {
              rateData.nextBtn = true;
            } else {
              rateData.nextBtn = false;
            }

            rateData.prevBtn = false;
            rateData.endProduct = rateData.nendProduct;
          }
        } else {
          rateData.productList = res.rateProductDef;
        }
      });
      setState({
        ...state,
        rateProductSearch: rateData,
      });
      setSearching(false);
    } else if (rateData.productName == "" && rateData.productCode) {
      setSearching(false);
      alert(Settings.alert.validProductCode);
    }
  };

  const handleChangeInput = (event) => {
    setAttrCheck(!isAttrChecked);
    const selectedAttr = { ...state };
    if (selectedAttr.rateProductSearch.searchAttr.length > 0) {
      if (event.target.checked) {
        selectedAttr.rateProductSearch.searchAttr.push({
          id: event.target.id,
          value: event.target.value,
          checked: !isAttrChecked,
        });
      } else {
        selectedAttr.rateProductSearch.searchAttr =
          selectedAttr.rateProductSearch.searchAttr.filter(function (item) {
            return item.id !== event.target.id;
          });
      }
    } else {
      selectedAttr.rateProductSearch.searchAttr.push({
        id: event.target.id,
        value: event.target.value,
        checked: !isAttrChecked,
      });
    }

    selectedAttr.rateProductSearch.rateProductDefinitionList.filter(function (
      item
    ) {
      item?.rateProductDefinitionGroup.filter(function (inneritem) {
        inneritem?.rateProductDefinition.filter(function (itemval) {
          !selectedAttr.rateProductSearch.searchAttr.some(function (
            selectProd
          ) {
            if (
              item.RP_ListCode +
                "_" +
                inneritem.RP_GroupCode +
                "_" +
                itemval.RP_Name +
                "_" +
                itemval.RP_Code ==
              event.target.id
            ) {
              itemval.checked = event.target.checked;
            }
          });
        });
      });
    });

    setState(selectedAttr);
  };

  const unselectall_Click = () => {
    const productUnselectData = { ...state };
    if (
      productUnselectData.rateProductSearch.rateProductDefinitionList.length > 0
    ) {
      productUnselectData.rateProductSearch.rateProductDefinitionList.filter(
        function (item) {
          item?.rateProductDefinitionGroup.filter(function (inneritem) {
            inneritem?.rateProductDefinition.filter(function (itemval) {
              itemval.checked = false;
            });
          });
        }
      );
    }
    productUnselectData.rateProductSearch.searchAttr = [];
    setState(productUnselectData);
  };

  const setSearchQuery = (event, type) => {
    const rateData = { ...state.rateProductSearch };
    if (type == "productCode") {
      rateData.productCode = event.target.value;
      rateData.productName = "";
    }

    if (type == "productName" && isValidProductName) {
      rateData.productName = event.target.value;
      rateData.productCode = "";
    }

    setState({
      ...state,
      rateProductSearch: rateData,
    });
  };

  const productQuickSelect = (closeModal?: boolean, rowData) => {
    setQuicKViewLoadMsg(true);
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setshowQuickSelectTop(value);
    if (rowData) {
      const viewData = { ...state };
      viewData.rateProductSearch.productViewTitle = rowData.productName;
      const params = {
        productCode: rowData.productCode,
        level: rowData.level,
      };
      ModifyRateAPI.getQuickViewDialog(params).then((res) => {
        viewData.rateProductSearch.rateProductListView =
          res.productView.rateProductListView;
        setState(viewData);
        setShowModalContent(true);
        setQuicKViewLoadMsg(false);
      });
    } else {
      setShowModalContent(false);
      setQuicKViewLoadMsg(false);
    }
  };

  const updateProduct = (data) => {
    const postData = {
      formChg: "Y",
      productName: data.productName,
      productCode: data.productCode,
      managed: data.managed,
      level: data.level,
    };
    setIsMakingRequest(true);
    API.saveAndUpdateProductName(postData).then((response) => {
      console.log(response);
      setIsMakingRequest(false);
    });
  };

  const setCreateProductData = (data, menudata, titledata) => {
    const productData = { ...createProductState };
    if (data.location?.state?.entryLevel) {
      productData.entryLevel = data.location?.state?.entryLevel;
    } else if (data.location?.state?.level) {
      productData.entryLevel = data.location?.state?.level;
    } else if (titledata.level) {
      productData.entryLevel = titledata.level;
    } else {
      productData.entryLevel = data.screenData.createProductState.entryLevel;
    }
    productData.productCode = data.location?.state?.productCode
      ? data.location?.state?.productCode
      : data.productCode;
    productData.productName = data.location?.state?.productName.trim()
      ? data.location?.state?.productName.trim()
      : data.productName;

    productData.managed = data.location?.state?.managed
      ? data.location?.state?.managed
      : "";
    productData.menuData = menudata;
    productData.title = titledata.rateProductDataView.rateProductDefinitionList
      ? titledata.rateProductDataView.rateProductDefinitionList.RP_ListName.trim()
      : "";
    productData.readOnly = titledata.readOnly;
    if (location.pathname != Settings.validatePath) {
      if (
        productData.productName === "" ||
        productData.productName === undefined
      ) {
        appContext.setProductValidated(true);
        sessionStorage.setItem("isMasterProductValidated", "true");
      } else {
        appContext.setProductValidated(false);
        sessionStorage.setItem("isMasterProductValidated", "false");
      }
    }
    setCreateProductState(productData);
  };

  const setProductName = (event) => {
    const product = { ...createProductState };
    product.productName = event.target.value;
    if (event.target.value === "") {
      appContext.setProductValidated(true);
      sessionStorage.setItem("isMasterProductValidated", "true");
    } else {
      appContext.setProductValidated(false);
      sessionStorage.setItem("isMasterProductValidated", "false");
    }
    setCreateProductState(product);
  };

  const setProductDetails = (data, props, menudata, data1) => {
    const productData = { ...createProductState };
    productData.entryLevel = data1.level;
    if (data?.productName == "" || data == null) {
      appContext.setProductValidated(true);
      sessionStorage.setItem("isMasterProductValidated", "true");
    } else {
      appContext.setProductValidated(false);
      sessionStorage.setItem("isMasterProductValidated", "false");
    }
    if (data) {
      productData.productName = data.productName.trim();
      productData.productCode = data.productCode;
    } else {
      productData.productName = props.productName.trim();
      productData.productCode = props.productCode;
    }
    productData.menuData = menudata;
    productData.title = data1.rateProductDataView.rateProductDefinitionList
      ? data1.rateProductDataView.rateProductDefinitionList.RP_ListName.trim()
      : "";
    setCreateProductState(productData);
  };

  const previous_onClick = () => {
    const rateModifyData = { ...state.rateProductSearch };
    if (
      rateModifyData.searchStartProduct != null &&
      rateModifyData.nendProduct != null
    ) {
      rateModifyData.nendProduct = rateModifyData.searchStartProduct;
      rateModifyData.searchStartProduct = "";
    }
    setState({
      ...state,
      rateProductSearch: rateModifyData,
    });

    search_Click(false, "Prev", true);
  };

  const next_onClick = () => {
    const rateModifyData = { ...state.rateProductSearch };
    if (
      rateModifyData.searchStartProduct != null &&
      rateModifyData.nendProduct != null
    ) {
      rateModifyData.searchStartProduct = rateModifyData.nendProduct;
      rateModifyData.nendProduct = "";
    }
    setState({
      ...state,
      rateProductSearch: rateModifyData,
    });

    search_Click(false, "Next", true);
  };

  const setCommonBindingData = (data) => {
    const dataItem = { ...commonDataBindState };
    dataItem.rateProductDataView = data.rateProductDataView;
    setCommonDataBindState(dataItem);
  };

  const setDescriptionData = (data) => {
    const descriptionData = { ...commonDataBindState };
    descriptionData.radio1 = Settings.labels.brandModifiable;
    descriptionData.rateProductDataView = data.rateProductDataView;
    descriptionData.maxOccurs = descriptionData.rateProductDataView
      ?.rateProductDefinitionList
      ? descriptionData.rateProductDataView?.rateProductDefinitionList.maxOccurs
      : "";
    descriptionData.minOccurs = descriptionData.rateProductDataView
      ?.rateProductDefinitionList
      ? descriptionData.rateProductDataView?.rateProductDefinitionList.minOccurs
      : "";

    if (descriptionData.rateProductDataView?.rateProductDefinitionList) {
      if (
        descriptionData.rateProductDataView?.rateProductDefinitionList
          .rateProductDefinitionGroup.length > 0
      ) {
        descriptionData.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
          function (item) {
            item.rateProductDefinition.filter(function (itemval) {
              itemval.value = itemval.brandModifiable == "true" ? true : false;
              itemval.checked =
                itemval.brandModifiable == "true" ? true : false;
              itemval.valueH = itemval.hotelModifiable == "true" ? true : false;
              itemval.checkedH =
                itemval.hotelModifiable == "true" ? true : false;
              itemval.showAvailabilityIndValue =
                itemval.availabilityInd == "Y" ? true : false;
            });
          }
        );
      }
    }

    setCommonDataBindState(descriptionData);
  };

  const handleModifiableChangeInput = (event, eventType) => {
    const payloadCheckboxDetails = { ...payloadDataState };
    const modifiableData = { ...commonDataBindState };
    if (eventType == "brand_modifiable") {
      setBrandCheck(!isBrandChecked);
      if (payloadCheckboxDetails.brandCheckBoxList.length > 0) {
        payloadCheckboxDetails.brandCheckBoxList.slice().forEach((item) => {
          if (item.id == event.target.id) {
            item.checked = event.target.checked;
            item.value = event.target.checked;
            if (event.target.checked == false) {
              item.checkedH = false;
              item.valueH = false;
            }
          }
        });

        const arrayWithCommon = payloadCheckboxDetails.brandCheckBoxList.filter(
          (o) => o.id == event.target.id
        );

        if (!arrayWithCommon.length) {
          if (event.target.checked) {
            payloadCheckboxDetails.brandCheckBoxList.push({
              id: event.target.id,
              value: event.target.checked,
              checked: event.target.checked,
            });
          } else {
            payloadCheckboxDetails.brandCheckBoxList.push({
              id: event.target.id,
              value: event.target.checked,
              checked: event.target.checked,
              valueH: false,
              checkedH: false,
            });
          }
        }
      } else {
        if (event.target.checked) {
          payloadCheckboxDetails.brandCheckBoxList.push({
            id: event.target.id,
            value: !isBrandChecked,
            checked: !isBrandChecked,
          });
        } else {
          payloadCheckboxDetails.brandCheckBoxList.push({
            id: event.target.id,
            value: !isBrandChecked,
            checked: !isBrandChecked,
            valueH: false,
            checkedH: false,
          });
        }
      }

      if (payloadCheckboxDetails.brandHiddenFieldList.length > 0) {
        payloadCheckboxDetails.brandHiddenFieldList.slice().forEach((item) => {
          if (
            item.id ==
            "rateProductDefinition['" +
              event.target.id.replace(Settings.prefixLabel.brand, "") +
              "'].brandModifiable"
          ) {
            item.checked = event.target.checked;
            item.value = event.target.checked;
          }
        });

        const arrayWithCommonHidFields =
          payloadCheckboxDetails.brandHiddenFieldList.filter(
            (o) =>
              o.id ==
              "rateProductDefinition['" +
                event.target.id.replace(Settings.prefixLabel.brand, "") +
                "'].brandModifiable"
          );

        if (!arrayWithCommonHidFields.length) {
          payloadCheckboxDetails.brandHiddenFieldList.push({
            id:
              "rateProductDefinition['" +
              event.target.id.replace(Settings.prefixLabel.brand, "") +
              "'].brandModifiable",
            value: event.target.checked,
            checked: event.target.checked,
          });
        }
      } else {
        payloadCheckboxDetails.brandHiddenFieldList.push({
          id:
            "rateProductDefinition['" +
            event.target.id.replace(Settings.prefixLabel.brand, "") +
            "'].brandModifiable",
          value: !isBrandChecked,
          checked: !isBrandChecked,
        });
      }

      modifiableData.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (item1) {
          item1.rateProductDefinition.map((item) => {
            if (
              Settings.prefixLabel.brand + item.RP_Name + "_" + item.RP_Code ==
              event.target.id
            ) {
              item.brandModifiable = event.target.checked ? "true" : "false";
              item.checked = event.target.checked;
              item.value = event.target.checked;
              if (item.brandModifiable == "false") {
                item.hotelModifiable = "false";
                item.checkedH = false;
                item.valueH = false;
              }
            }
          });
        }
      );
    } else if (eventType == "hotel_modifiable") {
      setHotelCheck(!isHotelChecked);
      if (payloadCheckboxDetails.hotelCheckBoxList.length > 0) {
        payloadCheckboxDetails.hotelCheckBoxList.slice().forEach((item) => {
          if (item.id == event.target.id) {
            item.checkedH = event.target.checked;
            item.valueH = event.target.checked;
          }
        });

        const arrayWithCommonHotel =
          payloadCheckboxDetails.hotelCheckBoxList.filter(
            (o) => o.id == event.target.id
          );

        if (!arrayWithCommonHotel.length) {
          payloadCheckboxDetails.hotelCheckBoxList.push({
            id: event.target.id,
            valueH: event.target.checked,
            checkedH: event.target.checked,
          });
        }
      } else {
        payloadCheckboxDetails.hotelCheckBoxList.push({
          id: event.target.id,
          valueH: !isHotelChecked,
          checkedH: !isHotelChecked,
        });
      }

      if (payloadCheckboxDetails.hotelHiddenFieldList.length > 0) {
        payloadCheckboxDetails.hotelHiddenFieldList.slice().forEach((item) => {
          if (
            item.id ==
            "rateProductDefinition['" +
              event.target.id.replace(Settings.prefixLabel.hotel, "") +
              "'].hotelModifiable"
          ) {
            item.checkedH = event.target.checked;
            item.valueH = event.target.checked;
          }
        });

        const arrayWithCommonHotelHidFields =
          payloadCheckboxDetails.hotelHiddenFieldList.filter(
            (o) =>
              o.id ==
              "rateProductDefinition['" +
                event.target.id.replace(Settings.prefixLabel.hotel, "") +
                "'].hotelModifiable"
          );

        if (!arrayWithCommonHotelHidFields.length) {
          payloadCheckboxDetails.hotelHiddenFieldList.push({
            id:
              "rateProductDefinition['" +
              event.target.id.replace(Settings.prefixLabel.hotel, "") +
              "'].hotelModifiable",
            valueH: event.target.checked,
            checkedH: event.target.checked,
          });
        }
      } else {
        payloadCheckboxDetails.hotelHiddenFieldList.push({
          id:
            "rateProductDefinition['" +
            event.target.id.replace(Settings.prefixLabel.hotel, "") +
            "'].hotelModifiable",
          valueH: !isBrandChecked,
          checkedH: !isBrandChecked,
        });
      }

      modifiableData.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemh1) {
          itemh1.rateProductDefinition.map((itemh) => {
            if (
              Settings.prefixLabel.hotel +
                itemh.RP_Name +
                "_" +
                itemh.RP_Code ==
              event.target.id
            ) {
              itemh.hotelModifiable = event.target.checked ? "true" : "false";
              itemh.checkedH = event.target.checked;
              itemh.valueH = event.target.checked;
            }
          });
        }
      );
    }
    setPayloadDataState(payloadCheckboxDetails);
    setCommonDataBindState(modifiableData);
  };

  const handleShowRestInput = (event, dataItem) => {
    const dropDownData = { ...commonDataBindState };
    const rateProductDefinitionList =
      dropDownData.rateProductDataView?.rateProductDefinitionList;
    const maxOccurs = rateProductDefinitionList.maxOccurs;
    const RP_ListName = rateProductDefinitionList.RP_ListName;
    const rateProductDefinitionSample = [
      ...dropDownData?.rateProductDataView?.rateProductDefinitionList
        ?.rateProductDefinitionGroup,
    ];
    rateProductDefinitionSample.forEach((l) => {
      const selectedValues = l.rateProductDefinition.filter(
        (itemval) => itemval.availabilityInd == "Y"
      );

      if (
        event.target.value == "Y" &&
        selectedValues.length >= maxOccurs &&
        maxOccurs >= 0
      ) {
        alert(`Only ${maxOccurs} ${RP_ListName} can be selected.`);
      } else {
        l.rateProductDefinition.filter(function (itemvalue) {
          if (dataItem?.RP_CodeName == itemvalue?.RP_CodeName) {
            itemvalue.availabilityInd = event.target.value;
          }
          if (itemvalue.availabilityInd == "Y") {
            itemvalue.showAvailabilityIndValue = true;
          } else {
            itemvalue.showAvailabilityIndValue = false;
            if (itemvalue.type != null) {
              itemvalue.type.typeCode = null;
              itemvalue.type.value = "N";
            }
            if (itemvalue.unitOfMeasure != null) {
              itemvalue.unitOfMeasure.UOM_Code = null;
              itemvalue.unitOfMeasure.value = "N";
            }
            if (itemvalue.brand != null) {
              itemvalue.brand.brandCode = null;
              itemvalue.brand.value = "N";
            }
            if (itemvalue.description && itemvalue.description.text != null) {
              itemvalue.description.text[0].value = "";
            }
          }
        });
      }
    });
    setCommonDataBindState(dropDownData);
  };

  const handleShowUOMInput = (event) => {
    const commonUOMDetails = { ...commonDataBindState };
    const payloadUOMDetails = { ...payloadDataState };
    if (payloadUOMDetails.uOMSelectedList.length > 0) {
      payloadUOMDetails.uOMSelectedList.slice().forEach((item) => {
        Object.keys(item).find((key) => {
          if (key === event.target.id) {
            item[key] = event.target.value;
          } else {
            payloadUOMDetails.uOMSelectedList.push({
              [`${event.target.id}`]: event.target.value,
            });
          }
        });
      });
    } else {
      payloadUOMDetails.uOMSelectedList.push({
        [`${event.target.id}`]: event.target.value,
      });
    }
    commonUOMDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
      function (itemsUOM) {
        itemsUOM.rateProductDefinition.map((itemUOMValue) => {
          if (
            "rateProductDefinition[" +
              itemUOMValue.RP_Name +
              "_" +
              itemUOMValue.RP_Code +
              "].UOM_Code" ==
              event.target.id &&
            itemUOMValue.unitOfMeasure
          ) {
            itemUOMValue.unitOfMeasure.UOM_Code = event.target.value;
          }
        });
      }
    );

    setPayloadDataState(payloadUOMDetails);
    setCommonDataBindState(commonUOMDetails);
  };

  const handleShowTypeInput = (event) => {
    const commonTypeDetails = { ...commonDataBindState };
    const payloadTypeDetails = { ...payloadDataState };
    if (payloadTypeDetails.typeSelectedList.length > 0) {
      payloadTypeDetails.typeSelectedList.slice().forEach((item) => {
        Object.keys(item).find((key) => {
          if (key === event.target.id) {
            item[key] = event.target.value;
          } else {
            payloadTypeDetails.typeSelectedList.push({
              [`${event.target.id}`]: event.target.value,
            });
          }
        });
      });
    } else {
      payloadTypeDetails.typeSelectedList.push({
        [`${event.target.id}`]: event.target.value,
      });
    }

    commonTypeDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
      function (itemsType) {
        itemsType.rateProductDefinition.map((itemTypeValue) => {
          if (
            "rateProductDefinition[" +
              itemTypeValue.RP_Name +
              "_" +
              itemTypeValue.RP_Code +
              "].typeCode" ==
              event.target.id &&
            itemTypeValue.type
          ) {
            itemTypeValue.type.typeCode = event.target.value;
          }
        });
      }
    );
    setPayloadDataState(payloadTypeDetails);
    setCommonDataBindState(commonTypeDetails);
  };

  const handleShowBrandInput = (event) => {
    const commonBrandDetails = { ...commonDataBindState };
    const payloadBrandDetails = { ...payloadDataState };
    if (payloadBrandDetails.brandSelectedList.length > 0) {
      payloadBrandDetails.brandSelectedList.slice().forEach((item) => {
        Object.keys(item).find((key) => {
          if (key === event.target.id) {
            item[key] = event.target.value;
          } else {
            payloadBrandDetails.brandSelectedList.push({
              [`${event.target.id}`]: event.target.value,
            });
          }
        });
      });
    } else {
      payloadBrandDetails.brandSelectedList.push({
        [`${event.target.id}`]: event.target.value,
      });
    }

    commonBrandDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
      function (itemsBrand) {
        itemsBrand.rateProductDefinition.map((itemBrandValue) => {
          if (
            "rateProductDefinition[" +
              itemBrandValue.RP_Name +
              "_" +
              itemBrandValue.RP_Code +
              "].brandCode" ==
              event.target.id &&
            itemBrandValue.brand
          ) {
            itemBrandValue.brand.brandCode = event.target.value;
          }
        });
      }
    );
    setPayloadDataState(payloadBrandDetails);
    setCommonDataBindState(commonBrandDetails);
  };

  const handleChangeQuantity = (event) => {
    const commonTextDetails = { ...commonDataBindState };
    commonTextDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.map(
      (textItems) => {
        textItems.rateProductDefinition.map((textValue) => {
          if (
            "rateProductDefinition[" +
              textValue.RP_Name +
              "_" +
              textValue.RP_Code +
              "].quantity" ==
            event.target.id
          ) {
            textValue.quantity = event.target.value;
          }
        });
      }
    );

    setCommonDataBindState(commonTextDetails);
  };

  const setDescriptionText = (event) => {
    const commonTextDetails = { ...commonDataBindState };
    commonTextDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
      function (textItems) {
        textItems.rateProductDefinition.map((textValue) => {
          if (
            "rateProductDefinition[" +
              textValue.RP_Name +
              "_" +
              textValue.RP_Code +
              "].text" ==
            event.target.id
          ) {
            textValue.description.text.map((description) => {
              description.value = event.target.value;
            });
          }
        });
      }
    );
    setCommonDataBindState(commonTextDetails);
  };

  const setModifiableChange = (event) => {
    const commonRadioDetails = { ...commonDataBindState };
    commonRadioDetails.radio1 = event.target.value;
    setCommonDataBindState(commonRadioDetails);
  };

  const onSelectAll = () => {
    const commonDetails = { ...commonDataBindState };
    if (commonDetails.radio1 == Settings.labels.brandModifiable) {
      changeBrand(Settings.labels.typeSelectAll);
    } else if (commonDetails.radio1 == Settings.labels.hotelModifiable) {
      changeHotel(Settings.labels.typeSelectAll);
    } else if (commonDetails.radio1 == Settings.labels.statusYN) {
      changeStatusYN(Settings.labels.typeSelectAll);
    }
  };

  const onUnSelectAll = () => {
    const commonDetails = { ...commonDataBindState };
    if (commonDetails.radio1 == Settings.labels.brandModifiable) {
      changeBrand(Settings.labels.typeUnSelectAll);
    } else if (commonDetails.radio1 == Settings.labels.hotelModifiable) {
      changeHotel(Settings.labels.typeUnSelectAll);
    } else if (commonDetails.radio1 == Settings.labels.statusYN) {
      changeStatusYN(Settings.labels.typeUnSelectAll);
    }
  };

  const onBlankAll = () => {
    const commonDetails = { ...commonDataBindState };
    if (commonDetails.radio1 == Settings.labels.brandModifiable) {
      changeBrand(Settings.labels.typeStatusYN);
    } else if (commonDetails.radio1 == Settings.labels.hotelModifiable) {
      changeHotel(Settings.labels.typeStatusYN);
    } else if (commonDetails.radio1 == Settings.labels.statusYN) {
      changeStatusYN(Settings.labels.typeStatusYN);
    }
  };

  const changeBrand = (chgType) => {
    const payloadBrandDetails = { ...payloadDataState };
    const commonBrandDetails = { ...commonDataBindState };
    if (chgType == Settings.labels.typeSelectAll) {
      payloadBrandDetails.brandCheckBoxList = [];
      payloadBrandDetails.brandHiddenFieldList = [];
      commonBrandDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsB) {
          itemsB.rateProductDefinition.map((itemBValue) => {
            itemBValue.brandModifiable = "true";
            itemBValue.checked = true;
            itemBValue.value = true;
            payloadBrandDetails.brandCheckBoxList.push({
              id:
                Settings.prefixLabel.brand +
                itemBValue.RP_Name +
                "_" +
                itemBValue.RP_Code,
              value: true,
              checked: true,
              valueH: false,
              checkedH: false,
            });
            payloadBrandDetails.brandHiddenFieldList.push({
              id:
                "rateProductDefinition['" +
                itemBValue.RP_Name +
                "_" +
                itemBValue.RP_Code +
                "'].brandModifiable",
              value: true,
              checked: true,
            });
          });
        }
      );
      payloadBrandDetails.hotelCheckBoxList = [];
      payloadBrandDetails.hotelHiddenFieldList = [];
    } else if (
      chgType == Settings.labels.typeUnSelectAll ||
      Settings.labels.typeStatusYN
    ) {
      payloadBrandDetails.brandCheckBoxList = [];
      payloadBrandDetails.brandHiddenFieldList = [];
      payloadBrandDetails.hotelCheckBoxList = [];
      payloadBrandDetails.hotelHiddenFieldList = [];
      commonBrandDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsB) {
          itemsB.rateProductDefinition.map((itemBValue) => {
            itemBValue.brandModifiable = "false";
            itemBValue.checked = false;
            itemBValue.value = false;
            itemBValue.hotelModifiable = "false";
            itemBValue.checkedH = false;
            itemBValue.valueH = false;
          });
        }
      );
    }

    setCommonDataBindState(commonBrandDetails);
    setPayloadDataState(payloadBrandDetails);
  };

  const changeHotel = (chgType) => {
    const payloadHotelDetails = { ...payloadDataState };
    const commonHotelDetails = { ...commonDataBindState };
    if (chgType == Settings.labels.typeSelectAll) {
      payloadHotelDetails.hotelCheckBoxList = [];
      payloadHotelDetails.hotelHiddenFieldList = [];
      commonHotelDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsH) {
          itemsH.rateProductDefinition.map((itemHValue) => {
            if (
              itemHValue.brandModifiable == "true" &&
              itemHValue.checked &&
              itemHValue.value
            ) {
              itemHValue.hotelModifiable = "true";
              itemHValue.checkedH = true;
              itemHValue.valueH = true;
              payloadHotelDetails.hotelCheckBoxList.push({
                id:
                  Settings.prefixLabel.hotel +
                  itemHValue.RP_Name +
                  "_" +
                  itemHValue.RP_Code,
                valueH: true,
                checkedH: true,
              });
              payloadHotelDetails.hotelHiddenFieldList.push({
                id:
                  "rateProductDefinition['" +
                  itemHValue.RP_Name +
                  "_" +
                  itemHValue.RP_Code +
                  "'].brandModifiable",
                valueH: true,
                checkedH: true,
              });
            } else {
              itemHValue.hotelModifiable = "false";
              itemHValue.checkedH = false;
              itemHValue.valueH = false;
            }
          });
        }
      );
    } else if (
      chgType == Settings.labels.typeUnSelectAll ||
      Settings.labels.typeStatusYN
    ) {
      payloadHotelDetails.hotelCheckBoxList = [];
      payloadHotelDetails.hotelHiddenFieldList = [];
      commonHotelDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsH) {
          itemsH.rateProductDefinition.map((itemHValue) => {
            itemHValue.hotelModifiable = "false";
            itemHValue.checkedH = false;
            itemHValue.valueH = false;
          });
        }
      );
    }
    setCommonDataBindState(commonHotelDetails);
    setPayloadDataState(payloadHotelDetails);
  };

  const changeStatusYN = (chgType) => {
    const payloadStatusYNDetails = { ...payloadDataState };
    const commonStatusYNDetails = { ...commonDataBindState };
    if (chgType == Settings.labels.typeSelectAll) {
      commonStatusYNDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsYN) {
          itemsYN.rateProductDefinition.map((itemYNValue) => {
            itemYNValue.availabilityInd = "Y";
          });
        }
      );
    } else if (chgType == Settings.labels.typeUnSelectAll) {
      payloadStatusYNDetails.brandSelectedList = [];
      payloadStatusYNDetails.typeSelectedList = [];
      payloadStatusYNDetails.uOMSelectedList = [];
      commonStatusYNDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsYN) {
          itemsYN.rateProductDefinition.map((itemYNValue) => {
            itemYNValue.availabilityInd = "N";
            itemYNValue.quantity = "";
            if (itemYNValue.unitOfMeasure) {
              itemYNValue.unitOfMeasure.UOM_Code = "    ";
            }
            if (itemYNValue.type) {
              itemYNValue.type.typeCode = "    ";
            }
            if (itemYNValue.brand) {
              itemYNValue.brand.brandCode = "    ";
            }
            if (itemYNValue.description) {
              itemYNValue.description.text.map((description) => {
                description.value = "";
              });
            }
          });
        }
      );
    } else if (chgType == Settings.labels.typeStatusYN) {
      payloadStatusYNDetails.brandSelectedList = [];
      payloadStatusYNDetails.typeSelectedList = [];
      payloadStatusYNDetails.uOMSelectedList = [];
      commonStatusYNDetails.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
        function (itemsYN) {
          itemsYN.rateProductDefinition.map((itemYNValue) => {
            itemYNValue.availabilityInd = " ";
            itemYNValue.quantity = "";
            if (itemYNValue.unitOfMeasure) {
              itemYNValue.unitOfMeasure.UOM_Code = "    ";
            }
            if (itemYNValue.type) {
              itemYNValue.type.typeCode = "    ";
            }
            if (itemYNValue.brand) {
              itemYNValue.brand.brandCode = "    ";
            }
            if (itemYNValue.description) {
              itemYNValue.description.text.map((description) => {
                description.value = "";
              });
            }
          });
        }
      );
    }
    setCommonDataBindState(commonStatusYNDetails);
    setPayloadDataState(payloadStatusYNDetails);
  };

  const checkMinOccurs = (calledFrom) => {
    let validSelected = true;
    let minOccurs, RP_ListName;
    const commonData = { ...commonDataBindState };
    const rateProductDefinitionList =
      commonData.rateProductDataView?.rateProductDefinitionList;
    if (calledFrom == "finishSave") {
      return true;
    } else {
      if (rateProductDefinitionList) {
        minOccurs = rateProductDefinitionList.minOccurs;
        RP_ListName = rateProductDefinitionList.RP_ListName;
        const selectedValues =
          rateProductDefinitionList.rateProductDefinitionGroup.filter(
            (item) => {
              item?.rateProductDefinition.filter(
                (itemval) => itemval.availabilityInd == "Y"
              );
            }
          );
        if (selectedValues.length < minOccurs && minOccurs >= 0) {
          validSelected = false;
          alert(`At least ${minOccurs} ${RP_ListName} must be selected.`);
          return validSelected;
        } else {
          validSelected = true;
          return validSelected;
        }
      } else {
        return false;
      }
    }
  };

  const saveProductDescription = async (calledFrom) => {
    const stateData = { ...createProductState };
    const commonData = { ...commonDataBindState };
    let strRateProductDefinition = {};
    const addDetails = {
      formChg: stateData.formChg,
      productName: stateData.productName,
      productCode: stateData.productCode,
      managed: stateData.managed,
      level: stateData.entryLevel,
      entryLevel: stateData.entryLevel,
    };

    commonData.rateProductDataView?.rateProductDefinitionList.rateProductDefinitionGroup.filter(
      (itemvalue) => {
        itemvalue.rateProductDefinition.filter(function (item) {
          if (item.description) {
            item.description.text.filter(function (itemval) {
              Object.assign(strRateProductDefinition, {
                [item.RP_Name + "_" + item.RP_Code]: {
                  availabilityInd: item.availabilityInd,
                  quantity: item.quantity == "" ? null : item.quantity,
                  text: itemval.value && itemval.value ? itemval.value : "",
                  UOM_Code:
                    item.unitOfMeasure && item.unitOfMeasure.UOM_Code
                      ? item.unitOfMeasure.UOM_Code == "    "
                        ? "    "
                        : item.unitOfMeasure.UOM_Code
                      : "    ",
                  typeCode:
                    item.type && item.type.typeCode
                      ? item.type.typeCode == "    "
                        ? "    "
                        : item.type.typeCode
                      : "    ",
                  brandCode:
                    item.brand && item.brand.brandCode
                      ? item.brand.brandCode == "    "
                        ? "    "
                        : item.brand.brandCode
                      : "    ",
                  brandModifiable: item.brandModifiable,
                  hotelModifiable: item.hotelModifiable,
                },
              });
            });
          } else {
            Object.assign(strRateProductDefinition, {
              [item.RP_Name + "_" + item.RP_Code]: {
                availabilityInd: item.availabilityInd,
                quantity: item.quantity == "" ? null : item.quantity,
                text: "",
                UOM_Code:
                  item.unitOfMeasure && item.unitOfMeasure.UOM_Code
                    ? item.unitOfMeasure.UOM_Code == "    "
                      ? "    "
                      : item.unitOfMeasure.UOM_Code
                    : "    ",
                typeCode:
                  item.type && item.type.typeCode
                    ? item.type.typeCode == "    "
                      ? "    "
                      : item.type.typeCode
                    : "    ",
                brandCode:
                  item.brand && item.brand.brandCode
                    ? item.brand.brandCode == "    "
                      ? "    "
                      : item.brand.brandCode
                    : "    ",
                brandModifiable: item.brandModifiable,
                hotelModifiable: item.hotelModifiable,
              },
            });
          }
        });
      }
    );

    strRateProductDefinition = JSON.stringify(strRateProductDefinition);
    await API.saveAndUpdateFields(addDetails, strRateProductDefinition).then(
      (res) => {
        console.log(res);
      }
    );
  };

  const masterModifyRateDescriptionContext = {
    setAttrCheck,
    state,
    setState,
    createProductState,
    setCreateProductState,
    showQuickSelectTop,
    chgSearch_onclick,
    setProductData,
    search_Click,
    getMasterProductData,
    handleChangeInput,
    unselectall_Click,
    setSearchQuery,
    productQuickSelect,
    updateProduct,
    setCreateProductData,
    setProductName,
    setProductDetails,
    previous_onClick,
    next_onClick,
    commonDataBindState,
    setCommonDataBindState,
    setCommonBindingData,
    payloadDataState,
    setPayloadDataState,
    isBrandChecked,
    setBrandCheck,
    isHotelChecked,
    setHotelCheck,
    isShowModalContent,
    setShowModalContent,
    isQuickViewLoadMsg,
    setQuicKViewLoadMsg,
    isSearching,
    setSearching,
    isValidProductCode,
    setValidProductCode,
    isValidProductName,
    setValidProductName,
    setDescriptionData,
    handleModifiableChangeInput,
    handleShowRestInput,
    handleShowUOMInput,
    handleShowTypeInput,
    handleShowBrandInput,
    setDescriptionText,
    setModifiableChange,
    onSelectAll,
    onUnSelectAll,
    onBlankAll,
    checkMinOccurs,
    saveProductDescription,
    handleChangeQuantity,
    isMakingRequest,
    setIsMakingRequest,
    productCodeChange,
    setProductCodeChange,
  };

  return (
    <MasterModifyRateDescriptionContext.Provider
      value={masterModifyRateDescriptionContext}
    >
      {props.children}
    </MasterModifyRateDescriptionContext.Provider>
  );
};

export const MasterModifyRateDescriptionContextConsumer =
  MasterModifyRateDescriptionContext.Consumer;
export default MasterModifyRateDescriptionContext;
