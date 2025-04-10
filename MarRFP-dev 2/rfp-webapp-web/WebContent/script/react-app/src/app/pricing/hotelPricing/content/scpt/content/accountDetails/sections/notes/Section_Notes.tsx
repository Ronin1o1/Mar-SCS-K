import React from "react";
import scptStyles from "../../../../index.css";
import styles from "../notes/Section_Notes.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";
import Utils from "../../../../utils/Utils";

interface IProps {}

interface IState {
  expanded: boolean;
}

export default class Section_Notes extends React.Component<IProps, IState> {
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
    return (
      <Accordion
        className={[
          scptStyles.accordion,
          this.state.expanded
            ? scptStyles.accordionExpanded
            : scptStyles.accordionLast
        ].join(" ")}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        onChange={this.onExpandChange}
      >
        <AccordionItem className={scptStyles.accordion__item}>
          <AccordionItemHeading>
            <AccordionItemButton className={scptStyles.accordion__button}>
              <span className={scptStyles.sectionTitle}>
                {Settings.text.label.accountDetails.notes.sectionTitle}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            {this.context.state.detailsData && (
              <textarea
                className={styles.notesTextStyle}
                rows={Settings.text.label.accountDetails.notes.rows}
                cols={Settings.text.label.accountDetails.notes.columns}
                id={Settings.text.compid.accountDetails.notes}
                value={Utils.handleNull(this.context.state.detailsData.notes)}
                onChange={this.context.onChange}
                maxLength={
                  Settings.text.label.accountDetails.notes.textAreaMaxCharLength
                }
              ></textarea>
            )}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
