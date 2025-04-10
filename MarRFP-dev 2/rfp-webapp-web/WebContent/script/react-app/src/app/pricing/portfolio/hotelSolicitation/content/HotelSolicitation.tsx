import React, { useContext, useEffect, useRef } from "react";
import { Filter } from "../../../../common/components/filter/Filter";
import HotelSolicitationContext from "../context/HotelSolicitationContext";
import HotelSolicitationList from "./HotelSolicitationList";
import styles from "./HotelSolicitation.css";
import Settings from "./../static/Settings";
import CPageTitle from "../../../../common/components/CPageTitle";
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
export const HotelSolicitation: React.FC = () => {
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
    getHotelSolicitationList,
    availData,
    selectData,
    getSelectListonLoad,
    getAvailListonLoad,
    AvailgridRows,
    SelectedgridRows,
    initialSelectedgridRows,
    setInitialSelectedgridRows,
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
    directSelectBottomSaved,
    quickSelectGrid1BtnClicked,
    quickSelectGrid2BtnClicked,
    showDirectSelectBottom,
    setShowDirectSelectBottom,
    directSelectGrid2BtnClicked,
    clearDirectSelect,
    selectBtnClicked,
    selectAllBtnClicked,
    unSelectBtnClicked,
    unSelectAllBtnClicked,
    panelData,
    setpanelData,
    SendEmailOnclick,
    sendMailCheckboxUpdated,
    sendMail,
    setSendMailData,
    additionalInfoBtnClicked,
    sendMailErrorMessage,
    setsenMailMessagePopup,
    senMailMessagePopup,
    sendFromList,
    setsendFromList,
    saveHandler,
    cancelHandler,
    numItemsSelected,
    numItems,
    handleOrderChange,
    handleOrderChangeSelect,
    closeAdditionalInfoButton,
    getAvailList,
    getSelectList,
    initialLoadAvail,
    initialLoadSelect,
    isMakingRequest,
    isMakingRequestList,
    isMakingRequestAvailList,
    getHotelSolicitationListDup,
  } = useContext(HotelSolicitationContext);

  useEffect(() => {
    getShowOptions();
    getFindFilter();
    if (window?.performance?.navigation?.type == 2) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        getHotelSolicitationListDup(localStorage.getItem("Hot_Sol"));
      }
    }
    if (window?.performance?.navigation?.type == 1) {
      if (localStorage.getItem("setLocalStorage") == "Y") {
        localStorage.removeItem("setLocalStorage");
        localStorage.removeItem("Hot_Sol");
      }
    }

    return () => {
      localStorage.removeItem("setLocalStorage");
      localStorage.removeItem("Hot_Sol");
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
        <CPageTitle title={Settings.title}></CPageTitle>
        <table className={`${styles.fullHeight} ${styles.solicitation}`}>
          <tbody>
            <tr id="filterTR">
              <td valign="top">
                <Filter
                  componentName="hotelSolicitation"
                  getPanelData={getHotelSolicitationList}
                  findFilters={FindFilterData}
                  showOptions={showFilterOptions}
                  filterViewLists={Settings.api.getFilterViewLists}
                  numItems={numItems}
                  numItemsSelected={numItemsSelected}
                  isAccountRequired={true}
                  isDisplayTwoGridFilter={true}
                  filterForTwoTables={handleFilterData}
                  isCheckBoxes={true}
                  isMakingRequest={isMakingRequest}
                  isMakingRequestAvailList={isMakingRequestAvailList}
                />
              </td>
              <td valign="top" className={styles.rightContainer}>
                <HotelSolicitationList
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
                  SendEmailOnclick={SendEmailOnclick}
                  sendMailCheckboxUpdated={sendMailCheckboxUpdated}
                  sendMail={sendMail}
                  additionalInfoBtnClicked={additionalInfoBtnClicked}
                  sendMailErrorMessage={sendMailErrorMessage}
                  setsenMailMessagePopup={setsenMailMessagePopup}
                  senMailMessagePopup={senMailMessagePopup}
                  sendFromList={sendFromList}
                  saveHandler={saveHandler}
                  cancelHandler={cancelHandler}
                  handleOrderChange={handleOrderChange}
                  handleOrderChangeSelect={handleOrderChangeSelect}
                  closeAdditionalInfoButton={closeAdditionalInfoButton}
                  initialLoadAvail={initialLoadAvail}
                  initialLoadSelect={initialLoadSelect}
                  isMakingRequest={isMakingRequest}
                  isMakingRequestAvailList={isMakingRequestAvailList}
                  isMakingRequestList={
                    isMakingRequestList && isMakingRequestList.current
                      ? isMakingRequestList.current
                      : []
                  }
                  appContext={appContext}
                  initialSelectedgridRows={initialSelectedgridRows}
                  directSelectBottomSaved={directSelectBottomSaved}
                  showDirectSelectBottom={showDirectSelectBottom}
                  directSelectGrid2BtnClicked={directSelectGrid2BtnClicked}
                  clearDirectSelect={clearDirectSelect}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <style>{`
       #filterdiv{
          height:calc(100vh - 141px) !important;
      }
      #filterTR{
        display:block;
      }
      .profileorgdesignnew{
        min-width:980px;
      }
      .virtualScrollGrid{
        height:calc(50vh - 139px) !important;
        scroll-behavior: smooth;
      }
      .loaderImgAvailList{
        position: absolute;
        height: calc(50vh - 137px) !important;
        width:700px !important
      }
      .loaderImgAvailList2{
        height: calc(50vh - 137px) !important;
        width:980px;
      }
      @media only screen and (min-width: 1920px){
        .virtualScrollGrid{
          height: calc(50vh - 141px) !important;
        }
        .loaderImgAvailList{
          height:39.2% !important;
        }
        .loaderImgAvailList2{
          height:39% !important;
        }
      }
      @media only screen and (max-width: 1280px){
        .container{
          width: auto;
          min-width: 1280px;
        }
        .virtualScrollGrid, .hoelsolicitationlist{
          height: calc(50vh - 152px) !important;
        }
        .page_body_container {
          min-height: calc(100vh - 107px) !important;
        }
        #filterdiv{
          height:calc(100vh - 159px) !important;
        }
        .footerwidget{
          position:fixed;
        }
      }
      `}</style>
    </div>
  );
};
