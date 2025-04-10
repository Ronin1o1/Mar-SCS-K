import React, { useRef, useState } from "react";
import classnames from "classnames";
import styles from "./CTabList.css";
import completedImg from "../assets/img/completed.gif";
import revisitImg from "../assets/img/revisit.gif";
import revisitTabImg from "../assets/img/revisit_tab.gif";

const scrollToRef = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
};

const leftArrow = (scrollToFirstTab, numberOfTabs) => {
  return (
    <div
      className={
        numberOfTabs !== 7 || numberOfTabs === undefined
          ? classnames(styles.tab, styles.arrowLeftDiv)
          : classnames(styles.tab, styles.arrowILeftDiv)
      }
      onClick={scrollToFirstTab}
    >
      <div className={styles.leftArrowImg}>
        <>&nbsp;</>
      </div>
    </div>
  );
};

const rightArrow = (scrollToLastTab, numberOfTabs) => {
  return (
    <div
      className={
        numberOfTabs !== 7 || numberOfTabs === undefined
          ? classnames(styles.tab, styles.arrowRightDiv)
          : classnames(styles.tab, styles.arrowIRightDiv)
      }
      onClick={scrollToLastTab}
    >
      <div className={styles.rightArrowImg}>
        <>&nbsp;</>
      </div>
    </div>
  );
};

const downArrow = (numberOfTabs, updateShowDropDownState) => {
  return (
    <div
      className={
        numberOfTabs !== 7 || numberOfTabs === undefined
          ? classnames(styles.tab, styles.arrowDownDiv)
          : classnames(styles.tab, styles.arrowIDownDiv)
      }
    >
      <div
        className={styles.downArrowImg}
        onClick={() => updateShowDropDownState(true)}
      >
        <>&nbsp;</>
      </div>
    </div>
  );
};

const populateDropdown = (props, updateShowDropDownState) => {
  return props.tabs.map((col, i) => {
    return (
      <div key={i} onClick={() => updateShowDropDownState(false)}>
        <li key={i} id={col.id} onClick={props.onClick}>
          {col.label}
        </li>
      </div>
    );
  });
};

const dropdown = (props, updateShowDropDownState) => {
  return (
    <ol className={styles.dropdownList}>
      {populateDropdown(props, updateShowDropDownState)}
    </ol>
  );
};

const tabNextLineRender = (colName) => {
  return (
    <>
      {colName
        ? colName.split(/\n/).map((tabList, index) => (
            <React.Fragment key={tabList}>
              {tabList} {index === 0 ? <br /> : null}
            </React.Fragment>
          ))
        : colName}
    </>
  );
};

const tabs = (props, firstTabRef, lastTabRef) =>
  props.tabs.map((col, i) => {
    let ref;
    if (i === 0) ref = firstTabRef;
    if (i === props.tabs.length - 1) ref = lastTabRef;
    return (
      <span
        ref={ref}
        key={i}
        id={col.id}
        className={classnames(
          props.componentName == "priceTabs" ? styles.tabStyle : styles.tab,
          col.id == props.selectedTab &&
            (props.componentName == "priceTabs" ||
            props.componentName == "accountStatusTabs" ||
            props.componentName == "groupsMeeting" ||
            props.componentName == "btQuestions"
              ? styles.selectTab
              : styles.selectedTab),
              "cpacpricetabdesign"
        )}
        style={
          props.componentName == "priceTabs" && col.tabStatus && col.width
            ? { width: col.width }
            : props.componentName === "accountMaintanance"
            ? { padding: "5px" }
            : props.componentName === "groupsMeeting"
            ? { display: "flex", alignItems: "center", paddingBottom: "4px" }
            : {}
        }
        onClick={
          props.componentName == "priceTabs"
            ? (e) => {
                if (e.target.id == "") {
                  e.target.id = col.id;
                }
                props.onClick(e);
              }
            : props.onClick
        }
      >
        {props.showTick != undefined && props.showTick === true ? (
          <span
            id={col.id}
            className={
              props.componentName == "priceTabs" ? styles.displayFlex : null
            }
          >
            {col.tabStatus === "C" && (
              <img src={completedImg} className={styles.imgStatus} />
            )}
            {col.tabStatus === "B" && (
              <img src={revisitImg} className={styles.revisitImg} />
            )}
            {col.tabStatus === "R" && (
              <img
                src={revisitTabImg}
                className={
                  props.componentName == "priceTabs"
                    ? [styles.revisitImg, styles.paddingRevisitImg].join(" ")
                    : props.componentName == "btQuestions"
                    ? styles.imgRStatus
                    : styles.revisitImg
                }
              />
            )}
            {col.tabStatus === "T" && (
              <img src={revisitImg} className={styles.revisitImg} />
            )}
            {col.tabStatus === "A" && (
              <img src={revisitImg} className={styles.revisitImg} />
            )}

            {props.componentName == "priceTabs" ||
            props.componentName == "btQuestions"
              ? tabNextLineRender(col.label)
              : col.label}
          </span>
        ) : (
          <span tabIndex={0} id={col.id}>
            {props.componentName == "priceTabs" ||
            props.componentName == "btQuestions"
              ? tabNextLineRender(col.label)
              : col.label}
          </span>
        )}
      </span>
    );
  });

function CTabList(props) {
  const [showDropDownList, setShowDropDownList] = useState(false);
  const firstTabRef = useRef();
  const lastTabRef = useRef();
  const scrollToFirstTab = () => scrollToRef(firstTabRef);
  const scrollToLastTab = () => scrollToRef(lastTabRef);
  const updateShowDropDownState = (flagToUpdate) => {
    setShowDropDownList(flagToUpdate);
  };
  return (
    <div className={props.className}>
      {props.showScroll === true ||
      props.showScroll === undefined ||
      props?.isDeviceResized ? (
        <div className={` ${styles.tabContainer} ${"btgroupacount"}`}>
          {leftArrow(scrollToFirstTab, props.numberOfTabs)}
          <div className={styles.tabList}>
            <div className={"tabListitems"}>
              {tabs(props, firstTabRef, lastTabRef)}
            </div>
          </div>
          {rightArrow(scrollToLastTab, props.numberOfTabs)}
          <div>
            {downArrow(props.numberOfTabs, updateShowDropDownState)}
            {showDropDownList && (
              <div className={styles.dropdownDiv}>
                {dropdown(props, updateShowDropDownState)}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.tabContainer}>
          <div
            className={
              props.componentName == "priceTabs"
                ? styles.tabsList
                : styles.tabList
            }
          >
            {tabs(props, firstTabRef, lastTabRef)}
          </div>
        </div>
      )}
    </div>
  );
}

export default CTabList;
