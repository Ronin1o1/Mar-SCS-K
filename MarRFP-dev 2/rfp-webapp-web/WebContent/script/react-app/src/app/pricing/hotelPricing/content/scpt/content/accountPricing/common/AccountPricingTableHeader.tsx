import React from "react";
import styles from "./AccountPricingTableHeader.module.css";
import MTooltip from "../../../components/shared/MTooltip";
import MPagination from "../../../components/shared/MPagination";
import MSearchBox from "../../../components/shared/MSearchBox";
import MRadioButtonList from "../../../components/shared/MRadioButtonList";
import Settings from "../../../data/Settings";
import MMultilevelSelect from "../../../components/shared/MMultilevelSelect";
import MAccountPricingButton from "../../../components/shared/MAccountPricingButton";
import AccountPricingContext from "../../../context/AccountPricingContext";

interface IProps {
  period: number;
}

interface IState {}

export default class AccountPricingTableHeader extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountPricingContext;

  constructor(props) {
    super(props);
  }

  render() {
    let isPricing =
      this.context.state.activeMenuType ===
      Settings.text.compid.accountPricing.headerMenu.pricing;
    return (
      <div className={styles.tableHeader}>
        <div className={styles.leftComponents}>
          {isPricing && (
            <div className={styles.bulkActions}>
              <div className={styles.bulkActionsSelect}>
                <MMultilevelSelect
                  widthStyle={styles.bulkActionsSelectWidth}
                  settings={
                    Settings.text.label.accountPricing.accountPricingTableHeader
                      .bulkActions
                  }
                  value={this.context.state.bulkActionType}
                  period={this.props.period}
                  activeAccountType={this.context.state.activeAccountType}
                  onChange={this.context.onChange}
                />
              </div>
              <div className={styles.apply}>
                <MAccountPricingButton
                  id={
                    Settings.text.compid.accountPricing
                      .accountPricingTableHeader.applyButton
                  }
                  label={
                    Settings.text.label.accountPricing.accountPricingTableHeader
                      .applyButtonLabel
                  }
                  onClick={this.context.onClick}
                />
              </div>
            </div>
          )}
          <div className={isPricing ? styles.search : styles.searchHistory}>
            <MSearchBox
              id={
                Settings.text.compid.accountPricing.accountPricingTableHeader
                  .accountSearch
              }
              value={this.context.state.tempSearchStr}
              onChange={this.context.onChange}
              onClick={this.context.onClick}
            />
          </div>
          <div className={styles.viewTextStyle}>
            {
              Settings.text.label.accountPricing.accountPricingTableHeader
                .viewBy.viewByLabel
            }
          </div>
          <div className={styles.viewSelectStyle}>
            <MMultilevelSelect
              widthStyle={
                isPricing
                  ? styles.viewSelectWidth
                  : styles.viewHistorySelectWidth
              }
              settings={
                isPricing
                  ? Settings.text.label.accountPricing.accountPricingTableHeader
                      .viewBy
                  : Settings.text.label.accountPricing.accountPricingTableHeader
                      .viewByHistory
              }
              value={
                Settings.text.compid.accountPricing.accountPricingTableHeader
                  .viewBy + this.context.state.sortType
              }
              period={this.props.period}
              onChange={this.context.onChange}
            />
          </div>
          <div
            className={[
              styles.yoyRadioBtns,
              !isPricing && styles.yoyRadioBtnsHistory
            ].join(Settings.text.constant.stringSpace)}
          >
            {
              Settings.text.label.accountPricing.accountPricingTableHeader.yoy
                .yoyLabel
            }
          </div>
          <div
            className={[
              styles.radioButtonStyle,
              !isPricing && styles.yoyRadioBtnsHistory
            ].join(Settings.text.constant.stringSpace)}
          >
            <MRadioButtonList
              id={
                Settings.text.compid.accountPricing.accountPricingTableHeader
                  .yoy
              }
              radioButtonName={
                Settings.text.compid.accountPricing.accountPricingTableHeader
                  .yoy
              }
              horizontal={true}
              buttons={
                Settings.text.label.accountPricing.accountPricingTableHeader.yoy
                  .yoyOptions
              }
              onChange={this.context.onChange}
              checkSelected={this.context.state.yoyOption}
            />
          </div>
        </div>
        <div className={styles.rightComponents}>
          <div className={styles.accHistoryLinkStyle}>
            {!isPricing && (
              <span
                onClick={event => {
                  this.context.showModal(
                    event,
                    Settings.text.compid.accountPricing.modal.historyDefinitions
                  );
                }}
              >
                {Settings.text.compid.accountPricing.accountHistoryDefinition}
              </span>
            )}
          </div>
          <div className={styles.legend}>
            <MTooltip />
            <div className={styles.legendTextStyle}>
              {
                Settings.text.label.accountPricing.accountPricingTableHeader
                  .legend.legendLabel
              }
            </div>
          </div>
          <div>
            <MPagination
              currentPage={this.context.state.currentPage}
              totalPages={
                isPricing
                  ? this.context.state.pricingData.commtotalPages
                  : this.context.state.historyData.totalpages
              }
              handlePaginationClick={this.context.onClick}
              handlePaginationChange={this.context.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
