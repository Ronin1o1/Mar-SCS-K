import React from "react";
import styles from "./Section_GeneralInformation.module.css";
import scptStyles from "../../../../index.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import MCheckboxList from "../../../../components/shared/MCheckboxList";
import MRadioButtonList from "../../../../components/shared/MRadioButtonList";
import PricingSetupContext from "../../../../context/PricingSetupContext";
import Settings from "../../../../data/Settings";

interface IProps {
  isBrandExtendedStay: String;
}

interface IState {
  expanded: boolean;
}

export default class Section_GeneralInformation extends React.Component<
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
    const generalInfoData = this.context.getGeneralInfoData();

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
                {
                  Settings.text.label.pricingSetup.generalInformation
                    .sectionTitle
                }
              </span>
              <span className={styles.sectionSubTitle}>
                {Settings.text.label.pricingSetup.generalInformation
                  .brandLabel + Settings.text.constant.stringSpace}
              </span>
              <span className={styles.sectionSubTitle1}>
                {this.context.state.setupData.brandName}
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={scptStyles.accordion__panel}>
            <hr className={styles.horizontalLine} />
            <div className={styles.sectionWrapper}>
              <div className={styles.spacingForCheckBox}>
                <MCheckboxList
                  id={Settings.text.constant.roomClassLabel}
                  header={
                    Settings.text.label.pricingSetup.generalInformation
                      .roomClassHeader
                  }
                  checkboxes={
                    Settings.text.label.pricingSetup.generalInformation
                      .roomClassLabels
                  }
                  details={generalInfoData.rmClassInfo}
                  disabled={
                    generalInfoData.allDisabled
                      ? Settings.text.compid.pricingSetup.generalInformation
                          .roomClassCheckboxDisabledLocked
                      : Settings.text.compid.pricingSetup.generalInformation
                          .roomClassCheckboxDisabled
                  }
                  onClick={this.context.onChange}
                />
              </div>
              {this.props.isBrandExtendedStay ===
              Settings.text.constant.stringY ? (
                <div className={styles.spacingForCheckBox}>
                  <MCheckboxList
                    id={Settings.text.constant.tierLabel}
                    header={
                      Settings.text.label.pricingSetup.generalInformation
                        .tierPriceHeader
                    }
                    checkboxes={
                      Settings.text.label.pricingSetup.generalInformation
                        .tierPriceLabels
                    }
                    details={generalInfoData.tierInfo}
                    disabled={
                      generalInfoData.allDisabled
                        ? Settings.text.compid.pricingSetup.generalInformation
                            .tierPriceCheckboxDisabledLocked
                        : Settings.text.compid.pricingSetup.generalInformation
                            .tierPriceCheckboxDisabled
                    }
                    onClick={this.context.onChange}
                  />
                </div>
              ) : (
                <div />
              )}
              <div className={styles.spacingForRadioButton}>
                <MRadioButtonList
                  onChange={this.context.onChange}
                  radioButtonName={Settings.text.constant.vatLabel}
                  header={
                    Settings.text.label.pricingSetup.generalInformation
                      .priceVATHeader
                  }
                  buttons={
                    Settings.text.label.pricingSetup.generalInformation
                      .priceVATlabels
                  }
                  checkSelected={generalInfoData.includeVAT}
                  id={Settings.text.constant.vatLabel}
                  disabled={generalInfoData.allDisabled}
                />
              </div>
              <div className={styles.spacingForRadioButton}>
                <MRadioButtonList
                  onChange={this.context.onChange}
                  radioButtonName={Settings.text.constant.yoyLabel}
                  header={
                    Settings.text.label.pricingSetup.generalInformation
                      .yoyHeader
                  }
                  buttons={
                    Settings.text.label.pricingSetup.generalInformation
                      .yoyLabels
                  }
                  checkSelected={generalInfoData.yoyCompare}
                  id={Settings.text.constant.yoyLabel}
                  disabled={generalInfoData.allDisabled}
                />
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
