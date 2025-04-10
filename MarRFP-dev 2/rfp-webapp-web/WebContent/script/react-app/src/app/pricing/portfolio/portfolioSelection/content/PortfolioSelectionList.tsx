import React, { Component } from "react";
import Settings from "../static/Settings";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import CCheckbox from "../../../../common/components/CCheckbox";

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
  initailLoadingAvail?: any;
  initailLoadingSelect?: any;
  isMakingRequestList?: any;
  isMakingRequest?: boolean;
  appContext?: any;
}

interface IState {}

export default class PortfolioSelectionList extends Component<IProps, IState> {
  // Object for double grid  component view
  viewObject = {
    view: Settings.viewObject.viewVertical, // For horizontal view Settings.viewObject.viewHorizontal
    headingGrid1: Settings.topGridLabel,
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
    enableQuickSelectGrid2: true,
    deselectAll: true,
    additionTextSecontTitle: Settings.bottomGridLabel,
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

  getPortfolioSelectionAvailList = (data) => {
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
          ratetype_selected:
            element[Settings.tableColumns.ratetype_selected.field],
          volunteered: element[Settings.tableColumns.volunteered.field],
          hasgenpricing: element[Settings.tableColumns.hasgenpricing.field],
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
      style: { width: "27px", minWidth: "27px", paddingLeft: "4px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "63px", paddingLeft: "2px", minWidth: "63px" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: {
        width: "252px",
        wordWrap: "break-word",
        paddingLeft: "2px",
        minWidth: "252px",
      },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: {
        width: "116px",
        wordWrap: "break-word",
        paddingLeft: "2px",
        minWidth: "116px",
      },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "63px", minWidth: "63px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "70px", minWidth: "70px" },
      optionnumber: 5,
    },
    {
      field: Settings.tableColumns.ratetype_selected.field,
      header: Settings.tableColumns.ratetype_selected.header,
      style: { display: "none" },
      optionnumber: 6,
    },
    {
      field: Settings.tableColumns.volunteered.field,
      header: Settings.tableColumns.volunteered.header,
      style: { display: "none" },
      optionnumber: 7,
    },
    {
      field: Settings.tableColumns.hasgenpricing.field,
      header: Settings.tableColumns.hasgenpricing.header,
      style: { display: "none" },
      optionnumber: 7,
    },
  ];

  getPortfolioSelectionSelectedList = (data) => {
    const arr = [];
    if (data) {
      data.map((element) => {
        const checkboxHotelId =
          this.props.selectedGridRows.length != 0
            ? FilteredGridSelectUtils.getCheckboxStatus(
                this.props.selectedGridRows,
                element,
                Settings.tableColumns.hotelid.field
              )
            : element.hotelid_checkbox;
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.renderGridCheckbox(
            element,
            checkboxHotelId,
            Settings.selectedValue
          ),
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          subset: element[Settings.tableColumns.subset.field],
          ratetype_selected:
            element[Settings.tableColumns.ratetype_selected.field],
          volunteered: element[Settings.tableColumns.volunteered.field],
          hasgenpricing: element[Settings.tableColumns.hasgenpricing.field],
        };

        arr.push(obj);
      });
    }

    return arr;
  };
  // Array of columns for Bottom grid
  selectedGridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,
      style: { display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "27px", minWidth: "27px", paddingLeft: "4px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "63px", paddingLeft: "2px", minWidth: "63px" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: {
        width: "252px",
        wordWrap: "break-word",
        paddingLeft: "2px",
        minWidth: "252px",
      },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: {
        width: "116px",
        wordWrap: "break-word",
        paddingLeft: "2px",
        minWidth: "116px",
      },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "63px", minWidth: "63px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "63px", minWidth: "63px" },
      optionnumber: 5,
    },
    {
      field: Settings.tableColumns.subset.field,
      header: Settings.tableColumns.subset.header,
      style: { width: "130px", minWidth: "130px" },
      optionnumber: 6,
    },
    {
      field: Settings.tableColumns.ratetype_selected.field,
      header: Settings.tableColumns.ratetype_selected.header,
      style: { display: "none" },
      optionnumber: 7,
    },
    {
      field: Settings.tableColumns.volunteered.field,
      header: Settings.tableColumns.volunteered.header,
      style: { display: "none" },
      optionnumber: 7,
    },
    {
      field: Settings.tableColumns.hasgenpricing.field,
      header: Settings.tableColumns.hasgenpricing.header,
      style: { display: "none" },
      optionnumber: 7,
    },
  ];

  // Object for grid's data and view
  getGridDetails = () => {
    this.availGrid = {
      availgridColumns: this.availGridColumns,
      availgridRows: this.getPortfolioSelectionAvailList(
        this.props.availData
          ? this.props.availData.portfolioSelectionAvailList
          : null
      ),
      id: Settings.gridTR,
      width: Settings.width600,
      directSelect: this.props.availData && this.props.availData.notfound,
      borderTable: "2px solid #9a9a9a",
      containerWidth: "50%",
      initialLoad: this.props.initailLoadingAvail,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.row,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
    this.selectedGrid = {
      selectedgridColumns: this.selectedGridColumns,
      selectedgridRows: this.getPortfolioSelectionSelectedList(
        this.props.selectData &&
          this.props.selectData.portfolioSelectionSelectedlList
      ),
      header: false,
      id: Settings.gridTR,
      width: Settings.width726,
      initialLoad: this.props.initailLoadingSelect,
      borderTable: "2px solid #9a9a9a",
      containerWidth: "100%",
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.row,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
  };

  // Functions for passing data to context
  deselectBtnClicked = () => {
    this.props.deselectBtnClicked(
      this.props.availData,
      this.props.selectData,
      this.props.availGridRows,
      this.props.selectedGridRows
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
    this.props.selectBtnClicked(
      this.props.panelData,
      this.props.availGridRows,
      this.props.availData
    );
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
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    this.props.handleOrderChange(dataitem, param);
  };

  handleOrderChangeSelect = (param) => {
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    this.props.handleOrderChangeSelect(dataitem, param);
  };

  render() {
    this.props.selectedAccount.accountname &&
      (this.viewObject.additionTextSecontTitle = `${Settings.bottomGridLabel}${this.props.selectedAccount.accountname}`);
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
          deselectBtnClicked={this.deselectBtnClicked}
          quickSelectTopSaved={this.quickSelectTopSaved}
          quickSelectBottomSaved={this.quickSelectBottomSaved}
          showQuickSelectTop={this.props.showQuickSelectTop}
          showQuickSelectBottom={this.props.showQuickSelectBottom}
          componentName={Settings.componentName}
          handleOrderChange={this.handleOrderChange}
          handleOrderChangeSelect={this.handleOrderChangeSelect}
          isMakingRequestList={this.props.isMakingRequestList}
          isMakingRequest={this.props.isMakingRequest}
        ></FilteredDoubleGridSelect>
      </React.Fragment>
    );
  }
}
