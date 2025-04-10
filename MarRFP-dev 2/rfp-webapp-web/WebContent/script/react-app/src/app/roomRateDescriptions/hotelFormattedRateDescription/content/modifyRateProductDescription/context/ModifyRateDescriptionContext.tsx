import React, { useContext, useEffect, useState } from "react";
import HotelRateProductSelectContext from "../../../context/HotelRateProductSelectContext";

import API from "../service/API";
import Settings from "../static/Settings";

const ModifyRateDescriptionContext = React.createContext({});
export const ModifyRateDescriptionContextProvider = (props) => {
  const selectContext: any = useContext(HotelRateProductSelectContext);
  const [state, setState] = useState({
    inputmarshacode: "",
    hotelName: "",
    productSearchList: [],
    viewDescriptionList: [],
    viewDescriptionText: [],
    channelListObj: [],
    languageListObj: [],
    entryListObj: [],
    defaultChannelselect: [],
    apiParams: {},
    setProductName: "",
    productList: null,
    quickViewProductDef: [],
    rateProductdefinitionLists: [],
    searchAttr: [],
    unSelectedAttr: [],
    definitionList: null,
    rateProductDefinitionGroup: [],
    productDefinitionList: [],
    brandLists: null,
    typeLists: null,
    UOMLists: null,
    lastProduct: null,
    firstProduct: null,
    startProduct: null,
    rateProductCode: "",
    rateProductName: "",
    newRateProductName: "",
  });

  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [formChanage, setFormChange] = useState("N");
  const setdefinitionData = (data) => {
    setState((prevState) => {
      prevState.definitionList = data;
      prevState.rateProductDefinitionGroup =
        data?.rateProductDataView?.rateProductDataView?.rateProductDefinitionGroup;
      prevState.brandLists = data?.rateProductDataView?.brandLists;
      prevState.typeLists = data?.rateProductDataView?.typeLists;
      prevState.UOMLists = data?.rateProductDataView?.uomLists;

      return { ...prevState };
    });
  };

  const setPageProductName = (data) => {
    state.rateProductName = data;
    setState({
      ...state,
      rateProductName: state.rateProductName && state.rateProductName.trim(),
      newRateProductName: state.rateProductName && state.rateProductName.trim(),
    });
  };

  const handleProductNameChange = (e, newName) => {
    setState({
      ...state,
      rateProductName: e.target.value && e.target.value.trim(),
      newRateProductName: e.target.value && e.target.value.trim(),
    });
    setFormChange("Y");
    localStorage.setItem("definitionData", JSON.stringify(state));
    selectContext.setNewProductName(e.target.value);
    if (e.target.value === "") {
      selectContext.setMandatoryAlert(true);
    } else {
      selectContext.setMandatoryAlert(false);
    }
  };

  /**on select of yes Or NO  */
  const handleDropChange = (id, event) => {
    const rateProductDefinitionList = {
      ...state.definitionList.rateProductDataView.rateProductDefinitionList,
    };
    const maxOccurs = rateProductDefinitionList.maxOccurs;
    const rp_ListName = rateProductDefinitionList.RP_ListName;
    const rateProductDefinitionSample = [
      ...state.definitionList.rateProductDataView.rateProductDefinitionList
        .rateProductDefinitionGroup,
    ];
    rateProductDefinitionSample.forEach((l) => {
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
            if (item.type != null) {
              item.type.typeCode = null;
              item.type.value = "N";
            }
            if (item.unitOfMeasure != null) {
              item.unitOfMeasure.UOM_Code = null;
              item.unitOfMeasure.value = "N";
            }
            if (item.brand != null) {
              item.brand.brandCode = null;
              item.brand.value = "N";
            }
            if (item.description != null && item.description.text != null) {
              item.description.text[0].value = "";
            }
          }
        });
      }
    });

    setState((prevState) => {
      prevState.rateProductDefinitionGroup = rateProductDefinitionSample;
      prevState.definitionList.rateProductDataView.rateProductDefinitionList.rateProductDefinitionGroup =
        rateProductDefinitionSample;
      return { ...prevState };
    });
  };

  const changeUOMList = (id, event, uomList) => {
    const rateProductDefinition = [
      ...state.definitionList.rateProductDataView.rateProductDefinitionList
        .rateProductDefinitionGroup,
    ];
    rateProductDefinition.forEach((l) => {
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
    setState((prevState) => {
      prevState.rateProductDefinitionGroup = rateProductDefinition;
      prevState.definitionList.rateProductDataView.rateProductDefinitionList.rateProductDefinitionGroup =
        rateProductDefinition;
      return { ...prevState };
    });
  };

  const changeTypeList = (id, event) => {
    const rateProductDefinition = [
      ...state.definitionList.rateProductDataView.rateProductDefinitionList
        .rateProductDefinitionGroup,
    ];
    rateProductDefinition.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.type.value = "Y";
          i.type.typeCode = event.target.value;
          i.type.typeListName =
            state.typeLists[[`${event.target.value}`][0]]?.typeListName;
          state.typeLists[[`${event.target.value}`][0]]?.type.array.forEach(
            (k) => {
              if (k.typeCode == event.target.value) {
                i.type.typeName = k.typeName;
              }
            }
          );
        }
      });
    });
    setState((prevState) => {
      prevState.rateProductDefinitionGroup = rateProductDefinition;
      prevState.definitionList.rateProductDataView.rateProductDefinitionList.rateProductDefinitionGroup =
        rateProductDefinition;
      return { ...prevState };
    });
  };

  const changeBrandList = (id, event) => {
    const rateProductDefinition = [
      ...state.definitionList.rateProductDataView.rateProductDefinitionList
        .rateProductDefinitionGroup,
    ];
    rateProductDefinition.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.brand.value = "Y";
          i.brand.brandCode = event.target.value;
          i.brand.brandName =
            state.brandLists[[`${event.target.value}`][0]]?.brandName;
          state.brandLists[[`${event.target.value}`][0]]?.brand.array.forEach(
            (k) => {
              if (k.brandCode == event.target.value) {
                i.brand.brandName = k.brandName;
              }
            }
          );
        }
      });
    });
    setState((prevState) => {
      prevState.rateProductDefinitionGroup = rateProductDefinition;
      prevState.definitionList.rateProductDataView.rateProductDefinitionList.rateProductDefinitionGroup =
        rateProductDefinition;
      return { ...prevState };
    });
  };

  const changeDescription = (id, event) => {
    const rateProductDefinition = [
      ...state.definitionList.rateProductDataView.rateProductDefinitionList
        .rateProductDefinitionGroup,
    ];
    rateProductDefinition.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.description.text[0].value = event.target.value;
        }
      });
    });
    setState((prevState) => {
      prevState.rateProductDefinitionGroup = rateProductDefinition;
      prevState.definitionList.rateProductDataView.rateProductDefinitionList.rateProductDefinitionGroup =
        rateProductDefinition;
      return { ...prevState };
    });
  };
  const changeQuantity = (id, event) => {
    const rateProductDefinition = [
      ...state.definitionList.rateProductDataView.rateProductDefinitionList
        .rateProductDefinitionGroup,
    ];
    rateProductDefinition.forEach((l) => {
      l.rateProductDefinition.forEach((i) => {
        if (id == i.RP_CodeName) {
          i.quantity = event.target.value;
        }
      });
    });
    setFormChange("Y");
    setState((prevState) => {
      prevState.rateProductDefinitionGroup = rateProductDefinition;
      prevState.definitionList.rateProductDataView.rateProductDefinitionList.rateProductDefinitionGroup =
        rateProductDefinition;
      return { ...prevState };
    });
  };

  const saveRateProductDefinition = (dataObj, productName) => {
    return new Promise(async (resolve, reject) => {
      const data = state.rateProductDefinitionGroup;
      let strRateProductDefinition = {};
      if (data) {
        data.forEach((l) => {
          l.rateProductDefinition.filter(function (item) {
            Object.assign(strRateProductDefinition, {
              [item.RP_Name + "_" + item.RP_Code]: {
                availabilityInd: item.availabilityInd,
                mustComplete: item.mustComplete,
                quantity: item.availabilityInd == "Y" ? item.quantity : 0,
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
                RP_CodeName: item.RP_CodeName.trim(),
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
        formChg: formChanage,
        productCode: dataObj.productCode,
        productName: productName,
        managed: "",
        level: dataObj.level,
        marshaCode: dataObj.marshaCode,
        brandCode: dataObj.brandCode,
      };
      setIsMakingRequest(true);
      await API.updateRateProductData(
        serviceDetails,
        strRateProductDefinition
      ).then((res) => {
        setIsMakingRequest(false);
        if (res !== "") {
          setFormChange("N");
          setState({
            ...state,
            rateProductName:
              res.productName === "" ? productName : res.productName,
          });
        } else {
          return false;
        }
        resolve(res);
      });
    });
  };

  const setProductSearchList = (data) => {
    setState({
      ...state,
      productSearchList: data,
    });
  };
  const setSearchedData = (data) => {
    setState({
      ...state,
      productList: data,
    });
  };

  const setPaginationParams = (data) => {
    setState({
      ...state,
      lastProduct: data.nendProduct,
      startProduct: data.searchFirstProduct,
    });
  };

  const setfirstProduct = (data) => {
    setState({
      ...state,
      firstProduct: data.searchFirstProduct,
    });
  };

  const setQuickViewProductList = (data) => {
    setState({
      ...state,
      quickViewProductDef: data,
    });
  };
  const setStateParams = (marshaCode, hotelName) => {
    setState({ ...state, inputmarshacode: marshaCode, hotelName: hotelName });
  };

  const setProductAttribute = (data) => {
    setState({
      ...state,
      rateProductdefinitionLists: data,
    });
  };

  const setUnselected = (val) => {
    const tempArr = [...state.unSelectedAttr];
    tempArr.push(val);
    state.unSelectedAttr = tempArr;
    setState({
      ...state,
      unSelectedAttr: state.unSelectedAttr,
    });
  };

  const setSearchAttr = (attrVal, checkedVal) => {
    const temp = [...state.searchAttr];
    temp.push({ selected: attrVal, check: checkedVal });
    let newArr = [];
    newArr = temp.map((obj) => {
      if (obj.selected === attrVal) {
        return { ...obj, check: checkedVal };
      }

      return obj;
    });
    state.searchAttr = newArr;
    setState({
      ...state,
      searchAttr: state.searchAttr,
    });
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

  const isValidProductCode = (strValue) => {
    const re = /^[Pp]\d{5}/;
    return re.test(strValue);
  };

  const handleProductCode = (e) => {
    setState({
      ...state,
      rateProductCode: e.target.value,
    });
  };
  const validateProductCode = (e) => {
    if (e.target.value != "") {
      if (!isValidProductCode(e.target.value)) {
        alert(`${Settings.productNameValidation}`);
        return false;
      } else {
        setState({
          ...state,
          rateProductCode: e.target.value,
        });

        return true;
      }
    } else {
      setState({
        ...state,
        rateProductCode: e.target.value,
      });
    }
  };
  const modifyratedescriptionContext = {
    state,
    setState,
    setStateParams,
    setProductSearchList,
    setSearchedData,
    setProductAttribute,
    setSearchAttr,
    setUnselected,
    setdefinitionData,
    handleDropChange,
    changeUOMList,
    changeTypeList,
    changeBrandList,
    changeDescription,
    saveRateProductDefinition,
    ProductCodeCharsOnly,
    handleProductCode,
    validateProductCode,
    KorSafeCharsOnly,
    setPageProductName,
    handleProductNameChange,
    setPaginationParams,
    setfirstProduct,
    setQuickViewProductList,
    isMakingRequest,
    setIsMakingRequest,
    formChanage,
    setFormChange,
    changeQuantity,
  };

  return (
    <ModifyRateDescriptionContext.Provider value={modifyratedescriptionContext}>
      {props.children}
    </ModifyRateDescriptionContext.Provider>
  );
};
export const ModifyRateDescriptionContextConsumer =
  ModifyRateDescriptionContext.Consumer;
export default ModifyRateDescriptionContext;

export interface IModifyRateDescriptionContext {
  state;
  setState;
  setStateParams;
  setProductSearchList;
  setSearchedData;
  setProductAttribute;
  setSearchAttr;
  setUnselected;
  setdefinitionData;
  handleDropChange;
  changeUOMList;
  changeTypeList;
  changeBrandList;
  changeDescription;
  saveRateProductDefinition;
  ProductCodeCharsOnly;
  handleProductCode;
  validateProductCode;
  KorSafeCharsOnly;
  setPageProductName;
  handleProductNameChange;
  setPaginationParams;
  setfirstProduct;
  setQuickViewProductList;
  formChanage;
  setFormChange;
  changeQuantity;
}
