import React from "react";
import styles from "./MSearchFilter.module.css";
import BaseInputText from "../base/BaseInputText";
import icon from "./../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../../data/Settings";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";

interface IProps {
  id: string;
  value: string;
  selected: number;
  hotelId: string;
  data: any;
  start: number;
  getInitialData: (string) => any;
  getNextData: (event) => any;
  onSelect: (event) => void;
  onChange: (event) => any;
}

interface IState {
  open: boolean;
  error: boolean;
}

export default class MSearchBox extends React.Component<IProps, IState> {
  container = React.createRef();
  tooltipRef;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false });
    }
  };

  onIconClick = event => {
    if (!this.state.open) {
      this.props.getInitialData(this.props.hotelId).then(data => {
        this.setState(state => {
          return {
            open: true
          };
        });
      });
    } else {
      this.setState(state => {
        return {
          open: false
        };
      });
    }
  };

  handleChoicesClick = event => {
    event.persist();
    this.props.getNextData(event).then(data => {
      if (event.target.parentElement) event.target.parentElement.scrollTo(0, 0);
    });
  };

  onOptionClick = event => {
    this.props.onSelect(event);
    this.setState(
      {
        open: false,
        error: false
      },
      () => {
        ReactTooltip.hide(this.tooltipRef);
      }
    );
  };

  onChange = event => {
    this.props.onChange(event).then(data => {
      this.setState({
        open: true
      });
    });
  };

  handleBlur = event => {
    if (!this.props.selected) {
      this.setState(
        {
          error: true
        },
        () => {
          ReactTooltip.show(this.tooltipRef);
          setTimeout(function() {
            ReactTooltip.hide(this.tooltipRef);
          }, 2000);
        }
      );
    } else {
      this.setState(
        {
          error: false
        },
        () => {
          ReactTooltip.hide(this.tooltipRef);
        }
      );
    }
  };

  render() {
    return (
      <div ref={this.container}>
        <div
          className={styles.filterContainer}
          data-tip
          data-for={
            Settings.text.compid.accountPricing.modal.addAccountModal
              .btAccountTooltip
          }
          ref={ref => (this.tooltipRef = ref)}
        >
          <ReactTooltip
            id={
              Settings.text.compid.accountPricing.modal.addAccountModal
                .btAccountTooltip
            }
            type="light"
            effect="solid"
            place="left"
            className={styles.btAccountTooltip}
            disable={!this.state.error}
            event="no-event"
          >
            <span>
              {Settings.text.validationMessage.accountPricing.invalidBTAccount}
            </span>
          </ReactTooltip>
          <BaseInputText
            id={this.props.id}
            value={this.props.value}
            placeholder={Settings.text.constant.select}
            className={styles.filterInput}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          <div className={styles.buttonContainer} onClick={this.onIconClick}>
            <div className={styles.menuBoxChevronIconDiv}>
              <svg className={styles.menuBoxChevronIconSVG}>
                <use
                  x="-50px"
                  y="-4px"
                  href={icon + "#menu-box-chevron"}
                  xlinkHref={icon + "#menu-box-chevron"}
                />
              </svg>
            </div>
          </div>
        </div>
        {(() => {
          return (
            this.state.open && (
              <ul className={styles.btOptions}>
                {this.props.start > 1 && (
                  <li
                    className={styles.choiceLink}
                    key={
                      Settings.text.compid.accountPricing.modal.addAccountModal
                        .previousChoices
                    }
                    id={
                      Settings.text.compid.accountPricing.modal.addAccountModal
                        .previousChoices
                    }
                    onClick={this.handleChoicesClick}
                  >
                    {
                      Settings.text.label.accountPricing.addAccountModal
                        .previousChoices
                    }
                  </li>
                )}
                {this.props.data.map(data => {
                  {
                    return (
                      <li
                        key={data.accountid}
                        id={data.accountid}
                        onClick={this.onOptionClick}
                      >
                        {data.name}
                      </li>
                    );
                  }
                })}
                <li
                  className={styles.choiceLink}
                  key={
                    Settings.text.compid.accountPricing.modal.addAccountModal
                      .moreChoices
                  }
                  id={
                    Settings.text.compid.accountPricing.modal.addAccountModal
                      .moreChoices
                  }
                  onClick={this.handleChoicesClick}
                >
                  {
                    Settings.text.label.accountPricing.addAccountModal
                      .moreChoices
                  }
                </li>
              </ul>
            )
          );
        })()}
      </div>
    );
  }
}
