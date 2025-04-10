import React, { useState } from "react";
import Settings from "../data/Settings";
import Utils from "../utils/Utils";
//import API from "../../../service/API";

// Setup a Global AccountPricingContext that can be used for every component
// this will be a centralized place to set/get state
const AccountPricingContext = React.createContext({});
//import { useLocation } from "react-router-dom";

export const AccountPricingProvider = (props) => {
  const defaultParams = {
    menuType: Settings.text.compid.accountPricing.headerMenu.pricing,
    accountType: Settings.text.constant.string1,
    page: Settings.text.constant.string1,
    searchString: Settings.text.constant.stringEmpty,
    sortType: Settings.text.constant.string3,
    yoyOption:
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0],
    bulkActionType:
      Settings.text.label.accountPricing.accountPricingTableHeader.bulkActions
        .label,
  };

  const [state, setState] = useState({
    initialPricingData: null,
    activeMenuType: defaultParams.menuType,
    pricingData: {
      commorderby: null,
      commpage: {
        page: null,
        maxpagelen: null,
      },
      commtotalPages: null,
      commfilterString: null,
      commgroup: null,
      comrates: null,
      comrates_total: null,
    },
    pricingSaveData: {
      commformChg: false,
      comacctpricingchg: [],
    },
    hideAccountsSaveData: {
      hiddenAccounts: [],
    },
    historyData: {
      detailpage: {
        page: null,
        maxpagelen: null,
      },
      totalpages: 4,
      scptdetail: null,
    },
    hotelId: null,
    period: null,
    yoyOption: defaultParams.yoyOption,
    activeAccountType: defaultParams.accountType,
    currentPage: defaultParams.page,
    searchString: defaultParams.searchString,
    tempSearchStr: defaultParams.searchString,
    sortType: defaultParams.sortType,
    bulkActionType: defaultParams.bulkActionType,
    scrollToLastColumn: false,
    displayModal: false,
    modalType: null,
    resetLoading: null,
    accountsData: {
      accountsList: [],
    },
  });

  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const togglePricingMenu = (event) => {
    const pricingSaveData = { ...state.pricingSaveData };
    const menuType = event.currentTarget.id;
    saveAndReloadTableData(
      menuType,
      true,
      defaultParams.accountType,
      defaultParams.page,
      defaultParams.searchString,
      defaultParams.sortType,
      defaultParams.yoyOption,
      pricingSaveData
    );
    return;
  };

  const setPricingData = (
    data: any,
    resetLoading: any,
    menuType: string,
    accountType: string,
    page: string,
    searchString: string,
    sortType: string,
    yoyOption: string,
    scrollToLastColumn: boolean,
    hotelId?: number,
    period?: number
  ) => {
    if (!hotelId) {
      hotelId = state.hotelId;
    }
    if (!period) {
      period = state.period;
    }
    if (!data.comrates) {
      data.comrates = [];
    }
    if (!data.comrates_total) {
      data.comrates_total = {};
    }

    const pricingSaveData = { ...state.pricingSaveData };
    pricingSaveData.commformChg = false;
    pricingSaveData.comacctpricingchg = [];

    const hideAccountsSaveData = { ...state.hideAccountsSaveData };
    hideAccountsSaveData.hiddenAccounts = [];

    const accountsList = [];
    data.comrates.map((data) => {
      accountsList.push({
        scpt_accountid: data.scpt_accountid,
        accountname: data.accountname,
      });
    });

    const accountsData = { accountsList: accountsList };

    setState({
      ...state,
      pricingData: Object.assign({}, data),
      initialPricingData: JSON.parse(JSON.stringify(data)),
      pricingSaveData: pricingSaveData,
      hideAccountsSaveData: hideAccountsSaveData,
      scrollToLastColumn: scrollToLastColumn,
      activeMenuType: menuType,
      activeAccountType: accountType,
      currentPage: page,
      searchString: searchString,
      tempSearchStr: searchString,
      sortType: sortType,
      yoyOption: yoyOption,
      bulkActionType: defaultParams.bulkActionType,
      resetLoading: resetLoading,
      hotelId: hotelId,
      period: period,
      accountsData: accountsData,
    });
  };

  const setHistoryData = (
    data: any,
    resetLoading: any,
    menuType: string,
    accountType: string,
    page: string,
    searchString: string,
    sortType: string,
    yoyOption: string,
    scrollToLastColumn: boolean,
    hotelId?: number,
    period?: number
  ) => {
    if (!hotelId) {
      hotelId = state.hotelId;
    }
    if (!period) {
      period = state.period;
    }
    if (!data.scptdetail) {
      data.scptdetail = [];
    }

    const accountsList = [];
    data.scptdetail.map((data) => {
      accountsList.push({
        scpt_accountid: data.scpt_accountid,
        accountname: data.accountname,
      });
    });

    const accountsData = { accountsList: accountsList };

    setState({
      ...state,
      historyData: Object.assign({}, data),
      activeMenuType: menuType,
      scrollToLastColumn: scrollToLastColumn,
      activeAccountType: accountType,
      currentPage: page,
      searchString: searchString,
      tempSearchStr: searchString,
      sortType: sortType,
      yoyOption: yoyOption,
      bulkActionType: defaultParams.bulkActionType,
      resetLoading: resetLoading,
      hotelId: hotelId,
      period: period,
      accountsData: accountsData,
    });
  };

  const getPricingTableData = () => {
    const pricingData = { ...state.pricingData };
    const percentReplace =
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? Settings.text.constant.stringEmpty
        : Settings.text.constant.percentSymbol;

    const columnHeaders =
      Settings.text.label.accountPricing.accountPricingTable.columnHeaders.map(
        (data) =>
          data
            .replace(Settings.text.constant.periodPlaceHolder, state.period)
            .replace(Settings.text.constant.percentPlaceHolder, percentReplace)
      );

    const dataCols =
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? Settings.text.compid.accountPricing.accountPricingTable.dataAmountCols
        : Settings.text.compid.accountPricing.accountPricingTable
            .dataPercentCols;

    const percentCols =
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? Settings.text.compid.accountPricing.accountPricingTable
            .percentColIndex
        : [
            ...Settings.text.compid.accountPricing.accountPricingTable
              .percentColIndex,
            ...Settings.text.compid.accountPricing.accountPricingTable
              .condPercentColIndex,
          ];

    return {
      scrollToLastColumn: state.scrollToLastColumn,
      accountsData: pricingData.comrates,
      totalData: pricingData.comrates_total,
      columnHeaders: columnHeaders,
      dataCols: dataCols,
      percentCols: percentCols,
    };
  };

  const getHistoryTableData = (showrmnights: string) => {
    const historyData = { ...state.historyData };
    const periodNum = Utils.convertToNumber(state.period);

    const yoyTypeReplaceRN =
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? Settings.text.constant.nights
        : Settings.text.constant.percentSymbol;

    const yoyTypeReplaceCurr =
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? Settings.text.constant.currency
        : Settings.text.constant.percentSymbol;

    const viewAsReplace =
      showrmnights === Settings.text.constant.stringY
        ? Settings.text.constant.stringEmpty
        : Settings.text.constant.pct;

    const columnHeaders =
      Settings.text.label.accountPricing.accountHistoryTable.columnHeaders.map(
        (data) =>
          data
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              (periodNum - 1).toString()
            )
            .replace(
              Settings.text.constant.prev2PeriodPlaceHolder,
              (periodNum - 2).toString()
            )
      );
    const columnSubHeaders =
      Settings.text.label.accountPricing.accountHistoryTable.columnSubHeaders.map(
        (data) =>
          data
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              (periodNum - 1).toString()
            )
            .replace(
              Settings.text.constant.prev2PeriodPlaceHolder,
              (periodNum - 2).toString()
            )
            .replace(
              Settings.text.constant.yoyTypeRNPlaceHolder,
              yoyTypeReplaceRN
            )
            .replace(
              Settings.text.constant.yoyTypeCurrPlaceHolder,
              yoyTypeReplaceCurr
            )
      );

    const dataCols = (
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? Settings.text.compid.accountPricing.accountHistoryTable.dataAmountCols
        : Settings.text.compid.accountPricing.accountHistoryTable
            .dataPercentCols
    ).map((data) =>
      data.replace(Settings.text.constant.viewasPlaceHolder, viewAsReplace)
    );

    const percentCols =
      state.yoyOption ===
      Settings.text.label.accountPricing.accountPricingTableHeader.yoy
        .yoyOptions[0]
        ? []
        : Settings.text.compid.accountPricing.accountHistoryTable
            .condPercentColIndex;

    return {
      accountsData: historyData.scptdetail,
      columnHeaders: columnHeaders,
      columnSubHeaders: columnSubHeaders,
      dataCols: dataCols,
      percentCols: percentCols,
    };
  };

  const onChange = (event) => {
    const { id, value } = event.target;

    // Bulk Actions option select
    if (
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.default ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.statusRequested ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.statusPending ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.statusAccepted ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.statusDeclined ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.statusRebid ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.hideAccounts ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.doNotPrice ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.moveAccounts ||
      id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.refreshRates
    ) {
      setState({ ...state, bulkActionType: id });
      return;
    }

    // YoY radio button change
    if (
      id.includes(
        Settings.text.compid.accountPricing.accountPricingTableHeader.yoy
      )
    ) {
      setState({ ...state, yoyOption: value });
      return;
    }

    // Account search value change
    if (
      id ===
      Settings.text.compid.accountPricing.accountPricingTableHeader
        .accountSearch
    ) {
      setState({ ...state, tempSearchStr: value });
      return;
    }

    // View by option select
    if (
      id.includes(
        Settings.text.compid.accountPricing.accountPricingTableHeader.viewBy
      )
    ) {
      const sortType = id.replace(
        Settings.text.compid.accountPricing.accountPricingTableHeader.viewBy,
        Settings.text.constant.stringEmpty
      );
      setState({ ...state, sortType: sortType });
      const pricingSaveData = { ...state.pricingSaveData };
      saveAndReloadTableData(
        state.activeMenuType,
        false,
        state.activeAccountType,
        defaultParams.page,
        state.searchString,
        sortType,
        state.yoyOption,
        pricingSaveData
      );
      return;
    }

    // Pagination Input enter
    if (
      id ===
      Settings.text.compid.accountPricing.accountPricingTableHeader.pagination
    ) {
      const pricingSaveData = { ...state.pricingSaveData };
      saveAndReloadTableData(
        state.activeMenuType,
        false,
        state.activeAccountType,
        value,
        state.searchString,
        state.sortType,
        state.yoyOption,
        pricingSaveData
      );
      return;
    }

    // Account Status change
    if (
      id.includes(
        Settings.text.compid.accountPricing.accountPricingTable.accountStatus
      )
    ) {
      const pricingData = { ...state.pricingData };
      const pricingSaveData = { ...state.pricingSaveData };
      const selectedAccountId = Number(
        id.replace(
          Settings.text.compid.accountPricing.accountPricingTable.accountStatus,
          Settings.text.constant.stringEmpty
        )
      );

      Utils.updateAccountPricingData(
        state.hotelId,
        pricingData.comrates,
        pricingSaveData.comacctpricingchg,
        selectedAccountId,
        Settings.text.compid.accountPricing.accountPricingTable.statusSave
          .loadAttr,
        Settings.text.compid.accountPricing.accountPricingTable.statusSave
          .saveAttr,
        value
      );

      setState({
        ...state,
        pricingData: pricingData,
        pricingSaveData: pricingSaveData,
        scrollToLastColumn: true,
      });
      return;
    }
  };

  const onClick = (event) => {
    const { id, checked } = event.target;

    // Account Type tab switch
    if (
      id.includes(Settings.text.compid.accountPricing.accountsMenu.accountType)
    ) {
      const accountType = id.replace(
        Settings.text.compid.accountPricing.accountsMenu.accountType,
        Settings.text.constant.stringEmpty
      );
      const pricingSaveData = { ...state.pricingSaveData };
      saveAndReloadTableData(
        state.activeMenuType,
        false,
        accountType,
        defaultParams.page,
        defaultParams.searchString,
        defaultParams.sortType,
        defaultParams.yoyOption,
        pricingSaveData
      );
      return;
    }

    // Bulk Actions Apply - Status
    if (
      id ===
      Settings.text.compid.accountPricing.accountPricingTableHeader.applyButton
    ) {
      const pricingData = { ...state.pricingData };
      const pricingSaveData = { ...state.pricingSaveData };
      const hideAccountsSaveData = { ...state.hideAccountsSaveData };
      let scrollToLastColumn = false;
      let anyUpdates = false;

      if (
        state.bulkActionType ===
          Settings.text.compid.accountPricing.accountPricingTableHeader
            .bulkActions.statusRequested ||
        state.bulkActionType ===
          Settings.text.compid.accountPricing.accountPricingTableHeader
            .bulkActions.statusPending ||
        state.bulkActionType ===
          Settings.text.compid.accountPricing.accountPricingTableHeader
            .bulkActions.statusAccepted ||
        state.bulkActionType ===
          Settings.text.compid.accountPricing.accountPricingTableHeader
            .bulkActions.statusDeclined ||
        state.bulkActionType ===
          Settings.text.compid.accountPricing.accountPricingTableHeader
            .bulkActions.statusRebid
      ) {
        anyUpdates = Utils.updateBulkAccountPricingData(
          state.hotelId,
          pricingData.comrates,
          pricingSaveData.comacctpricingchg,
          true,
          Settings.text.compid.accountPricing.accountPricingTable.statusSave
            .loadAttr,
          Settings.text.compid.accountPricing.accountPricingTable.statusSave
            .saveAttr,
          state.bulkActionType
        );
        scrollToLastColumn = true;
      }

      // Bulk Actions Apply - Hide Accounts
      if (
        state.bulkActionType ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.hideAccounts
      ) {
        anyUpdates = Utils.updateBulkHideAccountsData(
          pricingData.comrates,
          hideAccountsSaveData.hiddenAccounts
        );
      }

      // Bulk Actions Apply - Do Not Price
      if (
        state.bulkActionType ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.doNotPrice
      ) {
        anyUpdates = Utils.updateBulkAccountPricingData(
          state.hotelId,
          pricingData.comrates,
          pricingSaveData.comacctpricingchg,
          false,
          Settings.text.compid.accountPricing.accountPricingTable.doNotPriceSave
            .loadAttr,
          Settings.text.compid.accountPricing.accountPricingTable.doNotPriceSave
            .saveAttr,
          Settings.text.constant.stringY
        );
      }

      // Bulk Actions Apply - Move to Accounts
      if (
        state.bulkActionType ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.moveAccounts
      ) {
        let saveAttr;
        if (state.activeAccountType === Settings.text.constant.string1)
          saveAttr =
            Settings.text.compid.accountPricing.accountPricingTableHeader
              .bulkActions.moveoutofprimary;
        else
          saveAttr =
            Settings.text.compid.accountPricing.accountPricingTableHeader
              .bulkActions.movetoprimary;
        anyUpdates = Utils.updateBulkMoveAccountsData(
          state.hotelId,
          pricingData.comrates,
          pricingSaveData.comacctpricingchg,
          saveAttr
        );
      }

      // Bulk Actions Apply - Refresh rates
      if (
        state.bulkActionType ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .bulkActions.refreshRates
      ) {
        refreshAccountPricingRates();
        return;
      }

      if (anyUpdates) {
        saveAndReloadTableData(
          state.activeMenuType,
          false,
          state.activeAccountType,
          defaultParams.page,
          state.searchString,
          state.sortType,
          state.yoyOption,
          pricingSaveData,
          hideAccountsSaveData,
          scrollToLastColumn
        );
      } else {
        setState({ ...state, bulkActionType: defaultParams.bulkActionType });
      }
      return;
    }

    // Account Search icon click
    if (
      id ===
      Settings.text.compid.accountPricing.accountPricingTableHeader
        .accountSearch
    ) {
      const pricingSaveData = { ...state.pricingSaveData };
      saveAndReloadTableData(
        state.activeMenuType,
        false,
        state.activeAccountType,
        defaultParams.page,
        state.tempSearchStr,
        state.sortType,
        state.yoyOption,
        pricingSaveData
      );
      return;
    }

    // Pagination icons click
    if (
      id.includes(
        Settings.text.compid.accountPricing.accountPricingTableHeader.pagination
      )
    ) {
      let currentPage = state.currentPage;
      if (
        id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .paginationNext
      )
        currentPage = (Number(currentPage) + 1).toString();
      if (
        id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .paginationLast
      )
        currentPage =
          state.activeMenuType ===
          Settings.text.compid.accountPricing.headerMenu.pricing
            ? state.pricingData.commtotalPages
            : state.historyData.totalpages;
      if (
        id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .paginationPrevious
      )
        currentPage = (Number(currentPage) - 1).toString();
      if (
        id ===
        Settings.text.compid.accountPricing.accountPricingTableHeader
          .paginationFirst
      )
        currentPage = defaultParams.page;

      const pricingSaveData = { ...state.pricingSaveData };
      saveAndReloadTableData(
        state.activeMenuType,
        false,
        state.activeAccountType,
        currentPage,
        state.searchString,
        state.sortType,
        state.yoyOption,
        pricingSaveData
      );
      return;
    }

    // Data Grid - Account Name checkbox toggle
    if (
      id.includes(
        Settings.text.compid.accountPricing.accountPricingTable.accountName
      )
    ) {
      const pricingData = { ...state.pricingData };
      const selectedAccountId = id.replace(
        Settings.text.compid.accountPricing.accountPricingTable.accountName,
        Settings.text.constant.stringEmpty
      );
      Utils.updateAccountPricingData(
        state.hotelId,
        pricingData.comrates,
        null,
        selectedAccountId,
        Settings.text.compid.accountPricing.accountPricingTable.accountSelected,
        null,
        checked
      );

      setState({
        ...state,
        pricingData: pricingData,
        scrollToLastColumn: false,
      });
      return;
    }

    // Data Grid - Do Not Price checkbox toggle
    if (
      id.includes(
        Settings.text.compid.accountPricing.accountPricingTable
          .accountDoNotPrice
      )
    ) {
      const pricingData = { ...state.pricingData };
      const pricingSaveData = { ...state.pricingSaveData };
      const selectedAccountId = Number(
        id.replace(
          Settings.text.compid.accountPricing.accountPricingTable
            .accountDoNotPrice,
          Settings.text.constant.stringEmpty
        )
      );
      const updatedDoNotPrice = checked
        ? Settings.text.constant.stringY
        : Settings.text.constant.stringN;

      Utils.updateAccountPricingData(
        state.hotelId,
        pricingData.comrates,
        pricingSaveData.comacctpricingchg,
        selectedAccountId,
        Settings.text.compid.accountPricing.accountPricingTable.doNotPriceSave
          .loadAttr,
        Settings.text.compid.accountPricing.accountPricingTable.doNotPriceSave
          .saveAttr,
        updatedDoNotPrice
      );

      setState({
        ...state,
        pricingData: pricingData,
        pricingSaveData: pricingSaveData,
        scrollToLastColumn: false,
      });
      return;
    }

    // Save button click
    if (id === Settings.text.compid.common.save) {
      const pricingSaveData = { ...state.pricingSaveData };
      saveAndReloadTableData(
        state.activeMenuType,
        false,
        state.activeAccountType,
        state.currentPage,
        state.searchString,
        state.sortType,
        state.yoyOption,
        pricingSaveData
      );
      return;
    }

    // Cancel button click
    if (id === Settings.text.compid.common.cancel) {
      setState({
        ...state,
        pricingData: JSON.parse(JSON.stringify(state.initialPricingData)),
      });
      return;
    }
  };

  const reloadAccountPricingData = () => {
    state.resetLoading(true);
    setIsMakingRequest(true);
    Utils.reloadAccountPricing(
      state.activeAccountType,
      state.currentPage,
      state.searchString,
      state.sortType
    ).then((data) => {
      setIsMakingRequest(false);
      setPricingData(
        data,
        state.resetLoading,
        state.activeMenuType,
        state.activeAccountType,
        state.currentPage,
        state.searchString,
        state.sortType,
        state.yoyOption,
        false
      );
      state.resetLoading(false);
    });
  };

  const saveAndReloadTableData = (
    menuType: string,
    menuSwitch: boolean,
    accountType: string,
    page: string,
    searchString: string,
    sortType: string,
    yoyOption: string,
    saveData: any,
    hideAccountsSaveData?: any,
    scrollToLastColumn?: boolean
  ) => {
    let anyUpdates = false;
    const accountsHidden =
      hideAccountsSaveData &&
      Utils.areAccountsHidden(hideAccountsSaveData.hiddenAccounts);
    let saveFunction;
    let reloadFunction;
    let setFunction;
    if (menuType === Settings.text.compid.accountPricing.headerMenu.pricing) {
      if (!menuSwitch) {
        anyUpdates = Utils.hasPricingDataChanged(saveData);
        saveFunction = Utils.saveAccountPricingUpdate;
      }
      reloadFunction = Utils.reloadAccountPricing;
      setFunction = setPricingData;
    }
    if (menuType === Settings.text.compid.accountPricing.headerMenu.history) {
      if (menuSwitch) {
        anyUpdates = Utils.hasPricingDataChanged(saveData);
        saveFunction = Utils.saveAccountPricingUpdate;
      }
      reloadFunction = Utils.reloadAccountHistory;
      setFunction = setHistoryData;
    }

    state.resetLoading(true);
    setIsMakingRequest(true);
    if (anyUpdates && accountsHidden) {
      // Save > hide accounts > load
      saveFunction(saveData).then((data) => {
        if (data === Settings.text.constant.success) {
          Utils.saveHiddenAccountsUpdate(
            hideAccountsSaveData.hiddenAccounts,
            state.hotelId
          ).then((data) => {
            if (data === Settings.text.constant.success) {
              reloadFunction(accountType, page, searchString, sortType).then(
                (data) => {
                  setFunction(
                    data,
                    state.resetLoading,
                    menuType,
                    accountType,
                    page,
                    searchString,
                    sortType,
                    yoyOption,
                    scrollToLastColumn
                  );
                  state.resetLoading(false);
                  setIsMakingRequest(false);
                }
              );
            } else {
              state.resetLoading(false);
              setIsMakingRequest(false);
            }
          });
        } else {
          state.resetLoading(false);
          setIsMakingRequest(false);
        }
      });
    } else if (anyUpdates && !accountsHidden) {
      // Save > load
      saveFunction(saveData).then((data) => {
        if (data === Settings.text.constant.success) {
          reloadFunction(accountType, page, searchString, sortType).then(
            (data) => {
              setFunction(
                data,
                state.resetLoading,
                menuType,
                accountType,
                page,
                searchString,
                sortType,
                yoyOption,
                scrollToLastColumn
              );
              state.resetLoading(false);
              setIsMakingRequest(false);
            }
          );
        } else {
          state.resetLoading(false);
          setIsMakingRequest(false);
        }
      });
    } else if (!anyUpdates && accountsHidden) {
      // Hide accounts > load
      Utils.saveHiddenAccountsUpdate(
        hideAccountsSaveData.hiddenAccounts,
        state.hotelId
      ).then((data) => {
        if (data === Settings.text.constant.success) {
          reloadFunction(accountType, page, searchString, sortType).then(
            (data) => {
              setFunction(
                data,
                state.resetLoading,
                menuType,
                accountType,
                page,
                searchString,
                sortType,
                yoyOption,
                scrollToLastColumn
              );
              state.resetLoading(false);
              setIsMakingRequest(false);
            }
          );
        } else {
          state.resetLoading(false);
          setIsMakingRequest(false);
        }
      });
    } else {
      // Only load
      reloadFunction(accountType, page, searchString, sortType).then((data) => {
        setFunction(
          data,
          state.resetLoading,
          menuType,
          accountType,
          page,
          searchString,
          sortType,
          yoyOption,
          scrollToLastColumn
        );
        state.resetLoading(false);
        setIsMakingRequest(false);
      });
    }
  };

  const saveAndNavigateToPricingSetup = (navigateToPricingSetup) => {
    let saveData;
    let anyUpdates = false;
    let saveFunction;
    if (
      state.activeMenuType ===
      Settings.text.compid.accountPricing.headerMenu.pricing
    ) {
      saveData = { ...state.pricingSaveData };
      anyUpdates = Utils.hasPricingDataChanged(saveData);
      saveFunction = Utils.saveAccountPricingUpdate;
    }

    state.resetLoading(true);
    if (anyUpdates) {
      setIsMakingRequest(true);
      saveFunction(saveData).then((data) => {
        setIsMakingRequest(false);
        if (data === Settings.text.constant.success) {
          state.resetLoading(false);
          navigateToPricingSetup(true, state.activeMenuType);
        } else {
          state.resetLoading(false);
        }
      });
    } else {
      state.resetLoading(false);
      navigateToPricingSetup(true, state.activeMenuType);
    }
  };

  const onNavigateOut = () => {
    let saveData;
    let anyUpdates = false;
    let saveFunction;
    if (
      state.activeMenuType ===
      Settings.text.compid.accountPricing.headerMenu.pricing
    ) {
      saveData = { ...state.pricingSaveData };
      anyUpdates = Utils.hasPricingDataChanged(saveData);
      saveFunction = Utils.saveAccountPricingUpdate;
    }

    state.resetLoading(true);
    if (anyUpdates) {
      setIsMakingRequest(true);
      saveFunction(saveData).then((data) => {
        setIsMakingRequest(false);
        if (data === Settings.text.constant.success) {
          state.resetLoading(false);
        } else {
          state.resetLoading(false);
        }
      });
    } else {
      state.resetLoading(false);
    }
    return true;
  };

  const refreshAccountPricingRates = () => {
    state.resetLoading(true);
    const saveData = { ...state.pricingSaveData };
    const anyUpdates = Utils.hasPricingDataChanged(saveData);
    if (anyUpdates) {
      setIsMakingRequest(true);
      Utils.saveAccountPricingUpdate(saveData).then((data) => {
        setIsMakingRequest(false);
        if (data === Settings.text.constant.success) {
          Utils.refreshAccountPricingRates().then((data) => {
            if (data === Settings.text.constant.success) {
            }
            reloadAccountPricingData();
          });
        } else {
          state.resetLoading(false);
        }
      });
    } else {
      Utils.refreshAccountPricingRates().then((data) => {
        if (data === Settings.text.constant.success) {
        }
        reloadAccountPricingData();
      });
    }
  };

  const openHistoryReport = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const period = queryParams.get("Period");
    const hotelid = queryParams.get("HotelId");

    const parms = {
      hotelid: hotelid,
      period: period,
    };
    let path;
    const locUrl = location.href;
    const isLocal = locUrl
      .split("/")
      .filter((word) => word.indexOf("localhost") > -1);
    if (!isLocal.length) {
      path =
        "/" +
        window.location.pathname.split("/")[1] +
        "/" +
        window.location.pathname.split("/")[2];
    } else {
      path = "";
    }
    const url =
      window.location.origin +
      path +
      "/hotelReports?&ReportName=" +
      "SCPT Account History Report" +
      "&Period=" +
      period +
      "&HotelId=" +
      hotelid;

    window.open(url, "_blank");
  };

  const onAccountClick = (index: number, navigateToAccountDetails: any) => {
    const accountsData = { ...state.accountsData };
    navigateToAccountDetails(
      index,
      accountsData.accountsList,
      state.activeMenuType,
      {
        activeAccountType: state.activeAccountType,
        currentPage: state.currentPage,
        searchString: state.searchString,
        sortType: state.sortType,
        yoyOption: state.yoyOption,
      }
    );
  };

  const showModal = (event, modalType: string) => {
    setState({ ...state, displayModal: true, modalType: modalType });
  };

  const hideModal = (reload: boolean) => {
    setState({ ...state, displayModal: false });
    if (reload) {
      state.displayModal = false;
      reloadAccountPricingData();
    }
  };

  const accountPricingContext = {
    state,
    setState,
    defaultParams,
    togglePricingMenu,
    setPricingData,
    setHistoryData,
    getPricingTableData,
    getHistoryTableData,
    onChange,
    onClick,
    saveAndNavigateToPricingSetup,
    onNavigateOut,
    refreshAccountPricingRates,
    openHistoryReport,
    onAccountClick,
    showModal,
    hideModal,
    isMakingRequest,
    setIsMakingRequest,
  };

  return (
    <AccountPricingContext.Provider value={accountPricingContext}>
      {props.children}
    </AccountPricingContext.Provider>
  );
};

export const AccountPricingConsumer = AccountPricingContext.Consumer;
export default AccountPricingContext;
