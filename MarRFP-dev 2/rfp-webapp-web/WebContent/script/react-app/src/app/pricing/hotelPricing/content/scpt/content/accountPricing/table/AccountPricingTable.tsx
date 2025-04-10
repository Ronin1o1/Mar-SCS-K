import React from "react";
import { AutoSizer, MultiGrid } from "react-virtualized";
import styles from "../table/AccountPricingTable.module.css";
import MCheckBox from "../../../components/shared/MCheckbox";
import MSelect from "../../../components/shared/MSelect";
import icon from "../../../assets/svg/MarRFP-sprite-button-v1.2.svg";
import Settings from "../../../data/Settings";
import AccountPricingContext from "../../../context/AccountPricingContext";
import Utils from "../../../utils/Utils";
import { Link } from "react-router-dom";
//import API from "../../../../../service/API";

interface IProps {
  tableData: any;
  hotelid: string;
  navigateToAccountDetails: any;
}

interface IState {}

const FIXED_ROW_COUNT = 1;

const FIXED_COL_COUNT = 1;

const STYLE_TOP_LEFT_GRID = {
  borderBottom: "1px solid #CCCCCC",
  borderRight: "1px solid #CCCCCC",
};

const STYLE_TOP_RIGHT_GRID = {
  borderBottom: "1px solid #CCCCCC",
  fontSize: "13px",
};

const STYLE_TOTAL_LEFT_GRID = {
  borderBottom: "1px solid #CCCCCC",
  borderTop: "1px solid #CCCCCC",
  borderRight: "1px solid #CCCCCC",
};

const STYLE_TOTAL_RIGHT_GRID = {
  borderBottom: "1px solid #CCCCCC",
  borderTop: "1px solid #CCCCCC",
};

export default class AccountPricingTable extends React.Component<
  IProps,
  IState
> {
  static contextType = AccountPricingContext;
  _topGrid;
  _bottomGrid;
  _gridCount = 0;
  _maxDataLength = 0;

  constructor(props, context) {
    super(props, context);
    this._cellRenderer = this._cellRenderer.bind(this);
    this._noContentRenderer = this._noContentRenderer.bind(this);
    this._getStatusIcon = this._getStatusIcon.bind(this);
    this._cellRendererTotal = this._cellRendererTotal.bind(this);
    this._getColumnWidth = this._getColumnWidth.bind(this);
    this._setTopGridRef = this._setTopGridRef.bind(this);
    this._setBottomGridRef = this._setBottomGridRef.bind(this);
    this._scrollSync = this._scrollSync.bind(this);

    this.props.tableData.accountsData.map((data) => {
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
    this.props.tableData.dataCols.map((col, index) => {
      if (
        index > 0 &&
        this.props.tableData.totalData[col] &&
        this.props.tableData.totalData[col].toString().length >
          this._maxDataLength
      ) {
        this._maxDataLength =
          this.props.tableData.totalData[col].toString().length;
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // The javascript code is a hack for sroll sync to work for both multigrids in IE
    document
      .getElementsByClassName("bottomGridBody")[0]
      .removeEventListener("scroll", this._scrollSync);
    document
      .getElementsByClassName("topGridBody")[0]
      .removeEventListener("scroll", this._scrollSync);
    document
      .getElementsByClassName("bottomGridBody")[0]
      .addEventListener("scroll", this._scrollSync);
    document
      .getElementsByClassName("topGridBody")[0]
      .addEventListener("scroll", this._scrollSync);

    if (this.props.tableData !== prevProps.tableData) {
      if (this._topGrid) this._topGrid.forceUpdateGrids();
      if (this._bottomGrid) this._bottomGrid.forceUpdateGrids();
    }
    this._gridCount = 0;
  }

  render() {
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
                fixedColumnCount={FIXED_COL_COUNT}
                fixedRowCount={FIXED_ROW_COUNT}
                height={height - 67}
                rowHeight={this._getRowHeight}
                rowCount={
                  this.props.tableData.accountsData.length + FIXED_ROW_COUNT
                }
                width={width}
                styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                styleBottomRightGrid={{ overflowX: "hidden" }}
                classNameTopRightGrid={"topGridHeader"}
                classNameBottomLeftGrid={"topGridFixedCol"}
                classNameBottomRightGrid={[
                  "topGridBody",
                  styles.gridBottomRight,
                ].join(" ")}
              />
            </div>
            <div>
              <MultiGrid
                ref={this._setBottomGridRef}
                cellRenderer={this._cellRendererTotal}
                columnWidth={({ index }) =>
                  this._getColumnWidth({ index }, width)
                }
                columnCount={this.props.tableData.columnHeaders.length}
                overscanColumnCount={10}
                fixedColumnCount={FIXED_COL_COUNT}
                fixedRowCount={FIXED_ROW_COUNT}
                height={67}
                rowHeight={50}
                rowCount={2}
                width={width}
                styleTopLeftGrid={STYLE_TOTAL_LEFT_GRID}
                styleTopRightGrid={STYLE_TOTAL_RIGHT_GRID}
                classNameTopRightGrid={"bottomGridHeader"}
                classNameBottomRightGrid={"bottomGridBody"}
                scrollToColumn={
                  this.props.tableData.scrollToLastColumn
                    ? this.props.tableData.columnHeaders.length - 1
                    : 1
                }
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
    if (
      columnIndex == 2 ||
      columnIndex == this.props.tableData.columnHeaders.length - 2
    ) {
      style = { ...style, zIndex: 2, borderRight: "1px solid #CCCCCC" };
    }

    if (rowIndex == 0) {
      return (
        <div className={styles.headerCell} key={key} style={style}>
          {this.props.tableData.columnHeaders[columnIndex]}
        </div>
      );
    } else {
      if (rowIndex % 2 === 0) {
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
              <MCheckBox
                id={
                  this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                    .scpt_accountid +
                  Settings.text.compid.accountPricing.accountPricingTable
                    .accountName
                }
                label={Settings.text.constant.stringEmpty}
                isChecked={Utils.handleNullBoolean(
                  this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                    .selected
                )}
                onClick={this.context.onClick}
              />
              <div className={styles.statusIconDiv}>
                {this._getStatusIcon(
                  rowIndex,
                  this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                    .bt_status
                )}
              </div>
              {this._getAccountNameFormat(rowIndex, columnIndex)}
            </div>
          </div>
        );
      } else if (columnIndex == 1) {
        return (
          <div
            className={styles.dataCell}
            key={
              this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                .scpt_accountid +
              Settings.text.compid.accountPricing.accountPricingTable
                .accountDoNotPrice
            }
            style={style}
          >
            <MCheckBox
              id={
                this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                  .scpt_accountid +
                Settings.text.compid.accountPricing.accountPricingTable
                  .accountDoNotPrice
              }
              label={null}
              isChecked={
                this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
                  this.props.tableData.dataCols[columnIndex]
                ] === Settings.text.constant.stringY
              }
              onClick={this.context.onClick}
            />
          </div>
        );
      } else if (columnIndex == 2) {
        return (
          <div
            className={styles.dataCell}
            key={
              this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                .scpt_accountid
            }
            style={style}
          >
            {this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
              this.props.tableData.dataCols[columnIndex]
            ] === Settings.text.constant.lra ||
            Utils.isNullOrEmpty(
              this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
                this.props.tableData.dataCols[columnIndex]
              ]
            )
              ? Settings.text.constant.stringY
              : Settings.text.constant.stringN}
          </div>
        );
      } else if (columnIndex == this.props.tableData.columnHeaders.length - 1) {
        const bt_status =
          this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
            .bt_status;
        const scpt_status =
          this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
            this.props.tableData.dataCols[columnIndex]
          ];
        return (
          <div
            className={styles.dataCell}
            key={
              this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                .scpt_accountid +
              Settings.text.compid.accountPricing.accountPricingTable
                .accountStatus
            }
            style={style}
          >
            <MSelect
              id={
                this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT]
                  .scpt_accountid +
                Settings.text.compid.accountPricing.accountPricingTable
                  .accountStatus
              }
              className={styles.statusSelect}
              label={
                Settings.text.label.accountPricing.accountPricingTable
                  .statusList
              }
              onChange={this.context.onChange}
              value={
                bt_status
                  ? Settings.text.label.btStatusMap[bt_status]
                  : Utils.handleNull(scpt_status)
              }
              disabled={bt_status}
            />
          </div>
        );
      } else {
        let colVal =
          this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
            this.props.tableData.dataCols[columnIndex]
          ];
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
    const accountName = String(
      this.props.tableData.accountsData[rowIndex - FIXED_ROW_COUNT][
        this.props.tableData.dataCols[columnIndex]
      ]
    );

    return (
      <Link
        to="#"
        className={styles.accountName}
        title={accountName}
        onClick={(event) => {
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

  _cellRendererTotal({ columnIndex, key, rowIndex, style }) {
    if (
      columnIndex == 2 ||
      columnIndex == this.props.tableData.columnHeaders.length - 2
    ) {
      style = { ...style, zIndex: 2, borderRight: "1px solid #CCCCCC" };
    }

    if (rowIndex == 0) {
      return (
        <div className={styles.totalCell} key={key} style={style}>
          {(() => {
            if (columnIndex == 0) {
              return (
                <div className={styles.totalDiv}>
                  {
                    Settings.text.label.accountPricing.accountPricingTable
                      .footerLabel
                  }
                  <div
                    className={styles.newWindowIconDiv}
                    onClick={() => {
                      onSpecialCorporate();
                    }}
                    // onClick={() => {

                    //   window.open(
                    //     Utils.getAccountsTotalReportEndpoint(this.props.hotelid)
                    //   );
                    // }}
                  >
                    <svg className={styles.newWindowIconSVG}>
                      <use
                        x="-70px"
                        y="-60px"
                        href={icon + "#new-window-normal"}
                        xlinkHref={icon + "#new-window-normal"}
                      />
                    </svg>
                  </div>
                </div>
              );
            } else if (
              columnIndex > 2 &&
              columnIndex < this.props.tableData.columnHeaders.length - 1
            ) {
              let colVal =
                this.props.tableData.totalData[
                  this.props.tableData.dataCols[columnIndex]
                ];
              if (this.props.tableData.percentCols.includes(columnIndex)) {
                colVal = Utils.formatPercentValue(colVal);
              }
              return <div className={styles.totalDiv}>{colVal}</div>;
            } else {
              return <div></div>;
            }
          })()}
        </div>
      );
    } else {
      return Settings.text.constant.stringEmpty;
    }
  }

  _getColumnWidth({ index }, width) {
    const colCount = this.props.tableData.columnHeaders.length;
    const firstColWidth = 233;
    const lastColExtraWidth = 50;
    const minwidth = this._maxDataLength > 12 ? 125 : 100;
    const colWidth = (width - 233 - 50) / (colCount - 1);

    if (index == 0) {
      return firstColWidth;
    } else if (index == this.props.tableData.columnHeaders.length - 1) {
      return (colWidth >= minwidth ? colWidth : minwidth) + lastColExtraWidth;
    } else {
      return colWidth >= minwidth ? colWidth : minwidth;
    }
  }

  _getRowHeight({ index }) {
    if (index == 0) {
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

  _setBottomGridRef(ref) {
    if (ref) {
      this._bottomGrid = ref;
    }
  }

  // The function is a hack using javascript for sroll sync to work for both multigrids in IE
  _scrollSync() {
    const bottomGridBody = document.getElementsByClassName("bottomGridBody")[0];
    const bottomGridHeader =
      document.getElementsByClassName("bottomGridHeader")[0];
    const topGridBody = document.getElementsByClassName("topGridBody")[0];
    const topGridFixedCol =
      document.getElementsByClassName("topGridFixedCol")[0];
    const topGridHeader = document.getElementsByClassName("topGridHeader")[0];

    bottomGridHeader.scrollLeft =
      topGridBody.scrollLeft =
      topGridHeader.scrollLeft =
        bottomGridBody.scrollLeft;

    topGridFixedCol.scrollTop = topGridBody.scrollTop;
  }
}
function onSpecialCorporate() {
  const queryParams = new URLSearchParams(window.location.search);

  const period = queryParams.get("Period");
  const hotelid = queryParams.get("HotelId");

  const parms = {
    hotelid: hotelid,
    period: period,
  };
  let path;
  const locUrl = location.href;
  const isLocal = locUrl
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);
  if (!isLocal.length) {
    path =
      "/" +
      window.location.pathname.split("/")[1] +
      "/" +
      window.location.pathname.split("/")[2];
  } else {
    path = "";
  }
  const url =
    window.location.origin +
    path +
    "/hotelReports?&ReportName=" +
    "Special Corporate Pricing Tool Summary Report." +
    "&Period=" +
    period +
    "&HotelId=" +
    hotelid;

  window.open(url, "_blank");
}
