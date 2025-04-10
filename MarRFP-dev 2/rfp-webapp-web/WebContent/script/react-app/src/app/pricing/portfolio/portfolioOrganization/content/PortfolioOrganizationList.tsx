import React, { Component } from "react";
import PortfolioOrganizationContext, {
  PortfolioOrganizationContextProvider,
} from "../context/PortfolioOrganizationContext";
import Settings from "../static/Settings";
//import styles from "./PortfolioOrganization.css";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import CCheckbox from "../../../../common/components/CCheckbox";
import rejected from "./../../../../common/assets/img/rejected.gif";
import accepted from "./../../../../common/assets/img/accepted.gif";
import locked from "./../../../../common/assets/img/locked.gif";
import requested from "./../../../../common/assets/img/requested.gif";
//import { element } from "prop-types";

let contextType = null;

interface IProps {
  availData?: any;
  selectData?: any;
  AvailgridRows?: any;
  SelectedgridRows?: any;
  deselectBtnClicked?: any;
  onChangeFeildValue?: any;
  quickSelectTopSaved?: any;
  quickSelectBottomSaved?: any;
  showQuickSelectTop?: any;
  showQuickSelectBottom?: any;
  showadditionalInfo?: any;
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
  subsetData?: any;
  initialLoadAvail: any;
  initialLoadSelect: any;
  isMakingRequest?: boolean;
  isMakingRequestList?: any;
  appContext?: any;
}

interface IState {}

export default class PortfolioOrganizationList extends Component<
  IProps,
  IState
> {
  // Object for double grid  component view
  viewObject = {
    view: Settings.viewObject.viewVertical, // For horizontal view Settings.viewObject.viewHorizontal
    headingGrid1: Settings.hotelsMatchingCriteria,
    headingGrid2: Settings.hotelsSelectedCriteria,
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
    additionTextSecontTitle: Settings.SubsetB,
    gridType: "double",
  };
  availGrid = {};
  selectedGrid = {};

  availGridCheckbox = (rowData, checkboxHotelId) => {
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
            checked={checkboxHotelId}
          ></CCheckbox>
        ) : (
          ""
        )}
      </>
    );
  };

  selectGridCheckbox = (rowData, checkboxHotelId) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <input
            type={Settings.inputType.checkbox}
            id={Settings.solicitSelect + rowData.hotelid + Settings.move}
            name={Settings.checkAvail + rowData.hotelid + +Settings.move}
            onChange={(event) =>
              this.props.onChangeFeildValue(
                rowData,
                Settings.inputType.checkbox,
                Settings.selectedValue,
                this.props.selectData,
                this.props.SelectedgridRows,
                event
              )
            }
            checked={checkboxHotelId}
          />
        ) : (
          ""
        )}
      </>
    );
  };

  gethotelSolicitAvailList = (data) => {
    const arr = [];
    if (data) {
      if (data !== null && data !== {} && data.length !== 0) {
        data.map((element) => {
          const checkboxHotelId =
            this.props.AvailgridRows?.length != 0
              ? FilteredGridSelectUtils.getCheckboxStatus(
                  this.props.AvailgridRows,
                  element,
                  Settings.tableColumns.hotelid.field
                )
              : element.hotelid_checkbox;
          const obj = {
            hotelidCheckbox: this.availGridCheckbox(element, checkboxHotelId),
            // checkboxHotelId_checked: checkboxHotelId,
            hotelid: element[Settings.tableColumns.hotelid.field],
            marshacode: element[Settings.tableColumns.marshacode.field],
            hotelname: element[Settings.tableColumns.hotelname.field],
            city: element[Settings.tableColumns.city.field],
            state: element[Settings.tableColumns.state.field],
            country: element[Settings.tableColumns.country.field],
            subset: element[Settings.tableColumns.subset.field],
            volunteered: element[Settings.tableColumns.volunteered.field],
            ratetypeselected:
              element[Settings.tableColumns.ratetypeselected.field],
            hasgenpricing: element[Settings.tableColumns.hasgenpricing.field],
            nopricing: FilteredGridSelectUtils.blankReplaceWithX(
              element[Settings.tableColumns.nopricing.field]
            ),
          };
          arr.push(obj);
        });
      }
    }

    return arr;
  };
  // Array of columns for top grid

  availgridColumns = [
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "34px", minWidth: "34px" },
    },
    {
      field: Settings.tableColumns.hotelid.field,
      style: { width: "30px", minWidth: "30px", display: "none" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: {
        width: "62px",
        minWidth: "62px",
        paddingLeft: "2px",
        wordWrap: "break-word",
      },
      optionnumber: 0,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: {
        width: "243px",
        minWidth: "243px",
        paddingLeft: "2px",
        wordWrap: "break-word",
      },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: {
        width: "112px",
        minWidth: "112px",
        paddingLeft: "2px",
        wordWrap: "break-word",
      },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "62px", minWidth: "62px", paddingLeft: "2px" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "62px", minWidth: "62px", paddingLeft: "2px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.subset.field,
      header: Settings.tableColumns.subset.header,
      style: { width: "111px", minWidth: "111px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.nopricing.field,
      header: Settings.tableColumns.nopricing.header,
      style: { width: "60px", minWidth: "60px", display: "none" },
    },
    {
      field: Settings.tableColumns.hasgenpricing.field,
      header: Settings.tableColumns.hasgenpricing.field,

      style: { width: "80px", minWidth: "80px", display: "none" },
    },
    {
      field: Settings.tableColumns.ratetypeselected.field,
      header: Settings.tableColumns.ratetypeselected.field,

      style: { width: "80px", minWidth: "80px", display: "none" },
    },
    {
      field: Settings.tableColumns.volunteered.field,
      header: Settings.tableColumns.volunteered.header,

      style: { width: "80px", minWidth: "80px", display: "none" },
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
      if (data !== null && data !== {} && data.length !== 0) {
        data.map((element) => {
          const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
            this.props.SelectedgridRows,
            element,
            Settings.tableColumns.hotelid.field
          );
          const obj = {
            hotelidCheckbox: this.selectGridCheckbox(element, checkboxHotelId),
            // checkboxHotelId_checked: checkboxHotelId,
            hotelid: element[Settings.tableColumns.hotelid.field],
            marshacode: element[Settings.tableColumns.marshacode.field],
            hotelname: element[Settings.tableColumns.hotelname.field],
            city: element[Settings.tableColumns.city.field],
            state: element[Settings.tableColumns.state.field],
            country: element[Settings.tableColumns.country.field],
            subset: element[Settings.tableColumns.subset.field],
            volunteered: element[Settings.tableColumns.volunteered.field],
            ratetypeselected:
              element[Settings.tableColumns.ratetypeselected.field],
            hasgenpricing: element[Settings.tableColumns.hasgenpricing.field],
            nopricing: FilteredGridSelectUtils.blankReplaceWithX(
              element[Settings.tableColumns.nopricing.field]
            ),
          };
          arr.push(obj);
        });
      }
    }

    return arr;
  };
  // Array of columns for Bottom grid
  selectedgridColumns = [
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "34px", minWidth: "34px" },
    },
    {
      field: Settings.tableColumns.hotelid.field,
      style: { width: "30px", minWidth: "30px", display: "none" },
    },

    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: {
        width: "62px",
        minWidth: "62px",
        paddingLeft: "2px",
        wordWrap: "break-word",
      },
      optionnumber: 0,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: {
        width: "243px",
        minWidth: "243px",
        paddingLeft: "2px",
        wordWrap: "break-word",
      },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: {
        width: "112px",
        minWidth: "112px",
        paddingLeft: "2px",
        wordWrap: "break-word",
      },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "62px", minWidth: "62px", paddingLeft: "2px" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "62px", minWidth: "62px", paddingLeft: "2px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.subset.field,
      header: Settings.tableColumns.subset.header,
      style: { width: "111px", minWidth: "111px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.nopricing.field,
      header: Settings.tableColumns.nopricing.header,
      style: { width: "60px", minWidth: "60px", display: "none" },
    },
    {
      field: Settings.tableColumns.hasgenpricing.field,
      header: Settings.tableColumns.hasgenpricing.field,

      style: { width: "80px", minWidth: "80px", display: "none" },
    },
    {
      field: Settings.tableColumns.ratetypeselected.field,
      header: Settings.tableColumns.ratetypeselected.field,

      style: { width: "80px", minWidth: "80px", display: "none" },
    },
    {
      field: Settings.tableColumns.volunteered.field,
      header: Settings.tableColumns.volunteered.header,

      style: { width: "80px", minWidth: "80px", display: "none" },
    },
  ];

  // Object for grid's data and view
  getGridDetails = () => {
    this.availGrid = {
      availgridColumns: this.availgridColumns,
      availgridRows: this.gethotelSolicitAvailList(this.props.availData),
      id: Settings.gridTR,
      width: "706px",
      initialLoad: this.props.initialLoadAvail,

      //directSelect: this.props.availData,
      borderTable: "2px solid rgb(118, 118, 118)",
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
      selectedgridRows: this.gethotelSolicitSelectedList(this.props.selectData),
      header: false,
      width: "706px",
      id: Settings.gridTR,
      borderTable: "2px solid rgb(118, 118, 118)",
      initialLoad: this.props.initialLoadSelect,
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
      this.props.AvailgridRows,
      this.props.SelectedgridRows
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
      <PortfolioOrganizationContextProvider>
        <PortfolioOrganizationContext.Consumer>
          {(portfolioOrganizationContext) => {
            contextType = portfolioOrganizationContext;

            this.getGridDetails();

            return (
              <>
                <React.Fragment>
                  {/* Calling shared component with doble grid */}
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
                    isMakingRequest={this.props.isMakingRequest}
                    isMakingRequestList={this.props.isMakingRequestList}
                  ></FilteredDoubleGridSelect>
                </React.Fragment>
              </>
            );
          }}
        </PortfolioOrganizationContext.Consumer>
      </PortfolioOrganizationContextProvider>
    );
  }
}
