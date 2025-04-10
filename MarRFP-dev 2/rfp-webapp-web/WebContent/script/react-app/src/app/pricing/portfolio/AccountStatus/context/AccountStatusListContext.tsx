import React, { useContext, useState } from "react";
import Settings from "../static/Settings";
import Util from "../../../admin/utils/Utils";
import API from "../service/API";
import Utils from "../../../../common/utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

const AccountStatusListContext = React.createContext({});

export const AccountStatusListContextProvider = (props) => {
  const [state, setState] = useState({
    showPortfolioColumn: false,
    lastLockedRowId: null,
    accountStatusListData: {
      accountStatusFilterLists: {
        periodList: [],
        accountSegmentList: [
          {
            accounttype: null,
            accounttypedescription: null,
          },
        ],
        accountPricingTypeList: [
          {
            accountpricingtype: null,
            accountpricing: null,
          },
        ],
        accountStatusRefList: [
          {
            accountStatusId: null,
            accountStatusName: null,
          },
        ],
        pasManagerList: [
          {
            adminRespondentid: null,
            personName: null,
          },
        ],
      },
      accountStatusList: [],
      selectedAccount: {
        period: null,
        accountrecid: null,
        searchperiod: null,
        r_1: null,
        c_1: null,
        orderby: null,
        accountpricingtype: null,
        filterString: "",
        accountstatus: null,
        accountsegment: null,
        showPortfolio: null,
        pasManager: null,
        portfolioOption: null,
        strPage: { page: 0 },
        totalPages: 0,
        isShowAllAccounts: true,
        isStringSearch: false,
        toShowPortfolio: false,
      },
      isSearched: false,

      searchTerms: {
        searchperiod: null,
        period: null,
        r_1: null,
        c_1: null,
        orderby: null,
        accountpricingtype: null,
        filterString: "",
        accountstatus: null,
        accountstatusname: null,
        accountsegment: null,
        showPortfolio: null,
        showPortfolioType: null,
        pasManager: null,
        strPage: { page: 0 },
        totalPages: 0,
        isShowAllAccounts: true,
        isStringSearch: false,
        toShowPortfolio: false,
      },
      defaultPeriod: null,
      defaultPeriodValue: null,
      defaultShowAll: null,
      defaultSortBy: null,
      defaultSortByValue: null,
      defaultPortfolioOptionByValue: "A",
      defaultAccountStartsWith: null,
      defaultAccountType: null,
      defaultAccountTypeValue: "C",
      defaultaccountStatusRefList: null,
      defaultaccountStatusRefListValue: null,
      defaultSegment: null,
      defaultSegmentValue: null,
      defaultShowPortfolio: null,
      defaultPASManager: null,
      defaultPASManagerValue: null,
      totalPages: 0,
      showModal: false,

      accountStatusUpdate: [], // for saving
    },
    changedAccountStatus: {
      // for popup
      accountrecid: null,
      acctStatusID: null,
      acctStatusName: "",
    },
    changedAccountStatusOption: false,
    accountStatusChangeAlert: {
      showAlertModal: false,
    },
    accountChangeOptions: [
      {
        accountStatusId: null,
        accountStatusName: null,
      },
    ],
    isMakingRequest: false,
  });
  const [resetInput, setResetInput] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [currentYear, setCurrentYear] = useState("Current Year");

  //popup select dropdown
  const accountStatusUpdateHandler = (event) => {
    if (event.target.value !== "0") {
      const changedAccountStatus = { ...state.changedAccountStatus };
      changedAccountStatus.acctStatusID = event.target.value;
      changedAccountStatus.acctStatusName =
        event.target.options[event.target.selectedIndex].text;
      setState((prevState) => ({
        ...prevState,
        changedAccountStatus: changedAccountStatus,
        changedAccountStatusOption: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        changedAccountStatusOption: false,
      }));
    }
  };

  //popup save selected account status to grid.
  const saveChangeAccountStatus = () => {
    if (state.changedAccountStatusOption) {
      //update the grid value
      let update = false;
      const updateAccountStatusUpdate =
        state.accountStatusListData.accountStatusUpdate.map((item) => {
          if (item.accountrecid == state.changedAccountStatus.accountrecid) {
            const updatedItem = {
              ...item,
              acctStatusID: state.changedAccountStatus.acctStatusID,
            };
            update = true;
            return updatedItem;
          }
          return item;
        });

      const newAccountStatusList =
        state.accountStatusListData.accountStatusList.map((item) => {
          if (item.accountrecid == state.changedAccountStatus.accountrecid) {
            const updatedItem = {
              ...item,
              acctStatusID: state.changedAccountStatus.acctStatusID,
              acctStatusName: state.changedAccountStatus.acctStatusName,
            };

            if (!update) {
              addItemAccountStatus(state.changedAccountStatus);
            }
            return updatedItem;
          }
          return item;
        });

      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: newAccountStatusList,
        },
      }));

      //update save data  json
      if (update) {
        setState((prevState) => ({
          ...prevState,
          accountStatusListData: {
            ...prevState.accountStatusListData,
            accountStatusUpdate: updateAccountStatusUpdate,
          },
        }));
      }

      closeModal();
      setState((prevState) => ({
        ...prevState,
        changedAccountStatusOption: false,
      }));
    } else {
      //show alert validation message
      //alert(`Please select a Status reason`);
      setState((prevState) => ({
        ...prevState,
        accountStatusChangeAlert: {
          ...prevState.accountStatusChangeAlert,
          showAlertModal: true,
        },
      }));
      return false;
    }
  };

  // Add account status to save data
  const addItemAccountStatus = (item) => {
    const addAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.concat({
        accountrecid: parseInt(item.accountrecid),
        changed: "Y",
        locked: item.locked,
        process_aer: item.process_aer,
        acctStatusID: item.acctStatusID,
        status_text: item.status_text,
        internalpasnotes: item.internalpasnotes,
      });

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusUpdate: addAccountStatusUpdate,
      },
    }));
  };

  // on change of locked column value
  const onChangeLocked = (event) => {
    const { id, checked } = event.target;
    if (
      event.nativeEvent.shiftKey &&
      state.lastLockedRowId !== null &&
      checked
    ) {
      const lastLockedRowIndex =
        state.accountStatusListData.accountStatusList.findIndex(
          (item) => item.accountrecid == state.lastLockedRowId
        );
      const currentLockedRowIndex =
        state.accountStatusListData.accountStatusList.findIndex(
          (item) => item.accountrecid == id
        );
      let gridValueUpdate = [...state.accountStatusListData.accountStatusList];
      if (lastLockedRowIndex < currentLockedRowIndex) {
        for (let i = lastLockedRowIndex + 1; i <= currentLockedRowIndex; i++) {
          gridValueUpdate = gridValueUpdate.map((item, index) => {
            if (index == i) {
              const updatedItem = {
                ...item,
                locked: checked == true ? "Y" : "N",
                acctStatusID: checked == true ? 1 : item.acctStatusID,
                acctStatusName:
                  checked == true ? "Loaded" : item.acctStatusName,
              };
              addItemLocked(item.accountrecid, checked, updatedItem);
              return updatedItem;
            }
            return item;
          });
        }
      } else if (lastLockedRowIndex > currentLockedRowIndex) {
        for (let i = lastLockedRowIndex - 1; i >= currentLockedRowIndex; i--) {
          gridValueUpdate = gridValueUpdate.map((item, index) => {
            if (index == i) {
              const updatedItem = {
                ...item,
                locked: checked == true ? "Y" : "N",
                acctStatusID: checked == true ? 1 : item.acctStatusID,
                acctStatusName:
                  checked == true ? "Loaded" : item.acctStatusName,
              };
              addItemLocked(item.accountrecid, checked, updatedItem);
              return updatedItem;
            }
            return item;
          });
        }
      }
      if (gridValueUpdate.length > 0) {
        setState((prevState) => ({
          ...prevState,
          lastLockedRowId: id,
          accountStatusListData: {
            ...prevState.accountStatusListData,
            accountStatusList: gridValueUpdate,
          },
        }));
      }
    } else {
      let update = false;
      const updateAccountStatusUpdate =
        state.accountStatusListData.accountStatusUpdate.map((item) => {
          if (item.accountrecid == id) {
            update = true;
            const updatedItem = {
              ...item,
              changed: "Y",
              locked: checked == true ? "Y" : "N",
              acctStatusID: checked == true ? 1 : item.acctStatusID,
              acctStatusName: checked == true ? "Loaded" : item.acctStatusName,
            };

            return updatedItem;
          }

          return item;
        });

      const gridValueUpdate = state.accountStatusListData.accountStatusList.map(
        (item) => {
          if (item.accountrecid == id) {
            const updatedItem = {
              ...item,
              locked: checked == true ? "Y" : "N",
              acctStatusID: checked == true ? 1 : item.acctStatusID,
              acctStatusName: checked == true ? "Loaded" : item.acctStatusName,
            };
            if (!update) {
              addItemLocked(id, checked, updatedItem);
            }
            return updatedItem;
          }
          return item;
        }
      );

      //update grid with changed value
      if (gridValueUpdate.length > 0) {
        setState((prevState) => ({
          ...prevState,
          lastLockedRowId: id,
          accountStatusListData: {
            ...prevState.accountStatusListData,
            accountStatusList: gridValueUpdate,
          },
        }));
      }

      if (update) {
        setState((prevState) => ({
          ...prevState,
          lastLockedRowId: id,
          accountStatusListData: {
            ...prevState.accountStatusListData,
            accountStatusUpdate: updateAccountStatusUpdate,
          },
        }));
      }
    }
  };

  const addItemLocked = (id, checked, item) => {
    const addAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.concat({
        accountrecid: parseInt(id),
        changed: "Y",
        locked: checked == true ? "Y" : "N",
        process_aer: item.process_aer,
        acctStatusID: item.acctStatusID,
        status_text: item.status_text,
        internalpasnotes: item.internalpasnotes,
      });

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusUpdate: addAccountStatusUpdate,
      },
    }));
  };

  const onChangeGPP = (event) => {
    const { id, checked } = event.target;
    let update = false;

    const updateAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.map((item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            process_aer: checked == true ? "Y" : "N",
          };
          update = true;
          return updatedItem;
        }
        return item;
      });

    const gridValueUpdate = state.accountStatusListData.accountStatusList.map(
      (item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            process_aer: checked == true ? "Y" : "N",
          };
          if (!update) {
            addItemGPP(id, checked, updatedItem);
          }
          return updatedItem;
        }
        return item;
      }
    );

    //update grid with changed value
    if (gridValueUpdate.length > 0) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: gridValueUpdate,
        },
      }));
    }

    if (update) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusUpdate: updateAccountStatusUpdate,
        },
      }));
    }
  };

  const addItemGPP = (id, checked, item) => {
    const addAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.concat({
        accountrecid: parseInt(id),
        changed: "Y",
        locked: item.locked,
        process_aer: checked == true ? "Y" : "N",
        acctStatusID: item.acctStatusID,
        status_text: item.status_text,
        internalpasnotes: item.internalpasnotes,
      });

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusUpdate: addAccountStatusUpdate,
      },
    }));
  };

  const onChangeAccountNotes = (event) => {
    const { id, value } = event.target;

    let update = false;
    const updateAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.map((item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            status_text: value,
          };
          update = true;
          return updatedItem;
        }
        return item;
      });

    const gridValueUpdate = state.accountStatusListData.accountStatusList.map(
      (item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            status_text: value,
          };
          if (!update) {
            addItemAccountNotes(id, value, updatedItem);
          }
          return updatedItem;
        }
        return item;
      }
    );

    //update grid with changed value
    if (gridValueUpdate.length > 0) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: gridValueUpdate,
        },
      }));
    }

    if (update) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusUpdate: updateAccountStatusUpdate,
        },
      }));
    }
  };

  const onKeyPressAccountNotes = (event, max) => {
    const value = event.target.value;
    const id = event.target.id;
    Utils.checkMaxChar(value, 250);

    let update = false;
    const updateAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.map((item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            status_text: value,
          };
          update = true;
          return updatedItem;
        }
        return item;
      });

    const gridValueUpdate = state.accountStatusListData.accountStatusList.map(
      (item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            status_text: value,
          };
          if (!update) {
            addItemAccountNotes(id, value, updatedItem);
          }
          return updatedItem;
        }
        return item;
      }
    );

    //update grid with changed value
    if (gridValueUpdate.length > 0) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: gridValueUpdate,
        },
      }));
    }

    if (update) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusUpdate: updateAccountStatusUpdate,
        },
      }));
    }
  };

  const addItemAccountNotes = (id, value, item) => {
    const addAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.concat({
        accountrecid: parseInt(id),
        changed: "Y",
        status_text: value,
        locked: item.locked,
        process_aer: item.process_aer,
        acctStatusID: item.acctStatusID,
        internalpasnotes: item.internalpasnotes,
      });

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusUpdate: addAccountStatusUpdate,
      },
    }));
  };

  const onChangeInternalPasNotes = (event) => {
    const { id, value } = event.target;
    let update = false;

    const updateAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.map((item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            internalpasnotes: value,
          };
          update = true;
          return updatedItem;
        }
        return item;
      });

    const gridValueUpdate = state.accountStatusListData.accountStatusList.map(
      (item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            internalpasnotes: value,
          };
          if (!update) {
            addItemInternalPasNotes(id, value, updatedItem);
          }
          return updatedItem;
        }
        return item;
      }
    );

    //update grid with changed value
    if (gridValueUpdate.length > 0) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: gridValueUpdate,
        },
      }));
    }

    if (update) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusUpdate: updateAccountStatusUpdate,
        },
      }));
    }
  };

  const onKeyPressInternalPasNotes = (event, max) => {
    const id = event.target.id;
    const value = event.target.value;
    Utils.checkMaxChar(value, 250);

    let update = false;

    const updateAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.map((item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            changed: "Y",
            internalpasnotes: value,
          };
          update = true;
          return updatedItem;
        }
        return item;
      });

    const gridValueUpdate = state.accountStatusListData.accountStatusList.map(
      (item) => {
        if (item.accountrecid == id) {
          const updatedItem = {
            ...item,
            internalpasnotes: value,
          };
          if (!update) {
            addItemInternalPasNotes(id, value, updatedItem);
          }
          return updatedItem;
        }
        return item;
      }
    );

    //update grid with changed value
    if (gridValueUpdate.length > 0) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: gridValueUpdate,
        },
      }));
    }

    if (update) {
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusUpdate: updateAccountStatusUpdate,
        },
      }));
    }
  };

  const addItemInternalPasNotes = (id, value, item) => {
    const addAccountStatusUpdate =
      state.accountStatusListData.accountStatusUpdate.concat({
        accountrecid: parseInt(id),
        changed: "Y",
        internalpasnotes: value,
        locked: item.locked,
        process_aer: item.process_aer,
        acctStatusID: item.acctStatusID,
        status_text: item.status_text,
      });

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusUpdate: addAccountStatusUpdate,
      },
    }));
  };

  // text area validate
  const validate = (event) => {
    const { value } = event.target;
    Utils.checkMaxChar(value, 250);
  };

  //Search filter changes
  const accountStatusChangeHandler = (event) => {
    const { type, id, value, checked } = event.target;

    const searchFilterData = { ...state.accountStatusListData.searchTerms };

    //"searchperiod"
    if (id === Settings.accountStatusList.filter.formFields.period.id) {
      searchFilterData.period = value;
      searchFilterData.searchperiod = value;
    }
    //"r_1"
    else if (id === Settings.accountStatusList.filter.formFields.showAll.id) {
      searchFilterData.filterString = "";
      searchFilterData.isShowAllAccounts = true;
      searchFilterData.isStringSearch = false;
      searchFilterData.r_1 = "ALL";
      // localStorage.removeItem("startsWith");
    }
    // "r_StartsWith"
    else if (id === Settings.accountStatusList.filter.formFields.showStart.id) {
      searchFilterData.filterString = "";
      searchFilterData.isShowAllAccounts = false;
      searchFilterData.isStringSearch = true;
      searchFilterData.r_1 = null;
    }
    //"orderby"
    else if (id === Settings.accountStatusList.filter.formFields.sort.id) {
      searchFilterData.orderby = value;
    }
    //"accountpricingtype"
    else if (
      id === Settings.accountStatusList.filter.formFields.accountType.id
    ) {
      searchFilterData.accountpricingtype = value;
    }
    //"filterString"
    else if (
      id === Settings.accountStatusList.filter.formFields.showStart.textId
    ) {
      searchFilterData.filterString = value;
      searchFilterData.isShowAllAccounts = false;
      searchFilterData.isStringSearch = true;
    }
    //"c_1"
    else if (
      id === Settings.accountStatusList.filter.formFields.showPortfolio.id
    ) {
      if (localStorage.getItem("showPortfolioType") === null) {
        searchFilterData.toShowPortfolio = checked;
      } else {
        searchFilterData.toShowPortfolio = false;
      }
      localStorage.removeItem("showPortfolio");
      localStorage.removeItem("showPortfolioType");
      if (checked) {
        //showPortfolioType: A,showPortfolio: A
        searchFilterData.showPortfolio = "A";
        searchFilterData.showPortfolioType = "A";
      } else {
        //showPortfolioType: Y, showPortfolio: N
        searchFilterData.showPortfolio = "N"; // ShowPortfolio should be N when unchecking the show portfolio option
        searchFilterData.showPortfolioType = "N";
      }
    }
    //portfolioOption
    else if (
      id === Settings.accountStatusList.filter.formFields.portfolioOption.id
    ) {
      searchFilterData.showPortfolio = value;
      searchFilterData.showPortfolioType = value;
    }

    //"accountStatusRefList"
    else if (
      id ===
      Settings.accountStatusList.filter.formFields.accountStatusRefList.id
    ) {
      searchFilterData.accountstatus = value;
    }
    //"accountSegment"
    else if (
      id === Settings.accountStatusList.filter.formFields.accountSegment.id
    ) {
      searchFilterData.accountsegment =
        value == "All Account Segments" ? "*" : value;
    }
    //"pasManager"
    else if (
      id === Settings.accountStatusList.filter.formFields.pasManager.id
    ) {
      searchFilterData.pasManager = value;
    }

    // pagination
    if (
      type === "text" &&
      id === Settings.accountStatusList.currentPageId.currentPage
    ) {
      searchFilterData.strPage.page = value;
    }

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        searchTerms: searchFilterData,
      },
    }));
  };

  // set account status list data after fetching from API
  const setAccountStatusListData = (data: any) => {
    if (data != "success") {
      const accountStatusListdata = { ...state.accountStatusListData };

      const periodList = Util.getPeriodLst(data.accountfilterlists.periodList);
      accountStatusListdata.accountStatusFilterLists.periodList = periodList;

      // sort by
      const sortByList = Settings.accountStatusList.filter.sortOptions;
      const defaultSort = sortByList.filter(
        (d) => d.orderBy === Settings.accountStatusList.one
      );
      const defaultSortByValue = defaultSort[0].orderBy;
      const defaultSortBy = defaultSort[0];

      const defaultPortfolioOptionByValue =
        Settings.accountStatusList.filter.portfolioOptions[0].portfolioType;

      // account type
      accountStatusListdata.accountStatusFilterLists.accountPricingTypeList =
        Util.appendJsonObj(
          Settings.accountStatusList.allAccountTypes,
          data.accountfilterlists.accountPricingTypeList
        );

      //accountStatusRefList
      accountStatusListdata.accountStatusFilterLists.accountStatusRefList =
        Util.appendJsonObj(
          Settings.accountStatusList.allaccountStatusRef,
          data.accountStatusRefList
        );

      // account segment
      accountStatusListdata.accountStatusFilterLists.accountSegmentList =
        Util.appendJsonObj(
          Settings.accountStatusList.allAccountSegments,
          data.accountfilterlists.accountSegmentList
        );

      //PAS account manager
      accountStatusListdata.accountStatusFilterLists.pasManagerList =
        Util.appendJsonObj(
          Settings.accountStatusList.allPASManagers,
          data.pasManagerList
        );

      accountStatusListdata.accountStatusList = data.accountStatusList;

      accountStatusListdata.totalPages = data.totalPages;

      const defaultSegment = Settings.accountStatusList.allAccountSegments;
      const defaultSegmentValue =
        Settings.accountStatusList.allAccountSegments.accountsegment;
      let defaultAccountType, defaultAccountTypeValue;

      if (
        appContext?.user?.isSalesUser ||
        appContext?.user?.isLimitedSalesUser
      ) {
        defaultAccountType =
          accountStatusListdata.accountStatusFilterLists
            .accountPricingTypeList[0].accountpricingtype;
        defaultAccountTypeValue =
          accountStatusListdata.accountStatusFilterLists
            .accountPricingTypeList[0].accountpricing;
      } else {
        defaultAccountType =
          data.accountfilterlists.accountPricingTypeList.filter(
            (d) =>
              d.accountpricingtype ===
              Settings.accountStatusList.allAccountTypes
          );
        defaultAccountTypeValue =
          data.accountfilterlists.accountPricingTypeList[0].accountpricingtype;
      }
      const defaultStatus = Settings.accountStatusList.allaccountStatusRef;
      const defaultStatusValue =
        Settings.accountStatusList.allaccountStatusRef.accountStatusName;
      const defaultPeriod = periodList[Object.keys(periodList)[0]];
      const defaultPASManager = Settings.accountStatusList.allPASManagers;
      const defaultPASManagerValue =
        Settings.accountStatusList.allPASManagers.adminRespondentid;
      const defaultShowPortfolio =
        Settings.accountStatusList.filter.formFields.showPortfolio.value;
      const defaultShowAll =
        Settings.accountStatusList.filter.formFields.showAll.value;
      const defaultAccountStartsWith =
        Settings.accountStatusList.filter.formFields.showStart.value;

      if (!state.accountStatusListData.isSearched) {
        accountStatusListdata.selectedAccount.searchperiod =
          defaultPeriod.period;
        accountStatusListdata.selectedAccount.period = defaultPeriod.period;
        accountStatusListdata.selectedAccount.r_1 = defaultShowAll;
        accountStatusListdata.selectedAccount.c_1 = defaultAccountStartsWith;
        accountStatusListdata.selectedAccount.showPortfolio =
          defaultShowPortfolio;
        accountStatusListdata.selectedAccount.orderby = defaultSortByValue;
        accountStatusListdata.selectedAccount.accountpricingtype =
          defaultAccountType;
        accountStatusListdata.selectedAccount.filterString = "";
        accountStatusListdata.selectedAccount.accountsegment =
          defaultSegment.accountsegment;
        accountStatusListdata.selectedAccount.accountstatus =
          defaultStatus.accountStatusId;
        accountStatusListdata.selectedAccount.pasManager =
          defaultPASManager.adminRespondentid;
        accountStatusListdata.selectedAccount.portfolioOption =
          defaultPortfolioOptionByValue;
        //accountStatusListdata.selectedAccount.strPage.page = 1;
        //accountStatusListdata.selectedAccount.totalPages = totalPages;
      }
      state.accountStatusListData.isSearched = false;
      accountStatusListdata.isSearched = state.accountStatusListData.isSearched;

      accountStatusListdata.defaultPeriod = defaultPeriod;
      accountStatusListdata.defaultShowAll = defaultShowAll;
      accountStatusListdata.defaultSortBy = defaultSortBy;
      (accountStatusListdata.defaultSortByValue = defaultSortByValue),
        (accountStatusListdata.defaultAccountType = defaultAccountType),
        (accountStatusListdata.defaultAccountTypeValue =
          defaultAccountTypeValue),
        (accountStatusListdata.defaultAccountStartsWith =
          defaultAccountStartsWith),
        (accountStatusListdata.defaultShowPortfolio = defaultShowPortfolio),
        (accountStatusListdata.defaultaccountStatusRefList = defaultStatus),
        (accountStatusListdata.defaultaccountStatusRefListValue =
          defaultStatusValue),
        (accountStatusListdata.defaultSegment = defaultSegment),
        (accountStatusListdata.defaultSegmentValue = defaultSegmentValue),
        (accountStatusListdata.defaultPASManager = defaultPASManager),
        (accountStatusListdata.defaultPASManagerValue = defaultPASManagerValue),
        (accountStatusListdata.defaultPortfolioOptionByValue =
          defaultPortfolioOptionByValue),
        data &&
        setState({
          ...state,
          accountStatusListData: accountStatusListdata,
        });
    }
  };

  // Alert popup close button click
  const closeAlertModal = () => {
    setState((prevState) => ({
      ...prevState,
      accountStatusChangeAlert: {
        ...prevState.accountStatusChangeAlert,
        showAlertModal: false,
      },
    }));
  };

  // popup close button click
  const closeModal = (infoid?: number) => {
    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        showModal: false,
      },
    }));
  };

  // show popup for account status change
  const showModal = (infoid?: number) => {
    setState((prevState) => ({
      ...prevState,
      changedAccountStatus: {
        ...prevState.changedAccountStatus,
        accountrecid: infoid,
      },
    }));

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        showModal: !prevState.accountStatusListData.showModal,
      },
    }));
  };

  //Search data based on search parameters
  const searchAccountStatusLists = (pageSearched?: any) => {
    const searchFilterData = { ...state.accountStatusListData.searchTerms };
    localStorage.removeItem("accountStatusList");
    localStorage.removeItem("totalPages");
    setState((prevState) => ({
      ...prevState,
      showPortfolioColumn: searchFilterData.toShowPortfolio,
    }));

    if (searchFilterData.period == null) {
      if (localStorage.getItem("Period") != null) {
        searchFilterData.period = localStorage.getItem("Period");
      } else {
        searchFilterData.period =
          state.accountStatusListData.accountStatusFilterLists.periodList[0].period;
      }
    }

    searchFilterData.searchperiod = searchFilterData?.searchperiod
      ? searchFilterData?.searchperiod
      : localStorage.getItem("Period") != null
        ? localStorage.getItem("Period")
        : searchFilterData.period;
    setCurrentYear(searchFilterData.searchperiod);

    if (searchFilterData.accountpricingtype == null) {
      if (localStorage.getItem("accountpricingtype") != null) {
        searchFilterData.accountpricingtype =
          localStorage.getItem("accountpricingtype");
      } else {
        searchFilterData.accountpricingtype = "C";
      }
    }

    if (searchFilterData.accountstatus == null) {
      if (localStorage.getItem("accountstatus") != null) {
        searchFilterData.accountstatus = localStorage.getItem("accountstatus");
      } else {
        searchFilterData.accountstatus = 0;
      }
    }

    if (searchFilterData.r_1 == null) {
      if (searchFilterData.filterString == "") {
        if (localStorage.getItem("startsWith") != null) {
          searchFilterData.filterString = localStorage.getItem("startsWith");
          searchFilterData.isShowAllAccounts = false;
          searchFilterData.isStringSearch = true;
          searchFilterData.r_1 = null;
        } else {
          searchFilterData.r_1 = "ALL";
          searchFilterData.isShowAllAccounts = true;
          searchFilterData.isStringSearch = false;
        }
      } else {
        localStorage.setItem("startsWith", searchFilterData.filterString);
        searchFilterData.isShowAllAccounts = false;
        searchFilterData.isStringSearch = true;
        searchFilterData.r_1 = null;
      }
    } else {
      localStorage.removeItem("startsWith");
    }

    if (searchFilterData.accountsegment == null) {
      if (localStorage.getItem("accountsegment") != null) {
        searchFilterData.accountsegment =
          localStorage.getItem("accountsegment");
      } else {
        searchFilterData.accountsegment = "*";
      }
    }

    if (searchFilterData.orderby == null) {
      if (localStorage.getItem("orderby") != null) {
        searchFilterData.orderby = localStorage.getItem("orderby");
      } else {
        searchFilterData.orderby = 0;
      }
    }

    if (searchFilterData.showPortfolio == null) {
      if (localStorage.getItem("showPortfolio") != null) {
        searchFilterData.showPortfolio = localStorage.getItem("showPortfolio");
        searchFilterData.toShowPortfolio =
          searchFilterData.showPortfolio == "Y" ? true : false;
      } else {
        searchFilterData.showPortfolio = "N";
      }
    }

    if (searchFilterData.pasManager == null) {
      if (localStorage.getItem("pasManager") != null) {
        searchFilterData.pasManager = localStorage.getItem("pasManager");
      } else {
        searchFilterData.pasManager = "*";
      }
    }

    searchFilterData.totalPages =
      searchFilterData.totalPages == null ? 0 : searchFilterData.totalPages;

    localStorage.setItem("Period", searchFilterData.period);
    localStorage.setItem(
      "accountpricingtype",
      searchFilterData.accountpricingtype
    );
    localStorage.setItem("accountstatus", searchFilterData.accountstatus);
    localStorage.setItem("accountsegment", searchFilterData.accountsegment);
    localStorage.setItem("orderby", searchFilterData.orderby);
    if (searchFilterData.toShowPortfolio === true) {
      localStorage.setItem("showPortfolio", searchFilterData.showPortfolio);
      localStorage.setItem(
        "showPortfolioType",
        searchFilterData.showPortfolioType
      );
    }
    localStorage.setItem("pasManager", searchFilterData.pasManager);
    localStorage.setItem("setLocalStorage", "Y");

    if (
      pageSearched >= 1 &&
      pageSearched <= state.accountStatusListData.totalPages
    ) {
      searchFilterData.strPage.page = pageSearched;
    }

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        isSearched: true,
        searchTerms: searchFilterData,
      },
      isMakingRequest: true,
    }));

    API.getGridData(searchFilterData).then((res) => {
      //reset the updated data
      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusUpdate: [],
        },
        isMakingRequest: false,
      }));
      if (pageSearched === 1) {
        setResetInput(true);
      }
      const container = document.getElementsByClassName(
        "p-datatable-scrollable-body"
      );
      if (container && container[0]) {
        container[0].scrollTop = 0;
      }

      setState((prevState) => ({
        ...prevState,
        accountStatusListData: {
          ...prevState.accountStatusListData,
          accountStatusList: res.accountStatusList,
          totalPages: res.totalPages,
        },
      }));
      //localStorage.setItem("accountStatusList", JSON.stringify(res.accountStatusList));
      localStorage.setItem("totalPages", JSON.stringify(res.totalPages));
    });
  };

  const handleSearch = (pageNumber = 1) => {
    searchAccountStatusLists(pageNumber);
  };

  const saveAccountStatusLists = () => {
    const selectedData = { ...state.accountStatusListData.selectedAccount };
    const accountStatusUpdate = [
      ...state.accountStatusListData.accountStatusUpdate,
    ];
    let accountList = [];
    //construct data in specific format
    accountStatusUpdate.map((d) => {
      const keys = Object.keys(d);
      keys.map((key) => {
        if (key === "accountrecid") {
          const jsonPair = {};
          jsonPair[d[key]] = d;
          accountList.push(jsonPair);
        }
      });
    });

    accountList = accountList.reduce(function (result, item) {
      const key = Object.keys(item)[0]; //first property: a, b, c
      result[key] = item[key];
      return result;
    }, {});

    const params = {
      searchperiod: selectedData.searchperiod,
      r_1: selectedData.r_1,
      orderby: selectedData.orderby,
      accountpricingtype: "C", //selectedData.accountpricingtype,
      accountsegment: selectedData.accountsegment,
      strPage: {
        page: selectedData.strPage.page == 0 ? 1 : selectedData.strPage.page,
        maxpagelen: selectedData.totalPages,
      },
      period: selectedData.period,
      formChg: "Y",
      pasManager: selectedData.pasManager,

      strAccountStatusUpdate: JSON.stringify(accountList),
    };

    return API.saveAccountStatusInfo(params);
  };

  const lockAllAccountStatusLists = () => {
    //to update grid one by one
    const updateAccountStatusList = [
      ...state.accountStatusListData.accountStatusList,
    ];

    const search = (element) => element.locked == "N";
    const ind = updateAccountStatusList.findIndex(search);
    if (ind != -1) {
      updateAccountStatusList[ind].changed = "Y";
      updateAccountStatusList[ind].locked = "Y";
    }

    //set grid data
    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusList: updateAccountStatusList,
      },
    }));

    // preparing data for save
    const accountStatusList = [
      ...state.accountStatusListData.accountStatusList,
    ];

    const updatedlist = accountStatusList.map((item) => {
      const updatedItem = {
        ...item,
        changed: item.changed ? item.changed : "N",
        locked: item.locked ? item.locked : "N",
        accountrecid: parseInt(item.accountrecid),
        internalpasnotes: item.internalpasnotes,
        process_aer: item.process_aer,
        acctStatusID: item.acctStatusID,
        status_text: item.status_text,
      };
      return updatedItem;
      return item;
    });

    setState((prevState) => ({
      ...prevState,
      accountStatusListData: {
        ...prevState.accountStatusListData,
        accountStatusUpdate: updatedlist,
      },
    }));
  };

  const accountStatusListContext = {
    state,
    setState,
    setAccountStatusListData,
    searchAccountStatusLists,
    saveAccountStatusLists,
    lockAllAccountStatusLists,
    handleSearch,
    accountStatusChangeHandler,
    closeModal,
    showModal,
    closeAlertModal,
    accountStatusUpdateHandler,
    validate,
    onChangeLocked,
    onChangeGPP,
    onChangeAccountNotes,
    onChangeInternalPasNotes,
    saveChangeAccountStatus,
    currentYear,
    setCurrentYear,
    appContext,
    resetInput,
    setResetInput,
    onKeyPressInternalPasNotes,
    onKeyPressAccountNotes,
  };

  return (
    <AccountStatusListContext.Provider value={accountStatusListContext}>
      {props.children}
    </AccountStatusListContext.Provider>
  );
};

export const AccountStatusListContextConsumer =
  AccountStatusListContext.Consumer;
export default AccountStatusListContext;
