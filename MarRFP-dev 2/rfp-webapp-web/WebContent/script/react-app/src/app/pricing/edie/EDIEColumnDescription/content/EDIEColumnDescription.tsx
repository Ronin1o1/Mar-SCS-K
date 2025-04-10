import React, { Component } from "react";
//import CDataTable from "../../../../common/components/CDataTable";
import SearchBtnImg from "../../../../common/assets/img/button/btnSearch.gif";
import UpdateBtnImg from "../../../../common/assets/img/button/btnUpdate.gif";
import EDIEColumnDescriptionContext, {
  EDIEColumnDescriptionContextProvider,
} from "../context/EDIEColumnDescriptionContext";
import Settings from "../static/Settings";
import styles from "./EDIEColumnDescription.css";
import Interceptors from "../../../../common/components/Interceptors";

import API from "../service/API";
import Utils from "../../../../common/utils/Utils";
//import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
//import Grid from "../../../../shared/components/grid";
import { CLoader } from "../../../../common/components/CLoader";
import EdieColumnDescGrid from "../../../../shared/components/EdieColumnDescGrid";

let contextType = null;
interface IProps {}
interface IState {}
export default class EDIEColumnDescrition extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      Selected: null,
    };
  }
  viewObject = {
    view: "Vertical",

    gridType: "single", // "double"
  };
  componentDidUpdate(prevProps, prevState) {
    const location = this.props?.history?.location;
    const prevLocation = prevProps?.location;
    if (
      prevLocation?.key != location?.key &&
      prevLocation?.pathname == location?.pathname
    ) {
      this.props.history.push("/temp");
      this.props.history.goBack();
    }
  }
  componentDidMount() {
    contextType.setIsLoading(true);
    API.getColumnDesc().then((data) => {
      const setEDIEColumnDescData = {
        ...contextType.state.setEDIEColumnDescData,
      };

      setEDIEColumnDescData.data = data;

      const setEDIEColumnDescDataFilteredValue = {
        ...contextType.state.setEDIEColumnDescDataFilteredValue,
      };
      setEDIEColumnDescDataFilteredValue.data = data;
      contextType.setState({
        ...contextType.state,
        isComplete: true,
        isSeqSelected: false,
        setEDIEColumnDescData: setEDIEColumnDescData,
        setEDIEColumnDescDataFilteredValue: setEDIEColumnDescDataFilteredValue,
      });

      const newFindEdieData = {
        ...contextType.initialEDIEColumnDescData.EDIEColumnDescData,
      };
      newFindEdieData.data = data;
      contextType.setInitialEDIEColumnDescData(newFindEdieData);

      contextType.setIsLoading(false);
    });
  }

  idSeqBodyTemplate = (rowData) => {
    return (
      <td className={styles.textPos}>
        <div className={styles.gridCell}>
          <span>{rowData.column_seq}</span>
        </div>
      </td>
    );
  };
  coldetailsBodyTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <td className={styles.textPos}>
          {" "}
          <span>{rowData.column_label}</span>
        </td>
      </div>
    );
  };
  textAreaBodyPathTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <textarea
          id={Settings.edieColumnDesc.tableColumns.epicPath.id}
          name={Settings.edieColumnDesc.tableColumns.epicPath.name}
          rows={2}
          className={styles.textBoxStyling}
          value={rowData.epic_path}
          onChange={(event) => contextType.handleChange(event, rowData)}
          onKeyPress={(e) => Utils.fnkychars_onkeypress(e, 500)}
        />
      </div>
    );
  };
  textAreaBodyPathLogicTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <textarea
          id={Settings.edieColumnDesc.tableColumns.edieLogic.id}
          name={Settings.edieColumnDesc.tableColumns.edieLogic.name}
          rows={2}
          className={styles.textBoxStyling}
          value={rowData.logic}
          onChange={(event) => contextType.handleChange(event, rowData)}
          onKeyPress={(e) => Utils.fnkychars_onkeypress(e, 500)}
        />
      </div>
    );
  };
  textAreaBodyPathDescTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <textarea
          id={Settings.edieColumnDesc.tableColumns.ediedescription.id}
          name={Settings.edieColumnDesc.tableColumns.ediedescription.id}
          rows={2}
          className={styles.textBoxStylingDesc}
          value={rowData.column_desc}
          onChange={(event) => contextType.handleChange(event, rowData)}
          onKeyPress={(e) => Utils.fnkychars_onkeypress(e, 500)}
        />
      </div>
    );
  };
  gethotelSolicitAvailList = (data) => {
    const arr = [];
    if (data) {
      data.map((element) => {
        const obj = {
          column_seq: this.idSeqBodyTemplate(element),
          column_label: this.coldetailsBodyTemplate(element),
          epic_path: this.textAreaBodyPathTemplate(element),
          logic: this.textAreaBodyPathLogicTemplate(element),
          column_desc: this.textAreaBodyPathDescTemplate(element),
          id: element.column_seq,
        };
        arr.push(obj);
      });
    }

    return arr;
  };

  getGridDetails = () => {
    const availGrid = {
      availgridColumns: this.getColumns(),
      availgridRows: this.gethotelSolicitAvailList(
        contextType.state.setEDIEColumnDescData.data
      ),
      id: "gridTR",
    };
    return availGrid;
  };
  selectedGrid = {};

  getColumns = () => {
    const columns = [
      {
        field: Settings.edieColumnDesc.tableColumns.id.field,
        header: Settings.edieColumnDesc.tableColumns.id.header,
        body: this.idSeqBodyTemplate,
        style: {
          width: "30px",
          height: "21px",
          minWidth: "30px",
          textAlign: "left",
          verticalAlign: "middle",
        },
      },
      {
        field: Settings.edieColumnDesc.tableColumns.colDetails.field,
        header:
          Settings.edieColumnDesc.tableColumns.colDetails.header +
          " (" +
          contextType.state.setEDIEColumnDescData.data.length +
          ")",
        body: this.coldetailsBodyTemplate,
        style: {
          width: "280px",
          height: "21px",
          minWidth: "280px",
          textAlign: "left",
          verticalAlign: "middle",
        },
      },
      {
        field: Settings.edieColumnDesc.tableColumns.path.field,
        header: Settings.edieColumnDesc.tableColumns.path.header,
        body: this.textAreaBodyPathTemplate,
        style: {
          width: "390px",
          minWidth: "390px",
          height: "21px",

          textAlign: "left",
        },
      },
      {
        field: Settings.edieColumnDesc.tableColumns.logic.field,
        header: Settings.edieColumnDesc.tableColumns.logic.header,
        body: this.textAreaBodyPathLogicTemplate,
        style: {
          width: "390px",
          minWidth: "390px",
          height: "21px",

          textAlign: "left",
        },
      },
      {
        field: Settings.edieColumnDesc.tableColumns.description.field,
        header: Settings.edieColumnDesc.tableColumns.description.header,
        body: this.textAreaBodyPathDescTemplate,
        style: {
          height: "21px",
          width: "430px",
          minWidth: "430px",
          textAlign: "left",
        },
      },
    ];
    return columns;
  };

  render() {
    return (
      <EDIEColumnDescriptionContextProvider>
        <EDIEColumnDescriptionContext.Consumer>
          {(edieColumnDescContext) => {
            contextType = edieColumnDescContext;

            const seqId = contextType.state.findSeq
              ? contextType.state.findSeq
              : "";
            return (
              <React.Fragment>
                <Interceptors spinnerFlag={true} />
                <div className={styles.edieHotelDescOuterTable}>
                  <div className={styles.pagetitle}>
                    <h2>{Settings.pageTitle}</h2>
                  </div>
                  <div className={styles.filter}>
                    <table
                      className={styles.zeroHeight}
                      style={{
                        borderTopWidth: "1px",
                        borderBottomStyle: "solid",
                        borderRightWidth: "1px",
                        borderLeftStyle: "solid",
                        borderTopStyle: "solid",
                        borderBottomWidth: "1px",
                        borderRightStyle: "solid",
                        borderLeftWidth: "1px",
                        borderColor: "#cccccc",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              className={`${styles.Filter} ${styles.zeroHeight}`}
                            >
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td className="FilterFieldName"></td>
                                  <td>
                                    <input
                                      type="radio"
                                      name={Settings.edieColumnDesc.name}
                                      id={Settings.edieColumnDesc.showAll.id}
                                      checked={
                                        contextType.state.radio === "c_1"
                                      }
                                      value={
                                        Settings.edieColumnDesc.showAll.value
                                      }
                                      onChange={(e) =>
                                        contextType.edieChangeHandler(e)
                                      }
                                    />
                                    <label
                                      htmlFor={
                                        Settings.edieColumnDesc.showAll.value
                                      }
                                    >
                                      {Settings.edieColumnDesc.showAll.label}
                                    </label>
                                  </td>
                                </tr>
                                <tr>
                                  {" "}
                                  <td id="FilterFieldName">
                                    {Settings.edieColumnDesc.findEdie.label}
                                    <input
                                      style={{ width: "50px" }}
                                      name={Settings.edieColumnDesc.seqfind}
                                      id={Settings.edieColumnDesc.findEdie.id}
                                      value={
                                        contextType.state.searchedEDIECol
                                          .seqfind
                                      }
                                      onChange={(e) =>
                                        contextType.edieChangeHandler(e)
                                      }
                                    />
                                  </td>
                                  <td id="FilterFieldName"></td>
                                  <td>
                                    <input
                                      type="radio"
                                      name={Settings.edieColumnDesc.sname}
                                      id={Settings.edieColumnDesc.showAll.id}
                                      checked={
                                        contextType.state.radio === "c_2"
                                      }
                                      value={
                                        Settings.edieColumnDesc.showColumn.value
                                      }
                                      onChange={(e) =>
                                        contextType.edieChangeHandler(e)
                                      }
                                    />
                                    {Settings.edieColumnDesc.showColumn.label}
                                    <input
                                      type="text"
                                      name={
                                        Settings.edieColumnDesc.colfind.name
                                      }
                                      id={Settings.edieColumnDesc.colfind.id}
                                      onChange={(e) =>
                                        contextType.edieChangeHandler(e)
                                      }
                                      value={
                                        contextType.state.searchedEDIECol
                                          .colfind
                                      }
                                      style={{ width: "370px" }}
                                    />
                                  </td>
                                  <td id="FilterFieldName"></td>
                                  <td
                                    style={{
                                      width: "70px",
                                    }}
                                  >
                                    <img
                                      className={styles.searchBtnStyle}
                                      src={SearchBtnImg}
                                      alt={Settings.edieColumnDesc.btnSearch}
                                      onClick={() =>
                                        contextType.onSearchBtnClicked()
                                      }
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={styles.updateBtnStyle}>
                      <a>
                        <img
                          src={UpdateBtnImg}
                          alt={Settings.edieColumnDesc.btnUpdate}
                          onClick={() => contextType.onUpdateBtnClicked()}
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className={`${styles.dataTableContainer} ${styles.gridScroll}`}
                  >
                    {!contextType.isLoading && (
                      <EdieColumnDescGrid
                        id="gridTR"
                        columns={this.getColumns()}
                        value={this.gethotelSolicitAvailList(
                          contextType.state.setEDIEColumnDescData.data
                        )}
                        width="1534px"
                        height={contextType.state.gridHeight}
                        seqfind={seqId}
                        componentName="ColumnDesc"
                        gridNo="1"
                      ></EdieColumnDescGrid>
                    )}
                  </div>
                  <style>{`
                      .p-datatable-scrollable-header-box{
                      margin-right:0px !important;
                      } 
                      .ediecolumndescripton{
                        height:auto !important;
                      }
                      .virtualScrollGrid{
                        height: calc(100vh - 206px) !important;
                        width: 1534px !important;
                        overflow: hidden auto;                        
                      }
                      #gridHeader tr th, .ediecolumndescripton tr td{
                        padding:0 1px !important;
                      }
                      #gridHeader tr th{
                        padding:0 1px !important;
                      }
                      #gridHeader{
                        width:1534px;
                      }
                      #gridTableHeader th:nth-child(3){
                        width:389px !important;
                        min-width:389px !important;
                      }
                      #gridTableHeader th{
                        padding-left:2px !important;
                      }
                      @media only screen and (max-width: 1534px) {
                        .virtualScrollGrid {
                          height: calc(100vh - 223px) !important;                          
                        }
                      }
                    `}</style>
                  {contextType.isLoading && <CLoader></CLoader>}
                </div>
              </React.Fragment>
            );
          }}
        </EDIEColumnDescriptionContext.Consumer>
      </EDIEColumnDescriptionContextProvider>
    );
  }
}
