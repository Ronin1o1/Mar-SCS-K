import React, { useEffect, useContext, useRef } from "react";
import styles from "./grid.css";
import VirtualScroll from "react-dynamic-virtual-scroll";
import filterstyles from "../../common/components/filter/Filter.css";
import { CNoDataFound } from "../../common/components/CNoDataFound";
import FilteredGridSelectUtils from "../utils/FilteredGridSelectUtils";
import Settings from "../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
import { CLoader } from "../../common/components/CLoader";

function Grid(props) {
  const ValueSelected = props.seqfind;
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const virtualScrollRef = useRef();
  useEffect(() => {
    scrollElement(ValueSelected);
  }, [ValueSelected]);

  useEffect(() => {
    const elemView = document.getElementById("gridView");
    const elemSelected = document.getElementById("gridViewSelectedGrid");
    let resetRefresh = true;

    if (elemView && appContext.tableRefresh) {
      elemView.scrollTop = 0;
      appContext.setTableRefersh(false);
      resetRefresh = false;
    }
    if (elemSelected && appContext.tableRefresh) {
      elemSelected.scrollTop = 0;
      if (resetRefresh) {
        appContext.setTableRefersh(false);
      }
    }
    appContext.setTableRefersh(false);
  }, [appContext.tableRefresh]);

  const handleRowSelection = (index: number, gridNo) => {
    const elements = document.querySelectorAll("#gridTableView tr");
    const highlight1 = "_3iyxNCHPnMdk34KcXaNLaw==";
    const highlight =
      gridNo === "1"
        ? filterstyles.gridRowbarSelected
        : gridNo === "2"
        ? filterstyles.gridRowbarSelected2
        : filterstyles.gridRowbarSelected;
    elements.forEach(function (element) {
      if (element.classList.contains(highlight))
        element.classList.remove(highlight);
    });
    if (gridNo === "2") {
      elements.forEach(function (element) {
        if (element.classList.contains(highlight1))
          element.classList.remove(highlight1);
      });
    }
    if (gridNo === "1") {
      appContext.setActiveGridRowIndexTableOne(index);
      appContext.setPrevGridRowIndexTableOne(index);
      appContext.setPrevGridRowIndexTableTwo(null);
    } else if (gridNo === "2") {
      appContext.setActiveGridRowIndexTableTwo(index);
      appContext.setPrevGridRowIndexTableTwo(index);
      appContext.setPrevGridRowIndexTableOne(null);
    }
    scrollElement("");
    appContext.setpgoosGridRowHighlight(true);
    appContext.setpgoosFilterRowHighlight(false);
  };
  const scrollElement = (search: string) => {
    const aElements = document.querySelectorAll("table >tbody > div> tr > td");

    for (const ele of aElements as any) {
      const parent = ele.parentElement;
      parent.style["backgroundColor"] = "transparent";
    }
    for (const ele of aElements as any) {
      const elem = ele.innerHTML
        .replace(/class=\".*?\"/g, "")
        .replace(/class=\".*?\"/g, "")
        .replace(/_ngcontent-c1=\".*?\"/g, "");

      if (elem === `<td ><div><span>${search}</span></div></td>`) {
        const parent = ele.parentElement;
        parent.style["backgroundColor"] = "#b6d3f3";
        ele.scrollIntoView(true);
        if (props.gridNo === "1") {
          appContext.setActiveGridRowIndexTableOne(null);
        } else if (props.gridNo === "2") {
          appContext.setActiveGridRowIndexTableTwo(null);
        }
        break;
      }
    }
  };
  const sizeArr = [];

  const getTd = (list) => {
    let pgoosRowHide = true;
    if (props.componentName === "PGOOSPropagation" && props.isSelectedGrid) {
      const pgoosIdCheck = (
        document.getElementById("reportProgram") as HTMLElement
      )?.style?.display;
      pgoosRowHide = pgoosIdCheck === "table-cell" ? true : false;
    }
    const listLength = Object.keys(list).length;
    return Object.keys(list).map((key, index) => (
      <td
        style={sizeArr[index]}
        className={`${styles.gridCell} ${
          !pgoosRowHide && index === listLength - 1 ? styles.dispNone : ""
        }`}
      >
        {list[key]}
      </td>
    ));
  };

  const getTr = (item, index) => {
    let colorCode = "";
    if (
      (props.componentName == Settings.hotelSolicitation ||
        props.componentName == "PortfolioSelection" ||
        props.componentName == "portfolioOrganization") &&
      props.gridNo == "1"
    ) {
      colorCode = FilteredGridSelectUtils.classNameValueAvail(item);
    } else if (
      (props.componentName == "PortfolioSelection" ||
        props.componentName == "portfolioOrganization") &&
      props.gridNo == "2"
    ) {
      colorCode = FilteredGridSelectUtils.classNameValue(item);
    } else if (
      props.componentName == Settings.hotelSolicitation &&
      props.gridNo == "2"
    ) {
      colorCode =
        FilteredGridSelectUtils.classNameValueForHotelSolicitation(item);
    } else {
      colorCode = "";
    }
    const activeIndex =
      props.gridNo === "1"
        ? appContext.activeGridRowIndexTableOne
        : props.gridNo === "2" && appContext.activeGridRowIndexTableTwo;
    return (
      <tr
        style={{
          height: "21px",
          color: colorCode,
          fontWeight:
            colorCode == "#b95c00" || colorCode == "#0057c1"
              ? "bold"
              : "normal",
        }}
        key={index}
        className={`${
          !appContext.pgoosFilterRowHighlight &&
          appContext.pgoosGridRowHighlight &&
          index === activeIndex
            ? styles.gridRowbarSelected
            : styles.rightPanelRow
        } `}
        id="panelCurrentRow"
        onClick={() => handleRowSelection(index, props.gridNo)}
      >
        {getTd(item)}
      </tr>
    );
  };

  const handleDisplayPanelData = () => {
    return props.value.map((item, index) => {
      return (
        <div
          key={index}
          id="da_5004924"
          className={
            props.componentName === "QuestionMain" ||
            props.componentName === "groupMain"
              ? index % 2
                ? styles.gridRowEven
                : styles.gridRowSelect
              : index % 2
              ? styles.gridRowOdd
              : styles.gridRow
          }
          style={{
            width: props.isWidthAuto
              ? "auto"
              : props.width
              ? props.width
              : "100%",
          }}
        >
          {getTr(item, index)}
        </div>
      );
    });
  };
  const scrollList = (e) => {
    if (virtualScrollRef.current) {
      virtualScrollRef.current.scrollHook(e.target);
    }
  };
  const handleDisplayPanelDatatEMP = () => {
    if (props.value?.length > 0) {
      return (
        <VirtualScroll
          ref={virtualScrollRef}
          className={`${styles.virtualScrollDiv} ${"virtualScrollGrid"}`}
          id={
            props.isSelectedGrid
              ? "virtualScrollGridSelected"
              : "virtualScrollGrid"
          }
          key={props?.refreshVal || ""}
          minItemHeight={20}
          totalLength={props.value?.length}
          buffer={5}
          renderItem={(index) => {
            const data = props.value[index];
            return (
              <div
                key={index}
                id="da_5004924"
                className={
                  props.componentName === "QuestionMain" ||
                  props.componentName === "groupMain"
                    ? index % 2
                      ? styles.gridRowEven
                      : styles.gridRowSelect
                    : index % 2
                    ? styles.gridRowOdd
                    : styles.gridRow
                }
                style={{
                  width: props.isWidthAuto
                    ? "auto"
                    : props.width
                    ? props.width
                    : "100%",
                }}
              >
                {getTr(data, index)}
              </div>
            );
          }}
        />
      );
      //}
    }
  };
  const handleOrderChange = (item) => {
    const scrollContailer = document.getElementById(
      props.isSelectedGrid ? "virtualScrollGridSelected" : "virtualScrollGrid"
    );
    if (scrollContailer) {
      scrollContailer.scrollTop = 0;
    }
    props.handleOrderChange(item.optionnumber);
  };
  const tableHeader = () => {
    return props.columns.map((item, index) => {
      if (item.style) {
        sizeArr.push(item.style);
      }
      return (
        <th
          key={index}
          style={item.style}
          className={styles.gridCell}
          id={item?.id ? item?.id : ""}
        >
          {item.optionnumber >= 0 ? (
            <a
              id={`${props.id}-${props.gridNo}-${item.optionnumber}`}
              href="javascript:void(0);"
              dangerouslySetInnerHTML={{ __html: item.header }}
              onClick={() => handleOrderChange(item)}
            />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: item.header }} />
          )}
        </th>
      );
    });
  };
  const renderLoader = (): JSX.Element => {
    if (props.componentName == "HotelSolicitation") {
      if (props.isMakingRequestAvailList && props.gridNo === "1") {
        return (
          <div id="availListLoader" className={"loaderImgAvailList"}>
            <CLoader />
          </div>
        );
      }
      if (props.isMakingRequest && props.gridNo === "2") {
        return (
          <div className={`${styles.loaderImg} ${"loaderImgAvailList2"}`}>
            <CLoader />
          </div>
        );
      }
    } else {
      return (
        props.isMakingRequestList &&
        props.isMakingRequestList.includes(
          props.isSelectedGrid ? "selectList" : "availList"
        ) && (
          <div className={`${styles.loaderImg} ${"loaderImgAvailList3"}`}>
            <CLoader />
          </div>
        )
      );
    }
  };
  return (
    <>
      <div
        style={{
          width: props.width ? props.width : "100%",
          height: props.height ? props.height : "100%",
          border: "1px solid #f4f4f2",
          backgroundColor: "rgb(239, 240, 236)",
        }}
        id={props.id}
        className={`${styles.gridView} `}
      >
        {props.header ? (
          <div
            style={{ padding: "3px", backgroundColor: "#d6d7ce" }}
            className={"hotelsolicitationchoosefile"}
          >
            {props.header}
          </div>
        ) : (
          ""
        )}
        {/* <div className={`${styles.gridHeader}`} id="gridHeader"> */}
        <div
          className={`
            ${
              props.componentName == "requestReport"
                ? styles.gridHeaderInherited
                : styles.gridHeader
            }
              ${"gridheaderdata"}
            `}
        >
          <table
            style={{
              height: "32px",
              backgroundColor: "rgb(214, 215, 206)",
            }}
            className={styles.gridRowTable}
            id="gridTableHeader"
            cellSpacing={0}
            cellPadding={0}
          >
            <tbody>
              <tr>{tableHeader()}</tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            height:
              props.componentName === "EdieHotelProfileList"
                ? "calc(50vh - 125px)"
                : props.componentName === "PortfolioSelection"
                ? "calc(50vh - 125px)"
                : props.componentName === "CBCrequest"
                ? "calc(50vh - 125px)"
                : props.componentName === "requestEdie"
                ? props.height
                : props.componentName === "requestReport"
                ? "calc(100vh - 182px)"
                : props.componentName === "portfolioOrganization"
                ? "calc(50vh - 124px)"
                : props.componentName === "PGOOSPropagation"
                ? "calc(50vh - 124px)"
                : props.header
                ? "calc(100% - 70px)"
                : "calc(100vh - 250px)",
            marginTop: props.componentName != "requestReport" && "33px",
            width: props.width ? props.width : "100%",
          }}
          className={` ${
            props.componentName === "CBCrequest" && !props.isSelectedGrid
              ? styles.cbcScroll
              : props.componentName === "HotelSolicitation"
              ? styles.solicitationgridhotel
              : props.componentName === "requestReport"
              ? styles.reqReportScroll
              : props.gridScroll
          } ${"ediecolumndescripton"} ${"hoelsolicitationlist"}`}
          id={props.isSelectedGrid ? "gridViewSelectedGrid" : "gridView"}
        >
          {renderLoader()}
          {props.value?.length > 0 || props.initialLoad == true ? (
            <table
              className={`${styles.gridRowTable} ${styles.zeroHeight} ${styles.gridTableWidth100}`}
              id="gridTableView"
              onScroll={scrollList}
            >
              <tbody>{handleDisplayPanelDatatEMP()}</tbody>
            </table>
          ) : (
            <CNoDataFound />
          )}
        </div>
      </div>
    </>
  );
}

export default Grid;
