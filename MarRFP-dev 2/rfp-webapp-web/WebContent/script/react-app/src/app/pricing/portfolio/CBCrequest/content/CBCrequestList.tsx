import React, { Component } from "react";
import CBCrequestContext, {
  CBCrequestContextProvider,
} from "../context/CBCrequestContext";
import Settings from "../static/Settings";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import CCheckbox from "../../../../common/components/CCheckbox";
import rejected from "./../../../../common/assets/img/rejected.gif";
import accepted from "./../../../../common/assets/img/accepted.gif";
import locked from "./../../../../common/assets/img/locked.gif";
import requested from "./../../../../common/assets/img/requested.gif";

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
  initialLoadSelect: any;
  initialLoadAvail: any;
  isMakingRequestList: any;
  isMakingRequest: boolean;
  appContext?: any;
}

interface IState {}

export default class CBCrequestList extends Component<IProps, IState> {
  // Object for double grid  component view
  viewObject = {
    view: Settings.viewObject.viewVertical, // For horizontal view Settings.viewObject.viewHorizontal
    viewSelectCheckboxButton: true,
    viewUnselectCheckboxButton: true,
    viewUnselectAllCheckboxButton:
      this.props.appContext?.user?.role === "MFPFSALE" ||
      this.props.appContext?.user?.role === "MFPSALES"
        ? false
        : true,
    viewSelectAllCheckboxButton:
      this.props.appContext?.user?.role === "MFPFSALE" ||
      this.props.appContext?.user?.role === "MFPSALES"
        ? false
        : true,
    enableQuickSelectGrid1: true,
    enableQuickSelectGrid2: false,
    headingGrid1: Settings.hotelsAvailCriteria,
    additionTextSecontTitle: Settings.hotelsSelectedCriteria,
    deselectAll: false,
    gridType: "double",
  };
  availGrid = {};
  selectedGrid = {};

  availGridCheckbox = (rowData) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <CCheckbox
            type={Settings.inputType.checkbox}
            id={Settings.checkAvail + rowData.hotelid}
            name={Settings.checkAvail + rowData.hotelid}
            onChangeHandler={(event) =>
              this.props.onChangeFeildValue(
                rowData,
                Settings.inputType.checkbox,
                Settings.availableValue,
                this.props.availData,
                this.props.AvailgridRows,
                event
              )
            }
            checked={
              this.props?.AvailgridRows?.length != 0
                ? FilteredGridSelectUtils.getCheckboxStatus(
                    this.props.AvailgridRows,
                    rowData,
                    Settings.tableColumns.hotelid.field
                  )
                : rowData.hotelid_checkbox
            }
          ></CCheckbox>
        ) : (
          ""
        )}
      </>
    );
  };

  selectGridCheckbox = (rowData) => {
    if (rowData.status == "R") {
      return (
        <>
          {rowData.hotelid != null ? (
            <input
              type={Settings.inputType.checkbox}
              id={Settings.solicitSelect + rowData.hotelid + Settings.move}
              name={Settings.checkAvail + rowData.hotelid + +Settings.move}
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
    } else return null;
  };

  getCBCrequestAvailList = (data) => {
    const arr = [];
    if (data && data != "error") {
      data.map((element) => {
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.availGridCheckbox(element),
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
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
      style: {
        width: "26px",
        minWidth: "26px",
        verticalAlign: "middle",
        padding: "4px 0 0 4px",
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
      style: { width: "238px", minWidth: "238px", wordWrap: "break-word" },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "108px", minWidth: "108px", wordWrap: "break-word" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "50px", minWidth: "50px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "68px", minWidth: "68px" },
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
    if (data && data != "error") {
      data.map((element) => {
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.selectGridCheckbox(element),
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          status: element[Settings.tableColumns.status.field],
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
        width: "26px",
        minWidth: "26px",
        verticalAlign: "middle",
        padding: "4px 0 0 4px",
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
      style: { width: "238px", minWidth: "238px", wordWrap: "break-word" },
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      optionnumber: 3,
      style: { width: "108px", minWidth: "108px", wordWrap: "break-word" },
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      optionnumber: 4,
      style: { width: "50px", minWidth: "50px" },
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      optionnumber: 5,
      style: { width: "55px", minWidth: "55px" },
    },
    {
      field: Settings.tableColumns.status.field,
      header: Settings.tableColumns.status.header,
      optionnumber: 6,
      style: { width: "83px", minWidth: "83px", paddingRight: "5px" },
    },
  ];

  // Object for grid's data and view
  getGridDetails = () => {
    this.availGrid = {
      availgridColumns: this.availgridColumns,
      availgridRows: this.getCBCrequestAvailList(
        this.props.availData.CBCRequestAvailList
      ),
      id: Settings.gridTR,
      width: "578px",
      // height: Settings.width220,
      // scroll: Settings.width180,
      initialLoad: this.props.initialLoadAvail,
      directSelect: this.props.availData.notfound,
      borderTable: "2px solid #ccc",
      containerWidth: "100%",
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.row,
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
      initialLoad: this.props.initialLoadSelect,
      id: Settings.gridTR,
      width: "656px",
      // height: Settings.width210,
      // scroll: Settings.width180,
      borderTable: "2px solid #ccc",
      containerWidth: "100%",
      height: "206px",
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.row,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
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
    this.props.selectAllBtnClicked(this.props.panelData, this.props.availData);
  };

  unSelectAllBtnClicked = () => {
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
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    this.props.handleOrderChange(dataitem, param);
  };

  handleOrderChangeSelect = (param) => {
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    this.props.handleOrderChangeSelect(dataitem, param);
  };

  render() {
    return (
      <CBCrequestContextProvider>
        <CBCrequestContext.Consumer>
          {(hotelSolicitationListContext) => {
            this.getGridDetails();
            return (
              <React.Fragment>
                {/* Calling shared component with double grid */}
                <FilteredDoubleGridSelect
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
                  quickSelectBottomSaved={this.quickSelectBottomSaved}
                  showQuickSelectTop={this.props.showQuickSelectTop}
                  showQuickSelectBottom={this.props.showQuickSelectBottom}
                  cancelHandler={this.cancelHandler}
                  saveHandler={this.saveHandler}
                  componentName={Settings.componentName}
                  handleOrderChange={this.handleOrderChange}
                  handleOrderChangeSelect={this.handleOrderChangeSelect}
                  filterRequestData={this.props.panelData}
                  isMakingRequestList={
                    this.props.isMakingRequestList &&
                    this.props.isMakingRequestList.current
                      ? this.props.isMakingRequestList.current
                      : []
                  }
                  isMakingRequest={this.props.isMakingRequest}
                />
                <style>{`
                #gridTR table tr td, #gridTR table tr th{
                  padding-left:2px;
                  padding-right:2px;
                  vertical-align: middle;
                }
                .cbcreq td{
                  font-weight:bold;
                }
               
                `}</style>
              </React.Fragment>
            );
          }}
        </CBCrequestContext.Consumer>
      </CBCrequestContextProvider>
    );
  }
}
