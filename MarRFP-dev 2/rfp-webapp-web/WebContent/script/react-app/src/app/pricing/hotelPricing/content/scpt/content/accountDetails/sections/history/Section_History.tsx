import React from "react";
import styles from "./Section_History.module.css";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Table_HistoryGrade from "./Table_HistoryGrade";
import Table_HistoryRate from "./Table_HistoryRate";
import Table_HistoryAccounts from "./Table_HistoryAccounts";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";

interface IProps {
  dowViewAs: string;
  franchFlag: string;
  onChange: any;
}

interface IState {
  expanded: boolean;
}

export default class Section_History extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  onExpandChange = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <Accordion
        className={[
          scptStyles.accordion,
          this.state.expanded && scptStyles.accordionExpanded
        ].join(Settings.text.constant.stringSpace)}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        onChange={this.onExpandChange}
        preExpanded={[Settings.text.compid.accountDetails.history]}
      >
        <AccordionItem
          className={scptStyles.accordion__item}
          uuid={Settings.text.compid.accountDetails.history}
        >
          <AccordionItemHeading>
            <AccordionItemButton className={scptStyles.accordion__button}>
              <span className={scptStyles.sectionTitle}>
                {Settings.text.label.accountDetails.history.sectionTitle}
              </span>
              <span className={styles.sectionSubTitle}>
                {Settings.text.label.accountDetails.history.salesGroupLabel}
              </span>
              <span className={styles.sectionSubTitle1}>
                {this.context.state.detailsData &&
                  this.context.state.detailsData.salesGroup}
              </span>
              <span className={styles.sectionSubTitle}>
                {Settings.text.label.accountDetails.history.scTypeLabel}
              </span>
              <span className={styles.sectionSubTitle1}>
                {this.context.state.detailsData &&
                  this.context.state.detailsData.scType}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            <div>
              <div>
                <Table_HistoryGrade
                  dowViewAs={this.props.dowViewAs}
                  franchFlag={this.props.franchFlag}
                  onChange={this.props.onChange}
                />
              </div>
              <div className={styles.sectionWrapper}>
                <div>
                  <Table_HistoryRate />
                </div>
                <div className={styles.tableSpacing}>
                  <Table_HistoryAccounts />
                </div>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
