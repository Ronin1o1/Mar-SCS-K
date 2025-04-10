import React, { Component } from "react";
import { MemoryRouter, Switch } from "react-router";
import { Route } from "react-router-dom";
import PricingSetup from "./content/pricingSetup/PricingSetup";
import AccountPricing from "./content/accountPricing/AccountPricing";
import AccountDetails from "./content/accountDetails/AccountDetails";
import { SCPTProvider } from "./context/SCPTContext";
import SCPTContext from "./context/SCPTContext";
import API from "./service/API";
import Utils from "./utils/Utils";
import Settings from "./data/Settings";
import styles from "./index.css";
import { FadeLoader } from "react-spinners";
import MDialog from "./components/shared/MDialog";
import { Layout } from "../../routing/Layout";

let contextType = null;

interface IProps {}

interface IState {
  loading: boolean;
  hasError: boolean;
}

export default class SCPTApp extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.resetLoading = this.resetLoading.bind(this);
    this.state = {
      loading: true,
      hasError: false,
    };
  }

  componentDidMount() {
    const url = window.location.href;

    // storing the query params in session to have them available on willunmount for auto save
    const query = url.split("?")[1];
    const params: URLSearchParams = new URLSearchParams(query);
    const marshaCode: string = params.get(Settings.api.params.marshaCodeParam);
    const hotelrfpid: string = params.get(Settings.api.params.hotelrfpidParam);
    const period: string = params.get(Settings.api.params.periodParam);
    contextType.setSearchParams({ marshaCode, hotelrfpid, period });
    sessionStorage.setItem("MarshaCode", marshaCode);
    sessionStorage.setItem("Hotelrfpid", hotelrfpid);
    sessionStorage.setItem("Period", period);
    window.onunhandledrejection = (err) => {
      this.setState({ ...this.state, hasError: true });
    };

    API.getPricingSetupStatusData(
      Utils.getAPIEndpointDetails(Settings.api.pricingSetupStatus)
    ).then((data) => {
      contextType.setStatusData(data);
    });
  }

  static getDerivedStateFromError(error) {
    console.log("Error ocurred:" + error);
    return { hasError: true };
  }

  resetLoading(loading) {
    this.setState({ loading: loading });
  }

  render() {
    if (!this.state.hasError) {
      return (
        <Layout hideInfo={true}>
          <SCPTProvider>
            <SCPTContext.Consumer>
              {(scptContext) => {
                contextType = scptContext;
                return (
                  <div
                    style={{
                      pointerEvents: this.state.loading ? "none" : "auto",
                    }}
                  >
                    {(() => {
                      return (
                        contextType.state.displayDialog && (
                          <div>
                            <MDialog
                              dialogOptions={contextType.state.dialogOptions}
                              show={contextType.state.displayDialog}
                              handleClose={contextType.hideDialog}
                              handleOk={contextType.handleDialogOk}
                            />
                          </div>
                        )
                      );
                    })()}
                    {contextType.state.statusData.brandName && (
                      <MemoryRouter>
                        <Switch>
                          {contextType.state.showAccountDetailsScreen ? (
                            <Route
                              path="/"
                              render={(props) => (
                                <AccountDetails
                                  ref={(accountDetails) => {
                                    window.currentScreen = accountDetails;
                                  }}
                                  {...props}
                                  scptContextState={contextType.state}
                                  resetLoading={this.resetLoading}
                                  navigateToAccountPricing={
                                    contextType.navigateToAccountPricing
                                  }
                                  onChange={contextType.onChange}
                                  showDialog={contextType.showDialog}
                                />
                              )}
                            />
                          ) : (
                            Settings.text.constant.stringEmpty
                          )}
                          {contextType.state.showPricingSetupScreen ? (
                            <Route
                              path="/"
                              render={(props) => (
                                <PricingSetup
                                  ref={(pricingSetup) => {
                                    window.currentScreen = pricingSetup;
                                  }}
                                  {...props}
                                  scptContext={contextType.state}
                                  resetLoading={this.resetLoading}
                                  navigateToAccountPricing={
                                    contextType.navigateToAccountPricing
                                  }
                                  showDialog={contextType.showDialog}
                                />
                              )}
                            />
                          ) : (
                            Settings.text.constant.stringEmpty
                          )}
                          {contextType.state.showAccountPricingScreen ? (
                            <Route
                              path="/"
                              render={(props) => (
                                <AccountPricing
                                  ref={(accountPricing) => {
                                    window.currentScreen = accountPricing;
                                  }}
                                  {...props}
                                  scptContextState={contextType.state}
                                  resetLoading={this.resetLoading}
                                  navigateToPricingSetup={
                                    contextType.navigateToPricingSetup
                                  }
                                  navigateToAccountDetails={
                                    contextType.navigateToAccountDetails
                                  }
                                  onChange={contextType.onChange}
                                />
                              )}
                            />
                          ) : (
                            Settings.text.constant.stringEmpty
                          )}
                        </Switch>
                      </MemoryRouter>
                    )}
                  </div>
                );
              }}
            </SCPTContext.Consumer>
          </SCPTProvider>
        </Layout>
      );
    } else {
      window.location.replace(
        Utils.getAPIEndpointDetails(Settings.api.errorPage).endpoint
      );
      return null;
    }
  }
}
