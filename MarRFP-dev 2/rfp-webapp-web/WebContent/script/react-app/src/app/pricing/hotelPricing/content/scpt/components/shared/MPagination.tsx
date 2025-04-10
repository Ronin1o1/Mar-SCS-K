import React from "react";
import icon from "../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import styles from "../shared/MPagination.module.css";
import BaseInputText from "../base/BaseInputText";
import Settings from "../../data/Settings";

interface IProps {
  currentPage: any;
  totalPages: any;
  handlePaginationClick: () => void;
  handlePaginationChange: (event) => void;
}

interface IState {
  currentPage: any;
}

const startPage = 1;

export default class MPagination extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage
    };
  }

  componentWillReceiveProps() {
    if (this.props.currentPage !== this.state.currentPage) {
      this.setState({ currentPage: this.props.currentPage });
    }
  }

  onChange = event => {
    if (
      event.target.value < 0 ||
      event.target.value > this.props.totalPages ||
      event.target.value === "0"
    ) {
      this.setState({ currentPage: this.props.currentPage });
    } else {
      this.setState({ currentPage: event.target.value });
    }
  };

  onKeyPress = event => {
    if (event.key === Settings.text.constant.enterKey) {
      if (
        event.target.value < 1 ||
        event.target.value > this.props.totalPages
      ) {
        event.target.value = 1;
      }
      this.props.handlePaginationChange(event);
    }
  };

  renderFirstInactiveIcon() {
    return (
      <div className={styles.firstIconInactiveDiv}>
        <svg
          className={styles.firstInactiveIconSVG}
          onClick={this.context.handleFirstIconClick}
        >
          <use
            x="-10px"
            y="-110px"
            href={icon + "#first-page-inactive"}
            xlinkHref={icon + "#first-page-inactive"}
          />
        </svg>
      </div>
    );
  }

  renderFirstActiveIcon() {
    return (
      <div className={styles.firstIconDiv}>
        <svg
          className={styles.firstInactiveIconSVG}
          id={
            Settings.text.compid.accountPricing.accountPricingTableHeader
              .paginationFirst
          }
          onClick={this.props.handlePaginationClick}
        >
          <use
            x="-10px"
            y="-80px"
            href={icon + "#first-page-active"}
            xlinkHref={icon + "#first-page-active"}
          />
        </svg>
      </div>
    );
  }

  renderPreviousInactive() {
    return (
      <div className={styles.previousIconInactiveDiv}>
        <svg className={styles.previousInactiveIconSVG}>
          <use
            x="-40px"
            y="-110px"
            href={icon + "#previous-page-inactive"}
            xlinkHref={icon + "#previous-page-inactive"}
          />
        </svg>
      </div>
    );
  }

  renderPreviousActive() {
    return (
      <div className={styles.previousIconDiv}>
        <svg
          className={styles.previousActiveIconSVG}
          id={
            Settings.text.compid.accountPricing.accountPricingTableHeader
              .paginationPrevious
          }
          onClick={this.props.handlePaginationClick}
        >
          <use
            x="-40px"
            y="-80px"
            href={icon + "#previous-page-active"}
            xlinkHref={icon + "#previous-page-active"}
          />
        </svg>
      </div>
    );
  }

  renderNextActive() {
    return (
      <div className={styles.nextIconDiv}>
        <svg
          className={styles.nextActiveIconSVG}
          id={
            Settings.text.compid.accountPricing.accountPricingTableHeader
              .paginationNext
          }
          onClick={this.props.handlePaginationClick}
        >
          <use
            x="-70px"
            y="-80px"
            href={icon + "#next-page-active"}
            xlinkHref={icon + "#next-page-active"}
          />
        </svg>
      </div>
    );
  }

  renderNextInactive() {
    return (
      <div className={styles.nextIconInactiveDiv}>
        <svg className={styles.nextInactiveIconSVG}>
          <use
            x="-70px"
            y="-110px"
            href={icon + "#next-page-inactive"}
            xlinkHref={icon + "#next-page-inactive"}
          />
        </svg>
      </div>
    );
  }

  renderLastActive() {
    return (
      <div className={styles.lastIconDiv}>
        <svg
          className={styles.lastActiveIconSVG}
          id={
            Settings.text.compid.accountPricing.accountPricingTableHeader
              .paginationLast
          }
          onClick={this.props.handlePaginationClick}
        >
          <use
            x="-100px"
            y="-80px"
            href={icon + "#last-page-active"}
            xlinkHref={icon + "#last-page-active"}
          />
        </svg>
      </div>
    );
  }

  renderLastInactive() {
    return (
      <div className={styles.lastIconInactiveDiv}>
        <svg className={styles.lastInactiveIconSVG}>
          <use
            x="-100px"
            y="-110px"
            href={icon + "#last-page-inactive"}
            xlinkHref={icon + "#last-page-inactive"}
          />
        </svg>
      </div>
    );
  }

  render() {
    let activeHome;
    let activePrevious;
    let activeNext;
    let activeLast;

    if (this.props.currentPage > startPage) {
      activeHome = this.renderFirstActiveIcon();
      activePrevious = this.renderPreviousActive();
    } else {
      activeHome = this.renderFirstInactiveIcon();
      activePrevious = this.renderPreviousInactive();
    }
    if (this.props.currentPage < this.props.totalPages) {
      activeNext = this.renderNextActive();
      activeLast = this.renderLastActive();
    } else {
      activeNext = this.renderNextInactive();
      activeLast = this.renderLastInactive();
    }

    return (
      <div className={styles.container}>
        {activeHome}
        {activePrevious}
        <div className={styles.pageText}>
          <BaseInputText
            id={
              Settings.text.compid.accountPricing.accountPricingTableHeader
                .pagination
            }
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.currentPage}
          />
        </div>
        <div className={styles.pageTotal}>of {this.props.totalPages}</div>
        {activeNext}
        {activeLast}
      </div>
    );
  }
}
