import React, { useEffect, Suspense } from "react";
import EditInitiativeModalContext, {
  EditInitiativeModalContextProvider,
} from "../context/EditInitiativeModalContext";
import btnUpdate from "../../../../../../../common/assets/img/btnUpdate.gif";
import btnDelete from "../../../../../../../common/assets/img/button/btnDelete.gif";
import btnClose from "../../../../../../../common/assets/img/button/btnClose.gif";
//import { Layout } from "../../../../../routing/Layout";
import CModal from "../../../../../../../common/components/CModal";
import Settings from "../static/Settings";
import styles from "./EditBuyingOffice.css";
import CSelect from "../../../../../../../common/components/CSelect";
import InitModalStyles from "./EditInitiativeModal.css";
import CSuspense from "../../../../../../../common/components/CSuspense";
import Utils from "../../../../../../../common/utils/Utils";

let editInitcontextType = null;

function EditInitiativeModal(props) {
  useEffect(() => {
    editInitcontextType.getEditInitiative(
      props.editInitiativeData,
      props.dataList.data.revStreamId,
      props.dataList.data.buyinglocid
    );
  }, [props.editInitiativeData]);

  const InitiativeModal = () => {
    return (
      <>
        <CModal
          title="Edit Initiative"
          onClose={() => props.closeModal()}
          class={"editInitiativePopoup"}
          show={true}
          overlayHeight={
            Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            ) - 12
          }
        >
          <div className={styles.editInitiativesModalContainer}>
            <div className={styles.editInitiativesModalBody}>
              <form
                name="editInitiativeDialog"
                id="editInitiativeDialog"
                method="post"
                autoComplete="off"
              >
                <table className={styles.fullWidth}>
                  <tr>
                    <td>
                      <table className={styles.fullWidth}>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            onMouseOver={() => {
                              window.status = "";
                              return true;
                            }}
                            onMouseOut={() => {
                              window.status = "";
                              return true;
                            }}
                            title=""
                          >
                            {Settings.fieldLabels.initiativeName}{" "}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.initiative_name
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "initiative_name"
                                )
                              }
                              size={50}
                              maxLength={40}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.responsible}
                          >
                            {Settings.fieldLabels.responsible}{" "}
                          </td>
                          <td>
                            <input
                              type="text"
                              tabIndex={2}
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.plan_tm_lead
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "plan_tm_lead"
                                )
                              }
                              size={50}
                              maxLength={20}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.initiativeYear}
                          >
                            {Settings.fieldLabels.initiativeYear}{" "}
                          </td>
                          <td>
                            <CSelect
                              ddnOptions={
                                editInitcontextType.strAcctInitiative
                                  .periodList !== undefined
                                  ? editInitcontextType.strAcctInitiative
                                      .periodList
                                  : []
                              }
                              valField={"period"}
                              keyField={"period"}
                              selectedValue={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.init_date
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "init_date"
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.initiativeYear}
                          >
                            {Settings.fieldLabels.revenueStream}{" "}
                          </td>
                          <td>
                            <CSelect
                              ddnOptions={
                                editInitcontextType.strAcctInitiative
                                  .listRevStream !== undefined
                                  ? editInitcontextType.strAcctInitiative
                                      .listRevStream
                                  : []
                              }
                              valField={"listName"}
                              keyField={"refId"}
                              selectedValue={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.revstreamid
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "revstreamid"
                                )
                              }
                            />
                          </td>
                        </tr>
                      </table>
                      <table className={styles.fullWidth}>
                        <tr className={styles.rowHeight}>
                          <td></td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.initiativeYear}
                          >
                            {Settings.fieldLabels.initiativeAction}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <textarea
                              className={styles.textAreaFont}
                              rows={3}
                              cols={100}
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.action
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "action"
                                )
                              }
                              onKeyPress={(e) => {
                                Utils.checklen_onkeypress(e, 1024);
                              }}
                            ></textarea>
                          </td>
                        </tr>
                        <tr className={styles.rowHeight}>
                          <td></td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.initiativeYear}
                          >
                            {Settings.fieldLabels.objective}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <textarea
                              className={styles.textAreaFont}
                              rows={3}
                              cols={100}
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.objective
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "objective"
                                )
                              }
                              onKeyPress={(e) => {
                                Utils.checklen_onkeypress(e, 1024);
                              }}
                            ></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.execplan}
                          >
                            {Settings.fieldLabels.executionPlan}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <textarea
                              className={styles.textAreaFont}
                              rows={3}
                              cols={100}
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.exec_plan
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "exec_plan"
                                )
                              }
                              onKeyPress={(e) => {
                                Utils.checklen_onkeypress(e, 1024);
                              }}
                            ></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.initiativeYear}
                          >
                            {Settings.fieldLabels.resultsLearnings}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <textarea
                              className={styles.textAreaFont}
                              rows={3}
                              cols={100}
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.results
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "results"
                                )
                              }
                              onKeyPress={(e) => {
                                Utils.checklen_onkeypress(e, 1024);
                              }}
                            ></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={styles.editInitiativelabels}
                            title={Settings.tooltip.initiativeYear}
                          >
                            {Settings.fieldLabels.additionalComments}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <textarea
                              className={styles.textAreaFont}
                              rows={3}
                              cols={100}
                              value={
                                editInitcontextType.strAcctInitiative
                                  .acctInitiative.comments
                              }
                              onChange={(e) =>
                                editInitcontextType.handleCommonChange(
                                  e,
                                  "comments"
                                )
                              }
                              onKeyPress={(e) => {
                                Utils.checklen_onkeypress(e, 1024);
                              }}
                            ></textarea>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table className={styles.zeroHeight}>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td className={styles.InstructionHeader} width="875">
                      TASKS
                    </td>
                  </tr>
                </table>
                <table className={styles.zeroHeight}>
                  {editInitcontextType.strAcctInitiative.acctInitiative
                    .acctTasks !== undefined &&
                    editInitcontextType.strAcctInitiative.acctInitiative
                      .acctTasks !== null &&
                    editInitcontextType.strAcctInitiative.acctInitiative
                      .acctTasks.length > 0 &&
                    editInitcontextType.strAcctInitiative.acctInitiative.acctTasks.map(
                      (eachTask, index) => {
                        return (
                          <>
                            {index !== 0 && index % 2 === 0 ? (
                              <tr>
                                <td></td>
                              </tr>
                            ) : (
                              ""
                            )}
                            <td key={index}>
                              <table
                                className={styles.zeroHeight}
                                style={{
                                  margin: index % 2 === 0 ? "-2px" : "0",
                                  padding: "0",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <tr>
                                  <td>
                                    <table>
                                      <tr>
                                        <td
                                          colSpan="2"
                                          className={
                                            styles.editInitiativelabels
                                          }
                                        >
                                          {"Task " + (index + 1)}
                                          <input type="hidden" />
                                        </td>
                                        <td
                                          nowrap
                                          colSpan="2"
                                          className={
                                            styles.editInitiativelabels
                                          }
                                          title={Settings.tooltip.startDate}
                                        >
                                          {Settings.fieldLabels.beginDate}
                                          <input
                                            onKeyPress={
                                              Utils.DateNumberOnly_onkeypress
                                            }
                                            style={{
                                              width: "94px",
                                              height: "14px",
                                              marginLeft: "10px",
                                            }}
                                            type="text"
                                            maxLength={10}
                                            value={
                                              eachTask.begindate === ""
                                                ? null
                                                : eachTask.begindate
                                            }
                                            onChange={(e) =>
                                              editInitcontextType.handleCommonChange(
                                                e,
                                                "begindate",
                                                index
                                              )
                                            }
                                            onBlur={() =>
                                              editInitcontextType.handleCheckDateFormate(
                                                eachTask.begindate
                                              )
                                            }
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan="2"
                                          className={
                                            styles.editInitiativelabels
                                          }
                                          title={
                                            Settings.tooltip.responsibleTask
                                          }
                                        >
                                          {Settings.fieldLabels.responsible}
                                          <input
                                            type="text"
                                            size="15"
                                            maxLength={100}
                                            value={eachTask.responsible}
                                            onChange={(e) =>
                                              editInitcontextType.handleCommonChange(
                                                e,
                                                "responsible",
                                                index
                                              )
                                            }
                                          />
                                        </td>
                                        <td
                                          colSpan="2"
                                          className={
                                            styles.editInitiativelabels
                                          }
                                          title={Settings.tooltip.endDate}
                                        >
                                          &nbsp;&nbsp;&nbsp;
                                          {Settings.fieldLabels.endDate}
                                          <input
                                            onKeyPress={
                                              Utils.DateNumberOnly_onkeypress
                                            }
                                            type="text"
                                            size="15"
                                            maxLength="10"
                                            style={{
                                              marginLeft: "10px",
                                            }}
                                            value={
                                              eachTask.enddate === ""
                                                ? null
                                                : eachTask.enddate
                                            }
                                            onChange={(e) =>
                                              editInitcontextType.handleCommonChange(
                                                e,
                                                "enddate",
                                                index
                                              )
                                            }
                                            onBlur={() =>
                                              editInitcontextType.handleCheckDateFormate(
                                                eachTask.enddate
                                              )
                                            }
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.editInitiativelabels}>
                                    {Settings.fieldLabels.taskDescription}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="field_Name">
                                    <textarea
                                      rows="4"
                                      cols="80"
                                      value={eachTask.taskDesc}
                                      style={{ height: "50.67px" }}
                                      onChange={(e) =>
                                        editInitcontextType.handleCommonChange(
                                          e,
                                          "taskDesc",
                                          index
                                        )
                                      }
                                      onKeyPress={(e) => {
                                        Utils.checklen_onkeypress(e, 1024);
                                      }}
                                    ></textarea>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="field_Name"></td>
                                </tr>
                              </table>
                            </td>
                          </>
                        );
                      }
                    )}
                </table>
                <table className={styles.fullWidth}>
                  <tr>
                    <td>
                      <div className={InitModalStyles.buttonalignment}>
                        <a href="javascript:void(0);" className={InitModalStyles.updatebtn}>
                          <img
                            id="update"
                            src={btnUpdate}
                            onClick={() =>
                              editInitcontextType.updateEditInitiative(props)
                            }
                          />{" "}
                        </a>
                        <a href="javascript:void(0);" className={InitModalStyles.updatebtn}>
                          <img
                            id="delete"
                            src={btnDelete}
                            onClick={() =>
                              editInitcontextType.deleteEditInitiative(props)
                            }
                          />{" "}
                        </a>
                        <a href="javascript:void(0);" className={InitModalStyles.updatebtn}>
                          <img
                            id="close"
                            src={btnClose}
                            onClick={props.closeModal}
                          />{" "}
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
          </div>
          {editInitcontextType.showValidationModal && (
            <CModal
              title={Settings.headingNames.modalHeading}
              onClose={() => editInitcontextType.closeValidationModal()}
              show={editInitcontextType.showValidationModal}
              positionOffset={{ x: "-50%", y: "-50%" }}
            >
              <Suspense fallback={<CSuspense />}>
                <div className={InitModalStyles.editInitiativesModalContainer}>
                  {editInitcontextType.validationMessage}
                </div>
              </Suspense>
            </CModal>
          )}
        </CModal>
        <style>{`.editInitiativePopoup{
          position:fixed;
          left:28vw;
          top:10vh;
        }`}</style>
      </>
    );
  };
  return (
    <EditInitiativeModalContextProvider>
      <EditInitiativeModalContext.Consumer>
        {(report) => {
          editInitcontextType = report;
          return (
            <React.Fragment>
              {editInitcontextType.editInitiativeLoader ? (
                <p>{Settings.commontext.loadingMessage}</p>
              ) : (
                <div>{InitiativeModal()}</div>
              )}
            </React.Fragment>
          );
        }}
      </EditInitiativeModalContext.Consumer>
    </EditInitiativeModalContextProvider>
  );
}

export default EditInitiativeModal;
