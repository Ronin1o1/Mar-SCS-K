import React from "react";
import Settings from "../../../../data/Settings";
import ModalContext from "../../../../context/ModalContext";
import styles from "./AccountHistoryModal.module.css";
import existingStyles from "../../../../index.css";

interface Iprops {
  period: number;
  franchiseFlag: any;
}

interface Istate {}

let definitionKeys = [];
let definitionValues = [];

export default class AccountHistoryModal extends React.Component<
  Iprops,
  Istate
> {
  static contextType = ModalContext;
  constructor(props) {
    super(props);

    definitionKeys =
      Settings.text.label.accountPricing.accountHistoryDefinitionModal.historyDefinitions.map(
        (data) =>
          data.key
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              (this.props.period - 1).toString()
            )
            .replace(
              Settings.text.constant.periodPlaceHolder,
              this.props.period.toString()
            )
      );

    definitionValues =
      Settings.text.label.accountPricing.accountHistoryDefinitionModal.historyDefinitions.map(
        (data) =>
          data.value
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              (this.props.period - 1).toString()
            )
            .replace(
              Settings.text.constant.periodPlaceHolder,
              this.props.period.toString()
            )
      );
  }

  render() {
    return (
      <div
        className={[styles.contentStyle, existingStyles.scptLabel].join(
          Settings.text.constant.stringSpace
        )}
      >
        <ul className={styles.listStyle}>
          {definitionKeys.map((data, index) => (
            <div key={index}>
              {(() => {
                if (
                  this.props.franchiseFlag ===
                    Settings.text.constant.managedProperty &&
                  data ===
                    Settings.text.label.accountPricing
                      .accountHistoryDefinitionModal.accountBehaviour
                ) {
                  return (
                    <div>
                      <div className={styles.headingStyle} key={index}>
                        {data}
                      </div>
                      <div>
                        <li className={styles.headingStyleLi} key={index}>
                          {definitionValues[index]}
                        </li>
                      </div>
                      <br />
                      <ul className={styles.listStyle}>
                        {Settings.text.label.accountPricing.accountHistoryDefinitionModal.accountBehaviourDefinitions.map(
                          (innerdata, index) => (
                            <div key={index}>
                              <div className={styles.headingStyle}>
                                {innerdata.key}
                              </div>
                              <div>
                                <li className={styles.headingStyleLi}>
                                  {innerdata.value}
                                </li>
                              </div>
                              <br />
                            </div>
                          )
                        )}
                      </ul>
                    </div>
                  );
                } else if (
                  data !==
                  Settings.text.label.accountPricing
                    .accountHistoryDefinitionModal.accountBehaviour
                ) {
                  return (
                    <div>
                      <div className={styles.headingStyle} key={index}>
                        {data}
                      </div>
                      <div>
                        <li className={styles.headingStyleLi} key={index}>
                          {definitionValues[index]}
                        </li>
                      </div>
                      <br />
                    </div>
                  );
                } else {
                  return "";
                }
              })()}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
