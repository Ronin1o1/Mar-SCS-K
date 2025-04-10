import React from "react";
import styles from "./MMultilevelSelect.module.css";
import icon from "./../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../../data/Settings";

interface Iprops {
  widthStyle?: any;
  settings: any;
  value: string;
  period: number;
  activeAccountType?: any;
  onChange: (event) => void;
}

interface Istate {
  open: boolean;
}

export default class MMultilevelSelect extends React.Component<Iprops, Istate> {
  container = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  getOptionValueFromProp = () => {
    let label;
    this.props.settings.options.map(data => {
      if (this.props.value === data.key) {
        if (data.conditionalLabel) {
          label = data.labelConditions[this.props[data.conditionalLabel]];
        } else {
          label = data.label
            .replace(
              Settings.text.constant.periodPlaceHolder,
              this.props.period
            )
            .replace(
              Settings.text.constant.prevPeriodPlaceHolder,
              this.props.period - 1
            )
            .replace(
              Settings.text.constant.prev2PeriodPlaceHolder,
              this.props.period - 2
            );
        }
      } else {
        if (data.nextLevel) {
          data.options.map(childData => {
            if (this.props.value === childData.key) {
              label =
                data.label +
                Settings.text.constant.arrowDelimiter +
                childData.label;
            }
          });
        }
      }
    });

    return label ? label : this.props.value;
  };

  getLabel = data => {
    let label;
    if (data.conditionalLabel) {
      label = data.labelConditions[this.props[data.conditionalLabel]];
    } else {
      label = data.label
        .replace(Settings.text.constant.periodPlaceHolder, this.props.period)
        .replace(
          Settings.text.constant.prevPeriodPlaceHolder,
          this.props.period - 1
        )
        .replace(
          Settings.text.constant.prev2PeriodPlaceHolder,
          this.props.period - 2
        );
    }
    return label;
  };

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false });
    }
  };

  onClick = event => {
    if (event.target.id) {
      this.props.onChange(event);
    }

    this.setState(state => {
      return { open: !state.open };
    });
  };

  renderStatusList(nextLevelOptions) {
    return nextLevelOptions.map((data, index) => {
      return (
        <li key={data.key} id={data.key}>
          {this.getLabel(data)}
        </li>
      );
    });
  }

  render() {
    return (
      <div ref={this.container}>
        <ul
          className={[styles.topLevelMenu, this.props.widthStyle].join(
            Settings.text.constant.stringSpace
          )}
        >
          <li onClick={this.onClick}>
            {this.getOptionValueFromProp()}
            <svg className={styles.menuBoxChevronIconSVG}>
              <use
                x="-50px"
                y="-4px"
                href={icon + "#menu-box-chevron"}
                xlinkHref={icon + "#menu-box-chevron"}
              />
            </svg>

            {(() => {
              return (
                this.state.open && (
                  <ul className={styles.secondLevelMenu}>
                    {this.props.settings.options.map(data => {
                      {
                        return (
                          <li
                            key={data.key}
                            id={data.key}
                            className={data.border && styles.borderedMenu}
                          >
                            {this.getLabel(data)}
                            {data.nextLevel && (
                              <svg className={styles.sideChevronIconSVG}>
                                <use
                                  x="-68px"
                                  y="-8px"
                                  href={icon + "#side-menu-chevron"}
                                  xlinkHref={icon + "#side-menu-chevron"}
                                />
                              </svg>
                            )}
                            {data.nextLevel && (
                              <ul className={styles.thirdLevelMenu}>
                                {this.renderStatusList(data.options)}
                              </ul>
                            )}
                          </li>
                        );
                      }
                    })}
                  </ul>
                )
              );
            })()}
          </li>
        </ul>
      </div>
    );
  }
}
