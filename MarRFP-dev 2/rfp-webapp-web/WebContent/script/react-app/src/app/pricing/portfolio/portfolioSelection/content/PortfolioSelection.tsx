import React, { useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import PortfolioSelectionContext from "../context/PortfolioSelectionContext";
import PortfolioSelectionList from "./PortfolioSelectionList";
import styles from "./PortfolioSelection.css";
import Settings from "./../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "./../../../../common/components/ApplicationContext";
import { useLocation, useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
export const PortfolioSelection: React.FC = () => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const {
    getFindFilterData,
    getShowFilterOptions,
    findFilterData,
    showFilterOptions,
    getPortfolioSelectionList,
    getPortfolioSelectionListDup,
    availData,
    selectData,
    /**getSelectListOnLoad,
    getAvailListOnLoad,*/
    availGridRows,
    selectedGridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    deselectBtnClicked,
    onChangeFieldValue,
    quickSelectTopSaved,
    quickSelectBottomSaved,
    quickSelectGrid1BtnClicked,
    quickSelectGrid2BtnClicked,
    selectBtnClicked,
    selectAllBtnClicked,
    unSelectBtnClicked,
    unSelectAllBtnClicked,
    panelData,
    numItemsSelected,
    numItems,
    handleOrderChange,
    handleOrderChangeSelect,
    selectedAccount,
    getAvailList,
    getSelectList,
    isMakingRequest,
    initailLoadingAvail,
    initailLoadingSelect,
    isMakingRequestList,
  } = useContext(PortfolioSelectionContext);

  useEffect(() => {
    getShowFilterOptions();
    getFindFilterData();
    /**getAvailListOnLoad();
    getSelectListOnLoad();**/
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPortfolioSelectionListDup(localStorage.getItem("port_Sel"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("port_Sel");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("port_Sel");
    };
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

  const handleFilterData = (data, type) => {
    type === 1
      ? getAvailList(data)
      : type === 2
      ? getSelectList(data)
      : (getAvailList(data), getSelectList(data));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.bodyContainer}>
        <table className={styles.section}>
          <tr>
            <td className={styles.header}>{Settings.title}</td>
          </tr>
          <tr className={styles.headerHR}>
            <td style={{ height: 2 }} valign="top"></td>
          </tr>
        </table>
        <table className={styles.section}>
          <tbody>
            <tr>
              <td valign="top" className={styles.filterSection}>
                <Filter
                  componentName="PortfolioSelection"
                  getPanelData={getPortfolioSelectionList}
                  findFilters={findFilterData}
                  showOptions={showFilterOptions}
                  filterViewLists={Settings.api.getFilterViewLists}
                  numItems={numItems}
                  numItemsSelected={numItemsSelected}
                  isDisplayTwoGridFilter={true}
                  filterForTwoTables={handleFilterData}
                  isCheckBoxes={true}
                  isMakingRequest={isMakingRequest}
                  isAccountRequired={
                    showFilterOptions.pfo &&
                    showFilterOptions.pfo.requiredOptions.accountRequired
                  }
                />
              </td>
              <td valign="top" className={styles.rightContainer}>
                <PortfolioSelectionList
                  panelData={panelData}
                  availData={availData}
                  selectData={selectData}
                  availGridRows={availGridRows}
                  selectedGridRows={selectedGridRows}
                  deselectBtnClicked={deselectBtnClicked}
                  onChangeFieldValue={onChangeFieldValue}
                  quickSelectTopSaved={quickSelectTopSaved}
                  quickSelectBottomSaved={quickSelectBottomSaved}
                  showQuickSelectTop={showQuickSelectTop}
                  showQuickSelectBottom={showQuickSelectBottom}
                  quickSelectGrid1BtnClicked={quickSelectGrid1BtnClicked}
                  quickSelectGrid2BtnClicked={quickSelectGrid2BtnClicked}
                  selectBtnClicked={selectBtnClicked}
                  selectAllBtnClicked={selectAllBtnClicked}
                  unSelectBtnClicked={unSelectBtnClicked}
                  unSelectAllBtnClicked={unSelectAllBtnClicked}
                  handleOrderChange={handleOrderChange}
                  handleOrderChangeSelect={handleOrderChangeSelect}
                  selectedAccount={selectedAccount}
                  isMakingRequest={isMakingRequest}
                  initailLoadingAvail={initailLoadingAvail}
                  initailLoadingSelect={initailLoadingSelect}
                  isMakingRequestList={
                    isMakingRequestList && isMakingRequestList.current
                      ? isMakingRequestList.current
                      : []
                  }
                  appContext={appContext}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <style>{`
       #filterdiv{
          height:calc(100vh - 136px) !important;
      }
      .virtualScrollGrid{
        height: calc(50vh - 125px);
      }
      .solitationseegrid {
        margin-top:-5px;
      }
      @media only screen and (max-width: 1050px){
        .hoelsolicitationlist{
          height:calc(50vh - 135px) !important;
        }
        #filterdiv {
          height: calc(100vh - 165px) !important;
        }
        .page_body_container {
          min-height: calc(100vh - 90px) !important;
        }
      }
      .loaderImgAvailList3{
        height: 43.5%;
        width: 60%;
      }
      @media only screen and (min-width: 1920px){
        .loaderImgAvailList3{
          height: 45%;
          width: 46%;
        }
      }
      `}</style>
    </div>
  );
};
