import React from "react";
import btnNext from "../../../../../common/assets/img/button/btnNext.gif";
import classnames from "classnames";
import styles from "./CopyText.css";
import API from "../../service/API";
import Settings from "../../static/Settings";
import RoomUtills from "../RoomUtills";

import RoomDescriptionContext from "../../context/RoomDescriptionContextProvider";

export default class CopyText extends React.Component {
  static contextType = RoomDescriptionContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: sessionStorage.getItem("radioBtnchecked-FRN")
        ? sessionStorage.getItem("radioBtnchecked-FRN")
        : "noAction",
    };
  }

  componentDidMount() {
    this.context.setParams(this.props.location.search);

    API.getDisplayText()
      .then((data) => {
        this.context.setChannelData(data.channels.channel);
      })
      .catch((error) => {
        this.context.state.showTableLoader = false;
      });
  }

  handleClick = () => {
    let path = "/roomtypenametext/formattedRooms";
    let action = this.context.state.nextUrl;
    const popAction = this.props?.history?.action;
    const selectedop = this.state?.selectedOption;
    let channelList = this.context.state.copyPageData;
    const queryParam = this.context.state.queryParam;
    /** when click radio button in copyText page
     * for noAction - need to redirect to home page
     * for start blank - create Data elements page as empty blank page
     * for copy data Elements - based on selected channel reterive the data and display the page
     */
    if (popAction === "POP") {
      if (action == "/" || action == "empty" || action == "copyData") {
        action = selectedop;
        channelList = channelList === "" ? {} : channelList;
        const prevvalues = sessionStorage.getItem("copyTextChannel");
        const previousValue = sessionStorage.getItem("copyTextLanguage");
        channelList.channelCode = prevvalues?.split("_")[0];
        channelList.channelNumber = prevvalues?.split("_")[1];
        channelList.channelName = prevvalues?.split("_")[2];
        channelList.languageCode = previousValue?.split("_")[0];
        channelList.languageName = previousValue?.split("_")[1];
      }
    } else if (popAction === "PUSH") {
      action = selectedop;
      channelList = channelList === "" ? {} : channelList;
      const prevvalues = sessionStorage.getItem("copyTextChannel");
      const previousValue = sessionStorage.getItem("copyTextLanguage");
      channelList.channelCode = prevvalues?.split("_")[0];
      channelList.channelNumber = prevvalues?.split("_")[1];
      channelList.channelName = prevvalues?.split("_")[2];
      channelList.languageCode = previousValue?.split("_")[0];
      channelList.languageName = previousValue?.split("_")[1];
    }
    if (!sessionStorage.getItem("copyTextChannel")) {
      sessionStorage.setItem(
        "copyTextChannel",
        channelList.channelCode +
          "_" +
          channelList.channelNumber +
          "_" +
          channelList.channelName
      );
    }
    if (!sessionStorage.getItem("copyTextLanguage")) {
      sessionStorage.setItem(
        "copyTextLanguage",
        channelList.languageCode + "_" + channelList.languageName
      );
    }
    if (action === "empty" || action === "copyData") {
      if (action === "copyData") {
        /**
         * when copy Text radio button selection need to validate the user selected r not
         * both Channel and language from dropdown
         */
        if (!channelList.channelName || channelList.channelName === undefined) {
          alert(Settings.popUp.copyChannelAlert);
        } else if (
          !channelList.languageCode ||
          channelList.languageCode === undefined
        ) {
          alert(Settings.popUp.copyLanguageAlert);
        } else {
          path = `/dataElements?languageCode=${channelList.languageCode}&languageName=${channelList.languageName}
                    &channelCode=${channelList.channelCode}&channelNumber=${channelList.channelNumber}
                     &channelName=${channelList.channelName}&createNew=false`;
          // this.props.history.push(path);
          const req = {
            languageCode: RoomUtills.setQueryParam("languageCode"),
            languageName: RoomUtills.setQueryParam("languageName"),
            channelName: RoomUtills.setQueryParam("channelName"),
            channelCode: RoomUtills.setQueryParam("channelCode"),
            channelNumber: RoomUtills.setQueryParam("channelNumber"),
            createNew: RoomUtills.setQueryParam("createNew"),
            newChannelLang: channelList,
          };
          this.context.copyRoomDetails(req, this.props.history, path);
        }
      } else {
        path = `/dataElements?languageCode=${queryParam.languageCode}
                &languageName=${queryParam.languageName}
                &channelCode=${queryParam.channelCode}&channelNumber=${queryParam.channelNumber}
                &channelName=${queryParam.channelName}&createNew=true`;
        this.resetSelectedOption();
        const req = {
          languageCode: RoomUtills.setQueryParam("languageCode"),
          languageName: RoomUtills.setQueryParam("languageName"),
          channelName: RoomUtills.setQueryParam("channelName"),
          channelCode: RoomUtills.setQueryParam("channelCode"),
          channelNumber: RoomUtills.setQueryParam("channelNumber"),
          createNew: RoomUtills.setQueryParam("createNew"),
        };

        this.context.state.queryParam = req;
        this.context.getRoomDisplayData(req, this.props.history, path);
      }
    } else {
      this.resetSelectedOption();
      this.props.history.push(path);
    }
  };

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });

    sessionStorage.setItem("radioBtnchecked-FRN", changeEvent.target.value);
  };

  resetSelectedOption() {
    this.context.state.nextUrl = "/";
    this.context.state.copyPageData = "";
  }

  languageBind() {
    return (
      <React.Fragment>
        {this.context.state.langData && (
          <option value={this.context.state.langData}>
            {this.context.state.langData.split("_")[1]}
          </option>
        )}
        <option value="en_English">English</option>
      </React.Fragment>
    );
  }

  render() {
    const { channelName, languageName } =
      this.context && this.context.state && this.context.state.queryParam;
    return (
      <div>
        {RoomUtills.header(styles, "Copy Text")}
        <div className={classnames(styles.default_font, styles.width70)}>
          <span className={styles.bold}>Channel: </span>
          <span className={styles.mr5}>{channelName ? channelName : ""}</span>
          <span
            className={classnames(styles.lang_name, styles.bold, styles.ml10)}
          >
            Language:{" "}
          </span>
          <span>{languageName ? languageName : ""}</span>
        </div>
        <div style={{ width: "60%" }}>
          <div style={{ marginBottom: "15px", marginTop: "15px" }}>
            {Settings.customeText.copyText1}{" "}
          </div>
          <div style={{ color: "red", fontWeight: "bold" }}>
            {Settings.customeText.warning}
          </div>
          <div>{Settings.customeText.copyText2}</div>
          <div className={classnames(styles.mt10, styles.bold)}>
            <div>
              <input
                type="radio"
                value={"noAction"}
                name="copy"
                onChange={this.context.handleRadioChange}
                checked={this.state.selectedOption === "noAction"}
                onClick={this.handleOptionChange}
              />{" "}
              No Action
            </div>
            <div>
              <input
                type="radio"
                value={"empty"}
                name="copy"
                onChange={this.context.handleRadioChange}
                checked={this.state.selectedOption === "empty"}
                onClick={this.handleOptionChange}
              />{" "}
              Start with Blank Display Text
            </div>
            <div>
              <span>
                <input
                  type="radio"
                  value={"copyData"}
                  name="copy"
                  onChange={this.context.handleRadioChange}
                  checked={this.state.selectedOption === "copyData"}
                  onClick={this.handleOptionChange}
                />{" "}
                Copy Display Text From Channel:
                <select
                  className={classnames(styles.defaultFont, styles.ml5)}
                  onChange={(event) =>
                    this.context.handleCopyDropDown(event, "channel")
                  }
                  value={
                    sessionStorage.getItem("copyTextChannel") == null
                      ? "select"
                      : sessionStorage.getItem("copyTextChannel")
                  }
                >
                  <option value={"select"}>Please select a channel</option>
                  {this.context.state.channelData &&
                    this.context.state.channelData.map((data, index) => (
                      <option
                        key={"channel_" + index}
                        value={data.code + "_" + data.number + "_" + data.name}
                      >
                        {data.name}
                      </option>
                    ))}
                </select>
              </span>
              <span className={styles.ml10}>
                Language:
                <select
                  className={classnames(styles.defaultFont, styles.ml5)}
                  onChange={(event) =>
                    this.context.handleCopyDropDown(event, "language")
                  }
                  value={
                    sessionStorage.getItem("copyTextLanguage") == null
                      ? "select"
                      : sessionStorage.getItem("copyTextLanguage")
                  }
                >
                  <option value={"select"}>Please select a language</option>
                  {this.languageBind()}
                </select>
              </span>
            </div>
          </div>
          <div style={{ float: "right" }}>
            <img
              tabIndex={0}
              className={styles.pointer}
              src={btnNext}
              alt={"Next"}
              onClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
