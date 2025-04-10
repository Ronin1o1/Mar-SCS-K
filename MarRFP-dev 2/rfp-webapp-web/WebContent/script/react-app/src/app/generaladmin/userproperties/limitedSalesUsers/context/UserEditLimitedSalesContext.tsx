import React, { useState, useContext } from "react";
import APIEditLimitedSalesAccount from "../service/APIEditLimitedSalesAccount";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

// Set state variables and function
const UserEditLimitedSalesContext = React.createContext({});

export const UserEditLimitedSalesContextProvider = (props) => {
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    showScreenLoader: false,
    totNumProp: "",
    totNumUserProp: "",
    totPropPageLen: "",
    totPropSelPageLen: "",
    accountPricingArr: [],
    accountSegmentArr: [],

    user: {
      cn_firstname: null,
      cn_lastname: null,
      eid: null,
      companyname: null,
      accountname: null,
      optSel: null,
      acctcount: 0,
    },
    userArray: {
      accountlist: [],
      accountlistAll: [],
      fixedAllList: [],
      accTotalPage: 0,
    },
    tempArray: {
      tempAccountArr: [],
      tempAccountAllArr: [],
    },
  });

  const [userDetail, setUserDetail] = useState({
    userid: "",
    role: "",
  });
  const [isParentAPICalled, setIsParentAPICalled] = useState(false);

  const [resetInput, setResetInput] = useState(false);
  const [isChecked, setCheck] = useState(false);
  const [showCopyPage, setShowCopyPage] = useState(false);
  const [marshaCodes, setMarshaCodes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [searchCriteria, setAccountSearchCriteria] = useState({
    accountpricingtype: "*",
    accountsegment: "*",
    r_1: "ALL",
    alphaOrderAcct: "",
    strCurrPageAcct: {
      page: 1,
    },
    optSel: "P",
  });

  const [pNumber, setPNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(22);
  const [eidList, setEidList] = useState("");

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const refreshScroll = (id) => {
    const hotellistAllScroll = document.getElementById(id);
    if (hotellistAllScroll) {
      hotellistAllScroll.scrollTop = 0;
    }
  };
  const onClickSearch = (pageNumber = 1) => {
    setIsLoaded(false);
    const userval = { ...userDetail };
    APIEditLimitedSalesAccount.searchAvailAcctList(
      userval,
      searchCriteria,
      pageNumber
    ).then((data) => {
      if (data == "success") {
        const params = {
          userid: userval.userid,
          role: userval.role,
          showProperties: true,
          showAccounts: true,
          showManaged: true,
          optSel: "P",
          alphaOrderProp: "",
          filterByMorF: "O",
          alphaOrderAcct: searchCriteria.alphaOrderAcct,
          accountpricingtype: searchCriteria.accountpricingtype,
          accountsegment: searchCriteria.accountsegment,
          r_1: searchCriteria.r_1,
          strCurrPagePropSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
          strCurrPageProp: JSON.stringify({ page: 1, maxpagelen: 200 }),
          strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
          strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
          totPropSelPageLen: 1,
        };
        APIEditLimitedSalesAccount.populateAccountList(params).then(
          (searchData) => {
            setAccountData(searchData);
            setTotalPages(searchData.totPropPageLen);
          }
        );
      } else {
        if (data && data.status == "success") {
          const accountData = JSON.parse(JSON.stringify(state));
          accountData.userArray.accountlistAll = data.accountlistAll
            ? data.accountlistAll
            : [];
          setState(accountData);
          if (pageNumber === 1) {
            setResetInput(true);
          }
          setTotalPages(data?.totAcctPageLen);
        }
      }
      refreshScroll("accountlistAllScrollContainer");
      setIsLoaded(true);
    });
  };

  const setAccountList = (data) => {
    if (data) {
      const accountData = { ...state };
      accountData.userArray.accTotalPage = data.totAcctSelPageLen;
      accountData.userArray.accountlist = data.accountlist;
      accountData.user.acctcount = data.totNumUserAcct;
      setState(accountData);
    }
  };

  const setAccountData = (data) => {
    if (data) {
      const accountData = { ...state };
      accountData.userArray.accTotalPage = data.totAcctSelPageLen;
      accountData.userArray.accountlist = data.accountlist;
      accountData.userArray.accountlistAll = data.accountlistAll;
      accountData.userArray.fixedAllList = data.accountlistAll;
      accountData.accountPricingArr =
        data.accountfilterlists.accountPricingTypeList;
      accountData.accountSegmentArr =
        data.accountfilterlists.accountSegmentList;
      accountData.user.acctcount =
        data.accountlist && data.accountlist.length ? data.totNumUserAcct : 0;

      if (data.userDetails) {
        accountData.user.cn_firstname = data.userDetails.cn_firstname;
        accountData.user.cn_lastname = data.userDetails.cn_lastname;
        accountData.user.eid = data.userDetails.eid;
        accountData.user.companyname = data.userDetails.companyname;
        accountData.user.accountname = data.userDetails.accountname;
      }

      if (
        accountData.userArray.accountlist &&
        accountData.userArray.accountlist.length > 0
      ) {
        accountData.userArray.accountlist.filter(function (item) {
          item.checked = isChecked;
        });
      }

      if (
        accountData.userArray.accountlistAll &&
        accountData.userArray.accountlistAll.length > 0
      ) {
        accountData.userArray.accountlistAll.filter(function (item) {
          item.checked = isChecked;
        });
      }

      accountData.totNumProp = data.totNumProp;
      accountData.totNumUserProp = data.totNumUserProp;
      accountData.totPropPageLen = data.totPropPageLen;
      accountData.totPropSelPageLen = data.totPropSelPageLen;
      if (appContext?.user?.isAdminRole && !appContext?.user?.isSAPPAdmin) {
        const srchCriteria = { ...searchCriteria };
        srchCriteria.accountpricingtype = "C";
        setAccountSearchCriteria(srchCriteria);
      }
      setTotalPages(data?.totAcctPageLen ? data?.totAcctPageLen : 1);

      setState(accountData);
    }
  };

  const handleChangeInput = (event, type) => {
    if (type == "selectAcct") {
      handleChangeSelectAccount(event);
    } else if (type == "availAcct") {
      handleChangeAvailAccount(event);
    }
  };

  const handleChangeSelectAccount = (event) => {
    setCheck(!isChecked);
    const acctExchData = { ...state };
    if (acctExchData.tempArray.tempAccountArr.length > 0) {
      if (event.target.checked) {
        acctExchData.tempArray.tempAccountArr.push({
          accountid: event.target.id,
          accountname: event.target.name,
          accountpricingtype: null,
          accountrecid: null,
          accounttypedescription: null,
          duedate: null,
          groupmeetings: "N",
          hotel_display: "N",
          period: null,
          top_account: "N",
          checked: !isChecked,
        });
      } else {
        acctExchData.tempArray.tempAccountArr =
          acctExchData.tempArray.tempAccountArr.filter(function (item) {
            return item.accountid !== event.target.id;
          });
      }
    } else {
      acctExchData.tempArray.tempAccountArr.push({
        accountid: event.target.id,
        accountname: event.target.name,
        accountpricingtype: null,
        accountrecid: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
        checked: !isChecked,
      });
    }
    acctExchData.userArray.accountlist.filter(
      (account) =>
        !acctExchData.tempArray.tempAccountArr.some(function (selectAccount) {
          if (account.accountid == event.target.id) {
            account.checked = event.target.checked;
          }
        })
    );
    setState(acctExchData);
  };

  const handleChangeAvailAccount = (event) => {
    setCheck(!isChecked);
    const acctExchAvailData = { ...state };
    if (acctExchAvailData.tempArray.tempAccountAllArr.length > 0) {
      if (event.target.checked) {
        acctExchAvailData.tempArray.tempAccountAllArr.push({
          accountid: event.target.id,
          accountname: event.target.name,
          accountpricingtype: null,
          accountrecid: null,
          accounttypedescription: null,
          duedate: null,
          groupmeetings: "N",
          hotel_display: "N",
          period: null,
          top_account: "N",
          checked: !isChecked,
        });
      } else {
        acctExchAvailData.tempArray.tempAccountAllArr =
          acctExchAvailData.tempArray.tempAccountAllArr.filter(function (item) {
            return item.accountid !== event.target.id;
          });
      }
    } else {
      acctExchAvailData.tempArray.tempAccountAllArr.push({
        accountid: event.target.id,
        accountname: event.target.name,
        accountpricingtype: null,
        accountrecid: null,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: null,
        top_account: "N",
        checked: !isChecked,
      });
    }
    acctExchAvailData.userArray.accountlistAll.filter(
      (account) =>
        !acctExchAvailData.tempArray.tempAccountAllArr.some(function (
          availAccount
        ) {
          if (account.accountid == event.target.id) {
            account.checked = event.target.checked;
          }
        })
    );
    setState(acctExchAvailData);
  };

  const accountUpdate = (data) => {
    let strAccountUpdate = "";
    const accountUpdateData = { ...state };
    const tempAccLen = accountUpdateData.tempArray.tempAccountAllArr
      ? accountUpdateData.tempArray.tempAccountAllArr.length
      : 0;
    if (accountUpdateData.userArray.accountlist.length > 0) {
      if (accountUpdateData.tempArray.tempAccountAllArr.length > 0) {
        accountUpdateData.tempArray.tempAccountAllArr.filter((item) =>
          accountUpdateData.userArray.accountlist.push(item)
        );
      }
    } else {
      accountUpdateData.userArray.accountlist =
        accountUpdateData.tempArray.tempAccountAllArr;
    }
    accountUpdateData.userArray.accountlist.sort((a, b) =>
      a.accountname > b.accountname ? 1 : -1
    );
    if (accountUpdateData.tempArray.tempAccountAllArr.length > 0) {
      accountUpdateData.userArray.accountlistAll =
        accountUpdateData.userArray.accountlistAll.filter(
          (account) =>
            !accountUpdateData.tempArray.tempAccountAllArr.some(
              (availAcct) => account.accountid == availAcct.accountid
            )
        );
    }

    if (accountUpdateData.userArray.accountlistAll.length > 0) {
      accountUpdateData.userArray.accountlistAll.filter(function (item) {
        item.checked = false;
      });
    }

    if (accountUpdateData.userArray.accountlist.length > 0) {
      accountUpdateData.userArray.accountlist.filter(function (item) {
        item.checked = false;
        strAccountUpdate += item.accountid + ",";
      });
    }
    accountUpdateData.tempArray.tempAccountArr = [];
    accountUpdateData.tempArray.tempAccountAllArr = [];
    strAccountUpdate = strAccountUpdate.slice(0, -1);
    const updateParams = setParamsForAcct(strAccountUpdate);
    const selectParamsUpdate = setParamsForSelectAvail("SelectVal");
    setIsLoaded(false);
    APIEditLimitedSalesAccount.updateAccountList(updateParams).then((data) => {
      if (data && data.status == "success") {
        APIEditLimitedSalesAccount.updateSelectAccountList(
          selectParamsUpdate
        ).then((data) => {
          setIsLoaded(true);
          if (data.status == "success") {
            accountUpdateData.user.acctcount =
              accountUpdateData.user.acctcount + tempAccLen;
            setState(accountUpdateData);
          }
        });
      }
    });
  };

  const accountDelete = (data) => {
    let strAccountDelete = "";
    const accountDeleteData = { ...state };
    const tempDelAccLen = accountDeleteData.tempArray.tempAccountArr
      ? accountDeleteData.tempArray.tempAccountArr.length
      : 0;
    if (accountDeleteData.userArray.accountlistAll.length > 0) {
      if (accountDeleteData.tempArray.tempAccountArr.length > 0) {
        accountDeleteData.tempArray.tempAccountArr.filter((item) =>
          accountDeleteData.userArray.accountlistAll.push(item)
        );
      }
    } else {
      accountDeleteData.userArray.accountlistAll =
        accountDeleteData.tempArray.tempAccountArr;
    }
    accountDeleteData.userArray.accountlistAll.sort((a, b) =>
      a.accountname > b.accountname ? 1 : -1
    );
    if (accountDeleteData.tempArray.tempAccountArr.length > 0) {
      accountDeleteData.userArray.accountlist =
        accountDeleteData.userArray.accountlist.filter(
          (account) =>
            !accountDeleteData.tempArray.tempAccountArr.some(
              (selectAcct) => account.accountid == selectAcct.accountid
            )
        );
    }

    if (accountDeleteData.userArray.accountlist.length > 0) {
      accountDeleteData.userArray.accountlist.filter(function (item) {
        item.checked = false;
      });
    }

    if (accountDeleteData.userArray.accountlistAll.length > 0) {
      accountDeleteData.userArray.accountlistAll.filter(function (item) {
        item.checked = false;
        strAccountDelete += item.accountid + ",";
      });
      accountDeleteData.user.acctcount =
        accountDeleteData.user.acctcount - tempDelAccLen;
    }
    accountDeleteData.tempArray.tempAccountArr = [];
    accountDeleteData.tempArray.tempAccountAllArr = [];
    strAccountDelete = strAccountDelete.slice(0, -1);
    const deleteParams = setParamsForAcct(strAccountDelete);
    const selectParamsDelete = setParamsForSelectAvail("SelectVal");
    APIEditLimitedSalesAccount.deleteAccountList(deleteParams).then((data) => {
      if (data && data.status == "success") {
        const accountData = JSON.parse(JSON.stringify(state));
        accountData.userArray.accountlistAll = data.accountlistAll;
        setState(accountData);
        APIEditLimitedSalesAccount.updateSelectAccountList(
          selectParamsDelete
        ).then((data) => {
          if (data && data.status == "success") {
            setState(accountDeleteData);
          }
        });
      }
    });
  };

  const accountUnSelectAll = (data) => {
    const acctUnSelectData = { ...state };
    if (acctUnSelectData.userArray.accountlistAll.length > 0) {
      acctUnSelectData.userArray.accountlistAll.filter(function (item) {
        item.checked = false;
      });
    }
    acctUnSelectData.tempArray.tempAccountAllArr = [];
    acctUnSelectData.tempArray.tempAccountArr = [];
    setState(acctUnSelectData);
  };

  const setParamsForAcct = (selectedParams) => {
    const userval = { ...userDetail };
    let params;
    if (sessionStorage.getItem("EnhancedSalesContact") == "Y") {
      params = {
        userid: userval.userid,
        role: userval.role,
        acctSelList: selectedParams,
        enhancedSalesContact: "on",
        showAccounts: true,
        alphaOrderAcct: null,
        accountpricingtype: "*",
        accountsegment: "*",
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 20 }),
      };
    } else {
      params = {
        userid: userval.userid,
        role: userval.role,
        acctSelList: selectedParams,
        showAccounts: true,
        alphaOrderAcct: null,
        accountpricingtype: "*",
        accountsegment: "*",
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 20 }),
      };
    }
    return params;
  };

  const setParamsForSelectAvail = (type) => {
    const userval = { ...userDetail };
    const params = {
      userid: userval.userid,
      role: userval.role,
      showAccounts: true,
      alphaOrderAcct: "",
      accountpricingtype: "*",
      accountsegment: "*",
      ...(type == "SelectVal" && {
        strCurrPageAcctSel: JSON.stringify({ page: 1, maxpagelen: 200 }),
      }),
      ...(type == "AvailVal" && {
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
      }),
    };

    return params;
  };

  const returnToMain = () => {
    history.push({
      pathname: "/limitedsalesusers",
    });
  };

  const userEditLimitedSalesInfoContext = {
    state,
    isChecked,
    showCopyPage,
    pNumber,
    totalPages,
    setLoader,
    setPNumber,
    setAccountData,
    handleChangeInput,
    searchCriteria,
    setAccountSearchCriteria,
    accountUpdate,
    accountDelete,
    accountUnSelectAll,
    onClickSearch,
    eidList,
    setEidList,
    userDetail,
    setUserDetail,
    returnToMain,
    resetInput,
    setResetInput,
    isLoaded,
    setIsLoaded,
    setTotalPages,
    setAccountList,
    isParentAPICalled,
    setIsParentAPICalled,
  };

  return (
    <UserEditLimitedSalesContext.Provider
      value={userEditLimitedSalesInfoContext}
    >
      {props.children}
    </UserEditLimitedSalesContext.Provider>
  );
};

export const UserEditSalesConsumer = UserEditLimitedSalesContext.Consumer;
export default UserEditLimitedSalesContext;
