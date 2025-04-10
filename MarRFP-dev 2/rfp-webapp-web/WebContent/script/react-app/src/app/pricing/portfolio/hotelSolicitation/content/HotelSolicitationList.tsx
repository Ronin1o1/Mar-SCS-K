import React, { Component } from "react";
import HotelSolicitationContext, {
  HotelSolicitationContextProvider,
} from "../context/HotelSolicitationContext";
import Settings from "../static/Settings";
//import styles from "./HotelSolicitationList.css";
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
  initialSelectedgridRows?: any;
  setInitialSelectedgridRows?: any;
  deselectBtnClicked?: any;
  onChangeFeildValue?: any;
  quickSelectTopSaved?: any;
  quickSelectBottomSaved?: any;
  directSelectBottomSaved?: any;
  showQuickSelectTop?: any;
  showQuickSelectBottom?: any;
  showadditionalInfo?: any;
  quickSelectGrid1BtnClicked?: any;
  quickSelectGrid2BtnClicked?: any;
  showDirectSelectBottom?: any;
  directSelectGrid2BtnClicked?: any;
  clearDirectSelect?: any;
  selectBtnClicked?: any;
  selectAllBtnClicked?: any;
  unSelectBtnClicked?: any;
  unSelectAllBtnClicked?: any;
  panelData?: any;
  SendEmailOnclick?: any;
  sendMailCheckboxUpdated?: any;
  sendMail?: any;
  additionalInfoBtnClicked: any;
  sendMailErrorMessage?: any;
  setsendMailErrorMessage?: any;
  setsenMailMessagePopup?: any;
  senMailMessagePopup?: any;
  sendFromList?: any;
  setsendFromList?: any;
  saveHandler?: any;
  cancelHandler?: any;
  FindFilterData?: any;
  handleOrderChange?: any;
  handleOrderChangeSelect?: any;
  closeAdditionalInfoButton?: any;
  initialLoadAvail?: any;
  initialLoadSelect?: any;
  isMakingRequestList?: any;
  isMakingRequest?: boolean;
  isMakingRequestAvailList?: boolean;
  appContext?: any;
  hotelSolicitation?: boolean;
}

interface IState {}

export default class HotelSolicitationList extends Component<IProps, IState> {
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
    enableDirectSelectGrid2: true,
    sendEmailButton: true,
    additionalEmailInfoButton: true,
    deselectAll: true,
    additionTextSecontTitle: Settings.hotelsSelectedToPrice,
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

  sendEmailCheckbox = (rowData) => {
    return (
      <>
        <input
          type={Settings.inputType.checkbox}
          id={Settings.solicitSelect + rowData.hotelid + Settings.sendemail}
          name={Settings.solicitSelect + rowData.hotelid + Settings.sendemail}
          onChange={(e) =>
            this.props.sendMailCheckboxUpdated(
              rowData,
              this.props.selectData,
              Settings.sendemail,
              this.props.sendMail,
              e
            )
          }
          checked={FilteredGridSelectUtils.checkedValue(
            this.props.sendMail,
            rowData,
            Settings.sendemail
          )}
        />
      </>
    );
  };

  chaseMailCheckbox = (rowData) => {
    return (
      <>
        {rowData.check_rate != null &&
        rowData.check_rate == Settings.valueYN.Y ? (
          <input
            type={Settings.inputType.checkbox}
            id={Settings.solicitSelect + rowData.hotelid + Settings.chasemail}
            name={Settings.solicitSelect + rowData.hotelid + Settings.chasemail}
            checked={FilteredGridSelectUtils.checkedValue(
              this.props.sendMail,
              rowData,
              Settings.chasemail
            )}
            disabled
          />
        ) : (
          <input
            type={Settings.inputType.checkbox}
            id={Settings.solicitSelect + rowData.hotelid + Settings.chasemail}
            name={Settings.solicitSelect + rowData.hotelid + Settings.chasemail}
            onChange={(e) =>
              this.props.sendMailCheckboxUpdated(
                rowData,
                this.props.selectData,
                Settings.chasemail,
                this.props.sendMail,
                event
              )
            }
            checked={FilteredGridSelectUtils.checkedValue(
              this.props.sendMail,
              rowData,
              Settings.chasemail
            )}
          />
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
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.availGridCheckbox(element, checkboxHotelId),
          // checkboxHotelId_checked : checkboxHotelId,
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          nopricing: FilteredGridSelectUtils.blankReplaceWithX(
            element["willnotprice"]
          ),
          status_CBC: FilteredGridSelectUtils.blankReplaceWithXCBC(
            element[Settings.tableColumns.status_CBC.field]
          ),
          hasgenpricing: element[Settings.tableColumns.hasgenpricing.field],
          volunteered: element[Settings.tableColumns.volunteered.field],
          ratetype_selected:
            element[Settings.tableColumns.ratetype_selected.field],
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
      style: { width: "30px", display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "26px", minWidth: "26px", paddingLeft: "4px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: {
        width: "58px",
        minWidth: "58px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      style: {
        width: "238px",
        minWidth: "238px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
      optionnumber: 2,
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: {
        width: "108px",
        minWidth: "108px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "58px", minWidth: "58px", paddingLeft: "2px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "58px", minWidth: "58px", paddingLeft: "2px" },
      optionnumber: 5,
    },
    {
      field: Settings.tableColumns.nopricing.field,
      header: Settings.tableColumns.nopricing.header,
      style: { width: "58px", minWidth: "58px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.status_CBC.field,
      header: Settings.tableColumns.status_CBC.header,
      style: { width: "68px", minWidth: "68px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.hasgenpricing.field,
      header: Settings.tableColumns.hasgenpricing.header,

      style: { width: "80px", display: "none" },
    },
    {
      field: Settings.tableColumns.ratetype_selected.field,
      header: Settings.tableColumns.ratetype_selected.header,

      style: { width: "80px", display: "none" },
    },
    {
      field: Settings.tableColumns.volunteered.field,
      header: Settings.tableColumns.volunteered.header,

      style: { width: "80px", display: "none" },
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
      data.map((element) => {
        const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
          this.props.SelectedgridRows,
          element,
          Settings.tableColumns.hotelid.field
        );
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: this.selectGridCheckbox(element, checkboxHotelId),
          // checkboxHotelId_checked : checkboxHotelId,
          marshacode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelname.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          status: this.statusSelectedTemplate(element),
          email_sent_flag: FilteredGridSelectUtils.replaceYNwithYesNo(
            element[Settings.tableColumns.email_sent_flag.field]
          ),
          send_initial_email: this.sendEmailCheckbox(element),
          check_rate: FilteredGridSelectUtils.replaceYNwithYesNo(
            element[Settings.tableColumns.check_rate.field]
          ),
          chasemail_sent_flag: FilteredGridSelectUtils.replaceYNwithYesNo(
            element[Settings.tableColumns.chasemail_sent_flag.field]
          ),
          sent_chasemail: this.chaseMailCheckbox(element),
          nopricing: element["willnotprice"] || element["nopricing"] || null,
          ratetype_selected:
            element[Settings.tableColumns.ratetype_selected.field],
          volunteered: element[Settings.tableColumns.volunteered.field],
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
      style: { width: "30px", display: "none" },
    },
    {
      field: Settings.tableColumns.hotelidCheckbox.field,
      style: { width: "26px", minWidth: "26px", paddingLeft: "4px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,

      header: Settings.tableColumns.marshacode.header,
      style: {
        width: "58px",
        minWidth: "58px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
      optionnumber: 0,
    },
    {
      field: Settings.tableColumns.hotelname.field,
      header: Settings.tableColumns.hotelname.header,
      optionnumber: 1,
      style: {
        width: "238px",
        minWidth: "238px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      optionnumber: 2,
      style: {
        width: "108px",
        minWidth: "108px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      optionnumber: 3,
      style: {
        width: "58px",
        minWidth: "58px",
        wordWrap: "break-word",
        paddingLeft: "2px",
      },
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      optionnumber: 4,
      style: { width: "58px", minWidth: "58px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.status.field,
      header: Settings.tableColumns.status.header,
      optionnumber: 5,
      style: { width: "48px", minWidth: "48px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.email_sent_flag.field,
      header: Settings.tableColumns.email_sent_flag.header,
      optionnumber: 6,
      style: { width: "68px", minWidth: "68px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.send_initial_email.field,
      header: Settings.tableColumns.send_initial_email.header,
      style: { width: "68px", minWidth: "68px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.check_rate.field,
      header: Settings.tableColumns.check_rate.header,
      optionnumber: 8,
      style: { width: "68px", minWidth: "68px", paddingLeft: "2px" },
      sortable: true,
    },
    {
      field: Settings.tableColumns.chasemail_sent_flag.field,
      header: Settings.tableColumns.chasemail_sent_flag.header,
      optionnumber: 9,
      style: { width: "63px", minWidth: "63px", paddingLeft: "2px" },
      sortable: true,
    },
    {
      field: Settings.tableColumns.sent_chasemail.field,
      header: Settings.tableColumns.sent_chasemail.header,

      style: { width: "78px", minWidth: "78px", paddingLeft: "2px" },
    },
    {
      field: Settings.tableColumns.nopricing.field,
      header: Settings.tableColumns.nopricing.header,

      style: { width: "78px", minWidth: "78px", display: "none" },
    },
    {
      field: Settings.tableColumns.ratetype_selected.field,
      header: Settings.tableColumns.ratetype_selected.header,

      style: { width: "78px", minWidth: "78px", display: "none" },
    },
    {
      field: Settings.tableColumns.volunteered.field,
      header: Settings.tableColumns.volunteered.header,

      style: { width: "78px", minWidth: "78px", display: "none" },
    },
  ];

  // Object for grid's data and view
  getGridDetails = () => {
    this.availGrid = {
      availgridColumns: this.availgridColumns,
      availgridRows: this.gethotelSolicitAvailList(
        this.props.availData.hotelSolicitAvailList
      ),
      id: Settings.gridTR,
      width: Settings.width700,
      directSelect: this.props.availData.notfound,
      borderTable: "2px solid #ccc",
      containerWidth: "100%",
      initialLoad: this.props.initialLoadAvail,
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
      header: true,
      id: Settings.gridTR,
      width: Settings.width98,
      borderTable: "2px solid #ccc",
      containerWidth: "100%",
      initialLoad: this.props.initialLoadSelect,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.row,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
      additionalSendMail: {
        textareaId: Settings.additionalSendMail.textareaId,
        textareaName: Settings.additionalSendMail.textareaName,
        textareaCols: Settings.additionalSendMail.textareaCols,
        rows: Settings.additionalSendMail.textareaRows,
        dateInputId: Settings.additionalSendMail.dateInputId,
        dateInputName: Settings.additionalSendMail.dateInputName,
        dateInputMaxLength: Settings.additionalSendMail.dateInputMaxLength,
        sendfromtypeId: Settings.additionalSendMail.sendfromtypeId,
        sendfromtypeName: Settings.additionalSendMail.sendfromtypeName,
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

  directSelectBottomSaved = (param) => {
    this.props.directSelectBottomSaved(
      param,
      this.props.initialSelectedgridRows,
      this.props.selectData
    );
  };

  quickSelectGrid1BtnClicked = () => {
    this.props.quickSelectGrid1BtnClicked(true);
  };

  quickSelectGrid2BtnClicked = () => {
    this.props.quickSelectGrid2BtnClicked(true);
  };

  directSelectGrid2BtnClicked = () => {
    this.props.directSelectGrid2BtnClicked(true);
  };

  clearDirectSelect = () => {
    this.props.clearDirectSelect();
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

  sendMailBtnClicked = (fileObj) => {
    this.props.SendEmailOnclick(
      fileObj,
      this.props.panelData,
      this.props.sendMail,
      this.props.selectData
    );
  };

  additionalInfoBtnClicked = (param) => {
    this.props.additionalInfoBtnClicked(this.props.panelData, param);
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
      <HotelSolicitationContextProvider>
        <HotelSolicitationContext.Consumer>
          {(hotelSolicitationListContext) => {
            contextType = hotelSolicitationListContext;

            this.getGridDetails();

            return (
              <React.Fragment>
                {/* Calling shared component with doble grid */}
                <FilteredDoubleGridSelect
                  hotelSolicitation={true}
                  viewObject={this.viewObject}
                  availGrid={this.availGrid}
                  selectedGrid={this.selectedGrid}
                  selectBtnClicked={this.selectBtnClicked}
                  unSelectBtnClicked={this.unSelectBtnClicked}
                  selectAllBtnClicked={this.selectAllBtnClicked}
                  unSelectAllBtnClicked={this.unSelectAllBtnClicked}
                  quickSelectGrid1BtnClicked={this.quickSelectGrid1BtnClicked}
                  quickSelectGrid2BtnClicked={this.quickSelectGrid2BtnClicked}
                  sendMailBtnClicked={this.sendMailBtnClicked}
                  additionalInfoBtnClicked={this.additionalInfoBtnClicked}
                  deselectBtnClicked={this.deselectBtnClicked}
                  quickSelectTopSaved={this.quickSelectTopSaved}
                  quickSelectBottomSaved={this.quickSelectBottomSaved}
                  showQuickSelectTop={this.props.showQuickSelectTop}
                  showQuickSelectBottom={this.props.showQuickSelectBottom}
                  showadditionalInfo={this.props.showadditionalInfo}
                  sendMailErrorMessage={this.props.sendMailErrorMessage}
                  setsenMailMessagePopup={this.props.setsenMailMessagePopup}
                  senMailMessagePopup={this.props.senMailMessagePopup}
                  sendFromList={this.props.sendFromList}
                  cancelHandler={this.cancelHandler}
                  saveHandler={this.saveHandler}
                  componentName={Settings.componentName}
                  handleOrderChange={this.handleOrderChange}
                  handleOrderChangeSelect={this.handleOrderChangeSelect}
                  closeAdditionalInfoButton={
                    this.props.closeAdditionalInfoButton
                  }
                  isMakingRequestList={this.props.isMakingRequestList}
                  isMakingRequest={this.props.isMakingRequest}
                  isMakingRequestAvailList={this.props.isMakingRequestAvailList}
                  initialSelectedgridRows={this.props.initialSelectedgridRows}
                  directSelectBottomSaved={this.directSelectBottomSaved}
                  showDirectSelectBottom={this.props.showDirectSelectBottom}
                  directSelectGrid2BtnClicked={this.directSelectGrid2BtnClicked}
                  clearDirectSelect={this.clearDirectSelect}
                ></FilteredDoubleGridSelect>
                <style>{`
                .hotelsolicitationchoosefile{
                  width:972px;
                }
                .hotelsolicitation{
                  width:100%;
                  height: auto !important;
                  box-sizing: border-box !important;

                }
                #gridHeader{
                  position:relative;
                  margin-top:0 !important;
                }
                
                #panelCurrentRow td:nth-child(2){
                  padding-left: 4px;
                  text-align: left;
                  width:26px !important;
                }
                `}</style>
              </React.Fragment>
            );
          }}
        </HotelSolicitationContext.Consumer>
      </HotelSolicitationContextProvider>
    );
  }
}
