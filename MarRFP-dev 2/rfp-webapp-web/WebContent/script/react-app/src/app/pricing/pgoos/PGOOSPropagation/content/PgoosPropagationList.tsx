import React, { Component } from "react";
import PgoosPropagationContext, {
  PgoosPropagationContextProvider,
} from "../context/PGOOSPropagationContext";
import Settings from "../static/Settings";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import CCheckbox from "../../../../common/components/CCheckbox";
import rejected from "./../../../../common/assets/img/rejected.gif";
import accepted from "./../../../../common/assets/img/accepted.gif";
import locked from "./../../../../common/assets/img/locked.gif";
import requested from "./../../../../common/assets/img/requested.gif";
import "./PgoosPropagationList.css";

interface IProps {
  availData?: any;
  selectData?: any;
  AvailgridRows?: any;
  SelectedgridRows?: any;
  onChangeFeildValue?: any;
  quickSelectTopSaved?: any;
  quickSelectBottomSaved?: any;
  showQuickSelectTop?: any;
  showQuickSelectBottom?: any;
  quickSelectGrid1BtnClicked?: any;
  quickSelectGrid2BtnClicked?: any;
  selectBtnClicked?: any;
  selectAllBtnClicked?: any;
  unSelectBtnClicked?: any;
  unSelectAllBtnClicked?: any;
  panelData?: any;
  saveHandler?: any;
  cancelHandler?: any;
  FindFilterData?: any;
  handleOrderChange?: any;
  handleOrderChangeSelect?: any;
  deselectBtnClicked: any;
  initialLoadAvail: any;
  initialLoadSelect: any;
  isMakingRequest: any;
  isMakingRequestList: any;
}

interface IState {}

export default class PgoosPropagationList extends Component<IProps, IState> {
  // Object for double grid  component view
  viewObject = {
    view: Settings.viewObject.viewVertical, // For horizontal view Settings.viewObject.viewHorizontal
    viewSelectCheckboxButton: true,
    viewUnselectCheckboxButton: true,
    viewUnselectAllCheckboxButton: true,
    viewSelectAllCheckboxButton: true,
    enableQuickSelectGrid1: true,
    enableQuickSelectGrid2: false,
    headingGrid1: Settings.hotelsAvailCriteria,
    // additionTextSecontTitle: Settings.hotelsSelectedCriteria,
    deselectAll: true,
    gridType: "double",
  };
  availGrid = {};
  selectedGrid = {};
  availCheckFlag = false;
  selectCheckFlag = false;
  refreshValGridList = "";
  refreshValGridSelected = "";

  availGridCheckbox = (rowData) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <input
            type={Settings.inputType.checkbox}
            id={Settings.checkAvail + rowData.hotelid}
            name={Settings.checkAvail + rowData.hotelid}
            className="availGridPropagation"
            onChange={(e) =>
              this.props.onChangeFeildValue(
                rowData,
                Settings.inputType.checkbox,
                Settings.availableValue,
                this.props.availData,
                this.props.AvailgridRows,
                e
              )
            }
            checked={
              this.props.AvailgridRows.length != 0
                ? FilteredGridSelectUtils.getCheckboxStatus(
                    this.props.AvailgridRows,
                    rowData,
                    Settings.tableColumns.hotelid.field
                  )
                : rowData.hotelid_checkbox
            }
          />
        ) : (
          ""
        )}
      </>
    );
  };

  selectGridCheckbox = (rowData) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <input
            type={Settings.inputType.checkbox}
            id={Settings.solicitSelect + rowData.hotelid + Settings.move}
            name={Settings.checkAvail + rowData.hotelid + +Settings.move}
            className="selectGridPropagation"
            onChange={(e) =>
              this.props.onChangeFeildValue(
                rowData,
                Settings.inputType.checkbox,
                Settings.selectedValue,
                this.props.selectData,
                this.props.SelectedgridRows,
                e
              )
            }
            checked={FilteredGridSelectUtils.getCheckboxStatus(
              this.props.SelectedgridRows,
              rowData,
              Settings.tableColumns.hotelid.field
            )}
          />
        ) : (
          ""
        )}
      </>
    );
  };

  getPgoosPropagationAvailList = (data) => {
    const arr = [];
    if (data?.pgoosList?.length > 0) {
      data?.pgoosList?.map((element) => {
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.availGridCheckbox(element),
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          preopening:
            element[Settings.tableColumns.preOpening.field] === "True"
              ? "Y"
              : "N",
        };
        arr.push(obj);
      });
    }

    return arr;
  };
  // Array of columns for top grid
  availgridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,
      style: { width: "30px", minWidth: "30px", display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "30px", minWidth: "30px", textAlign: "center" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "63px", minWidth: "63px" },
      optionnumber: 0,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: { width: "258px", minWidth: "258px", wordWrap: "break-word" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "116px", minWidth: "116px", wordWrap: "break-word" },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "52px", minWidth: "52px" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "66px", minWidth: "66px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.preOpening.field,
      header: Settings.tableColumns.preOpening.header,
      style: { width: "98px", minWidth: "98px" },
      optionnumber: 5,
    },
  ];

  statusSelectedTemplate = (rowData) => {
    let img = "";

    if (rowData.status != null && rowData.status != "") {
      if (rowData.status == "A") img = accepted;
      else if (rowData.status == "R") img = rejected;
      else if (rowData.status == "L") img = locked;
      else if (rowData.status == "S") img = requested;
    }

    return <img src={img}></img>;
  };

  gethotelSolicitSelectedList = (data) => {
    const arr = [];
    if (data) {
      data?.map((element) => {
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.selectGridCheckbox(element),
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          accountname: element[Settings.tableColumns.accountname.field],
          report: element[Settings.tableColumns.report.field],
        };

        arr.push(obj);
      });
    }
    return arr;
  };
  // Array of columns for Bottom grid
  selectedgridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,
      style: { display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: {
        width: "30px",
        minWidth: "30px",
        paddingLeft: "0",
        textAlign: "center",
      },
    },
    {
      field: Settings.tableColumns.marshacode.field,

      header: Settings.tableColumns.marshacode.header,
      style: { width: "58px", minWidth: "58px" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      optionnumber: 2,
      style: { width: "243px", wordWrap: "break-word", minWidth: "243px" },
    },
    {
      field: Settings.tableColumns.accountname.field,
      header: Settings.tableColumns.accountname.header,
      optionnumber: 3,
      style: { width: "218px", wordWrap: "break-word", minWidth: "218px" },
    },

    {
      field: Settings.tableColumns.report.field,
      header: Settings.tableColumns.report.header,
      optionnumber: 4,
      style: {
        width: "212px",
        minWidth: "212px",
        wordWrap: "break-word",
        textAlign: "left",
      },
      id: "reportProgram",
    },
  ];

  // Object for grid's data and view
  getGridDetails = () => {
    this.availGrid = {
      availgridColumns: this.availgridColumns,
      availgridRows: this.getPgoosPropagationAvailList(
        this.props.availData.PgoosPropagationAvailList
      ),
      id: Settings.gridView,
      tbodyId: "gridView",
      width: Settings.width730,
      height: Settings.width220,
      scroll: Settings.width180,
      directSelect: this.props.availData.notfound,
      borderTable: "2px inset rgb(238, 238, 238)",
      containerWidth: "100%",
      initialLoad: this.props.initialLoadAvail,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.rows,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
    this.selectedGrid = {
      selectedgridColumns: this.selectedgridColumns,
      selectedgridRows: this.gethotelSolicitSelectedList(
        this.props.selectData.hotelSolicitSelectedlList
      ),
      header: false,
      id: Settings.selectedGridView,
      tbodyId: "gridView",
      width: "560px",
      isWidthAuto: true,
      height: Settings.heightSelected,
      scroll: Settings.width180,
      borderTable: "2px inset rgb(238, 238, 238)",
      containerWidth: "100%",
      initialLoad: this.props.initialLoadSelect,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.rows,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
  };

  // Functions for passing data to context
  deselectBtnClicked = () => {
    this.props.deselectBtnClicked(
      this.props.availData,
      this.props.AvailgridRows
    );
  };

  quickSelectTopSaved = (param) => {
    this.props.quickSelectTopSaved(
      param,
      this.props.AvailgridRows,
      this.props.availData
    );
  };

  quickSelectBottomSaved = (param) => {
    this.props.quickSelectBottomSaved(
      param,
      this.props.SelectedgridRows,
      this.props.selectData
    );
  };

  quickSelectGrid1BtnClicked = () => {
    this.props.quickSelectGrid1BtnClicked(true);
  };

  quickSelectGrid2BtnClicked = () => {
    this.props.quickSelectGrid2BtnClicked(true);
  };

  selectBtnClicked = () => {
    this.props.selectBtnClicked(this.props.panelData, this.props.AvailgridRows);
  };

  unSelectBtnClicked = () => {
    this.props.unSelectBtnClicked(this.props.panelData, this.props.selectData);
  };

  selectAllBtnClicked = () => {
    const checkboxes = document.getElementsByClassName("availGridPropagation");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = true;
      }
    }
    this.props.selectAllBtnClicked(this.props.panelData, this.props.availData);
  };

  unSelectAllBtnClicked = () => {
    const checkboxes = document.getElementsByClassName("selectGridPropagation");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = true;
      }
    }
    this.props.unSelectAllBtnClicked(
      this.props.panelData,
      this.props.selectData
    );
  };

  saveHandler = (param) => {
    this.props.saveHandler(param, this.props.panelData);
  };

  cancelHandler = (param) => {
    this.props.cancelHandler(param);
  };

  handleOrderChange = (param) => {
    this.refreshValGridList =
      this.refreshValGridList == param ? `${param}_${param}` : param;
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    this.props.handleOrderChange(dataitem, param);
  };

  handleOrderChangeSelect = (param) => {
    param = param - 1;
    this.refreshValGridSelected =
      this.refreshValGridSelected == param ? `${param}_${param}` : param;
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    this.props.handleOrderChangeSelect(dataitem, param);
  };

  render() {
    return (
      <PgoosPropagationContextProvider>
        <PgoosPropagationContext.Consumer>
          {(hotelSolicitationListContext) => {
            this.getGridDetails();
            return (
              <React.Fragment>
                {/* Calling shared component with double grid */}
                <FilteredDoubleGridSelect
                  refreshValGridList={
                    this.props.isMakingRequest || this.refreshValGridList
                  }
                  refreshValGridSelected={
                    this.props.isMakingRequest || this.refreshValGridSelected
                  }
                  viewObject={this.viewObject}
                  availGrid={this.availGrid}
                  selectedGrid={this.selectedGrid}
                  selectBtnClicked={this.selectBtnClicked}
                  unSelectBtnClicked={this.unSelectBtnClicked}
                  selectAllBtnClicked={this.selectAllBtnClicked}
                  unSelectAllBtnClicked={this.unSelectAllBtnClicked}
                  quickSelectGrid1BtnClicked={this.quickSelectGrid1BtnClicked}
                  quickSelectGrid2BtnClicked={this.quickSelectGrid2BtnClicked}
                  quickSelectTopSaved={this.quickSelectTopSaved}
                  deselectBtnClicked={this.deselectBtnClicked}
                  quickSelectBottomSaved={this.quickSelectBottomSaved}
                  showQuickSelectTop={this.props.showQuickSelectTop}
                  showQuickSelectBottom={this.props.showQuickSelectBottom}
                  cancelHandler={this.cancelHandler}
                  saveHandler={this.saveHandler}
                  componentName={Settings.componentName}
                  handleOrderChange={this.handleOrderChange}
                  handleOrderChangeSelect={this.handleOrderChangeSelect}
                  filterRequestData={this.props.panelData}
                  isMakingRequest={this.props.isMakingRequest}
                  isMakingRequestList={
                    this.props.isMakingRequestList &&
                    this.props.isMakingRequestList.current
                      ? this.props.isMakingRequestList.current
                      : []
                  }
                />
                <style>{`
                .pricingreports, .profileorgdesignnew, .doublegridcontainer, .doublegriddata{
                  width: auto;
                }
                .solitationseegrid{
                  width:99.5%;
                }
                .virtualScrollGrid{
                  height: calc(50vh - 124px) !important;
                }
                .gridheaderdata{
                  overflow: unset;
                  background-color: transparent;
                  position: relative;
                }
                .hoelsolicitationlist{
                  margin-top:0 !important;
                } 
                  #reportProgram a{
                    text-decoration: none;
                    color: #000;
                  }
                  #gridTableView tbody tr td{
                    padding-left:2px;
                  } 
                  .doublegriddata  tr td:last-child{
                    width:85px !important;
                    min-width:85px !important;
                    border-right:0 !important;
                  } 
                  #gridTableHeader tr th{
                    padding-left:2px;
                  }
                  #filterdiv{
                      height:calc(100vh - 142px) !important;
                  }
                  #reportProgram{
                    width:118px !important;
                    min-width:118px !important;
                  }
                  #gridViewSelectedGrid{
                    overflow: auto !important;
                  }
                  .pogofield_Name tr td{
                    display: table-cell;
                    vertical-align: middle;
                    padding: 4px 0 2px;
                  }
                  @media only screen and (min-width: 1920px) {
                    .page_body_container {
                      min-height: calc(100vh - 90px);
                    }
                    .footerwidget{
                      position:fixed;
                    }
                  }
                  @media only screen and (max-width: 1010px) {
                      #gridView, #gridViewSelectedGrid{
                        height: calc(50vh - 132px) !important;
                        overflow: unset !important;
                      }
                      .virtualScrollGrid{
                        height: calc(50vh - 132px) !important;
                      }
                      #filterdiv{
                        height:calc(100vh - 150px) !important;
                      }
                      .page_body_container{
                        min-height:calc(100vh - 106px) !important;
                      }
                      .footerwidget{
                        position:fixed;
                      }
                  }
                  @media only screen and (max-width: 1250px) and (min-width: 1210px)  {
                    #marshaCodeNotFoundBlock{
                      width:171px !important;
                    }
                  }
                `}</style>
              </React.Fragment>
            );
          }}
        </PgoosPropagationContext.Consumer>
      </PgoosPropagationContextProvider>
    );
  }
}
