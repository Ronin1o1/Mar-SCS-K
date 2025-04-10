import React from "react";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Table_RoomNights from "./Table_RoomNights";
import AccountDetailsContext from "../../../../context/AccountDetailsContext";
import Settings from "../../../../data/Settings";

interface IProps {}

interface IState {
  expanded: boolean;
}

export default class Section_RoomNights extends React.Component<
  IProps,
  IState
> {
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
          this.state.expanded && scptStyles.accordionExpanded
        ].join(Settings.text.constant.stringSpace)}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        onChange={this.onExpandChange}
      >
        <AccordionItem className={scptStyles.accordion__item}>
          <AccordionItemHeading>
            <AccordionItemButton className={scptStyles.accordion__button}>
              <span className={scptStyles.sectionTitle}>
                {Settings.text.label.accountDetails.roomNights.sectionTitle}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            <Table_RoomNights />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
