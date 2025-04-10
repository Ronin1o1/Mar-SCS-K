import React, { Component } from "react";
import Settings from "../static/Settings";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import CCheckbox from "../../../../common/components/CCheckbox";
import EdieHotelProfileListContext, {
  EdieHotelProfileListContextProvider,
} from "../context/EdieHotelProfileListContext";

interface IProps {
  availData?: any;
  selectData?: any;
  availGridRows?: any;
  selectedGridRows?: any;
  deselectBtnClicked?: any;
  onChangeFieldValue?: any;
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
  findFilterData?: any;
  handleOrderChange?: any;
  handleOrderChangeSelect?: any;
  selectedAccount?: any;
  selectedHotelName?: any;
  initialLoadAvail?: any;
  initialLoadSelect?: any;
  isMakingRequest?: any;
}

interface IState {}

let contextType = null;

export default class EdieHotelProfileSelectionList extends Component<
  IProps,
  IState
> {
  // Object for double grid  component view
  viewObject = {
    view: Settings.viewObject.viewVertical, // For horizontal view Settings.viewObject.viewHorizontal
    headingGrid1: Settings.topGridLabel,
    viewSelectCheckboxButton: true,
    viewUnselectCheckboxButton: true,
    viewUnselectAllCheckboxButton: true,
    viewSelectAllCheckboxButton: true,
    enableQuickSelectGrid1: true,
    enableQuickSelectGrid2: true,
    //deselectAll: true,
    additionTextSecontTitle: "",
    gridType: "double",
  };
  availGrid = {};
  selectedGrid = {};

  renderGridCheckbox = (rowData, checkboxHotelId, gridType) => {
    return (
      <>
        {rowData.hotelid != null && (
          <CCheckbox
            type={Settings.inputType.checkbox}
            id={rowData.hotelid}
            onChangeHandler={(event) =>
              this.props.onChangeFieldValue(
                rowData,
                Settings.inputType.checkbox,
                gridType,
                gridType == Settings.availableValue
                  ? this.props.availData
                  : this.props.selectData,
                gridType == Settings.availableValue
                  ? this.props.availGridRows
                  : this.props.selectedGridRows,
                event
              )
            }
            checked={checkboxHotelId}
          ></CCheckbox>
        )}
      </>
    );
  };

  getEdieHotelProfileSelectionAvailList = (data) => {
    const arr = [];
    if (data) {
      data.map((element) => {
        const checkboxHotelId =
          this.props.availGridRows.length != 0
            ? FilteredGridSelectUtils.getCheckboxStatus(
                this.props.availGridRows,
                element,
                Settings.tableColumns.hotelid.field
              )
            : element.hotelid_checkbox;
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.renderGridCheckbox(
            element,
            checkboxHotelId,
            Settings.availableValue
          ),
          // checkboxHotelId_checked: checkboxHotelId,
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
  availGridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,
      style: { display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "31px" },
    },

    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "62px", wordWrap: "break-word" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: { width: "253px", wordWrap: "break-word" },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "115px", wordWrap: "break-word" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "52px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "68px" },
      optionnumber: 5,
    },
  ];

  // Array of columns for Bottom grid
  selectedGridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,
      style: { display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "31px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "62px", wordWrap: "break-word" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: { width: "253px", wordWrap: "break-word" },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "115px", wordWrap: "break-word" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "52px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "68px" },
      optionnumber: 5,
    },
  ];

  getEdieHotelProfileSelectionSelectedList = (data) => {
    const arr = [];
    if (data) {
      data.map((element) => {
        const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
          this.props.selectedGridRows,
          element,
          Settings.tableColumns.hotelid.field
        );
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.renderGridCheckbox(
            element,
            checkboxHotelId,
            Settings.selectedValue
          ),
          // checkboxHotelId_checked: checkboxHotelId,
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

  // Object for grid's data and view
  getGridDetails = () => {
    this.availGrid = {
      availgridColumns: this.availGridColumns,
      availgridRows: this.getEdieHotelProfileSelectionAvailList(
        this.props.availData
          ? this.props.availData.edieHotelProfileAvailList
          : null
      ),
      id: Settings.gridTR,
      width: Settings.availGridWidth,
      height: Settings.availGridHeight,
      scroll: Settings.scrollAvailGridHeight,
      directSelect: this.props.availData && this.props.availData.notfound,
      borderTable: "2px solid grey",
      containerWidth: "50%",
      initialLoad: this.props.initialLoadAvail,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.rows,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
        componentName: "EdieHotelProfileView",
      },
    };
    this.selectedGrid = {
      selectedgridColumns: this.selectedGridColumns,
      selectedgridRows: this.getEdieHotelProfileSelectionSelectedList(
        this.props.selectData &&
          this.props.selectData.edieHotelProfileSelectedlList
      ),
      header: false,
      id: Settings.gridTR,
      width: Settings.selectGridWidth,
      height: Settings.selectGridHeight,
      scroll: Settings.scrollSelectGridHeight,
      initialLoad: this.props.initialLoadSelect,
      borderTable: "2px solid grey",
      containerWidth: "100%",
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
      this.props.availGridRows
    );
  };

  quickSelectTopSaved = (param) => {
    this.props.quickSelectTopSaved(
      param,
      this.props.availGridRows,
      this.props.availData
    );
  };

  quickSelectBottomSaved = (param) => {
    this.props.quickSelectBottomSaved(
      param,
      this.props.selectedGridRows,
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
    this.props.selectBtnClicked(this.props.panelData, this.props.availGridRows);
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

  handleOrderChange = (param) => {
    this.props.handleOrderChange(this.props.panelData, param);
  };

  handleOrderChangeSelect = (param) => {
    this.props.handleOrderChangeSelect(this.props.panelData, param);
  };

  render() {
    return (
      <EdieHotelProfileListContextProvider>
        <EdieHotelProfileListContext.Consumer>
          {(edieHotelProfileListContext) => {
            contextType = edieHotelProfileListContext;
            this.props.selectedHotelName &&
              (this.viewObject.additionTextSecontTitle = `${Settings.bottomGridLabel}${this.props.selectedHotelName}`);
            this.getGridDetails();
            return (
              <React.Fragment>
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
                  //deselectBtnClicked={this.deselectBtnClicked}
                  quickSelectTopSaved={this.quickSelectTopSaved}
                  quickSelectBottomSaved={this.quickSelectBottomSaved}
                  showQuickSelectTop={this.props.showQuickSelectTop}
                  showQuickSelectBottom={this.props.showQuickSelectBottom}
                  componentName={Settings.componentName}
                  handleOrderChange={this.handleOrderChange}
                  handleOrderChangeSelect={this.handleOrderChangeSelect}
                ></FilteredDoubleGridSelect>
              </React.Fragment>
            );
          }}
        </EdieHotelProfileListContext.Consumer>
      </EdieHotelProfileListContextProvider>
    );
  }
}
