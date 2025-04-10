import React from "react";
import styles from "./MAccordion.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

interface IProps {
  title: string;
  hotelBrand: string;
  roomClassHeader: string;
  roomClassCheckboxList: string[];
  component: {};
}

interface IState {}

export default class MAccordion extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Accordion
        className={styles.accordion}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
      >
        <AccordionItem className={styles.accordion__item}>
          <AccordionItemHeading>
            <AccordionItemButton className={styles.accordion__button}>
              Header information goes here
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={styles.accordion__panel}>
            <p>Accordion Content Goes Here</p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
