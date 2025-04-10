import React, { Component } from "react";
import CModal from "../../../../../common/components/CModal";
import Settings from "../../static/Settings";
import EditEmailLaunch from "./EditEmailLaunch";
import API from "../../service/API";
import AccountListContext from "../../context/AccountListContext";

let contextType = null;

let accountRecId = null;


interface IProps {}

interface IState {}

export default class RFPEmailLaunch extends Component<IProps, IState> {
  static contextType = AccountListContext;

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    accountRecId = contextType.state.accountListData.selectedAccount.accountrecid;
    API.getEmailData(accountRecId).then((data) => {      
      this.context.setEmailData(data);
    });
    this.context.setState({ ...this.context.state, isComplete: true });
  }
  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          contextType = accountListContext;
    if (this.context.state.isComplete) {
      return (
        <React.Fragment>
          <CModal
            title={Settings.RFPEmailLaunch.title}
            onClose={this.context.modalOpen}
            show={this.context.state.onModalOpen}
            xPosition={-286}
            yPosition={-111}
          >
            <EditEmailLaunch />
          </CModal>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }}
  </AccountListContext.Consumer>
);
  }
}
