import React, { Suspense, useEffect, useState, useContext } from "react";
import styles from "./CPACTabs.css";
import CModal from "../../../../../../common/components/CModal";
import CenterallyPricedAccount, {
  CenterallyPricedContextProvider,
} from "../../context/CPACTabsContext";
import CloseBtnImg from "../../../../../../common/assets/img/button/btnClose.gif";
import yellowTrianglesImg from "../../../../../../common/assets/img/w_revisit.gif";
import Settings from "../../static/Settings";
import CSuspense from "../../../../../../common/components/CSuspense";
import AnticipatedAccountTab from "./AnticipatedAccountTab";
import AnticipatedoffCycleAccountTab from "./AnticipatedoffAccountTab";
import RateTypesTab from "./RateTypesTab";
import AccountLegend from "./AccountLegend";
import CPACSearchResults from "../AccountCenter/CPACSearchResults";
import { useLocation } from "react-router-dom";
import { Layout } from "../../../../routing/Layout";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../common/components/ApplicationContext";

let contextType = null;

function CPACTabs() {
  const history = useHistory();
  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [period, setperiod] = useState(
    new URLSearchParams(urlParms).get("Period")
  );
  const [hotelrfpid, sethotelrfpid] = useState(
    new URLSearchParams(urlParms).get("Hotelrfpid")
  );
  const anticipatedTitle =
    Settings.TabTitles.anticipatedAccounts +
    period +
    Settings.TabTitles.anticipatedAccounts1;
  const anticipatedOffAccount =
    Settings.TabTitles.anticipatedAccounts +
    period +
    Settings.TabTitles.anticipatedOffcycleAccounts;

  const selectedHotelDetails = {
    marshaCode: marshaCode,
    hotelName: hotelName,
    period: period,
    hotelrfpid: hotelrfpid,
  };

  useEffect(() => {
    const rootElm = document.getElementById("root");
    rootElm.style.minWidth = "1200px";
    return () => rootElm.removeAttribute("style");
  }, []);
  const onYearChange = (data) => {
    setperiod(data.period);
    sethotelrfpid(data.hotelrfpid);
    const queryString =
      "?&MarshaCode=" +
      marshaCode +
      "&Period=" +
      data.period +
      "&HotelName=" +
      hotelName +
      "&Hotelrfpid=" +
      data.hotelrfpid;

    history.push({
      pathname: `/pricinghotelselect/CPAC`,
      search: queryString,
    });
  };
  return (
    <Layout>
      <CenterallyPricedContextProvider>
        <CenterallyPricedAccount.Consumer>
          {(CenterallyPricedAccount) => {
            contextType = CenterallyPricedAccount;
            return (
              <div className="centrallyPriced">
                {appContext.cpacLoader ? (
                  <span></span>
                ) : (
                  <table className={styles.menuHght_Height}>
                    <tbody>
                      <tr>
                        <td className={styles.InstructionHeader}>
                          {Settings.TabNames.information}
                        </td>
                        <td className={styles.Cell}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showAccountLegend();
                            }}
                          >
                            {Settings.TabNames.accountLegend}
                          </a>
                        </td>

                        <td className={styles.Cell}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showAccountOverview();
                            }}
                          >
                            {Settings.TabNames.accountOverview}
                          </a>
                        </td>

                        <td className={styles.Cell}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showFinalSubmission();
                            }}
                          >
                            {Settings.TabNames.bestFinalSubmission}
                          </a>
                        </td>

                        {/* <td className={styles.Cell}>
                      <a
                        onClick={() => {
                          contextType.showRateType();
                        }}
                      >
                        {Settings.TabNames.rateTypes}
                      </a>
                    </td> */}

                        <td className={styles.Cell}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showMyAccount();
                            }}
                          >
                            {Settings.TabNames.showmyAccounts}
                          </a>
                        </td>

                        <td className={styles.Cell}>
                          <span>
                            {" "}
                            <img
                              src={yellowTrianglesImg}
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "3px",
                              }}
                            />
                          </span>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showYellowTringles();
                            }}
                          >
                            {Settings.TabNames.yellowTriangles}
                          </a>
                        </td>

                        <td className={styles.Cell}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showAnticipatedAccount();
                            }}
                          >
                            {selectedHotelDetails.period}{" "}
                            {Settings.TabNames.anticipatedAccounts}
                          </a>
                        </td>

                        <td className={styles.Cell}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              contextType.showAnticipatedoffCycle();
                            }}
                          >
                            {selectedHotelDetails.period}{" "}
                            {Settings.TabNames.anticipatedOffcycleAccounts}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                <CModal
                  title={Settings.TabTitles.accountLegend}
                  onClose={contextType.showAccountLegend}
                  show={contextType.state.showAccountLegend}
                  xPosition={-235}
                  yPosition={-210}
                  closeImgTitle={Settings.cmodelclose}
                >
                  <div>
                    <AccountLegend
                      isUpdateMultiple={false}
                      user={appContext?.user}
                    />
                    <img
                      className="closeButton"
                      src={CloseBtnImg}
                      onClick={() => {
                        contextType.showAccountLegend();
                      }}
                      alt={Settings.cmodelclose}
                    />
                  </div>
                </CModal>
                <div>
                  <CModal
                    title={Settings.TabTitles.accountOverview}
                    onClose={contextType.showAccountOverview}
                    show={contextType.state.showAccountOverview}
                    xPosition={-450}
                    yPosition={-50}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <div>
                      <div className="accountLegendBlock">
                        {
                          Settings.searchResult.cpacTabsContent.accountLegend
                            .str1
                        }{" "}
                        <b>
                          {
                            Settings.searchResult.cpacTabsContent.accountLegend
                              .str2
                          }{" "}
                        </b>
                        {
                          Settings.searchResult.cpacTabsContent.accountLegend
                            .str3
                        }
                      </div>
                      <img
                        className="closeButton"
                        src={CloseBtnImg}
                        onClick={() => {
                          contextType.showAccountOverview();
                        }}
                        alt={Settings.cmodelclose}
                      />
                    </div>
                  </CModal>

                  <CModal
                    title={Settings.TabTitles.bestFinalSubmission}
                    onClose={contextType.showFinalSubmission}
                    show={contextType.state.showFinalSubmission}
                    xPosition={-450}
                    yPosition={-50}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <div>
                      <Suspense fallback={<CSuspense />}>
                        <div style={{ width: "850px", padding: "9px 12px" }}>
                          {
                            Settings.searchResult.cpacTabsContent
                              .bestAndFinalSubmission.str1
                          }{" "}
                          <b>
                            {" "}
                            {
                              Settings.searchResult.cpacTabsContent
                                .bestAndFinalSubmission.str2
                            }{" "}
                          </b>{" "}
                          {
                            Settings.searchResult.cpacTabsContent
                              .bestAndFinalSubmission.str3
                          }
                        </div>
                      </Suspense>

                      <img
                        className="closeButton"
                        src={CloseBtnImg}
                        onClick={() => {
                          contextType.showFinalSubmission();
                        }}
                        alt={Settings.cmodelclose}
                      />
                    </div>
                  </CModal>

                  <CModal
                    title={Settings.TabTitles.rateTypes}
                    onClose={contextType.showRateType}
                    show={contextType.state.showRateType}
                    xPosition={-235}
                    yPosition={-213}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <Suspense fallback={<CSuspense />}>
                      <RateTypesTab />
                    </Suspense>
                    <img
                      className="closeButton"
                      src={CloseBtnImg}
                      onClick={() => {
                        contextType.showRateType();
                      }}
                      alt={Settings.cmodelclose}
                    />
                  </CModal>

                  <CModal
                    title={Settings.TabTitles.showmyAccounts}
                    onClose={contextType.showMyAccount}
                    show={contextType.state.showMyAccount}
                    xPosition={-450}
                    yPosition={-50}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <div>
                      <div style={{ width: "850px", padding: "9px 12px" }}>
                        {
                          Settings.searchResult.cpacTabsContent.showMyAccount
                            .str1
                        }{" "}
                        <b>
                          {
                            Settings.searchResult.cpacTabsContent.showMyAccount
                              .str2
                          }
                        </b>{" "}
                        {
                          Settings.searchResult.cpacTabsContent.showMyAccount
                            .str3
                        }
                      </div>
                      <img
                        className="closeButton"
                        src={CloseBtnImg}
                        onClick={() => {
                          contextType.showMyAccount();
                        }}
                        alt={Settings.cmodelclose}
                      />
                    </div>
                  </CModal>

                  <CModal
                    title={Settings.TabTitles.yellowTriangles}
                    onClose={contextType.showYellowTringles}
                    show={contextType.state.showYellowTringles}
                    xPosition={-235}
                    yPosition={-50}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <div>
                      <div style={{ width: "420px", padding: "9px 12px" }}>
                        <div>
                          {" "}
                          <img
                            src={yellowTrianglesImg}
                            style={{ position: "relative", top: "2px" }}
                          />{" "}
                          {
                            Settings.searchResult.cpacTabsContent
                              .yellowTriangles.str1
                          }
                        </div>
                        <div>
                          {
                            Settings.searchResult.cpacTabsContent
                              .yellowTriangles.str2
                          }
                        </div>
                        {
                          Settings.searchResult.cpacTabsContent.yellowTriangles
                            .str3
                        }
                      </div>
                      <img
                        className="closeButton"
                        src={CloseBtnImg}
                        onClick={() => {
                          contextType.showYellowTringles();
                        }}
                        alt={Settings.cmodelclose}
                      />
                      <br></br>
                    </div>
                  </CModal>

                  <CModal
                    title={anticipatedTitle}
                    onClose={contextType.showAnticipatedAccount}
                    show={contextType.state.showAnticipatedAccount}
                    xPosition={-350}
                    yPosition={-213}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <Suspense fallback={<CSuspense />}>
                      <AnticipatedAccountTab data={selectedHotelDetails} />
                    </Suspense>
                    <img
                      className="closeButton"
                      src={CloseBtnImg}
                      onClick={() => {
                        contextType.showAnticipatedAccount();
                      }}
                      alt={Settings.cmodelclose}
                    />
                  </CModal>

                  <CModal
                    title={anticipatedOffAccount}
                    onClose={contextType.showAnticipatedoffCycle}
                    show={contextType.state.showAnticipatedoffCycle}
                    xPosition={-235}
                    yPosition={-213}
                    closeImgTitle={Settings.cmodelclose}
                  >
                    <Suspense fallback={<CSuspense />}>
                      <AnticipatedoffCycleAccountTab
                        data={selectedHotelDetails}
                      />
                    </Suspense>

                    <img
                      className="closeButton"
                      src={CloseBtnImg}
                      onClick={() => {
                        contextType.showAnticipatedoffCycle();
                      }}
                      alt={Settings.cmodelclose}
                    />
                  </CModal>
                  <CPACSearchResults
                    data={selectedHotelDetails}
                    onYearChange={onYearChange}
                  />
                </div>
                <style>{`
                img {
                    cursor:pointer;
                }
                .accountLegendBlock{
                    min-width: 860px !important; 
                    padding: 9px 12px !important;
                }
                .closeButton{
                    margin-left: 43% !important;
                    margin-bottom: 10px !important;
                }
                @media only screen and (max-width: 1200px){
                  .page_body_container{
                    min-height: calc(100vh - 90px);
                  }
                }
                @media only screen and (max-width: 1200px){
                  .page_body_container{
                    min-height: calc(100vh - 116px) !important;
                  }
                  .footerwidget{
                    position: fixed;
                  }
                }                   
              `}</style>
              </div>
            );
          }}
        </CenterallyPricedAccount.Consumer>
      </CenterallyPricedContextProvider>
    </Layout>
  );
}
export default CPACTabs;
