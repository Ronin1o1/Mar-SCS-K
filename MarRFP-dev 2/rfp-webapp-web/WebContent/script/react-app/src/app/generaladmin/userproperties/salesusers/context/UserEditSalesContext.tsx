import React, { useState } from "react";
//import API from "../service/API";
import APIEdit from "../service/APIEditSales";
import Settings from "../static/Settings";
import { useHistory } from "react-router-dom";
//import { filter } from "lodash";
//import SalesUsersContext from "../context/SalesUsersContext";

// Set state variables and function
const UserEditSalesContext = React.createContext({});

export const UserEditSalesContextProvider = (props) => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState({
    showScreenLoader: false,
    totNumProp: "",
    totNumUserProp: "",
    totPropPageLen: "",
    totPropSelPageLen: "",
    accountPricingArr: [],
    accountSegmentArr: [],
    showLoader: false,
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
    },
    tempArray: {
      tempAccountArr: [],
      tempAccountAllArr: [],
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

  const [resetInput, setResetInput] = useState(false);
  const [isChecked, setCheck] = useState(false);
  const [showCopyPage, setShowCopyPage] = useState(false);
  const [marshaCodes, setMarshaCodes] = useState(null);
  const [searchClick, setSearchClick] = useState(false);

  const [searchCriteria, setAccountSearchCriteria] = useState({
    accountpricingtype: "C",
    accountsegment: "*",
    r_1: "ALL",
    alphaOrderAcct: "",
    strCurrPageAcct: {
      page: 1,
    },
    optSel: "P",
  });

  const [pNumber, setPNumber] = useState(1);
  const [pCopyNumber, setCopyPNumber] = useState(1);
  const [selectPnumber, setSelectPnumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selTotalPages, setSelTotalPages] = useState(null);
  const [eidList, setEidList] = useState("");
  const [showCErrorPage, setShowCErrorPage] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [prevSelAvailProp, setPrevSelAvailProp] = useState();
  const [prevSelSelecProp, setPrevSelSelecProp] = useState();

  const [copySearchCriteria, setCopySearchCriteria] = useState({
    userid: "",
    role: "",
    rcopy_1: "ALL",
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

  const refreshScroll = () => {
    const copyTableGridContainer = document.getElementById("copyTableGrid");
    if (copyTableGridContainer) {
      copyTableGridContainer.scrollTop = 0;
    }
  };

  const onClickSearch = (type, pageNumber, selectPageNumber) => {
    setIsLoaded(false);
    const userval = { ...userDetail };
    const accountDataSearch = { ...state };
    if (type === "availAccount" || type === "search") {
      APIEdit.searchAvailAcctList(userval, searchCriteria, pageNumber).then(
        (data) => {
          if (data.status == "success") {
            if (type === "search") {
              setPNumber(pageNumber ? pageNumber : 1);
              setResetInput(true);
              setSearchClick(true);
            } else {
              setResetInput(false);
              setPNumber(pageNumber);
            }

            accountDataSearch.userArray.accountlistAll = data.accountlistAll;
            accountDataSearch.totPropPageLen = data.totAcctPageLen;
            setTotalPages(data?.totAcctPageLen);
            setState(accountDataSearch);
            setShowErrorPage(false);
          } else if (data == "error") {
            setShowErrorPage(true);
          }
          setIsLoaded(true);
          const accountlistAllScrollContainerScroll = document.getElementById(
            "accountlistAllScrollContainer"
          );
          if (accountlistAllScrollContainerScroll) {
            accountlistAllScrollContainerScroll.scrollTop = 0;
          }
        }
      );
    } else if (type === "selectAccount") {
      APIEdit.searchSelectAcctList(
        userval,
        searchCriteria,
        selectPageNumber
      ).then((data) => {
        if (data.status == "success") {
          accountDataSearch.userArray.accountlist = data.accountlist;
          accountDataSearch.totNumUserProp = data.totNumUserAcct;
          accountDataSearch.user.acctcount = data.totNumUserAcct;
          setSelTotalPages(data.totAcctSelPageLen);
          setState(accountDataSearch);
          setShowErrorPage(false);
        } else if (data == "error") {
          setShowErrorPage(true);
        }
        setIsLoaded(true);
      });
      localStorage.setItem("selectAccountPageNum", selectPageNumber);
    }
  };

  const setAccountData = (data, action) => {
    if (data) {
      const accountData = { ...state };
      accountData.userArray.accountlist = data.accountlist;
      accountData.userArray.accountlistAll = data.accountlistAll;
      accountData.userArray.fixedAllList = data.accountlistAll;
      accountData.accountPricingArr =
        data.accountfilterlists.accountPricingTypeList;
      accountData.accountSegmentArr =
        data.accountfilterlists.accountSegmentList;
      accountData.user.acctcount = data.totNumUserAcct;

      if (data.userDetails) {
        accountData.user.cn_firstname = data.userDetails.cn_firstname;
        accountData.user.cn_lastname = data.userDetails.cn_lastname;
        accountData.user.eid = data.userDetails.eid;
        accountData.user.companyname = data.userDetails.companyname;
        accountData.user.accountname = data.userDetails.accountname;
      }

      accountData.totNumProp = data.totNumProp;
      accountData.totNumUserProp = data.totNumUserProp;
      accountData.totPropPageLen = data.totPropPageLen;
      accountData.totPropSelPageLen = data.totPropSelPageLen;

      setTotalPages(data.totAcctPageLen);
      setSelTotalPages(data.totAcctSelPageLen);
      setState(accountData);
      setIsLoaded(true);
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
    setPrevSelSelecProp(event.target.id);
    const acctExchData = { ...state };
    if (acctExchData.tempArray.tempAccountArr.length > 0) {
      if (event.target.checked) {
        if (prevSelSelecProp && event.nativeEvent.shiftKey) {
          const prevSelIndex = acctExchData.userArray.accountlist.findIndex(
            (item) => item.accountid == prevSelSelecProp
          );
          const curSelIndex = acctExchData.userArray.accountlist.findIndex(
            (item) => item.accountid == event.target.id
          );
          if (prevSelIndex < curSelIndex) {
            for (let i = prevSelIndex + 1; i <= curSelIndex; i++) {
              acctExchData.tempArray.tempAccountArr.push({
                accountid: acctExchData.userArray.accountlist[i].accountid,
                accountname: acctExchData.userArray.accountlist[i].accountname,
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
              acctExchData.userArray.accountlist.filter(
                (hotel) =>
                  !acctExchData.tempArray.tempAccountArr.some(function (
                    selectProp
                  ) {
                    if (
                      hotel.accountid ==
                      acctExchData.userArray.accountlist[i].accountid
                    ) {
                      hotel.checked = event.target.checked;
                    }
                  })
              );
            }
          } else {
            for (let i = curSelIndex; i < prevSelIndex; i++) {
              acctExchData.tempArray.tempAccountArr.push({
                accountid: acctExchData.userArray.accountlist[i].accountid,
                accountname: acctExchData.userArray.accountlist[i].accountname,
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
              acctExchData.userArray.accountlist.filter(
                (hotel) =>
                  !acctExchData.tempArray.tempAccountArr.some(function (
                    selectProp
                  ) {
                    if (
                      hotel.accountid ==
                      acctExchData.userArray.accountlist[i].accountid
                    ) {
                      hotel.checked = event.target.checked;
                    }
                  })
              );
            }
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
    setCheck(event.target.checked);
    setPrevSelAvailProp(event.target.id);
    const acctExchAvailData = { ...state };
    if (acctExchAvailData.tempArray.tempAccountAllArr.length > 0) {
      if (event.target.checked) {
        if (prevSelAvailProp && event.nativeEvent.shiftKey) {
          const prevSelIndex =
            acctExchAvailData.userArray.accountlistAll.findIndex(
              (item) => item.accountid == prevSelAvailProp
            );
          const curSelIndex =
            acctExchAvailData.userArray.accountlistAll.findIndex(
              (item) => item.accountid == event.target.id
            );
          if (prevSelIndex < curSelIndex) {
            for (let i = prevSelIndex + 1; i <= curSelIndex; i++) {
              acctExchAvailData.tempArray.tempAccountAllArr.push({
                accountid:
                  acctExchAvailData.userArray.accountlistAll[i].accountid,
                accountname:
                  acctExchAvailData.userArray.accountlistAll[i].accountname,
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
              acctExchAvailData.userArray.accountlistAll.filter(
                (hotel) =>
                  !acctExchAvailData.tempArray.tempAccountAllArr.some(function (
                    availProp
                  ) {
                    if (
                      hotel.accountid ==
                      acctExchAvailData.userArray.accountlistAll[i].accountid
                    ) {
                      hotel.checked = event.target.checked;
                    }
                  })
              );
            }
          } else {
            for (let i = curSelIndex; i < prevSelIndex; i++) {
              acctExchAvailData.tempArray.tempAccountAllArr.push({
                accountid:
                  acctExchAvailData.userArray.accountlistAll[i].accountid,
                accountname:
                  acctExchAvailData.userArray.accountlistAll[i].accountname,
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
              acctExchAvailData.userArray.accountlistAll.filter(
                (hotel) =>
                  !acctExchAvailData.tempArray.tempAccountAllArr.some(function (
                    availProp
                  ) {
                    if (
                      hotel.accountid ==
                      acctExchAvailData.userArray.accountlistAll[i].accountid
                    ) {
                      hotel.checked = event.target.checked;
                    }
                  })
              );
            }
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
    setIsLoaded(false);
    let strAccountUpdate = "";
    const accountUpdateData = { ...state };
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

    APIEdit.updateAccountList(updateParams).then((data) => {
      if (data.status == "success") {
        accountUpdateData.totNumProp = data.totNumAcct;
        accountUpdateData.totPropPageLen = data.totAcctPageLen;
        accountUpdateData.userArray.accountlistAll = data.accountlistAll;
        setTotalPages(data.totAcctPageLen);
        setAccountSearchCriteria({
          ...searchCriteria,
          strCurrPageAcct: {
            page: pNumber,
          },
        });

        APIEdit.updateSelectAccountList(selectParamsUpdate).then((data) => {
          if (data.status == "success") {
            accountUpdateData.totNumUserProp = data.totNumUserAcct;
            accountUpdateData.user.acctcount = data.totNumUserAcct;
            accountUpdateData.totPropSelPageLen = data.totAcctSelPageLen;
            accountUpdateData.userArray.accountlist = data.accountlist;
            setSelTotalPages(data.totAcctSelPageLen);
            setState(accountUpdateData);
            setIsLoaded(true);
            setAccountSearchCriteria({
              ...searchCriteria,
              strCurrPageAcct: {
                page: selectPnumber,
              },
            });
          }
        });
      }
    });
  };

  const accountDelete = (data) => {
    setIsLoaded(false);
    const strAccountDelete = [];
    const accountDeleteData = { ...state };
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
    if (accountDeleteData.tempArray.tempAccountArr.length > 0) {
      accountDeleteData.tempArray.tempAccountArr.map((eachItem) => {
        strAccountDelete.push(eachItem.accountid);
      });
    }
    accountDeleteData.tempArray.tempAccountArr = [];
    accountDeleteData.tempArray.tempAccountAllArr = [];
    const deleteParams = setParamsForAcct(strAccountDelete);
    const selectParamsDelete = setParamsForSelectAvail("SelectVal");
    APIEdit.deleteAccountList(deleteParams).then((data) => {
      if (data.status == "success") {
        populateAccountList();
        /** Old code backup */
        // accountDeleteData.totNumProp = data.totNumAcct;
        // accountDeleteData.totPropPageLen = data.totAcctPageLen;
        // if (searchCriteria.alphaOrderAcct) {
        //   console.log(`---searchCriteria.alphaOrderAcct---`, searchCriteria);

        //   onClickSearch("search", 1, 1);
        // } else {
        //   accountDeleteData.userArray.accountlistAll = data.accountlistAll;
        //   setTotalPages(data.totAcctPageLen);
        // }
        // APIEdit.updateSelectAccountList(selectParamsDelete).then((data) => {
        //   if (data.status == "success") {
        //     accountDeleteData.totNumUserProp = data.totNumUserAcct;
        //     accountDeleteData.user.acctcount = data.totNumUserAcct;
        //     accountDeleteData.totPropSelPageLen = data.totAcctSelPageLen;
        //     accountDeleteData.userArray.accountlist = data.accountlist;
        //     setSelTotalPages(data.totAcctSelPageLen);
        //     setState(accountDeleteData);
        //   }
        // });
      }
      setIsLoaded(true);
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
    const params = {
      userid: userval.userid,
      role: userval.role,
      acctSelList: selectedParams,
      enhancedSalesContact: "",
      showAccounts: true,
      alphaOrderAcct: searchCriteria.alphaOrderAcct
        ? searchCriteria.alphaOrderAcct
        : "",
      accountpricingtype: "C",
      accountsegment: "*",
      strCurrPageAcct: JSON.stringify({ page: pNumber, maxpagelen: 20 }),
    };

    return params;
  };

  const setParamsForSelectAvail = (type) => {
    const userval = { ...userDetail };
    const params = {
      userid: userval.userid,
      role: userval.role,
      showAccounts: true,
      alphaOrderAcct: "",
      accountpricingtype: "C",
      accountsegment: "*",
      ...(type == "SelectVal" && {
        strCurrPageAcctSel: JSON.stringify({
          page:
            localStorage.getItem("selectAccountPageNum") != null
              ? localStorage.getItem("selectAccountPageNum")
              : 1,
          maxpagelen: 200,
        }),
      }),
      ...(type == "AvailVal" && {
        strCurrPageAcct: JSON.stringify({ page: 1, maxpagelen: 200 }),
      }),
    };

    return params;
  };

  const copyUser_onclick = (closeModal?: boolean) => {
    const value = closeModal ? !showCopyPage : showCopyPage;

    if (value) {
      setState({ ...state, showLoader: true });
      const filterData = { ...copySearchCriteria };
      filterData.rcopy_1 = "ALL";
      filterData.orderby = "1";
      filterData.dialogFilterString = "";
      filterData.dialogSearchBy = "ALL";
      filterData.totalDialogPages = "1";
      setCopySearchCriteria(filterData);
    }
    setShowCopyPage(value);
  };

  const stopLoader = () => {
    setState({ ...state, showLoader: false });
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
    setCopyPNumber(pageNumber);
    const userval = { ...userDetail };
    const searchData = { ...copySearchCriteria };
    const searchBy =
      searchData.dialogSearchBy == Settings.labels.allValue
        ? ""
        : searchData.dialogSearchBy;
    const params = {
      r_1: searchData.rcopy_1,
      orderby: searchData.orderby,
      dialogFilterString: searchData.dialogFilterString,
      totalDialogPages: searchData.totalDialogPages,
      dialogSearchBy: searchBy,
      userid: userval.userid,
      role: userval.role,
      strdialogPage: JSON.stringify({
        page: pageNumber,
      }),
    };
    APIEdit.getSalesCopySearchData(params).then((data) => {
      if (data == "error") {
        setShowCErrorPage(true);
      } else {
        setState({ ...state, showLoader: false });
        searchData.orderby = searchData.orderby;
        setCopySearchCriteria(searchData);
        if (data.userEditCopyList.length > 0) {
          if (data.totalDialogPages == 0) {
            const copyData = { ...state };
            copyData.userEditCopyData.totalDialogPages = 1;
            copyData.userEditCopyData.userEditCopyList = data.userEditCopyList;
            setState(copyData);
          } else {
            setUserEditCopy(data);
          }
        } else {
          setUserEditCopy(data);
        }

        setShowCErrorPage(false);
      }
    });
    if (
      searchData.dialogFilterString.length == 0 &&
      (searchData.dialogSearchBy == Settings.tableColumns.eid.header ||
        searchData.dialogSearchBy == Settings.labels.lastNameValue)
    ) {
      searchData.dialogSearchBy = Settings.labels.allValue;
      searchData.rcopy_1 = Settings.labels.allValue;
      setCopySearchCriteria(searchData);
    }
    refreshScroll();
  };

  const updateCopy = () => {
    setIsLoaded(false);
    const userval = { ...userDetail };
    const updateCopyParams = {
      eidList: eidList,
      userid: userval.userid,
      role: userval.role,
    };
    APIEdit.updateSalesCopySearchData(updateCopyParams).then((data) => {
      if (data) {
        const params = {
          userid: userval.userid,
          role: userval.role,
          showProperties: false,
          showAccounts: true,
          showManaged: true,
          optSel: searchCriteria.optSel ? searchCriteria.optSel : "P",
          alphaOrderProp: "",
          filterByMorF: "F",
          alphaOrderAcct: searchCriteria.alphaOrderAcct
            ? searchCriteria.alphaOrderAcct
            : "",
          accountpricingtype: "C",
          accountsegment: searchCriteria.accountsegment
            ? searchCriteria.accountsegment
            : "",
          strCurrPagePropSel: JSON.stringify({
            page: 1,
            maxpagelen: 200,
          }),
          strCurrPageProp: JSON.stringify({
            page: 1,
            maxpagelen: 200,
          }),
          strCurrPageAcctSel: JSON.stringify({
            page: selectPnumber ? selectPnumber : 1,
            maxpagelen: 200,
          }),
          strCurrPageAcct: JSON.stringify({
            page: pNumber ? pNumber : 1,
            maxpagelen: 200,
          }),
          totPropSelPageLen: 1,
        };
        APIEdit.populateAccountList(params).then((acctData) => {
          if (acctData) {
            setAccountData(acctData, "onsearch");
            setIsLoaded(true);
            copyUser_onclick(true);
          }
        });
      }
    });
  };

  const returnToMain = () => {
    history.push({
      pathname: "/salesusers",
    });
  };

  const showAllUsersChangeHandler = (e) => {
    let filterString = copySearchCriteria.dialogFilterString;
    if (e.target?.value === Settings.labels.allValue) {
      filterString = "";
    }
    setCopySearchCriteria({
      ...copySearchCriteria,
      rcopy_1: e.target?.value,
      dialogSearchBy: e.target?.value,
      dialogFilterString: filterString,
    });
  };

  const populateAccountList = () => {
    const userval = { ...userDetail };
    const params = {
      userid: userval.userid,
      role: userval.role,
      showProperties: false,
      showAccounts: true,
      showManaged: true,
      optSel: searchCriteria.optSel ? searchCriteria.optSel : "P",
      alphaOrderProp: "",
      filterByMorF: "F",
      alphaOrderAcct: searchCriteria.alphaOrderAcct
        ? searchCriteria.alphaOrderAcct
        : "",
      accountpricingtype: "C",
      accountsegment: searchCriteria.accountsegment
        ? searchCriteria.accountsegment
        : "",
      strCurrPagePropSel: JSON.stringify({
        page: selectPnumber ? selectPnumber : 1,
        maxpagelen: 200,
      }),
      strCurrPageProp: JSON.stringify({
        page: pNumber ? pNumber : 1,
        maxpagelen: 200,
      }),
      strCurrPageAcctSel: JSON.stringify({
        page: selectPnumber ? selectPnumber : 1,
        maxpagelen: 200,
      }),
      strCurrPageAcct: JSON.stringify({
        page: pNumber ? pNumber : 1,
        maxpagelen: 200,
      }),
      totPropSelPageLen: 1,
    };
    APIEdit.populateAccountList(params).then((acctData) => {
      setAccountData(acctData, "");
    });
  };

  const UserEditSalesInfoContext = {
    state,
    isChecked,
    showCopyPage,
    pNumber,
    totalPages,
    selTotalPages,
    setLoader,
    setPNumber,
    pCopyNumber,
    setCopyPNumber,
    setAccountData,
    handleChangeInput,
    searchCriteria,
    setAccountSearchCriteria,
    accountUpdate,
    accountDelete,
    accountUnSelectAll,
    onClickSearch,
    copyUser_onclick,
    setUserEditCopy,
    copySearchCriteria,
    setCopySearchCriteria,
    onCopyClickSearch,
    isLoaded,
    setIsLoaded,
    eidList,
    setEidList,
    showCErrorPage,
    setShowCErrorPage,
    showErrorPage,
    setShowErrorPage,
    updateCopy,
    userDetail,
    setUserDetail,
    returnToMain,
    resetInput,
    setResetInput,
    showAllUsersChangeHandler,
    selectPnumber,
    setSelectPnumber,
    searchClick,
    stopLoader,
  };

  return (
    <UserEditSalesContext.Provider value={UserEditSalesInfoContext}>
      {props.children}
    </UserEditSalesContext.Provider>
  );
};

export const UserEditSalesConsumer = UserEditSalesContext.Consumer;
export default UserEditSalesContext;
