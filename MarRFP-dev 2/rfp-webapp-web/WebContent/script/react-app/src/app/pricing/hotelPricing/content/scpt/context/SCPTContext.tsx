import React, { useState } from "react";
import Settings from "../data/Settings";
import Utils from "../utils/Utils";

// Setup a Global SCPTContext that can be used for every component
// this will be a centralized place to set/get state
const SCPTContext = React.createContext({});

export const SCPTProvider = (props) => {
  const [state, setState] = useState({
    statusData: {
      brandName: null,
      currency: null,
      currencyCode: null,
      currencyWidth: null,
      franch_flag: null,
      hotelName: null,
      hotelid: null,
      isBrandExtendedStay: null,
      marshaCode: null,
      period: null,
      scptSetupCompleted: null,
      accountgroupList: [],
      breakfastList: [],
      internetList: [],
      showrmnights: null,
    },
    breakfastDescList: [],
    internetDescList: [],
    accountsData: {
      selectedIndex: null,
      accountsList: [],
    },
    accountPricingFilters: {},
    showPricingSetupScreen: false,
    showAccountPricingScreen: false,
    showAccountDetailsScreen: false,
    pricingMenuType: null,
    displayDialog: false,
    dialogOptions: null,
  });

  const [searchParams, setSearchParams] = useState({});

  const setStatusData = (data: any) => {
    let showPricingSetupScreen = false;
    let showAccountPricingScreen = false;
    let pricingMenuType;
    if (data.scptSetupCompleted === Settings.text.constant.stringY) {
      showAccountPricingScreen = true;
      pricingMenuType = Settings.text.compid.accountPricing.headerMenu.pricing;
    } else {
      showPricingSetupScreen = true;
      pricingMenuType = Settings.text.compid.accountPricing.headerMenu.history;
    }

    const breakfastDescList = [Settings.text.constant.stringEmpty];
    const internetDescList = [Settings.text.constant.stringEmpty];
    if (data) {
      if (data.breakfastList) {
        data.breakfastList.map((data) => {
          breakfastDescList.push(data.breakfastname);
        });
      }
      if (data.internetList) {
        data.internetList.map((data) => {
          internetDescList.push(data.internetname);
        });
      }
    }

    setState({
      ...state,
      statusData: Object.assign({}, data),
      breakfastDescList: breakfastDescList,
      internetDescList: internetDescList,
      showPricingSetupScreen: showPricingSetupScreen,
      showAccountPricingScreen: showAccountPricingScreen,
      pricingMenuType: pricingMenuType,
    });
  };

  const navigateToPricingSetup = (status: boolean, menuType: string) => {
    setState({
      ...state,
      showPricingSetupScreen: status,
      showAccountPricingScreen: !status,
      pricingMenuType: menuType,
      accountPricingFilters: {},
    });
  };

  const navigateToAccountPricing = (status: boolean) => {
    const statusData = { ...state.statusData };
    statusData.scptSetupCompleted = Settings.text.constant.stringY;
    setState({
      ...state,
      statusData: statusData,
      showPricingSetupScreen: !status,
      showAccountPricingScreen: status,
      showAccountDetailsScreen: !status,
    });
  };

  const navigateToAccountDetails = (
    selectedIndex: number,
    accountsList: any,
    menuType: string,
    filters: any
  ) => {
    const accountsData = { ...state.accountsData };
    accountsData.selectedIndex = selectedIndex;
    accountsData.accountsList = accountsList;
    setState({
      ...state,
      accountsData: accountsData,
      showAccountDetailsScreen: true,
      pricingMenuType: menuType,
      accountPricingFilters: filters,
    });
  };

  const showDialog = (dialogOptions: any) => {
    setState({
      ...state,
      displayDialog: true,
      dialogOptions: dialogOptions,
    });
  };

  const hideDialog = (reload: boolean) => {
    setState({ ...state, displayDialog: false });
  };

  const handleDialogOk = (event) => {
    setState({ ...state, displayDialog: false });
    state.dialogOptions.okCallback(
      state.dialogOptions.id,
      state.dialogOptions.resetLoading,
      state.dialogOptions.navToAccountPricing
    );
  };

  const onChange = (event) => {
    const { id, value } = event.target;
    const statusData = { ...state.statusData };

    if (id.includes(Settings.text.compid.historyViewAs)) {
      statusData.showrmnights =
        value === Settings.text.label.historyViewAs.viewAsOptions[0]
          ? Settings.text.constant.stringY
          : Settings.text.constant.stringN;
      Utils.saveShowRoomNightsUpdate({
        hotelid: statusData.hotelid,
        showrmnights: statusData.showrmnights,
      });
      setState({ ...state, statusData: statusData });
      return;
    }
  };

  const scptContext = {
    state,
    setState,
    setStatusData,
    navigateToPricingSetup,
    navigateToAccountPricing,
    navigateToAccountDetails,
    showDialog,
    hideDialog,
    handleDialogOk,
    onChange,
    searchParams,
    setSearchParams,
  };

  return (
    <SCPTContext.Provider value={scptContext}>
      {props.children}
    </SCPTContext.Provider>
  );
};

export const SCPTConsumer = SCPTContext.Consumer;
export default SCPTContext;
