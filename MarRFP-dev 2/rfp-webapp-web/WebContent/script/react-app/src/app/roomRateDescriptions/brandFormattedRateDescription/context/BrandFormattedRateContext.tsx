import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Utils from "../../masterFormattedRateDescriptions/common/Util";
import API from "../service/API";
import Settings from "../static/Settings";

const BrandFormattedRateContext = React.createContext({});
export const BrandFormattedRateContextProvider = (props) => {
  const urlParms = useLocation().search;
  const [brandList, setBrandList] = useState([]);
  const [brandCode, setBrandCode] = useState("");
  const [brandName, setBrandName] = useState("");
  const [quickViewLoadingMsg, setQuickViewLoadingMsg] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [isAttrChecked, setAttrCheck] = useState(false);
  const [loadingSearchMessage, setLoadingSearchMessage] = useState("");
  const [showQuickSelectTop, setShowQuickSelectTop] = useState(false);
  const [showQuickViewDialogContents, setShowQuickViewDialogContents] =
    useState(false);
  const [isBrandChecked, setBrandCheck] = useState(true);
  const [isHotelChecked, setHotelCheck] = useState(true);
  const [isFinishAndSave, setIsFinishAndSave] = useState(false);
  const [prevFlag, setPrevFlag] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [productCodeChange, setProductCodeChange] = useState(false);
  const [state, setState] = useState({
    formChg: "N",
    managed: "",
    entryLevel: "Brand",
    rateProductName: "",
    checkAlert: false,
    productNewName: "",
    newRateProductName: "",
    rateProductSearch: {
      searchType: 1,
      productCode: null,
      productName: null,
      searchStartProduct: "",
      searchFirstProduct: "",
      nendProduct: "",
      endProduct: "",
      lastProduct: null,
      firstProduct: null,
      startProduct: null,
      searchProductCode: "",
      searchProductName: "",
      rateProductDefinitionGroup: [],
      rateProductDefinitionList: [],
      searchAttr: [],
      productList: [],
      isProductLoading: false,
      productViewTitle: "",
      rateProductListView: [],
      prevBtn: false,
      nextBtn: false,
      rateProductDataView: [],
      rateProductMenu: [],
      brandLists: [],
      typeLists: [],
      uomLists: [],
    },
  });

  const [createProductState, setCreateProductState] = useState({
    formChg: "N",
    managed: "",
    level: "",
    entryLevel: "Brand",
    productCode: null,
    productName: null,
    menuData: [],
    readOnly: false,
    title: "",
    nextBtn: null,
    prevBtn: null,
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
    radio1: "H",
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

  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const setRateProductData = (data) => {
    const productView = { ...state };
    productView.rateProductSearch.rateProductDataView = data;
    productView.rateProductSearch.rateProductDefinitionList =
      data.rateProductDataView.rateProductDefinitionList;
    productView.rateProductSearch.rateProductMenu =
      data.rateProductDataView.rateProductMenu;
    setState(productView);
  };

  const updateBrand = (e) => {
    setBrandCode(e.target.value);
    const brand = brandList?.filter((data) => data.brandCode == e.target.value);
    brand && setBrandName(brand[0].brandName);
  };

  const clearData = () => {
    setBrandCode("");
    setBrandName("");
  };

  const getBrandProductData = () => {
    const brandProductData = { ...state };
    const bName: string =
      brandName && brandName != ""
        ? brandName?.trim()
        : new URLSearchParams(urlParms).get(Settings.queryId.brandName)
        ? new URLSearchParams(urlParms).get(Settings.queryId.brandName).trim()
        : "";
    const bCode: string =
      brandCode && brandCode != ""
        ? brandCode?.trim()
        : new URLSearchParams(urlParms).get(Settings.queryId.brandCode)
        ? new URLSearchParams(urlParms).get(Settings.queryId.brandCode).trim()
        : "";
    setIsMakingRequest(true);
    API.getBrandProduct(bCode, bName).then((res) => {
      setIsMakingRequest(false);
      brandProductData.rateProductSearch.rateProductDefinitionList =
        res.rateProductDefinitionList;
      setState(brandProductData);
    });
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

  const unSelectAll_Click = () => {
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
    if (type == "productName") {
      rateData.productName = event.target.value;
      rateData.productCode = "";
    }

    setState({
      ...state,
      rateProductSearch: rateData,
    });
  };

  const searchBy_Click = (event, type) => {
    const productData = { ...state };
    if (type == "ProductCode") {
      productData.rateProductSearch.searchType = 1;
      unSelectAll_Click();
    } else if (type == "ProductAttr") {
      productData.rateProductSearch.searchType = 2;
      productData.rateProductSearch.productCode = "";
      productData.rateProductSearch.productName = "";
    }
    setState(productData);
  };

  const search_Click = async () => {
    setLoadingSearchMessage(Settings.labels.searchingTitle);
    setShowTable(false);
    const rateData = { ...state.rateProductSearch };
    const storage_productcode = localStorage.getItem("brandProductcode");
    let searchVal = {};
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
      brandName:
        brandName && brandName != ""
          ? brandName?.trim()
          : new URLSearchParams(urlParms).get(Settings.queryId.brandName)
          ? new URLSearchParams(urlParms).get(Settings.queryId.brandName).trim()
          : "",
      brandCode:
        brandCode && brandCode != ""
          ? brandCode?.trim()
          : new URLSearchParams(urlParms).get(Settings.queryId.brandCode)
          ? new URLSearchParams(urlParms).get(Settings.queryId.brandCode).trim()
          : "",
      strRateProductSearch: JSON.stringify({
        productCode: finalProductCode,
        productName: rateData.productName,
        searchType: rateData.searchType,
        searchStartProduct: "",
        searchFirstProduct: "",
        nendProduct: "",
        searchProductCode: rateData.searchProductCode,
        searchProductName: rateData.searchProductName,
        searchAttr: searchVal,
      }),
    };
    await API.searchProduct(param).then((res) => {
      if (res != null) {
        if (
          finalProductCode !== null &&
          finalProductCode !== "" &&
          productCodeChange === false
        ) {
          localStorage.setItem("brandProductcode", res.nendProduct);
        } else {
          const loc_item = localStorage.getItem("brandProductcode");
          if (loc_item !== null && loc_item !== undefined) {
            localStorage.removeItem("brandProductcode");
          }
          if (productCodeChange && rateData?.productCode !== "") {
            localStorage.setItem("brandProductcode", rateData?.productCode);
          }
        }
        if (rateData.searchType == 1) {
          setSearchedData(res.rateProductDef);
          setPaginationParams(res);
          setFirstProduct(res);
          setLoadingSearchMessage("");
          setShowTable(true);
          if (
            res?.rateProductDef[0]?.productCode ===
            state?.rateProductSearch?.lastProduct
          ) {
            setNextFlag(false);
          } else {
            setNextFlag(true);
          }
          setPrevFlag(false);
        } else {
          setSearchedData(res.rateProductDef);
          setPaginationParams(res);
          setFirstProduct(res);
          setLoadingSearchMessage("");
          setShowTable(true);
          if (Object.keys(searchVal).length === 0) {
            if (
              res?.rateProductDef[0]?.productCode ===
              state?.rateProductSearch?.lastProduct
            ) {
              setNextFlag(false);
            } else {
              setNextFlag(true);
            }
          } else {
            setNextFlag(false);
          }
          setPrevFlag(false);
        }
        return res;
      }
    });
  };

  const handlePrevsNextClick = async (navPage) => {
    setLoadingSearchMessage(Settings.labels.searchingTitle);
    setShowTable(false);
    const rateData = { ...state.rateProductSearch };
    let searchVal = {};
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
    const param = {
      brandName:
        brandName && brandName != ""
          ? brandName?.trim()
          : new URLSearchParams(urlParms).get(Settings.queryId.brandName)
          ? new URLSearchParams(urlParms).get(Settings.queryId.brandName).trim()
          : "",
      brandCode:
        brandCode && brandCode != ""
          ? brandCode?.trim()
          : new URLSearchParams(urlParms).get(Settings.queryId.brandCode)
          ? new URLSearchParams(urlParms).get(Settings.queryId.brandCode).trim()
          : "",
      strRateProductSearch: JSON.stringify({
        productCode: rateData.productCode,
        productName: rateData.productName,
        searchType: rateData.searchType,
        searchStartProduct:
          navPage !== `${Settings.navPagePrevious}`
            ? state?.rateProductSearch?.lastProduct
            : "",
        searchFirstProduct: state.rateProductSearch?.firstProduct,
        nendProduct:
          navPage !== `${Settings.navPagePrevious}`
            ? state?.rateProductSearch?.lastProduct
            : state.rateProductSearch?.startProduct,
        searchProductCode: rateData.searchProductCode,
        searchProductName: rateData.searchProductName,
        searchAttr: searchVal,
      }),
    };
    setIsMakingRequest(true);
    await API.searchProduct(param).then((res) => {
      setIsMakingRequest(false);
      if (res != null) {
        if (rateData.searchType == 1) {
          setSearchedData(res.rateProductDef);
          setPaginationParams(res);
          setLoadingSearchMessage("");
          setShowTable(true);
          if (
            res?.rateProductDef[0]?.productCode ===
            state?.rateProductSearch?.firstProduct
          ) {
            setPrevFlag(false);
          } else {
            setPrevFlag(true);
          }
          if (
            res?.rateProductDef[0]?.productCode ===
            state?.rateProductSearch?.lastProduct
          ) {
            setNextFlag(false);
          } else {
            setNextFlag(true);
          }
        } else {
          setSearchedData(res.rateProductDef);
          setPaginationParams(res);
          setLoadingSearchMessage("");
          setShowTable(true);
          if (Object.keys(searchVal).length === 0) {
            if (
              res.rateProductDef[0].productCode ===
              state.rateProductSearch.firstProduct
            ) {
              setPrevFlag(false);
            } else {
              setPrevFlag(true);
            }
            if (
              res?.rateProductDef[0]?.productCode ===
              state?.rateProductSearch?.lastProduct
            ) {
              setNextFlag(false);
            } else {
              setNextFlag(true);
            }
          }
          return res;
        }
      }
    });
  };

  const productQuickSelect = (rowData, closeModal?: boolean) => {
    setQuickViewLoadingMsg(Settings.labels.quickViewLoadingMsg);
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setShowQuickSelectTop(value);
    const viewData = { ...state };
    if (rowData) {
      viewData.rateProductSearch.productViewTitle = rowData.productName;
      const params = {
        productCode: rowData.productCode,
        brandCode: brandCode && brandCode.trim(),
        level: rowData.level,
      };
      API.getQuickViewDialog(params).then((res) => {
        if (res) {
          viewData.rateProductSearch.rateProductListView =
            res.productView.rateProductListView;
          setState(viewData);
          setQuickViewLoadingMsg("");
          setShowQuickViewDialogContents(true);
        }
      });
    } else if (closeModal) {
      viewData.rateProductSearch.productViewTitle = "";
      viewData.rateProductSearch.rateProductListView = [];
    }
  };

  const productCodeNameValidation = (event, type) => {
    let validProdCode;
    const updatedList = state;
    if (type == "productCode") {
      validProdCode = Utils.productCodeValidation(event);
      if (validProdCode) {
        if (Utils.isValidProductCode(event.target.value)) {
          updatedList.rateProductSearch.productCode = event.target.value;
          updatedList.rateProductSearch.productName = "";
        } else {
          alert(Settings.alerts.validProductCode);
        }
      } else {
        updatedList.rateProductSearch.productCode = "";
      }
    } else if (type == "productName") {
      validProdCode = Utils.korSafeCharsOnly(event);
      if (validProdCode) {
        updatedList.rateProductSearch.productCode = "";
        updatedList.rateProductSearch.productName = event.target.value;
      }
    }

    setProductData(updatedList);
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

  const KorSafeCharsOnly = (e) => {
    let charCode;
    if (window.event) charCode = e.charCode;
    else if (e.which) charCode = e.which;
    if (charCode == undefined) return true;
    if (
      charCode == 37 ||
      charCode == 95 ||
      charCode == 43 ||
      charCode == 96 ||
      charCode == 126 ||
      charCode == 42 ||
      charCode == 124 ||
      charCode == 13
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const handleProductNameChange = (e) => {
    state.rateProductName = e.target.value;
    setState({
      ...state,
      rateProductName: e.target.value,
    });
    setNewProductName(e.target.value);
    if (e.target.value === "") {
      setMandatoryAlert(true);
    } else {
      setMandatoryAlert(false);
    }
  };

  const setMandatoryAlert = (validCheck) => {
    state.checkAlert = validCheck;
    setState({
      ...state,
      checkAlert: state.checkAlert,
    });
  };

  const setNewProductName = (value) => {
    state.productNewName = value;
    setState({
      ...state,
      productNewName: state.productNewName,
      newRateProductName: state.productNewName,
      checkAlert: state.checkAlert,
    });
  };

  const changeDescription = (id, event) => {
    const productData = { ...state };
    productData.rateProductSearch.rateProductDefinitionGroup.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.description.text[0].value = event.target.value;
        }
      });
    });
    setState(productData);
  };

  const changeBrandList = (id, event) => {
    const productData = { ...state };
    productData.rateProductSearch.rateProductDefinitionGroup.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.brand.value = "Y";
          i.brand.brandCode = event.target.value;
          i.brand.brandName =
            state.rateProductSearch.brandLists[
              [`${event.target.value}`][0]
            ]?.brandName;
          state.rateProductSearch.brandLists[
            [`${event.target.value}`][0]
          ]?.brand.array.forEach((k) => {
            if (k.brandCode == event.target.value) {
              i.brand.brandName = k.brandName;
            }
          });
        }
      });
    });
    setState(productData);
  };

  const changeTypeList = (id, event) => {
    const productData = { ...state };
    productData.rateProductSearch.rateProductDefinitionGroup.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.type.value = "Y";
          i.type.typeCode = event.target.value;
          i.type.typeListName =
            state.rateProductSearch.typeLists[
              [`${event.target.value}`][0]
            ]?.typeListName;
          state.rateProductSearch.typeLists[
            [`${event.target.value}`][0]
          ]?.type.array.forEach((k) => {
            if (k.typeCode == event.target.value) {
              i.type.typeName = k.typeName;
            }
          });
        }
      });
    });
    setState(productData);
  };

  const changeUOMList = (id, event, uomList) => {
    const productData = { ...state };
    productData.rateProductSearch.rateProductDefinitionGroup.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.unitOfMeasure.value = "Y";
          i.unitOfMeasure.UOM_Code = event.target.value;
          uomList &&
            uomList.unitOfMeasure &&
            uomList.unitOfMeasure.forEach((k) => {
              if (event.target.value == k.UOM_Code) {
                i.unitOfMeasure.UOM_Type = k.UOM_Type;
              }
            });
        }
      });
    });
    setState(productData);
  };

  const handleDropChange = (id, event) => {
    const productData = { ...state };
    const maxOccurs =
      productData.rateProductSearch?.rateProductDefinitionList?.maxOccurs;
    const rp_ListName =
      productData.rateProductSearch?.rateProductDefinitionList?.RP_ListName;
    productData.rateProductSearch.rateProductDefinitionGroup.forEach((l) => {
      const selectedValues = l.rateProductDefinition.filter(
        (item) => item.availabilityInd == "Y"
      );
      if (
        event.target.value == "Y" &&
        selectedValues.length >= maxOccurs &&
        maxOccurs >= 0
      ) {
        alert("Only " + maxOccurs + " " + rp_ListName + "can be selected.");
      } else {
        l.rateProductDefinition.filter(function (item) {
          if (id == item.RP_CodeName) {
            item.availabilityInd = event.target.value;
          }
          if (item.availabilityInd == "Y") {
          } else {
            if (item.type != null) item.type.typeCode = null;
          }
        });
      }
    });

    setState(productData);
  };

  const setDefinitionData = (data) => {
    const productData = { ...state };
    productData.rateProductSearch.rateProductDefinitionList =
      data.rateProductDataView?.rateProductDefinitionList;
    productData.rateProductSearch.rateProductDefinitionGroup =
      data.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup;
    productData.rateProductSearch.brandLists =
      data.rateProductDataView?.brandLists;
    productData.rateProductSearch.typeLists =
      data.rateProductDataView?.typeLists;
    productData.rateProductSearch.uomLists = data.rateProductDataView?.uomLists;
    productData.rateProductSearch.rateProductMenu =
      data.rateProductDataView?.rateProductMenu;
    productData.rateProductSearch.nextBtn =
      data.rateProductDataView?.nextMenuOption;
    productData.rateProductSearch.prevBtn =
      data.rateProductDataView?.previousMenuOption;
    setState(productData);
  };

  const setPageProductName = (data) => {
    state.rateProductName = data?.trim();
    state.newRateProductName = data?.trim();
    setState({
      ...state,
      rateProductName: data?.trim(),
      newRateProductName: data?.trim(),
    });
  };

  const saveRateProductDefinition = async (dataObj, productName) => {
    const data = state.rateProductSearch.rateProductDefinitionGroup;
    let strRateProductDefinition = {};
    if (data) {
      data.forEach((l) => {
        l.rateProductDefinition.filter(function (item) {
          Object.assign(strRateProductDefinition, {
            [item.RP_Name + "_" + item.RP_Code]: {
              availabilityInd: item.availabilityInd,
              mustComplete: item.mustComplete,
              quantity: item.quantity,
              typeCode:
                item.type && item.type.typeCode != ""
                  ? item.type.typeCode
                  : null,
              text:
                item.description && item.description.text
                  ? item.description.text[0].value
                  : "",
              UOM_Code:
                item.unitOfMeasure && item.unitOfMeasure.UOM_Code
                  ? item.unitOfMeasure.UOM_Code == "0"
                    ? "0   "
                    : item.unitOfMeasure.UOM_Code
                  : null,
              brandCode:
                item.brand && item.brand.brandCode
                  ? item.brand.brandCode
                  : null,
              typeListName: item.type ? item.type.typeListName : null,
              typeName: item.type ? item.type.typeName : null,
              value: item.type ? item.type.value : null,
              alternateText: item.alternateText,
              unitOfMeasure: item.unitOfMeasure,
              description: item.description,
              supplementaryData: item.supplementaryData,
              RP_GroupName: item.RP_GroupName,
              RP_GroupCode: item.RP_GroupCode,
              RP_CodeName: item.RP_CodeName?.trim(),
              RP_ListCode: item.RP_ListCode,
              RP_ListName: item.RP_ListName,
              RP_Name: item.RP_Name,
              RP_Code: item.RP_Code,
            },
          });
        });
      });
    }
    strRateProductDefinition = JSON.stringify(strRateProductDefinition);
    const serviceDetails = {
      formChg: "Y",
      productCode: dataObj.productCode,
      productName: productName,
      managed: "",
      level: dataObj.level,
      brandCode: dataObj.brandCode,
      entryLevel: dataObj.entryLevel,
    };
    setIsMakingRequest(true);
    await API.updateRateProductData(
      serviceDetails,
      strRateProductDefinition
    ).then((res) => {
      setIsMakingRequest(false);
      if (res !== "") {
        setState({
          ...state,
          rateProductName: res.productName,
        });
        return true;
      } else {
        return false;
      }
    });
  };

  const setRateProductMenu = (data) => {
    const productView = { ...state };
    productView.rateProductSearch.rateProductMenu = data;
    setState(productView);
  };

  const setNextPrevButtons = (data) => {
    const productView = { ...state };
    productView.rateProductSearch.nextBtn = data.nextMenuOption;
    productView.rateProductSearch.prevBtn = data.previousMenuOption;
    setState(productView);
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

  const saveProductDescription = async (productData = null) => {
    const stateData = productData ? productData : { ...createProductState };
    const commonData = { ...commonDataBindState };
    let strRateProductDefinition = {};
    const addDetails = {
      formChg: stateData.formChg,
      brandCode: brandCode,
      brandName: brandName,
      productName: stateData.productName,
      productCode: stateData.productCode,
      managed: stateData.managed,
      level: stateData.level,
      entryLevel: stateData.entryLevel,
    };

    commonData.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup?.filter(
      (itemvalue) => {
        itemvalue.rateProductDefinition?.filter(function (item) {
          if (item.description) {
            item.description.text.filter(function (itemval) {
              Object.assign(strRateProductDefinition, {
                [item.RP_Name + "_" + item.RP_Code]: {
                  availabilityInd: item.availabilityInd,
                  quantity: item.quantity,
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
                quantity: item.quantity,
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
    setIsMakingRequest(true);
    return await API.updateRateProductData(
      addDetails,
      strRateProductDefinition
    ).then((res) => {
      const stateData = { ...createProductState };
      stateData.formChg = "N";
      setCreateProductState(stateData);
      setIsMakingRequest(false);
      return res;
    });
  };

  const setCreateProductData = (data, menudata, titledata) => {
    const productData = { ...createProductState };
    productData.level = data?.level;
    productData.entryLevel = state.entryLevel;
    productData.productCode = data?.productCode;
    productData.productName = data?.productName?.trim();
    productData.managed = titledata?.managed;
    productData.menuData = menudata
      ? menudata
      : titledata?.rateProductDataView.rateProductMenu;
    productData.nextBtn = titledata?.rateProductDataView.nextMenuOption;
    productData.prevBtn = titledata?.rateProductDataView.previousMenuOption;
    productData.title = titledata?.rateProductDataView
      ?.rateProductDefinitionList
      ? titledata?.rateProductDataView?.rateProductDefinitionList?.RP_ListName?.trim()
      : "";
    productData.readOnly = titledata?.readOnly;
    setCreateProductState(productData);
  };
  const setDescriptionData = (data) => {
    const descriptionData = { ...commonDataBindState };
    descriptionData.radio1 = Settings.labels.hotelModifiable;
    descriptionData.rateProductDataView = data.rateProductDataView;
    descriptionData.maxOccurs = descriptionData.rateProductDataView
      ?.rateProductDefinitionList
      ? descriptionData.rateProductDataView?.rateProductDefinitionList
          ?.maxOccurs
      : "";
    descriptionData.minOccurs = descriptionData.rateProductDataView
      ?.rateProductDefinitionList
      ? descriptionData.rateProductDataView?.rateProductDefinitionList
          ?.minOccurs
      : "";

    if (descriptionData.rateProductDataView?.rateProductDefinitionList) {
      if (
        descriptionData.rateProductDataView?.rateProductDefinitionList
          ?.rateProductDefinitionGroup?.length > 0
      ) {
        descriptionData.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup?.filter(
          function (item) {
            item.rateProductDefinition.filter(function (itemval) {
              itemval.value = itemval.brandModifiable == "true" ? true : false;
              itemval.checked =
                itemval.brandModifiable == "true" ? true : false;
              itemval.valueH = itemval.hotelModifiable == "true" ? true : false;
              itemval.checkedH =
                itemval.hotelModifiable == "true" ? true : false;
              itemval.showAvailabilityIndValue =
                item.availabilityInd == "Y" ? true : false;
            });
          }
        );
      }
    }

    setCommonDataBindState(descriptionData);
  };

  const setProductName = (event) => {
    const product = { ...createProductState };
    product.productName = event.target.value?.trim();
    product.formChg = "Y";
    setCreateProductState(product);
  };

  const setProductCode = (productCode) => {
    const product = { ...createProductState };
    product.productCode = productCode;
    setCreateProductState(product);
  };

  const updateProductName = (productName) => {
    const product = { ...createProductState };
    product.productName = productName?.trim();
    setCreateProductState(product);
  };

  const setCommonBindingData = (data) => {
    const dataItem = { ...commonDataBindState };
    dataItem.rateProductDataView = data.rateProductDataView;
    setCommonDataBindState(dataItem);
  };

  const setProductDetails = (data, props, menudata, data1) => {
    const productData = { ...createProductState };
    productData.entryLevel = data?.entryLevel;
    if (data) {
      productData.productName = data?.productName?.trim();
      productData.productCode = data?.productCode;
    } else {
      productData.productName = props?.productName?.trim();
      productData.productCode = props?.productCode;
    }
    productData.menuData = menudata
      ? menudata
      : data1?.rateProductDataView.rateProductMenu;
    productData.title = data1?.rateProductDataView?.rateProductDefinitionList
      ? data1?.rateProductDataView?.rateProductDefinitionList?.RP_ListName?.trim()
      : "";
    productData.nextBtn = data1?.rateProductDataView.nextMenuOption;
    productData.prevBtn = data1?.rateProductDataView.previousMenuOption;
    setCreateProductState(productData);
  };

  const handleModifiableChangeInput = (event, eventType) => {
    const payloadCheckboxDetails = { ...payloadDataState };
    const modifiableData = { ...commonDataBindState };
    const postData = { ...createProductState };
    if (eventType == "brand_modifiable") {
      setBrandCheck(!isBrandChecked);
      postData.formChg = "Y";
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

      modifiableData.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
      postData.formChg = "Y";
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

      modifiableData.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup?.filter(
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
    setCreateProductState(postData);
  };

  const handleShowRestInput = (event, dataItem) => {
    const dropDownData = { ...commonDataBindState };
    const postData = { ...createProductState };
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
          if (dataItem?.RP_CodeName == itemvalue.RP_CodeName) {
            itemvalue.availabilityInd = event.target.value;
            postData.formChg = "Y";
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
    setCreateProductState(postData);
  };
  const handleShowUOMInput = (event) => {
    const commonUOMDetails = { ...commonDataBindState };
    const payloadUOMDetails = { ...payloadDataState };
    const postData = { ...createProductState };
    if (payloadUOMDetails.uOMSelectedList.length > 0) {
      payloadUOMDetails.uOMSelectedList.slice().forEach((item) => {
        Object.keys(item).find((key) => {
          if (key === event.target.id) {
            item[key] = event.target.value;
            postData.formChg = "Y";
          } else {
            payloadUOMDetails.uOMSelectedList.push({
              [`${event.target.id}`]: event.target.value,
            });
            postData.formChg = "Y";
          }
        });
      });
    } else {
      payloadUOMDetails.uOMSelectedList.push({
        [`${event.target.id}`]: event.target.value,
      });
      postData.formChg = "Y";
    }
    commonUOMDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
    setCreateProductState(postData);
  };

  const handleShowTypeInput = (event) => {
    const commonTypeDetails = { ...commonDataBindState };
    const payloadTypeDetails = { ...payloadDataState };
    const postData = { ...createProductState };
    if (payloadTypeDetails.typeSelectedList.length > 0) {
      payloadTypeDetails.typeSelectedList.slice().forEach((item) => {
        Object.keys(item).find((key) => {
          if (key === event.target.id) {
            item[key] = event.target.value;
            postData.formChg = "Y";
          } else {
            payloadTypeDetails.typeSelectedList.push({
              [`${event.target.id}`]: event.target.value,
            });
            postData.formChg = "Y";
          }
        });
      });
    } else {
      payloadTypeDetails.typeSelectedList.push({
        [`${event.target.id}`]: event.target.value,
      });
      postData.formChg = "Y";
    }

    commonTypeDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
    setCreateProductState(postData);
  };

  const handleShowBrandInput = (event) => {
    const commonBrandDetails = { ...commonDataBindState };
    const payloadBrandDetails = { ...payloadDataState };
    const postData = { ...createProductState };
    if (payloadBrandDetails.brandSelectedList.length > 0) {
      payloadBrandDetails.brandSelectedList.slice().forEach((item) => {
        Object.keys(item).find((key) => {
          if (key === event.target.id) {
            item[key] = event.target.value;
            postData.formChg = "Y";
          } else {
            payloadBrandDetails.brandSelectedList.push({
              [`${event.target.id}`]: event.target.value,
            });
            postData.formChg = "Y";
          }
        });
      });
    } else {
      payloadBrandDetails.brandSelectedList.push({
        [`${event.target.id}`]: event.target.value,
      });
      postData.formChg = "Y";
    }

    commonBrandDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
    setCreateProductState(postData);
  };
  const setDescriptionText = (event) => {
    const commonTextDetails = { ...commonDataBindState };
    const postData = { ...createProductState };
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
            postData.formChg = "Y";
          }
        });
      }
    );
    setCommonDataBindState(commonTextDetails);
    setCreateProductState(postData);
  };

  const setModifiableChange = (event) => {
    const commonRadioDetails = { ...commonDataBindState };
    const postData = { ...createProductState };
    commonRadioDetails.radio1 = event.target.value;
    postData.formChg = "Y";
    setCommonDataBindState(commonRadioDetails);
    setCreateProductState(postData);
  };

  const onSelectAll = () => {
    const postData = { ...createProductState };
    postData.formChg = "Y";
    setCreateProductState(postData);
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
    const postData = { ...createProductState };
    postData.formChg = "Y";
    setCreateProductState(postData);
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
    const postData = { ...createProductState };
    postData.formChg = "Y";
    setCreateProductState(postData);
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
      commonBrandDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup?.filter(
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
      commonBrandDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
      commonHotelDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
      commonHotelDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
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
      commonStatusYNDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
        function (itemsYN) {
          itemsYN.rateProductDefinition.map((itemYNValue) => {
            if (itemYNValue.brandModifiable === "true") {
              itemYNValue.availabilityInd = "Y";
            }
          });
        }
      );
    } else if (chgType == Settings.labels.typeUnSelectAll) {
      payloadStatusYNDetails.brandSelectedList = [];
      payloadStatusYNDetails.typeSelectedList = [];
      payloadStatusYNDetails.uOMSelectedList = [];
      commonStatusYNDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup.filter(
        function (itemsYN) {
          itemsYN.rateProductDefinition.map((itemYNValue) => {
            if (itemYNValue.brandModifiable === "true") {
              itemYNValue.availabilityInd = "N";
              if (itemYNValue.unitOfMeasure != null) {
                itemYNValue.unitOfMeasure.UOM_Code = "";
              }
              if (itemYNValue.brand != null) {
                itemYNValue.brand.brandCode = "";
              }
              if (itemYNValue.type != null) {
                itemYNValue.type.typeCode = "";
              }
              if (
                itemYNValue.description != null &&
                itemYNValue.description.text.length > 0
              ) {
                itemYNValue.description.text.map((textItem) => {
                  textItem.value = "";
                });
              }
            }
          });
        }
      );
    } else if (chgType == Settings.labels.typeStatusYN) {
      payloadStatusYNDetails.brandSelectedList = [];
      payloadStatusYNDetails.typeSelectedList = [];
      payloadStatusYNDetails.uOMSelectedList = [];
      commonStatusYNDetails.rateProductDataView?.rateProductDefinitionList?.rateProductDefinitionGroup?.filter(
        function (itemsYN) {
          itemsYN.rateProductDefinition.map((itemYNValue) => {
            if (itemYNValue.brandModifiable === "true") {
              itemYNValue.availabilityInd = " ";
              if (itemYNValue.unitOfMeasure != null) {
                itemYNValue.unitOfMeasure.UOM_Code = "";
              }
              if (itemYNValue.brand != null) {
                itemYNValue.brand.brandCode = "";
              }
              if (itemYNValue.type != null) {
                itemYNValue.type.typeCode = "";
              }
              if (
                itemYNValue.description != null &&
                itemYNValue.description.text.length > 0
              ) {
                itemYNValue.description.text.map((textItem) => {
                  textItem.value = "";
                });
              }
            }
          });
        }
      );
    }
    setCommonDataBindState(commonStatusYNDetails);
    setPayloadDataState(payloadStatusYNDetails);
  };

  const setPaginationParams = (data) => {
    const product = { ...state };
    product.rateProductSearch.lastProduct = data.nendProduct;
    product.rateProductSearch.startProduct = data.searchFirstProduct;
    setState(product);
  };

  const setFirstProduct = (data) => {
    const product = { ...state };
    product.rateProductSearch.firstProduct = data.searchFirstProduct;
    setState(product);
  };

  const setSearchedData = (data) => {
    const product = { ...state };
    product.rateProductSearch.productList = data;
    setState(product);
  };

  const validateProductCode = (e) => {
    if (e.target.value != "") {
      if (!isValidProductCode(e.target.value)) {
        alert(`${Settings.alerts.validProductCode}`);
        return false;
      } else {
        setProductCode(e.target.value);
        return true;
      }
    } else {
      setProductCode(e.target.value);
      return true;
    }
  };

  const isValidProductCode = (strValue) => {
    const re = /^[Pp]\d{5}/;
    return re.test(strValue);
  };

  const ProductCodeCharsOnly = (e) => {
    let charCode;
    if (window.event) charCode = e.charCode;
    else if (e.which) charCode = e.which;
    if (charCode == undefined) return true;
    if (
      !((charCode > 47 && charCode < 58) || charCode == 80 || charCode == 112)
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const brandFormattedRateContext = {
    brandList,
    setBrandList,
    brandCode,
    setBrandCode,
    brandName,
    setBrandName,
    updateBrand,
    clearData,
    getBrandProductData,
    state,
    setState,
    quickViewLoadingMsg,
    setQuickViewLoadingMsg,
    handleChangeInput,
    unSelectAll_Click,
    isAttrChecked,
    setAttrCheck,
    setSearchQuery,
    searchBy_Click,
    search_Click,
    productQuickSelect,
    showQuickSelectTop,
    setShowQuickSelectTop,
    loadingSearchMessage,
    setLoadingSearchMessage,
    showTable,
    setShowTable,
    showQuickViewDialogContents,
    setShowQuickViewDialogContents,
    setRateProductData,
    productCodeNameValidation,
    setProductData,
    KorSafeCharsOnly,
    handleProductNameChange,
    changeDescription,
    changeBrandList,
    changeTypeList,
    changeUOMList,
    handleDropChange,
    setDefinitionData,
    setPageProductName,
    saveRateProductDefinition,
    setRateProductMenu,
    setNextPrevButtons,
    setProductCode,
    isBrandChecked,
    setBrandCheck,
    isHotelChecked,
    setHotelCheck,
    commonDataBindState,
    setCommonDataBindState,
    payloadDataState,
    setPayloadDataState,
    checkMinOccurs,
    saveProductDescription,
    setCreateProductData,
    setDescriptionData,
    setProductName,
    updateProductName,
    setCommonBindingData,
    setProductDetails,
    handleModifiableChangeInput,
    handleShowRestInput,
    handleShowUOMInput,
    handleShowTypeInput,
    setDescriptionText,
    handleShowBrandInput,
    setModifiableChange,
    onSelectAll,
    onUnSelectAll,
    onBlankAll,
    changeStatusYN,
    changeHotel,
    changeBrand,
    createProductState,
    setCreateProductState,
    isFinishAndSave,
    setIsFinishAndSave,
    setPaginationParams,
    setFirstProduct,
    nextFlag,
    setNextFlag,
    prevFlag,
    setPrevFlag,
    setSearchedData,
    handlePrevsNextClick,
    validateProductCode,
    ProductCodeCharsOnly,
    isMakingRequest,
    setIsMakingRequest,
    productCodeChange,
    setProductCodeChange,
  };

  return (
    <BrandFormattedRateContext.Provider value={brandFormattedRateContext}>
      {props.children}
    </BrandFormattedRateContext.Provider>
  );
};
export const BrandFormattedRateContextConsumer =
  BrandFormattedRateContext.Consumer;
export default BrandFormattedRateContext;
