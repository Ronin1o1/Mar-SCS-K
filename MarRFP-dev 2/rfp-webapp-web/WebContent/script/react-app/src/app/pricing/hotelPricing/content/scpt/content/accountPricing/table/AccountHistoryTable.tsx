import React from "react";
import { AutoSizer, MultiGrid } from "react-virtualized";
import styles from "../table/AccountPricingTable.module.css";
import MRadioButtonList from "../../../components/shared/MRadioButtonList";
import icon from "../../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../../../data/Settings";
import AccountPricingContext from "../../../context/AccountPricingContext";
import Utils from "../../../utils/Utils";
import { Link } from "react-router-dom";

interface IProps {
  tableData: any;
  navigateToAccountDetails: any;
  dowViewAs: string;
  onChange: any;
}

interface IState {}

const FIXED_ROW_COUNT = 2;

const FIXED_COL_COUNT = 1;

const EXTRA_COL_WIDTH = 25;

const STYLE_TOP_LEFT_GRID = {
  borderBottom: "1px solid #CCCCCC",
  borderRight: "1px solid #CCCCCC"
};

const STYLE_TOP_RIGHT_GRID = {
  borderBottom: "1px solid #CCCCCC"
};

const STYLE_BOTTOM_LEFT_GRID = {
  borderBottom: "1px solid #CCCCCC"
};

const STYLE_BOTTOM_RIGHT_GRID = {
  borderBottom: "1px solid #CCCCCC"
};

export default class AccountHistoryTable extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountPricingContext;
  _topGrid;
  _gridCount = 0;
  _maxDataLength = 0;

  constructor(props, context) {
    super(props, context);
    this._cellRenderer = this._cellRenderer.bind(this);
    this._noContentRenderer = this._noContentRenderer.bind(this);
    this._getStatusIcon = this._getStatusIcon.bind(this);
    this._getColumnWidth = this._getColumnWidth.bind(this);
    this._setTopGridRef = this._setTopGridRef.bind(this);
    this._scrollSync = this._scrollSync.bind(this);

    this.props.tableData.accountsData.map(data => {
      this.props.tableData.dataCols.map((col, index) => {
        if (
          index > 0 &&
          data[col] &&
          data[col].toString().length > this._maxDataLength
        ) {
          this._maxDataLength = data[col].toString().length;
        }
      });
    });
  }

  componentDidUpdate(prevProps) {
    // The javascript code is a hack for sroll sync to work for both multigrids in IE
    if (document.getElementsByClassName("gridBody")[0]) {
      document
        .getElementsByClassName("gridBody")[0]
        .removeEventListener("scroll", this._scrollSync);
      document
        .getElementsByClassName("gridBody")[0]
        .addEventListener("scroll", this._scrollSync);
    }

    if (this.props.tableData !== prevProps.tableData) {
      if (this._topGrid) this._topGrid.forceUpdateGrids();
    }
  }

  render() {
    this._gridCount = 0;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <div>
            <div>
              <MultiGrid
                ref={this._setTopGridRef}
                cellRenderer={this._cellRenderer}
                noContentRenderer={this._noContentRenderer}
                columnWidth={({ index }) =>
                  this._getColumnWidth({ index }, width)
                }
                columnCount={this.props.tableData.columnHeaders.length}
                overscanColumnCount={10}
                overscanRowCount={40}
                overscanIndicesGetter={({ cellCount }) => {
                  return {
                    overscanStartIndex: 0,
                    overscanStopIndex: cellCount - 1
                  };
                }}
                fixedColumnCount={FIXED_COL_COUNT}
                fixedRowCount={FIXED_ROW_COUNT}
                height={height}
                rowHeight={this._getRowHeight}
                rowCount={
                  this.props.tableData.accountsData.length + FIXED_ROW_COUNT
                }
                width={width}
                styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                styleBottomRightGrid={STYLE_BOTTOM_RIGHT_GRID}
                classNameTopRightGrid={"gridHeader"}
                classNameBottomRightGrid={"gridBody"}
                classNameBottomLeftGrid={"gridFixedCol"}
              />
            </div>
          </div>
        )}
      </AutoSizer>
    );
  }

  _noContentRenderer() {
    if (this._gridCount === 0) {
      this._gridCount++;
      return (
        <div className={styles.noDataFound}>
          {Settings.text.label.accountPricing.accountPricingTable.noDataFound}
        </div>
      );
    } else {
      return Settings.text.constant.stringEmpty;
    }
  }

  _cellRenderer({ columnIndex, key, rowIndex, style }) {
    if (columnIndex == 1 || columnIndex == 9 || columnIndex == 12) {
      const zIndex = rowIndex == 0 ? 10 : 5;
      style = { ...style, zIndex: zIndex, borderRight: "1px solid #CCCCCC" };
    }

    // First header row
    if (rowIndex == 0) {
      if (columnIndex == 0) {
        const tempStyle = { ...style };
        style = {
          ...style,
          height: tempStyle.height * FIXED_ROW_COUNT
        };
        return (
          <div className={styles.headerCell} key={key} style={style}>
            {this.props.tableData.columnHeaders[columnIndex]}
          </div>
        );
      }
      if (columnIndex == 2) {
        const tempStyle = { ...style };
        style = {
          ...style,
          zIndex: 9,
          borderRight: "1px solid #CCCCCC",
          width: tempStyle.width * 8
        };
        return (
          <div className={styles.headerCell} key={key} style={style}>
            <div className={styles.subHeaderRow}>
              <div className={styles.subHeader}>
                {this.props.tableData.columnHeaders[columnIndex]}
              </div>
            </div>
            <div className={styles.subHeaderRow}>
              <div className={styles.radioButtonLabel}>
                {Settings.text.label.historyViewAs.viewAsLabel}
              </div>
              <div className={styles.radioButtonStyle}>
                <MRadioButtonList
                  id={Settings.text.compid.historyViewAs}
                  radioButtonName={Settings.text.compid.historyViewAs}
                  horizontal={true}
                  buttons={Settings.text.label.historyViewAs.viewAsOptions}
                  onChange={this.props.onChange}
                  checkSelected={
                    this.props.dowViewAs === Settings.text.constant.stringY
                      ? Settings.text.label.historyViewAs.viewAsOptions[0]
                      : Settings.text.label.historyViewAs.viewAsOptions[1]
                  }
                />
              </div>
            </div>
          </div>
        );
      }
      if (columnIndex == 10 || columnIndex == 13) {
        const tempStyle = { ...style };
        style = {
          ...style,
          zIndex: 8,
          borderRight: "1px solid #CCCCCC",
          width: tempStyle.width * 3 + EXTRA_COL_WIDTH
        };
        return (
          <div className={styles.headerCell} key={key} style={style}>
            {this.props.tableData.columnHeaders[columnIndex]}
          </div>
        );
      }
      if (columnIndex > 3 && columnIndex < 10) {
        style = { ...style, display: "none" };
        return Settings.text.constant.stringEmpty;
      }
      return (
        <div className={styles.headerCell} key={key} style={style}>
          {this.props.tableData.columnHeaders[columnIndex]}
        </div>
      );
    } else if (rowIndex == 1) {
      if (columnIndex == 0) {
        style = { ...style, display: "none" };
        return Settings.text.constant.stringEmpty;
      }
      if (columnIndex == 12 || columnIndex == 15) {
        style = { ...style, color: "#ac223b" };
      }
      return (
        <div className={styles.headerCell} key={key} style={style}>
          {this.props.tableData.columnSubHeaders[columnIndex]}
        </div>
      );
    } else {
      if (rowIndex % 2 === 1) {
        style = { ...style, backgroundColor: "#FFFFFF" };
      } else {
        style = { ...style, backgroundColor: "#F5F5F5" };
      }

      if (columnIndex == 0) {
        return (
          <div
            key={
              this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                .scpt_accountid +
              Settings.text.compid.accountPricing.accountPricingTable
                .accountName
            }
            style={style}
          >
            <div className={styles.firstColumnCells}>
              <div className={styles.statusIconDivHistory}>
                {this._getStatusIcon(
                  rowIndex,
                  this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                    .accountstatus
                )}
              </div>
              {this._getAccountNameFormat(rowIndex, columnIndex)}
            </div>
          </div>
        );
      } else if (columnIndex == 1 || columnIndex == 2) {
        let colorStyle;
        switch (
          this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
            this.props.tableData.dataCols[columnIndex]
          ]
        ) {
          case 1:
            colorStyle = styles.bkColorGreen;
            break;
          case 2:
            colorStyle = styles.bkColorYellow;
            break;
          case 3:
            colorStyle = styles.bkColorMagenta;
            break;
          case 4:
            colorStyle = styles.bkColorOrange;
            break;
          default:
            colorStyle = null;
        }
        return (
          <div
            className={[styles.dataCell, colorStyle].join(
              Settings.text.constant.stringSpace
            )}
            key={key}
            style={style}
          >
            {
              this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
                this.props.tableData.dataCols[columnIndex]
              ]
            }
          </div>
        );
      } else {
        let colVal = this.props.tableData.accountsData[
          rowIndex - FIXED_ROW_COUNT
        ][this.props.tableData.dataCols[columnIndex]];
        if (this.props.tableData.percentCols.includes(columnIndex)) {
          colVal = Utils.formatPercentValue(colVal);
        }
        return (
          <div className={styles.dataCell} key={key} style={style}>
            {colVal}
          </div>
        );
      }
    }
  }

  _getAccountNameFormat(rowIndex, columnIndex) {
    let accountName: string = String(
      this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
        this.props.tableData.dataCols[columnIndex]
      ]
    );

    return (
      <Link
        to="#"
        className={styles.accountName}
        title={accountName}
        onClick={event => {
          this.context.onAccountClick(
            rowIndex - FIXED_ROW_COUNT,
            this.props.navigateToAccountDetails
          );
        }}
      >
        {Utils.textTruncate(accountName)}
      </Link>
    );
  }

  _getColumnWidth({ index }, width) {
    const colCount = this.props.tableData.columnHeaders.length;
    let firstColWidth = 233;
    let minWidth = 85;
    let ytdColsMinWidth = this._maxDataLength > 12 ? 125 : 100;
    const colWidth =
      (width -
        233 -
        4 * ytdColsMinWidth -
        2 * (ytdColsMinWidth + EXTRA_COL_WIDTH)) /
      (colCount - 7);

    if (index == 0) {
      return firstColWidth;
    } else if (index == 10 || index == 11 || index == 13 || index == 14) {
      return colWidth >= ytdColsMinWidth ? colWidth : ytdColsMinWidth;
    } else if (index == 12 || index == 15) {
      return colWidth >= ytdColsMinWidth + EXTRA_COL_WIDTH
        ? colWidth
        : ytdColsMinWidth + EXTRA_COL_WIDTH;
    } else {
      return colWidth >= minWidth ? colWidth : minWidth;
    }
  }

  _getRowHeight({ index }) {
    if (index <= 1) {
      return 50;
    } else {
      return 35;
    }
  }

  _getStatusIcon(rowIndex, bt_status) {
    switch (bt_status) {
      case Settings.text.constant.statusA:
        return (
          <svg className={styles.acceptedIconSVG}>
            <use
              x="-110px"
              y="-60px"
              href={icon + "#accepted-icon"}
              xlinkHref={icon + "#accepted-icon"}
            />
          </svg>
        );
      case Settings.text.constant.statusS:
        return (
          <svg className={styles.requestedIconSVG}>
            <use
              x="-90px"
              y="-60px"
              href={icon + "#requested-icon"}
              xlinkHref={icon + "#requested-icon"}
            />
          </svg>
        );
      case Settings.text.constant.statusL:
        return (
          <svg className={styles.pendingIconSVG}>
            <use
              x="-150px"
              y="-60px"
              href={icon + "#pending-icon"}
              xlinkHref={icon + "#pending-icon"}
            />
          </svg>
        );
      case Settings.text.constant.statusR:
        return (
          <svg className={styles.declinedIconSVG}>
            <use
              x="-130px"
              y="-60px"
              href={icon + "#declined-icon"}
              xlinkHref={icon + "#declined-icon"}
            />
          </svg>
        );
      default:
        return <svg className={styles.declinedIconSVG}></svg>;
    }
  }

  _setTopGridRef(ref) {
    if (ref) {
      this._topGrid = ref;
    }
  }

  // The function is a hack using javascript for sroll sync to work for both multigrids in IE
  _scrollSync() {
    var gridBody = document.getElementsByClassName("gridBody")[0];
    var gridHeader = document.getElementsByClassName("gridHeader")[0];
    var gridFixedCol = document.getElementsByClassName("gridFixedCol")[0];

    gridHeader.scrollLeft = gridBody.scrollLeft;
    gridFixedCol.scrollTop = gridBody.scrollTop;
  }
}
