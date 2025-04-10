import React, { useEffect, Suspense } from "react";
import styles from "./leisure.css";
import Settings from "../static/Settings";
import { Layout } from "../../../routing/Layout";
import LeisureContext, {
  LeisureContextProvider,
} from "../context/leisureContext";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import Utils from "../../../../../common/utils/Utils";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
let contextType = null;

const Leisure = () => {
  useEffect(() => {
    contextType.setLoader(true);
    contextType.getData();

    return () => {
      contextType.submitData();
    };
  }, []);

  return (
    <LeisureContextProvider>
      <LeisureContext.Consumer>
        {(LeisureInfoContext) => {
          contextType = LeisureInfoContext;

          return (
            <>
              {contextType.showValidationModal && (
                <CModal
                  title={Settings.leisureDetails.modalHeading}
                  onClose={() => contextType.closeValidationModal()}
                  show={contextType.showValidationModal}
                  xPosition={-100}
                  yPosition={-120}
                  closeImgTitle={Settings.leisureDetails.closeTitle}
                  class="customModal"
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
                IsLeisureUpdate={() => contextType.submitData()}
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
                  <div>
                    <table
                      className={
                        styles.menuWidthHeight + " " + styles.tableBorderWidth
                      }
                    >
                      <tr>
                        <td className={styles.mainDivAlign}>
                          <table className={styles.tableWidth}>
                            <tr>
                              <td colSpan={2}>&nbsp;</td>
                            </tr>
                            <tr>
                              <td className={styles.headerAlign}>
                                <p className={styles.titleSpace}>
                                  <table className={styles.zeroHeight}>
                                    <tr className={styles.instructionHeader}>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .strategicOverview
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.Field_Name}
                                        colSpan={7}
                                      >
                                        <textarea
                                          name={
                                            contextType.state.leisureDetails
                                              ?.stOverview
                                          }
                                          id={
                                            contextType.state.leisureDetails
                                              ?.stOverview
                                          }
                                          value={
                                            contextType.state.leisureDetails
                                              ?.stOverview
                                          }
                                          className={styles.sectionContent}
                                          rows={5}
                                          cols={188}
                                          onChange={(e) =>
                                            contextType.handleCommonChange(
                                              e,
                                              "stOverview"
                                            )
                                          }
                                          onKeyPress={(e) =>
                                            Utils.checklen_onkeypress(e, 1024)
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                    </tr>
                                    <tr className={styles.instructionHeader}>
                                      <td colSpan={3}>
                                        {Settings.leisureDetails.marketing}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .marketingSubHeading
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.Field_Name}
                                        colSpan={7}
                                      >
                                        <textarea
                                          name={
                                            contextType.state.leisureDetails
                                              ?.marketing
                                          }
                                          id={
                                            contextType.state.leisureDetails
                                              ?.marketing
                                          }
                                          value={
                                            contextType.state.leisureDetails
                                              ?.marketing
                                          }
                                          className={styles.sectionContent}
                                          rows={5}
                                          cols={188}
                                          onChange={(e) =>
                                            contextType.handleCommonChange(
                                              e,
                                              "marketing"
                                            )
                                          }
                                          onKeyPress={(e) =>
                                            Utils.checklen_onkeypress(e, 3072)
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                    </tr>
                                    <tr className={styles.instructionHeader}>
                                      <td colSpan={3}>
                                        {Settings.leisureDetails.strengths}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .strengthsSubHeading
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.Field_Name}
                                        colSpan={7}
                                      >
                                        <textarea
                                          name={
                                            contextType.state.leisureDetails
                                              ?.strengths
                                          }
                                          id={
                                            contextType.state.leisureDetails
                                              ?.strengths
                                          }
                                          value={
                                            contextType.state.leisureDetails
                                              ?.strengths
                                          }
                                          className={styles.sectionContent}
                                          rows={5}
                                          cols={188}
                                          onChange={(e) =>
                                            contextType.handleCommonChange(
                                              e,
                                              "strengths"
                                            )
                                          }
                                          onKeyPress={(e) =>
                                            Utils.checklen_onkeypress(e, 1024)
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                    </tr>
                                    <tr className={styles.instructionHeader}>
                                      <td colSpan={3}>
                                        {Settings.leisureDetails.leisureSegment}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .leisureSegmentSubHeading
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.Field_Name}
                                        colSpan={7}
                                      >
                                        <textarea
                                          name={
                                            contextType.state.leisureDetails
                                              ?.leisureSegment
                                          }
                                          id={
                                            contextType.state.leisureDetails
                                              ?.leisureSegment
                                          }
                                          value={
                                            contextType.state.leisureDetails
                                              ?.leisureSegment
                                          }
                                          className={styles.sectionContent}
                                          rows={5}
                                          cols={188}
                                          onChange={(e) =>
                                            contextType.handleCommonChange(
                                              e,
                                              "leisureSegment"
                                            )
                                          }
                                          onKeyPress={(e) =>
                                            Utils.checklen_onkeypress(e, 1024)
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                    </tr>
                                    <tr className={styles.instructionHeader}>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .onwardDistribution
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .onwardDistributionSubHeading
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.Field_Name}
                                        colSpan={7}
                                      >
                                        <textarea
                                          name={
                                            contextType.state.leisureDetails
                                              ?.onwardDistribution
                                          }
                                          id={
                                            contextType.state.leisureDetails
                                              ?.onwardDistribution
                                          }
                                          value={
                                            contextType.state.leisureDetails
                                              ?.onwardDistribution
                                          }
                                          className={styles.sectionContent}
                                          rows={5}
                                          cols={188}
                                          onChange={(e) =>
                                            contextType.handleCommonChange(
                                              e,
                                              "onwardDistribution"
                                            )
                                          }
                                          onKeyPress={(e) =>
                                            Utils.checklen_onkeypress(e, 1024)
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                    </tr>
                                    <tr className={styles.instructionHeader}>
                                      <td colSpan={3}>
                                        {Settings.leisureDetails.contracting}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}>
                                        {
                                          Settings.leisureDetails
                                            .contractingSubOne
                                        }
                                        <br />
                                        {
                                          Settings.leisureDetails
                                            .contractingSubTwo
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.Field_Name}
                                        colSpan={7}
                                      >
                                        <textarea
                                          name={
                                            contextType.state.leisureDetails
                                              ?.contracting
                                          }
                                          id={
                                            contextType.state.leisureDetails
                                              ?.contracting
                                          }
                                          value={
                                            contextType.state.leisureDetails
                                              ?.contracting
                                          }
                                          className={styles.sectionContent}
                                          rows={5}
                                          cols={188}
                                          onChange={(e) =>
                                            contextType.handleCommonChange(
                                              e,
                                              "contracting"
                                            )
                                          }
                                          onKeyPress={(e) =>
                                            Utils.checklen_onkeypress(e, 1024)
                                          }
                                        ></textarea>
                                      </td>
                                    </tr>
                                   
                                  </table>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
                )}
              </Layout>
            </>
          );
        }}
      </LeisureContext.Consumer>
      <style>{`
          .container{
            min-width:1100px;
          }
          @media only screen and (max-width: 1100px){
            .page_body_container {
                min-height: calc(100vh - 111px) !important;
            }
          }
        `}</style>
    </LeisureContextProvider>
  );
};

export default Leisure;
