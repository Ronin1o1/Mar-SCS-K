import React, { useEffect, Suspense } from "react";
import { Layout } from "../../../../salesAdministration/routing/Layout";
import styles from "./GroupsIntermediaries.css";
import Settings from "../static/Settings";
import GroupsIntermediariesContext, {
  GroupsIntermediariesContextProvider,
} from "../context/GroupsIntermediariesContext";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import Utils from "../../../../../common/utils/Utils";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";

let contextType = null;

const GroupsIntermediaries = () => {
  useEffect(() => {
    contextType.getGroupsintermediaries();
    return () => {
      contextType.updateGroupsIntermediaries();
    };
  }, []);
  return (
    <GroupsIntermediariesContextProvider>
      <GroupsIntermediariesContext.Consumer>
        {(groupsContext) => {
          contextType = groupsContext;
          return (
            <>
              {contextType.showValidationModal && (
                <CModal
                  title={Settings.headingNames.modalHeading}
                  onClose={() => contextType.closeValidationModal()}
                  show={contextType.showValidationModal}
                  overlayHeight={Math.max(
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight
                  )}
                  overlayTopPosition={"-79px"}
                >
                  <Suspense fallback={<CSuspense />}>
                    <div className={styles.alertmodal}>
                      {contextType.validationMessage}
                    </div>
                  </Suspense>
                </CModal>
              )}
              <Layout
                IsGroupsIntermediariesUpdate={() =>
                  contextType.updateGroupsIntermediaries()
                }
                getlastUpdateDate={contextType.state.lastUpdateDateValue}
              >
                {contextType.state.showScreenLoader ? (
                  <img
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "45%",
                    }}
                    src={screenLoader}
                  />
                ) : (
                  <table className={styles.tableBorderWidth}>
                    <tr>
                      <td>
                        <table className={styles.menuWidthHeight}>
                          <tr>
                            <td className={styles.InstructionHeader}>
                              {Settings.groupsIntermediaries.subHeading}
                            </td>
                          </tr>
                        </table>
                        <table>
                          <tr>
                            <td>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.groupsIntermediaries.fullService}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      name="grpDetail.fullservice"
                                      id="grpDetail.fullservice"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail
                                          ?.fullservice
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "fullservice",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "fullservice",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "fullservice",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.groupsIntermediaries.contracting}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      name="grpDetail.contract"
                                      id="grpDetail.contract"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail?.contract
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "contract",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "contract",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "contract",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.groupsIntermediaries.siteSection}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      name="grpDetail.site_select"
                                      id="grpDetail.site_select"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail
                                          ?.site_select
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "site_select",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "site_select",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "site_select",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table className={styles.zeroHeight}>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.groupsIntermediaries.housting}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      name="grpDetail.housing"
                                      id="grpDetail.housing"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail?.housing
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "housing",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "housing",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "housing",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                              <table  className={styles.margintop}>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.groupsIntermediaries.onSite}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      name="grpDetail.on_site"
                                      id="grpDetail.on_site"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail?.on_site
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "on_site",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "on_site",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "on_site",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.groupsIntermediaries.research}
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    <textarea
                                      name="grpDetail.research"
                                      id="grpDetail.research"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail?.research
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "research",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "research",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "research",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName} title="">
                                    {Settings.groupsIntermediaries.other}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className={
                                      styles.fieldName +
                                      " " +
                                      styles.otherFiledPadding
                                    }
                                  >
                                    <textarea
                                      name="grpDetail.inter_other"
                                      id="grpDetail.inter_other"
                                      rows="4"
                                      cols="188"
                                      value={
                                        contextType.state.groupDetail
                                          ?.inter_other
                                      }
                                      onChange={(e) =>
                                        contextType.handleCommonChange(
                                          e,
                                          "inter_other",
                                          1024
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                        contextType.mandatoryCheck(
                                          "inter_other",
                                          1024
                                        );
                                      }}
                                      onPaste={() => {
                                        contextType.mandatoryCheck(
                                          "inter_other",
                                          1024
                                        );
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          </table>
                      </td>
                    </tr>
                  </table>
                )}
              </Layout>
            </>
          );
        }}
      </GroupsIntermediariesContext.Consumer>
      <style>{`
         .container {
          min-width:1000px;
      }
      @media only screen and (max-width: 1000px){
        .page_body_container {
            min-height: calc(100vh - 111px) !important;
        }
      }
      `}</style>
    </GroupsIntermediariesContextProvider>
  );
};

export default GroupsIntermediaries;
