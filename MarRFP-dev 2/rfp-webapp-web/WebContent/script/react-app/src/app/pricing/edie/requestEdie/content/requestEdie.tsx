import React, { useEffect, useContext, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import styles from "./requestEdie.css";
import Settings from "./../static/Settings";
import CCheckbox from "../../../../common/components/CCheckbox";
import FilteredGridSelectUtils from "../../../../shared/utils/FilteredGridSelectUtils";
import FilteredDoubleGridSelect from "../../../../shared/components/FilteredDoubleGridSelect";
import RequestEdieContext from "./../context/requestEdieContext";
import CIFrame from "../../../../common/components/CIFrame";
import btnUnSelectAll from "./../../../../common/assets/img/button/btnUnSelectAll.gif";
import CPageTitle from "../../../../common/components/CPageTitle";
import { CLoader } from "../../../../common/components/CLoader";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
export const RequestEdie: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const {
    getRequestEdiePanelData,
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
    isLoading,
    setIsLoading,
  } = useContext(RequestEdieContext);

  useEffect(() => {
    sessionStorage.setItem("requestEdieBckBtn", "false");
    try {
      getshowFilterOptions();
      getFindFilter();
      callCognosAPI();
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        prevLocation?.key != location?.key &&
        prevLocation?.pathname == location?.pathname
      ) {
        history.push("/temp");
        history.goBack();
      }
    }
  });

  const viewObject = {
    view: Settings.viewObject.viewVertical,
    enableQuickSelectGrid1: true,
    deselectAll: true,
    gridType: "single", // "double"
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
      data.map((element) => {
        const checkboxHotelId = FilteredGridSelectUtils.getCheckboxStatus(
          selectedHotelId,
          element,
          Settings.tableColumns.hotelid.field
        );
        const obj = {
          hotelid: element[Settings.tableColumns.hotelid.field],
          hotelidCheckbox: hotelidCheckbox(element, checkboxHotelId),
          checkboxHotelId_checked: checkboxHotelId,
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

      style: { width: "24px", minWidth: "24px", paddingLeft: "6px" },
    },
    {
      field: "checkboxHotelId_checked",

      style: { width: "25px", display: "none" },
    },
    {
      field: Settings.tableColumns.marshacode.field,
      header: Settings.tableColumns.marshacode.header,
      style: { width: "68px", minWidth: "68px" },
      optionnumber: 1,
    },
    {
      field: Settings.tableColumns.hotelName.field,
      header: Settings.tableColumns.hotelName.header,
      optionnumber: 2,
      style: { width: "228px", minWidth: "228px" },
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "104px", minWidth: "104px", textAlign: "left" },
      optionnumber: 3,
    },
    {
      field: Settings.tableColumns.state.field,
      header: Settings.tableColumns.state.header,
      style: { width: "54px", minWidth: "54px" },
      optionnumber: 4,
    },
    {
      field: Settings.tableColumns.country.field,
      header: Settings.tableColumns.country.header,
      style: { width: "54px", minWidth: "54px" },
      optionnumber: 5,
    },
    {
      field: Settings.tableColumns.futureopening.field,
      header: Settings.tableColumns.futureopening.header,
      style: { width: "70px", minWidth: "70px" },
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
      width: "629px",
      // scroll: "430px",
      borderTable: "2px solid black",
      borderBottom: "0px",
      containerWidth: "100%",
      initialLoad: initialLoad,
      quickSelectObject: {
        label: Settings.quickSelectObject.label,
        textareaId: Settings.quickSelectObject.textareaId,
        rows: Settings.quickSelectObject.rows,
        cols: Settings.quickSelectObject.cols,
        textareaName: Settings.quickSelectObject.textareaName,
      },
    };
    return availGrid;
  };

  const getEdieRunReport = (requestPayload) => {
    EdieRunReport(panelData, requestPayload);
  };

  const handleSorting = (param) => {
    handleOrderChange(panelData, param);
  };

  const selectedGrid = {};

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.SubContainer}>
          <CPageTitle title="Pricing Reports : EDIE"></CPageTitle>
          <table className={styles.fullHeight} cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr id="filterTR">
                <td valign="top">
                  <Filter
                    componentName={Settings.requestEdie}
                    getPanelData={getRequestEdiePanelData}
                    findFilters={FindFilterData}
                    showOptions={showFilterOptions}
                    filterViewLists={Settings.api.getFilterViewLists}
                    numItems={numItems}
                    EdieRunReport={getEdieRunReport}
                    isAccountRequired={false}
                  />
                </td>
                <td valign="top" style={{ width: "100%" }}>
                  {isLoading ? (
                    <CLoader></CLoader>
                  ) : (
                    <>
                      {rightPanelViewGrid ? (
                        <FilteredDoubleGridSelect
                          viewObject={viewObject}
                          availGrid={getGridDetails()}
                          selectedGrid={selectedGrid}
                          deselectBtnClicked={deselectBtnClicked}
                          quickSelectTopSaved={SaveQuickSelect}
                          quickSelectGrid1BtnClicked={
                            quickSelectGrid1BtnClicked
                          }
                          showQuickSelectTop={showQuickSelectTop}
                          componentName={Settings.componentName}
                          handleOrderChange={handleSorting}
                        ></FilteredDoubleGridSelect>
                      ) : (
                        <div style={{ marginTop: "1px" }}>
                          <div>
                            <table className="menuWdth100-Height">
                              <tr>
                                <td style={{ width: "400px" }}>
                                  <a
                                    href="javascript:void(0);"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "loadReport",
                                        "true"
                                      );
                                      localStorage.setItem(
                                        "isDisabledRetrieve",
                                        "true"
                                      );
                                      setRightPanelViewGrid(true);

                                      sessionStorage.setItem(
                                        "requestEdieBckBtn",
                                        "true"
                                      );
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
                                  <a href="javascript:void(0);">
                                    {Settings.quickSelect}
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div
                            style={{
                              border: "2px solid gray",
                              height: "calc(100vh - 140px)",
                              borderBottomWidth: "0",
                            }}
                          >
                            <CIFrame
                              src={reportURL}
                              // hiddenSrc={hiddenUrl}
                              id={Settings.banner}
                              componentName={"requestEdie"}
                              width="100%"
                              height="100%"
                              border="0"
                            ></CIFrame>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .field_Name{
          font-weight:bold;
        }
        .ediereq td{
          font-weight:normal;
        }
        #filterdiv{
          height:calc(100vh - 138px) !important;
        }
        #gridTR td, #gridTR th{
          vertical-align: middle;
          padding-left:2px;
        }
        .doublegriddata{
          overflow:unset !important;
        }
        #gridView{
          height: calc(100vh - 175px);
          margin-top:0 !important;
        }
        #panelCurrentRow td:last-child{
          width:55px !important;
          min-width:55px !important;
        }
        .cbcreq tr td{
          font-weight:bold !important;
        }
        .gridheaderdata{
          overflow: unset;
          position: relative;
        }
        .virtualScrollGrid {
          height: calc(100vh - 180px) !important;
        }
        #accountFilter > tr{
          border-top:1px solid rgb(128, 128, 128);
          display:block;
        }
        .field_Name tr td{
          vertical-align: middle;
        }
        @media only screen and (min-width: 1920px) {
          .pricingreports{
            height:auto;
          }
          #filterdiv, .doublegriddata {
              height: calc(100vh - 141px) !important;
          }
          #gridView{
            height:calc(100vh - 179px) !important ;
          }
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
            height: calc(100vh - 156px) !important;
          }
          .virtualScrollGrid {
            height: calc(100vh - 192px) !important;
          }
        }
        #loading{
          width: calc(100vw - 301px) !important;
          height: 82vh !important;
          top: 48px !important;
        }
      `}</style>
    </>
  );
};
