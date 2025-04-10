import React, { useContext, useState } from "react";
//import API from "../service/API";
import APIEdit from "../service/APIEdit";
import Settings from "../static/Settings";
//import copyData from "../data/copyData.json";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

// Set state variables and function
const UserEditContext = React.createContext({});

export const UserEditContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(true);
  const [state, setState] = useState({
    showScreenLoader: false,
    isSales: false,
    isAllHotels: true, //for Properties
    isProperties: true, //for Properties
    isMFPUser: true, //for Properties
    isMFPSales: false,
    isRegion: false, //for Region
    isBrand: false, //for Brand
    isFranchise: false, //for Franchise
    isAll: false, //for All,
    quickSelectMessage: "",
    prevSelect: "P",
    totNumProp: "",
    totNumUserProp: "",
    totPropPageLen: "",
    totPropSelPageLen: "",

    user: {
      cn_firstname: null,
      cn_lastname: null,
      eid: null,
      companyname: null,
      enhancedReportingChk: "N",
      radioSel: null,
      optSel: null,
      enhancedSalesContact: "N",
      ismae: "N",
      regionFound: "N",
      brandFound: "N",
      franchFound: "N",
      allhotels: "N",
      numHotelItems: 0,
      numRegionItems: 0,
      numBrandItems: 0,
      numFranchiseItem: 0,
      numAllPropItem: 0,
    },
    userArray: {
      hotelList: [],
      hotellistAll: [],
      regions: [],
      hotelBasedRegion: [],
      hotelAffiliations: [],
      hotelBasedOnBrand: [],
      franchiseList: [],
      hotelsBasedOnFranchise: [],
      hotelAllProperties: [],
      fixedAllList: [],
      showScreenLoader: false,
    },
    tempArray: {
      tempSelectPropArr: [],
      tempAvailPropArr: [],
      tempRegionArr: [],
      tempBrandArr: [],
      tempFranArr: [],
    },
    userEditCopyData: {
      totalDialogPages: 0,
      userEditCopyList: [{}],
    },
  });

  const [userDetail, setUserDetail] = useState({
    userid: "",
    role: "",
  });
  const [quickSelection, setQuickSelection] = useState(false);
  const [resetInput, setResetInput] = useState(false);
  const [isChecked, setCheck] = useState(false);
  const [showQuickSelectTop, setshowQuickSelectTop] = useState(false);
  const [showCopyPage, setShowCopyPage] = useState(false);
  const [marshaCodes, setMarshaCodes] = useState(null);
  const [loadingCopyData, setLoadingCopyData] = useState(false);
  const [prevSelAvailProp, setPrevSelAvailProp] = useState();
  const [prevSelSelecProp, setPrevSelSelecProp] = useState();

  const [searchCriteria, setSearchCriteria] = useState({
    userid: "",
    role: "",
    alphaOrderProp: "",
    searchBy: "ALL",
    filterByMorF: 0, //'M', 'F' or 'O'
    strCurrPageProp: {
      page: 1,
      maxpagelen: 10,
    },
    totPropSelPageLen: 1,
    optSel: "P",
  });

  const [pNumber, setPNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(22);
  const [totalSelPages, setTotalSelPages] = useState(1);
  const [eidList, setEidList] = useState("");
  const [availablePNumber, setAvailablePNumber] = useState(1);
  const [selectPNumber, setSelectPNumber] = useState(1);

  const [copySearchCriteria, setCopySearchCriteria] = useState({
    userid: "",
    role: "",
    r_1: "ALL",
    orderby: "1",
    dialogFilterString: "",
    dialogSearchBy: "ALL",
    totalDialogPages: "1",
    strDialogPage: {
      page: 1,
    },
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const onClickSearch = (pageNumber = 1, type) => {
    if (quickSelection) {
      pageNumber = 1;
      setQuickSelection(false);
    }

    const userval = { ...userDetail };
    const searchData = { ...state };
    const searchDetail = { ...searchCriteria };
    setIsLoaded(false);
    if (type == Settings.labels.availPropText) {
      APIEdit.searchAvailPropList(userval, searchCriteria, pageNumber).then(
        (data) => {
          if (data.status == "success") {
            searchData.userArray.hotellistAll = data.hotellistAll;
            setPNumber(pageNumber);
            setTotalPages(data?.totPropPageLen);
            setState(searchData);
            refreshScroll(Settings.ids.hotelListAllId);
            setIsLoaded(true);
          }
        }
      );
    } else if (type == Settings.labels.selectPropText) {
      APIEdit.searchSelectPropList(userval, searchCriteria, pageNumber).then(
        (data) => {
          if (data.status == "success") {
            searchData.userArray.hotelList = data.hotelList;
            setPNumber(pageNumber);
            setState(searchData);
            refreshScroll(Settings.ids.hotelListId);
            setTotalSelPages(data?.totPropSelPageLen);
            setIsLoaded(true);
          }
        }
      );
    } else if (type == "SearchFilter") {
      pageNumber = 1;
      APIEdit.searchPropList(userval, searchCriteria, pageNumber).then(
        (data) => {
          if (data.status == "success") {
            searchData.userArray.hotellistAll = data.hotellistAll;
            setTotalPages(data?.totPropPageLen);
            setState(searchData);
            setPNumber(pageNumber);
            setAvailablePNumber(pageNumber);
            refreshScroll(Settings.ids.hotelListAllId);
            setIsLoaded(true);
          }
        }
      );
    } else if (type == Settings.labels.region) {
      let strRegions = "";
      let selectedRegions = [];

      if (searchData.userArray.regions.length > 0) {
        searchData.userArray.regions.filter(function (item) {
          if (item.checked) {
            strRegions += item.regionid + ",";
          }
        });
      }

      if (strRegions != "") {
        strRegions = strRegions.slice(0, -1);
        selectedRegions = strRegions.split(",");
      }

      sessionStorage.setItem(
        "EnhancedSalesContact",
        searchData.user.enhancedReportingChk == "Y" ? "on" : ""
      );
      let regionParams;
      if (searchData.user.enhancedReportingChk == "Y") {
        regionParams = {
          enhancedSalesContact: "on",
          selectedParams: selectedRegions,
          regFound: "Y",
          braFound: "N",
          fraFound: "N",
          aHotels: "N",
          alphaOrderProp: searchCriteria.alphaOrderProp,
          filterByMorF: searchCriteria.filterByMorF,
          searchBy: searchCriteria.searchBy,
          radioSel: searchData.user.optSel,
          optSel: searchData.user.optSel,
          totPropSelPageLen: searchCriteria.totPropSelPageLen,
        };
      } else {
        regionParams = {
          selectedParams: selectedRegions,
          regFound: "Y",
          braFound: "N",
          fraFound: "N",
          aHotels: "N",
          alphaOrderProp: searchCriteria.alphaOrderProp,
          filterByMorF: searchCriteria.filterByMorF,
          searchBy: searchCriteria.searchBy,
          radioSel: searchData.user.optSel,
          optSel: searchData.user.optSel,
          totPropSelPageLen: searchCriteria.totPropSelPageLen,
        };
      }

      APIEdit.searchSelectRegBrandFranList(
        userval,
        regionParams,
        pageNumber
      ).then((data) => {
        if (data.status == "success") {
          searchData.userArray.hotelBasedRegion = data.hotelList;
          searchData.user.numRegionItems = data.totNumUserProp
            ? data.totNumUserProp
            : 0;
          setPNumber(pageNumber);
          setState(searchData);
          setTotalPages(data?.totPropSelPageLen);
          refreshScroll(Settings.ids.regionId);
          setIsLoaded(true);
        }
      });
    } else if (type == Settings.labels.brand) {
      let strBrands = "";
      let selectedBrands = [];

      if (searchData.userArray.hotelAffiliations.length > 0) {
        searchData.userArray.hotelAffiliations.filter(function (item) {
          if (item.checked) {
            strBrands += item.affiliationid + ",";
          }
        });
      }

      if (strBrands != "") {
        strBrands = strBrands.slice(0, -1);
        selectedBrands = strBrands.split(",");
      }

      sessionStorage.setItem(
        "EnhancedSalesContact",
        searchData.user.enhancedReportingChk == "Y" ? "on" : ""
      );

      let brandParams;
      if (searchData.user.enhancedReportingChk == "Y") {
        brandParams = {
          enhancedSalesContact: "on",
          selectedParams: selectedBrands,
          regFound: "N",
          braFound: "Y",
          fraFound: "N",
          aHotels: "N",
          alphaOrderProp: searchCriteria.alphaOrderProp,
          filterByMorF: searchCriteria.filterByMorF,
          searchBy: searchCriteria.searchBy,
          radioSel: searchData.user.optSel,
          optSel: searchData.user.optSel,
          totPropSelPageLen: searchCriteria.totPropSelPageLen,
        };
      } else {
        brandParams = {
          selectedParams: selectedBrands,
          regFound: "N",
          braFound: "Y",
          fraFound: "N",
          aHotels: "N",
          alphaOrderProp: searchCriteria.alphaOrderProp,
          filterByMorF: searchCriteria.filterByMorF,
          searchBy: searchCriteria.searchBy,
          radioSel: searchData.user.optSel,
          optSel: searchData.user.optSel,
          totPropSelPageLen: searchCriteria.totPropSelPageLen,
        };
      }

      APIEdit.searchSelectRegBrandFranList(
        userval,
        brandParams,
        pageNumber
      ).then((data) => {
        if (data.status == "success") {
          searchData.userArray.hotelBasedOnBrand = data.hotelList;
          searchData.user.numBrandItems = data.totNumUserProp
            ? data.totNumUserProp
            : 0;
          setPNumber(pageNumber);
          setState(searchData);
          setTotalPages(data?.totPropSelPageLen);
          refreshScroll(Settings.ids.hotelBasedOnBrandId);
          setIsLoaded(true);
        }
      });
    } else if (type == Settings.labels.franchise) {
      let strFranchise = "";
      let selectedFranchise = [];

      if (searchData.userArray.franchiseList.length > 0) {
        searchData.userArray.franchiseList.filter(function (item) {
          if (item.checked) {
            strFranchise += item.franchCode + ",";
          }
        });
      }

      if (strFranchise != "") {
        strFranchise = strFranchise.slice(0, -1);
        selectedFranchise = strFranchise.split(",");
      }

      sessionStorage.setItem(
        "EnhancedSalesContact",
        searchData.user.enhancedReportingChk == "Y" ? "on" : ""
      );

      let franchiseParams;
      if (searchData.user.enhancedReportingChk == "Y") {
        franchiseParams = {
          enhancedSalesContact: "on",
          selectedParams: selectedFranchise,
          regFound: "N",
          braFound: "N",
          fraFound: "Y",
          aHotels: "N",
          alphaOrderProp: searchCriteria.alphaOrderProp,
          filterByMorF: searchCriteria.filterByMorF,
          searchBy: searchCriteria.searchBy,
          radioSel: searchData.user.optSel,
          optSel: searchData.user.optSel,
          totPropSelPageLen: searchCriteria.totPropSelPageLen,
        };
      } else {
        franchiseParams = {
          selectedParams: selectedFranchise,
          regFound: "N",
          braFound: "N",
          fraFound: "Y",
          aHotels: "N",
          alphaOrderProp: searchCriteria.alphaOrderProp,
          filterByMorF: searchCriteria.filterByMorF,
          searchBy: searchCriteria.searchBy,
          radioSel: searchData.user.optSel,
          optSel: searchData.user.optSel,
          totPropSelPageLen: searchCriteria.totPropSelPageLen,
        };
      }

      APIEdit.searchSelectRegBrandFranList(
        userval,
        franchiseParams,
        pageNumber
      ).then((data) => {
        if (data.status == "success") {
          searchData.userArray.hotelsBasedOnFranchise = data.hotelList;
          searchData.user.numFranchiseItem = data.totNumUserProp
            ? data.totNumUserProp
            : 0;
          setPNumber(pageNumber);
          setState(searchData);
          setTotalPages(data?.totPropSelPageLen);
          refreshScroll(Settings.ids.hotelsBasedOnFranchiseId);
          setIsLoaded(true);
        }
      });
    }
  };

  const refreshScroll = (id) => {
    const hotellistAllScroll = document.getElementById(id);
    if (hotellistAllScroll) {
      hotellistAllScroll.scrollTop = 0;
    }
  };

  const setHotelData = (data) => {
    if (data) {
      const hotelData = { ...state };
      hotelData.user.optSel = data.optSel;
      hotelData.user.radioSel = data.optSel;
      hotelData.userArray.hotelList = data.hotelList;
      hotelData.userArray.hotellistAll = data.hotellistAll;
      hotelData.userArray.fixedAllList = data.hotellistAll;
      hotelData.userArray.regions = data.regions;
      hotelData.userArray.hotelAffiliations = data.hotelAffiliations;
      hotelData.userArray.franchiseList = data.franchiseList;
      hotelData.user.numHotelItems = data.totNumUserProp
        ? data.totNumUserProp
        : 0;
      hotelData.user.regionFound = data.regionFound;
      hotelData.user.brandFound = data.brandFound;
      hotelData.user.franchFound = data.franchFound;
      hotelData.user.allhotels = data.allHotels;

      if (data.userDetails) {
        hotelData.user.cn_firstname = data.userDetails.cn_firstname;
        hotelData.user.cn_lastname = data.userDetails.cn_lastname;
        hotelData.user.eid = data.userDetails.eid;
        hotelData.user.companyname = data.userDetails.companyname;
        hotelData.user.enhancedReportingChk =
          data.userDetails.ismae == "Y" ? "Y" : "N";
        hotelData.user.ismae = data.userDetails.ismae;
        hotelData.user.enhancedSalesContact =
          data.userDetails.ismae == "Y" ? "Y" : "N";
        sessionStorage.setItem(
          "EnhancedSalesContact",
          data.userDetails.ismae == "Y" ? "Y" : "N"
        );
      }

      if (hotelData.user.optSel == Settings.labels.brandShort) {
        hotelData.isBrand = true;
        hotelData.userArray.hotelBasedOnBrand = data.hotelList;
        hotelData.userArray.hotelAffiliations.filter(
          (brand) =>
            !data.userDetails.affiliationIds.some(function (selectBrand) {
              if (brand.affiliationid == selectBrand) {
                brand.checked = true;
              }
            })
        );
        hotelData.user.numBrandItems =
          hotelData.userArray.hotelBasedOnBrand &&
          hotelData.userArray.hotelBasedOnBrand.length
            ? data.totNumUserProp
            : 0;
      } else {
        hotelData.isBrand = false;
        if (
          hotelData.userArray.hotelAffiliations &&
          hotelData.userArray.hotelAffiliations.length > 0
        ) {
          hotelData.userArray.hotelAffiliations.filter(function (item) {
            item.checked = isChecked;
          });
        }
      }

      if (hotelData.user.optSel == Settings.labels.regionShort) {
        hotelData.isRegion = true;
        hotelData.userArray.hotelBasedRegion = data.hotelList;
        hotelData.userArray.regions.filter(
          (region) =>
            !data.userDetails.regionIds.some(function (selectRegion) {
              if (region.regionid == selectRegion) {
                region.checked = true;
              }
            })
        );
        hotelData.user.numRegionItems =
          hotelData.userArray.hotelBasedRegion &&
          hotelData.userArray.hotelBasedRegion.length
            ? data.totNumUserProp
            : 0;
      } else {
        hotelData.isRegion = false;
        if (
          hotelData.userArray.regions &&
          hotelData.userArray.regions.length > 0
        ) {
          hotelData.userArray.regions.filter(function (item) {
            item.checked = isChecked;
          });
        }
      }

      if (hotelData.user.optSel == Settings.labels.franchiseShort) {
        hotelData.isFranchise = true;
        hotelData.userArray.hotelsBasedOnFranchise = data.hotelList;
        hotelData.userArray.franchiseList.filter(
          (franchise) =>
            !data.userDetails.franchCodes.some(function (selectFranch) {
              if (franchise.franchCode == selectFranch) {
                franchise.checked = true;
              }
            })
        );
        hotelData.user.numFranchiseItem =
          hotelData.userArray.hotelsBasedOnFranchise &&
          hotelData.userArray.hotelsBasedOnFranchise.length
            ? data.totNumUserProp
            : 0;
      } else {
        hotelData.isFranchise = false;
        if (
          hotelData.userArray.franchiseList &&
          hotelData.userArray.franchiseList.length > 0
        ) {
          hotelData.userArray.franchiseList.filter(function (item) {
            item.checked = isChecked;
          });
        }
      }

      if (
        data.userDetails &&
        data.userDetails.allhotels == "Y" &&
        hotelData.user.optSel == Settings.labels.allHotelsShort
      ) {
        hotelData.isAll = true;
        hotelData.userArray.hotelAllProperties = data.hotelList;
        hotelData.user.numAllPropItem = data.totNumUserProp;
      }

      if (hotelData.user.optSel == Settings.labels.propertyShort) {
        hotelData.isProperties = true;
      } else {
        hotelData.isProperties = false;
      }

      hotelData.prevSelect = hotelData.user.optSel;

      if (
        hotelData.userArray.hotelList &&
        hotelData.userArray.hotelList.length > 0
      ) {
        hotelData.userArray.hotelList.filter(function (item) {
          item.checked = isChecked;
        });
      }

      if (
        hotelData.userArray.hotellistAll &&
        hotelData.userArray.hotellistAll.length > 0
      ) {
        hotelData.userArray.hotellistAll.filter(function (item) {
          item.checked = isChecked;
        });
      }

      hotelData.totNumProp = data.totNumProp;
      hotelData.totNumUserProp = data.totNumUserProp;
      hotelData.totPropPageLen = data.totPropPageLen;
      hotelData.totPropSelPageLen = data.totPropSelPageLen;

      setState(hotelData);
      setTotalPages(data.totPropPageLen);
      setTotalSelPages(data?.totPropSelPageLen);
    }
  };

  const handleChangeInput = (event, type) => {
    if (type == "selectProp") {
      handleChangeSelectPropInput(event);
    } else if (type == "availProp") {
      handleChangeAvailPropInput(event);
    } else if (type == "regionProp") {
      handleChangeRegionInput(event);
    } else if (type == "brandProp") {
      handleChangeBrandInput(event);
    } else if (type == "franchiseProp") {
      handleChangeFranchiseInput(event);
    }
  };

  const handleChangeSelectPropInput = (event) => {
    setCheck(!isChecked);
    setPrevSelSelecProp(event.target.id);
    const hotelExchSelectData = { ...state };
    if (hotelExchSelectData.tempArray.tempSelectPropArr.length > 0) {
      if (event.target.checked) {
        if (prevSelSelecProp && event.nativeEvent.shiftKey) {
          const prevSelIndex =
            hotelExchSelectData.userArray.hotelList.findIndex(
              (item) => item.marshaCode == prevSelSelecProp
            );
          const curSelIndex = hotelExchSelectData.userArray.hotelList.findIndex(
            (item) => item.marshaCode == event.target.id
          );
          if (prevSelIndex < curSelIndex) {
            for (let i = prevSelIndex + 1; i <= curSelIndex; i++) {
              hotelExchSelectData.tempArray.tempSelectPropArr.push({
                marshaCode:
                  hotelExchSelectData.userArray.hotelList[i].marshaCode,
                hotelName: hotelExchSelectData.userArray.hotelList[i].hotelName,
                hotelid: 0,
                country: null,
                affiliationid: 0,
                franch_flag: null,
                isbrandextendedstay: null,
                isbrandritzcarlton: null,
                isbrandedition: null,
                address1: null,
                address2: null,
                citycountryzip: null,
                main_phone_incl: null,
                exclude_aer: null,
                breakinrates: null,
                servicetype: null,
                isbrandluxury: null,
                checked: !isChecked,
              });
              hotelExchSelectData.userArray.hotelList.filter(
                (hotel) =>
                  !hotelExchSelectData.tempArray.tempSelectPropArr.some(
                    function (selectProp) {
                      if (
                        hotel.marshaCode ==
                        hotelExchSelectData.userArray.hotelList[i].marshaCode
                      ) {
                        hotel.checked = event.target.checked;
                      }
                    }
                  )
              );
            }
          } else {
            for (let i = curSelIndex; i < prevSelIndex; i++) {
              hotelExchSelectData.tempArray.tempSelectPropArr.push({
                marshaCode:
                  hotelExchSelectData.userArray.hotelList[i].marshaCode,
                hotelName: hotelExchSelectData.userArray.hotelList[i].hotelName,
                hotelid: 0,
                country: null,
                affiliationid: 0,
                franch_flag: null,
                isbrandextendedstay: null,
                isbrandritzcarlton: null,
                isbrandedition: null,
                address1: null,
                address2: null,
                citycountryzip: null,
                main_phone_incl: null,
                exclude_aer: null,
                breakinrates: null,
                servicetype: null,
                isbrandluxury: null,
                checked: !isChecked,
              });
              hotelExchSelectData.userArray.hotelList.filter(
                (hotel) =>
                  !hotelExchSelectData.tempArray.tempSelectPropArr.some(
                    function (selectProp) {
                      if (
                        hotel.marshaCode ==
                        hotelExchSelectData.userArray.hotelList[i].marshaCode
                      ) {
                        hotel.checked = event.target.checked;
                      }
                    }
                  )
              );
            }
          }
        } else {
          hotelExchSelectData.tempArray.tempSelectPropArr.push({
            marshaCode: event.target.id,
            hotelName: event.target.name,
            hotelid: 0,
            country: null,
            affiliationid: 0,
            franch_flag: null,
            isbrandextendedstay: null,
            isbrandritzcarlton: null,
            isbrandedition: null,
            address1: null,
            address2: null,
            citycountryzip: null,
            main_phone_incl: null,
            exclude_aer: null,
            breakinrates: null,
            servicetype: null,
            isbrandluxury: null,
            checked: !isChecked,
          });
        }
      } else {
        hotelExchSelectData.tempArray.tempSelectPropArr =
          hotelExchSelectData.tempArray.tempSelectPropArr.filter(function (
            item
          ) {
            return item.marshaCode !== event.target.id;
          });
      }
    } else {
      hotelExchSelectData.tempArray.tempSelectPropArr.push({
        marshaCode: event.target.id,
        hotelName: event.target.name,
        hotelid: 0,
        country: null,
        affiliationid: 0,
        franch_flag: null,
        isbrandextendedstay: null,
        isbrandritzcarlton: null,
        isbrandedition: null,
        address1: null,
        address2: null,
        citycountryzip: null,
        main_phone_incl: null,
        exclude_aer: null,
        breakinrates: null,
        servicetype: null,
        isbrandluxury: null,
        checked: !isChecked,
      });
    }

    hotelExchSelectData.userArray.hotelList.filter(
      (hotel) =>
        !hotelExchSelectData.tempArray.tempSelectPropArr.some(function (
          selectProp
        ) {
          if (hotel.marshaCode == event.target.id) {
            hotel.checked = event.target.checked;
          }
        })
    );

    setState(hotelExchSelectData);
  };

  const handleChangeAvailPropInput = (event) => {
    setCheck(!isChecked);
    setPrevSelAvailProp(event.target.id);
    const hotelExchAvailData = { ...state };
    if (hotelExchAvailData.tempArray.tempAvailPropArr.length > 0) {
      if (event.target.checked) {
        if (prevSelAvailProp && event.nativeEvent.shiftKey) {
          const prevSelIndex =
            hotelExchAvailData.userArray.hotellistAll.findIndex(
              (item) => item.marshaCode == prevSelAvailProp
            );
          const curSelIndex =
            hotelExchAvailData.userArray.hotellistAll.findIndex(
              (item) => item.marshaCode == event.target.id
            );
          if (prevSelIndex < curSelIndex) {
            for (let i = prevSelIndex + 1; i <= curSelIndex; i++) {
              hotelExchAvailData.tempArray.tempAvailPropArr.push({
                marshaCode:
                  hotelExchAvailData.userArray.hotellistAll[i].marshaCode,
                hotelName:
                  hotelExchAvailData.userArray.hotellistAll[i].hotelName,
                hotelid: 0,
                country: null,
                affiliationid: 0,
                franch_flag: null,
                isbrandextendedstay: null,
                isbrandritzcarlton: null,
                isbrandedition: null,
                address1: null,
                address2: null,
                citycountryzip: null,
                main_phone_incl: null,
                exclude_aer: null,
                breakinrates: null,
                servicetype: null,
                isbrandluxury: null,
                checked: !isChecked,
              });
              hotelExchAvailData.userArray.hotellistAll.filter(
                (hotel) =>
                  !hotelExchAvailData.tempArray.tempAvailPropArr.some(function (
                    availProp
                  ) {
                    if (
                      hotel.marshaCode ==
                      hotelExchAvailData.userArray.hotellistAll[i].marshaCode
                    ) {
                      hotel.checked = event.target.checked;
                    }
                  })
              );
            }
          } else {
            for (let i = curSelIndex; i < prevSelIndex; i++) {
              hotelExchAvailData.tempArray.tempAvailPropArr.push({
                marshaCode:
                  hotelExchAvailData.userArray.hotellistAll[i].marshaCode,
                hotelName:
                  hotelExchAvailData.userArray.hotellistAll[i].hotelName,
                hotelid: 0,
                country: null,
                affiliationid: 0,
                franch_flag: null,
                isbrandextendedstay: null,
                isbrandritzcarlton: null,
                isbrandedition: null,
                address1: null,
                address2: null,
                citycountryzip: null,
                main_phone_incl: null,
                exclude_aer: null,
                breakinrates: null,
                servicetype: null,
                isbrandluxury: null,
                checked: !isChecked,
              });
              hotelExchAvailData.userArray.hotellistAll.filter(
                (hotel) =>
                  !hotelExchAvailData.tempArray.tempAvailPropArr.some(function (
                    availProp
                  ) {
                    if (
                      hotel.marshaCode ==
                      hotelExchAvailData.userArray.hotellistAll[i].marshaCode
                    ) {
                      hotel.checked = event.target.checked;
                    }
                  })
              );
            }
          }
        } else {
          hotelExchAvailData.tempArray.tempAvailPropArr.push({
            marshaCode: event.target.id,
            hotelName: event.target.name,
            hotelid: 0,
            country: null,
            affiliationid: 0,
            franch_flag: null,
            isbrandextendedstay: null,
            isbrandritzcarlton: null,
            isbrandedition: null,
            address1: null,
            address2: null,
            citycountryzip: null,
            main_phone_incl: null,
            exclude_aer: null,
            breakinrates: null,
            servicetype: null,
            isbrandluxury: null,
            checked: !isChecked,
          });
        }
      } else {
        hotelExchAvailData.tempArray.tempAvailPropArr =
          hotelExchAvailData.tempArray.tempAvailPropArr.filter(function (item) {
            return item.marshaCode !== event.target.id;
          });
      }
    } else {
      hotelExchAvailData.tempArray.tempAvailPropArr.push({
        marshaCode: event.target.id,
        hotelName: event.target.name,
        hotelid: 0,
        country: null,
        affiliationid: 0,
        franch_flag: null,
        isbrandextendedstay: null,
        isbrandritzcarlton: null,
        isbrandedition: null,
        address1: null,
        address2: null,
        citycountryzip: null,
        main_phone_incl: null,
        exclude_aer: null,
        breakinrates: null,
        servicetype: null,
        isbrandluxury: null,
        checked: !isChecked,
      });
    }

    hotelExchAvailData.userArray.hotellistAll.filter(
      (hotel) =>
        !hotelExchAvailData.tempArray.tempAvailPropArr.some(function (
          availProp
        ) {
          if (hotel.marshaCode == event.target.id) {
            hotel.checked = event.target.checked;
          }
        })
    );

    setState(hotelExchAvailData);
  };

  const handleChangeRegionInput = (event) => {
    setCheck(!isChecked);
    const hotelExchRegionData = { ...state };
    if (hotelExchRegionData.tempArray.tempRegionArr.length > 0) {
      if (event.target.checked) {
        hotelExchRegionData.tempArray.tempRegionArr.push({
          regionid: event.target.id,
          regionname: event.target.name,
          regionstatus: null,
          checked: !isChecked,
        });
      } else {
        hotelExchRegionData.tempArray.tempRegionArr.filter(function (item) {
          if (item.regionid == event.target.id) {
            item.checked = event.target.checked;
          }
        });
      }
    } else {
      hotelExchRegionData.tempArray.tempRegionArr.push({
        regionid: event.target.id,
        regionname: event.target.name,
        regionstatus: null,
        checked: !isChecked,
      });
    }

    hotelExchRegionData.userArray.regions.filter(
      (r) =>
        !hotelExchRegionData.tempArray.tempRegionArr.some(function (tempReg) {
          if (r.regionid == event.target.id) {
            r.checked = event.target.checked;
          }
        })
    );

    hotelExchRegionData.userArray.hotelBasedRegion.filter(
      (region) =>
        !hotelExchRegionData.tempArray.tempRegionArr.some(function (
          regionProp
        ) {
          if (region.regionid == event.target.id) {
            region.checked = event.target.checked;
          }
        })
    );

    setState(hotelExchRegionData);
  };

  const handleChangeBrandInput = (event) => {
    setCheck(!isChecked);
    const hotelExchBrandData = { ...state };
    if (hotelExchBrandData.tempArray.tempBrandArr.length > 0) {
      if (event.target.checked) {
        hotelExchBrandData.tempArray.tempBrandArr.push({
          affiliationid: event.target.id,
          affiliationname: event.target.name,
          affiliationstatus: null,
          checked: !isChecked,
        });
      } else {
        hotelExchBrandData.tempArray.tempBrandArr.filter(function (item) {
          if (item.affiliationid == event.target.id) {
            item.checked = event.target.checked;
          }
        });
      }
    } else {
      hotelExchBrandData.tempArray.tempBrandArr.push({
        affiliationid: event.target.id,
        affiliationname: event.target.name,
        affiliationstatus: null,
        checked: !isChecked,
      });
    }

    hotelExchBrandData.userArray.hotelAffiliations.filter(
      (b) =>
        !hotelExchBrandData.tempArray.tempBrandArr.some(function (tempBrand) {
          if (b.affiliationid == event.target.id) {
            b.checked = event.target.checked;
          }
        })
    );

    hotelExchBrandData.userArray.hotelAffiliations.filter(
      (brand) =>
        !hotelExchBrandData.tempArray.tempBrandArr.some(function (brandProp) {
          if (brand.affiliationid == event.target.id) {
            brand.checked = event.target.checked;
          }
        })
    );

    setState(hotelExchBrandData);
  };

  const handleChangeFranchiseInput = (event) => {
    setCheck(!isChecked);
    const hotelExchFranData = { ...state };
    if (hotelExchFranData.tempArray.tempFranArr.length > 0) {
      if (event.target.checked) {
        hotelExchFranData.tempArray.tempFranArr.push({
          franchName: event.target.name,
          franchCode: event.target.id,
          epicId: event.target.value,
          address: null,
          city: null,
          country: null,
          zip: null,
          phone: null,
          franchisestatus: null,
          checked: !isChecked,
        });
      } else {
        hotelExchFranData.tempArray.tempFranArr =
          hotelExchFranData.tempArray.tempFranArr.filter(function (item) {
            return item.franchCode !== event.target.id;
          });
      }
    } else {
      hotelExchFranData.tempArray.tempFranArr.push({
        franchName: event.target.name,
        franchCode: event.target.id,
        epicId: event.target.value,
        address: null,
        city: null,
        country: null,
        zip: null,
        phone: null,
        franchisestatus: null,
        checked: !isChecked,
      });
    }

    hotelExchFranData.userArray.franchiseList.filter(
      (f) =>
        !hotelExchFranData.tempArray.tempFranArr.some(function (tempFran) {
          if (f.franchCode == event.target.id) {
            f.checked = event.target.checked;
          }
        })
    );

    hotelExchFranData.userArray.hotelsBasedOnFranchise.filter(
      (franchise) =>
        !hotelExchFranData.tempArray.tempFranArr.some(function (franchiseProp) {
          if (franchise.franchCode == event.target.id) {
            franchise.checked = event.target.checked;
          }
        })
    );

    setState(hotelExchFranData);
  };

  const hotelsUpdateProp = (data) => {
    let strHotelUpdate = "";
    setIsLoaded(false);
    const hotelUpdateData = { ...state };
    if (hotelUpdateData.userArray.hotelList.length > 0) {
      if (hotelUpdateData.tempArray.tempAvailPropArr.length > 0) {
        hotelUpdateData.tempArray.tempAvailPropArr.filter((item) =>
          hotelUpdateData.userArray.hotelList.push(item)
        );
      }
    } else {
      hotelUpdateData.userArray.hotelList =
        hotelUpdateData.tempArray.tempAvailPropArr;
    }

    if (hotelUpdateData.tempArray.tempAvailPropArr.length > 0) {
      hotelUpdateData.userArray.hotellistAll =
        hotelUpdateData.userArray.hotellistAll.filter(
          (hotel) =>
            !hotelUpdateData.tempArray.tempAvailPropArr.some(
              (availProp) => hotel.marshaCode === availProp.marshaCode
            )
        );
    }

    if (hotelUpdateData.userArray.hotellistAll.length > 0) {
      hotelUpdateData.userArray.hotellistAll.filter(function (item) {
        item.checked = false;
      });
    }

    if (hotelUpdateData.userArray.hotelList.length > 0) {
      hotelUpdateData.userArray.hotelList.filter(function (item) {
        item.checked = false;
        strHotelUpdate += item.marshaCode + ",";
      });
    }

    hotelUpdateData.tempArray.tempSelectPropArr = [];
    hotelUpdateData.tempArray.tempAvailPropArr = [];

    strHotelUpdate = strHotelUpdate.slice(0, -1);
    const strHotelToArr = strHotelUpdate ? strHotelUpdate.split(",") : [];
    const updateParams = setParamsForProp(
      strHotelToArr,
      "P",
      "N",
      "N",
      "N",
      "N"
    );

    APIEdit.updatePropertyList(updateParams).then((data) => {
      if (data && data !== "error") {
        hotelUpdateData.totNumProp = data.totNumProp;
        hotelUpdateData.totPropPageLen = data.totPropPageLen;
        hotelUpdateData.userArray.hotellistAll = data.hotellistAll;

        setSearchCriteria({
          ...searchCriteria,
          strCurrPageProp: {
            page: availablePNumber,
            maxpagelen: data.totPropPageLen,
          },
        });
        setTotalPages(data.totPropPageLen);
        setPNumber(availablePNumber);
        setState(hotelUpdateData);
        APIEdit.updateSelectPropList(updateParams).then((data) => {
          if (data.status == "success") {
            hotelUpdateData.totNumUserProp = data.totNumUserProp;
            hotelUpdateData.totPropSelPageLen = data.totPropSelPageLen;
            hotelUpdateData.userArray.hotelList = data.hotelList;
            hotelUpdateData.user.numHotelItems =
              data.totNumUserProp && data.hotelList ? data.totNumUserProp : 0;

            setSearchCriteria({
              ...searchCriteria,
              strCurrPageProp: {
                page: selectPNumber,
                maxpagelen: data.totPropSelPageLen,
              },
            });
            setIsLoaded(true);
            refreshScroll(Settings.ids.hotelListAllId);
            setTotalSelPages(data?.totPropSelPageLen);
            setPNumber(selectPNumber);
            setState(hotelUpdateData);
          }
        });
      } else {
        setIsLoaded(true);
      }
    });
  };

  const hotelsDeleteProp = (data) => {
    let strHotelDelete = "";
    const hotelDeleteData = { ...state };
    if (hotelDeleteData.userArray.hotellistAll.length > 0) {
      if (hotelDeleteData.tempArray.tempSelectPropArr.length > 0) {
        hotelDeleteData.tempArray.tempSelectPropArr.filter((item) =>
          hotelDeleteData.userArray.hotellistAll.push(item)
        );
      }
    } else {
      hotelDeleteData.userArray.hotellistAll =
        hotelDeleteData.tempArray.tempSelectPropArr;
    }

    if (hotelDeleteData.tempArray.tempSelectPropArr.length > 0) {
      hotelDeleteData.userArray.hotelList =
        hotelDeleteData.userArray.hotelList.filter(
          (hotel) =>
            !hotelDeleteData.tempArray.tempSelectPropArr.some(
              (selectProp) => hotel.marshaCode === selectProp.marshaCode
            )
        );
    }

    if (hotelDeleteData.userArray.hotelList.length > 0) {
      hotelDeleteData.userArray.hotelList.filter(function (item) {
        item.checked = false;
      });
    }

    if (hotelDeleteData.userArray.hotellistAll.length > 0) {
      hotelDeleteData.userArray.hotellistAll.filter(function (item) {
        item.checked = false;
        strHotelDelete += item.marshaCode + ",";
      });
      hotelDeleteData.user.numHotelItems =
        hotelDeleteData.userArray.hotelList.length;
    }

    hotelDeleteData.tempArray.tempSelectPropArr = [];
    hotelDeleteData.tempArray.tempAvailPropArr = [];

    strHotelDelete = strHotelDelete.slice(0, -1);
    const strHotelToArr = strHotelDelete.split(",");
    const deleteParams = setParamsForProp(
      strHotelToArr,
      "P",
      "N",
      "N",
      "N",
      "N"
    );

    APIEdit.deletePropertyList(deleteParams).then((data) => {
      if (data.status == "success") {
        hotelDeleteData.totNumProp = data.totNumProp;
        hotelDeleteData.totPropPageLen = data.totPropPageLen;
        hotelDeleteData.userArray.hotellistAll = data.hotellistAll;
        setTotalPages(data.totPropPageLen);
        APIEdit.updateSelectPropList(deleteParams).then((data) => {
          if (data.status == "success") {
            hotelDeleteData.totNumUserProp = data.totNumUserProp;
            hotelDeleteData.totPropSelPageLen = data.totPropSelPageLen;
            hotelDeleteData.userArray.hotelList = data.hotelList;
            hotelDeleteData.user.numHotelItems =
              data.totNumUserProp && data.hotelList ? data.totNumUserProp : 0;
            setState(hotelDeleteData);
            setTotalSelPages(data?.totPropSelPageLen);
          }
        });
      }
    });
  };

  const hotelsUnSelectAll = (data) => {
    const hotelUnselectData = { ...state };
    if (hotelUnselectData.userArray.hotellistAll.length > 0) {
      hotelUnselectData.userArray.hotellistAll.filter(function (item) {
        item.checked = false;
      });
    }
    hotelUnselectData.tempArray.tempAvailPropArr = [];
    setState(hotelUnselectData);
  };

  const hotelsSelectAll = (data) => {
    const hotelSelectData = { ...state };
    if (hotelSelectData.userArray.hotellistAll.length > 0) {
      hotelSelectData.userArray.hotellistAll.filter(function (item) {
        item.checked = true;
      });
    }
    hotelSelectData.tempArray.tempAvailPropArr =
      hotelSelectData.userArray.hotellistAll;
    setState(hotelSelectData);
  };

  const hotelsQuickSelect = (closeModal?: boolean) => {
    setQuickSelection(true);
    const value = closeModal ? !showQuickSelectTop : showQuickSelectTop;
    setshowQuickSelectTop(value);
  };

  const saveQuickSelect = (data) => {
    let tempSelectArray = [];
    let selectArray = null;
    const hotelData = { ...state };
    if (data) {
      data = data.replace(/[^a-zA-Z,]/g, "");
      const re = /^[a-zA-Z\,]/;
      if (!re.test(data)) {
        alert(Settings.alerts.onlyCommaSeperated);
      } else if (data.length > 600) {
        alert(Settings.alerts.enterHundredHotelsOnly);
      } else {
        tempSelectArray = data.toUpperCase().split(",");
        hotelData.userArray.hotellistAll = [];
        hotelData.userArray.showScreenLoader = true;
        const userval = { ...userDetail };
        const qucikSelectParam = {
          thelist: data.toUpperCase(),
          userid: userval.userid,
          role: userval.role,
        };

        APIEdit.populatePropList(qucikSelectParam).then((data) => {
          selectArray = [];
          if (data.hotellistAll?.length > 0) {
            data.hotellistAll.filter((item) =>
              tempSelectArray.some(function (quickSelectItem) {
                const alreadyPresent = selectArray.filter(
                  (d) => d.marshaCode == item.marshaCode
                );
                if (
                  item.marshaCode == quickSelectItem &&
                  alreadyPresent &&
                  alreadyPresent.length == 0
                ) {
                  selectArray.push(item);
                }
              })
            );
          }
          hotelData.userArray.hotellistAll = selectArray;
          hotelData.userArray.showScreenLoader = false;
          if (data.notfound && data.notfound === "") {
            hotelData.quickSelectMessage = "";
            sessionStorage.setItem("LSquickSelectMessage", "");
          } else {
            hotelData.quickSelectMessage = data.notfound;
            sessionStorage.setItem("LSquickSelectMessage", data.notfound);
          }

          setState(hotelData);
        });
      }
    }
    hotelsQuickSelect(true);
  };

  const setPropertyType = (type) => {
    let msg;
    const hotelData = { ...state };
    hotelData.prevSelect = hotelData.user.radioSel;
    if (type == "Property") {
      hotelData.isProperties = true;
      hotelData.isBrand = false;
      hotelData.isRegion = false;
      hotelData.isFranchise = false;
      hotelData.isAll = false;
      hotelData.user.optSel = "P";
      hotelData.user.radioSel = "P";
      msg = Settings.alerts.switchToProperty;
      if (confirm(msg)) {
        prop_onClick(msg, hotelData.user.radioSel, hotelData.user.optSel);
      } else {
        return false;
      }
    }
    if (type == "Region") {
      hotelData.user.optSel = "R";
      hotelData.user.radioSel = "R";
      hotelData.userArray.hotelList = [];
      hotelData.userArray.hotellistAll = [];
      hotelData.userArray.hotellistAll = hotelData.userArray.fixedAllList;
      msg = Settings.alerts.switchToRegion;
      if (confirm(msg)) {
        region_onClick(msg, hotelData.user.radioSel, hotelData.user.optSel);
      } else {
        return false;
      }
    }
    if (type == "Brand") {
      hotelData.user.optSel = "B";
      hotelData.user.radioSel = "B";
      hotelData.userArray.hotelList = [];
      hotelData.userArray.hotellistAll = [];
      hotelData.userArray.hotellistAll = hotelData.userArray.fixedAllList;
      msg = Settings.alerts.switchToBrand;
      if (confirm(msg)) {
        brand_onClick(msg, hotelData.user.radioSel, hotelData.user.optSel);
      } else {
        return false;
      }
    }
    if (type == "Franchise") {
      hotelData.user.optSel = "F";
      hotelData.user.radioSel = "F";
      hotelData.userArray.hotelList = [];
      hotelData.userArray.hotellistAll = [];
      hotelData.userArray.hotellistAll = hotelData.userArray.fixedAllList;
      msg = Settings.alerts.switchToFranchise;
      if (confirm(msg)) {
        franchise_onClick(msg, hotelData.user.radioSel, hotelData.user.optSel);
      } else {
        return false;
      }
    }
    if (type == "All") {
      hotelData.user.optSel = "H";
      hotelData.user.radioSel = "H";
      msg = Settings.alerts.switchToAllProperties;
      if (confirm(msg)) {
        allHotels_onClick(msg, hotelData.user.radioSel, hotelData.user.optSel);
      } else {
        return false;
      }
    }
    hotelData.isAllHotels = true;
    hotelData.user.radioSel = hotelData.user.optSel;
    setState(hotelData);
  };

  const setEnhancedReporting = (event) => {
    const hotelUserData = { ...state.user };
    const enhancedChk = event.target.checked == true ? "Y" : "N";
    hotelUserData.enhancedReportingChk = enhancedChk;
    sessionStorage.setItem("EnhancedSalesContact", enhancedChk);
    setState({
      ...state,
      user: hotelUserData,
    });
  };

  const resetProperties = () => {
    const hotelResetPropertiesData = { ...state };
    const params = setParamsForReset(
      hotelResetPropertiesData.user.radioSel,
      "N",
      "N",
      "N",
      "N"
    );
    APIEdit.updateSelectPropList(params).then((data) => {
      if (data) {
        hotelResetPropertiesData.userArray.hotelList = data.hotelList;
        if (hotelResetPropertiesData.userArray.hotelList.length > 0) {
          hotelResetPropertiesData.userArray.hotelList.filter(function (item) {
            item.checked = false;
          });
        }
        hotelResetPropertiesData.isProperties = true;
        hotelResetPropertiesData.isBrand = false;
        hotelResetPropertiesData.isRegion = false;
        hotelResetPropertiesData.isFranchise = false;
        hotelResetPropertiesData.isAll = false;
        hotelResetPropertiesData.userArray.hotelBasedRegion = [];
        hotelResetPropertiesData.user.numRegionItems = 0;
        setState(hotelResetPropertiesData);
      }
    });
  };

  const resetRegion = () => {
    const hotelResetRegionData = { ...state };
    const params = setParamsForReset(
      hotelResetRegionData.user.radioSel,
      "N",
      "N",
      "N",
      "N"
    );

    APIEdit.resetRegionList(params).then((data) => {
      if (data.status == "success") {
        if (hotelResetRegionData.userArray.regions.length > 0) {
          hotelResetRegionData.userArray.regions.filter(function (item) {
            item.checked = false;
          });
        }
        hotelResetRegionData.isProperties = false;
        hotelResetRegionData.isBrand = false;
        hotelResetRegionData.isRegion = true;
        hotelResetRegionData.isFranchise = false;
        hotelResetRegionData.isAll = false;
        hotelResetRegionData.userArray.hotelBasedRegion = [];
        hotelResetRegionData.user.numRegionItems = 0;
        hotelResetRegionData.totPropSelPageLen = "1";
        setPNumber(1);
        setResetInput(true);
        setState(hotelResetRegionData);
      }
    });
  };

  const resetBrand = () => {
    const hotelResetBrandData = { ...state };
    const params = setParamsForReset(
      hotelResetBrandData.user.radioSel,
      "N",
      "N",
      "N",
      "N"
    );

    APIEdit.resetBrandList(params).then((data) => {
      if (data.status == "success") {
        if (hotelResetBrandData.userArray.hotelAffiliations.length > 0) {
          hotelResetBrandData.userArray.hotelAffiliations.filter(function (
            item
          ) {
            item.checked = false;
          });
        }
        hotelResetBrandData.isProperties = false;
        hotelResetBrandData.isBrand = true;
        hotelResetBrandData.isRegion = false;
        hotelResetBrandData.isFranchise = false;
        hotelResetBrandData.isAll = false;
        hotelResetBrandData.userArray.hotelBasedOnBrand = [];
        hotelResetBrandData.user.numBrandItems = 0;
        hotelResetBrandData.totPropSelPageLen = "1";
        setPNumber(1);
        setResetInput(true);
        setState(hotelResetBrandData);
      }
    });
  };

  const resetFranchise = () => {
    const hotelResetFranchiseData = { ...state };
    const params = setParamsForReset(
      hotelResetFranchiseData.user.radioSel,
      "N",
      "N",
      "N",
      "N"
    );

    APIEdit.resetFranchiseList(params).then((data) => {
      if (data.status == "success") {
        if (hotelResetFranchiseData.userArray.franchiseList.length > 0) {
          hotelResetFranchiseData.userArray.franchiseList.filter(function (
            item
          ) {
            item.checked = false;
          });
        }
        hotelResetFranchiseData.isProperties = false;
        hotelResetFranchiseData.isBrand = false;
        hotelResetFranchiseData.isRegion = false;
        hotelResetFranchiseData.isFranchise = true;
        hotelResetFranchiseData.isAll = false;
        hotelResetFranchiseData.userArray.hotelsBasedOnFranchise = [];
        hotelResetFranchiseData.user.numFranchiseItem = 0;
        hotelResetFranchiseData.totPropSelPageLen = "1";

        setPNumber(1);
        setResetInput(true);
        setState(hotelResetFranchiseData);
      }
    });
  };

  const updateRegion = (data, calledFrom) => {
    setIsLoaded(false);
    const regionData = { ...state };
    let strRegions = "";
    let selectedRegions = [];
    const radioSelected = regionData.user.radioSel;

    if (regionData.userArray.regions.length > 0) {
      regionData.userArray.regions.filter(function (item) {
        if (item.checked) {
          strRegions += item.regionid + ",";
        }
      });
    }

    if (strRegions != "") {
      strRegions = strRegions.slice(0, -1);
      selectedRegions = strRegions.split(",");
    }

    const params = setParamsForUpdate(
      selectedRegions,
      radioSelected,
      "Y",
      "N",
      "N",
      "N"
    );

    APIEdit.updateRegionList(params).then((data) => {
      if (data) {
        regionData.userArray.hotelBasedRegion = data.hotelList
          ? data.hotelList
          : [];
        regionData.user.numRegionItems = data.totNumUserProp;
        regionData.user.radioSel = data.optSel;
        regionData.user.optSel = data.optSel;
        regionData.totPropSelPageLen = data.totPropSelPageLen;
        if (calledFrom == Settings.labels.allValue) {
          regionData.isFranchise = false;
          regionData.isBrand = false;
          regionData.isProperties = false;
          regionData.isRegion = false;
          regionData.isAll = true;
        } else {
          regionData.isFranchise = false;
          regionData.isBrand = false;
          regionData.isProperties = false;
          regionData.isAll = false;
        }
        setState(regionData);
        setIsLoaded(true);
        refreshScroll(Settings.ids.regionDivId);
        refreshScroll(Settings.ids.regionId);
        if (calledFrom == Settings.labels.brand) {
          resetBrand();
        } else if (calledFrom == Settings.labels.franchise) {
          resetFranchise();
        }
      }
    });
  };

  const updateBrand = (data, calledFrom) => {
    setIsLoaded(false);
    const brandData = { ...state };
    const radioSelected = brandData.user.radioSel;
    let strBrands = "";
    let selectedBrands = [];

    if (brandData.userArray.hotelAffiliations.length > 0) {
      brandData.userArray.hotelAffiliations.filter(function (item) {
        if (item.checked) {
          strBrands += item.affiliationid + ",";
        }
      });
    }

    if (strBrands != "") {
      strBrands = strBrands.slice(0, -1);
      selectedBrands = strBrands.split(",");
    }

    const params = setParamsForUpdate(
      selectedBrands,
      radioSelected,
      "N",
      "N",
      "N",
      "N"
    );

    APIEdit.updateBrandList(params).then((data) => {
      if (data) {
        brandData.userArray.hotelBasedOnBrand = data.hotelList;
        brandData.user.numBrandItems = data.totNumUserProp;
        brandData.user.radioSel = data.optSel;
        brandData.user.optSel = data.optSel;
        brandData.totPropSelPageLen = data.totPropSelPageLen;
        if (calledFrom == Settings.labels.allValue) {
          brandData.isFranchise = false;
          brandData.isBrand = false;
          brandData.isProperties = false;
          brandData.isRegion = false;
          brandData.isAll = true;
        } else {
          brandData.isFranchise = false;
          brandData.isRegion = false;
          brandData.isProperties = false;
          brandData.isAll = false;
        }
        setState(brandData);
        setIsLoaded(true);
        refreshScroll(Settings.ids.regionDivId);
        refreshScroll(Settings.ids.hotelBasedOnBrandId);
        if (calledFrom == Settings.labels.region) {
          resetRegion();
        } else if (calledFrom == Settings.labels.franchise) {
          resetFranchise();
        }
      }
    });
  };

  const updateFranch = (data, calledFrom) => {
    setIsLoaded(false);
    const franchiseData = { ...state };
    const radioSelected = franchiseData.user.radioSel;
    let strFranchise = "";
    let selectedFranchise = [];

    if (franchiseData.userArray.franchiseList.length > 0) {
      franchiseData.userArray.franchiseList.filter(function (item) {
        if (item.checked) {
          strFranchise += item.franchCode + ",";
        }
      });
    }

    if (strFranchise != "") {
      strFranchise = strFranchise.slice(0, -1);
      selectedFranchise = strFranchise.split(",");
    }

    const params = setParamsForUpdate(
      selectedFranchise,
      radioSelected,
      "N",
      "N",
      "Y",
      "N"
    );

    APIEdit.updateFranchiseList(params).then((data) => {
      if (data) {
        franchiseData.userArray.hotelsBasedOnFranchise = data.hotelList;
        franchiseData.user.numFranchiseItem = data.totNumUserProp;
        franchiseData.user.radioSel = data.optSel;
        franchiseData.user.optSel = data.optSel;
        franchiseData.totPropSelPageLen = data.totPropSelPageLen;
        if (calledFrom == Settings.labels.allValue) {
          franchiseData.isFranchise = false;
          franchiseData.isBrand = false;
          franchiseData.isProperties = false;
          franchiseData.isRegion = false;
          franchiseData.isAll = true;
        } else {
          franchiseData.isRegion = false;
          franchiseData.isBrand = false;
          franchiseData.isProperties = false;
          franchiseData.isAll = false;
        }
        setState(franchiseData);
        setIsLoaded(true);
        refreshScroll(Settings.ids.regionDivId);
        refreshScroll(Settings.ids.hotelsBasedOnFranchiseId);
        if (calledFrom == Settings.labels.region) {
          resetRegion();
        } else if (calledFrom == Settings.labels.brand) {
          resetBrand();
        }
      }
    });
  };

  const updateallhotelbtn_onclick = (data, calledFrom) => {
    const allData = { ...state };
    let params;
    let isAll;
    if (data == "input") {
      isAll = "Y";
    } else {
      isAll = data;
    }

    if (allData.user.radioSel == Settings.labels.allHotelsShort) {
      params = setParamsForUpdate(
        isAll,
        allData.user.radioSel,
        "N",
        "N",
        "N",
        isAll == "Y" ? "Y" : "N"
      );
    } else if (allData.user.radioSel == Settings.labels.franchiseShort) {
      params = setParamsForUpdate(
        isAll,
        allData.user.radioSel,
        "N",
        "N",
        "Y",
        "N"
      );
    } else if (allData.user.radioSel == Settings.labels.regionShort) {
      params = setParamsForUpdate(
        isAll,
        allData.user.radioSel,
        "Y",
        "N",
        "N",
        "N"
      );
    } else if (allData.user.radioSel == Settings.labels.brandShort) {
      params = setParamsForUpdate(
        isAll,
        allData.user.radioSel,
        "N",
        "Y",
        "N",
        "N"
      );
    } else if (allData.user.radioSel == Settings.labels.propertyShort) {
      params = setParamsForUpdate(
        isAll,
        allData.user.radioSel,
        "N",
        "N",
        "N",
        "N"
      );
    }
    APIEdit.updateAll(params).then((data) => {
      if (data.status == "selPropList") {
        if (data.allHotels == "Y") {
          allData.userArray.hotelAllProperties = data.hotelList;
          allData.user.numAllPropItem = data.totNumUserProp;
          if (calledFrom === Settings.labels.availAccount) {
            allData.user.numHotelItems = data.toNumUserProp;
          }
          allData.totPropSelPageLen = data.totPropSelPageLen;
        } else {
          allData.userArray.hotelAllProperties = [];
        }

        allData.user.radioSel = data.optSel;
        allData.user.optSel = data.optSel;

        if (calledFrom == Settings.labels.allValue) {
          allData.isFranchise = false;
          allData.isBrand = false;
          allData.isProperties = false;
          allData.isRegion = false;
          allData.isAll = true;
        } else {
          allData.isFranchise = false;
          allData.isBrand = false;
          allData.isProperties = false;
          allData.isRegion = false;
        }
        setState(allData);
        setIsLoaded(true);
        if (calledFrom == Settings.labels.brand) {
          resetBrand();
        } else if (calledFrom == Settings.labels.franchise) {
          resetFranchise();
        } else if (calledFrom == Settings.labels.region) {
          resetRegion();
        }
      } else if (data.status == "availPropList") {
        allData.user.radioSel = data.optSel;
        allData.user.optSel = data.optSel;
        allData.isFranchise = false;
        allData.isBrand = false;
        allData.isProperties = true;
        allData.isRegion = false;
        allData.isAll = false;
        if (data.optSel === "P") {
          allData.totNumProp = data.totNumProp ? data.totNumProp : 1;
          allData.totPropPageLen = data.totPropPageLen
            ? data.totPropPageLen
            : 1;
          allData.userArray.hotellistAll = data.hotellistAll
            ? data.hotellistAll
            : [];
          setTotalPages(data.totPropPageLen ? data.totPropPageLen : 1);
          setTotalSelPages(
            data?.totPropSelPageLen ? data.totPropSelPageLen : 1
          );
          allData.totNumUserProp = data.totNumUserProp
            ? data.totNumUserProp
            : 1;
          allData.totPropSelPageLen = data.totPropSelPageLen
            ? data.totPropSelPageLen
            : 1;
          allData.userArray.hotelList = data.hotelList ? data.hotelList : [];
          allData.user.numHotelItems =
            data.totNumUserProp && data.hotelList ? data.totNumUserProp : 0;
          setPNumber(1);
          setResetInput(true);
        }
        setState(allData);
        setIsLoaded(true);
      }
    });
  };

  const setParamsForUpdate = (
    selectedParams,
    selectedOption,
    regFound,
    braFound,
    fraFound,
    allHotels
  ) => {
    const userval = { ...userDetail };
    const valueToUpdate = { ...state };
    sessionStorage.setItem(
      "EnhancedSalesContact",
      valueToUpdate.user.enhancedReportingChk == "Y" ? "on" : ""
    );
    let params;
    if (valueToUpdate.user.enhancedReportingChk == "Y") {
      params = {
        ...(selectedOption == "B" && {
          strSelectedAffiliationList: JSON.stringify(selectedParams),
        }),
        ...(selectedOption == "R" && {
          strSelectedRegionList: JSON.stringify(selectedParams),
        }),
        ...(selectedOption == "F" && {
          strSelectedFranchiseList: JSON.stringify(selectedParams),
        }),
        ...(selectedOption == "H" && { allHotels: selectedParams }),
        alphaOrderProp: "",
        filterByMorF: 0,
        regFound: regFound,
        braFound: braFound,
        fraFound: fraFound,
        aHotels: allHotels,
        allHotels: allHotels,
        p_1: "ALL",
        showAccounts: false,
        showProperties: true,
        userRoleDescription: "",
        userid: userval.userid,
        role: userval.role,
        radioSel: selectedOption,
        optSel: selectedOption,
        totalPages: "",
        enhancedSalesContact: "on",
        strCurrPagePropSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageProp: JSON.stringify({ page: 1, maxpagelen: 200 }),
        totPropSelPageLen: 1,
        totPropPageLen: 45,
        totAcctSelPageLen: "",
        totAcctPageLen: "",
        searchBy: "",
        filterString: "",
        orderby: "1",
        returnnamespace: "/userhotelaccess",
      };
    } else {
      params = {
        ...(selectedOption == "B" && {
          strSelectedAffiliationList: JSON.stringify(selectedParams),
        }),
        ...(selectedOption == "R" && {
          strSelectedRegionList: JSON.stringify(selectedParams),
        }),
        ...(selectedOption == "F" && {
          strSelectedFranchiseList: JSON.stringify(selectedParams),
        }),
        ...(selectedOption == "H" && { allHotels: selectedParams }),
        alphaOrderProp: "",
        filterByMorF: 0,
        regFound: regFound,
        braFound: braFound,
        fraFound: fraFound,
        aHotels: allHotels,
        allHotels: allHotels,
        p_1: "ALL",
        showAccounts: false,
        showProperties: true,
        userRoleDescription: "",
        userid: userval.userid,
        role: userval.role,
        radioSel: selectedOption,
        optSel: selectedOption,
        totalPages: "",
        strCurrPagePropSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageProp: JSON.stringify({ page: 1, maxpagelen: 200 }),
        totPropSelPageLen: 1,
        totPropPageLen: 45,
        totAcctSelPageLen: "",
        totAcctPageLen: "",
        searchBy: "",
        filterString: "",
        orderby: "1",
        returnnamespace: "/userhotelaccess",
      };
    }

    return params;
  };

  const setParamsForProp = (
    selectedParams,
    selectedOption,
    regFound,
    braFound,
    fraFound,
    allHotels
  ) => {
    const userval = { ...userDetail };
    const capturedParam = { ...state };
    let params;
    if (capturedParam.user.enhancedReportingChk == "Y") {
      params = {
        strHotelSelList: JSON.stringify(selectedParams),
        radioSel: selectedOption,
        optSel: selectedOption,
        alphaOrderProp: searchCriteria.alphaOrderProp,
        filterByMorF: 0,
        regFound: regFound,
        braFound: braFound,
        fraFound: fraFound,
        aHotels: allHotels,
        userRoleDescription: "",
        showProperties: true,
        userid: userval.userid,
        role: userval.role,
        showManaged: true,
        enhancedReporting: "on",
        enhancedSalesContact: "on",
        strCurrPagePropSel: JSON.stringify({
          page: selectPNumber ? selectPNumber : 1,
          maxpagelen: 200,
        }),
        strCurrPageProp: JSON.stringify({
          page: availablePNumber ? availablePNumber : 1,
          maxpagelen: 200,
        }),
        strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
        totPropSelPageLen: 1,
      };
    } else {
      params = {
        strHotelSelList: JSON.stringify(selectedParams),
        radioSel: selectedOption,
        optSel: selectedOption,
        alphaOrderProp: searchCriteria.alphaOrderProp,
        filterByMorF: 0,
        regFound: regFound,
        braFound: braFound,
        fraFound: fraFound,
        aHotels: allHotels,
        userRoleDescription: "",
        showProperties: true,
        userid: userval.userid,
        role: userval.role,
        showManaged: true,
        strCurrPagePropSel: JSON.stringify({
          page: selectPNumber,
          maxpagelen: 200,
        }),
        strCurrPageProp: JSON.stringify({
          page: availablePNumber,
          maxpagelen: 200,
        }),
        strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
        totPropSelPageLen: 1,
      };
    }

    return params;
  };

  const setParamsForReset = (
    selectedOption,
    regFound,
    braFound,
    fraFound,
    allHotels
  ) => {
    const userval = { ...userDetail };
    const resetData = { ...state };
    let params;
    if (resetData.user.enhancedReportingChk == "Y") {
      params = {
        radioSel: selectedOption,
        optSel: selectedOption,
        alphaOrderProp: "",
        filterByMorF: 0,
        regFound: regFound,
        braFound: braFound,
        fraFound: fraFound,
        aHotels: allHotels,
        numHotelItems: 200,
        showAccounts: false,
        showProperties: true,
        userRoleDescription: "",
        userid: userval.userid,
        role: userval.role,
        p_1: "ALL",
        enhancedReporting: "on",
        enhancedSalesContact: "on",
        strCurrPagePropSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageProp: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
        totPropSelPageLen: 1,
        totPropPageLen: 45,
        totAcctSelPageLen: "",
        totAcctPageLen: "",
        searchBy: "",
        filterString: "",
        orderby: 1,
      };
    } else {
      params = {
        radioSel: selectedOption,
        optSel: selectedOption,
        alphaOrderProp: "",
        filterByMorF: 0,
        regFound: regFound,
        braFound: braFound,
        fraFound: fraFound,
        aHotels: allHotels,
        numHotelItems: 200,
        showAccounts: false,
        showProperties: true,
        userRoleDescription: "",
        userid: userval.userid,
        role: userval.role,
        p_1: "ALL",
        strCurrPagePropSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageProp: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
        totPropSelPageLen: 1,
        totPropPageLen: 45,
        totAcctSelPageLen: "",
        totAcctPageLen: "",
        searchBy: "",
        filterString: "",
        orderby: 1,
      };
    }

    return params;
  };

  const copyUser_onclick = (closeModal?: boolean) => {
    const value = closeModal ? !showCopyPage : showCopyPage;
    if (value) {
      alert(Settings.alerts.switchToCopy);
    }
    setShowCopyPage(value);
  };

  const setUserEditCopy = (data: any) => {
    if (data) {
      const copyData = { ...state };
      copyData.userEditCopyData.totalDialogPages = data.totalDialogPages;
      copyData.userEditCopyData.userEditCopyList = data.userEditCopyList;
      setState(copyData);
    }
  };

  const onCopyClickSearch = (pageNumber = 1) => {
    const userval = { ...userDetail };
    const searchData = { ...copySearchCriteria };
    const params = {
      r_1: searchData.r_1,
      orderby: searchData.orderby,
      dialogFilterString: searchData.dialogFilterString,
      totalDialogPages: searchData.totalDialogPages,
      dialogSearchBy: searchData.dialogSearchBy,
      userid: userval.userid,
      role: userval.role,
      strdialogPage: JSON.stringify({
        page: pageNumber,
      }),
    };
    APIEdit.getCopySearchData(params).then((data) => {
      if (data) {
        setUserEditCopy(data);
      }
    });
    refreshScroll(Settings.ids.userEditCopyListId);
  };

  const updateCopy = () => {
    const userval = { ...userDetail };
    const propertyData = { ...state };
    sessionStorage.setItem(
      "EnhancedSalesContact",
      propertyData.user.enhancedReportingChk == "Y" ? "on" : ""
    );
    let updateCopyParams;
    if (propertyData.user.enhancedReportingChk == "Y") {
      updateCopyParams = {
        eidList: eidList,
        userid: userval.userid,
        role: userval.role,
        enhancedSalesContact: "on",
      };
    } else {
      updateCopyParams = {
        eidList: eidList,
        userid: userval.userid,
        role: userval.role,
      };
    }
    APIEdit.updateCopySearchData(updateCopyParams).then((data) => {
      if (data) {
        const params = setParamsForReset("P", "N", "N", "N", "N");
        setIsLoaded(false);
        APIEdit.populatePropertyList(params).then((hotelData) => {
          if (hotelData) {
            setHotelData(hotelData);
            copyUser_onclick(true);
            setIsLoaded(true);
          }
        });
      }
    });
  };

  const returnToMain = () => {
    history.push({
      pathname: "/limitedsalesusers",
    });
  };

  const selectPropAvailable = () => {
    const hotelUpdateData = { ...state };
    let strHotelUpdate = "";
    const hotelList = hotelUpdateData.userArray.hotelList;
    hotelList.filter(function (item) {
      item.checked = false;
      strHotelUpdate += item.marshaCode + ",";
    });
    hotelUpdateData.user.numHotelItems =
      hotelUpdateData.userArray.hotelList.length;

    strHotelUpdate = strHotelUpdate.slice(0, -1);
    const strHotelToArr = strHotelUpdate ? strHotelUpdate.split(",") : [];

    const updateParams = setParamsForProp(
      strHotelToArr,
      "P",
      "N",
      "N",
      "N",
      "N"
    );

    //APIEdit.updatePropertyList(updateParams).then((data) => {
    APIEdit.updateAvailPropList(updateParams).then((data) => {
      if (data && data !== "error") {
        hotelUpdateData.totNumProp = data.totNumProp;
        hotelUpdateData.totPropPageLen = data.totPropPageLen;
        hotelUpdateData.userArray.hotellistAll = data.hotellistAll;
        setTotalPages(data.totPropPageLen);
        APIEdit.updateSelectPropList(updateParams).then((data) => {
          if (data.status == "success") {
            hotelUpdateData.totNumUserProp = data.totNumUserProp;
            hotelUpdateData.user.numHotelItems =
              data.totNumUserProp && data.hotelList ? data.totNumUserProp : 0;
            hotelUpdateData.totPropSelPageLen = data.totPropSelPageLen;
            hotelUpdateData.userArray.hotelList = data.hotelList;
            hotelUpdateData.user.optSel = "P";
            hotelUpdateData.user.radioSel = "P";
            hotelUpdateData.isProperties = true;
            hotelUpdateData.isBrand = false;
            hotelUpdateData.isRegion = false;
            hotelUpdateData.isFranchise = false;
            hotelUpdateData.isAll = false;
            hotelUpdateData.userArray.hotelBasedRegion = [];
            hotelUpdateData.user.numRegionItems = 0;
            setTotalSelPages(data?.totPropSelPageLen);
            setPNumber(1);
            setResetInput(true);
            setState(hotelUpdateData);
          }
        });
      }
    });
  };

  const prop_onClick = (response, radioSel, optSel) => {
    const hotelUseProprData = { ...state };
    if (response) {
      if (hotelUseProprData.user.allhotels == "Y") {
        updateallhotelbtn_onclick("N", "");
      } else {
        selectPropAvailable();
      }
    } else {
      return false;
    }
  };

  const region_onClick = (response, radiioSel, optSel) => {
    const hotelUseRegionData = { ...state };
    if (response) {
      setIsLoaded(false);
      if (hotelUseRegionData.user.franchFound == "Y") {
        updateFranch(optSel, Settings.labels.region);
      } else if (hotelUseRegionData.user.allhotels == "Y") {
        updateallhotelbtn_onclick("N", Settings.labels.region);
      } else {
        updateBrand(optSel, Settings.labels.region);
      }
      refreshScroll(Settings.ids.regionDivId);
    } else {
      return false;
    }
  };

  const brand_onClick = (response, radiioSel, optSel) => {
    const hotelUseBrandData = { ...state };
    if (response) {
      if (hotelUseBrandData.user.franchFound == "Y") {
        updateFranch(optSel, Settings.labels.brand);
      } else if (hotelUseBrandData.user.allhotels == "Y") {
        updateallhotelbtn_onclick("N", Settings.labels.brand);
      } else {
        updateRegion(optSel, Settings.labels.brand);
      }
    } else {
      return false;
    }
  };

  const franchise_onClick = (response, radiioSel, optSel) => {
    const hotelUseFranchData = { ...state };
    if (response) {
      if (hotelUseFranchData.user.regionFound == "Y") {
        updateRegion(optSel, Settings.labels.franchise);
      } else if (hotelUseFranchData.user.allhotels == "Y") {
        updateallhotelbtn_onclick("N", Settings.labels.franchise);
      } else {
        updateBrand(optSel, Settings.labels.franchise);
      }
    } else {
      return false;
    }
  };

  const allHotels_onClick = (response, radiioSel, optSel) => {
    const hotelUserAllPropData = { ...state };
    if (response) {
      if (hotelUserAllPropData.user.regionFound == "Y") {
        updateRegion(optSel, Settings.labels.allValue);
      } else if (hotelUserAllPropData.user.brandFound == "Y") {
        updateBrand(optSel, Settings.labels.allValue);
      } else if (hotelUserAllPropData.user.franchFound == "Y") {
        updateFranch(optSel, Settings.labels.allValue);
      } else {
        updateallhotelbtn_onclick("N", Settings.labels.allValue);
      }
    } else {
      return false;
    }
  };

  const cbMAE_onclick = (event) => {
    return true;
  };

  const UserEditInfoContext = {
    state,
    isChecked,
    showQuickSelectTop,
    showCopyPage,
    pNumber,
    totalPages,
    totalSelPages,
    resetInput,
    setResetInput,
    setLoader,
    setPNumber,
    setHotelData,
    searchCriteria,
    setSearchCriteria,
    handleChangeInput,
    hotelsUpdateProp,
    hotelsDeleteProp,
    hotelsUnSelectAll,
    hotelsSelectAll,
    setPropertyType,
    hotelsQuickSelect,
    saveQuickSelect,
    onClickSearch,
    setEnhancedReporting,
    updateRegion,
    updateBrand,
    updateFranch,
    updateallhotelbtn_onclick,
    copyUser_onclick,
    setUserEditCopy,
    copySearchCriteria,
    setCopySearchCriteria,
    onCopyClickSearch,
    eidList,
    setEidList,
    updateCopy,
    userDetail,
    setUserDetail,
    returnToMain,
    loadingCopyData,
    setLoadingCopyData,
    refreshScroll,
    isLoaded,
    setIsLoaded,
    cbMAE_onclick,
    availablePNumber,
    setAvailablePNumber,
    selectPNumber,
    setSelectPNumber,
    quickSelection,
    setQuickSelection,
  };

  return (
    <UserEditContext.Provider value={UserEditInfoContext}>
      {props.children}
    </UserEditContext.Provider>
  );
};

export const UserEditConsumer = UserEditContext.Consumer;
export default UserEditContext;
