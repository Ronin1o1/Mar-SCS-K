/* eslint-disable react/jsx-key */
import React, { Component, Fragment } from "react";
import Settings from "../static/Settings";
import addBtn from "../../../../common/assets/img/button/btnAdd2.gif";
import addAllBtn from "../../../../common/assets/img/button/btnAddAll2.gif";
import removeBtn from "../../../../common/assets/img/button/btnRemove2.gif";
import removeAllBtn from "../../../../common/assets/img/button/btnRemoveAll2.gif";
import submit from "../../../../common/assets/img/button/btnSubmit.gif";
import styles from "./PASAccount.css";
import PASAccountContext, {
  PASAccountContextProvider,
} from "../context/PASAccountContext";
import CSelect from "../../../../common/components/CSelect";
import API from "../service/API";
import CModal from "../../../../common/components/CModal";
import closeBtn from "../../../../common/assets/img/button/btnClose.gif";
import screenLoader from "../../../../common/assets/img/screenloader.gif";

let contextType = null;

interface IProps {}
interface IState {
  secondaryAccountSelect: [];
  secondaryAccountSelect2: [];
  newTempArray: any[];
  tempArray: any[];
  newTempSecArray: any[];
  tempSecArray: any[];
  selectedOptions1: any[];

  flag: boolean;
  flagleft: boolean;
  flagPri: boolean;
  clicked: boolean;
  movedleft: boolean;
}
export default class PASAccount extends Component<IProps, IState> {
  selectedGrid1: any = 0;
  selectedGrid2: any = 0;
  availGrid1: any = 0;
  availGrid2: any = 0;
  constructor(props) {
    super(props);
    this.state = {
      secondaryAccountSelect: [],
      secondaryAccountSelect2: [],
      flag: false,
      flagleft: false,
      flagPri: false,
      clicked: false,
      movedleft: false,
      newTempArray: [],
      tempArray: [],
      newTempSecArray: [],
      tempSecArray: [],
      selectedOptions1: [],
    };
  }

  componentDidMount() {
    contextType.setLoader(true);
    contextType.state.showScreenLoader = true;
    window.addEventListener("beforeunload", this.componentCleanup);

    contextType.setUsersDetails();

    setTimeout(() => {
      API.getLinkPasAccounts().then((data) => {
        contextType.state.showScreenLoader = false;
        const pasAccount = { ...contextType.state.pasAccount };

        contextType.setPasAccount(data);
        pasAccount.periodList = data.periodList;
        pasAccount.pasManagerList = data.pasManagerList;

        contextType.setPASAccountData(data.adminRespondent);

        contextType.state.pasAccount = pasAccount;
        contextType.setState({
          ...contextType.state,
          pasAccount: pasAccount,
          isComplete: true,
        });
      });
    }, 500);
    document.addEventListener("keydown", this.handleEnterKeyPress);
  }

  componentCleanup() {
    contextType.onSubmit();
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
    document.removeEventListener("keydown", this.handleEnterKeyPress);
  }

  handleEnterKeyPress = (event) => {
    if (event.keyCode == 13) {
      const focusedElm = document.activeElement;
      if (focusedElm.id && focusedElm.id == "pas-addBtn1") {
        this.moveRightPrimary(event);
      } else if (focusedElm.id && focusedElm.id == "pas-addallBtn1") {
        this.moveAllRightPrimary(event);
      } else if (focusedElm.id && focusedElm.id == "pas-remBtn1") {
        this.moveLeftPrimary(event);
      } else if (focusedElm.id && focusedElm.id == "pas-remallBtn1") {
        this.moveAllLeftPrimary(event);
      } else if (focusedElm.id && focusedElm.id == "pas-addBtn2") {
        this.moveRight(event);
      } else if (focusedElm.id && focusedElm.id == "pas-addallBtn2") {
        this.moveAllRight(event);
      } else if (focusedElm.id && focusedElm.id == "pas-remBtn2") {
        this.moveLeft(event);
      } else if (focusedElm.id && focusedElm.id == "pas-remallBtn2") {
        this.moveAllLeft(event);
      }
    }
  };

  onClickLeft = () => {
    const sourceSelection = [...contextType.state.sourceSelection];

    const values = Array.from(
      document.getElementById("adminRespondent.secAccountNotSel").options
    )
      .filter((option) => option.selected)
      .map((option) => option.value);
    const idSetSec = new Set(values.map((o) => o));
    const res = contextType.state.adminRespondent.secAccountNotSel.map(
      (o, k) => ({
        ...o,
        isSelected: idSetSec.has(o.accountname) ? !o.isSelected : o.isSelected,
      })
    );

    contextType.state.sourceSelection = values;

    this.setState({ clicked: true, newTempSecArray: res });
  };

  onClickRight = () => {
    const targetSelection = [...contextType.state.targetSelection];

    const values = Array.from(
      document.getElementById("adminRespondent.secAccountSel").options
    )
      .filter((option) => option.selected)
      .map((option) => option.value);

    const idSetSecArr = new Set(values.map((o) => o));
    const result = contextType.state.adminRespondent.secAccountSel.map(
      (o, k) => ({
        ...o,
        isSelected: idSetSecArr.has(o.accountname)
          ? !o.isSelected
          : o.isSelected,
      })
    );

    contextType.state.targetSelection = values;

    this.setState({ clicked: true, tempSecArray: result });
  };

  onChangeLeftPrimary = () => {
    const sourceSelectionPrimary = [
      ...contextType.state.sourceSelectionPrimary,
    ];

    const values = Array.from(
      document.getElementById("adminRespondent.primeAccountNotSel").options
    )
      .filter((option) => option.selected)
      .map((option) => option.value);
    const idSet = new Set(values.map((o) => o));
    const res = contextType.state.adminRespondent.primeAccountNotSel.map(
      (o, k) => ({
        ...o,
        isSelected: idSet.has(o.accountname) ? !o.isSelected : o.isSelected,
      })
    );

    contextType.state.sourceSelectionPrimary = values;

    this.setState({ clicked: true, newTempArray: res });
  };

  onClickRightPrimary = () => {
    const targetSelectionPrimary = [
      ...contextType.state.targetSelectionPrimary,
    ];

    const values = Array.from(
      document.getElementById("adminRespondent.primeAccountSel").options
    )
      .filter((option) => option.selected)
      .map((option) => option.value);

    const valueSet = new Set(values.map((o) => o));
    const result = contextType.state.adminRespondent.primeAccountSel.map(
      (o, k) => ({
        ...o,
        isSelected: valueSet.has(o.accountname) ? !o.isSelected : o.isSelected,
      })
    );

    contextType.state.targetSelectionPrimary = values;

    this.setState({ clicked: true, tempArray: result });
  };

  returnColumn = () => {
    return contextType.state.secAccountSelect?.map((data) => {
      <tr>{data}</tr>;
    });
  };

  moveRight = (event) => {
    event.preventDefault();
    const selection = contextType.state.sourceSelection;

    if (selection?.length) {
      const left = this.state.newTempSecArray?.filter(
        (data) => data.isSelected === false
      );

      const right = this.state.newTempSecArray?.filter(
        (data) => data.isSelected === true
      );

      contextType.state.adminRespondent.secAccountNotSel = left;
      if (contextType.state.adminRespondent.secAccountSel == null) {
        contextType.state.adminRespondent.secAccountSel = right;
      } else {
        const newArray =
          contextType.state.adminRespondent.secAccountSel.slice();
        right?.map((data) => {
          newArray.push(data);
        });

        contextType.state.adminRespondent.secAccountSel = newArray;
        contextType.state.adminRespondent.secAccountSel?.map((data) => {
          data.isSelected = false;
        });
      }
    }

    contextType.state.adminRespondent.secAccountSel?.map((data) => {
      data.isSelected = false;
    });

    this.setState({ flag: true });
    contextType.state.sourceSelection.length = 0;
  };

  moveRightPrimary = (event) => {
    event.preventDefault();
    const selection = contextType.state.sourceSelectionPrimary;

    if (selection?.length) {
      const left = this.state.newTempArray?.filter(
        (data) => data.isSelected === false
      );

      const right = this.state.newTempArray?.filter(
        (data) => data.isSelected === true
      );

      contextType.state.adminRespondent.primeAccountNotSel = left;
      if (contextType.state.adminRespondent.primeAccountSel == null) {
        contextType.state.adminRespondent.primeAccountSel = right;
      } else {
        const newArray = contextType.state.adminRespondent.primeAccountSel;
        right?.map((data) => {
          newArray.push(data);
        });

        contextType.state.adminRespondent.primeAccountSel = newArray;
      }
    }
    contextType.state.adminRespondent.primeAccountSel?.map((data) => {
      data.isSelected = false;
    });
    contextType.setState({
      ...contextType.state,
      adminRespondent: contextType.state.adminRespondent,
    });
    this.setState({ flagPri: true });
    contextType.state.sourceSelectionPrimary.length = 0;
  };

  moveAllRightPrimary = (event) => {
    event.preventDefault();

    if (contextType.state.adminRespondent.primeAccountNotSel) {
      let primeAccountNotSel =
        contextType.state.adminRespondent.primeAccountNotSel?.filter(
          (data) => data
        );

      primeAccountNotSel?.map((data) => {
        contextType.state.adminRespondent.primeAccountSel.push(data);
      });

      primeAccountNotSel = [];
      contextType.state.adminRespondent.primeAccountNotSel = primeAccountNotSel;
    }
    this.setState({ flagPri: true });
  };

  moveAllRight = (event) => {
    event.preventDefault();

    if (contextType.state.adminRespondent.secAccountNotSel) {
      let secAccountNotSel =
        contextType.state.adminRespondent.secAccountNotSel?.filter(
          (data) => data
        );

      secAccountNotSel?.map((data) => {
        contextType.state.adminRespondent.secAccountSel.push(data);
      });

      secAccountNotSel = [];
      contextType.state.adminRespondent.secAccountNotSel = secAccountNotSel;
    }
    this.setState({ flag: true });
  };

  moveLeft = (event) => {
    const selection = contextType.state.targetSelection;

    if (selection?.length) {
      const left = this.state.tempSecArray?.filter(
        (data) => data.isSelected === false
      );

      const right = this.state.tempSecArray?.filter(
        (data) => data.isSelected === true
      );

      contextType.state.adminRespondent.secAccountSel = left;
      if (contextType.state.adminRespondent.secAccountNotSel == null) {
        contextType.state.adminRespondent.secAccountNotSel = right;
      } else {
        const newArray =
          contextType.state.adminRespondent.secAccountNotSel.slice();
        right?.map((data) => {
          newArray.push(data);
        });

        contextType.state.adminRespondent.secAccountNotSel = newArray;
      }
    }
    contextType.state.adminRespondent.secAccountNotSel?.map((data) => {
      data.isSelected = false;
    });
    contextType.setState({
      ...contextType.state,
      adminRespondent: contextType.state.adminRespondent,
    });

    this.setState({ movedleft: true });
    contextType.state.targetSelection.length = 0;
  };
  moveLeftPrimary = (event) => {
    const selection = contextType.state.targetSelectionPrimary;

    if (selection?.length) {
      const left = this.state.tempArray?.filter(
        (data) => data.isSelected === false
      );

      const right = this.state.tempArray?.filter(
        (data) => data.isSelected === true
      );

      contextType.state.adminRespondent.primeAccountSel = left;
      if (contextType.state.adminRespondent.primeAccountNotSel == null) {
        contextType.state.adminRespondent.primeAccountNotSel = right;
      } else {
        const newArray =
          contextType.state.adminRespondent.primeAccountNotSel.slice();
        right?.map((data) => {
          newArray.push(data);
        });

        contextType.state.adminRespondent.primeAccountNotSel = newArray;
      }
    }

    contextType.state.adminRespondent.primeAccountNotSel?.map((data) => {
      data.isSelected = false;
    });
    contextType.setState({
      ...contextType.state,
      adminRespondent: contextType.state.adminRespondent,
    });

    this.setState({ movedleft: true });
    contextType.state.targetSelectionPrimary.length = 0;
  };

  moveAllLeftPrimary = (event) => {
    event.preventDefault();

    if (contextType.state.adminRespondent.primeAccountSel) {
      let primeAccountSel =
        contextType.state.adminRespondent.primeAccountSel?.filter(
          (data) => data
        );

      primeAccountSel?.map((data) => {
        contextType.state.adminRespondent.primeAccountNotSel.push(data);
      });
      primeAccountSel = [];
      contextType.state.adminRespondent.primeAccountSel = primeAccountSel;
    }
    this.setState({ flagPri: true });
  };

  moveAllLeft = (event) => {
    event.preventDefault();

    if (contextType.state.adminRespondent.secAccountSel) {
      let secAccountSel =
        contextType.state.adminRespondent.secAccountSel?.filter((data) => data);

      secAccountSel?.map((data) => {
        contextType.state.adminRespondent.secAccountNotSel.push(data);
      });

      secAccountSel = [];
      contextType.state.adminRespondent.secAccountSel = secAccountSel;
    }
    this.setState({ flag: true });
  };

  getAccount = (data) => {
    const result = data.map((element) => {
      return <span>{element.accountname}</span>;
    });
    return result;
  };

  render() {
    return (
      <PASAccountContextProvider>
        <PASAccountContext.Consumer>
          {(pasAccountContext) => {
            contextType = pasAccountContext;

            if (contextType.state.isComplete) {
              return (
                <>
                  <CModal
                    title={Settings.alertMessage}
                    onClose={(e) => {
                      contextType.setpasAccountAlertDisplay(false);
                    }}
                    show={contextType.pasAccountAlertDisplay}
                    xPosition={-200}
                    yPosition={-100}
                    closeImgTitle={Settings.okClose}
                  >
                    <div
                      style={{
                        maxWidth: 550,
                        minWidth: 400,
                        padding: "9px 12px",
                      }}
                    >
                      <div>
                        <div className={styles.accountnameTitle}>
                          {Settings.pasAccount.AlertMessage}
                        </div>
                        <div className={styles.accountname}>
                          <ul>
                            {contextType.pasAccountAlert.map((listitem) => (
                              <li className="list-group-item list-group-item-primary">
                                {listitem.accountname}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ textAlign: "center", margin: "10px" }}>
                          <img
                            onClick={(e) => {
                              contextType.setpasAccountAlertDisplay(false);
                            }}
                            src={closeBtn}
                          />
                        </div>
                      </div>
                    </div>
                  </CModal>
                  {contextType.state.showScreenLoader ? (
                    <img
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "45%",
                      }}
                      src={screenLoader}
                    />
                  ) : (
                    <div>
                      <form className={styles.fontFamily}>
                        <div className={styles.header}>
                          {" "}
                          {Settings.pasAccount.header}
                        </div>
                        <table className={styles.width475border}>
                          <tbody>
                            <tr>
                              <td>
                                <table className={styles.table2}>
                                  <tbody>
                                    <tr>
                                      <td
                                        className={styles.fontFamilyNormal}
                                        id="pasAccountId"
                                      >
                                        {Settings.pasAccount.title}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table className={styles.borderzero}>
                                          <tbody>
                                            <tr>
                                              <td
                                                className={
                                                  styles.fontweightbold
                                                }
                                              >
                                                {Settings.pasAccount.PASManager}
                                              </td>
                                              <td>
                                                <CSelect
                                                  id={
                                                    Settings.pasAccount
                                                      .pasManager
                                                  }
                                                  selectedValue={
                                                    contextType.state.isSelected
                                                      .pasManager
                                                  }
                                                  ddnOptions={
                                                    contextType.state.pasAccount
                                                      .pasManagerList
                                                  }
                                                  keyField={
                                                    Settings.pasAccount.eid
                                                  }
                                                  valField={
                                                    Settings.pasAccount
                                                      .personName
                                                  }
                                                  onChange={(event) =>
                                                    contextType.onChangeData(
                                                      Settings.pasAccount
                                                        .pasManager,
                                                      event
                                                    )
                                                  }
                                                  className={styles.pasManager}
                                                />
                                              </td>
                                              <td>
                                                <>&nbsp;</>
                                              </td>

                                              <td
                                                className={
                                                  styles.fontweightbold
                                                }
                                              >
                                                {Settings.pasAccount.Year}
                                              </td>
                                              <td>
                                                <CSelect
                                                  id={
                                                    Settings.pasAccount.period
                                                  }
                                                  selectedValue={
                                                    contextType.state.isSelected
                                                      .period
                                                  }
                                                  ddnOptions={
                                                    contextType.state.pasAccount
                                                      .periodList
                                                  }
                                                  keyField={
                                                    Settings.pasAccount.period
                                                  }
                                                  valField={
                                                    Settings.pasAccount.period
                                                  }
                                                  className={styles.width115}
                                                  onChange={(event) =>
                                                    contextType.onChangeData(
                                                      Settings.pasAccount
                                                        .period,
                                                      event
                                                    )
                                                  }
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr></tr>
                                    <tr>
                                      <td>
                                        <div
                                          className={
                                            styles.heightwidthalignedItem
                                          }
                                        >
                                          <table
                                            style={{
                                              height: "100%",
                                              border: "0",
                                              width: "475px",
                                            }}
                                          >
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <table>
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style={{
                                                            fontWeight: "bold",
                                                          }}
                                                        >
                                                          {
                                                            Settings.pasAccount
                                                              .primary
                                                          }
                                                          <span>
                                                            {
                                                              contextType.availGrid1
                                                            }
                                                          </span>
                                                        </td>
                                                        <div>
                                                          <Fragment>
                                                            &nbsp;
                                                          </Fragment>
                                                        </div>

                                                        <td
                                                          className={
                                                            styles.fontweightbold
                                                          }
                                                        >
                                                          {
                                                            Settings.pasAccount
                                                              .selectedAccount
                                                          }
                                                          <span
                                                            style={{
                                                              display: "block",
                                                            }}
                                                          >
                                                            {
                                                              contextType.selectedGrid1
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          valign="top"
                                                          className={
                                                            styles.gridstyle
                                                          }
                                                          tabIndex={0}
                                                        >
                                                          <table>
                                                            <select
                                                              id="adminRespondent.primeAccountNotSel"
                                                              name="adminRespondent.primeAccountNotSel"
                                                              multiple
                                                              size={10}
                                                              className={
                                                                styles.primarySecondaryleft
                                                              }
                                                              onChange={
                                                                this
                                                                  .onChangeLeftPrimary
                                                              }
                                                            >
                                                              <option
                                                                hidden
                                                                value=""
                                                              ></option>
                                                              {contextType.state.adminRespondent.primeAccountNotSel?.map(
                                                                (data) => {
                                                                  return (
                                                                    <option
                                                                      value={
                                                                        data.accountname
                                                                      }
                                                                      label={
                                                                        data.accountname
                                                                      }
                                                                      className={
                                                                        data.isSelected ===
                                                                        true
                                                                          ? styles.onClickRow
                                                                          : contextType
                                                                              .state
                                                                              .sourceSelectionPrimary ==
                                                                            data.accountname
                                                                          ? styles.highlightColor
                                                                          : styles.noColor
                                                                      }
                                                                      onClick={
                                                                        (data.length =
                                                                          1
                                                                            ? this
                                                                                .onChangeLeftPrimary
                                                                            : undefined)
                                                                      }
                                                                    >
                                                                      {
                                                                        data.accountname
                                                                      }
                                                                    </option>
                                                                  );
                                                                }
                                                              )}
                                                            </select>
                                                          </table>
                                                        </td>
                                                        <td>
                                                          <div
                                                            className={
                                                              styles.secondaryBtnone
                                                            }
                                                          >
                                                            <a
                                                              id="pas-addBtn1"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={addBtn}
                                                                alt="addBtn"
                                                                onClick={
                                                                  this
                                                                    .moveRightPrimary
                                                                }
                                                              />{" "}
                                                            </a>
                                                            <a
                                                              id="pas-addallBtn1"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={addAllBtn}
                                                                alt="addAllBtn"
                                                                onClick={
                                                                  this
                                                                    .moveAllRightPrimary
                                                                }
                                                              />{" "}
                                                            </a>
                                                            <a
                                                              id="pas-remBtn1"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={removeBtn}
                                                                onClick={
                                                                  this
                                                                    .moveLeftPrimary
                                                                }
                                                              />{" "}
                                                            </a>
                                                            <a
                                                              id="pas-remallBtn1"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={
                                                                  removeAllBtn
                                                                }
                                                                onClick={
                                                                  this
                                                                    .moveAllLeftPrimary
                                                                }
                                                              />
                                                            </a>
                                                          </div>
                                                        </td>

                                                        <td
                                                          className={
                                                            styles.gridstyle
                                                          }
                                                          tabIndex={0}
                                                        >
                                                          <table>
                                                            {this.state
                                                              .flagPri ===
                                                            true ? (
                                                              <select
                                                                id="adminRespondent.primeAccountSel"
                                                                name="adminRespondent.primeAccountSel"
                                                                multiple
                                                                className={
                                                                  styles.primarySecondaryRight
                                                                }
                                                                onChange={
                                                                  this
                                                                    .onClickRightPrimary
                                                                }
                                                              >
                                                                <option
                                                                  hidden
                                                                  value=""
                                                                ></option>
                                                                {contextType.state.adminRespondent.primeAccountSel?.map(
                                                                  (data) => {
                                                                    return (
                                                                      <option
                                                                        value={
                                                                          data.accountname
                                                                        }
                                                                        label={
                                                                          data.accountname
                                                                        }
                                                                        selected={
                                                                          data.isSelected
                                                                        }
                                                                        className={
                                                                          this
                                                                            .state
                                                                            .clicked ===
                                                                            true &&
                                                                          data.isSelected ===
                                                                            true
                                                                            ? styles.onClickRow
                                                                            : contextType
                                                                                .state
                                                                                .targetSelectionPrimary ==
                                                                              data.accountname
                                                                            ? styles.highlightColor
                                                                            : styles.noColor
                                                                        }
                                                                        onClick={
                                                                          this
                                                                            .onClickRightPrimary
                                                                        }
                                                                      >
                                                                        {
                                                                          data.accountname
                                                                        }
                                                                      </option>
                                                                    );
                                                                  }
                                                                )}
                                                              </select>
                                                            ) : (
                                                              <select
                                                                id="adminRespondent.primeAccountSel"
                                                                name="adminRespondent.primeAccountSel"
                                                                multiple
                                                                className={
                                                                  styles.primarySecondaryRight
                                                                }
                                                                onChange={
                                                                  this
                                                                    .onClickRightPrimary
                                                                }
                                                              >
                                                                <option
                                                                  hidden
                                                                  value=""
                                                                ></option>
                                                                {contextType.state.adminRespondent.primeAccountSel?.map(
                                                                  (data) => {
                                                                    return (
                                                                      <option
                                                                        value={
                                                                          data.accountname
                                                                        }
                                                                        label={
                                                                          data.accountname
                                                                        }
                                                                        selected={
                                                                          data.isSelected
                                                                        }
                                                                        className={
                                                                          this
                                                                            .state
                                                                            .clicked ===
                                                                            true &&
                                                                          data.isSelected ===
                                                                            true
                                                                            ? styles.onClickRow
                                                                            : contextType
                                                                                .state
                                                                                .targetSelectionPrimary ==
                                                                              data.accountname
                                                                            ? styles.highlightColor
                                                                            : styles.noColor
                                                                        }
                                                                        onClick={
                                                                          this
                                                                            .onClickRightPrimary
                                                                        }
                                                                      >
                                                                        {
                                                                          data.accountname
                                                                        }
                                                                      </option>
                                                                    );
                                                                  }
                                                                )}
                                                              </select>
                                                            )}
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <>&nbsp;</>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <table
                                                    className={styles.table3}
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.fontweightbold
                                                          }
                                                        >
                                                          {
                                                            Settings.pasAccount
                                                              .secondary
                                                          }{" "}
                                                          <span>
                                                            {
                                                              contextType.availGrid2
                                                            }
                                                          </span>
                                                        </td>
                                                        <td></td>

                                                        <td
                                                          className={
                                                            styles.fontweightbold
                                                          }
                                                        >
                                                          <div
                                                            className={
                                                              styles.grid4
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .pasAccount
                                                                .selectedAccountSecond
                                                            }
                                                            <span>
                                                              {
                                                                contextType.selectedGrid2
                                                              }
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.gridstyle
                                                          }
                                                          tabIndex={0}
                                                        >
                                                          <table>
                                                            <select
                                                              id="adminRespondent.secAccountNotSel"
                                                              name="adminRespondent.secAccountNotSel"
                                                              multiple
                                                              size={10}
                                                              className={
                                                                styles.primarySecondaryleft
                                                              }
                                                              onChange={
                                                                this.onClickLeft
                                                              }
                                                            >
                                                              <option
                                                                hidden
                                                                value=""
                                                              ></option>
                                                              {contextType.state.adminRespondent.secAccountNotSel?.map(
                                                                (data) => {
                                                                  return (
                                                                    <option
                                                                      value={
                                                                        data.accountname
                                                                      }
                                                                      label={
                                                                        data.accountname
                                                                      }
                                                                      className={
                                                                        data.isSelected ===
                                                                        true
                                                                          ? styles.onClickRow
                                                                          : contextType
                                                                              .state
                                                                              .sourceSelection ==
                                                                            data.accountname
                                                                          ? styles.highlightColor
                                                                          : styles.noColor
                                                                      }
                                                                      onClick={
                                                                        (data.length =
                                                                          1
                                                                            ? this
                                                                                .onClickLeft
                                                                            : undefined)
                                                                      }
                                                                    >
                                                                      {
                                                                        data.accountname
                                                                      }
                                                                    </option>
                                                                  );
                                                                }
                                                              )}
                                                            </select>
                                                          </table>
                                                        </td>

                                                        <td>
                                                          <div
                                                            className={
                                                              styles.secondaryBtn
                                                            }
                                                          >
                                                            <a
                                                              id="pas-addBtn2"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={addBtn}
                                                                alt={addBtn}
                                                                onClick={
                                                                  this.moveRight
                                                                }
                                                              />{" "}
                                                            </a>
                                                            <a
                                                              id="pas-addallBtn2"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={addAllBtn}
                                                                onClick={
                                                                  this
                                                                    .moveAllRight
                                                                }
                                                              />{" "}
                                                            </a>
                                                            <a
                                                              id="pas-remBtn2"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={removeBtn}
                                                                onClick={
                                                                  this.moveLeft
                                                                }
                                                              />{" "}
                                                            </a>
                                                            <a
                                                              id="pas-remallBtn2"
                                                              href="javascript:void(0);"
                                                            >
                                                              <img
                                                                src={
                                                                  removeAllBtn
                                                                }
                                                                onClick={
                                                                  this
                                                                    .moveAllLeft
                                                                }
                                                              />
                                                            </a>
                                                          </div>
                                                        </td>
                                                        <td
                                                          valign="top"
                                                          tabIndex={0}
                                                        >
                                                          <div
                                                            className={
                                                              styles.gridstyle
                                                            }
                                                          >
                                                            <table>
                                                              {this.state
                                                                .flag ===
                                                              true ? (
                                                                <select
                                                                  id="adminRespondent.secAccountSel"
                                                                  name="adminRespondent.secAccountSel"
                                                                  multiple
                                                                  className={
                                                                    styles.primarySecondaryRight
                                                                  }
                                                                  onChange={
                                                                    this
                                                                      .onClickRight
                                                                  }
                                                                >
                                                                  <option
                                                                    hidden
                                                                    value=""
                                                                  ></option>
                                                                  {contextType.state.adminRespondent.secAccountSel?.map(
                                                                    (data) => {
                                                                      return (
                                                                        <option
                                                                          value={
                                                                            data.accountname
                                                                          }
                                                                          label={
                                                                            data.accountname
                                                                          }
                                                                          className={
                                                                            data.isSelected ===
                                                                            true
                                                                              ? styles.onClickRow
                                                                              : contextType
                                                                                  .state
                                                                                  .targetSelection ==
                                                                                data.accountname
                                                                              ? styles.highlightColor
                                                                              : styles.noColor
                                                                          }
                                                                          onClick={
                                                                            this
                                                                              .onClickRight
                                                                          }
                                                                        >
                                                                          {
                                                                            data.accountname
                                                                          }
                                                                        </option>
                                                                      );
                                                                    }
                                                                  )}
                                                                </select>
                                                              ) : (
                                                                <select
                                                                  id="adminRespondent.secAccountSel"
                                                                  name="adminRespondent.secAccountSel"
                                                                  multiple
                                                                  className={
                                                                    styles.primarySecondaryRight
                                                                  }
                                                                  onChange={
                                                                    this
                                                                      .onClickRight
                                                                  }
                                                                >
                                                                  <option
                                                                    hidden
                                                                    value=""
                                                                  ></option>
                                                                  {contextType.state.adminRespondent.secAccountSel?.map(
                                                                    (data) => {
                                                                      return (
                                                                        <option
                                                                          value={
                                                                            data.accountname
                                                                          }
                                                                          label={
                                                                            data.accountname
                                                                          }
                                                                          className={
                                                                            data.isSelected ===
                                                                            true
                                                                              ? styles.onClickRow
                                                                              : contextType
                                                                                  .state
                                                                                  .targetSelection ==
                                                                                data.accountname
                                                                              ? styles.highlightColor
                                                                              : styles.noColor
                                                                          }
                                                                          onClick={
                                                                            this
                                                                              .onClickRight
                                                                          }
                                                                        >
                                                                          {
                                                                            data.accountname
                                                                          }
                                                                        </option>
                                                                      );
                                                                    }
                                                                  )}
                                                                </select>
                                                              )}
                                                            </table>
                                                          </div>
                                                        </td>
                                                      </tr>

                                                      <tr>
                                                        <a
                                                          href="javascript:void(0);"
                                                          style={{
                                                            position:
                                                              "relative",
                                                            left: "208px",
                                                          }}
                                                        >
                                                          <img
                                                            src={submit}
                                                            alt="Submit"
                                                            onClick={
                                                              contextType.onSubmit
                                                            }
                                                            className={
                                                              styles.submitBtn
                                                            }
                                                          />{" "}
                                                        </a>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </form>
                    </div>
                  )}
                </>
              );
            } else {
              return (
                <img
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "45%",
                  }}
                  src={screenLoader}
                />
              );
            }
          }}
        </PASAccountContext.Consumer>
      </PASAccountContextProvider>
    );
  }
}
