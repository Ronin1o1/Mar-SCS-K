import React, { useEffect, useContext } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import styles from "./requestReport.css";
import Settings from "../static/Settings";
import CCheckbox from "../../../../common/components/CCheckbox";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import RequestReportContext from "../context/requestReportContext";
import CIFrame from "../../../../common/components/CIFrame";
import btnUnSelectAll from "./../../../../common/assets/img/button/btnUnSelectAll.gif";
import CPageTitle from "../../../../common/components/CPageTitle";

export const RequestReport: React.FC = () => {
  const {
    getRequestReportPanelData,
    FindFilterData,
    showFilterOptions,
    numItems,
    getshowFilterOptions,
    getFindFilter,
    filteredHotelList,
    onChangeFeildValue,
    selectedHotelId,
    deselectBtnClicked,
    showQuickSelectTop,
    quickSelectGrid1BtnClicked,
    quickSelectTopSaved,
    EdieRunReport,
    rightPanelViewGrid,
    reportURL,
    hiddenUrl,
    panelData,
    handleOrderChange,
    callCognosAPI,
    initialLoad,
    setRightPanelViewGrid,
  } = useContext(RequestReportContext);

  useEffect(() => {
    sessionStorage.setItem("onBckBtn", "false");
    try {
      getshowFilterOptions();
      getFindFilter();
      callCognosAPI();
    } catch (e) {}
  }, []);

  const viewObject = {
    view: Settings.viewObject.viewVertical,
    enableQuickSelectGrid1: true,
    deselectAll: true,
  };

  const hotelidCheckbox = (rowData, checkboxHotelId) => {
    return (
      <>
        {rowData.hotelid != null ? (
          <CCheckbox
            type={Settings.inputType.checkbox}
            id={Settings.hotelList + rowData.hotelid}
            name={Settings.hotelList + rowData.hotelid}
            onChangeHandler={(event) =>
              onChangeFeildValue(rowData, selectedHotelId, event)
            }
            checked={checkboxHotelId}
          ></CCheckbox>
        ) : (
          ""
        )}
      </>
    );
  };

  const gethotelSolicitAvailList = (data) => {
    const arr = [];
    if (data) {
      data?.map((element) => {
        const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
          selectedHotelId,
          element,
          Settings.tableColumns.hotelid.field
        );
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: hotelidCheckbox(element, checkboxHotelId),
          // checkboxHotelId_checked : checkboxHotelId,
          marshaCode: element[Settings.tableColumns.marshacode.field],
          hotelname: element[Settings.tableColumns.hotelName.field],
          city: element[Settings.tableColumns.city.field],
          state: element[Settings.tableColumns.state.field],
          country: element[Settings.tableColumns.country.field],
          futureopening: element[Settings.tableColumns.futureopening.field],
        };
        arr.push(obj);
      });
    }

    return arr;
  };

  const gridColumns = [
    {
      field: Settings.tableColumns.hotelid.field,

      style: { width: "25px", display: "none" },
    },

    {
      field: Settings.tableColumns.hotelidCheckbox.field,

      style: { width: "20px", padding: "5px" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "55px", padding: "0 2px 0 2px" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelName.field,
      header: Settings.tableColumns.hotelName.header,
      optionnumber: 2,
      style: { width: "234px", padding: "0 2px 0 2px" },
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "104px", padding: "0px 0px 0px 2px" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "54px", padding: "0 2px 0 2px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "54px", textAlign: "center", padding: "0 2px 0 2px" },
      optionnumber: 5,
    },
    {
      field: Settings.tableColumns.futureopening.field,
      header: Settings.tableColumns.futureopening.header,
      style: { width: "60px", textAlign: "center", padding: "0 2px 0 2px" },
      optionnumber: 6,
    },
  ];

  const SaveQuickSelect = (param) => {
    quickSelectTopSaved(param, selectedHotelId);
  };

  const getGridDetails = () => {
    const availGrid = {
      availgridColumns: gridColumns,
      availgridRows: gethotelSolicitAvailList(filteredHotelList),
      id: Settings.gridTR,
      width: Settings.width631,
      scroll: "430px",
      borderTable: "2px solid #A39F9E",
      borderBottom: "0px",
      borderRight: "0px",
      containerWidth: "100%",
      initialLoad: initialLoad,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.row,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
    return availGrid;
  };

  const getEdieRunReport = (isDataChange, requestPayload) => {
    EdieRunReport(isDataChange, requestPayload);
  };

  const handleSorting = (param) => {
    const dataitem = JSON.parse(localStorage.getItem("gridPaneldata"));
    handleOrderChange(dataitem, param);
  };

  const selectedGrid = {};

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.SubContainer}>
          <CPageTitle
            compName={"requestReport"}
            title={"Pricing Reports : Request a Report"}
          ></CPageTitle>
          <table className={styles.fullHeight} cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr id="filterTR">
                <td valign="top">
                  <Filter
                    componentName={Settings.requestReport}
                    getPanelData={getRequestReportPanelData}
                    findFilters={FindFilterData}
                    showOptions={showFilterOptions}
                    filterViewLists={Settings.api.getFilterViewLists}
                    numItems={numItems}
                    EdieRunReport={getEdieRunReport}
                    isAccountRequired={false}
                    isCheckBoxes={true}
                    height="calc(100vh - 150px)"
                  />
                </td>
                <td
                  valign="top"
                  style={{
                    width: "100%",
                  }}
                >
                  {rightPanelViewGrid ? (
                    <FilteredDoubleGridSelect
                      viewObject={viewObject}
                      availGrid={getGridDetails()}
                      selectedGrid={selectedGrid}
                      deselectBtnClicked={deselectBtnClicked}
                      quickSelectTopSaved={SaveQuickSelect}
                      quickSelectGrid1BtnClicked={quickSelectGrid1BtnClicked}
                      showQuickSelectTop={showQuickSelectTop}
                      componentName={Settings.componentName}
                      handleOrderChange={handleSorting}
                    ></FilteredDoubleGridSelect>
                  ) : (
                    <div style={{}}>
                      <div>
                        <table className={styles.menuWdth100Height}>
                          <tr>
                            <td style={{ width: "400px" }}>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  localStorage.setItem("loadReport", "true");
                                  localStorage.setItem(
                                    "isDisabledRetrieve",
                                    "true"
                                  );
                                  sessionStorage.setItem("onBckBtn", "true");
                                  setRightPanelViewGrid(true);
                                }}
                              >
                                Back
                              </a>
                            </td>
                            <td className={styles.deselect}>
                              {" "}
                              <span>
                                <img src={btnUnSelectAll} />
                              </span>
                            </td>
                            <td className={styles.quickSelect}>
                              {" "}
                              <a
                                href="javascript:void(0);"
                                style={{
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {Settings.quickSelect}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div style={{ width: "100%" }}>
                        <CIFrame
                          src={reportURL}
                          id={Settings.banner}
                          width="99.6%"
                          height="calc(100vh - 150px)"
                          componentName={Settings.componentName}
                        ></CIFrame>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
      .requestreport{
        width:100%;
        overflow:auto;
      }
      .doublegriddata{
        width: auto !important;
      }
      .filermaindesign{
        max-height: inherit;
      }
      .virtualScrollGrid{
        height:calc(100vh - 180px) !important;
      } 
      #gridView{
        overflow:unset !important;
      }
      @media only screen and (max-width: 932px) {
        .doublegridcontainer{
          overflow: auto;
        }
        #gridView {
          height: calc(100vh - 192px);
          margin-top: 0 !important;
        }
        .doublegriddata{
          height: calc(100vh - 159px) !important;
        }
        .virtualScrollGrid {
          height: calc(100vh - 192px) !important;
        }
      }
      `}</style>
    </>
  );
};
