import React from "react";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Table_RetailRate from "./Table_RetailRate";
import Settings from "../../../../data/Settings";

interface IProps {
  period: number;
}

interface IState {
  expanded: boolean;
}

export default class Section_RetailRate extends React.Component<
  IProps,
  IState
> {
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
        ].join(" ")}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        onChange={this.onExpandChange}
      >
        <AccordionItem className={scptStyles.accordion__item}>
          <AccordionItemHeading>
            <AccordionItemButton className={scptStyles.accordion__button}>
              <span className={scptStyles.sectionTitle}>
                {Settings.text.label.pricingSetup.retailRate.sectionTitle}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            <Table_RetailRate period={this.props.period} />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
