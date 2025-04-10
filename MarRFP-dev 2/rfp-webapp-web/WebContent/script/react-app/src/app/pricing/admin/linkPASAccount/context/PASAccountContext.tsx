import React, { useContext, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import API from "../service/API";
import Settings from "../static/Settings";

const PASAccountContext = React.createContext({});

export const PASAccountContextProvider = (props) => {
  const [availGrid1, setavailGrid1] = useState(0);
  const [availGrid2, setavailGrid2] = useState(0);
  const [selectedGrid1, setselectedGrid1] = useState(0);
  const [selectedGrid2, setselectedGrid2] = useState(0);
  const [pasAccountAlert, setAccount] = useState([]);
  const [pasAccountAlertDisplay, setpasAccountAlertDisplay] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    pasAccount: {
      adminRespondent: {},
      // peroid: {
      //   data: [],
      // },
      pasManagerList: {
        data: [],
      },
    },
    adminRespondent: {
      adminRespondentid: 0,
      personName: null,
      personTitle: null,
      countryCode: 0,
      phoneNumber: 0,
      faxNumber: null,
      areaCityCode: null,
      email: null,
      eid: null,
      adminLocationid: 0,
      acctMktRgnSel: [],
      acctMktRgnSel2: null,
      acctMktRgnNotSel: [],
      last_updatedate: 0,
      salesTypesSel: [],
      salesTypesSel2: null,
      salesTypesNotSel: [],
      primeAccountSel: [],
      primeAccountSel2: null,
      secAccountSel: [],
      secAccountSel2: null,
      primeAccountNotSel: [],
      secAccountNotSel: [],
    },

    primeAccountSelect: [],
    primeAccountSelect2: [],
    secAccountSelect: [],
    secAccountSelect2: [],

    pasAccountFilter: {
      adminRespondent: {},
      periodList: {
        data: [],
      },
      pasManagerList: {
        data: [],
      },
    },
    isSelected: {
      personName: null,
      pasManager: null,
      period: null,
    },
    isComplete: false,
    sourceSelection: [],
    targetSelection: [],
    sourceSelectionPrimary: [],
    targetSelectionPrimary: [],
    onTransfer: null,
    sourcesSelectedValue: [],
    primaryFlag: false,
    secondFlag: false,
    onValidation: false,
    showModal: false,
    isPrimaryLeftData: [],
    isPrimaryRightData: [],
    isSecondLeftData: [],
    isSecondRightata: [],
    isSelectedFlag: false,
    commonVariable: [],
    commonVariablelength: 0,
    showScreenLoader: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setUsersDetails = () => {
    const data = { user: appContext?.user };
    if (data && appContext?.user) {
      state.isSelected.personName = data.user.fullName;
      state.isSelected.pasManager = data.user.eid;
    } else {
      API.getUsersDetails().then((userdata) => {
        state.isSelected.personName = userdata.user.fullName;
        state.isSelected.pasManager = userdata.user.eid;
      });
    }
  };

  const setPasAccount = (data: any) => {
    state.isSelected.period = data.periodList[0].period;
  };

  const setPASAccountData = (data: any) => {
    if (data) {
      setNumber(data);
      let adminRespondent = { ...state.adminRespondent };
      adminRespondent = data;
      if (
        adminRespondent.primeAccountNotSel === null ||
        adminRespondent.primeAccountSel === null ||
        adminRespondent.salesTypesNotSel === null ||
        adminRespondent.secAccountNotSel === null ||
        adminRespondent.secAccountSel === null ||
        adminRespondent.adminRespondentid === null
      ) {
        adminRespondent.adminRespondentid = 0;
        adminRespondent.primeAccountNotSel = [];
        adminRespondent.primeAccountSel = [];
        adminRespondent.salesTypesNotSel = [];
        adminRespondent.secAccountNotSel = [];
        adminRespondent.secAccountSel = [];
        state.adminRespondent = adminRespondent;
      } else {
        state.adminRespondent = adminRespondent;
      }

      setState({
        ...state,
        adminRespondent: adminRespondent,
      });
    }
    const primeAccountSel = state.adminRespondent.primeAccountSel?.map(
      (data) => {
        return { ...data, isSelected: false };
      }
    );

    state.adminRespondent.primeAccountSel = primeAccountSel;
    const primeAccountNotSel = state.adminRespondent.primeAccountNotSel?.map(
      (data) => {
        return { ...data, isSelected: false };
      }
    );
    state.adminRespondent.primeAccountNotSel = primeAccountNotSel;

    const secondAccountSel = state.adminRespondent.secAccountSel?.map(
      (data) => {
        return { ...data, isSelected: false };
      }
    );
    state.adminRespondent.secAccountSel = secondAccountSel;
    const secAccountNotSel = state.adminRespondent.secAccountNotSel?.map(
      (data) => {
        return { ...data, isSelected: false };
      }
    );
    state.adminRespondent.secAccountNotSel = secAccountNotSel;

    Object.keys(data).forEach((key1) => {
      if (key1 === "primeAccountSel") {
        state.adminRespondent.primeAccountNotSel?.map((data) => {
          state.primeAccountSelect.push({
            accountname: data.accountname,
            isSelected: false,
          });
        });
      }
      if (key1 === "secAccountSel") {
        state.adminRespondent.secAccountNotSel?.map((data) => {
          state.secAccountSelect.push({
            accountname: data.accountname,
            isSelected: false,
          });
        });
      }
    });

    state.primeAccountSelect?.map((data) => {
      state.isPrimaryLeftData.push(data.accountname);
    });

    state.secAccountSelect?.map((data) => {
      state.isSecondLeftData.push(data.accountname);
    });

    setState({
      ...state,
      secAccountSelect: state.secAccountSelect,
      primeAccountSelect: state.primeAccountSelect,
      isPrimaryLeftData: state.isPrimaryLeftData,
      isSecondLeftData: state.isSecondLeftData,
      isSelectedFlag: true,
    });
  };

  const setNumber = (data) => {
    setavailGrid1(
      data.primeAccountNotSel != null ? data.primeAccountNotSel.length : 0
    );
    setavailGrid2(
      data.secAccountNotSel != null ? data.secAccountNotSel.length : 0
    );
    setselectedGrid1(
      data.primeAccountSel != null ? data.primeAccountSel.length : 0
    );
    setselectedGrid2(
      data.secAccountSel != null ? data.secAccountSel.length : 0
    );
  };

  const onSubmit = () => {
    updateDataOnChange();
    // API.getLinkPasAccountsPasManager(
    //   state.isSelected.period,
    //   state.isSelected.pasManager
    // ).then((data) => {
    //   setPASAccountData(data);
    // });
  };

  const updateData = () => {
    state.showModal = false;
    validateList();

    state.adminRespondent.primeAccountSel2 = [];
    const primeAccountSelData = [...state.adminRespondent.primeAccountSel2];
    state.adminRespondent.primeAccountSel?.map((data, i) => {
      primeAccountSelData.push(data.accountrecid);
    });
    state.adminRespondent.primeAccountSel2 = primeAccountSelData;

    state.adminRespondent.secAccountSel2 = [];
    const secAccountSelData = [...state.adminRespondent.secAccountSel2];
    state.adminRespondent.secAccountSel?.map((data, i) => {
      secAccountSelData.push(data.accountrecid);
    });
    state.adminRespondent.secAccountSel2 = secAccountSelData;

    const adminRespondentid = state.adminRespondent.adminRespondentid;
    const primeAccountSel2 = primeAccountSelData;
    const secAccountSel2 = secAccountSelData;
    const origPeriod = Settings.pasAccount.origPeriod;
    const pasManager = state.adminRespondent.eid;
    const period = state.isSelected.period;
    if (state.showModal === false) {
      //setLoader(true);
      API.updateLinkPasAccountsWithFilter(
        adminRespondentid,
        primeAccountSel2,
        secAccountSel2,
        origPeriod,
        pasManager,
        period,
        state.adminRespondent
      ).then((value) => {
        // setLoader(false);
        // window.location.reload();
        state.showScreenLoader = true;
        API.getLinkPasAccountsPasManager(
          state.isSelected.period,
          state.isSelected.pasManager
        ).then((data) => {
          state.showScreenLoader = false;
          setPASAccountData(data);
        });
      });
    }
  };

  const updateDataOnChange = () => {
    state.isComplete = true;
    state.showScreenLoader = true;
    state.showModal = false;
    validateList();

    state.adminRespondent.primeAccountSel2 = [];
    const primeAccountSelData = [...state.adminRespondent.primeAccountSel2];
    state.adminRespondent.primeAccountSel?.map((data, i) => {
      primeAccountSelData.push(data.accountrecid);
    });
    state.adminRespondent.primeAccountSel2 = primeAccountSelData;

    state.adminRespondent.secAccountSel2 = [];
    const secAccountSelData = [...state.adminRespondent.secAccountSel2];
    state.adminRespondent.secAccountSel?.map((data, i) => {
      secAccountSelData.push(data.accountrecid);
    });
    state.adminRespondent.secAccountSel2 = secAccountSelData;

    const adminRespondentid = state.adminRespondent.adminRespondentid;
    const primeAccountSel2 = primeAccountSelData;
    const secAccountSel2 = secAccountSelData;
    const origPeriod = Settings.pasAccount.origPeriod;
    const pasManager = state.adminRespondent.eid;
    const period = state.isSelected.period;
    if (state.showModal === false) {
      // setTimeout(() => {
      //   if (!pasAccountAlertDisplay) {
      //     state.showScreenLoader = true;
      //   }
      // }, 2000);

      API.updateLinkPasAccountsWithFilter(
        adminRespondentid,
        primeAccountSel2,
        secAccountSel2,
        origPeriod,
        pasManager,
        period,
        state.adminRespondent
      ).then((value) => {
        state.showScreenLoader = false;
        // window.location.reload();
        API.getLinkPasAccountsPasManager(
          state.isSelected.period,
          state.isSelected.pasManager
        ).then((data) => {
          setPASAccountData(data);
          state.showScreenLoader = false;
          state.isComplete = false;
        });
      });
    } else {
      state.showScreenLoader = false;
      state.isComplete = false;
    }
  };

  const onChangeData = (ddn, event) => {
    const { value } = event.target;
    updateData();
    state.isSelected[ddn] = value;
    // API.getLinkPasAccountsPasManager(
    //   state.isSelected.period,
    //   state.isSelected.pasManager
    // ).then((data) => {
    //   setPASAccountData(data);
    // });
  };
  const validateList = () => {
    let result = [];
    result = state.adminRespondent.secAccountSel?.filter(function (o1) {
      return state.adminRespondent.primeAccountSel.some(function (o2) {
        return o1.accountname === o2.accountname;
      });
    });

    if (result) {
      setAccount(result);
      if (result.length > 0) setpasAccountAlertDisplay(true);
      else setpasAccountAlertDisplay(false);
    } else setpasAccountAlertDisplay(false);
  };

  const onShowModal = () => {
    setState({
      ...state,
      showModal: !state.showModal,
    });
  };

  const pasAccountContext = {
    state,
    setState,
    setPASAccountData,
    onChangeData,
    onShowModal,
    onSubmit,
    setUsersDetails,
    setPasAccount,
    setNumber,
    updateData,
    updateDataOnChange,
    availGrid1,
    availGrid2,
    selectedGrid1,
    selectedGrid2,
    pasAccountAlertDisplay,
    pasAccountAlert,
    setpasAccountAlertDisplay,
    setAccount,
    setLoader,
  };

  return (
    <PASAccountContext.Provider value={pasAccountContext}>
      {props.children}
    </PASAccountContext.Provider>
  );
};

export const PASAccountContextConsumer = PASAccountContext.Consumer;
export default PASAccountContext;
