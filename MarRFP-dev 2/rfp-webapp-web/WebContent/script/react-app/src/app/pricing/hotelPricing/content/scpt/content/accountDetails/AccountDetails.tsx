import React from "react";
import styles from "./AccountDetails.module.css";
import accountDetailsStyles from "../../index.css";
import AccountDetailsBodyHeader from "./AccountDetailsBodyHeader";
import Section_History from "./sections/history/Section_History";
import Section_GeneralInformation from "./sections/generallnformation/Section_GeneralInformation";
import Section_RoomNights from "./sections/roomNights/Section_RoomNights";
import Section_Seasons from "./sections/seasons/Section_Seasons";
import Section_Amenities from "./sections/amenities/Section_Amenities";
import Section_Rates from "./sections/rates/Section_Rates";
import Section_Notes from "./sections/notes/Section_Notes";
import AccountDetailsFooter from "./AccountDetailsFooter";
import AccountDetailsHeader from "./AccountDetailsHeader";
import { AccountDetailsProvider } from "../../context/AccountDetailsContext";
import AccountDetailsContext from "../../context/AccountDetailsContext";
import Settings from "../../data/Settings";
import Utils from "../../utils/Utils";
import API from "../../service/API";

let contextType = null;

interface IProps {
  scptContextState: any;
  resetLoading: any;
  navigateToAccountPricing: any;
  onChange: any;
  showDialog: any;
}

interface IState {}

export default class AccountDetails extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetLoading(true);
    const params = {
      scptaccountid:
        this.props.scptContextState.accountsData.accountsList[
          this.props.scptContextState.accountsData.selectedIndex
        ].scpt_accountid,
    };
    API.getAccountDetailsLoadData(
      Utils.getAPIEndpointDetails(Settings.api.accountDetailsLoad, params)
    ).then((data) => {
      contextType.setDetailsData(
        data,
        this.props.scptContextState.accountsData,
        this.props.scptContextState.statusData.hotelid,
        this.props.showDialog,
        this.props.resetLoading,
        this.props.scptContextState.statusData.isBrandExtendedStay,
        this.props.scptContextState.statusData.breakfastList,
        this.props.scptContextState.statusData.internetList
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
      <AccountDetailsProvider>
        <AccountDetailsContext.Consumer>
          {(detailsContext) => {
            contextType = detailsContext;
            return (
              <div>
                <div
                  className={[
                    accountDetailsStyles.scptLabel,
                    styles.accountDetailsContainer,
                  ].join(" ")}
                >
                  <AccountDetailsHeader
                    navigateToAccountPricing={
                      this.props.navigateToAccountPricing
                    }
                  />
                  <div className={styles.bodyContainer}>
                    <AccountDetailsBodyHeader
                      data={this.props.scptContextState.statusData}
                    />
                    <div className={styles.sectionContainer}>
                      <Section_History
                        dowViewAs={
                          this.props.scptContextState.statusData.showrmnights
                        }
                        franchFlag={
                          this.props.scptContextState.statusData.franch_flag
                        }
                        onChange={this.props.onChange}
                      />
                      <Section_GeneralInformation />
                      <Section_RoomNights />
                      <Section_Seasons
                        isBrandExtendedStay={
                          this.props.scptContextState.statusData
                            .isBrandExtendedStay
                        }
                      />
                      <Section_Amenities
                        breakfastList={
                          this.props.scptContextState.breakfastDescList
                        }
                        internetList={
                          this.props.scptContextState.internetDescList
                        }
                      />
                      <Section_Rates />
                      <Section_Notes />
                    </div>
                    <AccountDetailsFooter
                      navigateToAccountPricing={
                        this.props.navigateToAccountPricing
                      }
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </AccountDetailsContext.Consumer>
      </AccountDetailsProvider>
    );
  }
}
