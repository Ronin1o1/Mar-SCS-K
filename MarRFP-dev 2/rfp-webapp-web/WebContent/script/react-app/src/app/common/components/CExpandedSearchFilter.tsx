import React from "react";
import styles from "./CExpandedSearchFilter.css";
import icon from "../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../static/Settings";
import ReactTooltip from "react-tooltip";
import BaseInputText from "./base/BaseInputText";
interface IProps {
  id: string;
  value: string;
  selected: number | string;
  data: any;
  start: number;
  pageSize: number;
  invalidMessage?: string;
  className: string;
  optionsStyle?: string;
  noDataFlag?: boolean;
  invalidInput?: string;
  getInitialData: () => any;
  getNextData: (indices) => any;
  onSelect: (event) => void;
  onChange: (event) => any;
  onCloseHandler: () => void;
}

interface IState {
  open: boolean;
  error: boolean;
  searchString: "";
}
export default class CExpandedSearchFilter extends React.Component<
  IProps,
  IState
> {
  container = React.createRef();
  tooltipRef;
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      error: false,
      searchString: props.value,
    };
    this.onChangeHandler("");
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      // @ts-ignore
      !this.container.current.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false });
    }
  };

  onIconClick = (event) => {
    if (!this.state.open) {
      this.props.getInitialData().then((data) => {
        this.setState((state) => {
          return {
            open: true,
          };
        });
      });
    } else {
      this.setState((state) => {
        return {
          open: false,
        };
      });
    }
  };

  handleChoicesClick = (event) => {
    event.persist();
    const indices = {
      start: 0,
      end: 0,
      source: "",
      searchString: this.props.value,
    };
    indices.start = this.props.start;

    if (event.target.id === "previousChoices") {
      indices.start = this.props.start - this.props.pageSize - 2;
      indices.source = event.target.id;
    }
    if (event.target.id === "moreChoices") {
      indices.start = this.props.start + this.props.pageSize + 2;
      indices.source = event.target.id;
    }
    indices.end = indices.start + this.props.pageSize;

    this.props.getNextData(indices).then((data) => {
      if (event.target.parentElement) event.target.parentElement.scrollTo(0, 0);
    });
    this.setState((state) => {
      return {
        open: true,
      };
    });
  };

  onOptionClick = (event) => {
    this.props.onSelect(event);
    this.setState(
      {
        open: false,
        error: false,
        searchString: event.target.textContent,
      },
      () => {
        ReactTooltip.hide(this.tooltipRef);
      }
    );
  };

  onChange = (event) => {
    this.onChangeHandler(event.target.value);
  };

  onChangeHandler = (searchValue) => {
    const changeData = {
      start: this.props.start,
      end: this.props.start + this.props.pageSize,
      searchString: searchValue,
    };
    this.setState({ ...this.state, searchString: searchValue });
    this.props.onChange(changeData).then((response) => {
      if (response != undefined) {
        if (!response.cancelPrevQuery) {
          this.setState({
            ...this.state,
            open: true,
            error: this.props.noDataFlag ? true : false,
          });
        }
      }
    });
  };

  handleBlur = (event) => {
    const self = this;
    if (self.props.selected === null && this.state.searchString !== "") {
      self.setState(
        {
          error: true,
        },
        () => {
          ReactTooltip.show(self.tooltipRef);
          setTimeout(function () {
            ReactTooltip.hide(self.tooltipRef);
          }, 2000);
        }
      );
    } else {
      self.setState(
        {
          error: false,
        },
        () => {
          ReactTooltip.hide(self.tooltipRef);
        }
      );
    }
  };

  setError = () => {
    ReactTooltip.show(this.tooltipRef);
  };

  render() {
    return (
      // @ts-ignore
      <div ref={this.container} className={styles.container}>
        <div
          className={styles.filterContainer}
          data-tip={this.props.id}
          data-for={Settings.cSearchFilter.tooltip}
          ref={(ref) => (this.tooltipRef = ref)}
        >
          <ReactTooltip
            id={Settings.cSearchFilter.tooltip}
            event="no-event"
            className={styles.tooltipContainer}
            place="right"
            border={true}
            effect="solid"
            textColor="#ffffff"
          >
            <span className={styles.invalidInput}>
              {this.props.invalidInput}
            </span>
          </ReactTooltip>
          <BaseInputText
            id={this.props.id}
            onKeyPress={null}
            value={this.state.searchString}
            placeholder={Settings.cSearchFilter.placeholder}
            className={
              this.state.error ? styles.filterInputInvalid : styles.filterInput
            }
            onChange={this.onChange}
            onBlur={this.handleBlur}
            type={"text"}
            onFocus={null}
            autoFocus={true}
          />
          <div className={styles.buttonContainer} onClick={this.onIconClick}>
            <div className={styles.menuBoxChevronIconDiv}>
              <svg className={styles.menuBoxChevronIconSVG}>
                <use
                  x="-49px"
                  y="-4px"
                  href={icon + "#menu-box-chevron"}
                  xlinkHref={icon + "#menu-box-chevron"}
                />
              </svg>
            </div>
          </div>
        </div>
        {(() => {
          return this.state.open && !this.props.noDataFlag ? (
            <ul
              className={
                this.props.data.length > 10
                  ? styles.btOptions
                  : styles.btOptionsDisableScroll
              }
            >
              {this.props.start > 1 && (
                <li
                  className={styles.choiceLink}
                  key={Settings.cSearchFilter.previousChoices.id}
                  id={Settings.cSearchFilter.previousChoices.id}
                  onClick={this.handleChoicesClick}
                >
                  {Settings.cSearchFilter.previousChoices.label}
                </li>
              )}
              {this.props.data.length > 0
                ? this.props.data.map((data) => {
                    {
                      return (
                        <li
                          key={data.value}
                          id={data.value}
                          onClick={this.onOptionClick}
                        >
                          {data.name}
                        </li>
                      );
                    }
                  })
                : this.setError()}
              {!this.props.noDataFlag &&
              this.props.data.length > this.props.pageSize - 1 ? (
                <li
                  className={styles.choiceLink}
                  key={Settings.cSearchFilter.moreChoices.id}
                  id={Settings.cSearchFilter.moreChoices.id}
                  onClick={this.handleChoicesClick}
                >
                  {Settings.cSearchFilter.moreChoices.label}
                </li>
              ) : null}
            </ul>
          ) : (
            this.setError()
          );
        })()}
      </div>
    );
  }
}
