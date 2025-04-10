import React from "react";
import styles from "./MSearchSelect.module.css";
import BaseInputText from "../base/BaseInputText";
import icon from "./../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../../data/Settings";

interface IProps {
  id: string;
  value: string;
  data: any;
  onSelect: (event) => void;
  onChange: (event) => any;
  onClick: (event) => any;
}

interface IState {
  open: boolean;
}

export default class MSearchSelect extends React.Component<IProps, IState> {
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

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false });
    }
  };

  onInputClick = event => {
    this.setState(state => {
      return {
        open: true
      };
    });
  };

  onOptionClick = event => {
    this.props.onSelect(event);

    this.setState({
      open: false
    });
  };

  onChange = event => {
    this.props.onChange(event);
  };

  render() {
    return (
      <div ref={this.container}>
        <div className={styles.filterContainer}>
          <BaseInputText
            id={this.props.id}
            value={this.props.value}
            placeholder={"Account Search"}
            className={styles.filterInput}
            onChange={this.onChange}
            onFocus={this.onInputClick}
          />
          <div className={styles.buttonContainer} onClick={this.props.onClick}>
            <div className={styles.searchIconDiv}>
              <svg className={styles.searchIconSVG}>
                <use
                  x="-30px"
                  y="-60px"
                  href={icon + "#magnifying-glass"}
                  xlinkHref={icon + "#magnifying-glass"}
                />
              </svg>
            </div>
          </div>
        </div>
        {(() => {
          return (
            this.state.open && (
              <ul className={styles.options}>
                {this.props.data &&
                  this.props.data.map(data => {
                    {
                      return (
                        <li
                          key={data.scpt_accountid}
                          id={data.scpt_accountid}
                          onClick={this.onOptionClick}
                        >
                          {data.accountname}
                        </li>
                      );
                    }
                  })}
                {this.props.data.length === 0 && (
                  <li key={null} id={null} onClick={this.onOptionClick}>
                    {"No account found"}
                  </li>
                )}
              </ul>
            )
          );
        })()}
      </div>
    );
  }
}
