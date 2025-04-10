import React, { useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import CBCrequestContext from "../context/CBCrequestContext";
import CBCrequestList from "./CBCrequestList";
import styles from "./CBCrequest.css";
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
export const CBCrequest: React.FC = () => {
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
    getCBCRequestList,
    availData,
    selectData,

    AvailgridRows,
    SelectedgridRows,
    showQuickSelectTop,
    showQuickSelectBottom,
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
    numItemsSelected,
    numItems,
    handleOrderChange,
    handleOrderChangeSelect,
    getAvailList,
    getSelectList,
    isMakingRequest,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequestList,
    getCBCRequestListDup,
  } = useContext(CBCrequestContext);

  useEffect(() => {
    getShowOptions();
    getFindFilter();
    // getAvailListonLoad();
    // getSelectListonLoad();
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getCBCRequestListDup(localStorage.getItem("port_CBCReq"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("port_CBCReq");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("port_CBCReq");
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
      <div className={styles.bodymainContainer}>
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
                  componentName="cbcRequest"
                  getPanelData={getCBCRequestList}
                  findFilters={FindFilterData}
                  filterViewLists={Settings.api.getFilterViewLists}
                  showOptions={showFilterOptions}
                  numItems={numItems}
                  numItemsSelected={numItemsSelected}
                  isAccountRequired={true}
                  isDisplayTwoGridFilter={true}
                  filterForTwoTables={handleFilterData}
                  isCheckBoxes={true}
                  isMakingRequest={isMakingRequest}
                />
              </td>
              <td valign="top" className={styles.rightContainer}>
                <CBCrequestList
                  panelData={panelData}
                  availData={availData}
                  selectData={selectData}
                  AvailgridRows={AvailgridRows}
                  SelectedgridRows={SelectedgridRows}
                  onChangeFeildValue={onChangeFeildValue}
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
                  isMakingRequest={isMakingRequest}
                  initialLoadAvail={initialLoadAvail}
                  initialLoadSelect={initialLoadSelect}
                  isMakingRequestList={isMakingRequestList}
                  appContext={appContext}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <style>{`
       #filterdiv{
          height:calc(100vh - 135px) !important;
      }
      .doublegriddata {
        overflow: revert !important;
        display: flow-root !important;
      }
      .doublegridcontainer{
        min-width: 680px;
      }
      .filermaindesign{
        max-height: none;
      }
      #gridView #loading{
        width:578px !important;
      }
      #loading{
        width:656px !important;
        height:calc(50vh - 125px) !important;
      }
      .doublegriddata  #panelCurrentRow td:last-child{
        width: 50px !important;
        min-width: 50px !important;
      }
      @media only screen and (max-width: 960px){
        .hoelsolicitationlist{
          height:calc(50vh - 135px) !important;
        }
        #filterdiv {
          height: calc(100vh - 155px) !important;
        }
        .page_body_container{
          min-height: calc(100vh - 90px) !important;
        }
      }
      
      `}</style>
    </div>
  );
};
