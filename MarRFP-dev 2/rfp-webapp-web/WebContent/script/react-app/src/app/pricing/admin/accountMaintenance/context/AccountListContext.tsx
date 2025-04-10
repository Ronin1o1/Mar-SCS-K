import React, { useContext, useState } from "react";
import Settings from "../static/Settings";
import Util from "../../utils/Utils";
import API from "../service/API";
import Utils from "../../../../common/utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

const AccountListContext = React.createContext({});

export const AccountListContextProvider = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    accountListData: {
      accountfilterlists: {
        periodList: [],
        accountSegmentList: [
          { accounttype: null, accounttypedescription: null },
        ],
        accountPricingTypeList: [
          {
            accountpricingtype: null,
            accountpricing: null,
          },
        ],
      },

      accountlist: [
        {
          accountrecid: null,
          accounttypedescription: null,
          accountname: null,
          duedate: null,
          hotel_display: null,
          groupmeetings: null,
        },
      ],

      selectedAccount: {
        period: null,
        duedate: null,
        groupmeetings: null,
        accountName: null,
        accountrecid: null,
        searchperiod: null,
        r_1: null,
        orderby: null,
        accountpricingtype: null,
        filterString: "",
        accountsegment: null,
        strPage: { page: 1 },
        totalPages: null,
      },
      isSearched: false,
    },
    isActiveSearch: false,
    searchTerms: {
      searchperiod: null,
      r_1: null,
      orderby: null,
      accountpricingtype: null,
      filterString: "",
      accountsegment: null,
      strPage: { page: 1 },
      totalPages: null,
      period: null,
    },

    page: {
      page: "",
    },
    isSearchBtnClicked: false,
    isGroupMeetings: "Y",
    currentPage: 1,
    defaultSortByValue: null,
    defaultSortBy: null,
    defaultPeriodValue: null,
    defaultPeriod: null,
    defaultAccountTypeValue: null,
    defaultAccountType: null,
    defaultSegment: null,
    defaultSegmentValue: null,
    totalPages: 1,
    isShowAllAccounts: true,
    isStringSearch: false,
    filterString: "",
    activeTab: "criticalFields",
    accountFromToData: {
      accountdata: [
        {
          accountDetailGeneral: null,
          accountDropDowns: null,
          periodDetails: null,
          accountDetailCompMatrix: {
            accountid: null,
            accountname: null,
            accountpricingtype: null,
            accountrecid: 284720,
            accounttypedescription: null,
            duedate: null,
            groupmeetings: null,
            hotel_display: null,
            period: null,
            top_account: null,
            mergacqrename: null,
            addquestcomp: null,
            satrating: null,
            tacbonus: null,
            tacbonuscomments: null,
            rfpfilesent: [],
            totrfpfilesent: 0,
            renegsubmit: [],
            totrenegsubmit: 0,
            rateauditcomments: null,
            strAccountrecid: 284720,
          },
        },
      ],
    },
    accountCompDropDowns: {
      addQuestCompList: {
        data: [],
      },
      satRatingList: {
        data: [],
      },
      tacBonusList: {
        data: [],
      },
    },
    selectedAccountFromToData: {
      mergers: null,
      addendum: null,
      sales: null,
      account: null,
      totalAccount: null,
      substantiate: null,
      rfpFiles: null,
      renegotiation: null,
      totalRFP: null,
      totalRenegotiation: null,
      rateAudits: null,
      rfpfilesent: null,
      renegsubmit: null,
    },
    rfpLaunchEmailDataChange: {
      additional_text: null,
    },
    rfpLaunchEmailData: {
      rfpLaunchEmail: {
        accountrecid: null,
        additional_text: null,
      },
    },
    copyAccountInfoData: {
      accountList: [
        {
          accountid: null,
          accountname: null,
          accountpricingtype: null,
          accountrecid: null,
          accounttypedescription: null,
          duedate: null,
          groupmeetings: null,
          hotel_display: null,
          period: null,
          top_account: null,
          strAccountrecid: null,
        },
      ],
      periodList: [
        {
          period: null,
          startdate: null,
          enddate: null,
          hotelsview: null,
          dueDates: null,
          shortEnddate: null,
          shortStartdate: null,
        },
      ],
    },
    isComplete: false,
    onEmailLaunchModalOpen: false,
    onModalOpen: false,
    isCopyFromExistingAccount: true,
    isCopySAPP: false,
    selectedValue: "",
    accountDetails: {
      accountname: null,
      accountrecid: null,
    },

    valuesRFP: [],
    valuesReg: [],
    countRFP: 0,
    countReg: 0,
    totalRFP: 0,
    counterArray: [],
    counterFlag: 0,
    counterFlagReg: 0,
    flag: true,
    flagReg: true,
    oldReg: false,
    changeFlag: false,
    changeFlagReg: false,
    showModal: false,

    isDataSearched: false,
    isSpinnerLoading: true,
    calendarPickedDate: null,
    showDatePicker: false,
    isAccountMaintLinkClicked: false,
    roleDetails: {
      eid: null,
      role: null,
      fullName: null,
      email: null,
    },
  });

  const [resetInput, setResetInput] = useState(false);

  const [copiedAccount, setCopiedAccount] = useState({
    period: null,
    copyFromAccountRecid: null,
    copyFromPeriod: null,
    copySAPP: "",
    copyFromExistingAccount: "",
  });
  const [pageNumber, setPageNumber] = useState(1);

  const setAccountListData = (data: any) => {
    const accountListdata = { ...state.accountListData };
    const periodList = Util.getPeriodLst(data.accountfilterlists.periodList);
    accountListdata.accountfilterlists.periodList = periodList;
    accountListdata.accountfilterlists.accountSegmentList = Util.appendJsonObj(
      Settings.accountList.allAccountSegments,
      data.accountfilterlists.accountSegmentList
    );
    accountListdata.accountfilterlists.accountPricingTypeList =
      Util.appendJsonObj(
        Settings.accountList.allAccountTypes,
        data.accountfilterlists.accountPricingTypeList
      );
    accountListdata.accountlist = data.accountlist;

    const totalPages = data.totalPages;

    const defaultSortByValue = data.orderby;

    const defaultSegment = Settings.accountList.allAccountSegments;

    const defaultSegmentValue = data.accountsegment;

    const defaultAccountTypeValue = data.accountpricingtype;

    const defaultPeriod = data.period;

    if (!state.accountListData.isSearched) {
      accountListdata.selectedAccount.searchperiod = defaultPeriod;
      accountListdata.selectedAccount.period = defaultPeriod;
      accountListdata.selectedAccount.totalPages = totalPages;
      accountListdata.selectedAccount.r_1 =
        Settings.accountList.filter.formFields.showAll.value;
      accountListdata.selectedAccount.orderby = defaultSortByValue;
      accountListdata.selectedAccount.accountpricingtype =
        defaultAccountTypeValue;
      //accountListdata.selectedAccount.filterString = "";
      accountListdata.selectedAccount.accountsegment = defaultSegmentValue;

      accountListdata.selectedAccount.strPage.page = 1;
    }
    state.accountListData.isSearched = false;
    accountListdata.isSearched = state.accountListData.isSearched;

    const selectedAccountData = { ...state.accountListData.selectedAccount };
    if (selectedAccountData.filterString == "") {
      data.isShowAllAccounts = true;
      data.isStringSearch = false;
    } else {
      data.isShowAllAccounts = false;
      data.isStringSearch = true;
    }
    sessionStorage.setItem(
      "localAccountListData",
      JSON.stringify(accountListdata.selectedAccount)
    );

    data.isActiveSearch = false;
    data &&
      setState({
        ...state,
        accountListData: accountListdata,
        totalPages: totalPages,
        defaultSegment: defaultSegment,
        defaultPeriod: defaultPeriod,
        isShowAllAccounts: data.isShowAllAccounts,
        isStringSearch: data.isStringSearch,
        defaultSortByValue: defaultSortByValue,
        defaultSegmentValue: defaultSegmentValue,
        defaultAccountTypeValue: defaultAccountTypeValue,
      });
  };

  const setCopyAccountInfoData = (data: any) => {
    if (data) {
      let copyAccountInfoData = { ...state.copyAccountInfoData };
      copyAccountInfoData.accountList = Util.appendJsonObj(
        Settings.copyAccountInfo.copyAccount.initialCopyAccount,
        data.accountList
      );

      data.accountList = copyAccountInfoData.accountList;
      copyAccountInfoData = data;
      setState({
        ...state,
        copyAccountInfoData: copyAccountInfoData,
      });
    }
  };

  const onCopyNewAccountChangeHandler = (event) => {
    const copyAccountInfoData = { ...state };
    if (event.target.checked) {
      setState({
        ...state,
        isCopyFromExistingAccount: true,
      });
      sessionStorage.setItem("isCopyFromExistingAccount", "true");
    } else {
      setState({
        ...state,
        isCopyFromExistingAccount: false,
        accountDetails: {
          ...state.accountDetails,
          accountrecid: 0,
          accountname: "",
        },
      });
      sessionStorage.setItem("isCopyFromExistingAccount", "false");
    }
  };

  const onAccountDropdownChangeHandler = (event) => {
    const copyFromAccountRecId = event.target.value;

    const initialData = { ...state };
    const copyData = initialData.copyAccountInfoData.accountList.filter(
      (account) =>
        copyFromAccountRecId === "*"
          ? account.accountrecid === copyFromAccountRecId
          : parseInt(account.accountrecid) === parseInt(copyFromAccountRecId)
    );
    initialData.accountDetails.accountname = copyData[0].accountname;
    initialData.accountDetails.accountrecid = copyData[0].accountrecid;
    initialData.selectedValue = copyData[0].accountrecid;
    setState(initialData);
  };

  const onCopySAPPChangeHandler = (event) => {
    let initialCopySAPP = state.isCopySAPP;
    if (event.target.checked) {
      initialCopySAPP = true;
    } else {
      initialCopySAPP = false;
    }
    setState({
      ...state,
      isCopySAPP: initialCopySAPP,
    });
  };

  const handleChange = (i, event) => {
    const valuesRFP = [...state.valuesRFP];
    valuesRFP[i] = { ...valuesRFP[i], key: event.target.value };
    setState({ ...state, valuesRFP: valuesRFP });
  };

  const addClick = () => {
    setState((prevState) => ({
      ...state,
      valuesRFP: [...prevState.valuesRFP, ""],
    }));
  };
  const addClickRenegotiation = () => {
    setState((prevState) => ({
      ...state,
      valuesReg: [...prevState.valuesReg, ""],
    }));
  };

  const setEmailData = (data: any) => {
    setState((prevState) => ({
      ...prevState,
      rfpLaunchEmailData: {
        ...prevState.rfpLaunchEmailData,
        rfpLaunchEmail: data,
      },
    }));
  };

  const setAccountData = (data: any) => {
    if (data) {
      data.map((d, i) => {
        if (d.rfpfilesent != null) {
          data[i].rfpfilesent = Utils.getShortDate(d.rfpfilesent);
        }
        if (d.renegsubmit != null) {
          data[i].renegsubmit = Utils.getShortDate(d.renegsubmit);
        }
      });
      const accountFromToData = { ...state.accountFromToData };
      accountFromToData.accountdata = data;
      setState({
        ...state,
        accountFromToData: accountFromToData,
      });
    }
  };

  const switchTab = (event) => {
    setState({ ...state, activeTab: event.target.id });
  };

  const accountChangeHandler = (event) => {
    const { type, id, value } = event.target;
    const searchFilterData = { ...state.searchTerms };

    let isShowAllAccounts = true;
    let isStringSearch = false;

    if (
      searchFilterData.filterString != null &&
      searchFilterData.filterString != ""
    ) {
      isStringSearch = true;
      isShowAllAccounts = false;
    }

    if (type === "radio" && value === "ALL") {
      searchFilterData.filterString = "";
      isShowAllAccounts = true;
      isStringSearch = false;
    } else if (type === "radio" && value === "FILTER") {
      isShowAllAccounts = false;
      isStringSearch = true;
    }

    if (type === "text" && id === "filterString") {
      if (Util.toggleInputRadio(event)) {
        searchFilterData.filterString = value;
        isShowAllAccounts = false;
        isStringSearch = true;
      }
    }

    if (
      type === "text" &&
      id === Settings.accountList.currentPageId.currentPage
    ) {
      searchFilterData.strPage.page = value;
    }
    if (id == "accountsegment" && value == "All Account Segments") {
      searchFilterData[id] =
        Settings.accountList.allAccountSegments.accountsegment;
    } else {
      searchFilterData[id] = value;
    }

    if (isShowAllAccounts) {
      searchFilterData.r_1 =
        Settings.accountList.filter.formFields.showAll.value;
    } else {
      searchFilterData.r_1 =
        Settings.accountList.filter.formFields.showStart.value;
    }

    setState({
      ...state,
      searchTerms: searchFilterData,
      isShowAllAccounts: isShowAllAccounts,
      isStringSearch: isStringSearch,
    });
  };

  const handleSearch = (pageNumber = 1) => {
    searchAccountLists(pageNumber);
  };

  const searchAccountLists = (pageSearched?: any) => {
    const searchFilterData = { ...state.searchTerms };
    const selectedAccountData = { ...state.accountListData.selectedAccount };
    const data = { ...state };

    if (data.isShowAllAccounts) {
      selectedAccountData.r_1 =
        Settings.accountList.filter.formFields.showAll.value;
    }
    if (data.isStringSearch) {
      selectedAccountData.r_1 =
        Settings.accountList.filter.formFields.showStart.value;
    }
    searchFilterData.period = searchFilterData.searchperiod;
    if (searchFilterData.searchperiod !== null) {
      selectedAccountData.searchperiod = searchFilterData.searchperiod;
      selectedAccountData.period = searchFilterData.searchperiod;
    }
    if (searchFilterData.accountpricingtype !== null) {
      selectedAccountData.accountpricingtype =
        searchFilterData.accountpricingtype;
    }

    if (searchFilterData.accountsegment !== null) {
      selectedAccountData.accountsegment = searchFilterData.accountsegment;
    } else {
      selectedAccountData.accountsegment =
        Settings.accountList.allAccountSegments.accountsegment;
    }
    if (searchFilterData.orderby !== null) {
      selectedAccountData.orderby = searchFilterData.orderby;
    }
    if (searchFilterData.filterString !== null) {
      selectedAccountData.filterString = searchFilterData.filterString;
    }
    if (pageSearched >= 1 && pageSearched <= data.totalPages) {
      selectedAccountData.strPage.page = pageSearched;
    } else {
      selectedAccountData.strPage.page = 1;
    }

    data.accountListData.selectedAccount = selectedAccountData;
    state.accountListData.isSearched = true;
    data.searchTerms = searchFilterData;

    //reset toggle button for show ALL and startswith
    if (selectedAccountData.filterString == "") {
      data.isShowAllAccounts = true;
      data.isStringSearch = false;
    } else {
      data.isShowAllAccounts = false;
      data.isStringSearch = true;
    }
    data.isActiveSearch = true;
    setPageNumber(pageSearched);
    setState(data);
    setIsLoading(true);
    API.searchAccountList(selectedAccountData).then((data) => {
      setAccountListData(data);
      setIsLoading(false);
    });
  };

  const onChange = (event) => {
    const { id, value } = event.target;
    const selectedAccountFromToData = { ...state.selectedAccountFromToData };
    selectedAccountFromToData[id] = value;
    setState({
      ...state,
      selectedAccountFromToData: selectedAccountFromToData,
    });
    state.selectedAccountFromToData = selectedAccountFromToData;
    if (typeof selectedAccountFromToData.rfpFiles != "undefined") {
      selectedAccountFromToData.rfpFiles = Utils.getShortDate(
        selectedAccountFromToData.rfpFiles
      );
    }

    if (
      id === Settings.complexityMatrix.rfpFiles.id &&
      selectedAccountFromToData[id] !== "" &&
      selectedAccountFromToData.rfpFiles != "undefined" &&
      state.changeFlag === false
    ) {
      setState({ ...state, countRFP: state.countRFP + 1, changeFlag: true });
    } else {
      if (id === Settings.complexityMatrix.rfpFiles.id)
        if (state.countRFP > 0)
          setState({
            ...state,
            countRFP: state.countRFP - 1,
            changeFlag: false,
          });
    }

    if (
      id === Settings.complexityMatrix.renegotiation.id &&
      selectedAccountFromToData[id] !== "" &&
      selectedAccountFromToData.renegotiation != "undefined" &&
      state.changeFlagReg === false
    ) {
      setState({ ...state, countReg: state.countReg + 1, changeFlagReg: true });
    } else {
      if (id === Settings.complexityMatrix.renegotiation.id)
        if (state.countReg > 0)
          setState({
            ...state,
            countReg: state.countReg - 1,
            changeFlagReg: false,
          });
    }
    if (
      id === Settings.complexityMatrix.merger.id ||
      Settings.complexityMatrix.substantiate.id ||
      Settings.complexityMatrix.rateAudits.id
    ) {
      Utils.checkMaxChar(value, 255);
    }
  };

  const onChangeData = (event) => {
    const { id, value } = event.target;
    const selectedAccountFromToData = { ...state.selectedAccountFromToData };
    selectedAccountFromToData[id] = value;
    setState({
      ...state,
      selectedAccountFromToData: selectedAccountFromToData,
    });
    state.selectedAccountFromToData = selectedAccountFromToData;
    if (
      id === Settings.complexityMatrix.merger.id ||
      Settings.complexityMatrix.substantiate.id ||
      Settings.complexityMatrix.rateAudits.id
    ) {
      Utils.checkMaxChar(value, 255);
    }
  };

  const onSendEmail = () => {
    API.onRecapEmailLaunch(
      state.accountListData.selectedAccount.accountrecid,
      state.rfpLaunchEmailData.rfpLaunchEmail.additional_text,
      state.accountListData.selectedAccount.period
    ).then((data) => {
      alert(Settings.RFPEmailLaunch.sendEmail);
    });
    setState({
      ...state,
      onModalOpen: !state.onModalOpen,
    });
    onDataClear();
  };
  const onChangeEmailLaunch = (event) => {
    const additionalText = event.target.value;
    setState((prevState) => ({
      ...prevState,
      rfpLaunchEmailData: {
        ...prevState.rfpLaunchEmailData,
        rfpLaunchEmail: {
          ...prevState.rfpLaunchEmailData.rfpLaunchEmail,
          additional_text: additionalText,
        },
      },
    }));
  };

  const onUpdateEmailLaunchData = (event) => {
    API.updateEmailData(
      state.rfpLaunchEmailData.rfpLaunchEmail,
      state.accountListData.selectedAccount.period
    );

    alert(Settings.RFPEmailLaunch.saveData);

    setState({
      ...state,
      onModalOpen: !state.onModalOpen,
    });
  };

  const onDataClear = () => {
    setState((prevState) => ({
      ...prevState,
      rfpLaunchEmailData: {
        ...prevState.rfpLaunchEmailData,
        rfpLaunchEmail: {
          ...prevState.rfpLaunchEmailData.rfpLaunchEmail,
          additional_text: "",
        },
      },
    }));
  };

  const validate = (event) => {
    let emailLaunchString = event.target.value;
    const max_length = Settings.EditEmailLaunch.maxLength;
    if (emailLaunchString.length > max_length) {
      alert(Settings.EditEmailLaunch.emailLaunchAlertMessage);
    }
    emailLaunchString = emailLaunchString.substr(0, max_length);
    setState((prevState) => ({
      ...prevState,
      rfpLaunchEmailData: {
        ...prevState.rfpLaunchEmailData,
        rfpLaunchEmail: {
          ...prevState.rfpLaunchEmailData.rfpLaunchEmail,
          additional_text: emailLaunchString,
        },
      },
    }));
  };

  const modalOpen = () => {
    setState({
      ...state,
      onModalOpen: !state.onModalOpen,
    });
  };

  const onCancel = () => {
    modalOpen();
    onDataClear();
  };

  const onCopyAccountModalHandler = () => {
    const displayModal = !state.showModal;
    setState({
      ...state,
      showModal: displayModal,
    });
  };

  const onShowModal = () => {
    setState({
      ...state,
      showModal: !state.showModal,
    });
  };

  const onDatePickedHandler = (event) => {
    const stateData = { ...state };

    stateData.calendarPickedDate = Utils.getShortDate(event.value);

    stateData.showDatePicker = false;
    setState(stateData);
  };
  const selectedAccountData = (data) => {
    const selectedAccountData = { ...state.accountListData.selectedAccount };
    const accountData = { ...state };

    selectedAccountData.accountName = data.accountname;
    selectedAccountData.accountrecid = data.accountrecid;
    selectedAccountData.duedate = data.duedate;
    selectedAccountData.groupmeetings = data.groupmeetings;
    accountData.accountListData.selectedAccount = selectedAccountData;
    accountData.activeTab = Settings.accountList.criticalFields;

    setState(accountData);
  };

  const retainCriticalFieldsTabState = () => {
    setState({
      ...state,
      activeTab: "criticalFields",
    });
  };

  const setUserDetails = () => {
    if (!appContext?.user) {
      const urs = sessionStorage.getItem("GETUSERDETAILS");
      if (urs) {
        setState({ ...state, roleDetails: JSON.parse(urs) });
      } else {
        API.getUserDetails().then((data) => {
          setState({ ...state, roleDetails: data });
        });
      }
    } else {
      setState({ ...state, roleDetails: appContext?.user });
    }
  };

  const accountListContext = {
    state,
    setState,
    copiedAccount,
    setCopiedAccount,
    setAccountListData,
    retainCriticalFieldsTabState,
    switchTab,
    searchAccountLists,
    accountChangeHandler,
    handleSearch,
    resetInput,
    setResetInput,
    onChange,
    validate,
    setCopyAccountInfoData,
    onCopyNewAccountChangeHandler,
    onAccountDropdownChangeHandler,
    onCopySAPPChangeHandler,
    setAccountData,
    onChangeData,
    modalOpen,
    onChangeEmailLaunch,
    onDataClear,
    setEmailData,
    onUpdateEmailLaunchData,
    handleChange,
    addClick,
    addClickRenegotiation,
    onSendEmail,
    onDatePickedHandler,
    selectedAccountData,
    onCopyAccountModalHandler,
    onShowModal,
    onCancel,
    clicked,
    setClicked,
    isLoading,
    setIsLoading,
    setUserDetails,
    pageNumber,
    setPageNumber,
  };

  return (
    <AccountListContext.Provider value={accountListContext}>
      {props.children}
    </AccountListContext.Provider>
  );
};

export const AccountListContextConsumer = AccountListContext.Consumer;
export default AccountListContext;
