import React from "react";
import styles from "./Section_Seasons.module.css";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Table_Seasons from "./Table_Seasons";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import MSelect from "../../../../components/shared/MSelect";
import Settings from "../../../../data/Settings";
import Utils from "../../../../utils/Utils";

interface IProps {
  isBrandExtendedStay: string;
}

interface IState {
  expanded: boolean;
}

export default class Section_Seasons extends React.Component<IProps, IState> {
  static contextType = AccountDetailsContext;

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  onExpandChange = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const redBackground =
      this.context.state.detailsData &&
      Utils.hasRedBackground(this.context.state.detailsData.seasonsData);
    return (
      <Accordion
        className={[
          scptStyles.accordion,
          this.state.expanded && scptStyles.accordionExpanded
        ].join(Settings.text.constant.stringSpace)}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        onChange={this.onExpandChange}
      >
        <MSelect
          id={Settings.text.compid.accountDetails.seasons.accountType}
          className={styles.selectStyle}
          label={
            this.context.state.detailsData
              ? this.context.state.detailsData.accountTypes
              : [Settings.text.constant.stringEmpty]
          }
          onChange={this.context.onChange}
          value={
            this.context.state.detailsData
              ? this.context.state.detailsData.accountType
              : Settings.text.constant.stringEmpty
          }
        />
        <AccordionItem className={scptStyles.accordion__item}>
          <AccordionItemHeading>
            <AccordionItemButton className={scptStyles.accordion__button}>
              <span className={scptStyles.sectionTitle}>
                {Settings.text.label.accountDetails.seasons.sectionTitle}
              </span>
              <span className={styles.sectionSubTitle}>
                {Settings.text.label.accountDetails.seasons.accountTypeLabel}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            {this.context.state.detailsData &&
              this.context.state.detailsData.seasonsData.map((data, index) => (
                <div key={index}>
                  <span className={styles.labelStyle}>{data.date}</span>
                  <div className={styles.spaceBtwLabelAndTable} />
                  <Table_Seasons
                    isBrandExtendedStay={this.props.isBrandExtendedStay}
                    seasonId={data.seasonId}
                    tableData={data.tableData}
                    redBackground={redBackground}
                  />
                  <div className={styles.spaceBwTables} />
                </div>
              ))}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
