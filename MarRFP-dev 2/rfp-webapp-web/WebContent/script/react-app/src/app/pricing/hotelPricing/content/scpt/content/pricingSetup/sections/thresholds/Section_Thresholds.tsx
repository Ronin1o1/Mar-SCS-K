import React from "react";
import styles from "./Section_Thresholds.module.css";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import MPricingSetupButton from "../../../../components/shared/MPricingSetupButton";
import Table_Thresholds from "./Table_Thresholds";
import Settings from "../../../../data/Settings";
import PricingSetupContext from "../../../../context/PricingSetupContext";

interface IProps {
  resetLoading?: any;
}

interface IState {
  expanded: boolean;
}

export default class Section_Thresholds extends React.Component<
  IProps,
  IState
> {
  static contextType = PricingSetupContext;

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
                {Settings.text.label.pricingSetup.thresholds.sectionTitle}
              </span>
              <span className={styles.roomNightThresholdsDesc}>
                {Settings.text.label.pricingSetup.thresholds.sectionDesc}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            <Table_Thresholds />
          </AccordionItemPanel>
          <AccordionItemPanel
            className={scptStyles.accordion__footer__container}
          >
            <div className={scptStyles.accordion__footer}>
              <MPricingSetupButton
                id={Settings.text.compid.pricingSetup.thresholds.thresholdsId}
                label={Settings.text.label.pricingSetup.thresholds.buttonLabel}
                onClick={event => {
                  this.context.onClick(event, this.props.resetLoading);
                }}
              />
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
