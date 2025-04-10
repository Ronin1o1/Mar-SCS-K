import React from "react";
import styles from "./CSearchFilter.css";

import Settings from "../static/Settings";
import ReactTooltip from "react-tooltip";
import BaseInputText from "./base/BaseInputText";

interface IProps {
  id: string;
  //value: string;
  selected: number;
  data: any;
  start: number;
  pageSize: number;
  invalidMessage?: string;
  className: string;
  optionsStyle?: string;
  getInitialData: () => any;
  getNextData: (indices) => any;
  onSelect: (event) => void;
  onChange: (event) => any;
  noData?: boolean;
  requiredMessage?: string;
  componentName?: string;
  removeData?: boolean;
  onKeyPress?: (event) => any;
}

interface IState {
  open: boolean;
  error: boolean;
  searchString: "";
  isNavigatingViaKey: boolean;
  selectedListIndex: number;
}

export default class CSearchFilter extends React.Component<IProps, IState> {
  container = React.createRef();
  inputRef = React.createRef();
  tooltipRef;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      searchString: "",
      isNavigatingViaKey: false,
      selectedListIndex: -1,
    };
  }

  componentDidMount() {
    //mousedown
    document.addEventListener("mouseup", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  scrollToPosition = (parent, child) => {
    const scrollRect = parent.getBoundingClientRect();
    const activeRect = child.getBoundingClientRect();
    const scrollPosition =
      activeRect.top -
      scrollRect.top -
      scrollRect.height / 2 +
      activeRect.height / 2;

    parent.scrollTop += scrollPosition;
  };

  handleKeyDown = (event) => {
    if (this.state.open) {
      if (
        this.container.current &&
        !this.container.current.contains(event.target) &&
        this.state.open
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setState({ isNavigatingViaKey: true });
      let index = this.state.selectedListIndex;
      const list = document.querySelectorAll(
        `#filtersearch2_${this.props.id} li`
      );
      const listContainer = document.getElementById(
        `filtersearch2_${this.props.id}`
      );
      const highlight = styles.highlight;
      switch (event.keyCode) {
        case 38: // Up arrow
          if (index !== -1) {
            list[index].classList.remove(highlight);
          }
          index = index > 0 ? --index : 0;
          list[index].classList.add(highlight);
          this.scrollToPosition(listContainer, list[index]);
          this.setState({
            ...this.state,
            searchString: list[index].textContent.toString(),
            selectedListIndex: index,
            searchedItem: list[index],
          });
          break;
        case 40: //down arrow
          if (index !== -1) {
            list[index].classList.remove(highlight);
          }
          index = index < list.length - 1 ? ++index : list.length - 1;
          list[index].classList.add(highlight);
          this.scrollToPosition(listContainer, list[index]);
          this.setState({
            ...this.state,
            searchString: list[index].textContent.toString(),
            selectedListIndex: index,
            searchedItem: list[index],
          });
          break;
        case 13: // enter key
          if (
            list[index].textContent ==
            Settings.cSearchFilter.previousChoices.label
          ) {
            if (event.target) {
              event.target.id = "previousChoices";
            } else {
              event.target = {};
              event.target.id = "previousChoices";
            }
            this.handleChoicesClick(event);
          } else if (
            list[index].textContent == Settings.cSearchFilter.moreChoices.label
          ) {
            if (event.target) {
              event.target.id = "moreChoices";
              // event.target.textContent = "";
            } else {
              event.target = {};
              event.target.id = "moreChoices";
              // event.target.textContent = "";
            }
            this.handleChoicesClick(event);
          } else {
            event.preventDefault();
            event.stopPropagation();
            const payload = {
              target: list[index],
            };
            this.props.onSelect(payload);
            this.setState(
              {
                open: false,
                error: false,
                searchString: list[index].textContent,
                searchedItem: list[index],
              },
              () => {
                ReactTooltip.hide(this.tooltipRef);
              }
            );
          }
          break;
      }
    } else if (!this.state.open && event.keyCode == 40) {
      const focusedElm = document.activeElement;
      if (focusedElm.id && focusedElm.id == this.props.id) {
        this.onIconClick(event);
      }
    }
  };

  handleClickOutside = (event) => {
    const self = this;
    if (
      this.container.current &&
      // @ts-ignore
      !this.container.current.contains(event.target)
    ) {
      this.handleBlur();
      if (this.state.open) {
        self.setState({ open: false });
      }
    }
  };

  onIconClick = (event) => {
    if (!this.state.open) {
      this.props.getInitialData().then((data) => {
        if (this.props.componentName == "EditAccountPlan") {
          if (data != undefined && data.length > 0) {
            this.setState((state) => {
              return {
                open: true,
              };
            });
          }
        } else {
          this.setState((state) => {
            return {
              open: true,
            };
          });
        }
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
    if (event.hasOwnProperty("persist")) {
      event.persist();
    }
    const noMorePrev =
      this.state.searchString !== Settings.cSearchFilter.moreChoices.label &&
      this.state.searchString !== Settings.cSearchFilter.previousChoices.label;
    const indices = {
      start: 0,
      end: 0,
      source: "",
      searchString:
        this.state.isNavigatingViaKey && noMorePrev
          ? this.state.searchString
          : "",
    };
    indices.start = this.props.start;

    if (event.target.id === "previousChoices") {
      indices.start = this.props.start - this.props.pageSize - 1;
      indices.source = event.target.id;
    }
    if (event.target.id === "moreChoices") {
      indices.start = this.props.start + this.props.pageSize + 1;
      indices.source = event.target.id;
    }
    indices.end = indices.start + this.props.pageSize;

    this.props.getNextData(indices).then((data) => {
      if (event.target.parentElement) event.target.parentElement.scrollTo(0, 0);
      if (this.state.isNavigatingViaKey) {
        const list = document.querySelectorAll(
          `#filtersearch2_${this.props.id} li`
        );
        const listContainer = document.getElementById(
          `filtersearch2_${this.props.id}`
        );
        const highlight = styles.highlight;
        list.forEach((item, index) => {
          item.classList.remove(highlight);
          if (
            event.target.id === "previousChoices" &&
            index == list.length - 2
          ) {
            item.classList.add(highlight);
            this.scrollToPosition(listContainer, item);
            this.setState({
              ...this.state,
              searchString: item.textContent.toString(),
              selectedListIndex: index,
              searchedItem: item,
            });
          } else if (event.target.id === "moreChoices" && index == 1) {
            item.classList.add(highlight);
            this.scrollToPosition(listContainer, item);
            this.setState({
              ...this.state,
              searchString: item.textContent.toString(),
              selectedListIndex: index,
              searchedItem: item,
            });
          }
        });
      }
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
    const self = this;
    const changeData = {
      start: 0,
      end: this.props.pageSize,
      searchString: event.target.value,
    };
    const list = document.querySelectorAll("#filtersearch2 li");
    const highlight = styles.highlight;
    list.forEach((item) => {
      item.classList.remove(highlight);
    });
    this.setState({
      ...this.state,
      searchString: event.target.value,
      selectedListIndex: -1,
      searchedText: event.target.value,
      searchedItem: event.target,
    });

    if (
      this.props.componentName != null &&
      this.props.componentName === "EditAccountPlan"
    ) {
      this.props.onChange(changeData).then((data) => {
        this.setState({
          ...this.state,
          open: data && data.length > 0 ? true : false,
          error: this.props.noData ? true : false,
        });
        this.inputRef.current.focus();
      });
    } else if (
      this.props.componentName == null ||
      (this.props.componentName != null &&
        this.props.componentName !== "EditAccountPlan" &&
        this.props.componentName !== "rateOfferLookupAcctMaint")
    ) {
      this.props.onChange(changeData).then((data) => {
        this.setState({
          ...this.state,
          open: true,
          error: this.props.noData ? true : false,
        });
      });
    } else if (
      this.props.componentName != null &&
      this.props.componentName == "rateOfferLookupAcctMaint"
    ) {
      this.props.onChange(changeData).then((data) => {
        self.setState(
          {
            ...self.state,
            open: data.length == 0 ? false : this.props.noData ? false : true,
            error: data.length == 0 ? true : this.props.noData ? true : false,
          },
          () => {
            ReactTooltip.show(self.tooltipRef);
          }
        );
      });
    }
  };

  handleBlur = () => {
    const self = this;

    if (this.props.componentName === "EditAccountPlan") {
      let invalidFlag = true;
      self.props.data.forEach((element) => {
        if (
          element.name.toUpperCase() === this.state.searchString.toUpperCase()
        ) {
          invalidFlag = false;
        }
      });
      if (this.props.removeData) {
        this.setState({
          searchString: "",
        });
      }
      if (
        (self.props.selected === null &&
          this.state.searchString != "" &&
          invalidFlag) ||
        this.state.searchString === ""
      ) {
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
    } else {
      if (
        (self.props.selected === null && this.state.searchString != "") ||
        this.state.searchString === ""
      ) {
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
    }
  };

  onFocus = () => {
    if (this.props.componentName === "EditAccountPlan") {
      if (this.props.removeData) {
        this.setState({
          searchString: "",
        });
      }
    }
  };

  render() {
    return (
      // @ts-ignore
      <div ref={this.container}>
        <div
          className={this.props.className}
          data-tip={this.props.id}
          data-for={Settings.cSearchFilter.tooltip}
          ref={(ref) => (this.tooltipRef = ref)}
        >
          <ReactTooltip
            id={Settings.cSearchFilter.tooltip}
            disable={!this.state.error}
            event="no-event"
            className={styles.tooltipContainer}
            place="right"
            border={true}
            effect="solid"
            textColor="#ffffff"
          >
            {this.state.searchString == ""
              ? !this.props.removeData && this.props.requiredMessage
                ? this.props.requiredMessage
                : ""
              : this.props.invalidMessage
              ? this.props.invalidMessage
              : ""}
          </ReactTooltip>
          <input
            id={this.props.id}
            onKeyPress={this.props.onKeyPress}
            value={
              this.props.removeData === true ? "" : this.state.searchString
            }
            placeholder={Settings.cSearchFilter.placeholder}
            className={
              this.state.error && !this.props.removeData
                ? styles.filterInputInvalid
                : styles.filterInput
            }
            onChange={this.onChange}
            // onBlur={this.handleBlur}
            type={"text"}
            onFocus={this.onFocus}
            ref={this.inputRef}
          />
          <div className={styles.buttonContainer} onClick={this.onIconClick}>
            <div className={styles.menuBoxChevronIconDiv}>&#9207;</div>
          </div>
        </div>
        {(() => {
          return (
            this.state.open &&
            !this.props.noData && (
              <ul
                id={`filtersearch2_${this.props.id}`}
                className={`${styles.btOptions} ${this.props.optionsStyle} ?  ${this.props.optionsStyle} : ${styles.optionsDefault}`}
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
                {this.props.data.length > 0 &&
                  this.props.data.map((data) => {
                    {
                      return (
                        <li
                          key={data.accountrecid}
                          id={data.accountrecid}
                          onClick={this.onOptionClick}
                        >
                          {data.name}
                        </li>
                      );
                    }
                  })}
                {!this.props.noData ? (
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
            )
          );
        })()}
        <style>
          {`
                  .__react_component_tooltip.place-right::before {
                    left: 0;
                    top: 50%;
                    margin-top: -9px;
                    background: #ffffff url(data:image/gif;base64,R0lGODlhAQAYAMQAAPf39/T09Pr6+vHx8e7u7vv7+/Ly8u/v7+zs7Pn5+fb29vDw8P39/e3t7f7+/vj4+PX19fz8/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABgAAAUUoCQ5DhNFhZA8D6BAUGAMy0E0SAgAOw==) repeat-x bottom left !important;
                    border: none;
                }
                .__react_component_tooltip.place-right::after {
                  border: 1px solid #7eabcd;
                  background: #ffffff url(data:image/gif;base64,R0lGODlhAQAYAMQAAPf39/T09Pr6+vHx8e7u7vv7+/Ly8u/v7+zs7Pn5+fb29vDw8P39/e3t7f7+/vj4+PX19fz8/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABgAAAUUoCQ5DhNFhZA8D6BAUGAMy0E0SAgAOw==) repeat-x bottom left !important;
                }
                  `}
        </style>
      </div>
    );
  }
}
