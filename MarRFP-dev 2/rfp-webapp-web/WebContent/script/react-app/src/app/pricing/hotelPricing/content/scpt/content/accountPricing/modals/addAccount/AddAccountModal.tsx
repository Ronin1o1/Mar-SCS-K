import React from "react";
import styles from "./AddAccountModal.module.css";
import MRadioButtonList from "../../../../components/shared/MRadioButtonList";
import Table_AddAccount from "./Table_AddAccount";
import MSelect from "../../../../components/shared/MSelect";
import pricingStyles from "../../AccountPricing.module.css";
import Settings from "../../../../data/Settings";
import BaseInputText from "../../../../components/base/BaseInputText";
import MSearchFilter from "../../../../components/shared/MSearchFilter";
import ModalContext from "../../../../context/ModalContext";
import Utils from "../../../../utils/Utils";
import API from "../../../../service/API";

interface IProps {
  hotelId: string;
  period: number;
}

interface IState {}

export default class AddAccountModal extends React.Component<IProps, IState> {
  static contextType = ModalContext;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    API.getAccountSegmentData(
      Utils.getAPIEndpointDetails(Settings.api.findAccountSegments)
    ).then(data => {
      this.context.setAccountSegmentData(data, this.props.hotelId);
    });
  }

  render() {
    return (
      <div>
        <div className={pricingStyles.modalSubTitle}>
          {Settings.text.label.accountPricing.addAccountModal.subTitle}
        </div>
        <div className={styles.radioButtonStyles}>
          <MRadioButtonList
            id={
              Settings.text.compid.accountPricing.modal.addAccountModal
                .addAccountType
            }
            radioButtonName={
              Settings.text.compid.accountPricing.modal.addAccountModal
                .addAccountType
            }
            buttons={
              Settings.text.label.accountPricing.addAccountModal.account
                .accountOptions
            }
            horizontal={true}
            onChange={this.context.onChange}
            checkSelected={this.context.state.addAccountModalData.addAccounts}
          />
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.selectStyle}>
            {this.context.state.addAccountModalData.addAccounts ===
            Settings.text.label.accountPricing.addAccountModal.account
              .accountOptions[0] ? (
              <div>
                <div className={styles.selectLabelBtAc}>
                  {
                    Settings.text.label.accountPricing.addAccountModal.account
                      .accountOptions[0]
                  }
                </div>
                <div className={styles.selectBtAc}>
                  <MSearchFilter
                    id={
                      Settings.text.compid.accountPricing.modal.addAccountModal
                        .btaccounts
                    }
                    value={this.context.state.addAccountModalData.btAccountName}
                    selected={
                      this.context.state.addAccountModalData.addAccountSaveData
                        .accountid
                    }
                    hotelId={this.props.hotelId}
                    data={this.context.state.addAccountModalData.btAccountsData}
                    start={
                      this.context.state.addAccountModalData.btAccountsStart
                    }
                    getInitialData={this.context.getBTAccountsInitialData}
                    getNextData={this.context.getBTAccountsNextData}
                    onSelect={this.context.onBTAccountsSelect}
                    onChange={this.context.onBTAccountsChange}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.selectLabelBtAc}>
                  {
                    Settings.text.label.accountPricing.addAccountModal.account
                      .accountOptions[1]
                  }
                </div>
                <div className={styles.selectBtAc}>
                  <BaseInputText
                    id={
                      Settings.text.compid.accountPricing.modal.addAccountModal
                        .accountname
                    }
                    value={Utils.handleNull(
                      this.context.state.addAccountModalData.addAccountSaveData
                        .accountname
                    )}
                    placeholder={
                      Settings.text.label.accountPricing.addAccountModal
                        .placeholderText
                    }
                    className={styles.selectInputTextStyle}
                    onChange={this.context.onChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.selectStyle}>
            <div className={styles.selectLabelNewAc}>Account Segment</div>
            <div className={styles.selectNewAc}>
              <MSelect
                id={
                  Settings.text.compid.accountPricing.modal.addAccountModal
                    .accountsegment
                }
                value={
                  this.context.state.addAccountModalData.selectedAccountSegment
                }
                label={
                  this.context.state.addAccountModalData.accountSegmentDesc
                }
                onChange={this.context.onChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.tableStyle}>
          <Table_AddAccount period={this.props.period} />
        </div>
      </div>
    );
  }
}
