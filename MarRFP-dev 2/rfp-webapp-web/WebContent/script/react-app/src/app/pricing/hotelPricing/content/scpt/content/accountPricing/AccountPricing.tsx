import React from "react";
import styles from "./AccountPricing.module.css";
import scptStyles from "../../index.css";
import { Link } from "react-router-dom";
import { AccountPricingProvider } from "../../context/AccountPricingContext";
import AccountPricingContext from "../../context/AccountPricingContext";
import { ModalContextProvider } from "../../context/ModalContext";
import ModalContext from "../../context/ModalContext";
import MModal from "../../components/shared/MModal";
import AddAccountModal from "./modals/addAccount/AddAccountModal";
import HiddenAccountsModal from "./modals/hiddenAccounts/HiddenAccountsModal";
import MPagination from "../../components/shared/MPagination";
import AccountPricingHeader from "./AccountPricingHeader";
import AccountPricingTable from "./table/AccountPricingTable";
import AccountHistoryTable from "./table/AccountHistoryTable";
import AccountPricingTableHeader from "./common/AccountPricingTableHeader";
import AccountPricingFooter from "./AccountPricingFooter";
import AccountPricingGearSettings from "./common/AccountPricingGearSettings";
import Settings from "../../data/Settings";
import API from "../../service/API";
import Utils from "../../utils/Utils";
import AccountHistoryModal from "./modals/accountHistory/AccountHistoryModal";
import { CLoader } from "../../../../../../common/components/CLoader";

let contextType = null;
let modalContextType = null;

interface IProps {
  scptContextState: any;
  resetLoading?: any;
  navigateToPricingSetup: any;
  navigateToAccountDetails: any;
  onChange: any;
}
interface IState {}

export default class AccountPricing extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetLoading(true);
    const params = Utils.getAdditionalParams(
      this.props.scptContextState.pricingMenuType,
      contextType.defaultParams,
      this.props.scptContextState.accountPricingFilters
    );
    let loadFunction;
    let setFunction;
    let endpoint;
    let nextEndpoint;
    if (
      this.props.scptContextState.pricingMenuType ===
      Settings.text.compid.accountPricing.headerMenu.pricing
    ) {
      loadFunction = API.getAccountPricingLoadData;
      setFunction = contextType.setPricingData;
      endpoint = Settings.api.accountPricingLoad;
      nextEndpoint = Settings.api.accountPricingTotalLoad;
    }
    if (
      this.props.scptContextState.pricingMenuType ===
      Settings.text.compid.accountPricing.headerMenu.history
    ) {
      loadFunction = API.getAccountHistoryLoadData;
      setFunction = contextType.setHistoryData;
      endpoint = Settings.api.accountHistoryLoad;
    }

    loadFunction(
      Utils.getAPIEndpointDetails(endpoint, params, nextEndpoint)
    ).then((data) => {
      setFunction(
        data,
        this.props.resetLoading,
        this.props.scptContextState.pricingMenuType,
        this.props.scptContextState.accountPricingFilters.activeAccountType
          ? this.props.scptContextState.accountPricingFilters.activeAccountType
          : contextType.defaultParams.accountType,
        this.props.scptContextState.accountPricingFilters.currentPage
          ? this.props.scptContextState.accountPricingFilters.currentPage
          : contextType.defaultParams.page,
        this.props.scptContextState.accountPricingFilters.searchString
          ? this.props.scptContextState.accountPricingFilters.searchString
          : contextType.defaultParams.searchString,
        this.props.scptContextState.accountPricingFilters.sortType
          ? this.props.scptContextState.accountPricingFilters.sortType
          : contextType.defaultParams.sortType,
        this.props.scptContextState.accountPricingFilters.yoyOption
          ? this.props.scptContextState.accountPricingFilters.yoyOption
          : contextType.defaultParams.yoyOption,
        false,
        this.props.scptContextState.statusData.hotelid,
        this.props.scptContextState.statusData.period
      );
      this.props.resetLoading(false);
    });
  }

  navigateOut() {
    return contextType.onNavigateOut();
  }
  componentWillUnmount(): void {
    return contextType.onNavigateOut();
  }

  render() {
    return (
      <AccountPricingProvider>
        <AccountPricingContext.Consumer>
          {(pricingContext) => {
            contextType = pricingContext;
            const isPricing =
              contextType.state.activeMenuType ===
              Settings.text.compid.accountPricing.headerMenu.pricing;
            const tableData = isPricing
              ? contextType.getPricingTableData()
              : contextType.getHistoryTableData(
                  this.props.scptContextState.statusData.showrmnights
                );
            return (
              <div className={scptStyles.scptLabel}>
                {(() => {
                  let title, body, button1, button2, button3, overflow;
                  if (
                    contextType.state.modalType ===
                    Settings.text.compid.accountPricing.modal.addAccount
                  ) {
                    title =
                      Settings.text.label.accountPricing.addAccountModal.title;
                    body = (
                      <AddAccountModal
                        hotelId={this.props.scptContextState.statusData.hotelid}
                        period={this.props.scptContextState.statusData.period}
                      />
                    );
                    button1 = null;
                    button2 = {
                      id: Settings.text.compid.common.close,
                      label:
                        Settings.text.label.accountPricing.modal
                          .closeButtonLabel,
                      closeButton: true,
                    };
                    button3 = {
                      id: Settings.text.compid.accountPricing.buttons
                        .addAccountButton,
                      label:
                        Settings.text.label.accountPricing.addAccountModal
                          .addAccountButtonLabel,
                    };
                  } else if (
                    contextType.state.modalType ===
                    Settings.text.compid.accountPricing.modal.hiddenAccounts
                  ) {
                    title =
                      Settings.text.label.accountPricing.hiddenAccountModal
                        .title;
                    body = (
                      <HiddenAccountsModal
                        hotelId={this.props.scptContextState.statusData.hotelid}
                      />
                    );
                    button1 = {
                      id: Settings.text.compid.common.cancel,
                      label:
                        Settings.text.label.accountPricing.hiddenAccountModal
                          .cancelButtonLabel,
                    };
                    button2 = {
                      id: Settings.text.compid.accountPricing.buttons
                        .unhideButton,
                      label:
                        Settings.text.label.accountPricing.hiddenAccountModal
                          .unhideButtonLabel,
                    };
                    button3 = {
                      id: Settings.text.compid.accountPricing.buttons
                        .closeHiddenAccounts,
                      label:
                        Settings.text.label.accountPricing.modal
                          .closeButtonLabel,
                    };
                  } else if (
                    contextType.state.modalType ===
                    Settings.text.compid.accountPricing.modal.historyDefinitions
                  ) {
                    title =
                      Settings.text.label.accountPricing
                        .accountHistoryDefinitionModal.title;
                    body = (
                      <AccountHistoryModal
                        period={this.props.scptContextState.statusData.period}
                        franchiseFlag={
                          this.props.scptContextState.statusData.franch_flag
                        }
                      />
                    );
                    overflow = true;
                    button3 = {
                      id: Settings.text.compid.accountPricing.buttons.okButton,
                      label:
                        Settings.text.label.accountPricing
                          .accountHistoryDefinitionModal.okButtonLabel,
                      closeButton: true,
                    };
                  }
                  return (
                    contextType.state.displayModal && (
                      <div>
                        <ModalContextProvider>
                          <ModalContext.Consumer>
                            {(pricingContext) => {
                              modalContextType = pricingContext;
                              return (
                                <MModal
                                  title={title}
                                  body={body}
                                  button1={button1}
                                  button1OnClick={modalContextType.onClick}
                                  button2={button2}
                                  button2OnClick={modalContextType.onClick}
                                  button3={button3}
                                  button3OnClick={modalContextType.onClick}
                                  show={contextType.state.displayModal}
                                  handleClose={contextType.hideModal}
                                  overflow={overflow}
                                />
                              );
                            }}
                          </ModalContext.Consumer>
                        </ModalContextProvider>
                      </div>
                    )
                  );
                })()}
                <AccountPricingGearSettings
                  navigateToPricingSetup={this.props.navigateToPricingSetup}
                  options={
                    isPricing
                      ? Settings.text.label.accountPricing
                          .accountPricingSettingsOptions
                      : Settings.text.label.accountPricing
                          .accountHistorySettingsOptions
                  }
                />
                <div>
                  <div className={styles.accountPricingContainer}>
                    <div className={styles.headerContainer}>
                      {Settings.text.label.accountPricing.headerMenu.menuTypes.map(
                        (data) => {
                          {
                            return (
                              <div
                                key={data.key}
                                id={data.key}
                                className={[
                                  styles.mainTabs,
                                  contextType.state.activeMenuType !=
                                    data.key && styles.inactiveTab,
                                ].join(Settings.text.constant.stringSpace)}
                                onClick={contextType.togglePricingMenu}
                              >
                                <Link to="#">{data.label}</Link>
                              </div>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className={styles.bodyContainer}>
                      <AccountPricingHeader
                        data={this.props.scptContextState.statusData}
                      />
                      <AccountPricingTableHeader
                        period={this.props.scptContextState.statusData.period}
                      />
                      <div className={styles.tableGrid}>
                        {contextType.isMakingRequest && <CLoader />}
                        {isPricing && tableData.accountsData && (
                          <AccountPricingTable
                            tableData={tableData}
                            hotelid={
                              this.props.scptContextState.statusData.hotelid
                            }
                            navigateToAccountDetails={
                              this.props.navigateToAccountDetails
                            }
                          />
                        )}
                        {!isPricing && tableData.accountsData && (
                          <AccountHistoryTable
                            tableData={tableData}
                            navigateToAccountDetails={
                              this.props.navigateToAccountDetails
                            }
                            dowViewAs={
                              this.props.scptContextState.statusData
                                .showrmnights
                            }
                            onChange={this.props.onChange}
                          />
                        )}
                      </div>
                      <div className={styles.tableFooter}>
                        <MPagination
                          currentPage={contextType.state.currentPage}
                          totalPages={
                            isPricing
                              ? contextType.state.pricingData.commtotalPages
                              : contextType.state.historyData.totalpages
                          }
                          handlePaginationClick={contextType.onClick}
                          handlePaginationChange={contextType.onChange}
                        />
                      </div>
                    </div>
                    <AccountPricingFooter />
                  </div>
                </div>
              </div>
            );
          }}
        </AccountPricingContext.Consumer>
      </AccountPricingProvider>
    );
  }
}
