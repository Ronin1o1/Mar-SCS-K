import React, { useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import PortfolioOrganizationContext from "../context/PortfolioOrganizationContext";
import PortfolioOrganizationList from "./PortfolioOrganizationList";
import styles from "./PortfolioOrganization.css";
import Settings from "../static/Settings";
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
export const PortfolioOrganization: React.FC = () => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const location = useLocation();
  const history = useHistory();
  const prevLocation = usePrevious(location);
  const mounted = useRef();
  const {
    getFindFilter,
    getShowOptions,
    FindFilterData,
    showFilterOptions,
    getPortfolioOrganizationList,
    availData,
    selectData,
    getSelectListonLoad,
    getAvailListonLoad,
    AvailgridRows,
    SelectedgridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
    showadditionalInfo,
    setAvailgridRows,
    setSelectedgridRows,
    setshowQuickSelectTop,
    setshowQuickSelectBottom,
    setshowadditionalInfo,
    deselectBtnClicked,
    onChangeFeildValue,
    quickSelectTopSaved,
    quickSelectBottomSaved,
    quickSelectGrid1BtnClicked,
    quickSelectGrid2BtnClicked,
    selectBtnClicked,
    selectAllBtnClicked,
    unSelectBtnClicked,
    unSelectAllBtnClicked,
    panelData,
    setpanelData,
    setsendFromList,
    saveHandler,
    cancelHandler,
    numItemsSelected,
    numItems,
    handleOrderChange,
    handleOrderChangeSelect,
    getAvailList,
    getSelectList,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequest,
    isMakingRequestList,
    getPortfolioOrganizationListDup,
  } = useContext(PortfolioOrganizationContext);

  useEffect(() => {
    getShowOptions();
    getFindFilter();
    getAvailListonLoad();
    getSelectListonLoad();
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPortfolioOrganizationListDup(localStorage.getItem("port_Org"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("port_Org");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("port_Org");
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
    <div className={styles.MainContainer}>
      <div className={styles.BedTypeContainer}>
        <table className={styles.fullHeight} style={{ marginBottom: "8px" }}>
          <tr>
            <td className={styles.header}>{Settings.title}</td>
          </tr>
          <tr className={styles.headerHR}>
            <td style={{ height: 2 }} valign="top"></td>
          </tr>
        </table>
        <table className={`${styles.fullHeight} ${styles.filterdesign}`}>
          <tbody>
            <tr id="filterTR">
              <td
                valign="top"
                style={{ marginTop: "-18px", display: "inline-block" }}
              >
                <Filter
                  componentName="portfolioOrganization"
                  getPanelData={getPortfolioOrganizationList}
                  findFilters={FindFilterData}
                  showOptions={showFilterOptions}
                  filterViewLists={Settings.api.getFilterViewLists}
                  numItems={numItems}
                  numItemsSelected={numItemsSelected}
                  isDisplayTwoGridFilter={true}
                  isAccountRequired={true}
                  filterForTwoTables={handleFilterData}
                  isCheckBoxes={true}
                  isMakingRequest={isMakingRequest}
                />
              </td>
              <td valign="top" className={styles.rightContainer}>
                <PortfolioOrganizationList
                  panelData={panelData}
                  availData={availData}
                  selectData={selectData}
                  AvailgridRows={AvailgridRows}
                  SelectedgridRows={SelectedgridRows}
                  deselectBtnClicked={deselectBtnClicked}
                  onChangeFeildValue={onChangeFeildValue}
                  quickSelectTopSaved={quickSelectTopSaved}
                  quickSelectBottomSaved={quickSelectBottomSaved}
                  showQuickSelectTop={showQuickSelectTop}
                  showQuickSelectBottom={showQuickSelectBottom}
                  showadditionalInfo={showadditionalInfo}
                  quickSelectGrid1BtnClicked={quickSelectGrid1BtnClicked}
                  quickSelectGrid2BtnClicked={quickSelectGrid2BtnClicked}
                  selectBtnClicked={selectBtnClicked}
                  selectAllBtnClicked={selectAllBtnClicked}
                  unSelectBtnClicked={unSelectBtnClicked}
                  unSelectAllBtnClicked={unSelectAllBtnClicked}
                  saveHandler={saveHandler}
                  cancelHandler={cancelHandler}
                  handleOrderChange={handleOrderChange}
                  handleOrderChangeSelect={handleOrderChangeSelect}
                  initialLoadAvail={initialLoadAvail}
                  initialLoadSelect={initialLoadSelect}
                  isMakingRequest={isMakingRequest}
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
        height:calc(100vh - 134px) !important;
      }
      .portfolioorg{
        margin-top:0 !important;
      }
      #filterTR{
        display: inherit;
      }
      .profileorgdesignnew{
        min-width:710px;
      }
      @media only screen and (max-width: 910px){
        .hoelsolicitationlist{
          height:calc(50vh - 132px) !important;
        }
        #filterdiv {
          height: calc(100vh - 158px) !important;
        }
      }
      `}</style>
    </div>
  );
};
