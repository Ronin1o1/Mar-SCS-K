import React from "react";
import styles from "./PricingSetup.module.css";
import setupStyles from "../../index.css";
import PricingSetupBodyHeader from "./PricingSetupBodyHeader";
import Section_GeneralInformation from "./sections/generallnformation/Section_GeneralInformation";
import Section_RetailRate from "./sections/retailRate/Section_RetailRate";
import Section_Amenities from "./sections/amenities/Section_Amenities";
import Section_Thresholds from "./sections/thresholds/Section_Thresholds";
import Section_SCBudgetInformation from "./sections/scBudgetInformation/Section_SCBudgetInformation";
import PricingSetupFooter from "./PricingSetupFooter";
import { PricingSetupProvider } from "../../context/PricingSetupContext";
import PricingSetupContext from "../../context/PricingSetupContext";
import Settings from "../../data/Settings";
import Utils from "../../utils/Utils";
import API from "../../service/API";
import { CLoader } from "../../../../../../common/components/CLoader";

let contextType = null;

interface IProps {
  scptContext: any;
  resetLoading?: any;
  navigateToAccountPricing?: any;
  showDialog: any;
}

interface IState {}

export default class PricingSetup extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetLoading(true);
    API.getPricingSetupLoadData(
      Utils.getAPIEndpointDetails(Settings.api.pricingSetupLoad)
    ).then((data) => {
      contextType.setSetupData(
        data,
        this.props.showDialog,
        this.props.scptContext.statusData.breakfastList,
        this.props.scptContext.statusData.internetList
      );
      this.props.resetLoading(false);
    });
  }

  navigateOut() {
    return contextType.onNavigateOut(this.props.resetLoading);
  }
  componentWillUnmount(): void {
    const location = window.location.pathname;
    if (!location.includes(Settings.pageName)) {
      return contextType.onNavigateOut(this.props.resetLoading);
    }
  }

  render() {
    return (
      <PricingSetupProvider>
        <PricingSetupContext.Consumer>
          {(setupContext) => {
            contextType = setupContext;
            return (
              <div>
                <div
                  className={[
                    setupStyles.scptLabel,
                    styles.pricingContainer,
                  ].join(Settings.text.constant.stringSpace)}
                >
                  <div className={styles.headerContainer}>
                    {Settings.text.label.pricingSetup.pricingSetupHeaderTitle}
                  </div>
                  <div className={styles.bodyContainer}>
                    {contextType.isMakingRequest && <CLoader />}
                    <PricingSetupBodyHeader
                      data={this.props.scptContext.statusData}
                    />
                    <div className={styles.sectionContainer}>
                      <Section_GeneralInformation
                        isBrandExtendedStay={
                          this.props.scptContext.statusData.isBrandExtendedStay
                        }
                      />
                      <Section_RetailRate
                        period={this.props.scptContext.statusData.period}
                      />
                      <Section_Amenities
                        period={this.props.scptContext.statusData.period}
                        resetLoading={this.props.resetLoading}
                      />
                      <Section_Thresholds
                        resetLoading={this.props.resetLoading}
                      />
                      <Section_SCBudgetInformation
                        period={this.props.scptContext.statusData.period}
                      />
                    </div>
                    <PricingSetupFooter
                      navigateToAccountPricing={
                        this.props.navigateToAccountPricing
                      }
                      resetLoading={this.props.resetLoading}
                      scptSetupCompleted={
                        this.props.scptContext.statusData.scptSetupCompleted ===
                        Settings.text.constant.stringY
                      }
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </PricingSetupContext.Consumer>
      </PricingSetupProvider>
    );
  }
}
