import React, { Suspense } from "react";
import btnUpdate from "../../../../../../../common/assets/img/btnUpdate.gif";
import btnDelete from "../../../../../../../common/assets/img/button/btnDelete.gif";
import btnClose from "../../../../../../../common/assets/img/button/btnClose.gif";
import CModal from "../../../../../../../common/components/CModal";
import CSelect from "../../../../../../../common/components/CSelect";
import CSuspense from "../../../../../../../common/components/CSuspense";
import styleClass from "./EditAccountInitiatives.css";
import Settings from "../static/Settings";
import EditAccInitiativesContext, {
  EditAccInitiativesContextProvider,
} from "../context/EditAccInitiativeContext";
import Interceptors from "../../../../../../../common/components/Interceptors";
import Utils from "../../../../../../../common/utils/Utils";

interface EditAccInitiativeProps {
  initiativeData;
  closeModal;
  showModal;
  selectedGroup;
}

const EditAccountInitiatives = (props: EditAccInitiativeProps): JSX.Element => {
  let contextType = null;

  return (
    <EditAccInitiativesContextProvider
      initiativeData={props.initiativeData}
      closeModal={props.closeModal}
    >
      <EditAccInitiativesContext.Consumer>
        {(editAccContext) => {
          contextType = editAccContext;
          if (!contextType.showAlert) {
            return (
              <div id="editinitmodal">
                <CModal
                  title="Edit Initiative"
                  onClose={props.closeModal}
                  show={props.showModal}
                  xPosition={-355}
                  yPosition={-240}
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
                    <Interceptors spinnerFlag={true} />
                    <div
                      className={
                        styleClass.editAccountInitiativesModalContainer
                      }
                    >
                      <div
                        className={styleClass.editAccountInitiativesModalBody}
                      >
                        <form
                          name="editInitiativeDialog"
                          id="editInitiativeDialog"
                          method="post"
                          autoComplete="off"
                        >
                          <table className={styleClass.fullWidth}>
                            <tr style={{ verticalAlign: "top" }}>
                              <td>
                                <table className={styleClass.fullWidth}>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title=""
                                    >
                                      {Settings.fieldLabels.initiativeName}{" "}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="acctInitiative.initiative_name"
                                        id="acctInitiative.initiative_name"
                                        tabIndex={1}
                                        autoFocus={true}
                                        value={
                                          contextType.state.acctInitiative
                                            .initiative_name
                                        }
                                        size={50}
                                        maxLength={40}
                                        onChange={(e) =>
                                          contextType.changeHandler(
                                            e,
                                            "initiative_name"
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.responsible}
                                    >
                                      {Settings.fieldLabels.responsible}{" "}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="acctInitiative.plan_tm_lead"
                                        id="acctInitiative.plan_tm_lead"
                                        tabIndex={2}
                                        value={
                                          contextType.state.acctInitiative
                                            .plan_tm_lead
                                        }
                                        size={50}
                                        maxLength={20}
                                        onChange={(e) =>
                                          contextType.changeHandler(
                                            e,
                                            "plan_tm_lead"
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.initiativeYear}
                                    >
                                      {Settings.fieldLabels.initiativeYear}{" "}
                                    </td>
                                    <td>
                                      <CSelect
                                        name="acctInitiative.init_date"
                                        id="acctInitiative.init_date"
                                        ddnOptions={
                                          contextType.state.periodList
                                        }
                                        keyField={"period"}
                                        valField={"period"}
                                        onChange={(event) =>
                                          contextType.selectChangeHandler(
                                            event,
                                            "init_date"
                                          )
                                        }
                                        selectedValue={
                                          contextType.state.acctInitiative
                                            .init_date === null
                                            ? contextType.state.periodList[0]
                                                .period
                                            : contextType.state.acctInitiative
                                                .init_date
                                        }
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.initiativeYear}
                                    >
                                      {Settings.fieldLabels.revenueStream}{" "}
                                    </td>
                                    <td>
                                      {contextType.state.acctInitiative
                                        .buyinglocid === 0 ? (
                                        <span>
                                          {contextType.state.revenueStream}
                                        </span>
                                      ) : (
                                        <CSelect
                                          name="accInitiative.revStream"
                                          id="accInitiative.revStream"
                                          ddnOptions={
                                            contextType.state.listOfRevStream
                                          }
                                          keyField={"listName"}
                                          valField={"listName"}
                                          onChange={(event) =>
                                            contextType.selectChangeHandler(
                                              event,
                                              "revstreamid"
                                            )
                                          }
                                          selectedValue={contextType.state.listOfRevStream.find(
                                            (f) =>
                                              contextType.state.acctInitiative
                                                .revstreamid === f.period
                                          )}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                </table>
                                <table className={styleClass.fullWidth}>
                                  <tr className={styleClass.rowHeight}>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.initiativeYear}
                                    >
                                      {Settings.fieldLabels.initiativeAction}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <textarea
                                        name="acctInitiative.action"
                                        tabIndex={4}
                                        id="acctInitiative.action"
                                        value={
                                          contextType.state.acctInitiative
                                            .action
                                        }
                                        className={styleClass.textAreaFont}
                                        rows={3}
                                        cols={100}
                                        onChange={(e) =>
                                          contextType.changeHandler(e, "action")
                                        }
                                        onKeyPress={(event) => {
                                          return Utils.checklen_onkeypress(
                                            event,
                                            1024
                                          );
                                        }}
                                      >
                                        {
                                          contextType.state.acctInitiative
                                            .action
                                        }
                                      </textarea>
                                    </td>
                                  </tr>
                                  <tr className={styleClass.rowHeight}>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.initiativeYear}
                                    >
                                      {Settings.fieldLabels.objective}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <textarea
                                        name="acctInitiative.objective"
                                        tabIndex={5}
                                        id="acctInitiative.objective"
                                        className={styleClass.textAreaFont}
                                        rows={3}
                                        cols={100}
                                        value={
                                          contextType.state.acctInitiative
                                            .objective
                                        }
                                        onChange={(e) =>
                                          contextType.changeHandler(
                                            e,
                                            "objective"
                                          )
                                        }
                                        onKeyPress={(event) => {
                                          return Utils.checklen_onkeypress(
                                            event,
                                            1024
                                          );
                                        }}
                                      >
                                        {
                                          contextType.state.acctInitiative
                                            .objective
                                        }
                                      </textarea>
                                    </td>
                                  </tr>
                                  <tr className={styleClass.rowHeight}>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.executionPlan}
                                    >
                                      {Settings.fieldLabels.executionPlan}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <textarea
                                        name="acctInitiative.exec_plan"
                                        tabIndex={6}
                                        id="acctInitiative.exec_plan"
                                        value={
                                          contextType.state.acctInitiative
                                            .exec_plan
                                        }
                                        className={styleClass.textAreaFont}
                                        rows={3}
                                        cols={100}
                                        onChange={(e) =>
                                          contextType.changeHandler(
                                            e,
                                            "exec_plan"
                                          )
                                        }
                                        onKeyPress={(event) => {
                                          return Utils.checklen_onkeypress(
                                            event,
                                            1024
                                          );
                                        }}
                                      >
                                        {
                                          contextType.state.acctInitiative
                                            .exec_plan
                                        }
                                      </textarea>
                                    </td>
                                  </tr>
                                  <tr className={styleClass.rowHeight}>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.initiativeYear}
                                    >
                                      {Settings.fieldLabels.resultsLearnings}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <textarea
                                        name="acctInitiative.results"
                                        tabIndex={7}
                                        id="acctInitiative.results"
                                        className={styleClass.textAreaFont}
                                        rows={3}
                                        cols={100}
                                        value={
                                          contextType.state.acctInitiative
                                            .results
                                        }
                                        onChange={(e) =>
                                          contextType.changeHandler(
                                            e,
                                            "results"
                                          )
                                        }
                                        onKeyPress={(event) => {
                                          return Utils.checklen_onkeypress(
                                            event,
                                            1024
                                          );
                                        }}
                                      >
                                        {
                                          contextType.state.acctInitiative
                                            .results
                                        }
                                      </textarea>
                                    </td>
                                  </tr>
                                  <tr className={styleClass.rowHeight}>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={
                                        styleClass.editInitiativelabels
                                      }
                                      title={Settings.toolTips.initiativeYear}
                                    >
                                      {Settings.fieldLabels.additionalComments}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <textarea
                                        name="acctInitiative.comments"
                                        tabIndex={8}
                                        id="acctInitiative.comments"
                                        className={styleClass.textAreaFont}
                                        rows={3}
                                        cols={100}
                                        value={
                                          contextType.state.acctInitiative
                                            .comments
                                        }
                                        onChange={(e) =>
                                          contextType.changeHandler(
                                            e,
                                            "comments"
                                          )
                                        }
                                        onKeyPress={(event) => {
                                          return Utils.checklen_onkeypress(
                                            event,
                                            1024
                                          );
                                        }}
                                      >
                                        {
                                          contextType.state.acctInitiative
                                            .comments
                                        }
                                      </textarea>
                                    </td>
                                  </tr>
                                </table>
                                <table className={styleClass.fullWidth}>
                                  <tr>
                                    <td>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          columnGap: "10px",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <a href="javascript:void(0);" className={styleClass.updatebtn}>
                                          <img
                                            id="update"
                                            src={btnUpdate}
                                            onClick={() =>
                                              contextType.validateAction(
                                                "update"
                                              )
                                            }
                                          />{" "}
                                        </a>
                                        <a href="javascript:void(0);" className={styleClass.updatebtn}>
                                          <img
                                            id="delete"
                                            src={btnDelete}
                                            onClick={() =>
                                              contextType.validateAction(
                                                "delete"
                                              )
                                            }
                                          />{" "}
                                        </a>
                                        <a href="javascript:void(0);" className={styleClass.updatebtn}>
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
                              </td>
                            </tr>
                          </table>
                        </form>
                      </div>
                      {contextType.isAlert ? (
                        <CModal
                          id="editInitAlert"
                          title="Alert Message"
                          onClose={() => {
                            contextType.setIsAlert(false);
                            (
                              document.getElementById(
                                "acctInitiative.initiative_name"
                              ) as HTMLInputElement
                            ).focus();
                          }}
                          show={contextType.isAlert}
                          positionOffset={{ x: "-50%", y: "-50%" }}
                          onStart={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Suspense fallback={<CSuspense />}>
                            <div
                              className={
                                styleClass.editAccountInitiativesModalContainer
                              }
                            >
                              <span>{contextType.alertMsg}</span>
                            </div>
                          </Suspense>
                        </CModal>
                      ) : (
                        ""
                      )}
                    </div>
                  </Suspense>
                </CModal>
              </div>
            );
          } else {
            return (
              <CModal
                id="loadingEditInitiative"
                title="Edit Initiative"
                onClose={props.closeModal}
                show={props.showModal}
                positionOffset={{ x: "-50%", y: "-50%" }}
                onStart={(e) => {
                  e.stopPropagation();
                }}
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
                  <div
                    className={styleClass.editAccountInitiativesModalContainer}
                  >
                    <span>{contextType.alertMsg}</span>
                  </div>
                </Suspense>
              </CModal>
            );
          }
        }}
      </EditAccInitiativesContext.Consumer>
    </EditAccInitiativesContextProvider>
  );
};

export default EditAccountInitiatives;
