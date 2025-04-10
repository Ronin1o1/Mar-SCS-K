import React, { useContext, useEffect, useState } from "react";
import commonStyle from "../../../../common/assets/css/commonBase.css";
import warning from "../../../../common/assets/img/warning.gif";
import UpdateMultipleHotelsContext from "../context/UpdateMultipleHotelsContextProvider";
import Settings from "../static/Settings";
import downarrow from "../../../../common/assets/img/downarrow.gif";
import uparrow from "../../../../common/assets/img/uparrow.gif";
import styles from "./UpdateMultipleHotels.css";
import btnSave from "../../../../common/assets/img/btnSave.gif";
import { isEmpty } from "lodash";
import { CPagination } from "../../../../common/components/CPagination";
import { Filter } from "../../../../common/components/filter/Filter";
import CResultGrid from "../../../hotelPricing/content/centerallyPricedAccount/content/grid/CResultGrid";
import CPageTitle from "../../../../common/components/CPageTitle";
import CModal from "../../../../common/components/CModal";
import CloseBtnImg from "../../../../common/assets/img/button/btnClose.gif";
import AccountLegend from "../../../hotelPricing/content/centerallyPricedAccount/content/Tabs/AccountLegend";
import aerlevel1 from "../../../../common/assets/img/aerlevel1.gif";
import aer from "../../../../common/assets/img/aer.gif";
import noSquatter from "../../../../common/assets/img/nosquatter.gif";
import noview from "../../../../common/assets/img/noview.gif";
import toYear from "../../../../common/assets/img/two_year.gif";
import offCycle from "../../../../common/assets/img/off_cycle.gif";
import isnew from "../../../../common/assets/img/new.gif";
import wifi from "../../../../common/assets/img/wifi.gif";
import rollOver from "../../../../common/assets/img/roll_over.png";
import btBookingCost from "../../../../common/assets/img/bt_booking_cost.png";
import API from "../service/API";
import { CLoader } from "../../../../common/components/CLoader";
import { useLocation, useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

export function UpdateMutipleHotelsContent() {
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const urlParms = useLocation().search;

  const context = useContext(UpdateMultipleHotelsContext);
  const session_payload = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));

  useEffect(() => {
    if (urlParms != "" && appContext?.updateMultipleHotelRequest) {
      context.searchUpdateTableData(
        JSON.parse(appContext.updateMultipleHotelRequest),
        1
      );
    }
  }, []);

  useEffect(() => {
    const scrollList = document.getElementById("updateHotelResult");
    if (scrollList && !history.location?.MarshaCode) {
      scrollList.scrollTo(0, 0);
    }
  }, [context?.searchResponse?.accountCenterView]);

  let saveData;
  let singleObj;

  const [showAccountLegend, setAccountLegend] = useState(false);

  const handleAjaxSave = (
    updateArray,
    showAlert,
    isRadiobutton,
    savenoBid,
    singleRowArray
  ) => {
    singleObj = singleRowArray;
    if (!isEmpty(updateArray)) {
      saveData = updateArray;
      context.handleUpdateAccountCenter(updateArray, isRadiobutton, singleObj);
    }
  };
  const nobidsave = (
    temparr,
    isChecked,
    singleRowArray,
    isShowAlert = true,
    editData = {}
  ) => {
    //context.handleUpdateAccountCenter(temparr, isChecked, singleRowArray);
    context.handleUpdateAccountCenter(
      !isEmpty(temparr) ? temparr : editData,
      true,
      isEmpty(editData) ? singleObj : editData,
      isShowAlert
    );
  };
  const onNobidAAlert = (nobidAlert) => {
    if (nobidAlert) {
      context.setnoBidAlert(true);
    } else {
      context.setnoBidAlert(false);
    }
  };

  const handlePaginationAPI = (pageNumber: number) => {
    context.setPageNumber(pageNumber);
    //Intial call when session storage empty
    if (session_payload === null || session_payload === false) {
      context.searchUpdateTableData(context.storeRequestPayload, pageNumber);
    } else {
      context.searchUpdateTableData(session_payload, pageNumber);
    }
  };
  const onGotoPrintTab = (editData) => {
    handleSave(false, editData);
  };
  const handleSave = (isShowAlert = true, editData = {}) => {
    context.handleUpdateAccountCenter(
      !isEmpty(saveData) ? saveData : editData,
      true,
      isEmpty(editData) ? singleObj : editData,
      isShowAlert
    );
  };

  const hasQuestions = (data) => {
    context.handleUpdateAccountCenter(
      !isEmpty(saveData) ? saveData : data,
      true,
      isEmpty(data) ? singleObj : data,
      false,
      true
    );
  };

  const accountCenterInfo = context?.searchResponse?.accountCenterInfo;

  const onAccountName = (id) => {
    const popupParms =
      "height=300,width=700,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes";
    API.getAccountReport(id)
      .then((res) => {
        const url = res.reportServer + "&" + res.reportQueryString;
        const popupWindow = window.open(url, "_blank");
        popupWindow.focus();
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };

  return (
    <>
      {context.showLoader && <CLoader />}
      <CPageTitle title={Settings.title}></CPageTitle>
      <div className={styles.updatemh}>
        <div className={styles.updatemhotels}>
          <div className={styles.wraper}>
            <tr style={{ marginBottom: "8px" }}>
              <td className="InstructionHeader" style={{ fontWeight: "bold" }}>
                <em>Information&nbsp;</em>
              </td>
              <td>
                <a
                  href="javascript: return true"
                  onClick={() => {
                    setAccountLegend(true);
                  }}
                >
                  Account Legend
                </a>
              </td>

              <CModal
                title={"Account Legend Information"}
                onClose={() => setAccountLegend(false)}
                show={showAccountLegend}
                xPosition={-235}
                yPosition={-179}
                closeImgTitle={"Cancel"}
                class={"legendacc"}
              >
                <div>
                  <AccountLegend
                    isUpdateMultiple={true}
                    user={appContext.user}
                  />
                  <div className={styles.closebtn}>
                    <button>
                      <img
                        className={`closeButton ${styles.accountLegClose}`}
                        src={CloseBtnImg}
                        onClick={() => {
                          setAccountLegend(false);
                        }}
                        alt={"Cancel"}
                      />
                    </button>
                  </div>
                </div>
              </CModal>
            </tr>

            <tr>
              <td>
                <table className={commonStyle.zeroHeight}>
                  <tbody>
                    <tr>
                      <td style={{ width: 5 }} />
                      <td>
                        <div id="search" className="search">
                          <div
                            className={`${commonStyle.search_link_on} ${styles.fontBold}`}
                            onClick={() => {
                              context.setShowPopup((show) => !show);
                            }}
                          >
                            <a
                              href="#"
                              id="search_link"
                              title="Click to open the search box"
                              className={styles.searchLink}
                            >
                              Search
                            </a>
                            &nbsp;
                            <img
                              id="searchState"
                              src={context.showPopup ? uparrow : downarrow}
                            />
                          </div>

                          <div
                            id="search_wrapper1"
                            style={{
                              display: context.showPopup ? "block" : "none",
                              top: "82px",
                              left: 5,
                            }}
                            className={styles.search_wrapper}
                          >
                            <div>
                              <Filter
                                filterViewLists={
                                  Settings.api.getMultiHotelAccountCenter
                                }
                                componentName={"UpdateMultipleHotels"}
                                setRequestPayload={
                                  context.setStoreRequestPayload
                                }
                                isUpdateMultiple={true}
                                dueDateData={context.dueDateData}
                                searchUpdateTableData={
                                  context.searchUpdateTableData
                                }
                                isHotelUser={appContext.user.isHotelUser}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      {context.showAccountInfoBar &&
                        context?.searchResponse?.accountCenterInfo
                          ?.accountname && (
                          <>
                            <td style={{ width: 25 }} />
                            <td>
                              <a
                                href="#"
                                style={{ marginRight: "0px" }}
                                onClick={() => {
                                  event.preventDefault();
                                  onAccountName(accountCenterInfo.accountrecid);
                                }}
                              >
                                {
                                  context?.searchResponse?.accountCenterInfo
                                    ?.accountname
                                }
                              </a>
                              <span>
                                {accountCenterInfo?.aer_account != null &&
                                accountCenterInfo?.aer_account === "Y" ? (
                                  <span>
                                    {accountCenterInfo?.ismaxaer &&
                                    accountCenterInfo?.ismaxaer === "Y" ? (
                                      <img src={aerlevel1}></img>
                                    ) : (
                                      <img src={aer}></img>
                                    )}
                                  </span>
                                ) : (
                                  ""
                                )}

                                {accountCenterInfo?.nosquatter === "Y" ? (
                                  <img src={noSquatter}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.hotel_display === "N" ? (
                                  <img src={noview}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.accountpricingcycleid ==
                                2 ? (
                                  <img src={toYear}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.accountpricingcycleid ==
                                  3 || accountCenterInfo?.offcycle === "Y" ? (
                                  <img src={offCycle}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.isnew === "Y" ? (
                                  <img src={isnew}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.top_account === "Y" ? (
                                  <img src={wifi}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.bt_booking_cost === "Y" ? (
                                  <img src={btBookingCost}></img>
                                ) : (
                                  ""
                                )}
                                {accountCenterInfo?.roll_over === "Y" ? (
                                  <img src={rollOver}></img>
                                ) : (
                                  ""
                                )}
                              </span>
                            </td>
                            <td style={{ width: 20 }} />
                            <td>
                              <b className={styles.field_Value}>Period:</b>{" "}
                              {
                                context?.searchResponse?.accountCenterInfo
                                  ?.period
                              }
                            </td>
                            <td style={{ width: 20 }} />
                            <td>
                              <b className={styles.field_Value}>Segment:</b>{" "}
                              {
                                context?.searchResponse?.accountCenterInfo
                                  ?.accounttypedescription
                              }
                            </td>
                            <td style={{ width: 20 }} />
                            <td>
                              <b className={styles.field_Value}>Due Date:</b>{" "}
                              {
                                context?.searchResponse?.accountCenterInfo
                                  ?.duedate
                              }
                            </td>
                          </>
                        )}
                    </tr>

                    <tr>
                      <td>
                        <CPagination
                          totalPages={
                            context?.searchResponse?.accountCenterView
                              ?.totalPages
                              ? context?.searchResponse?.accountCenterView
                                  ?.totalPages
                              : 1
                          }
                          handlePaginationAPI={handlePaginationAPI}
                          width={1}
                          pageNumber={context?.pageNumber}
                        />
                      </td>
                      <td style={{ width: 100, minWidth: 100 }}>&nbsp;</td>
                      <td>
                        <img
                          src={btnSave}
                          alt="Save Best &amp; Final submission"
                          onClick={() => handleSave()}
                        />
                      </td>
                      <td className={styles.FilterFieldName} colSpan={2}>
                        {context?.searchResponse?.accountCenterView
                          ?.rebidAlert ? (
                          <span>
                            {" "}
                            <img
                              className={styles.rebidImg}
                              src={warning}
                            ></img>
                            <span className={styles.rebidAlert}>
                              {
                                context?.searchResponse?.accountCenterView
                                  ?.rebidAlert
                              }
                            </span>
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </div>
          <div>
            <CResultGrid
              data={context?.searchResponse?.accountCenterView}
              hotelData={context?.searchResponse?.hotelData}
              reason={context?.nobidReason}
              marshaCode={""}
              period={""}
              noDataFound={isEmpty(
                context?.searchResponse?.accountCenterView
                  ?.hotelAccountCenterList
              )}
              ajaxSave={handleAjaxSave}
              userDetails={{
                role: "adming",
              }}
              isUpdateMultiple={true}
              onNobidAAlert={onNobidAAlert}
              onGotoPrintTab={onGotoPrintTab}
              hasQuestions={hasQuestions}
              resultGridId={"updateHotelResult"}
              priceBtnProduct={context?.searchResponse.priceButtonProductData}
              onsavenobidreasonidmulti={(temparr, isChecked, singleRowArray) =>
                nobidsave(temparr, isChecked, singleRowArray)
              }
              scrollToMarsha={
                history.location?.MarshaCode ? history.location?.MarshaCode : ""
              }
            />
          </div>
        </div>
      </div>
      <style>{`
      .legendacc{
        width:485px;
      }
      #accountdiv table tr{
        line-height:12px;
      }
      #filterString{
        width: 135px;
        height: 16.5px;
      }
      .updatemultiplehotels{
        margin-left: 5px;
      }
      .updatemultiplehotels tr td{
        font-weight:100;
      }
      .titleContainer{
        margin-bottom: 7px;
      }
      #dataGrid{
        width:1067px;
      }
      .hotelstartingwith{
        padding:1px 2px 1.5px;
      }
      .hotelstartingwith:focus-visible{
        border-radius:0 !important;
      }
      #accountTypes{
        margin-bottom: -2.5px;
      }
      .cpacumhgrid{
        width:1068px !important;
      }
      @media only screen and (max-width: 1070px) {
        .page_body_container{
          min-height: calc(100vh - 90px) !important;
        }
        .footerwidget{
          position:fixed;
        }
      }
      `}</style>
    </>
  );
}
