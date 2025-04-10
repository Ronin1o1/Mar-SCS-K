import React, { useEffect, useState, useContext } from "react";
import btnFindNext from "../../assets/img/button/btnFindNext.gif";
import btnFilter from "../../assets/img/button/btnFilter.gif";
import btnCancel from "../../assets/img/button/btnCancel.gif";
import styles from "./Filter.css";
import ApplicationContext, { IApplicationContext } from "../ApplicationContext";

export const FilterSortWindow: React.FC<any> = (props: any) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [direction, setDirection] = useState(1);
  const [prevRow, setPrevRow] = useState<number>(-1);
  const showOptions = props.showOptions?.pfo?.showOptions;
  const [findInType, setFindInType] = useState(1);

  const getFindFilterOptions = () => {
    if (
      props.componentName != null &&
      props.componentName === "EdieHotelProfileView"
    ) {
      if (props.findFilters) {
        return props.findFilters.findList.map((item) => {
          return <option value={item.optionnumber}>{item.optionname}</option>;
        });
      }
    } else {
      if (props.findFilters) {
        return props.findFilters?.map((item) => {
          return <option value={item.optionnumber}>{item.optionname}</option>;
        });
      }
    }
  };

  useEffect(() => {
    setMatchTypeInitial(1);
    appContext.activeRowPortfolio = null;
    appContext.setactiveRowPortfolio(appContext.activeRowPortfolio);
    appContext.prevRowPortfolio = null;
    appContext.setactiveRowPortfolio(appContext.prevRowPortfolio);
    //setMatchField(0);
    return () => {
      setMatchField(0);
    };
  }, [props.findFilters]);

  const setMatchType = (value) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        filterMatchType: parseInt(value),
      },
    });
  };

  const setMatchTypeInitial = (value) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        filterMatchType: parseInt(value),
        filterMatchField:
          props.findFilters && props.findFilters[0]?.optionnumber,
      },
    });
  };

  const setMatchField = (value) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        filterMatchField: parseInt(value),
      },
    });
  };

  const setDirectionType = (value) => {
    setDirection(parseInt(value));
  };

  const FindItem = () => {
    let prevRowPortfolioflag = 0;
    let prevRowOtherFlag = 0;
    if (
      props.componentName === "portfolioRebid" ||
      props.componentName === "PortfolioAcceptance"
    ) {
      prevRowPortfolioflag =
        appContext.prevRowPortfolio !== null
          ? parseInt(appContext.prevRowPortfolio)
          : prevRow;
      if (appContext.prevRowPortfolio !== null) {
        setPrevRow(prevRowPortfolioflag);
      } else {
        setPrevRow(prevRowPortfolioflag);
      }
    } else {
      if (findInType !== 2) {
        prevRowOtherFlag =
          appContext.prevGridRowIndexTableOne !== null
            ? parseInt(appContext.prevGridRowIndexTableOne)
            : prevRow;
        if (appContext.prevGridRowIndexTableOne !== null) {
          setPrevRow(prevRowOtherFlag);
        } else {
          setPrevRow(prevRowOtherFlag);
        }
      } else {
        prevRowOtherFlag =
          appContext.prevGridRowIndexTableTwo !== null
            ? parseInt(appContext.prevGridRowIndexTableTwo)
            : prevRow;
        if (appContext.prevGridRowIndexTableTwo !== null) {
          setPrevRow(prevRowOtherFlag);
        } else {
          setPrevRow(prevRowOtherFlag);
        }
      }
    }

    const strFind =
      props.filterContext.requestPayload.strFilterValues.filterString;

    let iField =
      props.filterContext.requestPayload.strFilterValues.filterMatchField < 0
        ? 0
        : props.filterContext.requestPayload.strFilterValues.filterMatchField;

    if (
      props.componentName === "EdieHotelProfileView" &&
      iField === undefined
    ) {
      iField = 1;
    }
    const bMatch =
      props.filterContext.requestPayload.strFilterValues.filterMatchType < 0
        ? 1
        : props.filterContext.requestPayload.strFilterValues.filterMatchType;
    const iDir = direction;
    if (strFind == "") {
      alert("You must enter a string to find.");
      appContext.setpgoosGridRowHighlight(true);
      appContext.setpgoosFilterRowHighlight(false);
    } else {
      let i;
      let numRows;
      let pattern;
      let iStart;
      let bFoundItem;
      let bFoundItem2;
      let iStart2;
      let i2;
      let numItemsSelected;
      appContext.setpgoosFilterRowHighlight(true);
      appContext.setpgoosGridRowHighlight(false);
      numRows = (document.getElementById("numItems") as HTMLInputElement)
        ?.value;
      numItemsSelected = (
        document.getElementById("numItemsSelected") as HTMLInputElement
      )?.value;

      if (findInType === 2) numRows = numItemsSelected;
      if (bMatch) pattern = "";
      else pattern = "^";

      pattern += strFind;
      bFoundItem = false;
      bFoundItem2 = false;

      if (
        props.componentName === "portfolioRebid" ||
        props.componentName === "PortfolioAcceptance"
      ) {
        if (iDir == 2) {
          //up
          // if (prevRow != -1) {
          iStart = prevRowPortfolioflag - 1;
          for (i = iStart; i >= 0; i--) {
            bFoundItem = CheckItem(pattern, i, iField);
            if (bFoundItem) {
              setPrevRow(i);
              break;
            }
          }
          iStart2 = prevRowPortfolioflag - 1;
          if (findInType === 3) {
            for (i2 = iStart2; i2 > 0; i2--) {
              bFoundItem2 = CheckItem2(pattern, i2, iField);
              // if (bFoundItem2) break;
              if (bFoundItem2) {
                setPrevRow(i2);
                break;
              }
            }
          }
          // }
        } //Find first or down
        else {
          if (iDir == 1 || prevRowPortfolioflag == -1) {
            //find first.
            iStart = 0;
            iStart2 = 0;
          } else {
            iStart = prevRowPortfolioflag + 1;
            iStart2 = prevRowPortfolioflag + 1;
          }

          for (i = iStart; i < numRows; i++) {
            bFoundItem = CheckItem(pattern, i, iField);

            if (bFoundItem) {
              setPrevRow(i);
              break;
            }
          }
          if (findInType === 3) {
            for (i2 = iStart2; i2 < numItemsSelected; i2++) {
              bFoundItem2 = CheckItem2(pattern, i2, iField);
              if (bFoundItem2) {
                setPrevRow(i2);
                break;
              }
            }
          }
        }
      } else {
        if (iDir == 2) {
          if (prevRowOtherFlag === 0) {
            prevRowOtherFlag = -1;
          } else {
            prevRowOtherFlag = prevRowOtherFlag;
          }
          //up
          // if (prevRow != -1) {
          iStart2 = prevRowOtherFlag - 1;
          if (findInType === 3) {
            for (i2 = iStart2; i2 > 0; i2--) {
              bFoundItem2 = CheckItem2(pattern, i2, iField);
              // if (bFoundItem2) break;
              if (bFoundItem2) {
                setPrevRow(i2);
                break;
              }
            }
          }
          iStart = prevRowOtherFlag - 1;
          for (i = iStart; i >= 0; i--) {
            bFoundItem = CheckItem(pattern, i, iField);
            if (bFoundItem) {
              setPrevRow(i);
              break;
            }
          }

          // }
        } //Find first or down
        else {
          if (iDir == 1 || prevRowOtherFlag == -1) {
            //find first.
            iStart = 0;
            iStart2 = 0;
          } else {
            iStart = prevRowOtherFlag + 1;
            iStart2 = prevRowOtherFlag + 1;
          }
          if (findInType === 3) {
            for (i2 = iStart2; i2 < numItemsSelected; i2++) {
              bFoundItem2 = CheckItem2(pattern, i2, iField);
              if (bFoundItem2) {
                setPrevRow(i2);
                break;
              }
            }
          }

          for (i = iStart; i < numRows; i++) {
            bFoundItem = CheckItem(pattern, i, iField);

            if (bFoundItem) {
              setPrevRow(i);
              break;
            }
          }
        }
      }

      if (!bFoundItem) {
        alert("No matches where found");
        appContext.setpgoosGridRowHighlight(true);
        appContext.setpgoosFilterRowHighlight(false);
      } else {
        appContext.setpgoosGridRowHighlight(false);
        appContext.setpgoosFilterRowHighlight(true);
      }
      // if (findInType === 3 && !bFoundItem2) alert("No matches where found");
    }
  };

  const CheckItem = (pattern, iRow, iField) => {
    const re = new RegExp(pattern, "i");
    let bFound;

    bFound = false;
    let tableGrid = document.getElementById("gridView");
    let tableGrid1;
    let columnName;

    let iFieldCount = props.isCheckBoxes ? iField + 1 : iField;

    if (findInType === 2) {
      tableGrid = document.getElementById("gridViewSelectedGrid");
    }

    if (props.componentName === "PortfolioAcceptance" && iField === 0) {
      tableGrid = document.getElementById("frozenCol");
      tableGrid1 = document.getElementById("gridView");
      iFieldCount = iField + 2;
    } else if (props.componentName === "PortfolioAcceptance" && iField === 1) {
      tableGrid = document.getElementById("frozenCol");
      tableGrid1 = document.getElementById("gridView");
      // columnName = document.getElementById("rebidHotelName");
      iFieldCount = iField;
    } else if (
      props.componentName === "PortfolioAcceptance" &&
      (iFieldCount === 16 || iFieldCount === 17 || iFieldCount === 18)
    ) {
      tableGrid = document.getElementById("frozenCol");
      tableGrid1 = document.getElementById("gridView");
      iFieldCount = iField;
    }

    if (props.componentName === "portfolioRebid" && iField === 0) {
      tableGrid = document.getElementById("frozenCol");
      tableGrid1 = document.getElementById("gridView");
      iFieldCount = iField;
    } else if (props.componentName === "portfolioRebid" && iField === 1) {
      tableGrid = document.getElementById("frozenCol");
      tableGrid1 = document.getElementById("gridView");
      iFieldCount = iField;
    } else if (
      props.componentName === "portfolioRebid" &&
      (iFieldCount === 16 || iFieldCount === 17 || iFieldCount === 18)
    ) {
      tableGrid = document.getElementById("frozenCol");
      tableGrid1 = document.getElementById("gridView");
      iFieldCount = iField;
    }

    const gridChild = tableGrid.getElementsByTagName("tr");
    const grandChild = gridChild[iRow].getElementsByTagName("td");
    const gridChild1 = tableGrid1
      ? tableGrid1.getElementsByTagName("tr")
      : null;
    const grandChild1 = gridChild1
      ? gridChild1[iRow].getElementsByTagName("td")
      : null;

    if (props.componentName === "portfolioRebid") {
      if (iFieldCount === 0) {
        if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else if (
        iFieldCount === 16 ||
        iFieldCount === 17 ||
        iFieldCount === 18
      ) {
        if (re.exec(grandChild1[iFieldCount]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else if (iFieldCount === 1) {
        if (re.exec(grandChild1[0]?.innerText)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else {
        if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      }
    } else if (props.componentName === "PortfolioAcceptance") {
      if (iFieldCount === 0) {
        if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else if (iFieldCount === 16) {
        if (re.exec(grandChild1[grandChild1.length - 3]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else if (iFieldCount === 17) {
        if (re.exec(grandChild1[grandChild1.length - 2]?.innerText)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else if (iFieldCount === 18) {
        if (re.exec(grandChild1[grandChild1.length - 1]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else if (iFieldCount === 1) {
        if (re.exec(grandChild1[1]?.innerText)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      } else {
        if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
          removeClass();
          if (findInType === 2 || findInType === 1) {
            removeClass2();
          }
          onClickGrid(gridChild[iRow], null, iRow);
          onClickGrid1(gridChild1[iRow], null, iRow);
          let scrolltoRow = iRow - 3;
          if (scrolltoRow < 0) scrolltoRow = 0;

          bFound = true;
        }
      }
    } else if (props.componentName === "requestEdie") {
      if (iField === 1) {
        iFieldCount = iFieldCount + 2;
      } else {
        iFieldCount = iFieldCount + 2;
      }

      if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
        removeClass();
        if (findInType === 2 || findInType === 1) {
          removeClass2();
        }
        onClickGrid(gridChild[iRow], null, iRow);
        let scrolltoRow = iRow - 3;
        if (scrolltoRow < 0) scrolltoRow = 0;
        gridChild[iRow].scrollIntoView();
        //gridChild1[iRow].scrollIntoView();

        bFound = true;
      }
    } else if (props.componentName === "hotelPropertyList") {
      iFieldCount = iFieldCount - 1;
      if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
        removeClass();
        if (findInType === 2 || findInType === 1) {
          removeClass2();
        }
        onClickGrid(gridChild[iRow], null, iRow);
        let scrolltoRow = iRow - 3;
        if (scrolltoRow < 0) scrolltoRow = 0;
        gridChild[iRow].scrollIntoView();
        //gridChild1[iRow].scrollIntoView();

        bFound = true;
      }
    } else if (props.componentName === "portfolioCBCStatus") {
      iFieldCount = iFieldCount + 2;
      if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
        removeClass();
        if (findInType === 2 || findInType === 1) {
          removeClass2();
        }
        onClickGrid(gridChild[iRow], null, iRow);
        let scrolltoRow = iRow - 3;
        if (scrolltoRow < 0) scrolltoRow = 0;
        gridChild[iRow].scrollIntoView();

        bFound = true;
      }
    } else {
      if (re.exec(grandChild[iFieldCount]?.innerHTML)) {
        removeClass();
        if (findInType === 2 || findInType === 1) {
          removeClass2();
        }
        onClickGrid(gridChild[iRow], null, iRow);
        let scrolltoRow = iRow - 3;
        if (scrolltoRow < 0) scrolltoRow = 0;
        gridChild[iRow].scrollIntoView();
        //gridChild1[iRow].scrollIntoView();

        bFound = true;
      }
    }

    return bFound;
  };

  const CheckItem2 = (pattern, iRow, iField) => {
    const re = new RegExp(pattern, "i");
    let bFound;

    bFound = false;
    const tableGrid = document.getElementById("gridViewSelectedGrid");
    const gridChild = tableGrid.getElementsByTagName("tr");
    const grandChild = gridChild[iRow].getElementsByTagName("td");
    if (re.exec(grandChild[iField + 1]?.innerHTML)) {
      removeClass2();
      onClickGrid2(gridChild[iRow], null, iRow);
      let scrolltoRow = iRow - 3;
      if (scrolltoRow < 0) scrolltoRow = 0;
      gridChild[iRow].scrollIntoView();
      bFound = true;
    }

    return bFound;
  };

  let prevNode = null;
  let prevRowNum;
  const onClickGrid = (node, event, rownum) => {
    const strRowHighlight = styles.gridRowbarSelected;

    if (prevNode != null) {
      if (event != null && event.shiftKey) {
        checkbetween(node, prevNode, "gridView", rownum);
      }
    }
    if (
      props.componentName === "PortfolioAcceptance" ||
      props.componentName === "portfolioRebid"
    ) {
      const someElement = document.getElementById("row_" + rownum);
      someElement.className += " gridRowbarSelected";
    }
    addClass(node, strRowHighlight);
    prevNode = node;
    prevRowNum = rownum;
    appContext.setActiveGridRowIndexTableOne(rownum);
    appContext.activeRowPortfolio = rownum;
    appContext.setactiveRowPortfolio(appContext.activeRowPortfolio);
    appContext.setPrevRowPortfolio(appContext.activeRowPortfolio);
    appContext.setPrevGridRowIndexTableOne(rownum);
    appContext.setPrevGridRowIndexTableTwo(rownum);
  };
  const onClickGrid1 = (node, event, rownum) => {
    const strRowHighlight = styles.gridRowbarSelected;

    if (prevNode != null) {
      if (event != null && event.shiftKey) {
        checkbetween(node, prevNode, "gridView", rownum);
      }
    }
    if (
      props.componentName === "PortfolioAcceptance" ||
      props.componentName === "portfolioRebid"
    ) {
      const someElement = document.getElementById("ppeRow_" + rownum);
      someElement.className += " gridRowbarSelected";
    }
    addClass(node, strRowHighlight);
    prevNode = node;
    prevRowNum = rownum;
    appContext.setActiveGridRowIndexTableOne(rownum);
    appContext.activeRowPortfolio = rownum;
    appContext.setactiveRowPortfolio(appContext.activeRowPortfolio);
    appContext.setPrevRowPortfolio(appContext.activeRowPortfolio);
  };

  const onClickGrid2 = (node, event, rownum) => {
    const strRowHighlight = styles.gridRowbarSelected2;
    if (prevNode != null) {
      if (event != null && event.shiftKey) {
        checkbetween(node, prevNode, "gridViewSelectedGrid", rownum);
      }
    }
    addClass(node, strRowHighlight);
    prevNode = node;
    prevRowNum = rownum;
    appContext.setActiveGridRowIndexTableOne(rownum);
    appContext.setActiveGridRowIndexTableTwo(rownum);
    appContext.setPrevGridRowIndexTableTwo(rownum);
    appContext.setPrevGridRowIndexTableOne(rownum);
  };

  const addClass = (node, classStr) => {
    const cls = node.className;
    if ((" " + cls + " ").indexOf(" " + classStr + " ") < 0) {
      node.className = cls + (cls ? " " : "") + classStr;
    }
  };

  const removeClass = () => {
    const lights = document.getElementsByClassName(styles.gridRowbarSelected);
    while (lights.length) lights[0].classList.remove(styles.gridRowbarSelected);
  };

  const removeClass2 = () => {
    const lights = document.getElementsByClassName(styles.gridRowbarSelected2);
    while (lights.length)
      lights[0].classList.remove(styles.gridRowbarSelected2);
  };

  const checkbetween = (node, thePrevNode, thegrid, rownum) => {
    let i;
    const chkbox1 = document.getElementById(
      "orgSelect[" + prevRowNum + "]"
    ) as HTMLInputElement;
    if (chkbox1.checked) {
      const chkbox2 = document.getElementById("orgSelect[" + rownum + "]");
      const gridU = document.getElementById(thegrid);
      const eleU = gridU.getElementsByTagName("input");
      const chkboxid1 = chkbox1.id;
      const chkboxid2 = chkbox2.id;
      let bfound1 = false;
      let bfound2 = false;
      let bcheck = false;
      for (i = 0; i < eleU.length; i++) {
        if (eleU[i].type == "checkbox") {
          if (eleU[i].id == chkboxid1 || eleU[i].id == chkboxid2) {
            if (!bfound1) {
              bfound1 = true;
              bcheck = !bcheck;
            } else if (!bfound2) {
              bfound2 = true;
              bcheck = !bcheck;
            }
            if (bfound1 && bfound2) break;
          } else if (bcheck) {
            eleU[i].checked = true;
          }
        }
      }
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <table
        style={{ paddingLeft: 5, paddingRight: 5 }}
        width="100%"
        cellSpacing={0}
        cellPadding={0}
      >
        <tbody>
          <tr>
            <td valign="top">
              <form name="thisForm" id="thisForm">
                <table className={styles.menuHght100Height}>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          className={`${styles.field_Name} ${styles.zeroHeight}`}
                          style={{ height: "100%" }}
                        >
                          <tbody>
                            <tr style={{ height: 35 }}>
                              <td className={styles.nowrapCell}>Find What?</td>
                              <td className={styles.nowrapCell}>
                                <input
                                  id="txtFind"
                                  name="txtFind"
                                  style={{ width: 250 }}
                                  tabIndex={1}
                                  onChange={(event) => {
                                    props.filterContext.setRequestPayload({
                                      ...props.filterContext.requestPayload,
                                      strFilterValues: {
                                        ...props.filterContext.requestPayload
                                          .strFilterValues,
                                        filterString:
                                          event.target.value.toUpperCase(),
                                      },
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                            <tr style={{ height: 50 }}>
                              <td
                                className={styles.nowrapCell}
                                style={{ width: 62 }}
                              >
                                Search?
                              </td>
                              <td className={styles.nowrapCell}>
                                <select
                                  id="sltField"
                                  name="sltField"
                                  className={styles.FilterSelect}
                                  style={{ height: 22, width: 250 }}
                                  onChange={(event) => {
                                    props.filterContext.setRequestPayload({
                                      ...props.filterContext.requestPayload,
                                      strFilterValues: {
                                        ...props.filterContext.requestPayload
                                          .strFilterValues,
                                        filterMatchField: event.target.value
                                          ? parseInt(event.target.value)
                                          : "",
                                      },
                                    });
                                  }}
                                >
                                  {getFindFilterOptions()}
                                </select>
                              </td>
                            </tr>
                            <tr style={{ height: 50 }}>
                              <td className={styles.nowrapCell} colSpan={2}>
                                <table
                                  style={{ textAlign: "left" }}
                                  className={`${styles.field_Name} ${styles.menuWdth100Height}`}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        className={styles.nowrapCell}
                                        style={{ paddingRight: "20" }}
                                      >
                                        <input
                                          id="chkMatch"
                                          name="chkMatch"
                                          type="checkbox"
                                          defaultChecked
                                          tabIndex={-1}
                                          onChange={(event) =>
                                            setMatchType(
                                              event.target.checked ? 1 : 0
                                            )
                                          }
                                        />{" "}
                                        Match Anywhere
                                      </td>
                                      <td>
                                        <table
                                          style={{
                                            borderTop: "#EEEEEE 1px inset",
                                            borderRight: "#EEEEEE  1px inset",
                                            borderLeft: "#EEEEEE  1px inset",
                                            borderBottom: "#EEEEEE   1px inset",
                                          }}
                                          className={styles.filtertitle}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                className={
                                                  styles.nowrapCellgpppogos
                                                }
                                                colSpan={3}
                                              >
                                                Direction
                                              </td>
                                              <td>
                                                <input
                                                  type="radio"
                                                  id="rdoDir"
                                                  name="rdoDir"
                                                  defaultChecked
                                                  defaultValue={1}
                                                  value={1}
                                                  tabIndex={-1}
                                                  onChange={() =>
                                                    setDirectionType(1)
                                                  }
                                                />
                                                First
                                              </td>
                                              <td
                                                className={
                                                  styles.nowrapCellgpppogos
                                                }
                                              >
                                                <input
                                                  type="radio"
                                                  id="rdoDir"
                                                  name="rdoDir"
                                                  defaultValue={2}
                                                  tabIndex={-1}
                                                  value={2}
                                                  onChange={() =>
                                                    setDirectionType(2)
                                                  }
                                                />
                                                Up
                                              </td>
                                              <td
                                                className={
                                                  styles.nowrapCellgpppogos
                                                }
                                              >
                                                <input
                                                  type="radio"
                                                  id="rdoDir"
                                                  name="rdoDir"
                                                  defaultValue={3}
                                                  tabIndex={-1}
                                                  value={3}
                                                  onChange={() =>
                                                    setDirectionType(3)
                                                  }
                                                />
                                                Down
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    {props.isDisplayTwoGridFilter && (
                                      <tr>
                                        <td
                                          colSpan={2}
                                          className={`${styles.field_Name} ${styles.nowrapCell}`}
                                        >
                                          <table
                                            style={{
                                              borderTop: "#EEEEEE 1px inset",
                                              borderRight: "#EEEEEE  1px inset",
                                              borderLeft: "#EEEEEE  1px inset",
                                              borderBottom:
                                                "#EEEEEE   1px inset",
                                            }}
                                            className="filtertitle"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  className="nowrapCell"
                                                  colSpan={3}
                                                >
                                                  Find In:
                                                </td>
                                                <td>
                                                  <input
                                                    type="radio"
                                                    id="rdoList"
                                                    name="rdoList"
                                                    value={1}
                                                    defaultChecked
                                                    onChange={(event) =>
                                                      setFindInType(
                                                        parseInt(
                                                          event.target.value
                                                        )
                                                      )
                                                    }
                                                  />
                                                  Hotels Matching Criteria
                                                </td>
                                                <td className="nowrapCell">
                                                  <input
                                                    type="radio"
                                                    id="rdoList"
                                                    name="rdoList"
                                                    value={2}
                                                    onChange={(event) =>
                                                      setFindInType(
                                                        parseInt(
                                                          event.target.value
                                                        )
                                                      )
                                                    }
                                                  />
                                                  Selected Hotels
                                                </td>
                                                <td className="nowrapCell">
                                                  <input
                                                    type="radio"
                                                    id="rdoList"
                                                    name="rdoList"
                                                    value={3}
                                                    onChange={(event) =>
                                                      setFindInType(
                                                        parseInt(
                                                          event.target.value
                                                        )
                                                      )
                                                    }
                                                  />
                                                  Both
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td className={styles.nowrapCell}>
                                <input
                                  id="button1"
                                  name="button1"
                                  type="button"
                                  defaultValue=" "
                                  className={styles.btnSubmit}
                                  style={{
                                    backgroundImage: "url(" + btnFindNext + ")",
                                    width: 63,
                                    height: 20,
                                  }}
                                  tabIndex={3}
                                  onClick={FindItem}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className={styles.nowrapCell}>
                                <input
                                  id="button2"
                                  name="button2"
                                  type="button"
                                  defaultValue=" "
                                  className={styles.btnSubmit}
                                  style={{
                                    backgroundImage: "url(" + btnFilter + ")",
                                    width: 63,
                                    height: 20,
                                  }}
                                  tabIndex={4}
                                  onClick={() => {
                                    if (
                                      showOptions?.showAccountFilter &&
                                      props.isAccountRequired &&
                                      props.filterContext.requestPayload
                                        .strFilterValues.accountFilter
                                        .accountrecid === ""
                                    ) {
                                      alert("Please select an account.");
                                    } else {
                                      props.isDisplayTwoGridFilter
                                        ? props.filterForTwoTables(
                                            props.filterContext.requestPayload,
                                            findInType
                                          )
                                        : props.getPanelData(
                                            props.filterContext.requestPayload
                                          );
                                    }
                                  }}
                                />{" "}
                              </td>
                            </tr>
                            <tr>
                              <td className={styles.nowrapCell}>
                                <input
                                  id="button3"
                                  name="button3"
                                  type="button"
                                  defaultValue=" "
                                  className={styles.btnSubmit}
                                  style={{
                                    backgroundImage: "url(" + btnCancel + ")",

                                    width: 63,
                                    height: 20,
                                  }}
                                  tabIndex={5}
                                  onClick={() => props.handleSortFilter(false)}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
