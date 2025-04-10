import React, { Fragment, useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import PgoosPropagationList from "./PgoosPropagationList";
import styles from "./PGOOSPropagation.css";
import Settings from "../static/Settings";
import PgoosPropagationContext from "../context/PGOOSPropagationContext";
import { withRouter } from "react-router-dom";
import { PgoosPropagationFinish } from "./PgoosPropagationFinish";
import { CLoader } from "../../../../common/components/CLoader";
import { PgoosPropagationFinishPage } from "./PgoosPropagationFinishPage";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import { useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const PgoosPropagation: React.FC = () => {
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
    getPgoosPropagationList,
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
    deselectBtnClicked,
    panelData,
    numItemsSelected,
    numItems,
    handleOrderChange,
    handleOrderChangeSelect,
    getAvailList,
    getSelectList,
    deleteAPIUpdate,
    getbatchId,
    pgoospropsuccess,
    pgoosStatus,
    getPgoosStatus,
    pgoosRunPropagationData,
    pgoosPropagationFinalPage,
    getResetPgoosBatch,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequest,
    getResetPgoosSelect,
    getResetPgoosAvail,
    setPgoosPropagationFinalPage,
    getPgoosPropagationListDup,
    isMakingRequestList,
  } = useContext(PgoosPropagationContext);

  const resetPgoosState = () => {
    getResetPgoosSelect();
    getResetPgoosAvail();
    getPgoosStatus();
    getShowOptions();
    getFindFilter();
  };

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

  useEffect(() => {
    //Changing the condition for refresh for optimization
    if (
      window.performance.navigation.type == 1 ||
      window.location.href.indexOf("batchId") === -1
    ) {
      resetPgoosState();
    } else {
      setPgoosPropagationFinalPage(true);
    }
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getPgoosPropagationListDup(localStorage.getItem("pgs_Prop"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("pgs_Prop");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("pgs_Prop");
    };
  }, []);

  useEffect(() => {
    if (appContext.pgoosPropRefresh) {
      setPgoosPropagationFinalPage(false);
      resetPgoosState();
      appContext.setPgoosPropRefresh(false);
    }
  }, [appContext.pgoosPropRefresh]);

  const handleFilterData = (data, type) => {
    type === 1
      ? getAvailList(data)
      : type === 2
      ? getSelectList(data)
      : (getAvailList(data), getSelectList(data));
  };

  // const handleDeleteUpdate = (param) => { alert("dfd"); deleteAPIUpdate(param) }
  return (
    <Fragment>
      {pgoosPropagationFinalPage ? (
        <PgoosPropagationFinishPage />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.bodyContainer} style={{ overflowY: "auto" }}>
            <div className={styles.section2}>
                <p className={classNames(styles.header, "header")}>{Settings.title}</p>
            </div>
            {pgoosStatus === "" ? (
              <CLoader />
            ) : pgoosStatus === "success" ||
              pgoosStatus === "SUCCESS" ||
              pgoospropsuccess ? (
              <PgoosPropagationFinish
                pgoosRunPropagationData={pgoosRunPropagationData}
                getResetPgoosBatch={getResetPgoosBatch}
              />
            ) : (
              <table className={styles.section}>
                <tbody>
                  <tr>
                    <td valign="top" className={styles.filterSection}>
                      <Filter
                        componentName="PgoosPropagation"
                        getPanelData={getPgoosPropagationList}
                        findFilters={FindFilterData}
                        filterViewLists={Settings.api.getFilterViewLists}
                        showOptions={showFilterOptions}
                        numItems={numItems}
                        numItemsSelected={numItemsSelected}
                        isAccountRequired={false}
                        isDisplayTwoGridFilter={true}
                        filterForTwoTables={handleFilterData}
                        deleteAPIUpdate={deleteAPIUpdate}
                        getbatchId={getbatchId}
                        isCheckBoxes={true}
                        isMakingRequest={isMakingRequest}
                      />
                    </td>
                    <td valign="top">
                      <PgoosPropagationList
                        panelData={panelData}
                        availData={availData}
                        selectData={selectData}
                        AvailgridRows={AvailgridRows}
                        deselectBtnClicked={deselectBtnClicked}
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
                        initialLoadAvail={initialLoadAvail}
                        initialLoadSelect={initialLoadSelect}
                        isMakingRequest={isMakingRequest}
                        isMakingRequestList={isMakingRequestList}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <style>{`
          #loading{
            text-align: center;
            width: 100%;
            height: calc(100vh - 172px) !important;
          }
          `}</style>
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(PgoosPropagation);
