import React from "react";
import styles from "../amenities/Section_Amenities.module.css";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import MPricingSetupButton from "../../../../components/shared/MPricingSetupButton";
import Table_AmenitiesType from "./Table_AmenitiesType";
import Table_AmenitiesVAT from "./Table_AmenitiesVAT";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Settings from "../../../../data/Settings";

interface IProps {
  period: number;
  resetLoading?: any;
}

interface IState {
  expanded: boolean;
}

export default class Section_Amenities extends React.Component<IProps, IState> {
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
    const amenitiesData = this.context.getAmenitiesData(this.props.period);

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
                {Settings.text.label.pricingSetup.amenities.sectionTitle}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            <div
              className={[styles.textFontStyle, styles.sectionWrapper].join(
                Settings.text.constant.stringSpace
              )}
            >
              <div>
                <Table_AmenitiesType data={amenitiesData.amenitiesTypeData} />
              </div>
              {this.context.getGeneralInfoData().includeVAT ==
              Settings.text.constant.stringYes ? (
                <div className={styles.tableSpacing}>
                  <Table_AmenitiesVAT
                    data={amenitiesData.vatData}
                    period={this.props.period}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          </AccordionItemPanel>
          <AccordionItemPanel
            className={scptStyles.accordion__footer__container}
          >
            <div className={scptStyles.accordion__footer}>
              <MPricingSetupButton
                id={Settings.text.compid.pricingSetup.amenities.amenitiesId}
                label={Settings.text.label.pricingSetup.amenities.buttonLabel}
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
