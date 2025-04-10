import React, { useState } from "react";
import Settings from "../data/Settings";
import Utils from "../utils/Utils";

const ModalContext = React.createContext({});

export const ModalContextProvider = props => {
  const [state, setState] = useState({
    addAccountModalData: {
      btAccountsData: [],
      btAccountsCount: 20,
      btAccountsStart: 1,
      btAccountName: Settings.text.constant.stringEmpty,
      accountSegmentDesc: [Settings.text.constant.select],
      accountSegments: [],
      selectedAccountSegment: Settings.text.constant.select,
      addAccounts:
        Settings.text.label.accountPricing.addAccountModal.account
          .accountOptions[0],
      addAccountSaveData: {}
    },
    hiddenAccountsModalData: {
      hiddenAccountsData: [],
      hiddenAccountSaveData: []
    },
    hotelId: null
  });

  const setAccountSegmentData = (data: any, hotelId: string) => {
    const addAccountModalData = { ...state.addAccountModalData };
    if (data) {
      data.map(data => {
        addAccountModalData.accountSegmentDesc.push(
          data.accounttypedescription
        );
      });
    }
    addAccountModalData.accountSegments = data;
    addAccountModalData.addAccountSaveData = {};

    setState({
      ...state,
      addAccountModalData: addAccountModalData,
      hotelId: hotelId
    });
  };

  const getBTAccountsInitialData = (hotelId: string) => {
    const addAccountModalData = { ...state.addAccountModalData };

    return Utils.getBTAccountsData(
      hotelId,
      addAccountModalData.btAccountsCount,
      addAccountModalData.btAccountsStart,
      Utils.getBTAccountFilter(state.addAccountModalData.btAccountName)
    ).then(data => {
      addAccountModalData.btAccountsData = data;
      addAccountModalData.btAccountsStart = 1;

      setState({
        ...state,
        addAccountModalData: addAccountModalData,
        hotelId: hotelId
      });
    });
  };

  const getBTAccountsNextData = event => {
    const { id } = event.target;
    const addAccountModalData = { ...state.addAccountModalData };
    let start = addAccountModalData.btAccountsStart;
    if (
      id ===
      Settings.text.compid.accountPricing.modal.addAccountModal.previousChoices
    )
      start = start - 1;
    if (
      id ===
      Settings.text.compid.accountPricing.modal.addAccountModal.moreChoices
    )
      start = start + 1;

    return Utils.getBTAccountsData(
      state.hotelId,
      addAccountModalData.btAccountsCount,
      start,
      Utils.getBTAccountFilter(addAccountModalData.btAccountName)
    ).then(data => {
      addAccountModalData.btAccountsData = data;
      addAccountModalData.btAccountsStart = start;

      setState({
        ...state,
        addAccountModalData: addAccountModalData
      });
    });
  };

  const onBTAccountsChange = event => {
    const { value } = event.target;
    const addAccountModalData = { ...state.addAccountModalData };

    return Utils.getBTAccountsData(
      state.hotelId,
      addAccountModalData.btAccountsCount,
      addAccountModalData.btAccountsStart,
      Utils.getBTAccountFilter(value)
    ).then(data => {
      addAccountModalData.btAccountsData = data;
      addAccountModalData.btAccountName = value;

      const selectedBTAccount = addAccountModalData.btAccountsData.find(
        data => {
          return data.name == value;
        }
      );

      if (selectedBTAccount) {
        // If matching BT account found, set save data
        addAccountModalData.addAccountSaveData[
          Settings.text.compid.accountPricing.modal.addAccountModal.accountid
        ] = selectedBTAccount.accountid;
        addAccountModalData.addAccountSaveData[
          Settings.text.compid.accountPricing.modal.addAccountModal.accountname
        ] = selectedBTAccount.name;
      } else {
        // If no matching BT account found, reset save data
        addAccountModalData.addAccountSaveData[
          Settings.text.compid.accountPricing.modal.addAccountModal.accountid
        ] = Settings.text.constant.stringEmpty;
        addAccountModalData.addAccountSaveData[
          Settings.text.compid.accountPricing.modal.addAccountModal.accountname
        ] = Settings.text.constant.stringEmpty;
      }

      setState({
        ...state,
        addAccountModalData: addAccountModalData
      });
    });
  };

  const onBTAccountsSelect = event => {
    const { id } = event.target;
    const addAccountModalData = { ...state.addAccountModalData };

    const selectedBTAccount = addAccountModalData.btAccountsData.find(data => {
      return data.accountid == id;
    });

    if (selectedBTAccount) {
      addAccountModalData.addAccountSaveData[
        Settings.text.compid.accountPricing.modal.addAccountModal.accountid
      ] = selectedBTAccount.accountid;
      addAccountModalData.addAccountSaveData[
        Settings.text.compid.accountPricing.modal.addAccountModal.accountname
      ] = selectedBTAccount.name;
      addAccountModalData.btAccountName = selectedBTAccount.name;
    }

    setState({
      ...state,
      addAccountModalData: addAccountModalData
    });
  };

  const setHiddenAccountsData = (data: any, hotelId: number) => {
    const hiddenAccountsModalData = { ...state.hiddenAccountsModalData };
    hiddenAccountsModalData.hiddenAccountsData = data;
    hiddenAccountsModalData.hiddenAccountSaveData = [];

    setState({
      ...state,
      hiddenAccountsModalData: hiddenAccountsModalData,
      hotelId: hotelId
    });
  };

  const reloadHiddenAccountsData = () => {
    Utils.getHiddenAccountsData(state.hotelId).then(data => {
      setHiddenAccountsData(data, state.hotelId);
    });
  };

  const onChange = event => {
    const { id, value } = event.target;

    if (
      id.includes(
        Settings.text.compid.accountPricing.modal.addAccountModal.addAccountType
      )
    ) {
      const addAccountModalData = { ...state.addAccountModalData };
      addAccountModalData.addAccounts = value;
      addAccountModalData.selectedAccountSegment =
        Settings.text.constant.select;
      addAccountModalData.addAccountSaveData = {};

      setState({
        ...state,
        addAccountModalData: addAccountModalData
      });
      return;
    }

    // Add Account - Account Name
    if (
      id ===
      Settings.text.compid.accountPricing.modal.addAccountModal.accountname
    ) {
      const addAccountModalData = { ...state.addAccountModalData };
      if (value.length <= 80 && Utils.validateChineseJapaneseChars(value)) {
        addAccountModalData.addAccountSaveData[id] = value;
        setState({ ...state, addAccountModalData: addAccountModalData });
      }
      return;
    }

    // Add Account - Input text values
    if (
      id.includes(
        Settings.text.compid.accountPricing.modal.addAccountModal.fcrn
      ) ||
      id.includes(
        Settings.text.compid.accountPricing.modal.addAccountModal.fcadr
      )
    ) {
      const addAccountModalData = { ...state.addAccountModalData };
      if (Utils.validate2Decimals(value)) {
        addAccountModalData.addAccountSaveData[id] = value;
        setState({ ...state, addAccountModalData: addAccountModalData });
      }
      return;
    }

    // Add Account - Account Segment
    if (
      id ===
      Settings.text.compid.accountPricing.modal.addAccountModal.accountsegment
    ) {
      const addAccountModalData = { ...state.addAccountModalData };
      const selectedSegment = addAccountModalData.accountSegments.find(data => {
        return (
          data.accounttypedescription.replace(
            / /g,
            Settings.text.constant.stringEmpty
          ) == value.replace(/ /g, Settings.text.constant.stringEmpty)
        );
      });

      if (selectedSegment) {
        addAccountModalData.selectedAccountSegment = value;
        addAccountModalData.addAccountSaveData[id] =
          selectedSegment.accounttype;

        setState({
          ...state,
          addAccountModalData: addAccountModalData
        });
      }
      return;
    }
  };

  const onNumberFieldBlur = event => {
    const { id, value } = event.target;

    // Add Account
    if (
      id.includes(
        Settings.text.compid.accountPricing.modal.addAccountModal.fcrn
      ) ||
      id.includes(
        Settings.text.compid.accountPricing.modal.addAccountModal.fcadr
      )
    ) {
      const addAccountModalData = { ...state.addAccountModalData };
      addAccountModalData.addAccountSaveData[id] = Utils.convertToNumber(value);

      setState({ ...state, addAccountModalData: addAccountModalData });
      return;
    }
  };

  const onClick = (event, closeModal?) => {
    const { id, checked } = event.target;

    if (id.includes(Settings.text.compid.accountPricing.modal.hiddenAccounts)) {
      const selectedId = id.replace(
        Settings.text.compid.accountPricing.modal.hiddenAccounts,
        Settings.text.constant.stringEmpty
      );

      const hiddenAccountsModalData = { ...state.hiddenAccountsModalData };
      const selectedAccount = hiddenAccountsModalData.hiddenAccountsData.find(
        data => {
          return data.scpt_accountid == selectedId;
        }
      );

      if (selectedAccount) {
        hiddenAccountsModalData.hiddenAccountSaveData = Utils.updateUnhideAccountsData(
          selectedAccount,
          hiddenAccountsModalData.hiddenAccountSaveData,
          checked
        );

        setState({
          ...state,
          hiddenAccountsModalData: hiddenAccountsModalData
        });
        return;
      }
    }

    // Add Account Add Account button
    if (id === Settings.text.compid.accountPricing.buttons.addAccountButton) {
      const addAccountModalData = { ...state.addAccountModalData };
      if (
        addAccountModalData.addAccountSaveData &&
        addAccountModalData.addAccountSaveData[
          Settings.text.compid.accountPricing.modal.addAccountModal.accountname
        ] &&
        addAccountModalData.addAccountSaveData[
          Settings.text.compid.accountPricing.modal.addAccountModal
            .accountsegment
        ]
      ) {
        Utils.saveAddAccountUpdate(
          addAccountModalData.addAccountSaveData,
          state.hotelId
        ).then(data => {
          if (data === Settings.text.constant.success) {
            console.log("Add Account Save successful ........................");
            closeModal(true);
          }
        });
      } else {
        console.log("Data not entered for new account .......................");
        closeModal(false);
      }
    }

    // Hidden Accounts Unhide button
    if (id === Settings.text.compid.accountPricing.buttons.unhideButton) {
      const hiddenAccountsModalData = { ...state.hiddenAccountsModalData };
      if (hiddenAccountsModalData.hiddenAccountSaveData.length > 0) {
        Utils.saveHiddenAccountsUpdate(
          hiddenAccountsModalData.hiddenAccountSaveData,
          state.hotelId
        ).then(data => {
          if (data === Settings.text.constant.success) {
            console.log("Unhide Accounts Save successful ....................");
            reloadHiddenAccountsData();
          }
        });
      }
    }

    // Hidden Accounts Cancel button
    if (id === Settings.text.compid.common.cancel) {
      reloadHiddenAccountsData();
    }

    // Hidden Accounts Close button
    if (
      id === Settings.text.compid.accountPricing.buttons.closeHiddenAccounts
    ) {
      const hiddenAccountsModalData = { ...state.hiddenAccountsModalData };
      if (hiddenAccountsModalData.hiddenAccountSaveData.length > 0) {
        Utils.saveHiddenAccountsUpdate(
          hiddenAccountsModalData.hiddenAccountSaveData,
          state.hotelId
        ).then(data => {
          if (data === Settings.text.constant.success) {
            console.log("Unhide Accounts Save successful ....................");
            closeModal(true);
          }
        });
      } else {
        closeModal(true);
      }
    }
  };

  const modalContext = {
    state,
    setState,
    setAccountSegmentData,
    getBTAccountsInitialData,
    getBTAccountsNextData,
    onBTAccountsSelect,
    onBTAccountsChange,
    setHiddenAccountsData,
    onChange,
    onNumberFieldBlur,
    onClick
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;
export default ModalContext;
